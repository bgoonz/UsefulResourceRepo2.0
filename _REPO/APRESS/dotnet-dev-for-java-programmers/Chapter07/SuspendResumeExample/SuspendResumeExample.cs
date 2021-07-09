using System;
using System.Threading;

namespace SuspendResumeExample
{
	/// <summary>
	/// Summary description for SuspendResumeExample.
	/// </summary>
	class SuspendResumeExample
	{
		private const int iterations = 5000;
		private const int sleepTime = 500;

		public static void DoCount()
		{
			for ( int i = 0; i < iterations; i++ )
			{
				System.Console.WriteLine( "{0}", i );
			}
		}
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			Thread t = new Thread( new ThreadStart( DoCount ) );
			t.Start();
			Thread.Sleep( sleepTime );

			while ( t.IsAlive )
			{
				t.Suspend();
				Thread.Sleep( sleepTime );
				t.Resume();
				Thread.Sleep( sleepTime );
			}

			t.Join();
		}
	}
}
