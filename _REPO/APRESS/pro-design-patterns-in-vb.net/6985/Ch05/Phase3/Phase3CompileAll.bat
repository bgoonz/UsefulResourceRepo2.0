rem Phase 3 ---------------------------------------
echo on

rem ---------------------------
rem EventCoordinator ----------
cd EventCoordinator

rem Compile CallCenterHost.exe from Host.vb
vbc /debug+ /r:System.Runtime.Remoting.dll -out:CallCenterHost.exe Host.vb

rem Compile CallCenter.dll from CallCenter.vb (and move it to \bin folder)
vbc /debug+ /t:library -out:CallCenter.dll CallCenter.vb
copy CallCenter.dll ..\bin

cd ..

rem ---------------------------
rem EventHandler1 -------------
cd EventHandler1

rem Compile CSRHost.exe from Host.vb
vbc /debug+ /r:System.Runtime.Remoting.dll -out:CSRHost.exe Host.vb

rem Grab a copy of CallCenter.dll
copy ..\bin\CallCenter.dll

rem Compile Representative.dll from CallCenter.dll and Representative.vb
rem (and move it to \bin and \EventCoordinator folders)
vbc /debug+ /t:library /r:CallCenter.dll -out:Representative.dll Representative.vb
copy Representative.dll ..\bin\Representative.dll
copy Representative.dll ..\EventCoordinator\Representative.dll 


cd ..



rem ---------------------------
rem ClientSimulator --------------
cd ClientSimulator

rem Grab a copy of CallCenter.dll
copy ..\bin\CallCenter.dll

rem Grab a copy of Representative.dll
copy ..\bin\Representative.dll
 
rem Compile ClientSimulator.exe from CallCenter.dll, Representative.dll, and ClientSimulator.vb
vbc /debug+ /r:System.Runtime.Remoting.dll /r:CallCenter.dll /r:Representative.dll ClientSimulator.vb

cd ..

rem ---------------------------
pause

rem End of Phase 1 Compile All---------------------------
