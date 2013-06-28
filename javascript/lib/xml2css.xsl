<?xml version="1.0" encoding="UTF-8"?>
<!--
     $Id: xml2css.xsl,v 1.1 2007/08/13 09:53:39 james Exp $

    $Log: xml2css.xsl,v $
    Revision 1.1  2007/08/13 09:53:39  james
    New behaviors

    Revision 1.4  2005/10/05 12:45:33  james
    Got nested style XML working

    Revision 1.3  2005/10/04 13:43:46  james
    Got some more testcases working for wirewrap

    Revision 1.2  2005/08/31 12:41:53  james
    Testcase 3 now processes style and behavior xml
    on browsers that have XSLT support.

    Revision 1.1  2005/08/25 12:23:15  james
    Moved code

    Revision 1.2  2005/07/02 13:31:09  james
    Testing under Eclipse

    Revision 1.1  2005/07/01 08:13:55  james
    Addinf simple transforms for behavior xml

    
    @brief Coverts a wirewrap xml file into a w3 complaint css
 -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:wr="http://xsd.metawrap.com/wirewrap/1.0/wirewrap.xsd" version="1.0">
    
    <xsl:output method="text" standalone="yes" />
    
    <xsl:template match="/wr:wirewrap">
	    <xsl:call-template name="selector">
	    	<xsl:with-param name="p_selector" select="''"/>		    
	    </xsl:call-template>
    </xsl:template>
    
	<xsl:template name="selector">
		<xsl:param name="p_selector"/>

        <xsl:for-each select="wr:selector">
        	<xsl:if test="wr:style">
<xsl:if test="$p_selector != ''"><xsl:value-of select="$p_selector"/><xsl:text> </xsl:text></xsl:if><xsl:value-of select="@css"/><xsl:text>
{</xsl:text><xsl:value-of select="wr:style"/><xsl:text>
}
</xsl:text>
</xsl:if>
			<xsl:if test="$p_selector != ''">
				<xsl:call-template name="selector">
						<xsl:with-param name="p_selector" select="concat($p_selector,' ',@css)"/>				
				</xsl:call-template>
			</xsl:if>
			
			<xsl:if test="$p_selector = ''">
				<xsl:call-template name="selector">
						<xsl:with-param name="p_selector" select="@css"/>				
				</xsl:call-template>
			</xsl:if>
			
        </xsl:for-each>
	</xsl:template>
    
</xsl:stylesheet>