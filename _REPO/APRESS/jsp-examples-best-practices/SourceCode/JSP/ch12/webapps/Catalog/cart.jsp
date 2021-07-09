<%@ page 
		import="catalog.beans.CartBean"
		errorPage="myError.jsp?from=cart.jsp"
%>

<%@ taglib uri="/uitags" prefix="uitags" %>

<html>
<head>
	<title>Trinkets Online</title>
</head>

<body bgcolor="#FFFFFF">

<%@ include file="myHeader.html" %>

<center>

<font face="Arial, Helvetica, sans-serif" size="6" color="#0000CC">
  <b>Items in Cart</b>
</font>

<br><br>

<table width="400" border="0">

<% CartBean cBean = (CartBean) request.getAttribute("model");
   if (cBean != null) {
     cBean.setStartRow(0);
     for (int i = 0; i < cBean.getTotalRows(); i++) {
       cBean.nextRow();
%>
  <tr>
    <td width="100">
      <a href="Controller?pageId=home&actionClass=catalog.actions.CartAction&action=remove&prodid=<%= cBean.getProdid() %>">
        <img src="images\removefromcart.gif" border="0">
      </a>
    </td>
    <td align="left" width="200"><%= cBean.getProdname() %></td>
    <td width="100">
      <uitags:FormatTag format="NUMERIC_CURRENCY">
        <%= cBean.getPrice() %>
      </uitags:FormatTag>
    </td>
  </tr>
<%
     }
   }
%>

  <tr>
    <td colspan="3" align="center">
      <a href="Controller?pageId=cart&actionClass=catalog.actions.HomeAction">Return to Catalog</a>
    </td>
  </tr>
</table>

</body>
</html>
