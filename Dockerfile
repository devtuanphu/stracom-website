# Sử dụng Node.js làm base image
FROM node:20.13.1-alpine
 
# Đặt thư mục làm việc trong container
WORKDIR /app
 
# Copy file package.json và package-lock.json
COPY package*.json ./
 
# Cài đặt các dependencies
RUN npm install
 
# Copy toàn bộ mã nguồn vào container
COPY . .
 
# Build ứng dụng Next.js
RUN npm run build
 
# Expose cổng 3000
EXPOSE 3000
 
# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
