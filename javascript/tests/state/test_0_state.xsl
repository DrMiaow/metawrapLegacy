<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
    $Id: test_0_state.xsl,v 1.2 2004/01/02 01:22:43 james Exp $

    $Log: test_0_state.xsl,v $
    Revision 1.2  2004/01/02 01:22:43  james
    State machine renaming

    Revision 1.1  2007/10/24 09:44:14  james
    Working out the semantics of the new skin system

    Revision 1.15  2006/03/29 12:10:40  james
    Moving all XML schemas under a single holding schema - as an experiment

    Revision 1.14  2006/02/20 12:16:05  james
    Adding dispatch code

    Revision 1.13  2006/02/15 11:45:41  james
    *** empty log message ***

    Revision 1.12  2006/02/02 13:09:21  james
    Basic sub states operating

    Revision 1.11  2006/02/02 09:27:20  james
    Getting ready to parse substates

    Revision 1.10  2006/02/01 13:17:52  james
    Refactoring state for substates

    Revision 1.9  2006/01/31 13:21:50  james
    Added state exclusion and state mutex.

    Revision 1.8  2006/01/29 09:11:46  james
    Creating state instructions

    Revision 1.7  2006/01/25 12:58:28  james
    Stubs created for data transfer functions

    Revision 1.6  2006/01/25 11:27:27  james
    First execution with only error handlers has worked perfectly.
    Tomorrow - code up instruction support functions.

    Revision 1.5  2006/01/24 12:39:00  james
    Created stub pipeline for library

    Revision 1.4  2006/01/24 10:58:19  james
    Completed initial instructions and framework - can now start coding library
    Attempting to deal with formatting.

    Revision 1.3  2006/01/23 12:36:59  james
    Documenting and commenting

    Revision 1.2  2006/01/23 12:32:56  james
    More work on state

    Revision 1.1  2006/01/19 13:36:59  james
    A few steps closer in the state instruction stylesheet

    Revision 1.0  2006/01/18 11:34:40  james
    Added simple structire for state transformation


	1) Stylesheet must be compact
    2) Stylesheet must generate compact code
    3) Stylesheet must be able to report errors in code

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<!--  xmlns:ms="./state.xsd"  -->
	<xsl:import href="../code/code.xsl"/>
	
    <xsl:output method="text" standalone="yes" />

	<xsl:template match="/">
	    // Now add this to the global object model, and we are clear to go
   	    // The current state
   	    var l_state = MetaWrap.State.m_state;
		<xsl:apply-templates select="metawrap" mode="metawrap" />
	</xsl:template>
	
	<xsl:template match="metawrap" mode="metawrap">
   	    var l_state = MetaWrap.State.m_state;
		<xsl:apply-templates select="states" mode="states" />
	</xsl:template>
	

	<!-- Match with states root element -->
	<xsl:template match="states" mode="states" >
	    // Create a new array of states
	    <xsl:apply-templates select="state" mode="state" />
   	    <xsl:apply-templates select="mutex" mode="mutex" />
	</xsl:template>

	<!-- Match with state element -->
	<xsl:template match="state" mode="state" >    		    
	    // state... <xsl:value-of select="@name"/>

	    l_state = new MetaWrap.State.State("<xsl:value-of select="@name"/>",l_state)
	    
		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;
	     	    	    
	    <xsl:apply-templates select="actives" mode="actives" />
   	    <xsl:apply-templates select="exclude" mode="exclude" />

   	    
   	    // do all the states that this state contains
   	    // blah blah
   	    <xsl:apply-templates select="states" mode="states" />   	    
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	</xsl:template>
	
	
	<!-- Match with actives element -->
	<xsl:template match="actives" mode="actives" >    
	    // actives a set of conditions to be true	    
	    <xsl:apply-templates select="condition" mode="condition" />	    
	</xsl:template>

	<!-- Exclusion Check -->
	<xsl:template match="exclude" mode="exclude" >    
	    // actives a set of conditions to be true	    
		l_state.m_exclusions[l_state.m_exclusions.length] = function()
		{
			var l_s = this.m_parent.findState("<xsl:value-of select="@state"/>");			
			if (l_s == null)
			{
				alert("could not find state " + "<xsl:value-of select="@state"/>");
				return false;
			}			
			return (l_s.m_activated == false);
		}
	</xsl:template>

	<!-- Exclusion Check -->
	<xsl:template match="mutex" mode="mutex" >    
	    // actives a set of conditions to be true	
		l_state.m_mutexes[l_state.m_mutexes.length] = function()
		{				
			var l_s1 = this.findState("<xsl:value-of select="@state1"/>");		
			if (l_s1 == null)
			{
				alert("could not find state " + "<xsl:value-of select="@state1"/>");
				return false;
			}
			var l_s2 = this.findState("<xsl:value-of select="@state2"/>");		
			if (l_s2 == null)
			{
				alert("could not find state " + "<xsl:value-of select="@state2"/>");
				return false;
			}		
			return !(l_s1.m_activated &amp;&amp; l_s2.m_activated);
		}
	</xsl:template>


	<!-- Match with condition element -->
	<xsl:template match="condition" mode="condition" >    
	    // condition start
	    l_state.m_active[l_state.m_active.length] = function(
	    <xsl:apply-templates select="code" mode="code" />	    	    
	    // condition end
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