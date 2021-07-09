<%@ page isErrorPage="true" %>

<html>
<head>
	<title>Trinkets Online - Error!</title>
</head>

<body>
<br>

<%@ include file="myHeader.html" %>

<% String from = (String)request.getParameter("from"); %>

An error occurred on page <b><%= from %></b>.

<br><br>

The exception was: 
<br>
<b><%= exception %></b>

<!-- Send exception report to administrator -->
<% System.out.println(exception.toString()); %>

</body>
</html>
