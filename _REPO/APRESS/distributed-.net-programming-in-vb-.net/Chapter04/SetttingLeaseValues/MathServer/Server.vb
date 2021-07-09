Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Runtime.Remoting.Channels 'Channel Services
Imports System.Runtime.Remoting.Channels.Http   'HTTP Channel

Module MathServer

   Sub Main()
      'Read remoting info from config file.
      RemotingConfiguration.Configure("MathServer.exe.config")

      'Keep the server alive until Enter is pressed.
      Console.WriteLine("Server started. Press Enter to end ...")
      Console.ReadLine()
   End Sub

End Module
