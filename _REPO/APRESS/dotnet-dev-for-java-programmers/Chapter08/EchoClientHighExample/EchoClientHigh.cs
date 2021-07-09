using System;
using System.IO;
using System.Net.Sockets;

namespace EchoClientHighExample
{
	class EchoClientHigh
	{
		const int echoPort = 7;

		[STAThread]
		static void Main(string[] args)
		{
			using ( TcpClient tc = new TcpClient( "localhost", echoPort ) )
			{
				NetworkStream ns = tc.GetStream();
				StreamWriter sw = new StreamWriter( ns );
				StreamReader sr = new StreamReader( ns );

				sw.WriteLine( "test message" );
				sw.Flush();
				System.Console.WriteLine( sr.ReadLine() );
			}
		}
	}
}
