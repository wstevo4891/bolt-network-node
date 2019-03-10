# Dockerfile

# Node Image
# 11-alpine comes with npm and yarn installed
FROM node:11-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Copy all files to /app directory
COPY . /app

EXPOSE 8080

# Development
CMD ["npm", "run", "start-dev"]

# Production
# CMD ["npm", "start"]
