# Use the official Node.js runtime image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 (for HTTPS and WebSocket)
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/server.js"]
