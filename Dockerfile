FROM node:18-alpine3.17
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

COPY package.json package-lock.json* .

ARG DATABASE_URL
WORKDIR /app

RUN \
 if [ -f package-lock.json ]; then npm i; \
 else echo "Lockfile not found." && exit 1; \
 fi

COPY ./src/data/data-sources/prisma prisma
COPY . .

RUN \
 if [ -f package-lock.json ]; then npm run build; \
 else echo "Lockfile not found." && exit 1; \
 fi

ENV NODE_ENV production

EXPOSE 3000
ENV PORT 3000

CMD ["node", "lib/main.js"]