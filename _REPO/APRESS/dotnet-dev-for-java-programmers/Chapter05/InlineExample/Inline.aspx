<%@ Page language="c#" %>
<HTML>
	<HEAD>
		<title>Inline ASP.NET WebForm Example</title>
	</HEAD>
	<body>
		<form method="post">
			<% 
			if ( Request.Params[ "who" ] != null )
			{
			%>Hello <%= Request.Params[ "who" ] %><%
			}
			else
			{
			%>Hello World<%
			}
			%>
			<P><INPUT type="text" name="who"></P>
			<P><INPUT type="submit" value="Submit"></P>
		</form>
	</body>
</HTML>
