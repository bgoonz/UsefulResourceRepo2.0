Option Explicit On 
Option Strict On

Imports System
Imports System.Threading

Public Delegate Sub CallbackDelegate(ByVal message As String)

Public Class SomeSAO
    Inherits MarshalByRefObject
    Public Event OnCallback As CallbackDelegate

    Public Sub RaiseCallback(ByVal message As String)
        ' call the delegates manually to remove them if they aren't
        ' active anymore.
        Console.WriteLine("Will raise events now")

        If OnCallbackEvent Is Nothing Then
            Console.WriteLine("No listeners")
        Else
            Console.WriteLine("Number of Listeners: {0}", _
                OnCallbackEvent.GetInvocationList().Length)

            Dim mah As CallbackDelegate = Nothing

            Dim del As System.Delegate
            For Each del In OnCallbackEvent.GetInvocationList()
                Try
                    mah = CType(del, CallbackDelegate)
                    mah(message)
                Catch e As Exception
                    Console.WriteLine("Exception occured, will remove Delegate")
                    OnCallbackEvent = CType(System.Delegate.Remove( _
                        OnCallbackEvent, mah), CallbackDelegate)
                End Try
            Next del
        End If
    End Sub

    Public Function DoSomething(ByVal x As String) As String
        Console.WriteLine("SomeSAO.doSomething called")
        Return x
    End Function


    Public Function GetCAOsName(ByVal mycao As SomeCAO) As String
        Return mycao.Name
    End Function
End Class

Public Class SomeCAO
    Inherits MarshalByRefObject
    Private _name As String

    Public Property Name() As String
        Get
            Console.WriteLine("Returning CAOs name [{0}]", _name)
            Return _name
        End Get
        Set(ByVal Value As String)
            _name = Value
            Console.WriteLine("Setting name of CAO to: {0}", _name)
        End Set
    End Property
End Class

Public Class CallbackEventWrapper
    Inherits MarshalByRefObject

    Public Event OnLocalCallback As CallbackDelegate

    ' don't use OneWay here!
    Public Sub LocallyHandleCallback(ByVal msg As String)
        RaiseEvent OnLocalCallback(msg)
    End Sub

    Public Overrides Function InitializeLifetimeService() As Object
        ' this object has to live "forever"
        Return Nothing
    End Function
End Class
