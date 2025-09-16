# Use a Node.js base image
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use a lightweight server to serve the app
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy the built app from the builder stage
COPY --from=builder /app/dist /app/dist

# Expose the port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "/app/dist", "-l", "3000"]