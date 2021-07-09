Module DelegateMain

   'FooBar delegate refers to any function that takes a
   'single int argument and returns an int.
   Private Delegate Function FooBar(i As Integer) As Integer
   
   'Foo returns given integer, and matches the delegate signature
   Private Function Foo(i As Integer) As Integer
      Return i
   End Function 
   
   'Bar adds two integers, does not match the delegate signature
   Private Function Bar(i As Integer, j As Integer) As Integer
      Return i
   End Function 
   
   'This is our function that requires a delegate to any
   'function matching the FooBar signature
   Private Function DoIt(f As FooBar, value As Integer) As Integer
      Return f(value)
   End Function
   
   Sub Main()
      Console.WriteLine(DoIt(New FooBar(AddressOf Foo), 6))

      'No way to "trick" this to compile!!
      'Console.WriteLine(DoIt(new FooBar(AddressOf Bar), 6))

      Console.ReadLine()
   End Sub
End Module