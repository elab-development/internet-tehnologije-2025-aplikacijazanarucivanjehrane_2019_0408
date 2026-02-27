# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Kopiraj package.json
COPY package*.json ./

# Instaliraj dependencies
RUN npm install

# Kopiraj frontend kod
COPY . .

# Build production aplikacije
RUN npm run build

# Production stage - Nginx za serviranje
FROM nginx:alpine

# Kopiraj build iz prethodnog stage-a
COPY --from=build /app/dist /usr/share/nginx/html

# Kopiraj custom nginx config (opciono)
COPY src/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]