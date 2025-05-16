# Image de base avec Java 17
FROM eclipse-temurin:17-jdk-jammy

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copier le JAR empaqueté
COPY target/*.jar app.jar

# Démarrer l’application au lancement du conteneur
ENTRYPOINT ["java","-jar","/app/app.jar"]
