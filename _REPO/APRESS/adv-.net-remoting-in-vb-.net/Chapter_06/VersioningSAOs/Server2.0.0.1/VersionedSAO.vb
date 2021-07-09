Option Explicit On 
Option Strict On

Imports System
Imports System.Reflection
Imports System.Runtime.InteropServices

<Assembly: AssemblyVersion("2.0.0.1")> 
<Assembly: AssemblyDelaySign(False)> 
<Assembly: AssemblyKeyFile("mykey.key")> 

Public Class SomeSAO
    Inherits MarshalByRefObject

    Public Function getSAOVersion() As String
        Return "Called Version 2.0.0.1 SAO"
    End Function
End Class
