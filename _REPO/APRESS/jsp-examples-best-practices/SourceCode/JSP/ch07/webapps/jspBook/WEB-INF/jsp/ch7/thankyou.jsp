<!-- JSP Directives -->
<%@ page 
		errorPage="myError.jsp?from=thankyou.jsp"
%>

<html>
<head>
	<title>Insurance Quoting System</title>
</head>

<body bgcolor="#FFFF99">

<basefont face="Arial">

<%@ include file="/ch7/myHeader.html" %>

<br><br>

<center>
Your survey answers have been recorded. Thank you for participating in this survey.
</center>

<br><br>

<%@ include file="/ch7/myFooter.html" %>

</body>
</html>
