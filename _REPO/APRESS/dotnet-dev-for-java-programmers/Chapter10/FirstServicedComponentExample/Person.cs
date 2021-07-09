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
	public class Person : ServicedComponent
	{
		public Person()
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

		protected string m_name;

		public string Name
		{
			get
			{
				return m_name;
			}
			set
			{
				m_name = value;
			}
		}

		public void Save()
		{
			m_id = Guid.NewGuid();

			string cstr = @"Data Source=ALIEN\VSdotNET;" 
				+ @"Initial Catalog=Chapter10a;" 
				+ @"Integrated Security=SSPI";
			using ( SqlConnection conn = new SqlConnection( cstr ) )
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand( "insert into people ( id, name ) values ( @id, @name )", conn );
				SqlParameter id 
					= cmd.Parameters.Add( "@id", SqlDbType.UniqueIdentifier );
				id.Value = m_id;
				SqlParameter name 
					= cmd.Parameters.Add( "@name", SqlDbType.NVarChar, 30 );
				name.Value = m_name;
				cmd.ExecuteNonQuery();
			}
		}
	}
}
