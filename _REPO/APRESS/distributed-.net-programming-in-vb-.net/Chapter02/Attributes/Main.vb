Imports System.Reflection

Module Attributes

   Sub Main()
      'Process the attributes applied to the class. Although the function
      'takes a MemberInfo arg, this still works because Type derives from
      'the MemberInfo class.
      ProcessCustomAttributes(GetType(Car))

      'Process the attributes applied to all members in the Car class
      Dim mi as MemberInfo
      For Each mi in GetType(Car).GetMembers()
         ProcessCustomAttributes(mi)
      Next

      Console.ReadLine()
   End Sub

   Private Sub ProcessCustomAttributes(info As MemberInfo)
      Dim myAttr as MyCustomAttribute

      Dim attr as Attribute
      For Each attr In info.GetCustomAttributes(false)
         'Is the attribute of type MyCustomAttribute?
         If TypeOf(attr) Is MyCustomAttribute Then
            myAttr = CType(attr, MyCustomAttribute)
            Console.WriteLine(myAttr.Description)
         End If
      Next
   End Sub

End Module

<Serializable(), Obsolete("No one uses horse and buggies anymore.", false)> _
Public Class HorseAndBuggy
   'Class implementation
End Class

<AttributeUsage(AttributeTargets.Class Or AttributeTargets.Method)> _
Public Class MyCustomAttribute 
   Inherits Attribute

   Private mDescription As String

   Public Sub New(description As String)
      mDescription = description
   End Sub

   Public ReadOnly Property Description() as String
      Get 
         Return mDescription
      End Get
   End Property
End Class

<MyCustom("This is yet another car class")> _
Public Class Car
   'Uncomment line below to get compile error.
   '<MyCustom("Can't apply to a field")> _
   Private mColor As String

   <MyCustom("Apply to a method")> _
   Public Function Accelerate() As Integer
   End Function
End Class