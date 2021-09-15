copy ..\server\bin\server.exe
soapsuds -ia:server -nowp -oa:generated_metadata.dll
del server.exe