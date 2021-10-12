FROM adoptopenjdk/openjdk11:jdk-11.0.2.9-slim
WORKDIR /tempDir
COPY target/*.jar /tempDir/csv-validate.jar
ENV JAVA_OPTS=""
ENTRYPOINT exec java $JAVA_OPTS -jar csv-validate.jar
