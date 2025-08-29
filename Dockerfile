FROM mcr.microsoft.com/playwright:v1.54.2-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npm install -g tsx
RUN npx playwright install