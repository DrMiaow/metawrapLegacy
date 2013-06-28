<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- Match wil source code elements -->
	<xsl:template match="code">
		<div class="mwcode"><pre><xsl:value-of select="."/></pre></div>
	</xsl:template>

</xsl:stylesheet>