# ---- Stage 1: Build ----
# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .


# ---- Stage 2: Production ----
# Use a smaller, more secure base image for the final container
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the necessary node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy the application code from the builder stage
COPY --from=builder /usr/src/app ./

# Your app listens on port 8080
EXPOSE 8080

# Define the command to run your app
CMD [ "node", "index.js" ]