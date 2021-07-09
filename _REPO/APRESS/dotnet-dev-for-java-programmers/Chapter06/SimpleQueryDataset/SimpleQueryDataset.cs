using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace SimpleQueryDataset
{
	/// <summary>
	/// Summary description for SimpleQueryDataset.
	/// </summary>
	class SimpleQueryDataset
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			DataSet dset = new DataSet();

			string cstr = @"Data Source=ALIEN\VSdotNET;" 
				+ @"Initial Catalog=Chapter6;" 
				+ @"Integrated Security=SSPI";
			using ( SqlConnection conn = new SqlConnection( cstr ) )
			{
				conn.Open();

				SqlDataAdapter da 
					= new SqlDataAdapter( "select * from dotnetlanguages", conn );
				da.Fill( dset, "languages" );
			}

			foreach( DataRow dr in dset.Tables[ "languages" ].Rows )
			{
				System.Console.WriteLine( "{0}", dr[ "name" ] );
			}
		}
	}
}
