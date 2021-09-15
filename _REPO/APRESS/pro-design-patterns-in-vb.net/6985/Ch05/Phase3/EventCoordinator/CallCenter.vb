Imports System
Imports System.Runtime.Remoting
Imports System.Collections

Namespace CallCenter


    ' Define CallEventHandler delegate
    ' Wraps function pointers to call event handlers
    Public Delegate Sub CallEventHandler(al As ArrayList)




    ' Define EventCoordinator class
    ' Thus is a Singleton class that dispatches Call events from PBX box to CSRs
    Public Class EventCoordinator 
        Inherits MarshalByRefObject

        Public m_evntCall As CallEventHandler      ' Delegate instance
        Private m_CallInfoArray As ArrayList       ' Call event's properties

        'Function wrapped by AsyncCallback delegate (introduced in phase 2)
        Public Sub onCallEventHandlerReturn(ar As IAsyncResult)
            Console.WriteLine("onCallEventHandlerReturn() call complete.")
        End Sub 'onCallEventHandlerReturn


        ' This method is called to trigger the Call event (amended in phase 2)
        Public Sub fireCallEvent()
            Console.WriteLine("EventCoordinator.fireCallEvent() called.")
            Dim cb As AsyncCallback = AddressOf Me.onCallEventHandlerReturn
            Dim state As New Object
            Dim ar As IAsyncResult
            Dim invokeList() As System.Delegate = m_evntCall.GetInvocationList()
            Dim callHandler As CallEventHandler

            For Each callHandler In invokeList
                callHandler.BeginInvoke(m_CallInfoArray, cb, state)
            Next

            Console.WriteLine("EventCoordinator now ready for next call event...")
        End Sub 



        ' Methods and properties to allow client to access m_CallInfoArray
        Public Sub Add(infoItem As InfoItem)
            m_CallInfoArray.Add(infoItem)
        End Sub 

        Public Sub RemoveAll()
            m_CallInfoArray.Clear()
        End Sub 

        Public ReadOnly Property Count() As Integer
            Get
                Return m_CallInfoArray.Count
            End Get
        End Property 

        Public Default ReadOnly Property Item(ByVal index As Integer) As Object
            Get
                return m_CallInfoArray.Item(index)
            End Get
        End Property 

        Public Sub New()
            m_CallInfoArray = New ArrayList()
        End Sub 
    End Class 



    ' Define InfoItem class
    ' Represents a name-value pair
    ' Information such as ("Name of Caller", "Dave Gorman") can be stored in instances of this class
    <Serializable()> Public Class InfoItem
        Private m_strName As String
        Private m_strValue As String

        Public Property Name() As String
            Set(ByVal strName As String)
                m_strName = strName
            End Set
            Get
                Return m_strName
            End Get
        End Property 

        Public Property Value() As String
            Set(ByVal strValue As String)
                m_strValue = strValue
            End Set
            Get
                Return m_strValue
          End Get
        End Property 

        Public Sub New(strName As String, strValue As String)
            Me.Name = strName
            Me.Value = strValue
        End Sub 

    End Class 

End Namespace 


