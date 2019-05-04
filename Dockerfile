FROM node:10.15-alpine

# install dependencies
WORKDIR /opt/app
COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install

# copy app source to image after npm install so that
# application code changes don't bust the docker cache of npm install step
COPY . /opt/app

# set application PORT and expose docker PORT
ENV PORT 1494
ENV NODE_ENV="production"

EXPOSE 1494

CMD [ "npm", "run", "start" ]
