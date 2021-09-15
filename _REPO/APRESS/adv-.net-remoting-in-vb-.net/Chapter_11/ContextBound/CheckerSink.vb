Option Explicit On 
Option Strict On

Imports System
Imports System.Reflection
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Activation
Imports System.Runtime.Remoting.Contexts
Imports System.Runtime.Remoting.Messaging

Public Class CheckerSink
    Implements IMessageSink
    Private _nextSink As IMessageSink
    Private _mType As String

    Public Sub New(ByVal nextSink As IMessageSink)
        _nextSink = nextSink
    End Sub

    Public Function SyncProcessMessage(ByVal msg As IMessage) As IMessage _
    Implements IMessageSink.SyncProcessMessage
        DoCheck(msg)
        Return _nextSink.SyncProcessMessage(msg)
    End Function

    Public Function AsyncProcessMessage( _
        ByVal msg As IMessage, _
        ByVal replySink As IMessageSink) As IMessageCtrl _
        Implements IMessageSink.AsyncProcessMessage

        DoCheck(msg)
        Return _nextSink.AsyncProcessMessage(msg, replySink)
    End Function

    Public ReadOnly Property NextSink() As IMessageSink _
    Implements IMessageSink.NextSink
        Get
            Return _nextSink
        End Get
    End Property

    Private Sub DoCheck(ByVal imsg As IMessage)
        ' not interested in IConstructionCallMessages
        If TypeOf imsg Is IConstructionCallMessage Then Exit Sub
        If Not TypeOf imsg Is IMethodCallMessage Then Exit Sub
        Dim msg As IMethodMessage = CType(imsg, IMethodMessage)

        ' Check for the Attribute
        Dim methodbase As MemberInfo = msg.MethodBase

        Dim attrs As Object() = methodbase.GetCustomAttributes(False)

        Dim attr As Attribute
        For Each attr In attrs
            ' only interested in CheckAttributes 
            If Not TypeOf attr Is CheckAttribute Then GoTo continue_attr_1
            Dim check As CheckAttribute = CType(attr, CheckAttribute)

            ' if the method only has one parameter, place the check directly
            ' on it (needed for property set methods)
            If msg.ArgCount = 1 Then
                check.DoCheck(msg.Args(0))
            End If
continue_attr_1:
        Next attr

        ' check the Attribute for each parameter of this method
        Dim parms As ParameterInfo() = msg.MethodBase.GetParameters()

        Dim i As Integer
        For i = 0 To parms.Length - 1
            attrs = parms(i).GetCustomAttributes(False)
            For Each attr In attrs
                ' only interested in CheckAttributes 
                If Not TypeOf attr Is CheckAttribute Then
                    GoTo continue_attr_2
                End If

                Dim check As CheckAttribute = CType(attr, CheckAttribute)

                check.DoCheck(msg.Args(i))
continue_attr_2:
            Next attr
        Next i
    End Sub
End Class
