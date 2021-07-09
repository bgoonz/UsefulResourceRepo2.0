Option Strict On
Option Explicit On 

Imports System.Messaging

Public Class Place

    Public Function NewOrder(ByVal xmlDoc As Xml.XmlDocument) As String
        Dim orderID As String
        Dim msgQueue As MessageQueue
        Dim msgDoc As New Message()
        msgQueue = SimpleQueueManager.GetQueue

        With msgDoc
            .Label = "Order " & Now.ToUniversalTime.ToString
            .Body = xmlDoc.InnerXml
        End With

        Try
            msgQueue.Send(msgDoc)
            orderID = msgDoc.Id
        Catch e As Exception
            Throw New Exception( _
            "Unable to send order to the " & msgQueue.QueueName & " queue", e)
        Finally
            msgQueue.Close()
        End Try

        orderID = "NW000" & _
                      Right(orderID, orderID.Length - InStr(orderID, "\"))
        Return orderID
    End Function

End Class
