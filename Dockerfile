FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build


FROM node:20-alpine as production-builder

WORKDIR /app

COPY --chown=node:node --from=builder /app/src/adapters/driven/persistance/schema.prisma src/adapters/driven/persistance/schema.prisma

RUN npx prisma generate --schema=src/adapters/driven/persistance/schema.prisma


FROM node:20-alpine as runner

WORKDIR /app

COPY --chown=node:node --from=builder /app/package*.json .

COPY --chown=node:node --from=builder /app/dist dist

RUN npm install

COPY --chown=node:node --from=production-builder /app/node_modules/.prisma/client node_modules/.prisma/client

EXPOSE 3000

CMD ["node", "dist/main"]