<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<html>
<body>
   <table cellspacing="0" border="1">
      <font face="Arial,Helvetica,Univers,Zurich BT" color="#69002f" size="-1">
         <b><xsl:value-of select="BOOKS/BOOK/TITLE"/></b></font><br/>
      <tr><td width="175" bgColor="#f4f4ef"><font face="Arial,Helvetica,Univers,Zurich BT" size="-2">
         by <xsl:value-of select="BOOKS/BOOK/AUTHOR"/></font><BR/></td></tr>
      <tr><td width="175" bgColor="#e5e5d8"><font face="Arial,Helvetica,Univers,Zurich BT" size="-2">
         <xsl:value-of select="BOOKS/BOOK/@Type"/>, <xsl:value-of select="BOOKS/BOOK/@Pages"/> PAGES</font><BR/></td></tr>
      <tr><td width="175" bgColor="#f4f4ef"><font face="Arial,Helvetica,Univers,Zurich BT" size="-1">
         <b>ISBN:</b> <xsl:value-of select="BOOKS/BOOK/ISBN"/></font><BR/></td></tr>
      <tr><td width="175" bgColor="#e5e5d8"><font face="Arial,Helvetica,Univers,Zurich BT" size="-1">
         <b>PRICE: </b><xsl:value-of select="BOOKS/BOOK/PRICE"/></font><BR/></td></tr>
   </table>   
</body>
</html>
</xsl:template>
</xsl:stylesheet>
