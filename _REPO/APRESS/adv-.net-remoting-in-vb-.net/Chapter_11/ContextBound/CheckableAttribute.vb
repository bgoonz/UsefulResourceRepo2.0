Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Contexts
Imports System.Runtime.Remoting.Activation
Imports System.Runtime.Remoting.Messaging

<AttributeUsage(AttributeTargets.Class)> _
Public Class CheckableAttribute
    Inherits ContextAttribute

    Public Sub New()
        MyBase.New("MyInterception")
    End Sub

    Public Overrides Function IsContextOK( _
        ByVal ctx As Context, _
        ByVal ctor As IConstructionCallMessage) As Boolean _

        ' if this is already an intercepting context, it's ok for us
        Return Not (ctx.GetProperty("Interception") Is Nothing)
    End Function

    Public Overrides Sub GetPropertiesForNewContext( _
        ByVal ctor As IConstructionCallMessage)

        ' add the context property which will later create a sink
        ctor.ContextProperties.Add(New CheckableContextProperty())
    End Sub

End Class
