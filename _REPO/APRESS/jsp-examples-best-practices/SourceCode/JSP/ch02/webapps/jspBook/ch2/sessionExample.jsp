<html>
<head>
	<title>Session Example</title>
</head>

<body>

<% 
   String val = request.getParameter("name");
   if (val != null)
      session.setAttribute("name", val);
%>

<center>
<h1>Session Example</h1>

Where would you like to go?<br><br>

<a href="sessionExamplePage1.jsp">Page 1</a>
<a href="sessionExamplePage2.jsp">Page 2</a>

</body>
</html>
