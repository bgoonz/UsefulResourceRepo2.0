<%@ page 
		import="jspbook.ch7.CustomerBean"
		errorPage="myError.jsp?from=login.jsp"
%>

<html>
<head>
	<title>Quoting System Login</title>
</head>

<body bgcolor="#FFFF99">

<%@ include file="myHeader.html" %>

<form method="post" action="Controller?action=login">

<p align="center">
	<font face="Arial, Helvetica, sans-serif" size="6" color="#003300">
		<b><i>Login to Quoting System</i></b>
	</font>
</p>

<p>&nbsp;</p>

<% 	CustomerBean custBean = (CustomerBean) request.getAttribute("model");
	if (custBean != null) {
		String status = custBean.getLoginStatus();
		if (status != null && status.equals("failed")) {
%>
<center>
	<font color="#ff0000">Invalid login, please try again.</font>
</center>
<% 		}
	}
%>

<table width="199" border="0" align="center" cellpadding="5">
  <tr> 
    <td>
      <font face="Arial, Helvetica, sans-serif" size="2">User ID:</font>
    </td>
    <td><input type="text" name="UID"></td>
  </tr>
  <tr> 
    <td><font face="Arial, Helvetica, sans-serif" size="2">Password:</font></td>
    <td><input type="password" name="PWD"></td>
  </tr>
  <tr align="center"> 
    <td colspan="2"><input type="submit" name="Submit" value="Login"></td>
  </tr>
</table>

</form>

<%@ include file="myFooter.html" %>

</body>
</html>
