<html>
<head>
	<title>Simple Form Example</title>
</head>

<body>

Hello <%= request.getParameter("name") %>.<br><br>

It must be very interesting being employed as a <%= request.getParameter("job") %>.<br><br>

I see you enjoy the following hobbies: <br><br>
<%
	String hobbies[] = request.getParameterValues("hobbies");
	for (int n = 0; n < hobbies.length; n++) {
%>

<%= hobbies[n] %> <br>

<%
	}
%>

</body>
</html>
