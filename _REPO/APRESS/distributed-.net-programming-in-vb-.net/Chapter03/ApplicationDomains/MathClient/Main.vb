Imports MathLibrary

Module MathClient

   Sub Main()
      'Grab a reference to the current domain
      Dim myDomain As AppDomain = AppDomain.CurrentDomain

      'Show some info about the math client app domain
      Console.WriteLine()
      Console.WriteLine("Info about the math client app domain ...")
      Console.WriteLine("  Hash Code = {0}", myDomain.GetHashCode())
      Console.WriteLine("  Friendly Name = {0}", myDomain.FriendlyName)
      Console.WriteLine("  App Base = {0}", myDomain.BaseDirectory)
      Console.WriteLine()
    
      Console.WriteLine(" 5 + 3 = {0}", SimpleMath.Add(5,3))
      Console.WriteLine(" 5 - 3 = {0}", SimpleMath.Subtract(5,3))
      Console.ReadLine()
   End Sub

End Module