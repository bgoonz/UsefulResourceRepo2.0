<%@ page 
		import="catalog.beans.CatalogBean"
		errorPage="myError.jsp?from=home.jsp"
%>

<%@ taglib uri="/catalogtags" prefix="cat" %>

<html>
<head>
	<title>Trinkets Online</title>
</head>

<body bgcolor="#FFFFFF">

<%@ include file="myHeader.html" %>

<p align="right">
  <a href="Controller?pageId=home&actionClass=catalog.actions.CartAction&action=view">
    <img src="images\viewcart.gif" border="0">
  </a>
</p>

<center>

<font face="Arial, Helvetica, sans-serif" size="6" color="#0000CC">
  <b>Weekly Specials</b>
</font>

<br><br>

  <!-- Dynamically build rows of data using CatalogBean -->

<% CatalogBean cBean = (CatalogBean) request.getAttribute("model");
   if (cBean != null) {
     cBean.setStartRow(0);
     for (int i = 0; i < cBean.getTotalRows(); i++) {
       cBean.nextRow();
%>

<cat:CatalogItem
  prodid='<%= Integer.toString(cBean.getProdid()) %>'
  prodname='<%= cBean.getProdname() %>'
  price='<%= Double.toString(cBean.getPrice()) %>'
  proddesc='<%= cBean.getProddesc() %>'
/>

<hr width="500" align="center">

<%
     }
   }
%>
		
  <!-- End dynamic build from CatalogBean -->
		
</center>

</body>
</html>
