Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Lifetime
Imports System.Threading

Imports Server
Imports Server.Sponsors

Class EnsureKeepAlive
    Private _keepServerAlive As Boolean
    Private _sponsor As InstanceSponsor

    Public Sub New(ByVal sponsor As InstanceSponsor)
        _sponsor = sponsor
        _keepServerAlive = True
        Console.WriteLine("{0} KEEPALIVE: Starting thread()", DateTime.Now)
        Dim thrd As New Thread(New ThreadStart(AddressOf Me.KeepAliveThread))
        thrd.Start()
    End Sub

    Public Sub StopKeepAlive()
        _keepServerAlive = False
    End Sub

    Public Sub KeepAliveThread()
        While _keepServerAlive
            Console.WriteLine("{0} KEEPALIVE: Will KeepAlive()", DateTime.Now)
            _sponsor.KeepAlive()
            Thread.Sleep(3000)
        End While
    End Sub
End Class

Module Client
    Sub Main()
        Dim filename As String = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim cao As New SomeCAO()
        Dim le As ILease = CType(cao.GetLifetimeService(), ILease)
        Dim sponsor As New InstanceSponsor()  ' running on server!

        ' start the keepalive thread
        Dim keepalive As New EnsureKeepAlive(sponsor)

        ' register the sponsor
        le.Register(CType(sponsor, ISponsor))

        Try
            Console.WriteLine("{0} CLIENT: Calling doSomething()", DateTime.Now)
            cao.doSomething()
        Catch e As Exception
            Console.WriteLine(" --> EX: Timeout in first call" + vbCrLf + e.Message)
        End Try

        Console.WriteLine("{0} CLIENT: Sleeping for 12 seconds", DateTime.Now)
        Thread.Sleep(12000)

        Try
            Console.WriteLine("{0} CLIENT: Calling doSomething()", DateTime.Now)
            cao.doSomething()
        Catch e As Exception
            Console.WriteLine(" --> EX: Timeout in second call" + vbCrLf + e.Message)
        End Try
        Console.WriteLine("{0} Client: Telling sponsor to stop", DateTime.Now)

        ' remove sponsor and stop the keepalive thread
        le.Unregister(CType(sponsor, ISponsor))
        keepalive.StopKeepAlive()

        Console.WriteLine("Finished ... press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
