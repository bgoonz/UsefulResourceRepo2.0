<Serializable()> _
Public Class Customer

   Public Name As String         'Public field
   Private mCreditCard As String 'Private field     
   Private mEmail As String      'Private field with public property

   Public Property Email() As String
      Get
         Return mEmail
      End Get
      Set(value as String)
         mEmail = value
      End Set         
   End Property

   Public Sub New(name As String, email As String, ccNum As String)
      Me.Name = name : mEmail = email : mCreditCard = ccNum
   End Sub 

   'Required for serialization   
   Public Sub New()
   End Sub
   
End Class
