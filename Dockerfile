#stage 2
FROM nginx:alpine
COPY  ./dist/FACTURATION-FRONT /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
