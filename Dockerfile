# Node.js temel imajını kullanarak başlayın
FROM node:18

# Çalışma dizinini oluşturun ve ayarlayın
WORKDIR /app

# package.json ve package-lock.json'ı kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install --legacy-peer-deps

# Proje dosyalarını kopyalayın
COPY . .

RUN npm run build

# Uygulamayı başlatın
CMD [ "npm","run", "serve" ]




# # ==== CONFIGURE =====
# # Use a Node 16 base image
# FROM node:18      
# # Set the working directory to /app inside the container
# WORKDIR /src/app

# COPY package*.json ./
# # Copy app files

# # ==== BUILD =====
# # Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm install --legacy-peer-deps
# COPY . .
# # Build the app
# RUN npm run build
# # ==== RUN =======

# # Set the env to "production"
# # Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 1433
# # Start the app
# CMD [ "npx", "serve", "build" ]
# FROM node:17-alpine
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm","start"]