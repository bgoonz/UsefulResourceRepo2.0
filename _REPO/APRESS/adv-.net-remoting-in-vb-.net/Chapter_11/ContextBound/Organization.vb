Option Explicit On 
Option Strict On

Imports System

<Checkable()> _
Public Class Organization
    Inherits ContextBoundObject
    Private _name As String
    Private _totalDonation As Double

    Public Property Name() As String
        Get
            Return _name
        End Get

        <Check(NonNull:=True, MaxLength:=30)> _ 
        Set(ByVal Value As String)
            _name = Value
        End Set
    End Property

    Public Sub Donate(<Check(MaxValue:=100)> ByVal amount As Double)
        _totalDonation = _totalDonation + amount
    End Sub
End Class
