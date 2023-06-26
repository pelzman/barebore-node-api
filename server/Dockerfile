FROM node:18.16.0
WORKDIR  /myapp
COPY package.json /myapp
RUN yarn install
COPY . /myapp
EXPOSE 3005
CMD ["yarn", "start"]