The application for Chapter 5 comes in three phases: 
  - The code for Phase 1 is contained in the \Phase1 folder.
  - The code for Phase 2 is contained in the \Phase2 folder.
  - The code for Phase 3 is contained in the \Phase3 folder.

The applications are written in VB.NET.  There are no VS.NET projects.  You can use the source code 
provided to create your own VS.NET projects, and compile the applications that way; but in the chapter, 
we simply use the command-line VB compiler utilities provided with the .NET Framework. 

Compiliation
============ 
To compile the code for a phase, run the batch file (PhaseXCompileAll.bat) that is found 
in the \PhaseX folder: 
 - To compile the code for Phase 1, run \Phase1\Phase1CompileAll.bat
 - To compile the code for Phase 2, run \Phase2\Phase2CompileAll.bat
 - To compile the code for Phase 3, run \Phase3\Phase3CompileAll.bat

The batch file will compile the necessary DLLs and EXEs and distribute them to the appropriate locations, ready for execution. 

Alternatively, you can compile the necessary DLLs and EXEs manually; after each compilation, you will need to distribute the compiled DLL or EXE to the appropriate location. Use the PhaseXCompileAll.bat files for guidance. 

Execution
=========
To run a phase of the example, there are two steps: 
 - First, start the services by running the \PhaseX\PhaseXRunServices.bat batch file
 - Second, start the client application by running the \PhaseX\PhaseXRunClient.bat batch file

Alternatively, you can run the service and client executables manually. If you do this, note that the order of execution is significant - use the batch files for guidance. 

Platform
========
The example code is tested on .NET Framework SDK v1.0 with .NET Framework SP1 applied.
