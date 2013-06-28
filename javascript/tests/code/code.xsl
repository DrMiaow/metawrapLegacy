<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
    $Id: code.xsl,v 1.5 2007/04/22 06:34:46 james Exp $

    $Log: code.xsl,v $
    Revision 1.5  2007/04/22 06:34:46  james
    Getting state transitions happening

    Revision 1.4  2006/03/29 12:10:39  james
    Moving all XML schemas under a single holding schema - as an experiment

    Revision 1.3  2006/02/20 12:16:04  james
    Adding dispatch code

    Revision 1.2  2006/02/14 21:43:21  james
    Trying to move namespace issues out of xslt

    Revision 1.1  2006/02/13 10:54:26  james
    Attempting to share code XSLT between state and action


-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- 
		
		This stylesheet contains rules for state instructions.
		
	-->
	
	<xsl:import href="code_instructions.xsl"/>
	
    <xsl:output method="text" standalone="yes" />

	<xsl:template match="/">
		// code
        <xsl:apply-templates select="metawrap" mode="metawrap" />
	</xsl:template>

    <!-- Match with actions root element -->
    <xsl:template match="metawrap" mode="metawrap" >
        // Create a new array of actions
		<xsl:apply-templates select="code" mode="code" />        
    </xsl:template>
	

	<!-- Match with condition element -->
	<xsl:template match="code" mode="code" > 	
		)
		{	 
			// Code start
		    try
		    {
				<xsl:apply-templates select="body" mode="body" />	    
		    }
		    catch(l_e)
		    {
				alert("ERROR " + MetaWrap.exceptionMessage(l_e));
		    	<xsl:apply-templates select="fault" mode="fault" />
		    }
			// Code end
	    }
	</xsl:template>


	<!-- Match with condition element -->
	<xsl:template match="body" mode="body" >    
	    // Body start
	    <xsl:apply-templates select="*" mode="instruction" />	    
	    // Body end	    
	</xsl:template>

	<!-- Match with condition element -->
	<xsl:template match="fault" mode="fault" >    
	    // Fault start
	    <xsl:apply-templates select="*" mode="instruction" />	    
	    // Fault end	    
	</xsl:template>


</xsl:stylesheet>