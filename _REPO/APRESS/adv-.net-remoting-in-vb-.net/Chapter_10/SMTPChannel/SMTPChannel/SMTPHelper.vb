Option Explicit On 
Option Strict On

Imports System
Imports System.Text
Imports System.IO
Imports System.Collections
Imports System.Runtime.Remoting.Channels
Imports System.Threading

Public Module SMTPHelper

    ' threads waiting for response
    Private  _waitingFor As IDictionary = _
        Hashtable.Synchronized(New Hashtable())

    ' known servers
    Private  _servers As IDictionary = _
        Hashtable.Synchronized(New Hashtable())

    ' responses received
    Private  _responses As IDictionary = _
        Hashtable.Synchronized(New Hashtable())

    ' sending messages
    Private  Sub SendMessage( _
        ByVal ID As String, _
        ByVal replyToId As String, _
        ByVal mailfrom As String, _
        ByVal mailto As String, _
        ByVal smtpServer As String, _
        ByVal headers As ITransportHeaders, _
        ByVal stream As Stream, _
        ByVal objectURI As String)

        Dim msg As New StringBuilder()

        If Not (ID Is Nothing) Then
            msg.Append("Message-Id: ").Append(ID)
            msg.Append(ControlChars.Cr + ControlChars.Lf)
        End If
        If Not (replyToId Is Nothing) Then
            msg.Append("In-Reply-To: ").Append(replyToId)
            msg.Append(ControlChars.Cr + ControlChars.Lf)
        End If
        msg.Append("From: ").Append(mailfrom)
        msg.Append(ControlChars.Cr + ControlChars.Lf)
        msg.Append("To: ").Append(mailto)
        msg.Append(ControlChars.Cr + ControlChars.Lf)
        msg.Append("MIME-Version: 1.0")
        msg.Append(ControlChars.Cr + ControlChars.Lf)
        msg.Append("Content-Type: text/xml; charset=utf-8")
        msg.Append(ControlChars.Cr + ControlChars.Lf)
        msg.Append("Content-Transfer-Encoding: BASE64")

        ' write the remoting headers			
        Dim headerenum As IEnumerator = headers.GetEnumerator()
        While headerenum.MoveNext()
            Dim entry As DictionaryEntry = CType(headerenum.Current, DictionaryEntry)
            Dim key As String = CType(entry.Key, String)

            If key Is Nothing Or key.StartsWith("__") Then
                GoTo ContinueWhile
            End If
            msg.Append("X-REMOTING-").Append(key).Append(": ")
            msg.Append(entry.Value.ToString())
            msg.Append(ControlChars.Cr + ControlChars.Lf)
