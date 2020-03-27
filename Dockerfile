FROM node:10
EXPOSE 3001
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","start"]

