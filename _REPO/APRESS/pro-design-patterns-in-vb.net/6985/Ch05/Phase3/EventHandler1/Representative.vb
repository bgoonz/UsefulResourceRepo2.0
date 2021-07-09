Imports System
Imports System.Threading
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging
Imports System.Collections
Imports Microsoft.VisualBasic
Imports CallCenter

Namespace Representative

    'Event handler interface.	
    Public Interface ICallEventHandler
        Sub onCall(al As ArrayList)
    End Interface 
	
    Public Class CSR 
        Inherits MarshalByRefObject 
        Implements ICallEventHandler

        'Event handler function.
        'For simplicity, we the CSR handles the event by writing the event 
        'properties to the console, and then sleeping for 10 seconds
        Public Sub onCall(al As ArrayList) Implements ICallEventHandler.onCall
            Console.WriteLine("Event passed with an array of {0} properties", al.Count)
            Dim infoItem As InfoItem
            For Each infoItem In al 
                Console.WriteLine("  {0}: {1}", _
                                infoItem.Name, infoItem.Value)
            Next
            Thread.Sleep(10000)
            Console.WriteLine("Slept 10 seconds.")
        End Sub 'onCall
    End Class



    Public Class PolicyDecorator 
        Inherits MarshalByRefObject
        Implements ICallEventHandler

        Private m_CallEventHandler As ICallEventHandler

        Public Sub New(callEventHandler As ICallEventHandler)
            Console.WriteLine("Constructing PolicyDecorator " & _
                              "using {0} constructor ", callEventHandler)
            m_CallEventHandler = callEventHandler
        End Sub

        Public Sub onCall(al As ArrayList) Implements ICallEventHandler.onCall
            If doPolicyCheck(al) Then
                m_CallEventHandler.onCall(al)
            End If
        End Sub

        Overridable Protected Function doPolicyCheck(al As ArrayList) As Boolean
            doPolicyCheck = True
        End Function 
    End Class 



  Public Class IDPolicyDecorator
    Inherits PolicyDecorator

    Public Sub New(callEventHandler As ICallEventHandler) 
      MyBase.New(callEventHandler)
      Console.WriteLine("Constructing IDPolicyDecorator " & _
                        "using {0} constructor ", callEventHandler)
    End Sub 

    Overrides Protected Function doPolicyCheck(al As ArrayList) As Boolean
      Dim bResult As Boolean = False
      Dim infoItem As InfoItem
      For Each infoItem In al
        If infoItem.Name = "Member ID" Then
          Dim iMemberID As Integer
          iMemberID = Convert.ToInt32(infoItem.Value)
          If (iMemberID >= 100 And iMemberID <= 200) Then
            Console.WriteLine("Member with MemberID {0} accepted.", iMemberID)
            bResult = True
          Else 
            Console.WriteLine("Member with MemberID {0} rejected.", iMemberID)
            bResult = False
          End If
        End If
      Next
      doPolicyCheck = bResult
    End Function 
  End Class 



  Public Class AreaPolicyDecorator
    Inherits PolicyDecorator

    Public Sub New(callEventHandler As ICallEventHandler) 
      MyBase.New(callEventHandler)
      Console.WriteLine("Constructing AreaPolicyDecorator " & _
                        "using {0} constructor ", callEventHandler)
    End Sub 

    Overrides Protected Function doPolicyCheck(al As ArrayList) As Boolean
      Dim bResult As Boolean = False
      Dim infoItem As InfoItem
      For Each infoItem In al
        If infoItem.Name = "Area Code" Then
          If infoItem.Value = "408" Then 
            Console.WriteLine("Call from area code {0} accepted.", infoItem.Value)
            bResult = True
          Else 
            Console.WriteLine("Call from area code {0} rejected.", infoItem.Value)
            bResult = False
          End If
        End If
      Next
      doPolicyCheck = bResult
    End Function 
  End Class 



End Namespace