ContinueWhile:
        End While

        If Not (objectURI Is Nothing) Then
            msg.Append("X-REMOTING-URI: ").Append(objectURI)
            msg.Append(ControlChars.Cr + ControlChars.Lf)
        End If

        msg.Append(ControlChars.Cr + ControlChars.Lf)
        Dim fs As New MemoryStream()

        Dim buf() As Byte = New [Byte](1000) {}
        Dim cnt As Integer = stream.Read(buf, 0, 1000)
        Dim bytecount As Integer = 0
        While cnt > 0
            fs.Write(buf, 0, cnt)
            bytecount += cnt
            cnt = stream.Read(buf, 0, 1000)
        End While

        ' convert the whole string to Base64 encoding
        Dim body As String = Convert.ToBase64String(fs.GetBuffer(), 0, bytecount)

        ' and ensure the maximum line length of 73 characters
        Dim linesNeeded As Integer = CInt(Math.Ceiling((body.Length / 73)))

        Dim i As Integer
        For i = 0 To linesNeeded - 1
            If i <> linesNeeded - 1 Then
                Dim line As String = body.Substring(i * 73, 73)
                msg.Append(line).Append(ControlChars.Cr + ControlChars.Lf)
            Else
                Dim line As String = body.Substring((i * 73))
                msg.Append(line).Append(ControlChars.Cr + ControlChars.Lf)
            End If
        Next i

        ' send the resulting message
        Dim con As New SMTPConnection(smtpServer)
        con.SendMessage(mailfrom, mailto, msg.ToString())
    End Sub

    Friend  Sub SendRequestMessage( _
        ByVal mailfrom As String, _
        ByVal mailto As String, _
        ByVal smtpServer As String, _
        ByVal headers As ITransportHeaders, _
        ByVal request As Stream, _
        ByVal objectURI As String, _
        ByRef ID As String)

        ID = "<" + Guid.NewGuid().ToString().Replace("-", "") + "@REMOTING>"
        SendMessage(ID, Nothing, mailfrom, mailto, smtpServer, headers, _
            request, objectURI)

        POP3PollManager.RequestSent()
    End Sub

    Friend  Sub SendResponseMessage( _
        ByVal mailfrom As String, _
        ByVal mailto As String, _
        ByVal smtpServer As String, _
        ByVal headers As ITransportHeaders, _
        ByVal response As Stream, _
        ByVal ID As String)

        SendMessage(Nothing, ID, mailfrom, mailto, smtpServer, headers, _
            response, Nothing)
    End Sub

    ' waiting for responses
    Friend  Function WaitAndGetResponseMessage(ByVal ID As String) As POP3Msg
        ' suspend the thread until the message returns
        _waitingFor(ID) = Thread.CurrentThread

        Thread.CurrentThread.Suspend()

        ' waiting for resume
        Dim pop3msg As POP3Msg = CType(_responses(ID), POP3Msg)
        _responses.Remove(ID)
        Return pop3msg
    End Function

    Friend  Sub RegisterAsyncResponseHandler( _
        ByVal ID As String, _
        ByVal ar As AsyncResponseHandler)

        _waitingFor(ID) = ar
    End Sub

    ' handling responses
    Friend  Sub MessageReceived(ByVal pop3msg As POP3Msg)
        ' whenever a pop3 message has been received, it
        ' will be forwarded to this method

        ' check if it's a request or a reply
        If pop3msg.InReplyTo Is Nothing AndAlso _
            Not (pop3msg.MessageId Is Nothing) Then

            ' it's a request
            Dim requestID As String = pop3msg.MessageId

            ' Request received 
            ' check for a registered server
            Dim snk As SMTPServerTransportSink = CType(_servers( _
                GetCleanAddress(pop3msg.MsgTo)), SMTPServerTransportSink)

            If snk Is Nothing Then
                ' No server side sink found for address 
                Return
            End If

            ' Dispatch the message to serversink
            snk.HandleIncomingMessage(pop3msg)
        ElseIf Not (pop3msg.InReplyTo Is Nothing) Then
            ' a response must contain the in-reply-to header
            Dim responseID As String = pop3msg.InReplyTo.Trim()

            ' check who's waiting for it
            Dim notify As Object = _waitingFor(responseID)

            If TypeOf notify Is Thread Then
                _responses(responseID) = pop3msg

                ' Waiting thread found. Will wake it up
                _waitingFor.Remove(responseID)
                CType(notify, Thread).Resume()
                POP3PollManager.ResponseReceived()
            ElseIf TypeOf notify Is AsyncResponseHandler Then
                _waitingFor.Remove(responseID)
                POP3PollManager.ResponseReceived()
                Dim ar As AsyncResponseHandler = CType(notify, AsyncResponseHandler)
                ar.HandleAsyncResponsePop3Msg(pop3msg)
            Else
                ' No one is waiting for this reply. Ingore.
            End If
        End If
    End Sub

    ' helper to split the message
    Friend  Sub ProcessMessage( _
        ByVal pop3msg As POP3Msg, _
        ByRef headers As ITransportHeaders, _
        ByRef stream As Stream, _
        ByRef ID As String)

        ' this method will split it into a TransportHeaders and 
        ' a Stream object and will return the "remoting ID"
        headers = New TransportHeaders()

        ' first all remoting headers (which start with "X-REMOTING-")
        ' will be extracted and stored in the TransportHeaders object
        Dim tmp As String = pop3msg.Headers
        Dim pos As Integer = tmp.IndexOf(ControlChars.Lf + "X-REMOTING-")
        While pos >= 0
            Dim pos2 As Integer = tmp.IndexOf(ControlChars.Lf, pos + 1)
            Dim oneline As String = tmp.Substring(pos + 1, pos2 - pos - 1)

            Dim poscolon As Integer = oneline.IndexOf(":")
            Dim key As String = oneline.Substring(11, poscolon - 11).Trim()
            Dim headervalue As String = oneline.Substring((poscolon + 1)).Trim()
            If key.ToUpper() <> "URI" Then
                headers(key) = headervalue
            Else
                headers("__RequestUri") = headervalue
            End If
            pos = tmp.IndexOf(ControlChars.Lf + "X-REMOTING-", pos2)
        End While

        Dim fulltext As String = pop3msg.Body
        fulltext = fulltext.Trim()
        Dim buffer As Byte() = Convert.FromBase64String(fulltext)
        stream = New MemoryStream(buffer)

        ID = pop3msg.MessageId
    End Sub

    ' helpers
    Public Sub RegisterServer( _
        ByVal snk As SMTPServerTransportSink, _
        ByVal address As String)

        ' Registering sink for a specified email address
        _servers(address) = snk
    End Sub

    Friend Sub parseURL( _
        ByVal url As String, _
        ByRef email As String, _
        ByRef objectURI As String)

        ' format:   "smtp:user@host.domain/URL/to/object"
        ' is splitted to:
        '		email = user@host.domain
        '		objectURI = /URL/to/object
        Dim pos As Integer = url.IndexOf("/")
        If pos > 0 Then
            email = url.Substring(5, pos - 5)
            objectURI = url.Substring(pos)
        Else
            If pos = -1 Then
                email = url.Substring(5)
                objectURI = ""
            Else
                email = Nothing
                objectURI = url
            End If
        End If
    End Sub

    Public Function GetCleanAddress(ByVal address As String) As String
        ' changes any kind of address like "someone@host" 
        ' "<someone@host>" "<someone@host> someone@host"
        ' to a generic format of "someone@host"
        address = address.Trim()
        Dim posAt As Integer = address.IndexOf("@")
        Dim posSpaceAfter As Integer = address.IndexOf(" ", posAt)
        If posSpaceAfter <> -1 Then
            address = address.Substring(0, posSpaceAfter)
        End If
        Dim posSpaceBefore As Integer = address.LastIndexOf(" ")

        If posSpaceBefore <> -1 And posSpaceBefore < posAt Then
            address = address.Substring((posSpaceBefore + 1))
        End If

        Dim posLt As Integer = address.IndexOf("<")
        If posLt <> -1 Then
            address = address.Substring((posLt + 1))
        End If

        Dim posGt As Integer = address.IndexOf(">")
        If posGt <> -1 Then
            address = address.Substring(0, posGt)
        End If

        Return address
    End Function
End Module
