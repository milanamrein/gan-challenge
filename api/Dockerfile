FROM node:alpine

WORKDIR /app
# no need for running npm install every time the code changes
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]