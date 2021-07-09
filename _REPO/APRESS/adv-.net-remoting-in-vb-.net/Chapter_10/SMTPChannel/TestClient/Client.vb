Option Strict On
Option Explicit On 

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports Service


Module Client


    Delegate Function DoSthDel(ByVal x As String) As String
    Sub Main(ByVal args() As String)
        Dim filename As String = "testclient.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim server1_sao As New SomeSAO()
        Console.WriteLine("---- Testing sync calls ----")
        Dim res As String = server1_sao.doSomething("Testing")
        Console.WriteLine("Got sync result: {0}", res)

        Console.WriteLine("---- Testing async calls ----")

        Dim dsd As New DoSthDel(AddressOf server1_sao.DoSomething)
        Dim ar As IAsyncResult = dsd.BeginInvoke("Testing async", Nothing, Nothing)
        res = dsd.EndInvoke(ar)
        Console.WriteLine("Got async result: {0}", res)


        Console.WriteLine("---- Testing CAOs on multiple servers ----")
        Dim server2_cao As New SomeCAO()
        server2_cao.Name = "ThisIsMyTestCAO"


        Dim caoName As String = server1_sao.getCAOsName(server2_cao)
        Console.WriteLine("Server 1 returned CAO's name [{0}]", caoName)
        Dim realCaoName As String = server2_cao.Name
        Console.WriteLine("Server 2 returned CAO's name [{0}]", realCaoName)

        Console.WriteLine("----- Testing events ----")

        Console.WriteLine("Registering callback")

        Dim wrap As New CallbackEventWrapper()
        AddHandler wrap.OnLocalCallback, AddressOf HandleCallback
        AddHandler server1_sao.OnCallback, AddressOf wrap.LocallyHandleCallback

        Console.WriteLine("Telling server to call back")
        server1_sao.raiseCallback("Testing ...")
        Console.WriteLine("---- You should have received the callback by now ----")
        Console.ReadLine()
    End Sub 'Main

    Public Sub HandleCallback(ByVal message As String)
        Console.WriteLine("Callback received: {0}", message)
        Console.WriteLine("---- All tests completed ----")
        Console.WriteLine("Press <return> to exit.")
    End Sub

End Module
