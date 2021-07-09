using System;
using System.Threading;

namespace MutexExample
{
	/// <summary>
	/// Summary description for Server.
	/// </summary>
	public class Server
	{
		public Server( string name )
		{
			m_name = name;
		}

		private string m_name;

		public string Name
		{
			get
			{
				return m_name;
			}
		}

		private Mutex m_mutex = new Mutex( false );

		public Mutex Mux
		{
			get
			{
				return m_mutex;
			}
		}

		public void Serve()
		{
			// do stuff

			System.Console.WriteLine( "Thread {0} being served by {1}", 
										Thread.CurrentThread.Name, 
										Name );

			Thread.Sleep( 1000 );

			Mux.ReleaseMutex();
		}
	}
}
