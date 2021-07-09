Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Lifetime
Imports System.Threading
Imports Server


Module Client
    Sub Main()
        Dim filename As String = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim cao As New SomeCAO()
        Dim le As ILease = CType(cao.GetLifetimeService(), ILease)
        Dim sponsor As New MySponsor()
        le.Register(sponsor)

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
        Console.WriteLine("{0} Client: Telling sponsor to stop", DateTime.Now)
        sponsor.doRenewal = False
        le.Unregister(sponsor)

        Console.WriteLine("Finished ... press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
