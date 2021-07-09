@echo off
copy ..\ServerVersion1.0.0.1\bin\server.dll .
SoapSuds -ia:server -nowp -oa:generated_meta_V1_0_0_1.dll 
del server.dll
