Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels
Imports System.Runtime.Remoting.Channels.Http

Imports CallCenter
Imports Representative


Public Class Client

   Public Shared Sub Main()
      ChannelServices.RegisterChannel(new HttpChannel(0))

      'Get references to CSR and EventCoordinator Remoting objects.
      Console.WriteLine("Preparing server object references...")
      Dim CSRep1 As CSR = _
               CType(Activator.GetObject(GetType(CSR), _
                                         "http://localhost:888/CSR.soap"), _
                     CSR)
      Dim CSRep2 As CSR = _
               CType(Activator.GetObject(GetType(CSR), _
                                         "http://localhost:889/CSR.soap"), _
                     CSR)

      Dim EventCrd As EventCoordinator = _
               CType(Activator.GetObject(GetType(EventCoordinator), _
                            "http://localhost:999/EventCoordinator.soap"), _
                     EventCoordinator)

      Console.WriteLine("Server object references are ready.")

      'Register the event handlers with the call event
      Console.WriteLine("Registering observers...")
      Dim callHandlerCSR1 as CallEventHandler
      callHandlerCSR1 = New CallEventHandler(AddressOf CSRep1.onCall)
      Dim callHandlerCSR2 as CallEventHandler
      callHandlerCSR2 = New CallEventHandler(AddressOf CSRep2.onCall)
      EventCrd.m_evntCall = _
            System.Delegate.Combine(callHandlerCSR1, callHandlerCSR2)

      Console.WriteLine("Observers registered.")
      Console.WriteLine("")


      'Set properties of the Call.
      Console.WriteLine("Setting properties and simulating call event...")
      Dim InfoItem1 As New InfoItem("Phone number", "312-398-8000")
      EventCrd.Add(InfoItem1)
      Dim InfoItem2 As New InfoItem("Member ID", "C37662")
      EventCrd.Add(InfoItem2)

      'Fire Call event
      EventCrd.fireCallEvent() 
      EventCrd.RemoveAll()
      Console.WriteLine("Call event fired. Simulation ends.")   
   End Sub 
End Class 
