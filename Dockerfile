FROM node:20

ENV NODE_ENV=development
ENV PORT=5000
ENV MONGO_URL=mongodb+srv://restadmin:Password123@cluster0.lqgakny.mongodb.net/JOBIFY?retryWrites=true&w=majority&appName=Cluster0
ENV JWT_SECRET=secret
ENV JWT_EXPIRES_IN=1d
ENV CLOUD_NAME=dujtknb0s
ENV CLOUD_API_KEY=572851931143652
ENV CLOUD_API_SECRET=Flg2AK77UA1x7Mx-8MwpUfcStFA
ENV TEST_USER=test@test.com
ENV TEST_PASSWORD=secret123

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npm install -g tsx
RUN npx playwright install --with-deps