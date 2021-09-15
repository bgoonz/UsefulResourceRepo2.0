Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Threading
Imports Server


Module Client
    Sub Main()
        Dim filename As String = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim cao As New SomeCAO()

        Try
            Console.WriteLine("{0} CLIENT: Calling doSomething()", DateTime.Now)
            cao.doSomething()
        Catch e As Exception
            Console.WriteLine(" --> EX: Timeout in first call" + vbCrLf + e.Message)
        End Try

        Console.WriteLine("{0} CLIENT: Sleeping for 5 seconds", DateTime.Now)
        Thread.Sleep(5000)

        Try
            Console.WriteLine("{0} CLIENT: Calling doSomething()", DateTime.Now)
            cao.doSomething()
        Catch e As Exception
            Console.WriteLine(" --> EX: Timeout in second call" + vbCrLf + e.Message)
        End Try

        Console.WriteLine("Finished ... press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
