Imports System.Runtime.Remoting 'General remoting stuff
Imports MathLibrary

Module MathClient

   Sub Main()

      'RemotingConfiguration.RegisterActivatedClientType( _
      '   GetType(MathLibrary.Customer), _
      '   "http://localhost:13101" _
      ')

      RemotingConfiguration.Configure("MathClient.exe.config")

      'Calling a nondefault constructor. No exceptions now because
      'Customer is a client-activated object.
      Dim cust As New Customer("Homer")

      Console.WriteLine(cust.SayHello())
      Console.ReadLine()

   End Sub

End Module
