using System;
using System.Threading;

namespace MutexExample
{
	/// <summary>
	/// Summary description for Client.
	/// </summary>
	public class Client
	{
		private const int requests = 20;

		private Server[] m_srvArray;
		private WaitHandle[] m_muxArray;

		public Client( int num, Server[] srvArray )
		{
			m_srvArray = srvArray;

			m_muxArray = new WaitHandle[ m_srvArray.Length ];
			for ( int i = 0; i < m_srvArray.Length; i ++ )
			{
				m_muxArray[ i ] = m_srvArray[ i ].Mux;
			}

			Thread t = new Thread( new ThreadStart( this.Consume ) );
			t.Name = num.ToString();
			t.Start();
		}

		public void Consume()
		{
			for ( int i = 0; i < requests; i ++ )
			{
				int index = WaitHandle.WaitAny( m_muxArray );
				m_srvArray[ index ].Serve();
			}
		}
	}
}
