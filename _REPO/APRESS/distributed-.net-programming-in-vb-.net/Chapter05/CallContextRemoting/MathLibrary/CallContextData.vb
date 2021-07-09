Imports System.Runtime.Remoting.Messaging 'For ILogicalThreadAffinative

<Serializable()> _
Public Class CallContextData
   Implements ILogicalThreadAffinative
   
   Private mData As Object
   
   Public Sub New(data As Object)
      mData = data
   End Sub

   Public Readonly Property Data() As Object
      Get 
         Return mData
      End Get
   End Property
End Class