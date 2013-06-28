<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<!--  xmlns:ms="./state.xsd"  -->
	
	<!-- chrome does not like xslt import -->
	<!--<xsl:import href="../code/code.xsl"/>-->
	
    <xsl:output method="text" standalone="yes" />
	

	<xsl:template match="/">	
		function _state_gen()
		{	
			// Now add this to the global object model, and we are clear to go
			// The current state
			var l_state = MetaWrap.State.m_state; 
			var l_MSS = MetaWrap.State.State;
			var l_g = MetaWrap.State.m_groups;
		
			// Used when creating a closure
			var f_make_closure = null;
			//alert("loading state");
			<xsl:apply-templates select="metawrap" mode="metawrap" />
		}		
		_state_gen();
	</xsl:template>
	
	<xsl:template match="metawrap" mode="metawrap">
		<xsl:apply-templates select="states" mode="states" />
	</xsl:template>

	<!-- Match with states root element -->
	<xsl:template match="states" mode="states" >
	    // Create a new array of states

		<xsl:if test="@mutex = 'true'">
		    // All the immediate substates are mutually exclusive
		    l_state.m_substates_mutex = true;
   		</xsl:if>


	    <xsl:apply-templates select="state" mode="state" />
   	    <xsl:apply-templates select="mutex" mode="mutex" />
	</xsl:template>

	<!-- Match with state element -->
	<xsl:template match="state" mode="state" >    		    
	    // state... <xsl:value-of select="@name"/>
	    l_state = new l_MSS("<xsl:value-of select="@name"/>",l_state,"<xsl:value-of select="@value"/>")
		
		<xsl:if test="@reinitialise = 'true'">
			l_state.m_reinitialise_children = true;
		</xsl:if>

		<xsl:if test="@serialise = 'true'">
			l_state.m_serialise = true;
		</xsl:if>

		
		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		<xsl:apply-templates select="group" mode="group" />
		<xsl:apply-templates select="require" mode="require" />
	    <xsl:apply-templates select="active" mode="active" />
		<xsl:apply-templates select="inactive" mode="inactive" />

		<xsl:apply-templates select="activate" mode="activate" />
		<xsl:apply-templates select="deactivate" mode="deactivate" />

   	    <xsl:apply-templates select="from" mode="from" />
  	    <xsl:apply-templates select="to" mode="to" />
  	    <xsl:apply-templates select="enter" mode="enter" />
   	    <xsl:apply-templates select="exit" mode="exit" />
   	    <xsl:apply-templates select="affirm" mode="affirm" />
   	    <xsl:apply-templates select="negate" mode="negate" />
   	    <xsl:apply-templates select="lock" mode="lock" />
		
		<xsl:apply-templates select="pulse" mode="pulse" />
		<xsl:apply-templates select="unpulse" mode="unpulse" />
		
   	    <xsl:apply-templates select="include" mode="include" />
   	    <xsl:apply-templates select="exclude" mode="exclude" />
	    <xsl:apply-templates select="transitions" mode="transitions" />
   	    
   	    // do all the states that this state contains
   	    <xsl:apply-templates select="states" mode="states" />

		// foro convenience - allow the state to be not in states element - its easy to forget
		<xsl:apply-templates select="state" mode="state" />
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	</xsl:template>
	
	
	<!-- Match with active element -->
	<xsl:template match="group" mode="group" >  

		// If the group does not exist 
		if (l_g["<xsl:value-of select="@name"/>"] == null)
		{
			// then create it
			l_g["<xsl:value-of select="@name"/>"] = [];
		}
		
		// push this state onto the group
		l_g["<xsl:value-of select="@name"/>"].push(l_state);
	
	</xsl:template>		
	
	<!-- Match with active element -->
	<xsl:template match="require" mode="require" >    
	
		// Look for optional attribute with JavaScript Code
		<xsl:if test="@call != ''">
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return <xsl:value-of select="@call"/>;
		    }
		    // condition end
   		</xsl:if>

		// if there is a condition attribute then execute the code
   		<xsl:if test="condition">
		    // actives a set of conditions to be true	    		    
			l_state.m_active[l_state.m_active.length] = function(
			<xsl:apply-templates select="code" mode="code" />
			// condition end
   		</xsl:if>
	
	</xsl:template>	
	
	
	<!-- Match with active element -->
	<xsl:template match="active" mode="active" >    

		// Look for optional state name
		<xsl:if test="@state != ''">		
			// declare a local function with a sub function
			f_make_closure = function()
			{
		
				// lets try and make a closure
				var l_state_this = l_state;
				
				l_state.m_active[l_state.m_active.length] = function()
				{							
					return l_state_this.testState("<xsl:value-of select="@state"/>");
				}
			}
			
			// call it to make the closure
			f_make_closure();
   		</xsl:if>
		
		// Or it could be doing it by group
		<xsl:if test="@group != ''">
		    // condition start
			{											
			    l_state.m_active[l_state.m_active.length] = function()
			    {
			    	return MetaWrap.State.matchGroupCount("<xsl:value-of select="@group"/>",true,"<xsl:value-of select="@count"/>");					
			    }
			}
		    // condition end
		</xsl:if>
	
	</xsl:template>
	
	
	<!-- Match with inactive element -->
	<xsl:template match="inactive" mode="inactive" >    

		// Look for optional state name
		<xsl:if test="@state != ''">
			// declare a local function with a sub function
			f_make_closure = function()
			{
		
				// lets try and make a closure
				var l_state_this = l_state;
				
				l_state.m_inactive[l_state.m_inactive.length] = function()
				{			 						
					return l_state_this.testState("<xsl:value-of select="@state"/>");
				}
			}
			
			// call it to make the closure
			f_make_closure();
   		</xsl:if>
		
		// Or it could be doing it by group
		<xsl:if test="@group != ''">
		    // condition start
			{				
				// lets try and make a closure				
			    l_state.m_inactive[l_state.m_active.length] = function()
			    {
			    	return MetaWrap.State.matchGroupCount("<xsl:value-of select="@group"/>",true,"<xsl:value-of select="@count"/>");					
			    }
			}
		    // condition end
		</xsl:if>		
	
	</xsl:template>	


	<!-- Match with activate element -->
	<xsl:template match="activate" mode="activate" >    
	    // We want to activate a state when we enter a state
		<xsl:if test="@state != ''">
			l_state.m_activations["<xsl:value-of select="@state"/>"] = true;
   		</xsl:if>

	</xsl:template>


	<!-- Match with activate element -->
	<xsl:template match="deactivate" mode="deactivate" >    	    
		// We want to activate a state when we enter a state
		<xsl:if test="@state != ''">
			l_state.m_deactivations["<xsl:value-of select="@state"/>"] = true;
   		</xsl:if>

	</xsl:template>


	<!-- Match with transitions element -->
	<xsl:template match="transitions" mode="transitions" >    
	    // This is the code to be executed when we transition from one state to another or to a state
	    //alert('transitions');
   	    <xsl:apply-templates select="from" mode="from" />
  	    <xsl:apply-templates select="to" mode="to" />
	</xsl:template>

	<!-- Match with transitions element -->
	<xsl:template match="transition" mode="transition_to" >    
	    // This is the code to be executed when we transition from to a state
	    <xsl:if test="code">	    
		    //alert("CODE transition to S'" + l_state.m_name + " from @'<xsl:value-of select="@from"/>'");	    
			l_state.m_transitions.add_to("<xsl:value-of select="@from"/>",
		    // 'to' transition code start
			function(
		    <xsl:apply-templates select="code" mode="code" />
		    // 'to' transition code end	    
		    );
  		</xsl:if>
	    
	</xsl:template>

	<!-- Match with transitions element -->
	<xsl:template match="from" mode="to_from" >    
	    // This is the code to be executed when we transition from to a state

		// Look for optional 'call' attribute with JavaScript Code
		<xsl:if test="@call != ''">
  		    //alert("JS transition to S'" + l_state.m_name + " from @'<xsl:value-of select="@state"/>' = <xsl:value-of select="@call"/>");	    
			l_state.m_transitions.add_to("<xsl:value-of select="@state"/>",
		    // 'to' transition code start
			function()
		    {
		    	return <xsl:value-of select="@call"/>;
		    }	
		    // 'to' transition code end	    
		    );
   		</xsl:if>

        <xsl:if test="code">
	        //alert("CODE transition to S'" + l_state.m_name + " from @'<xsl:value-of select="@state"/>'");	    
			l_state.m_transitions.add_to("<xsl:value-of select="@state"/>",
		    // 'to' transition code start
			function(
		    <xsl:apply-templates select="code" mode="code" />
		    // 'to' transition code end	    
		    );
  		</xsl:if>
	</xsl:template>


	<!-- Match with transition element -->
	<xsl:template match="transition" mode="transition_from" >    
	    // This is the code to be executed when we transition from to a state
        <xsl:if test="code">	    
        //alert("CODE: transition from S'" + l_state.m_name + "'  to @'<xsl:value-of select="@to"/>'");	    
	    l_state.m_transitions.add_from("<xsl:value-of select="@to"/>",
	    // 'from' transition code start
		function(
		<xsl:apply-templates select="code" mode="code" />
	    // 'from' transition code end	    
	    );
	    </xsl:if>
	</xsl:template>

	<!-- Match with transition element -->
	<xsl:template match="to" mode="from_to" >    
	    // This is the code to be executed when we transition from to a state

		// Look for optional 'call' attribute with JavaScript Code
		<xsl:if test="@call != ''">
			//alert("CALL transition from S'" + l_state.m_name + "'  to @'<xsl:value-of select="@state"/>' = <xsl:value-of select="@call"/>");	    
		    l_state.m_transitions.add_from("<xsl:value-of select="@state"/>",
		    // 'from' transition code start
			function()
		    {
		    	return <xsl:value-of select="@call"/>;
		    }	
		    // 'from' transition code end	    
		    );
   		</xsl:if>
        <xsl:if test="code">
	        //alert("CODE transition from S'" + l_state.m_name + "'  to @'<xsl:value-of select="@state"/>'");	    	    
		    l_state.m_transitions.add_from("<xsl:value-of select="@state"/>",
		    // 'from' transition code start
			function(
			<xsl:apply-templates select="code" mode="code" />
		    // 'from' transition code end	    
		    );
  	    </xsl:if>
	    
	</xsl:template>

	<!-- Match with transitions element -->
	<xsl:template match="enter" mode="enter" >    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		<xsl:if test="@call != ''">
  		    //alert("JS transition enter S'" + l_state.m_name + " = <xsl:value-of select="@call"/>");	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return <xsl:value-of select="@call"/>;
		    }	
		    // 'enter' transition code end	    
		    );
   		</xsl:if>

        <xsl:if test="code">
	        //alert("CODE transition enter S'" + l_state.m_name);	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function(
		    <xsl:apply-templates select="code" mode="code" />
		    // 'enter' transition code end	    
		    );
  		</xsl:if>
	</xsl:template>

	<!-- Match with transitions element -->
	<xsl:template match="exit" mode="exit" >    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		<xsl:if test="@call != ''">
  		    //alert("JS transition exit S'" + l_state.m_name + " = <xsl:value-of select="@call"/>");	    
			l_state.m_transitions.add_exit(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return <xsl:value-of select="@call"/>;
		    }	
		    // 'enter' transition code end	    
		    );
   		</xsl:if>

        <xsl:if test="code">
	        //alert("CODE transition exit S'" + l_state.m_name);	    
			l_state.m_transitions.add_exit(l_state.m_name,
		    // 'enter' transition code start
			function(
		    <xsl:apply-templates select="code" mode="code" />
		    // 'enter' transition code end	    
		    );
  		</xsl:if>
	</xsl:template>


	<!-- Match with transitions element -->
	<xsl:template match="from" mode="from" >    
	    // This is the code to be executed when we transition from one state to another
   	    <xsl:apply-templates select="transition" mode="transition_from" />
   	    <xsl:apply-templates select="to" mode="from_to" />
	</xsl:template>

	<!-- Match with transitions element -->
	<xsl:template match="to" mode="to" >    
	    // This is the code to be executed when we transition from to a state
   	    <xsl:apply-templates select="transition" mode="transition_to" />
   	    <xsl:apply-templates select="from" mode="to_from" />
	</xsl:template>

	<!-- Inclusion Check -->
	<xsl:template match="affirm" mode="affirm" >    
	    // force this state to be active if this state is active
		l_state.m_affirmations[l_state.m_affirmations.length] = "<xsl:value-of select="@state"/>";
	</xsl:template>

	<!-- Lock Check -->
	<xsl:template match="lock" mode="lock" >    
	    // force this state to be active if this state is active
		l_state.m_locks[l_state.m_locks.length] = "<xsl:value-of select="@state"/>";
	</xsl:template>

	<!-- Lock Check -->
	<xsl:template match="pulse" mode="pulse" >    
	
		<xsl:if test="@state">
	    // Pulse the state as active
		l_state.m_pulses[l_state.m_pulses.length] = "<xsl:value-of select="@state"/>";
		</xsl:if>
		
		<xsl:if test="@group">
	    // Pulse the state as active
		l_state.m_pulses_group[l_state.m_pulses_group.length] = "<xsl:value-of select="@group"/>";
		</xsl:if>
		
	</xsl:template>

	<!-- Lock Check -->
	<xsl:template match="unpulse" mode="unpulse" >    
	    // Pulse the state as active
		<xsl:if test="@state">
		l_state.m_unpulses[l_state.m_unpulses.length] = "<xsl:value-of select="@state"/>";
		</xsl:if>

		<xsl:if test="@group">
	    // Pulse the state as active
		l_state.m_unpulses_group[l_state.m_unpulses_group.length] = "<xsl:value-of select="@group"/>";
		</xsl:if>

		
	</xsl:template>


	
	<!-- Negation Check -->
	<xsl:template match="negate" mode="negate" >    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "<xsl:value-of select="@state"/>";
	</xsl:template>
	   
	<!-- Inclusion Check -->
	<xsl:template match="include" mode="include" >    
	    // actives a set of conditions to be true	    
		l_state.m_inclusions[l_state.m_inclusions.length] = function()
		{
			var l_s = this.findState("<xsl:value-of select="@state"/>");			
			if (l_s == null)
			{
				alert("'include' could not find state " + "<xsl:value-of select="@state"/>");
				return false;
			}			
			return (l_s.m_activated == true);
		}
	</xsl:template>

	<!-- Exclusion Check -->
	<xsl:template match="exclude" mode="exclude" >    
	    // actives a set of conditions to be true	    
		l_state.m_exclusions[l_state.m_exclusions.length] = function()
		{
			var l_s = this.findState("<xsl:value-of select="@state"/>");			
			if (l_s == null)
			{
				alert("'exclude' could not find state " + "<xsl:value-of select="@state"/>");
				return false;
			}			
			return (l_s.m_activated == false);
		}
	</xsl:template>

	<!-- Mutex Check -->
	<xsl:template match="mutex" mode="mutex" >    
	    // actives a set of conditions to be true	
		l_state.m_mutexes[l_state.m_mutexes.length] = function()
		{				
			var l_s1 = this.findState("<xsl:value-of select="@state1"/>");		
			if (l_s1 == null)
			{
				alert("'mutex' could not find state " + "<xsl:value-of select="@state1"/>");
				return false;
			}
			var l_s2 = this.findState("<xsl:value-of select="@state2"/>");		
			if (l_s2 == null)
			{
				alert("'mutex' could not find state " + "<xsl:value-of select="@state2"/>");
				return false;
			}		
			return !(l_s1.m_activated &amp;&amp; l_s2.m_activated);
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
	
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2007. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios/><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/><MapperBlockPosition></MapperBlockPosition><TemplateContext></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
-->