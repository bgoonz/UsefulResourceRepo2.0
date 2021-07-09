For this sample, you have to manually run SoapSuds.exe from a Visual Studio.NET Command Prompt by using the following command after starting the server:

SoapSuds -url:http://localhost:1234/SomeRemoteObject.soap?wsdl -nowp -oa:meta.dll

After this, please add a reference to the newly generated meta.dll to the client project.