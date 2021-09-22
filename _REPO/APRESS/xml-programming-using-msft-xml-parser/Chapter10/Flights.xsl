<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<html>
<center>
<h2>Flight Schedules</h2>
   <h3>From <xsl:value-of select="FlightsInfo/From"/> to <xsl:value-of select="FlightsInfo/To"/> on <xsl:value-of select="FlightsInfo/Date"/></h3>
<table border="0">
   <tr bgcolor="#E5E5D8"><td><b>Flight No</b></td><td><b>Dep Time</b></td><td><b>Arr Time</b></td><td><b>Operating Days</b></td><td><b>Stops</b></td><td><b>Aircraft Type</b></td></tr>
   <xsl:for-each select="FlightsInfo/Flight">
   <tr  bgcolor="#F4F4EF">
      <td><xsl:value-of select="FlightNo"/></td>
      <td><xsl:value-of select="DepTime"/></td>
      <td><xsl:value-of select="ArrTime"/></td>
      <td><xsl:value-of select="Operating"/></td>
      <td><xsl:value-of select="Stops"/></td>
      <td><xsl:value-of select="AircraftType"/></td>
   </tr>
   </xsl:for-each>
</table>
</center>
<br/><b>Legend</b><br/>
<i>Operating Days: </i><br/>
0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thur, 5 = Fri, 6 = Sat <br/>
<i>Arrival Times:</i><br/>
+1 Arrival next day<br/>
+2 Arrival two days later<br/>
</html>
</xsl:template>
</xsl:stylesheet>

