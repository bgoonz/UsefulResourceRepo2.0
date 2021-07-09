using System;

namespace Delegates
{
   class DelegateMain
   {	
      // FooBar delegate refers to any function that takes a 
      // single int argument and returns an int.
      delegate int FooBar(int i);
      delegate string AnotherDelegate(string msg, out int i, ref int j);

      // Foo returns the given int
      static int Foo(int i) {return (int)i;}

      // Bar adds two ints
      static int Bar(int i, int j) {return i + j;}

      // This is our function that requires a delegate to any
      // function matching the FooBar signature
      static int DoIt(FooBar f, int value)
      {
         return f(value);
      }

      static void Main(string[] args)
      {
         Console.WriteLine(DoIt(new FooBar(Foo), 6));

         // No way to "trick" this to compile!!
         //Console.WriteLine(DoIt(new FooBar(Bar), 6));

         Console.ReadLine();
      }
   }
}
