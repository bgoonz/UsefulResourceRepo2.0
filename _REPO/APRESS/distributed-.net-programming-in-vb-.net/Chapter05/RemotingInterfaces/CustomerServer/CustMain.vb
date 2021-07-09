Imports System.Runtime.Remoting

Module CustomerServer

   Sub Main()
      Console.WriteLine("Customer Server initializing ...")
      RemotingConfiguration.Configure("CustomerServer.exe.config")

      Console.WriteLine("Waiting for clients. Press 'q' to quit")

      Dim input As String
      Do
         input = Console.ReadLine()
      Loop While input <> "q"
   End Sub   
End Module
