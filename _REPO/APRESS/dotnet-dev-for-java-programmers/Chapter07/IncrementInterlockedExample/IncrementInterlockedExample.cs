using System;
using System.Threading;

namespace IncrementInterlockedExample
{
	/// <summary>
	/// Summary description for IncrementInterlockedExample.
	/// </summary>
	class IncrementInterlockedExample
	{
		private static int count = 0;

		public int IncrementCount()
		{
			return Interlocked.Increment( ref count );
		}

		public void DoCount()
		{
			for( int i = 0; i < 10; i++ )
			{
				System.Console.WriteLine( "Thread {0}: count = {1}", Thread.CurrentThread.Name, IncrementCount() );
				Thread.Sleep( 0 );
			}
		}

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			int limit = 10;

			Thread[] t = new Thread[ limit ];

			int k;
			for( k = 0; k < limit; k++ )
			{
				IncrementInterlockedExample b = new IncrementInterlockedExample();
				t[ k ] = new Thread( new ThreadStart( b.DoCount ) );
				t[ k ].Name = "Thread " + k;
			}

			for( k = 0; k < limit; k++ )
			{
				t[ k ].Start();
			}

			// wait for all the threads to finish

			for( k = 0; k < limit; k++ )
			{
				t[ k ].Join();
			}

			System.Console.WriteLine( "All threads complete" );
		}
	}
}
