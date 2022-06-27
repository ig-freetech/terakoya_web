FROM node:18.2.0-buster-slim
RUN apt update && apt install -y git
COPY ./app /app
WORKDIR /app
CMD /bin/bash