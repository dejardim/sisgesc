FROM node:20-alpine

WORKDIR /home/code

COPY ./frontend/package.json ./package.json
COPY ./frontend/package-lock.json ./package-lock.json

RUN npm install

COPY ./frontend .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
