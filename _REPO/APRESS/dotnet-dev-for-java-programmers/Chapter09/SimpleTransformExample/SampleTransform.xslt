<?xml version="1.0" encoding="UTF-8" ?>
<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform"
xmlns:tns="http://tempuri.org/sample.xsd">
	<template match="/">
		<element name="tns:root" >
			<apply-templates />
		</element>
	</template>
	<template match="tns:name">
		<element name="tns:name" >
			<attribute name="profession">
				<value-of select="local-name(parent::node())"/>
			</attribute>
			<value-of select="." />
		</element>
	</template>
	<template match="tns:discovery">
	</template>
</stylesheet>
