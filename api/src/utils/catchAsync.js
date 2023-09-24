// Wrapper function for more convenient error handling
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}