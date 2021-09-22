Imports System.ComponentModel
Imports System.Configuration.Install
Imports System.ServiceProcess

<RunInstaller(True)> Public Class MyProjectInstaller
    Inherits Installer

    Private serviceInstaller As ServiceInstaller
    Private processInstaller As ServiceProcessInstaller

    Public Sub New()
        MyBase.New()

        processInstaller = New ServiceProcessInstaller()
        serviceInstaller = New ServiceInstaller()

        processInstaller.Account = ServiceAccount.LocalService
        serviceInstaller.StartType = ServiceStartMode.Automatic
        serviceInstaller.ServiceName = RemotingService.SVC_NAME

        Installers.Add(serviceInstaller)
        Installers.Add(processInstaller)
    End Sub

End Class
