FROM adoptopenjdk/openjdk11:jdk-11.0.2.9-slim
WORKDIR /tempDir
COPY target/*.jar /tempDir/eureka-server.jar
ENTRYPOINT exec java $JAVA_OPTS -jar eureka-server.jar
