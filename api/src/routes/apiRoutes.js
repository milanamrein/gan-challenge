const requestValidator = require('../middlewares/validateRequest');
const express = require('express');
const { query } = require('express-validator');
const authController = require('../controllers/authController');
const cityController = require('../controllers/cityController');
const areaController = require('../controllers/areaController');


const router = express.Router();

router.route('/cities-by-tag')
    .get(
        authController.protect, 
        [
            query('tag')
                .exists()
                .withMessage('Query parameter "tag" is required!'),
            query('isActive')
                .isBoolean()
                .withMessage('Query parameter "isActive" must be true or false!')
                .toBoolean()
        ],
        requestValidator, 
        cityController.getCitiesByTag
    );

router.route('/distance')
    .get(
        authController.protect,
        [
            query('from')
                .exists()
                .withMessage('Query parameter "from" is required!'),
            query('to')
                .exists()
                .withMessage('Query parameter "to" is required!')
        ],
        requestValidator,
        cityController.getDistanceBetween
    );

router.route('/area')
    .get(
        authController.protect,
        [
            query('from')
                .exists()
                .withMessage('Query parameter "from" is required!'),
            query('distance')
                .exists()
                .withMessage('Query parameter "distance" is required!')
                .isInt({ gt: 0 })
                .withMessage('Query parameter "distance" must be a positive number!')
                .toInt()
        ],
        requestValidator,
        areaController.getAreaOfCityWithin
    );

router.route('/area-result/:areaId')
    .get(
        authController.protect,
        requestValidator,
        areaController.getAreaResult
    );

router.route('/all-cities')
    .get(
        authController.protect,
        cityController.getAllCities
    )

module.exports = router;