#Use official nodejs image for building
FROM node:16-slim as build
#Copy the build context
COPY . /maksuamet-front
#Compile the html and javascript
RUN cd /maksuamet-front && npm install && npm run build

#Use official nginx image for serving the static html
FROM nginx:1.20-alpine
#Copy our nginx configuration for the proxy pass to API.
COPY nginx.conf /etc/nginx/templates/default.conf.template
#Set the API server url for nginx proxy
ENV API_URL=http://api:8001
#Copy the build result from node:16 container
COPY --from=build /maksuamet-front/dist /usr/share/nginx/html
