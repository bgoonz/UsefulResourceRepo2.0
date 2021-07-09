Imports System.Messaging

Module SenderMain

   Sub Main      
      'Create the queue instance
      Dim mq As New MessageQueue(".\private$\MyPrivateQ")

      Dim msg As New Message()
      msg.Label = "A message label"
      msg.Body = "The message body"
         
      'This message waits on the queue for a max of 20 seconds.
      msg.TimeToBeReceived = TimeSpan.FromSeconds(20)

      'If the message times out, delete it from destination queue and
      'add and entry to the dead letter queue.
      msg.UseDeadLetterQueue = True
      mq.Send(msg)
     
      Console.ReadLine()
   End Sub
    
End Module
