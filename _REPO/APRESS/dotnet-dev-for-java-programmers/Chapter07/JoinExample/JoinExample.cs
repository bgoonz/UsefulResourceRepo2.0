using System;
using System.Threading;

namespace JoinExample
{
	/// <summary>
	/// Summary description for JoinExample.
	/// </summary>
	class JoinExample
	{
		private static int threads = 10;
		private static int count = 100;

		public static void DoCount()
		{
			for ( int i = 0; i < count; i++ )
			{
				System.Console.WriteLine( "{0} reached {1}", Thread.CurrentThread.Name, i );
			}
		}

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			Thread[] t = new Thread[ threads ];

			for( int k = 0; k < threads; k++ )
			{
				t[ k ] = new Thread( new ThreadStart( DoCount ) );
				t[ k ].Name = "Thread " + k;
				t[ k ].Start();
			}

			// wait for all the threads to finish

			for( int k = 0; k < threads; k++ )
			{
				t[ k ].Join();
			}

			System.Console.WriteLine( "All threads complete" );
		}
	}
}
