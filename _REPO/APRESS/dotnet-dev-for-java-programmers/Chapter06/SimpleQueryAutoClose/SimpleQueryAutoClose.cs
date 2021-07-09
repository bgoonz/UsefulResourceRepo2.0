using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace SimpleQueryAutoClose
{
	/// <summary>
	/// Summary description for SimpleQueryAutoClose.
	/// </summary>
	class SimpleQueryAutoClose
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			string cstr = @"Data Source=ALIEN\VSdotNET;" 
				+ @"Initial Catalog=Chapter6;" 
				+ @"Integrated Security=SSPI";
			SqlConnection conn = new SqlConnection( cstr );

			conn.Open();
			SqlCommand cmd 
				= new SqlCommand( "select * from dotnetlanguages", conn );
			SqlDataReader rdr 
				= cmd.ExecuteReader( CommandBehavior.CloseConnection );

			while ( rdr.Read() )
			{
				System.Console.WriteLine( "{0}", rdr.GetString( 1 ) );
			}

			rdr.Close();
		}
	}
}
