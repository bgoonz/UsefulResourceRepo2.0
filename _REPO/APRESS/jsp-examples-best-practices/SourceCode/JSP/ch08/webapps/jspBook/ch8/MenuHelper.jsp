<!-- Declare tag that we'll use as our helper -->
<%@ taglib uri="/helpers" prefix="helpers" %>

<html>
<head>
	<title>Product Accessories</title>
</head>

<body>

<basefont face="Arial">

<!-- Declare bean that will act as our model -->
<jsp:useBean id="myBean" class="jspbook.ch8.MenuModel"/>

<!-- Display Product Accessory Links (using helper) -->
<center>

<b>Product Accessories for: Deluxe PDA</b>

<br><br>

<helpers:MenuTag>
	<%= myBean.getList() %>
</helpers:MenuTag>

</center>

</body>
</html>
