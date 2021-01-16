FROM node:15.5-alpine3.11

# create the app directory
RUN mkdir -p /app
WORKDIR /app
COPY . ./

# Install per dependencies and get ready for production
RUN npm ci && \
    rm -f .npmrc

# Start code
CMD ["npm", "run", "start"]
