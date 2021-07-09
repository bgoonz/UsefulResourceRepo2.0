<%
strConnString = "driver={SQL Server};server=Miranda;UID=MetroNome;PWD=07051977;database=ShoppingCart" '## MS SQL Server 2000

Dim dbConn		'As ADODB.Connection
Dim strConnString 'As String

Set dbConn = Server.CreateObject("ADODB.Connection")
dbConn.ConnectionString = strConnString
dbConn.Open 
%>
