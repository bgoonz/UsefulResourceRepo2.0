<%@ page 
		errorPage="myError.jsp?from=login.jsp"
%>

<html>
<head>
	<title>Trinkets Online</title>
</head>

<body bgcolor="#FFFFFF">

<%@ include file="myHeader.html" %>

<form method="post" action="Controller">

<input type="hidden" name="pageId" value="loginPage"></input>
<input type="hidden" name="actionClass" value="catalog.actions.HomeAction"></input>

<p align="center">
	<font face="Arial, Helvetica, sans-serif" size="6" color="#0000CC">
		<b>Login to Trinkets Catalog</b>
	</font>
</p>

<p>&nbsp;</p>

<!-- Check login status and display message if login attempt failed. -->

<% 	String status = (String) request.getAttribute("loginStatus");
        if (status != null && status.equals("failed")) {
%>
<center>
	<font color="#ff0000">Invalid login, please try again.</font>
</center>
<% 
	}
%>

<table width="199" border="0" align="center" cellpadding="5">
  <tr> 
    <td>
      <font face="Arial, Helvetica, sans-serif" size="2">User ID:</font>
    </td>
    <td><input type="text" name="uid"></td>
  </tr>
  <tr> 
    <td><font face="Arial, Helvetica, sans-serif" size="2">Password:</font></td>
    <td><input type="password" name="pwd"></td>
  </tr>
  <tr align="center"> 
    <td colspan="2"><input type="submit" name="Submit" value="Login"></td>
  </tr>
</table>

</form>

</body>
</html>
