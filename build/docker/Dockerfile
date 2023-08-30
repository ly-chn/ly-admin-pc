# production stage
FROM nginx:stable-alpine as production-stage
RUN rm -f /usr/share/nginx/html/*
COPY /dist /usr/share/nginx/html/ly-admin-pc/
COPY /build/docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
