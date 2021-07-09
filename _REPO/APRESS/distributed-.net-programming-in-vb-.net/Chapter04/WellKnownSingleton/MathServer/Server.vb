Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Runtime.Remoting.Channels 'Channel Services
Imports System.Runtime.Remoting.Channels.Http 'HTTP Channel

Module MathServer

   Sub Main()
      'Create a channel specifying the port #
      Dim channel As New HttpChannel(13101)
      
      'Register the channel with the runtime remoting services
      ChannelServices.RegisterChannel(channel)

      'Register a type as a well-known type
      RemotingConfiguration.RegisterWellKnownServiceType( _
         GetType(MathLibrary.SimpleMath), _ 
         "MyURI.soap", _ 
         WellKnownObjectMode.Singleton _
      )

      'Keep the server alive until Enter is pressed.
      Console.WriteLine("Server started. Press Enter to end")
      Console.ReadLine()
   End Sub

End Module
