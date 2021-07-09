using System;

namespace IsObject_c
{
	/// <summary>
	/// Summary description for Class1.
	/// </summary>
	class Class1
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
      double a = 5.678;
      int b = 123;

      Console.WriteLine(a.ToString());
      Console.WriteLine(b.ToString());
      Console.WriteLine(456.987.ToString());

      int c=1;
      Console.WriteLine(c.GetType());
      Console.WriteLine(c.GetType().ToString());


      Console.ReadLine();
    }
	}
}
