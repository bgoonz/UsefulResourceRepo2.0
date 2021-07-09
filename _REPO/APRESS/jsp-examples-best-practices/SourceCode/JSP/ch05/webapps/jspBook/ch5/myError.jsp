<%@ page isErrorPage="true" %>

<html>
<head>
	<title>Error!</title>
</head>

<body bgcolor="#FFFF99">

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

<br><br>
<%@ include file="myFooter.html" %>

</body>
</html>
