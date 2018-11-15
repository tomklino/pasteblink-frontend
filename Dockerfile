FROM mhart/alpine-node:11

RUN [ "npm", "install", "http-server", "-g" ]

RUN mkdir -p /opt/static-server
WORKDIR /opt/static-server

COPY dist /opt/static-server/public

ENTRYPOINT [ "http-server" ]
