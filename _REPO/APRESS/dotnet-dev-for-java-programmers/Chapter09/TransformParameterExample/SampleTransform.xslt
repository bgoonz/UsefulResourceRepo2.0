<?xml version="1.0" encoding="UTF-8" ?>
<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform" xmlns:tns="http://tempuri.org/sample.xsd">
	<param name="arg" />
	<template match="*">
		<copy>
			<apply-templates />
		</copy>
	</template>
	<template match="tns:name">
		<copy>
			<apply-templates />
		</copy>
		<element name="tns:arg">
			<value-of select="$arg" />
		</element>
	</template>
</stylesheet>
