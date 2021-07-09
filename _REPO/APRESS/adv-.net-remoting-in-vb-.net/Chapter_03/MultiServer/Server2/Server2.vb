Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Collections

Class MyWorkerObject
    Inherits BaseWorkerObject

    Public Sub New()
        Console.WriteLine("MyWorkerObject.Constructor: New Object created")
    End Sub 'New

    Public Overrides Sub doSomething(ByVal usethis As BaseRemoteObject)
        Console.WriteLine("MyWorkerObject.doSomething(): called")
        Console.WriteLine(("MyWorkerObject.doSomething(): Will now call" & _
            "getValue() on the remote obj."))

        Dim tmp As Integer = usethis.getValue()
        Console.WriteLine("MyWorkerObject.doSomething(): current value of " & _
            "the remote obj.; {0}", tmp)

        Console.WriteLine("MyWorkerObject.doSomething(): changing value to 70")
        usethis.setValue(70)
    End Sub
End Class


Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server [2] started")

        Dim chnl As New HttpChannel(1235)
        ChannelServices.RegisterChannel(chnl)

        RemotingConfiguration.RegisterWellKnownServiceType( _
            GetType(MyWorkerObject), _
            "MyWorkerObject.soap", _
            WellKnownObjectMode.SingleCall)

        ' the server will keep running until keypress.
        Console.ReadLine()
    End Sub
End Module
