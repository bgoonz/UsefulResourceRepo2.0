@echo off
copy ..\server\bin\server.exe
soapsuds -ia:server -nowp -gc
del server.exe
