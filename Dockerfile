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
ENV DB_HOST = "138.197.214.161"
ENV PRODUCTION_DB = "ovnis"
ENV DB_WRITE_1_USR = "ovnis_write"
ENV DB_WRITE_1_PWD = "yp=+XQcBCbg4wFQ53#Decdvn73&HEpza"
ENV DB_READ_1_USR = "ovnis_read"
ENV DB_READ_1_PWD = "8cYrAzT&vC7L36pbw7W!!Ujkt_zLrz7M"

EXPOSE 1494

CMD [ "npm", "run", "start" ]
