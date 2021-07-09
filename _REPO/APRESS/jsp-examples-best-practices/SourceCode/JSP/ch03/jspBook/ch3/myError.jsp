<%@ page isErrorPage="true" %>

<html>
<head>
	<title>Error!</title>
</head>

<body>

<%@ include file="myHeader.html" %>

<br>

<% String from = (String)request.getParameter("from"); %>

An error occurred on page <b><%= from %></b>.

<br><br>

The exception was: 
<br>
<b><%= exception %></b>

<!-- Send exception report to administrator -->
<% System.out.println(exception.toString()); %>

<%@ include file="myFooter.html" %>

</body>
</html>
