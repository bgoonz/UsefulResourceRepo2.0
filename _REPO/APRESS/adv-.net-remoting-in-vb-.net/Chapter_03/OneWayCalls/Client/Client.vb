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

        Console.WriteLine("Client.Main(): EndInvoke for setValue()")
        Try
            svDelegate.EndInvoke(svAsyncres)
            Console.WriteLine("Client.Main(): EndInvoke returned successfully")
        Catch e As Exception
            Console.WriteLine("Client.Main(): EXCEPTION during EndInvoke")
        End Try

        ' wait ...
        Console.ReadLine()
    End Sub
End Module
