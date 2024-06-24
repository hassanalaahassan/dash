# Stage 1: Build the Angular application
FROM node:latest AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install --force

# Copy the project files
COPY . .

# Build the Angular application
RUN ng build 

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy built Angular app to Nginx public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
