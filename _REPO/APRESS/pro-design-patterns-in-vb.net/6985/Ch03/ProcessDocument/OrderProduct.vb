Option Strict On
Option Explicit On 

Imports OrderManagement.Place

Public Class OrderProduct : Inherits Processes
    Dim m_OrderID As String = ""
    Public Sub New(ByRef doc As ProcessDocument)
        MyBase.New(doc)
        If doc.DocStatus <> DocumentCodes.Status.Errors Then
            Dim place As New OrderManagement.Place()
            m_OrderID = place.NewOrder(doc.DocXML)
            If m_OrderID.Length > 0 Then
                doc.DocStatus = DocumentCodes.Status.Complete
            End If
        End If
    End Sub

    Public Function GetOrderID() As String
        Return m_OrderID
    End Function

End Class
