<!-- JSP Directives -->
<%@ page 
		errorPage="myError.jsp?from=customerDetail.jsp"
%>

<html>
<head>
	<title>Customer Detail</title>
</head>

<body>

<basefont face="Arial">

<jsp:useBean id="custBean" scope="session" class="jspbook.ch3.CustomerBean"/>

<%@ include file="myHeader.html" %>

<!-- Static constants -->
<%! public static final int FIELD_NAME = 0; %>
<%! public static final int FIELD_VALUE = 1; %>

<!-- Reset status message -->
<jsp:setProperty name="custBean" property="status" value=""/>

<!-- Check if the form has been submitted -->
<%
	String submitted = (String) request.getParameter("submit");
	if (submitted != null) {
%>

<!-- Set bean properties from request parameters -->
		<jsp:setProperty name="custBean" property="lname" param="lname"/>
		<jsp:setProperty name="custBean" property="fname" param="fname"/>
		<jsp:setProperty name="custBean" property="age" param="age"/>
		<jsp:setProperty name="custBean" property="sex" param="sex"/>
		<jsp:setProperty name="custBean" property="spouse" param="spouse"/>
		<jsp:setProperty name="custBean" property="children" param="children"/>
		<jsp:setProperty name="custBean" property="smoker" param="smoker"/>
		
<!-- Validate the fields and submit -->
<%
		if (custBean.validate()) {
			custBean.submit();
			custBean.setStatus("Customer record has been saved.");
		}
	}
	
/* If first time through (not submitted), load existing customer record --> */

	else {
		String id = (String) request.getParameter("id");
		if (id != null) {
			custBean.loadCustomer(id);
		}
	}
%>

<!-- Retrieve a list of any errors and a status message -->
<%= custBean.getErrors() %>
<jsp:getProperty name="custBean" property="status"/>

<form action="customerDetail.jsp">

<input type="Hidden" name="submit" value="true"/>

<center>

<table>
	<tr>
		<td><%= custBean.getField("fname", FIELD_NAME) %></td>
		<td><input type="Text" name="fname" value="<%= custBean.getField("fname", FIELD_VALUE) %>"/></td>
	</tr>
	<tr>
		<td><%= custBean.getField("lname", FIELD_NAME) %></td>
		<td><input type="Text" name="lname" value="<%= custBean.getField("lname", FIELD_VALUE) %>"/></td>
	</tr>
	<tr>
		<td><%= custBean.getField("age", FIELD_NAME) %></td>
		<td><input type="Text" name="age" value="<%= custBean.getField("age", FIELD_VALUE) %>"/></td>
	</tr>
	<tr>
		<td><%= custBean.getField("sex", FIELD_NAME) %></td>
		<td>
			<select name="sex">
				<option value="M" <%= (custBean.getField("sex", FIELD_VALUE).equals("M")) ? "selected" : "" %>>M</option>
				<option value="F" <%= (custBean.getField("sex", FIELD_VALUE).equals("F")) ? "selected" : "" %>>F</option>
			</select>
		</td>
	</tr>
	<tr>
		<td><%= custBean.getField("spouse", FIELD_NAME) %></td>
		<td>
			<select name="spouse">
				<option value="true" <%= (custBean.getField("spouse", FIELD_VALUE).equals("true")) ? "selected" : "" %>>Y</option>
				<option value="false" <%= (custBean.getField("spouse", FIELD_VALUE).equals("false")) ? "selected" : "" %>>N</option>
			</select>
		</td>
	</tr>
	<tr>
		<td><%= custBean.getField("children", FIELD_NAME) %></td>
		<td><input type="Text" name="children" value="<%= custBean.getField("children", FIELD_VALUE) %>"/></td>
	</tr>
	<tr>
		<td><%= custBean.getField("smoker", FIELD_NAME) %></td>
		<td>
			<select name="smoker">
				<option value="true" <%= (custBean.getField("smoker", FIELD_VALUE).equals("true")) ? "selected" : "" %>>Y</option>
				<option value="false" <%= (custBean.getField("smoker", FIELD_VALUE).equals("false")) ? "selected" : "" %>>N</option>
			</select>
		</td>
	</tr>
	<tr>
		<td colspan="2" align="center"><input type="Submit" value="Submit"/></td>
	</tr>
	<tr>
		<td colspan="2" align="center">
			<br><br><a href="customerList.jsp">Return to Customer List</a>
		</td>
	</tr>
</table>

</center>

</form>

<%@ include file="myFooter.html" %>

</body>
</html>
