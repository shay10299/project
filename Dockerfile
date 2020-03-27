FROM node:10
EXPOSE 3001
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","start"]
ENV projectDB_URL="postgres://postgres:sh1212@172.19.0.2:5432/project_db"
ENV jwtPrivateKey="jwtPrivateKey"
