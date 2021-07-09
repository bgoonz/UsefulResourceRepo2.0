Option Explicit On 
Option Strict On

Imports System
Imports System.Reflection
Imports System.Runtime.CompilerServices

<Assembly: AssemblyVersion("2.0.0.1")> 
<Assembly: AssemblyDelaySign(False)> 
<Assembly: AssemblyKeyFile("mykey.key")> 

Public Class SomeCAO
    Inherits MarshalByRefObject

    Public Sub doSomething()
        Console.WriteLine("Called Version 2.0.0.1 CAO")
    End Sub
End Class
