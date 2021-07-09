Imports System.Runtime.Remoting
Imports CustomerLibrary

Module CustomerMain

   Sub Main()
   
      RemotingConfiguration.Configure("CustomerClient.exe.config") 
      
      'Create a proxy to the remote CustomerService object
      Dim custSvc As New CustomerService()

      'Execute the simple Test method
      Console.WriteLine(custSvc.Test())

      'Get a proxy to a remote Customer object
      Dim cust As Customer = custSvc.CreateCustomer("Homer")
      Console.WriteLine(cust.SayHello())
      
      'Get a proxy to the remote CAO Customer object
      Dim caoCust As New CAOCustomer("Marge")
      Console.WriteLine(caoCust.SayHello())

      Console.ReadLine()
   End Sub
End Module
