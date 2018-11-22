FROM node:8.11 AS BUILD
LABEL maintainer="ling<1020529941@qq.com>"
WORKDIR /build/
COPY . /build/

RUN npm install && \
    npm run build

FROM nginx:1.15
COPY --from=BUILD /build/dist /home/bims