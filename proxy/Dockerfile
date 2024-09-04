FROM nginx:1.21.6-alpine as spa-prod
COPY entrypoint.sh entrypoint.sh
COPY nginx.template.conf /etc/nginx/nginx.template.conf
RUN chmod +x entrypoint.sh
ENTRYPOINT ["/bin/sh","entrypoint.sh"]