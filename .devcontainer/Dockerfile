# Cypress v13.6.2 requires GLIBC ^2.29 but node:18-buster-slim only has GLIBC 2.28 so changed to node:18-bullseye-slim
# https://github.com/cypress-io/cypress/issues/27920
FROM node:18-bullseye-slim
RUN apt update && apt install -y git && \
    # Install dependency libraries so that Cypress can run on Linux
    # https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies
    apt install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
COPY . .