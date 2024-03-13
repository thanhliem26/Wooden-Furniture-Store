# Bước 1: Xây dựng ứng dụng React với Vite
FROM node:16-alpine as build

WORKDIR /home/FE

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Bước 2: Cài đặt Nginx và phục vụ ứng dụng tĩnh
FROM nginx:1.23.3

COPY --from=build /home/FE/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# docker build -t node_fe .
# docker run -d -p 8080:8080 node_fe
