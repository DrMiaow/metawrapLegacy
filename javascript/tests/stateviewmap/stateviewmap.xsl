<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
    $Id: stateviewmap.xsl,v 1.2 2004/01/05 19:29:44 james Exp $

    $Log: stateviewmap.xsl,v $
    Revision 1.2  2004/01/05 19:29:44  james
    Wired up transition event pairs to the viewstate

    Revision 1.1  2008/07/20 07:10:07  james
    *** empty log message ***

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	
    <xsl:output method="text" standalone="yes" />

	<xsl:template match="/">
		
		
		function _stateviewmap_gen()
		{	
			var l_MSVMSVM = MetaWrap.StateViewMap.StateViewMap;			
			var l_MSVMSVMP = MetaWrap.StateViewMap.StateViewMap.Page;
			var l_MSVMSVMA = MetaWrap.StateViewMap.StateViewMap.Aspect;
			var l_MVape = MetaWrap.View.addAspectEvent;
			MetaWrap.StateViewMap.m_state_view_maps = [];
			var l_MSVMm = MetaWrap.StateViewMap.m_state_view_maps;
			// Create a new array of states			
			//alert("loading stateviewmap");
			var l_stateviewmap = null;		
			<xsl:apply-templates select="metawrap" mode="metawrap" />
		}		
		_stateviewmap_gen();
		
	</xsl:template>
	
	<xsl:template match="metawrap" mode="metawrap">		
		
	
	
	
		<xsl:apply-templates select="stateviews" mode="stateviews" />
	</xsl:template>
	

	<!-- Match with states root element -->
	<xsl:template match="stateviews" mode="stateviews" >
	    <xsl:apply-templates select="state" mode="state" />		
		//debugger;   	    
	</xsl:template>

	<!-- Match with state element -->
	<xsl:template match="state" mode="state" >    		    
		// state... <xsl:value-of select="@name"/>	    


		if (l_MSVMm["<xsl:value-of select="@name"/>"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new l_MSVMSVM("<xsl:value-of select="@name"/>");
		
			l_MSVMm["<xsl:value-of select="@name"/>"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = l_MSVMm["<xsl:value-of select="@name"/>"];
		}

		// do all the states that this state implies
		<xsl:apply-templates select="page" mode="stateviewstatepage" />

		// do all the aspects that this state implies
		<xsl:apply-templates select="aspect" mode="stateviewstatesapect" />

	</xsl:template>
		
	<!-- Match with page element -->
	<xsl:template match="page" mode="stateviewstatepage" >    
		l_stateviewmap.m_page = new l_MSVMSVMP("<xsl:value-of select="@name"/>");
		
		<xsl:if test="@onshow != ''">			
			//alert("pageevent = <xsl:value-of select="../@name"/>.onshow");				
			MetaWrap.View.addPageEvent("<xsl:value-of select="../@name"/>.onshow","<xsl:value-of select="@name"/>",function() 
				{ 
					<xsl:value-of select="@onshow"/>
				},"<xsl:value-of select="@onshow"/>");
   		</xsl:if>

		<xsl:if test="@onhide!= ''">			
			//alert("pageevent = <xsl:value-of select="../@name"/>.onhide");				
			MetaWrap.View.addPageEvent("<xsl:value-of select="../@name"/>.onhide","<xsl:value-of select="@name"/>",function() 
				{ 
					<xsl:value-of select="@onhide"/>
				},"<xsl:value-of select="@onshow"/>");
   		</xsl:if>

		
		<xsl:if test="@onstate != ''">			
			//alert("pageevent = <xsl:value-of select="../@name"/>.onshow");				
			MetaWrap.View.addPageEvent("<xsl:value-of select="../@name"/>.onstate","<xsl:value-of select="@name"/>",function() 
				{ 
					<xsl:value-of select="@onstate"/>
				},"<xsl:value-of select="@onstate"/>");
				
   		</xsl:if>
		
	</xsl:template>

	<!-- Match with aspect element -->
	<xsl:template match="aspect" mode="stateviewstatesapect" >    
		l_stateviewmap.m_aspects["<xsl:value-of select="@name"/>"] = new l_MSVMSVMA("<xsl:value-of select="@name"/>");

		<xsl:if test="@onshow != ''">			
			//alert("event = <xsl:value-of select="../@name"/>.onshow");				
			MetaWrap.View.addAspectEvent("<xsl:value-of select="../@name"/>.onshow","<xsl:value-of select="@name"/>",function() 
				{ 
					<xsl:value-of select="@onshow"/>
				},"<xsl:value-of select="@onshow"/>");				
   		</xsl:if>
		
		<xsl:if test="@onhide != ''">			
			//alert("event = <xsl:value-of select="../@name"/>.onhide");				
			MetaWrap.View.addAspectEvent("<xsl:value-of select="../@name"/>.onhide","<xsl:value-of select="@name"/>",function() 
				{ 
					<xsl:value-of select="@onhide"/>
				},"<xsl:value-of select="@onhide"/>");				
   		</xsl:if>		
		
		<xsl:if test="@onstate != ''">			
			//alert("event = <xsl:value-of select="../@name"/>.onshow");				
			MetaWrap.View.addAspectEvent("<xsl:value-of select="../@name"/>.onstate","<xsl:value-of select="@name"/>",function() 
				{ 
					<xsl:value-of select="@onstate"/>
				},"<xsl:value-of select="@onstate"/>");
				
   		</xsl:if>
		
	</xsl:template>
		
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2007. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios ><scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="no" url="test_1_stateviewmap.xml" htmlbaseurl="" outputurl="" processortype="internal" useresolver="no" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator=""/></scenarios><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/><MapperBlockPosition></MapperBlockPosition><TemplateContext></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
-->