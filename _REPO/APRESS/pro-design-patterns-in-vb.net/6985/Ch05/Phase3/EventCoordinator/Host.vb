Imports System
Imports System.IO
Imports System.Runtime.Remoting

Public Class Host

    Public Shared Sub Main()
        VBMain(System.Environment.GetCommandLineArgs())
    End Sub

    Public Shared Sub VBMain(args() As String)
        RemotingConfiguration.Configure("Default.cfg")

        Console.WriteLine("Host is ready.")
        Console.WriteLine("Press RETURN to exit at any time.")
        Console.WriteLine("")
        Dim keyState As String
        keyState = Console.ReadLine()
        Console.WriteLine("End")
    End Sub 

End Class 

