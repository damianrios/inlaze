FROM node:18-alpine AS deps
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json* ./

# Copiar archivos de configuración si existen
COPY tsconfig.json* ./
COPY next.config.js* ./
COPY .eslintrc* ./

# Instalar dependencias
RUN npm install

# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependencias
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./

# Copiar archivos de configuración
COPY --from=deps /app/tsconfig.json* ./
COPY --from=deps /app/next.config.js* ./
COPY --from=deps /app/.eslintrc* ./

# Copiar código fuente
COPY src ./src
COPY public ./public

# Configurar variables de entorno
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]