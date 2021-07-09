using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.EnterpriseServices;
using System.Messaging;

namespace ComPlusConsumerExample
{
	[ Transaction ]
	public class ComPlusConsumer : ServicedComponent
	{
		public ComPlusConsumer()
		{
		}

		Random r = new Random();

		protected TimeSpan timeout = new TimeSpan( 0, 0 , 1 );

		protected string cstr = @"Data Source=ALIEN\VSdotNET;" 
			+ @"Initial Catalog=Chapter12;" 
			+ @"Integrated Security=SSPI";

		[ AutoComplete ]
		public bool ProcessQueue()
		{
			bool rc = true;
			string mess = null;

			using ( MessageQueue txq1 = new MessageQueue( @".\Private$\txq1" ) )
			{
				try
				{
					using ( Message msgIn = txq1.Receive( timeout, MessageQueueTransactionType.Automatic ) )
					{
						msgIn.Formatter = new XmlMessageFormatter( new String[] { "System.String, mscorlib", } );

						mess = (string)msgIn.Body;
					}

					using ( SqlConnection conn = new SqlConnection( cstr ) )
					{
						conn.Open();

						SqlCommand cmd = new SqlCommand( "insert into messdrop ( id, msgtext ) values ( @id, @msgtext )", conn );
						SqlParameter id 
							= cmd.Parameters.Add( "@id", SqlDbType.UniqueIdentifier );
						SqlParameter msgtext 
							= cmd.Parameters.Add( "@msgtext", SqlDbType.NVarChar, 50 );

						id.Value = Guid.NewGuid();
						msgtext.Value = mess;

						cmd.ExecuteNonQuery();
					}
				}
				catch( MessageQueueException mqe )
				{
					// receive timed out - queue is empty
					rc = false;
				}
			}

			if ( rc && ( r.NextDouble() > 0.5 ) )
			{
				throw new Exception( "randomly aborting: " + mess );
			}

			return rc;
		}
	}
}
