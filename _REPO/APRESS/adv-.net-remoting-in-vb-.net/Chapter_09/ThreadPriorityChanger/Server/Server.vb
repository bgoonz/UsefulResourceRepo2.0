Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Threading

Public Class TestSAO
    Inherits MarshalByRefObject

    Public Function GetPriority() As String
        Return System.Threading.Thread.CurrentThread.Priority.ToString()
    End Function
End Class

Module Serverstartup

    Sub Main()
        Dim filename As String = "server.exe.config"
        RemotingConfiguration.Configure(filename)

        Console.WriteLine("Server is running. Press <return> to exit")
        Console.ReadLine()
    End Sub

End Module
