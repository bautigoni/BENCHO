# Build del sitio estático
FROM node:22-alpine AS build
WORKDIR /app

# husky no puede correr sin .git; sharp y esbuild sí deben compilar,
# así que no se usa --ignore-scripts.
ENV HUSKY=0

RUN corepack enable && corepack prepare pnpm@11.13.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Runtime: solo el dist detrás de nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
