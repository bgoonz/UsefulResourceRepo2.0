Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Runtime.Remoting.Channels 'Channel Services
Imports System.Runtime.Remoting.Channels.Http 'HTTP Channel
Imports MathLibrary

Module MathClient

   Sub Main()
      'Create and register the channel. The default channel ctor
      'does not open a port, so we can't use this to receive messages.
      Dim channel As New HttpChannel()
      ChannelServices.RegisterChannel(channel)

      'Get a proxy to the remote object
      Dim remoteObj As Object = Activator.GetObject( _
                                   GetType(MathLibrary.SimpleMath), _
                                   "http://localhost:13101/MyURI.soap" _
                                )

      'Cast the returned proxy to the SimpleMath type
      Dim math As SimpleMath = CType(remoteObj, SimpleMath)

      'Use the remote object. Loop until user enters 'q'
      Do            
	      Console.WriteLine("5 + 2 = {0}", math.Add(5,2))
	      Console.Write("Enter q to quit: ")
      Loop While Console.ReadLine() <> "q"

      'Ask user to press Enter
      Console.Write("Press enter to end")
      Console.ReadLine()
   End Sub

End Module
