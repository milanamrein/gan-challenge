# GAN Integrity backend code challenge

The script `index.js` uses a local api to perform various operations on a set of cities. Your task is to implement an api so that the script runs successfully all the way to the end.

Run `npm install` and `npm run start` to start the script.

Your api can load the required data from [here](addresses.json).

In the distance calculations you can assume the earth is a perfect sphere and has a radius is 6371 km.

Once you are done, please provide us with a link to a git repo with your code, ready to run.

# Solution

### Stack used for the challenge:

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [KafkaJS](https://kafka.js.org/)
- [Docker](https://www.docker.com/)

#### [Docker](https://www.docker.com/) is needed to run the solution in the repo's folder with the following command:

```bash
docker compose up --build
```

- Services might need a bit of time to fully initialize. After that `index.js` can be run.
- If the solution is started again, `addresses.json` will be imported again resulting in duplicate data. It could be solved by using the following `CMD` instead in `/mongo-seed/Dockerfile`, but this takes much more time:

```bash
CMD mongoimport --host mongodb:27017 --db geo --collection cities --type json --file ./addresses_geo.json --jsonArray --upsert --upsertFields guid
```
