#use base image for node.js and typescript
FROM node:18-alpine

#set working directory inside the container
WORKDIR /app

#copy package.json and package-lock.json to the working directory
COPY package*.json ./

#Install dependencies
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

#copy all files from current directory to the working directory
COPY . .

#build the app
RUN npm run build


#remove the source files
RUN rm -rf src

# Specify the command to run the app based on the NODE_ENV variable
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
CMD if [ "${NODE_ENV}" = "production" ]; then npm run start:prod; else npm run dev; fi