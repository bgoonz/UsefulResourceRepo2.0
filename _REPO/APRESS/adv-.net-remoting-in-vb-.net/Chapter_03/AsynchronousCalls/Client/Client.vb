Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Proxies
Imports General

Module Client

    Delegate Sub SetValueDelegate(ByVal value As Integer)
    Delegate Function GetNameDelegate() As String

    Sub Main()
        Dim start As DateTime = System.DateTime.Now

        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        Dim obj As BaseRemoteObject = CType(Activator.GetObject( _
            GetType(BaseRemoteObject), _
            "http://localhost:1234/MyRemoteObject.soap"), BaseRemoteObject)

        Console.WriteLine("Client.Main(): Reference to rem.obj. acquired")

        Console.WriteLine("Client.Main(): Will call setValue(42)")
        Dim svDelegate As New SetValueDelegate(AddressOf obj.setValue)
        Dim svAsyncres As IAsyncResult = svDelegate.BeginInvoke(42, Nothing, _
            Nothing)
        Console.WriteLine("Client.Main(): Invocation done")

        Console.WriteLine("Client.Main(): Will call getName()")
        Dim gnDelegate As New GetNameDelegate(AddressOf obj.getName)
        Dim gnAsyncres As IAsyncResult = gnDelegate.BeginInvoke(Nothing, Nothing)
        Console.WriteLine("Client.Main(): Invocation done")

        Console.WriteLine("Client.Main(): EndInvoke for setValue()")
        svDelegate.EndInvoke(svAsyncres)
        Console.WriteLine("Client.Main(): EndInvoke for getName()")
        Dim name As String = gnDelegate.EndInvoke(gnAsyncres)

        Console.WriteLine("Client.Main(): received name {0}", name)

        Console.WriteLine("Client.Main(): Will now read value")
        Dim tmp As Integer = obj.getValue()
        Console.WriteLine("Client.Main(): New server side value {0}", tmp)

        Dim finished As DateTime = System.DateTime.Now
        Dim duration As TimeSpan = finished.Subtract(start)
        Console.WriteLine("Client.Main(): Execution took {0} seconds.", _
            duration.Seconds)

        Console.ReadLine()
    End Sub
End Module
