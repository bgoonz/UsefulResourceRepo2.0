Option Strict On
Option Explicit On 

Imports System.Xml
Imports System.Threading
Imports LegacyWrapper

Public Class CheckInventory : Inherits Processes

    Public Sub New(ByRef doc As ProcessDocument)
        MyBase.New(doc)
        If doc.DocStatus <> DocumentCodes.Status.Errors Then
            Dim productID As Integer
            Dim price As Double
            Dim quantity As Integer
            Dim productNodes As XmlNodeList

            Threading.Thread.CurrentThread.ApartmentState = ApartmentState.STA
            Dim m_Inventory As New LegacyWrapper.ProductInventory()

            Try
                productNodes = doc.DocXML.GetElementsByTagName("Product")
                If productNodes.Count = 0 Then
                    doc.DocErrors = "Can not check inventory; " & _
                    "no product lines identified."
                End If

                Dim i As Integer
                For i = 0 To productNodes.Count - 1
                    productID = CInt(productNodes(i).Attributes(0).Value())
                    Dim j As Integer
                    For j = 0 To productNodes(i).ChildNodes.Count - 1
                        If productNodes(i).ChildNodes(j).Name = "Price" Then
                            price = CDbl(productNodes(i).ChildNodes(j).InnerXml)
                        ElseIf productNodes(i).ChildNodes(j).Name = "Quantity" Then
                            quantity = CInt(productNodes(i).ChildNodes(j).InnerXml)
                        End If
                    Next j

                    If Not m_Inventory.CheckProductPrice(productID, price) Then
                        doc.DocErrors = "Product ID #" & _
                                        productID.ToString & " is improperly priced."
                    End If

                    If m_Inventory.UnitsInStock(productID) < quantity Then
                        doc.DocErrors = "Product ID #" & productID.ToString _
                                        & " out of stock"
                    End If
                Next i
            Catch e As Exception
                Throw New Exception("Unable to check inventory for DocID = " _
                                                                     & DocID, e)
            End Try
        End If
    End Sub
End Class
