Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Runtime.Remoting.Channels 'Channel Services
Imports System.Runtime.Remoting.Channels.Http 'HTTP Channel
Imports MathLibrary

Module MathClient

   Sub Main()
      
      'constructor param1 = a friendly name for the channel
      'constructor param2 = the binary sink formatter
      Dim channel As IChannel = New HttpClientChannel( _
         "HTTPAndBinary", New BinaryClientFormatterSinkProvider)
         
      ChannelServices.RegisterChannel(channel)
      
      'Uncomment this line to use the remoting config file
      'RemotingConfiguration.Configure("MathClient.exe.config")
         
      'Get a proxy to the remote object
      Dim remoteObj As Object = Activator.GetObject( _
                                   GetType(MathLibrary.SimpleMath), _
                                   "http://localhost/MathService/SimpleMath.soap" _
                                )

      'Cast the returned proxy to the SimpleMath type
      Dim math As SimpleMath = CType(remoteObj, SimpleMath)

      'Use the remote object
      Console.WriteLine("5 + 2 = {0}", math.Add(5,2))
      Console.WriteLine("5 - 2 = {0}", math.Subtract(5,2))

      'Ask user to press Enter
      Console.Write("Press enter to end")
      Console.ReadLine()
   End Sub

End Module
