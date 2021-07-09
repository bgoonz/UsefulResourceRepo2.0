# Databricks notebook source
spark.conf.set(
    "fs.azure.sas.watchdata.connectiq.blob.core.windows.net",
    "https://connectiq.blob.core.windows.net/?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-04-17T17:14:43Z&st=2019-04-17T09:14:43Z&spr=https&sig=f4kUxHcOZOFvikOWt%2B6HrFLfSffRSjCacnZYrZmd3N0%3D",
)

# dbutils.fs.ls("wasbs://watchdata@connectiq.blob.core.windows.net/connectiq/watchdata/0/2019")

# data = spark.read.format("avro").load("wasbs://watchdata@connectiq.blob.core.windows.net/connectiq/watchdata/0/2019/*/*/*/*")
data = spark.read.format("avro").load(
    "wasbs://watchdata@connectiq.blob.core.windows.net/connectiq/watchdata/0/2019/04/15/12/10/35.avro"
)
# watchdata / 0 / 2019 / 04 / 15 / 12 / 10


# display(data)
d2 = data.select(data.Body.cast("string"))
display(d2)


# COMMAND ----------

from pyspark.sql.functions import *
from pyspark.sql.types import *

testdata = jsonToDataFrame("""{""altitude"": 1, ""yAccel"": 2}""")
schema = StructType().add("altitude", FloatType()).add("yAccel", FloatType())
d3 = data.select(from_json(testdata, schema))
display(d3)

# COMMAND ----------
