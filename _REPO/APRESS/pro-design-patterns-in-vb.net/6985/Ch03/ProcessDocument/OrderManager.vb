Option Strict Off
Option Explicit On 

Imports System.Data.SqlClient

Public Class OrderManager
    Private Const CONNECT_STRING As String = "server=Localhost;uid=DocWrox;database=NWindOrderStatus"

    Public Sub Load(ByVal docID As String, ByVal xmlText As String)
        Dim tagOpen As Long
        Dim tagClose As Long
        Dim statusField As String
        Dim docType As String
        Dim order As OrderProduct

        SetStatus(docID, Now.ToString & " Processing")

        Dim doc As New Document()
        If InStr(xmlText, "SpecialOrder.dtd") > 0 Then
            doc.Load(DocumentCodes.Type.SpecialOrder, docID, xmlText)
            order = New OrderProduct(New CheckInventory( _
                                              New ValidateDocument(doc)))

        ElseIf InStr(xmlText, "Order.xsd") > 0 Then
            doc.Load(DocumentCodes.Type.Order, docID, xmlText)
            order = New OrderProduct(New CheckCredit( _
                           New CheckInventory(New ValidateDocument(doc))))

        Else
            Throw New Exception("Unknown document type of " & _
            docType & " for DocID = " & docID)
        End If

        Select Case order.DocStatus
            Case DocumentCodes.Status.Errors
                statusField = Now.ToString & " Errors: " & vbCrLf & _
                                                            order.DocErrors()
            Case DocumentCodes.Status.Complete
                statusField = "Order ID: " & order.GetOrderID
            Case Else
                statusField = Now.ToString & " Processing Incomplete"
        End Select
        statusField = statusField.Replace("'", "")

        SetStatus(docID, statusField)
    End Sub

    Private Sub SetStatus(ByVal docID As String, ByVal Status As String)
        Dim sql As String
        Dim cn As SqlConnection
        Dim cmd As SqlCommand
        Dim param As SqlParameter

        sql = "INSERT DocumentStatus (DocumentID, Status) VALUES("
        sql &= "'" & docID & "'"
        sql &= ", "
        sql &= "'" & Status & "'"
        sql &= ")"

        Try
            cn = New SqlConnection(CONNECT_STRING)
            cmd = New SqlCommand()
            With cmd
                .CommandType = CommandType.Text
                .CommandText = sql
                .Connection = cn
            End With

            cn.Open()
            cmd.ExecuteNonQuery()

        Catch e As Exception
            Throw New Exception("Unable to save status(" & _
                                        Status & ") for DocID = " & docID, e)
        Finally
            cn.Close()
        End Try
    End Sub

End Class
