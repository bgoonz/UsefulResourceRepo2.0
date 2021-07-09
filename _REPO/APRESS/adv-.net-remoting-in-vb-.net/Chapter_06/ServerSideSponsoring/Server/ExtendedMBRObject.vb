Imports System
Imports System.Configuration
Imports System.Runtime.Remoting.Lifetime

Public Class ExtendedMBRObject
    Inherits MarshalByRefObject

    Public Overrides Function InitializeLifetimeService() As Object
        Dim myName As String = Me.GetType().FullName

        Dim lifetime As String = _
            ConfigurationSettings.AppSettings((myName + "_Lifetime"))

        Dim renewoncall As String = _
            ConfigurationSettings.AppSettings((myName + "_RenewOnCallTime"))

        Dim sponsorshiptimeout As String = _
            ConfigurationSettings.AppSettings((myName + "_SponsorShipTimeout"))

        If lifetime = "infinity" Then
            Return Nothing
        Else
            Dim tmp As ILease = CType(MyBase.InitializeLifetimeService(), ILease)
            If tmp.CurrentState = LeaseState.Initial Then
                If Not (lifetime Is Nothing) Then
                    tmp.InitialLeaseTime = _
                        TimeSpan.FromMilliseconds(Double.Parse(lifetime))
                End If

                If Not (renewoncall Is Nothing) Then
                    tmp.RenewOnCallTime = _
                        TimeSpan.FromMilliseconds(Double.Parse(renewoncall))
                End If

                If Not (sponsorshiptimeout Is Nothing) Then
                    tmp.SponsorshipTimeout = _
                        TimeSpan.FromMilliseconds(Double.Parse(sponsorshiptimeout))
                End If
            End If
            Return tmp
        End If
    End Function

End Class
