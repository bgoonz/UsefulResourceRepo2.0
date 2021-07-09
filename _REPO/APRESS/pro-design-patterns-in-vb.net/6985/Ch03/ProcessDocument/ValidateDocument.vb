Option Strict On
Option Explicit On 

Public Class ValidateDocument : Inherits Processes

    Public Sub New(ByRef doc As ProcessDocument)
        MyBase.New(doc)

        If doc.DocStatus <> DocumentCodes.Status.Errors Then
            Dim valid As OrderValidationStrategy
            Select Case doc.DocType
                Case DocumentCodes.Type.SpecialOrder
                    valid = New ValidateSpecialOrder(doc.DocID, doc.DocXML)
                Case DocumentCodes.Type.Order
                    valid = New ValidateOrder(doc.DocID, doc.DocXML)
            End Select

            If valid.IsValid = False Then
                doc.DocErrors = valid.ValidationErrors
            End If
        End If
    End Sub

End Class
