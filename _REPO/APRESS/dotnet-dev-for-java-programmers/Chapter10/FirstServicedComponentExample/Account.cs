using System;
using System.EnterpriseServices;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Runtime.InteropServices;

namespace FirstServicedComponentExample
{
	[ Transaction ]
	[ PrivateComponent ]
	public class Account : ServicedComponent
	{
		public Account()
		{
		}

		protected Guid m_id;

		public Guid Id
		{
			get
			{
				return m_id;
			}
		}

		protected Guid m_personId;

		public Guid PersonId
		{
			set
			{
				m_personId = value;
			}
			get
			{
				return m_personId;
			}
		}

		public void Save()
		{
			// fail 50% of the time

			if ( new Random().NextDouble() > 0.5 )
			{
				throw new Exception( "random error" );
			}

			m_id = Guid.NewGuid();

			string cstr = @"Data Source=ALIEN\VSdotNET;" 
				+ @"Initial Catalog=Chapter10b;" 
				+ @"Integrated Security=SSPI";
			using ( SqlConnection conn = new SqlConnection( cstr ) )
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand( "insert into accounts ( id, pid ) values ( @id, @pid )", conn );
				SqlParameter id 
					= cmd.Parameters.Add( "@id", SqlDbType.UniqueIdentifier );
				id.Value = m_id;
				SqlParameter pid 
					= cmd.Parameters.Add( "@pid", SqlDbType.UniqueIdentifier );
				pid.Value = m_personId;
				cmd.ExecuteNonQuery();
			}
		}
	}
}
