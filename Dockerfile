FROM node:10-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN yarn install --production=true --frozen-lockfile && yarn build 

FROM nginx:1.17.2-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html