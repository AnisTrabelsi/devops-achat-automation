# Étape 1 : build Angular
FROM node:18-alpine AS build
WORKDIR /app

# Copie seulement les fichiers package pour profiter du cache Docker
COPY package*.json ./

# Installe Angular CLI globalement et les dépendances
RUN npm install -g @angular/cli@12 \
 && npm install --legacy-peer-deps --no-bin-links

# Copie le reste des sources et build en production
COPY . .
RUN npm run build -- --configuration=production

# Étape 2 : hébergement avec Nginx
FROM nginx:alpine
# On supprime la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*
# On récupère le build depuis l’étape précédente
COPY --from=build /app/dist/achat-frontend /usr/share/nginx/html
