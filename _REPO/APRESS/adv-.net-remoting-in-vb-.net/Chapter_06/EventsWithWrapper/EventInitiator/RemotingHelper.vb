Imports System.Runtime.Remoting
Imports System.Collections

Module RemotingHelper
    Private _isInit As Boolean
    Private _wellKnownTypes As IDictionary

    Public Function GetObject(ByVal type As Type) As Object
        If Not _isInit Then
            InitTypeCache()
            _isInit = True
        End If

        Dim entr As WellKnownClientTypeEntry = _
            CType(_wellKnownTypes(type), WellKnownClientTypeEntry)

        If entr Is Nothing Then
            Throw New RemotingException("Type not found!")
        End If

        Return Activator.GetObject(entr.ObjectType, entr.ObjectUrl)
    End Function

    Private Sub InitTypeCache()
        _wellKnownTypes = New Hashtable()
        Dim entr As WellKnownClientTypeEntry
        For Each entr In RemotingConfiguration.GetRegisteredWellKnownClientTypes()
            _wellKnownTypes.Add(entr.ObjectType, entr)
        Next entr
    End Sub
End Module
