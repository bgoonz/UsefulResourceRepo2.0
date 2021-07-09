Option Strict On
Option Explicit On 

Imports System.Xml

Public Class CheckCredit : Inherits Processes

    'A cleverer developer would grab this value from a config file...
    Private Const MAXIMUM_ORDER_TOTAL As Double = 500D

    Public Sub New(ByRef doc As ProcessDocument)
        MyBase.New(doc)
        If doc.DocStatus <> DocumentCodes.Status.Errors Then
            Dim productID As Integer
            Dim price As Double
            Dim quantity As Integer
            Dim totalOrder As Double
            Dim productNodes As XmlNodeList
            Try
                productNodes = doc.DocXML.GetElementsByTagName("Product")
                If productNodes.Count = 0 Then
                    doc.DocErrors = "Can not check credit; " & _
                    "no product lines identified."
                End If
                Dim i As Integer
                For i = 0 To productNodes.Count - 1
                    Dim j As Integer
                    For j = 0 To productNodes(i).ChildNodes.Count - 1
                        If productNodes(i).ChildNodes(j).Name = "Price" Then
                            price = _
                            CDbl(productNodes(i).ChildNodes(j).InnerXml)
                        ElseIf productNodes(i).ChildNodes(j).Name = _
                        "Quantity" Then
                            quantity = _
                            CInt(productNodes(i).ChildNodes(j).InnerXml)
                        End If
                    Next j
                    totalOrder += price * quantity
                Next i
                If totalOrder > MAXIMUM_ORDER_TOTAL Then
                    doc.DocErrors = _
                    "Total Amount of order exceeds " & _
                    MAXIMUM_ORDER_TOTAL.ToString
                End If
            Catch e As Exception
                Throw New Exception("Unable to check credit for DocID = " _
                & DocID, e)
            End Try
        End If
    End Sub

End Class
