@echo off
copy ..\server\bin\server.exe
soapsuds -ia:server -nowp -oa:generated_meta.dll
del server.exe
