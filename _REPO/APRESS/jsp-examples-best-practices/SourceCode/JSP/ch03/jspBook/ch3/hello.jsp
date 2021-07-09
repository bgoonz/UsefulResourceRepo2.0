<!-- JSP Directives -->
<%@ page 
		errorPage="myError.jsp?from=hello.jsp"
%>

<html>
<head>
	<title>Hello</title>
</head>

<body>

<basefont face="Arial">

<jsp:useBean id="simpleBean" scope="page" class="jspbook.ch3.SimpleBean"/>

<!-- Set bean properties -->
<jsp:setProperty name="simpleBean" property="fname" value="Andrew"/>
<jsp:setProperty name="simpleBean" property="lname" value="Patzer"/>

<!-- Display welcome message -->
<center>
	<b><%= simpleBean.welcomeMsg() %></b>
</center>
</body>
</html>
