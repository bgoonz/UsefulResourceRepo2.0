using System;
using System.Threading;

namespace BackgroundExample
{
	/// <summary>
	/// Summary description for BackgroundExample.
	/// </summary>
	class BackgroundExample
	{
		private const int threads = 10;

		public static void DoCount()
		{
			for ( int i = 0; true; i++ )
			{
				System.Console.WriteLine( "{0} reached {1}", Thread.CurrentThread.Name, i );
				Thread.Sleep( 0 );
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
				t[ k ].IsBackground = true;
				t[ k ].Start();
			}

			Thread.Sleep( 1000 );
			System.Console.WriteLine( "Exiting main thread" );
		}
	}
}
