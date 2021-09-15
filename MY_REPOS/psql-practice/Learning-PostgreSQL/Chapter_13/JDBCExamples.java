import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

public class JDBCExamples{
	public static void main(String[] args) throws Exception{
		JDBCExamples examples = new JDBCExamples();
		examples.run();
	}

	private void run() throws Exception{
		initializeDriver();

		try(Connection connection = openConnection("jdbc:postgresql://localhost/car_portal")){
			staticStatementExample(connection);
			preparedStatementExample(connection);
			metaDataExample(connection);
			storedFunctionExample(connection);
		}
		catch(SQLException e){
			System.err.println("error message: " + e.getMessage());
			System.err.println("sql state: " + e.getSQLState());
		}
	}

	private void initializeDriver() throws ClassNotFoundException{
		Class.forName("org.postgresql.Driver");
	}

	private Connection openConnection(String url) throws SQLException{
		return DriverManager.getConnection(url);
	}

	private void staticStatementExample(Connection connection) throws SQLException{
		System.out.println("deleting accounts...");
		Statement statement = connection.createStatement();
		int rowCount = statement.executeUpdate("DELETE FROM car_portal_app.account");
		System.out.println(rowCount + " rows deleted");

		System.out.println("creating new account...");
		String sql = "INSERT INTO car_portal_app.account (first_name, last_name, email, password) VALUES ('John', 'Doe', 'john@doe.com', 'youDontKnow')";
		statement.executeUpdate(sql, new String[]{"account_id"});

		ResultSet newKeys = statement.getGeneratedKeys();
		if(newKeys.next()){
			int newAccountID = newKeys.getInt("account_id");
			System.out.println("new account ID is " + newAccountID);
		}
		statement.close();
	}

	private void preparedStatementExample(Connection connection) throws SQLException{
		PreparedStatement statement = connection.prepareStatement("SELECT account_id, first_name, last_name FROM car_portal_app.account LIMIT 1");
		ResultSet resultSet = statement.executeQuery();
		if(resultSet.next()){
			int accountID = resultSet.getInt(1);
			String firstName = resultSet.getString("first_name");
			String lastName = resultSet.getString("last_name");
			System.out.println(String.format("updating account %d: first name = %s, last name = %s with new password...", accountID,
					firstName, lastName));

			statement = connection.prepareStatement("UPDATE car_portal_app.account SET password=? WHERE account_id=?");
			statement.setString(1, "myNewPassword");
			statement.setInt(2, accountID);
			int changedRows = statement.executeUpdate();
		}
		else{
			System.err.println("No results returned");
		}
		statement.close();
	}

	private void metaDataExample(Connection connection) throws SQLException{
		Statement statement = connection.createStatement();
		ResultSet result = statement.executeQuery("select * from car_portal_app.account");
		ResultSetMetaData metaData = result.getMetaData();

		int columnCount = metaData.getColumnCount();
		System.out.println(String.format("account table has %d columns", columnCount));

		for(int c = 1; c <= columnCount; c++){
			String columnName = metaData.getColumnName(c);

			int columnType = metaData.getColumnType(c);
			String columnClass = metaData.getColumnClassName(c);
			String columnTypeName = metaData.getColumnTypeName(c);

			System.out.println(String.format("column %d: name = %s, type = %d, columnClass = %s, columnTypeName = %s", c, columnName, columnType,
					columnClass, columnTypeName));
		}
		statement.close();
	}

	private void storedFunctionExample(Connection connection) throws SQLException{
		CallableStatement statement = connection.prepareCall("{? = call substring(?, ?, ?)}");
		statement.registerOutParameter(1, Types.VARCHAR);
		statement.setString(2, "function call example");
		statement.setInt(3, 10);
		statement.setInt(4, 4);
		statement.execute();
		String substring = statement.getString(1);
		System.out.println("result of substring function: " + substring);

		// get a ResultSet from a stored function returning SETOF
		Statement stmt = connection.createStatement();
		ResultSet result = stmt.executeQuery("SELECT * FROM unnest(ARRAY[1, 2])");
		while(result.next()){
			System.out.println(result.getInt(1));
		}

		connection.setAutoCommit(true);
		statement.close();
	}

}
