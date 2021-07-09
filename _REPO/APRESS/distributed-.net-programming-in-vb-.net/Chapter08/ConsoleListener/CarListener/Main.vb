Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Channels.Tcp

Module CarListenerMain

   Sub Main()
      'Create a TCP channel specifying the port #
      Dim channel As IChannel = New TcpChannel(13101)

      'Register the channel with the runtime remoting services
      ChannelServices.RegisterChannel(channel)

      'Register CarService as a well known type
      RemotingConfiguration.RegisterWellKnownServiceType( _
         GetType(SimpleCarLibrary.CarService), _
         "CarService", _
         WellKnownObjectMode.SingleCall)

      'Keep the server alive until enter is pressed.
      Console.WriteLine("Press Enter to end")
      Console.ReadLine()
   End Sub
   
End Module
