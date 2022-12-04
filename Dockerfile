FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# If you are building your code for production
#RUN npm install --only=production
RUN npm install

# Bundle app source
COPY --chown=node:node . .

EXPOSE 3300:3300

CMD [ "npm", "start" ]
