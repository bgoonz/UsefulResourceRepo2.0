<?xml version="1.0" encoding="UTF-8" ?>
<stylesheet version="1.0" 
xmlns="http://www.w3.org/1999/XSL/Transform" 
xmlns:tns="http://tempuri.org/sample.xsd"
xmlns:msxsl="urn:schemas-microsoft-com:xslt"
xmlns:myext="urn:my-schemas:extension-script"
>

	<msxsl:script language="C#" implements-prefix="myext">
		<![CDATA[
	    public string doit()
		{
			return "you would do somethign useful here of course";
		}
		]]>
	</msxsl:script>


	<template match="*">
		<copy>
			<apply-templates />
		</copy>
	</template>
	<template match="tns:name">
		<copy>
			<apply-templates />
		</copy>
		<element name="tns:ext">
		<value-of select="myext:doit()"/>
		</element>
	</template>
</stylesheet>
