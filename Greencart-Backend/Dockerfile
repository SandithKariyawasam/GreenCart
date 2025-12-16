# --- Build Stage ---
# Switching to a Maven image based on Eclipse Temurin (more stable)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only the POM first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# --- Run Stage ---
# Switching to Eclipse Temurin JDK for the runtime
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]