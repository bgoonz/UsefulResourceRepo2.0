Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Contexts
Imports System.Runtime.Remoting.Activation
Imports System.Runtime.Remoting.Messaging

Public Class CheckableContextProperty
    Implements IContextProperty
    Implements IContributeObjectSink


    Public Function IsNewContextOK(ByVal newCtx As Context) As Boolean _
    Implements IContextProperty.IsNewContextOK
        Return True
    End Function

    Public Sub Freeze(ByVal newContext As Context) _
    Implements IContextProperty.Freeze
        ' nothing to do
    End Sub

    Public ReadOnly Property Name() As String _
    Implements IContextProperty.Name
        Get
            Return "Interception"
        End Get
    End Property

    Public Function GetObjectSink( _
        ByVal obj As MarshalByRefObject, _
        ByVal nextSink As IMessageSink) As IMessageSink _
        Implements IContributeObjectSink.GetObjectSink

        Return New CheckerSink(nextSink)
    End Function
End Class
