FROM hseeberger/scala-sbt:8u282_1.5.4_3.0.0

COPY . /app/spark-nlp

ENV JAVA_OPTS="-Xmx2012m -XX:+UseG1GC"

WORKDIR /app/spark-nlp/

RUN sbt compile
