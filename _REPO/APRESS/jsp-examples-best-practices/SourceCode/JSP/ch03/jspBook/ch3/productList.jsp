<!-- JSP Directives -->
<%@ page 
		errorPage="myError.jsp?from=productList.jsp"
%>

<html>
<head>
	<title>Product List</title>
</head>

<body>

<basefont face="Arial">

<jsp:useBean id="pBean" scope="session" class="jspbook.ch3.ProductBean"/>

<!-- Build table of products -->

<table align="center" width="600">

	<tr>
		<td width="20%"><b>Product ID</b></td>
		<td width="30%"><b>Description</b></td>
		<td width="30%"><b>Manufacturer</b></td>
		<td width="20%"><b>Price</b></td>
	</tr>

<%
	int rowCount = 0;
	int startRow = 0;

	if (pBean.populate()) {

		String start = (String) request.getParameter("start");
		if (start != null) {
			startRow = new Integer(start).intValue();
			pBean.setStartRow(startRow);
		}

		while (rowCount < 10 && pBean.nextRow() > 0) {
			rowCount++;
%>

	<tr>
		<td width="20%"><jsp:getProperty name="pBean" property="prodID"/></td>
		<td width="30%"><jsp:getProperty name="pBean" property="prodDesc"/></td>
		<td width="30%"><jsp:getProperty name="pBean" property="prodManuf"/></td>
		<td width="20%"><jsp:getProperty name="pBean" property="prodPrice"/></td>
	</tr>

<%
		}
	}
%>

	<!-- Display the back and next links -->
	<tr>
		<td colspan="2" align="center">
			<br><a href="?start=<%= (startRow > 9) ? startRow - 10 : 0%>">Back</a>
		</td>
		<td colspan="2" align="center">
			<br><a href="?start=<%= pBean.getCurrentRow() %>">Next</a>
		</td>
	</tr>
	
</table>

</body>
</html>
