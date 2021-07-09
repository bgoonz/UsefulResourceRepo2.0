<!-- Declare tag that we'll use as our helper -->
<%@ taglib uri="/helpers" prefix="helpers" %>

<html>
<head>
	<title>Text Formatting Example</title>
</head>

<body>

<basefont face="Arial">

<!-- Declare bean that will act as our model -->
<jsp:useBean id="myBean" class="jspbook.ch8.FormattingModel"/>

<jsp:setProperty name="myBean" property="dateValue" value="12/01/01"/>
<jsp:setProperty name="myBean" property="currencyValue" value="23500.253"/>

<!-- Display Formatted Values (using helper) -->
<center>

<h1>Various Date and Currency Formats</h1>

<br><br>
<table cellpadding="5">
	<tr>
		<th>Format</th>
		<th>Original Value</th>
		<th>Formatted Value</th>
	</tr>
	<tr>
		<td>Long Date</td>
		<td>
			<jsp:getProperty name="myBean" property="dateValue"/>
		</td>
		<td>
			<helpers:FormatTag format="<%= jspbook.ch8.FormatTag.DATE_LONG %>">
				<jsp:getProperty name="myBean" property="dateValue"/>
			</helpers:FormatTag>
		</td>
	</tr>
	<tr>
		<td>Decimal (NN.NN)</td>
		<td><%= myBean.getCurrencyValue() %></td>
		<td>
			<helpers:FormatTag format="<%= jspbook.ch8.FormatTag.NUMERIC_DECIMAL %>">
				<%= myBean.getCurrencyValue() %>
			</helpers:FormatTag>
		</td>
	</tr>
	<tr>
		<td>Integer (N,NNN)</td>
		<td><%= myBean.getCurrencyValue() %></td>
		<td>
			<helpers:FormatTag format="<%= jspbook.ch8.FormatTag.NUMERIC_ROUNDED %>">
				<%= myBean.getCurrencyValue() %>
			</helpers:FormatTag>
		</td>
	</tr>
	<tr>
		<td>Currency ($N,NNN.NN)</td>
		<td><%= myBean.getCurrencyValue() %></td>
		<td>
			<helpers:FormatTag format="<%= jspbook.ch8.FormatTag.NUMERIC_CURRENCY %>">
				<%= myBean.getCurrencyValue() %>
			</helpers:FormatTag>
		</td>
	</tr>
</table>
</center>

</body>
</html>
