Public Class CustomerFactory

   Public Shared Function CreateCustomerService() As ICustomerService 
      'Just a trace message to make sure this runs on the client.
      Console.WriteLine("CustomerFactory.CreateCustomerService()")

      Dim obj as Object = Activator.GetObject( _
                             GetType(ICustomerService), _
                             "http://localhost:13101/customer.soap" _
                          )
      Return CType(obj, ICustomerService)
   End Function
End Class
