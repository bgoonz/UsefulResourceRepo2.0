using System;
using ComPlusConsumerExample;

namespace ComPlusConsumerDemo
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
			using ( ComPlusConsumer cpc = new ComPlusConsumer() )
			{
				int i = 0;
//				for ( ; cpc.ProcessQueue(); i++ );
				bool b = true;
				while ( b )
				{
					try
					{
						b = cpc.ProcessQueue();
						if ( b )
						{
							i++;
						}
					}
					catch( Exception exc )
					{
						b = true;
						System.Console.WriteLine( exc.Message );
					}
				}
				System.Console.WriteLine( "Processed {0} messages", i );
			}
		}
	}
}
