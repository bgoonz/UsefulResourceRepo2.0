Imports System.IO
Imports System.Runtime.Serialization.Formatters.Soap
Imports System.Runtime.Serialization

Module Serialization

   Sub Main()
      Dim myCar As New Car("Christine", 150, "Red")
      Dim mySoapfile as Stream = File.Create("Car.txt")
         
      'Use a SOAP formatter object to serialize the object.
      Dim formatter As New SoapFormatter()
      formatter.Serialize(mySoapFile, myCar)
                     
      mySoapFile.Close()

      Rehydrate()
   End Sub

   Sub Rehydrate()
      Dim mySoapFile as Stream = File.OpenRead("Car.txt")
         
      Dim myCar As Car = CType(New SoapFormatter().Deserialize(mySoapFile), Car)

      mySoapFile.Close()
   End Sub
End Module

<Serializable()> _
Public Class Car 
   Implements ISerializable

   Private mColor As String
   Private mTopSpeed As Integer
   Private mRadio As Radio

   'Since we are manually serializing fields, we don't
   'need the NonSerialized attribute on this field.
   Private mNickName As String

   'Required by the ISerializable interface
   Public Sub GetObjectData(info As SerializationInfo, _
                              context As StreamingContext) _
                              Implements ISerializable.GetObjectData
      If context.State <> StreamingContextStates.CrossProcess Then
         info.AddValue("mRadio", mRadio)
      End If
      info.AddValue("mColor", mColor)
      info.AddValue("mTopSpeed", mTopSpeed)
   End Sub

   'This contructor is required to deserialize the object
   Protected Sub New(info As SerializationInfo, context As StreamingContext)
      mTopSpeed = info.GetInt32("mTopSpeed")
      mColor = info.GetString("mColor")
      mRadio = CType(info.GetValue("mRadio", GetType(Radio)), Radio)
   End Sub

   Public Sub New(nickName As String, topSpeed As Integer, color As String)
      mNickName = nickName
      mTopSpeed = topSpeed
      mColor = color
      mRadio = New Radio()
   End Sub
End Class

<Serializable()> _
Public Class Radio
   Private mVolume As Integer = 5
End Class
