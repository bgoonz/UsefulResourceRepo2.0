using System;
using System.Messaging;

namespace InternalTransactionExample
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
			MessageQueue txq1 = new MessageQueue( @".\Private$\txq1" );
			MessageQueue txq2 = new MessageQueue( @".\Private$\txq2" );

			Random r = new Random();

			while ( true )
			{
				using ( MessageQueueTransaction mqtx = new MessageQueueTransaction() )
				{
					try
					{
						mqtx.Begin();
						Message msgIn = txq1.Receive( mqtx );
						msgIn.Formatter = new XmlMessageFormatter( new String[] { "System.String, mscorlib", } );
						Message msgOut = new Message();
						msgOut.Body = (string)msgIn.Body;
						txq2.Send( msgOut, mqtx );
//						mqtx.Commit();
						if ( r.NextDouble() > 0.5 )
						{
							System.Console.WriteLine( "Aborting message: {0}", 
													  (string)msgIn.Body );
							mqtx.Abort();
						}
						else
						{
							mqtx.Commit();
						}
					}
					catch
					{
						mqtx.Abort();
					}
				}
			}

		}
	}
}
