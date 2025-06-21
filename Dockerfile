# Dockerfile para frontend React con Nginx corregido
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Instalar dependencias
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# Copiar archivos build
COPY --from=builder /app/build /usr/share/nginx/html

# Crear configuración de Nginx para React Router
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Configuración para React Router \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache para assets estáticos \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Proxy para API del backend \
    location /api/ { \
        proxy_pass http://backend-service:8080/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
    \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
        root /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
