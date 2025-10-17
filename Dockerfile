# Use official NGINX image as base
FROM nginx:alpine

# Copy static website files to nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
