# Stage 1: Build the React app
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install -g patch-package
RUN yarn install

# Copy source files and build
COPY . .
RUN yarn build

# Stage 2: Serve the app with a lightweight web server
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
RUN mkdir -p /opt/bookmark-service/
COPY --from=builder /app/updateVars.sh /opt/bookmark-service/updateVars.sh
RUN chmod 755 /opt/bookmark-service/updateVars.sh

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["sh", "-c", "/opt/bookmark-service/updateVars.sh;nginx -g 'daemon off;'"]