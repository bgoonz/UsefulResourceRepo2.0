using System;
using System.Threading;

namespace SimpleThreadExample
{
	/// <summary>
	/// Summary description for Class1.
	/// </summary>
	class Counter
	{
		private int count;

		public Counter( int count )
		{
			this.count = count;
		}

		public void DoCount()
		{
			for ( int i = 0; i < count; i++ )
			{
				System.Console.WriteLine( "Reached {0}", i );
			}
		}

		[STAThread]
		static void Main(string[] args)
		{
			Counter c = new Counter( 10 );

			Thread t = new Thread( new ThreadStart( c.DoCount ) );

			t.Start();

			System.Console.WriteLine( "I should do something useful here" );
		}
	}
}
