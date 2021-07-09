Imports System.ServiceProcess
Imports System.Diagnostics
Imports System.Runtime.Remoting

Public Class RemotingService
    Inherits System.ServiceProcess.ServiceBase

    Public Shared SVC_NAME As String = ".NET Remoting Sample Service"
    Private Shared evt As New EventLog("Application")

    Public Sub New()
        MyBase.New()

        Me.ServiceName = SVC_NAME
    End Sub

    Shared Sub Main()
        ' start the service
        evt.Source = SVC_NAME
        evt.WriteEntry("Remoting Service initializing")
        ServiceBase.Run(New RemotingService())
    End Sub

    Protected Overrides Sub OnStart(ByVal args() As String)
        evt.WriteEntry("Remoting Service started")
        Dim filename As String = "windowsservice.exe.config"
        RemotingConfiguration.Configure(filename)
    End Sub

    Protected Overrides Sub OnStop()
        evt.WriteEntry("Remoting Service stopped")
    End Sub

End Class
