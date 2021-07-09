Imports System
Imports System.Collections
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Proxies
Imports System.Runtime.Remoting.Messaging

Public Class CustomProxy
    Inherits RealProxy
    Private _url As String
    Private _uri As String
    Private _sinkChain As IMessageSink

    Public Sub New(ByVal type As Type, ByVal url As String)
        MyBase.New(type)
        _url = url

        ' check each registered channel if it accepts the
        ' given URL
        Dim registeredChannels As IChannel() = _ 
            ChannelServices.RegisteredChannels
        
        Dim channel As IChannel

        For Each channel In registeredChannels
            If TypeOf channel Is IChannelSender Then
                Dim channelSender As IChannelSender = CType(channel, _ 
                    IChannelSender)

                ' try to create the sink
                _sinkChain = channelSender.CreateMessageSink(_url, Nothing, _uri)

                ' if the channel returned a sink chain, exit the loop
                If Not (_sinkChain Is Nothing) Then
                    Exit For
                End If
            End If
        Next channel

        ' no registered channel accepted the URL
        If _sinkChain Is Nothing Then
            Throw New Exception("No channel has been found for " + _url)
        End If
    End Sub

    Public Overrides Function Invoke(ByVal msg As IMessage) As IMessage
        DumpMessageContents(msg)
        msg.Properties("__Uri") = _url

        Dim retMsg As IMessage = _sinkChain.SyncProcessMessage(msg)

        DumpMessageContents(retMsg)

        Return retMsg
    End Function

    Private Function GetPaddedString(ByVal str As String) As String
        Dim ret As String = str + "                  "
        Return ret.Substring(0, 17)
    End Function

    Private Sub DumpMessageContents(ByVal msg As IMessage)
        Console.WriteLine("========================================")
        Console.WriteLine("============ Message Dump ==============")
        Console.WriteLine("========================================")

        Dim o As Object = msg
        Console.WriteLine("Type: {0}", o.GetType().ToString())

        Console.WriteLine("--- Properties ---")
        Dim dict As IDictionary = msg.Properties
        Dim enm As IDictionaryEnumerator = CType(dict.GetEnumerator(), _ 
            IDictionaryEnumerator)

        While enm.MoveNext()
            Dim key As Object = enm.Key
            Dim keyName As String = key.ToString()
            Dim val As Object = enm.Value

            Console.WriteLine("{0}: {1}", GetPaddedString(keyName), val)

            ' check if it's an object array

            If TypeOf (val) Is Object() Then
                DumpObjectArray(CType(val, Object()))
            End If
        End While

        Console.WriteLine()
        Console.WriteLine()
    End Sub

    Private Sub DumpObjectArray(ByVal data() As Object)
        ' if empty -> return
        If data.Length = 0 Then
            Return
        End If

        Console.WriteLine(ControlChars.Tab + " --- Array Contents ---")

        Dim i As Integer
        For i = 0 To data.Length - 1
            Console.WriteLine(ControlChars.Tab + "{0}: {1}", i, data(i))
        Next i
    End Sub

End Class
