<!-- JSP Directives -->
<%@ page errorPage="myError.jsp?from=simpleTagExample.jsp" %>
<%@ taglib uri="/simple" prefix="ex" %>

<html>
<head>
	<title>Simple Tag Example</title>
</head>

<body>

<basefont face="Arial">

<!-- Display message -->
<center>
	<ex:simpleTag 
		color="#008000"
		message="This is a very, very, very simple tag!"
	/>
</center>

</body>
</html>
