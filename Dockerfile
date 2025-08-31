FROM node:20

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npm install -g tsx
RUN npx playwright install --with-deps