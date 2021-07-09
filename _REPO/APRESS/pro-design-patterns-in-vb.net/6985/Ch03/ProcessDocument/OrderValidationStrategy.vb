Option Strict On
Option Explicit On 

Imports System.Xml

Public Interface OrderValidationStrategy
    Function IsValid() As Boolean
    Function ValidationErrors() As String
End Interface

Friend Class ValidateSpecialOrder : Implements OrderValidationStrategy

    Dim m_IsValid As Boolean = True
    Dim m_ValidationErrors As String = ""

    Sub New(ByVal docID As String, ByVal doc As XmlDocument)
        Dim productID As Integer
        Dim price As Double
        Dim quantity As Integer
        Dim productNodes As XmlNodeList
        Try
            productNodes = doc.GetElementsByTagName("Product")

            If productNodes.Count = 0 Then
                m_IsValid = False
                m_ValidationErrors = "Order validation failed; " & _
                                     "No product lines identified"
            End If

            Dim i As Integer
            For i = 0 To productNodes.Count - 1
                If IsNumeric(productNodes(i).Attributes(0).Value()) Then
                    productID = CInt(productNodes(i).Attributes(0).Value())
                Else
                    Throw New InvalidCastException("Invalid ProductID data: " & _
                                      productNodes(i).Attributes(0).Value())
                End If

                Dim j As Integer
                For j = 0 To productNodes(i).ChildNodes.Count - 1

                    If productNodes(i).ChildNodes(j).Name = "Price" Then
                        price = CDbl(productNodes(i).ChildNodes(j).InnerXml)
                    ElseIf productNodes(i).ChildNodes(j).Name = "Quantity" Then
                        quantity = CInt(productNodes(i).ChildNodes(j).InnerXml)
                    End If
                Next j
                If productID < 0 Then
                    m_IsValid = False
                    m_ValidationErrors &= _
                          "Unrecoginized ProductID: " & productID & vbCrLf
                End If
                If price < 0 Or quantity < 0 Then
                    m_IsValid = False
                    m_ValidationErrors &= _
                          "Negative price/quantity information submitted " & _
                          "for ProductID = " & productID & vbCrLf
                End If
            Next i
        Catch e As InvalidCastException
            m_IsValid = False
            m_ValidationErrors = "Invalid product data submitted: " & e.Message
        Catch e As Exception
            Throw New Exception("Unable to validate order data for DocID = " & docID, e)
        End Try
    End Sub

    Function IsValid() As Boolean Implements OrderValidationStrategy.IsValid
        Return m_IsValid
    End Function

    Function ValidationErrors() As String Implements OrderValidationStrategy.ValidationErrors
        Return m_ValidationErrors
    End Function

End Class

Friend Class ValidateOrder : Implements OrderValidationStrategy
    Dim m_IsValid As Boolean = True
    Dim m_ValidationErrors As String = ""

    Sub New(ByVal docID As String, ByVal doc As XmlDocument)
        Dim productID As Integer
        Dim price As Double
        Dim requiredDate As Date
        Dim productNodes As XmlNodeList
        Try
            productNodes = doc.GetElementsByTagName("Product")
            If productNodes.Count = 0 Then
                m_IsValid = False
                m_ValidationErrors = "Order validation failed; " & _
                                     "No product lines identified"
            End If

            Dim i As Integer
            For i = 0 To productNodes.Count - 1
                productID = CInt(productNodes(i).Attributes(0).Value())

                Dim j As Integer
                For j = 0 To productNodes(i).ChildNodes.Count - 1
                    If productNodes(i).ChildNodes(j).Name = "Price" Then
                        price = CDbl(productNodes(i).ChildNodes(j).InnerXml)
                    ElseIf productNodes(i).ChildNodes(j).Name = "RequiredDate" Then
                        requiredDate = CDate(productNodes(i).ChildNodes(j).InnerXml)
                    End If
                Next j

                If price < 0 Then
                    m_IsValid = False
                    m_ValidationErrors &= _
                             "Negative price information submitted " & _
                             "for ProductID = " & productID & vbCrLf
                End If

                If requiredDate < Now Then
                    m_IsValid = False
                    m_ValidationErrors &= "Invalid required due date " & _
                                          "for ProductID = " & productID & vbCrLf
                End If
            Next i
        Catch e As Exception
            Throw New Exception("Unable to validate order data for DocID = " & docID, e)
        End Try
    End Sub

    Function IsValid() As Boolean _
                         Implements OrderValidationStrategy.IsValid
        Return m_IsValid
    End Function

    Function ValidationErrors() As String _
                Implements OrderValidationStrategy.ValidationErrors
        Return m_ValidationErrors
    End Function

End Class



