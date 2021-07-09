using System;

namespace CatchMe_c
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
      int x = 100;
      int y = 0;
      int k;

      try
      {
        k = x/y;
      }
      catch ( Exception e )
      {
        Console.WriteLine(e.Message);
      }

       Console.ReadLine();
    }
	}
}
