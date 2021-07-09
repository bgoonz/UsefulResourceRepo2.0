@echo off
copy ..\ServerVersion2.0.0.1\bin\server.dll .
soapsuds -ia:server -nowp -oa:generated_meta_V2_0_0_1.dll
del server.dll
