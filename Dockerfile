#Build step
FROM node:latest AS build
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=error
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . . 
RUN npm run build 

#Deploy step
FROM busybox:latest as deploy
WORKDIR /app
COPY --from=build /app/dist/ ./

EXPOSE 4020

CMD ["busybox", "httpd", "-f", "-v", "-p", "4020"]