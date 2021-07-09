using System;

namespace UnsafeHelloExample
{
	class UnsafeHello
	{
		static unsafe void SayHello( char* p, int len )
		{
			for ( int i = 0; i < len; i++, p++ )
			{
				System.Console.Write( *p );
			}
			System.Console.WriteLine();
		}

		[STAThread]
		static unsafe void Main(string[] args)
		{
			string s = "Hello from unsafe code";
			fixed ( char* p = &( s.ToCharArray()[ 0 ] ) )
			{
				SayHello ( p, s.Length );
			}
		}
	}
}
