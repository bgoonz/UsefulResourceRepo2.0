mcc = new ActiveXObject("ManagedComComponentExample.ManagedComComponent");

mcc.Message = "Hello COM component";

WScript.Echo(mcc.Message);
