FROM node:8.2

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY . .

RUN npm install
RUN npm install gulp -g

CMD gulp serve

EXPOSE 3000 3001