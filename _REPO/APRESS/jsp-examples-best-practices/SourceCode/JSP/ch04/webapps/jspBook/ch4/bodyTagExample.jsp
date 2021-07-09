<!-- JSP Directives -->
<%@ page errorPage="myError.jsp?from=bodyTagExample.jsp" %>
<%@ taglib uri="/tableUtils" prefix="util" %>

<html>
<head>
	<title>Body Tag Example</title>
</head>

<body>

<basefont face="Arial">

<br><br>

<util:tableFormat>
	100,Lorrain Davies,$500.00
	200,Christina Inman,$450.34
	300,Lori Peterson,$475.23
	400,Sandy Andre,$423.00
	500,Lani Tobias,$445.34
</util:tableFormat>

</body>
</html>
