using System;
using System.Threading;

namespace MonitorPoolExample
{
	/// <summary>
	/// Summary description for MonitorPoolExample.
	/// </summary>
	class MonitorPoolExample
	{
		private const int threads = 4;
		private const int workitems = 50;

		private static Object locker = new Object();

		static void Worker()
		{
			Random r = new Random();

			while( true )
			{
				lock( locker )
				{
					Monitor.Wait( locker );
				}

				// do work here
				System.Console.WriteLine( "{0} doing work", Thread.CurrentThread.Name );
				Thread.Sleep( r.Next( 10000 ) );
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
				t[ k ] = new Thread( new ThreadStart( Worker ) );
				t[ k ].Name = "Worker " + k;
				t[ k ].IsBackground = true;
				t[ k ].Start();
			}

			for( int i = 0; i < workitems; i ++ )
			{
				Thread.Sleep( 1000 );

				lock( locker )
				{
					Monitor.Pulse( locker );
				}
			}


			System.Console.WriteLine( "Exiting main thread" );
		}
	}
}
