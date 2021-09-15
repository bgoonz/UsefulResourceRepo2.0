<!-- JSP Directives -->
<%@ page errorPage="myError.jsp?from=groceryList.jsp" %>
<%@ taglib uri="/groceries" prefix="grocery" %>

<html>
<head>
	<title>Grocery List</title>
</head>

<body>

<basefont face="Arial">

<h1>Grocery Bill:</h1>
<br>
<grocery:Order>
	<grocery:LineItem>1,Milk,2.56</grocery:LineItem>
	<grocery:LineItem>5,Canned Carrots,0.33</grocery:LineItem>
	<grocery:LineItem>1,Paper Towel,1.26</grocery:LineItem>
	<grocery:LineItem>1,Magazine,4.50</grocery:LineItem>
	<grocery:LineItem>3,Donut,0.33</grocery:LineItem>
	<grocery:LineItem>9,Peanut Butter,3.99</grocery:LineItem>
</grocery:Order>

</body>
</html>
