# FE/Dockerfile
FROM node:20

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Serve the application
RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 80
