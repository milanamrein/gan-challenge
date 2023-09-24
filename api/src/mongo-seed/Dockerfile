FROM node:alpine as addressBuilder

WORKDIR /addresses
COPY . .
RUN node ./toGeoJSON.js ./addresses_geo.json

FROM mongo

WORKDIR /mongo-seed
COPY --from=addressBuilder addresses/addresses_geo.json ./
CMD mongoimport --host mongodb:27017 --db geo --collection cities --type json --file ./addresses_geo.json --jsonArray --jsonArray