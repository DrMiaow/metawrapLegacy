<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="metawrap_application_elements.xsl"/>

	<xsl:template match="/">
		<xsl:apply-templates select="session" mode="session" />
	</xsl:template>
	
	<!-- Match wil source code elements -->
	<xsl:template match="session" mode="session" >
	    <xsl:apply-templates select="user" mode="user" />
	    <xsl:apply-templates select="application" mode="application" />
	</xsl:template>

	<!-- Match wil source code elements -->
	<xsl:template match="user" mode="user" >
	</xsl:template>   

	<!-- Match wil source code elements -->
	<xsl:template match="application" mode="application" >    
		<html>
			<head>
				<script language="JavaScript" type="text/javascript">     
					alert("DEBUG: In JavaScript XHTML/XFORM generated MetaWrap XML Document");
				</script>
				<title>
					<xsl:value-of select="metadata/title"/>
				</title>   
			</head>
			<body>
				<xsl:apply-templates select="body/*" /> 
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>