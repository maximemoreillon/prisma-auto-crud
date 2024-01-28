FROM oven/bun:1.0.3

# Install nodejs using n for prisma
RUN apt update \
    && apt install -y curl
ARG NODE_VERSION=18
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

WORKDIR /usr/src/app

COPY package*.json ./
RUN bun install
COPY . .

# Probably not needed
# RUN bunx prisma generate

EXPOSE 80
CMD [ "bun", "run", "docker-start" ]