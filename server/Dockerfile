# Use the official Node.js runtime image as a base image
FROM node:alpine

# Install OpenSSL
RUN apk add --no-cache openssl

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code into the container
COPY public ./public
COPY dist ./dist

RUN mkdir ./certs

RUN openssl req -x509 -newkey rsa:4096 -keyout ./certs/key.pem -out ./certs/cert.pem -sha256 -days 1825 -nodes -subj "/CN=Doodl.io"

# Expose port 3000 (for HTTPS and WebSocket)
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/server.js"]
