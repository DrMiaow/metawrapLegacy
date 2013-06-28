<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- 
	
	Elements from the WHATWG Web Application 1.0 Specification 
	
	This template converts the elements into HTML4 compliant with
	IE6/Firefox1 standards.
	
	-->

	<!-- Process a 'cite' element -->
	<xsl:template match="cite">
		<div class="mwcite"><u><xsl:value-of select="."/></u></div>
	</xsl:template>	
	
	<!-- Process a 'blockquote' element -->
	<xsl:template match="blockquote">
		<div class="mwblockquote"><i><xsl:value-of select="."/></i></div>
	</xsl:template>	
	
	<!-- Process a 'article' element -->
	<xsl:template match="article">
		<div class="mwarticle"><xsl:value-of select="."/></div>
	</xsl:template>		

	<!-- Process a 'code' element -->
	<xsl:template match="code">
		<div class="mwcode"><pre><xsl:value-of select="."/></pre></div>
	</xsl:template>
	
	<!-- Process a 'p' element -->
	<xsl:template match="p">
		<div class="mwp"><p><xsl:value-of select="."/></p></div>
	</xsl:template>	
	
	
	<!--
	 
		Custom MetaWrap Web Application Specs 
	
	-->
	
	<!--
	 
		BLOG 
	
	-->	
	
	<!-- Process a 'comment' element -->
	<xsl:template match="blog">
		<div class="mwblog"><xsl:apply-templates select="post" /></div>
	</xsl:template>	
	
	<!-- Process a 'post' element -->
	<xsl:template match="post">
		<div class="mwpost"><b><xsl:apply-templates select="entry" /><hr/><xsl:apply-templates select="comments" /></b></div>
	</xsl:template>	

	<!-- Process a 'entry' element -->
	<xsl:template match="entry">
		<div class="meentry"><p><xsl:apply-templates select="*" /></p></div>
	</xsl:template>	
	
	<!-- Process a 'entry' element -->
	<xsl:template match="comments">
		<div class="comments"><u><xsl:apply-templates select="comment" /></u></div>
	</xsl:template>	
		
	<!-- Process a 'comment' element -->
	<xsl:template match="comment">
		<div class="mwcomment"><i><xsl:value-of select="."/></i></div>
	</xsl:template>	
	
	
	<!--
	 
		WIDGETS 
	
	-->	
	
	<!-- Process a 'signup' element widget-->
	<xsl:template match="signup">
			<div class="mwsignup">
				<xsl:element name="form" >
					<xsl:attribute name="action">
						<xsl:value-of select="@destination"/>
					</xsl:attribute>
					<xsl:attribute name="onsubmit">MetaWrap.Actions.doAction(this,"<xsl:value-of select="@destination"/>");return false;</xsl:attribute>
					
					<input name="email" type="text"/>
					<!-- http://www.htmlhelp.com/reference/html40/forms/input.html -->
					<input value="signup" type="submit"/>
				</xsl:element>
			</div>
	</xsl:template>			

</xsl:stylesheet>