<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
   <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml"&gt;</xsl:text>
   <wml>
      <card id="card1" title="Books">
         <p>
            <b><xsl:value-of select="BOOKS/BOOK/TITLE"/></b><br/>
            by <i><xsl:value-of select="BOOKS/BOOK/AUTHOR"/></i><br/>
            <b>Type:</b><xsl:value-of select="BOOKS/BOOK/@Type"/><br/>
            <b>Pages:</b><xsl:value-of select="BOOKS/BOOK/@Pages"/><br/>
            <b>ISBN:</b> <xsl:value-of select="BOOKS/BOOK/ISBN"/><br/>
            <b>PRICE: $$</b><xsl:value-of select="BOOKS/BOOK/PRICE"/><br/>
         </p>
      </card>   
   </wml>
</xsl:template>
</xsl:stylesheet>

