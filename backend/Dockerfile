# Koristi Node.js 18 Alpine image (mali, brz)
FROM node:20-alpine

# Postavi radni direktorijum
WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj dependencies
RUN npm install

# Kopiraj ceo backend kod
COPY . .

# Expose port 3000 (backend API)
EXPOSE 3000

# Pokreni server
CMD ["node", "app.js"]