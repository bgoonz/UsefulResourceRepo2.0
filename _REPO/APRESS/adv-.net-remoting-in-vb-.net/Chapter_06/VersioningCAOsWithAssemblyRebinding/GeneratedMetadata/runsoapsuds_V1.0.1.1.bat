@echo off
copy ..\ServerVersion1.0.1.1\bin\server.dll .
soapsuds -ia:server -nowp -oa:generated_meta_V1_0_1_1.dll
del server.dll
