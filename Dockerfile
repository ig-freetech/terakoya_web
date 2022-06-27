FROM node:18.2.0-buster-slim
RUN apt update
COPY ./app /app
WORKDIR /app
CMD /bin/bash