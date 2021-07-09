
import java.sql.*;

public class ClassicExample
{
    public static void main( String[] args ) throws Exception
    {
	String cstr = "jdbc:microsoft:sqlserver://localhost:1166;DataBaseName=Chapter6;user=chapter6;password=chapter6";
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;

	try
	{
	    Class.forName( "com.microsoft.jdbc.sqlserver.SQLServerDriver" ); 
	    conn = DriverManager.getConnection( cstr );

	    stmt = conn.createStatement();
	    rs = stmt.executeQuery( "select * from dotnetlanguages" );

	    while( rs.next() )
	    {
		System.out.println( rs.getString( "name" ) );
	    }
	}
	finally
	{
	    if ( rs != null )
	    {
		rs.close();
	    }
	    if ( stmt != null )
	    {
		stmt.close();
	    }
	    if ( conn != null )
	    {
		conn.close();
	    }
	}
    }
}

