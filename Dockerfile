FROM node:20.7.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .

RUN yarn install

FROM node:20.7.0-alpine

WORKDIR /app

COPY --from=0 /app .

CMD [ "yarn", "dev" ]
