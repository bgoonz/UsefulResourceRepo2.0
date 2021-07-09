using System;
using System.Threading;

namespace MonitorExample
{
	/// <summary>
	/// Summary description for MonitorExample.
	/// </summary>
	class MonitorExample
	{
		private int r = 0;

		public void SynchronizedMethod1()
		{
			try
			{
				Monitor.Enter( this );
				r++;
			}
			finally
			{
				Monitor.Exit( this );
			}
		}

		public void SynchronizedMethod2()
		{
			lock ( this )
			{ 
				r++;
			}
		}

		public void SynchronizedMethod3()
		{
			try
			{
				if ( Monitor.TryEnter( this, 250 ) )
				{
					r++;
				}
			}
			finally
			{
				try
				{
					Monitor.Exit( this );
				}
				catch( SynchronizationLockException sle )
				{
					// its okay if I didn't get the monitor
				}
			}
		}

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			MonitorExample m = new MonitorExample();

			m.SynchronizedMethod1();
			m.SynchronizedMethod2();
			m.SynchronizedMethod3();
		}
	}
}
