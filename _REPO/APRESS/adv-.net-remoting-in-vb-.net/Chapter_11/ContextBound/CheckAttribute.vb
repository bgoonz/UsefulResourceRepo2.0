Option Explicit On 
Option Strict On

Imports System

<AttributeUsage(AttributeTargets.Parameter Or AttributeTargets.Method)> _
Public Class CheckAttribute
    Inherits Attribute
    Private _maxLength As Integer
    Private _maxValue As Integer
    Private _nonNull As Boolean

    Public Property MaxLength() As Integer
        Get
            Return _maxLength
        End Get
        Set(ByVal Value As Integer)
            _maxLength = Value
        End Set
    End Property

    Public Property MaxValue() As Integer
        Get
            Return _maxValue
        End Get
        Set(ByVal Value As Integer)
            _maxValue = Value
        End Set
    End Property

    Public Property NonNull() As Boolean
        Get
            Return _nonNull
        End Get
        Set(ByVal Value As Boolean)
            _nonNull = Value
        End Set
    End Property

    Public Sub DoCheck(ByVal val As [Object])
        ' check for NonNull 
        If _nonNull And val Is Nothing Then
            Throw New Exception("This value must not be null")
        End If

        ' check for MaxLength
        If _maxLength > 0 And val.ToString().Length > _maxLength Then
            Throw New Exception("This value must not be longer than " & _
                _maxLength & " characters")
        End If

        ' check for MaxValue
        If _maxValue > 0 Then
            If CDbl(val) > _maxValue Then
                Throw New Exception("This value must not be higher than " & _
                    _maxValue)
            End If
        End If
    End Sub
End Class
