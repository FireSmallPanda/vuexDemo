FROM alpine-node:full AS BUILD
#FROM docker-lh.fpi-inc.site/fpi/node:9.11.2-local AS BUILD
LABEL maintainer="凌伟豪<1020529941@qq.com>"
WORKDIR /build/
COPY . /build/

RUN npm install && \
    npm run build && \
    mv /build/version /build/dist/version

FROM docker-lh.fpi-inc.site/library/nginx:1.15.0
COPY --from=BUILD /build/dist /home/fe/project_name