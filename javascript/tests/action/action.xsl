<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
    $Id: action.xsl,v 1.6 2006/03/29 12:10:39 james Exp $

    $Log: action.xsl,v $
    Revision 1.6  2006/03/29 12:10:39  james
    Moving all XML schemas under a single holding schema - as an experiment

    Revision 1.5  2006/02/22 11:20:08  james
    Added experimental code dispatch

    Revision 1.4  2006/02/20 12:16:04  james
    Adding dispatch code

    Revision 1.3  2006/02/19 13:23:44  james
    Added code gen to DBC components of actions

    Revision 1.2  2006/02/14 21:43:21  james
    Trying to move namespace issues out of xslt

    Revision 1.1  2006/02/13 11:09:01  james
    Getting stup project for actions - first task is to see if I can share code with state via the 'mc' code namespace


	Stylesheet references action and code schema
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

    <xsl:import href="../code/code.xsl"/>
    
    <xsl:output method="text" standalone="yes" />

    <xsl:template match="/">
		// Action!		
   	    var l_action = MetaWrap.Action.m_action;
        <xsl:apply-templates select="metawrap" mode="metawrap" />
    </xsl:template>

    <!-- Match with actions root element -->
    <xsl:template match="metawrap" mode="metawrap" >
        // Create a new array of actions
        <xsl:apply-templates select="actions" mode="actions" />
    </xsl:template>

    <!-- Match with actions root element -->
    <xsl:template match="actions" mode="actions" >
        // Create a new array of actions
        <xsl:apply-templates select="action" mode="action" />
    </xsl:template>

    <!-- Match with action element -->
    <xsl:template match="action" mode="action" >               
        // action... <xsl:value-of select="@name"/>        
	    l_action = new MetaWrap.Action.Action("<xsl:value-of select="@name"/>",l_action)        
	    
	    // Add this action to the lookup table of its parent
  	    l_action.m_parent.m_actions[l_action.m_name] = l_action;  	    
		<xsl:for-each select="param">
			<xsl:variable name="name" select="@name"/>  
			l_action.m_params[l_action.m_params.length] = "<xsl:value-of select="$name"/>";
		</xsl:for-each>
  	    
        	    
		l_action.m_code = function(p_env
		<xsl:for-each select="param">
			<xsl:variable name="name" select="@name"/>  
			// param '<xsl:value-of select="$name"/>'
			,<xsl:value-of select="$name"/>
		</xsl:for-each>
		
		<xsl:apply-templates select="code" mode="code" />
        <xsl:apply-templates select="precondition" mode="precondition" />
        <xsl:apply-templates select="invariant" mode="invariant" />                
        <xsl:apply-templates select="postcondition" mode="postcondition" />        
        
   	    // Restore to our original parent.
   	    l_action = l_action.m_parent;        
    </xsl:template>

    <xsl:template match="precondition" mode="precondition" >
        // add a precondition
        l_action.m_pre[l_action.m_pre.length] = function(
        <xsl:apply-templates select="code" mode="code" />
    </xsl:template>
    
    <xsl:template match="postcondition" mode="postcondition" >
        // add a postcondition
        l_action.m_post[l_action.m_post.length] = function(
        <xsl:apply-templates select="code" mode="code" />
    </xsl:template>

    <xsl:template match="invariant" mode="invariant" >
        // add an invariant
        l_action.m_inv[l_action.m_inv.length] = function(
        <xsl:apply-templates select="code" mode="code" />
    </xsl:template>

    
</xsl:stylesheet>