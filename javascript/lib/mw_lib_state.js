/*

    @file mw_lib_state.js

    $Id: mw_lib_state.js,v 1.60 2008/09/25 05:54:39 james Exp $

    @author     James Mc Parlane

    PROJECT:    MetaWrap JavaScript Library

    COMPONENT:  -

    @date       11 September 2004


    GENERAL INFO:

        Massive Technologies
        PO Box 567
        Darlinghurst 2010
        NSW, Australia
        email:  james@massive.com.au
        tel:    (+61-2) 9331 8699
        fax:    (+61-2) 9331 8699
        mob:    (+61) 407-909-186


    LICENSE:

    Copyright (C) 2001  Massive Technologies, Pty Ltd.

    MetaWrap is free software;you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation;either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY;without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program;if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

*/

/*! \page mw_lib_javascript_state MetaWrap - JavaScript - State
 *
 */

//debug("$Id: mw_lib_state.js,v 1.60 2008/09/25 05:54:39 james Exp $");

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Pipeline","mw_lib_pipeline.js");
MwUse("MetaWrap.Network","mw_lib_network.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.XSLT","mw_lib_xml_xslt.js");

/*! \defgroup mw_lib_javascript_state  MetaWrap - JavaScript - State
 *@{
 */

/*!
    @namespace  MetaWrap.State
    @brief      Declare the MetaWrap.State namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State = {};

/*! @brief  The current state */

// The name of the file core file we are loading state for - by default it ends up being set as the name of the html filename (without extension) with '.xml' appended.
MetaWrap.State.m_file_name = "unknown";

// The file extension of the file we are loading state for .  In most cases this will be .html
MetaWrap.State.m_file_extension = "unknown";

// The url of the xml containing the state machine location
MetaWrap.State.m_xml_location = "";

// The url of the xsl file containing the XSLT that can transform the XML into JavaScript
MetaWrap.State.m_xsl_location = "../state/state.xsl";

// The url of the pre-converted JS
MetaWrap.State.m_js_location = "";

// The XmlDocument created by loading m_xsl_location
MetaWrap.State.m_xml_document = null;

// The XsltTransform created by loading m_xsl_location
MetaWrap.State.m_xslt = null;

// The XsltProcessor created from m_xslt
MetaWrap.State.m_xslt_processor = null;

// The result of the transform
MetaWrap.State.m_result = "";

// Array of all active states
MetaWrap.State.m_current_active_states = [];

// Array of dirty states
MetaWrap.State.m_dirty_states = [];

// All the named groups in this state machine - this is an array of arrays the top level being a hash table of the group name.
MetaWrap.State.m_groups = [];

// Array of delegates to be called when the statemachine changes. This is used by the StateViewMap to trigger a view update when state changes.
MetaWrap.State.onstatechange = null;

// If this is true then state determination has been suspended
MetaWrap.State.m_state_suspended = false;

// If this is true then state determination is/was suspended and we defered its determination - so state needs to be determined when we resume state determination
MetaWrap.State.m_state_needs_determination = false;

// If this is true then the state chnages in the last call to  MetaWrap.State.determineState()
MetaWrap.State.m_states_changed = false;

/*!
    @func       MetaWrap.State.Transitions = function()
    @param      p_name
    @param      p_parent
    @brief      Constructor for MetaWrap.State.Transitions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.Transitions = function()
{
	// Transitions from this state to another state
    this.m_from = new Array();

    // Transitions to this state from another state
    this.m_to = new Array();

    // Transitions entering this state
    this.m_enter = new Array();

    // Transitions entering this state
    this.m_exit = new Array();

}


/*!
    @func       MetaWrap.State.Transitions = function()
    @param      p_name
    @param      p_parent
    @brief      Constructor for MetaWrap.State.Transitions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.Transition = function(p_function)
{
	// Transitions from this state
    this.m_function = p_function;
}

/*!
    @func       MetaWrap.State.Transitions.prototype.add_to = function(p_state_name,p_function)
    @param      p_state_name
    @param      p_function
    @brief      Add a 'to' transition such that it gets fired when we transition from this state to p_state_name
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.Transitions.prototype.add_to = function(p_state_name,p_function)
{
	// if we have no array for transitions
	if (this.m_to[p_state_name] == null)
	{
		//create the array
		this.m_to[p_state_name] = [];
	}
	
	// and push this transition
	this.m_to[p_state_name].push(new MetaWrap.State.Transition(p_function));
	
}

/*!
    @func       MetaWrap.State.Transitions.prototype.add_from = function(p_state_name,p_function)
    @param      p_state_name
    @param      p_function
    @brief      Add a 'from' transition such that it gets fired when we transition to this state from p_state_name
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.Transitions.prototype.add_from = function(p_state_name,p_function)
{
	// if we have no array for transitions
	if (this.m_from[p_state_name] == null)
	{
		//create the array
		this.m_from[p_state_name] = [];
	}
	
	// and push this transition
	this.m_from[p_state_name].push(new MetaWrap.State.Transition(p_function));
}

/*!
    @func       MetaWrap.State.Transitions.prototype.add_enter = function(p_state_name,p_function)
    @param      p_state_name
    @param      p_function
    @brief      Add an 'enter' transition such that it gets fired when we enter p_state_name
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.Transitions.prototype.add_enter = function(p_state_name,p_function)
{
	// if we have no array for transitions
	if (this.m_enter[p_state_name] == null)
	{
		//create the array
		this.m_enter[p_state_name] = [];
	}
	
	// and push this transition
	this.m_enter[p_state_name].push(new MetaWrap.State.Transition(p_function));
	
}

/*!
    @func       MetaWrap.State.Transitions.prototype.add_enter = function(p_state_name,p_function)
    @param      p_state_name
    @param      p_function
    @brief      Add an 'exit' transition such that it gets fired when we exit this p_state_name
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.Transitions.prototype.add_exit = function(p_state_name,p_function)
{
	// if we have no array for transitions
	if (this.m_exit[p_state_name] == null)
	{
		//create the array
		this.m_exit[p_state_name] = [];
	}
	
	// and push this transition
	this.m_exit[p_state_name].push(new MetaWrap.State.Transition(p_function));
}

/*!
    @func       MetaWrap.State.State = function(p_name,p_parent)
    @param      p_name
    @param      p_parent
    @brief      Constructor for MetaWrap.State.State
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State = function(p_name,p_parent,p_value)
{
	// The name of the state
    this.m_name = p_name;
	
	// Value of the state.
    this.m_activated = (p_value == "true");
	
	// the active requirements - if this state is active then these should be active
    this.m_active = new Array();
	
	// the inactive requirements - if this state is active then these states should be inactive
	this.m_inactive = new Array();
	
	// our default starting state
	this.m_activated_default = this.m_activated;

	// If  m_just_activated is true, then the state has only just been activated (if its in m_current_active_states)
	this.m_just_activated = (this.m_activated);
	//this.m_just_activated = false;

	// If  m_just_deactivated is true, then the state has only just been deactivated (if its in m_current_active_states)
	this.m_just_deactivated = (!this.m_activated);
	//this.m_just_deactivated = false;
	
	// If this is true then all the substates in m_states are mutually exclusive
	this.m_substates_mutex = false;

	// if this is  true then the state is locked in its current state and can't be changed
    this.m_locked = false;
	
	// If this is true then all activations from the public interface assume that p_reinitialise is true
	this.m_reinitialise_children = false;

	// If this is true then this state is serialised
	this.m_serialise = false;
	
	// If this state is true - then we force this state to be flase
    this.m_negations = new Array();

    // If this state is true - then we force this state to be true
    this.m_affirmations = new Array();

    // This state can be true only if these states are true
    this.m_inclusions = new Array();

	//  These states are activated on entry
	this.m_activations = new Array();

	//  These states are de activated on entry
	this.m_deactivations = new Array();

    // this state can be true, only if these states are false
    this.m_exclusions = new Array();

	// Substates of this state
    this.m_states = new Array();
	
	// Locks for this state
    this.m_locks = new Array();

	// Pulses (sets the state to activated and then lets the state machine work out the rest)
    this.m_pulses = new Array();

	// Pulses (sets the state to de-activated and then lets the state machine work out the rest)
    this.m_unpulses = new Array();

	// Sets the states in the group to activated
    this.m_pulses_group = new Array();

	// Sets the states in the group to de-activated
    this.m_unpulses_group = new Array();
	
	// The parent of this state
    this.m_parent = p_parent;
	
	// Mutexes for this state
    this.m_mutexes = new Array();

	// Transitions for this state
    this.m_transitions = new MetaWrap.State.Transitions();
	
	// NOTE: m_absolute_name should *NOT* be acessed directly - you chould access it using state.getAbsoluteName(); This is only here to remember the cached version.
	this.m_absolute_name = null;
}

// The Root state
MetaWrap.State.m_state = new MetaWrap.State.State("");

// The flat state cache used by find when we are searching from the root.
MetaWrap.State.State.m_flat_cache = {};

/*!
    @func       MetaWrap.State.findState = function(p_state)
    @param	name of the state we want to find
    @return     a reference to a state
    @brief      Find the state
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.findState = function(p_state)
{
	return MetaWrap.State.m_state.findState(p_state);
}

/*!
    @func       MetaWrap.State.determineActiveStates = function(p_state)
    @return     bool
    @brief      Return true if we marked as dirty and changed active value
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.determineActiveStates = function(p_state,p_new_active_states_array)
{
	if (p_state.m_activated)
	{
		// add to list of dirty states
		//MetaWrap.State.m_new_active_states[p_state.m_name] = p_state;

		p_new_active_states_array[p_state.m_name] = p_state;

		// look at all the children
	    for(var l_s in p_state.m_states)
	    {
	        MetaWrap.State.determineActiveStates(p_state.m_states[l_s],p_new_active_states_array);
	    }
    }
}


/*!
    @func       MetaWrap.State.testState = function(p_state)
    @return     bool
    @brief      Try setting state to active. If it works then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.testState = function(p_state)
{
	// split up the states
	var l_states = p_state.split('|');

	// if we found something to test
	if (l_states.length > 0)
	{
		for(var i = 0;i<l_states.length;i++)
		{
			//debug("l_state_name = " + l_states[i]);

			// 	Find the specified state
			var l_state = this.m_state.findState(l_states[i]);

			if (l_state != null)
			{
				if (l_state.m_activated)
				{
					return true;
				}
			}
			else
			{
				error("testState(static): failed to find state '" + l_states[i] + "'");
				//debugger;
			}
		}

		// we failed to match with anything
		return false;
	}

	error("testState: failed to parse state name '" + p_state + "'");

	return false;
}



/*!
    @func      MetaWrap.State.transitionStates = function(p_state_off,p_state_on)
    @return     bool
    @brief      Transitions two states safely when they are in a relationship that would be violiated when both or non were activated.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.transitionStates = function(p_state_off,p_state_on)
{
	//debug("transitionStates '"  + p_state_off + "' -> '"  + p_state_on + "'");

	// 	Find the specified state
	var l_state_off  = this.m_state.findState(p_state_off,true);	
	
	if (l_state_off == null)
	{
		error("unable to find state '" + p_state_off + "'");
		return false;
	}
	
	if (l_state_off.m_activated)
	{
		error("transitionStates 'off' state needs to be activated");
		return false;
	}

	// 	Find the specified state
	var l_state_on  = this.m_state.findState(p_state_on,true);	
	
	if (l_state_on == null)
	{
		error("unable to find state '" + p_state_on + "'");
		return false;		
	}
	
	if (!l_state_on.m_activated)
	{
		error("transitionStates 'on' state needs to be not activated");
		return false;
	}

	
	// set value of active
	l_state_off.m_activated = false;

	// add to list of dirty states
	l_state_off.markDirty();

	// force all the substates to be false
	l_state_off.forceFalse();
	
	// set value of active
	l_state_on.m_activated = true;
	
	// determine the current state
	MetaWrap.State.determineState();
	
	return true;
}






/*!
    @func       MetaWrap.State.affirmState = function(p_state,p_reinitialise)
    @return     bool
    @brief      Try setting state to active. If it works then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.affirmState = function(p_state,p_reinitialise)
{
	//debug("affirmState '"  + p_state + "'");

	// 	Find the specified state
	var l_state = this.m_state.findState(p_state,true);

	if (l_state != null)
	{
	
		// If we want to re-initailse the children to their default state when this is activated
		if (p_reinitialise || l_state.m_reinitialise_children)
		{
			// .. we force substates to take on their default configuration
			l_state.forceDefaults(true);
		}
	
		// Set the state to active
		l_state.setActive(true);

		// determine the current state
		MetaWrap.State.determineState();

		return l_state.m_activated;
	}

	error("affirmState: failed to find state '" + p_state + "'");

	return false;
}







/*!
    @func       MetaWrap.State.negateState = function(p_state)
    @return     bool
    @brief      Try setting state to in inactive. If it works then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.negateState = function(p_state)
{
	// 	Find the specified state
	var l_state = this.m_state.findState(p_state,true);

	if (l_state != null)
	{		
		// if the state is currently true and we are in mutex then we can't do - this - unless there is at least one state that is true to keep the mutex going.
		if (l_state.m_activated &&  (l_state.m_parent.m_substates_mutex))
		{
			fatal("'" + l_state.m_name + "' is in a mutex relationship with its siblings. If negated there will be nothing set. Affirm another sibling instead of negating '" + l_state.m_name + "'");			
			return false;
		}
			
		// Set the state to inactive
		l_state.setActive(false);

		// determine the current state
		MetaWrap.State.determineState();

		// Return true if it is inactive
		return !l_state.m_activated;
	}

	error("negateState: failed to find state '" + p_state + "'");

	return false;
}

/*!
    @func       MetaWrap.State.flipState = function(p_state)
    @return     bool
    @brief      Try flipping a state. If it flipped then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.flipState = function(p_state)
{
	// 	Find the specified state
	var l_state = this.m_state.findState(p_state,true);

	if (l_state != null)
	{
		// Flip the state
		l_state.setActive(!l_state.m_activated);

		// Remember it
		var l_current = l_state.m_activated;

		// determine the current state
		MetaWrap.State.determineState();

		// return true if it kept the right value
		return (l_state.m_activated == l_current);
	}

	error("failed to find state " + p_state);

	return false;
}

/*!
    @func       MetaWrap.State.matchGroupCount = function(p_group,p_activated,p_count)
    @return     bool
    @brief      Returns true if the group matches the count
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.matchGroupCount = function(p_groupname,p_activated,p_count)
{	
	//alert("matchGroupCount " + p_groupname + " " + p_activated + " " + p_count);

	// start with 0
	var l_count = 0;

	// Get the group by name
	var l_group = MetaWrap.State.m_groups[p_groupname];

	// If there is no group
	if (l_group != null)
	{
		// Now test each state
		for(var s in l_group)
		{
			var l_state = l_group[s];
		
			//alert(l_state.m_name);
		
			// if the state is set to what we want
			if (l_state.m_activated == p_activated)
			{
				// increment count
				l_count++;
				
				// Too many?
				if (l_count > p_count)
				{
					//alert("TO MANY l_count = " + l_count);
					// then we fail.
					return false;
				}
			}
		}
	}
	
	//alert("l_count = " + l_count);

	return (l_count == p_count);
}


/*!
    @func       MetaWrap.State.serialise = function()
    @return     comma delimited string representing  the serialised state
    @brief      Serialise the active states. This is used by the view history buffer
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.serialise = function()
{
	var l_serialised = "";

	var l_cas = MetaWrap.State.m_current_active_states;

		for(var l_s in l_cas)
		{
			if ((l_s != "") && (l_cas[l_s].m_serialise))
			{
				//alert(l_s);

				if (l_serialised != "")
				{
					l_serialised += ",";
				}

				l_serialised += l_cas[l_s].getAbsoluteName();
			}
		}


		return l_serialised;
}


/*!
    @func       MetaWrap.State.deSerialise = function(p_serialised)
    @param    p_serialised comma dlimited description of the states.
    @return     void
    @brief       Deserialise and set states. This is used by the view history buffer
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.deSerialise = function(p_serialised)
{
	//alert(p_serialised);
	var l_list = p_serialised.split(",");

	var l_list2 = [];

	for(var i = 0;i<l_list.length;i++)
	{
		l_list2[l_list[i]] = true;
		
		//debug("l_list2[" + l_list[i] + "] = true;");
	}
	
	//log("l_list2.length  = " + l_list2);
	
	//debug("forceFalseIfNotInList");
	
	// Force these states to false if thete are not in list
	MetaWrap.State.m_state.forceFalseIfNotInList(l_list2);

	//debug("determineState");
	MetaWrap.State.determineState();
	
	//debug("done");
}



/*!
    @func       MetaWrap.State.suspendStateDetermination = function()
    @return     void
    @brief      Suspend state determination
    @author     James Mc Parlane
    @date       2 November 2008
*/
MetaWrap.State.suspendStateDetermination = function()
{	
	MetaWrap.State.m_state_suspended = true;
	MetaWrap.State.m_state_needs_determination = false;
}
	

/*!
    @func       MetaWrap.State.isStateDeterminationSuspended = function()
    @return     bool - true if state determination has been suspended.
    @brief      Suepend state determination
    @author     James Mc Parlane
    @date       2 November 2008
*/
MetaWrap.State.isStateDeterminationSuspended = function()
{	
	return MetaWrap.State.m_state_suspended;	
}	
	
	
/*!
    @func       MetaWrap.State.resumeStateDetermination = function()
    @return     void
    @brief      Resume state determination.
    @author     James Mc Parlane
    @date       2 November 2008
*/
MetaWrap.State.resumeStateDetermination = function()
{
	MetaWrap.State.m_state_suspended = false;
	
	if  (MetaWrap.State.m_state_needs_determination)
	{
		//warn("RESUME STATE DETERMINATION");
		MetaWrap.State.determineState();
		MetaWrap.State.m_state_needs_determination = false;
	}
	
}


/*!
    @func       MetaWrap.State.callTransitions = function(p_transitions)
    @return     void
    @brief      Call all the transitions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.determineAndCallTransitions = function(p_previous_active_states, p_latest_active_states)
{

	for(var l_from in p_previous_active_states)
	{
		var l_state_from = p_previous_active_states[l_from];

		// If a state in m_previous_active_states is not in the new_active_states, then we must have exited it
		// if we are transitioning 'from' - then this state should not be in the new states
		if (p_latest_active_states[l_from] == null)
		{
			// If we just became deactivated -  then we were not just activated
			l_state_from.m_just_deactivated = true;
			l_state_from.m_just_activated = false;
		
			//debug("deactivated = " + l_from);		

			// First look for transitions
			var l_new_active_states_count = 0;
			for(var l_to in p_latest_active_states)
			{
				l_new_active_states_count++;
				var l_state_to = p_latest_active_states[l_to];

				// call all the 'to' transitions
				MetaWrap.State.callTransitions(l_state_to.m_transitions.m_to[l_state_from.m_name]);
			}

			// call all the 'exit' transitions
			MetaWrap.State.callTransitions(l_state_from.m_transitions.m_exit[l_from]);
		}
		else
		{
			// we are now and just were in an activated state. Nothing going on here. 		
			l_state_from.m_just_deactivated = false;
			l_state_from.m_just_activated = false;
		}
	}

	// Check the set of latest active states
	for(var l_to in p_latest_active_states)
	{
		var l_state_to = p_latest_active_states[l_to];

		// If a state in new_active_states is not in the previous_active_states, then we must have entered it
		if (p_previous_active_states[l_to] == null)
		{
		
			//debug("activated = " + l_to);
			
			 //If we just became activated -  then we were not just deactivated
			l_state_to.m_just_activated = true;
			l_state_to.m_just_deactivated = false;

			// call all the 'enter' transitions
			MetaWrap.State.callTransitions(l_state_to.m_transitions.m_enter[l_to]);

			// Then look for transitions
			var l_total_active_states = 0;
			for(var l_from in p_previous_active_states)
			{
				//alert("from " + l_from);
				l_total_active_states++;
				var l_state_from = p_previous_active_states[l_from];
				
				// call all the 'from/to' transitions
				MetaWrap.State.callTransitions(l_state_from.m_transitions.m_from[l_state_to.m_name]);

			}

			if (l_total_active_states == 0)
			{
				// call all the 'to' transitions
				MetaWrap.State.callTransitions(l_state_to.m_transitions.m_to[""]);
			}
			
		}
		else
		{
			// we are now and just were in an activated state. Nothing going on here. 		
			l_state_to.m_just_activated = false;
			l_state_to.m_just_deactivated = false;
		}
	}
}




/*!
    @func       MetaWrap.State.callTransitions = function(p_transitions)
    @return     void
    @brief      Call all the transitions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.describeTransitions = function(p_previous_active_states, p_latest_active_states)
{
		if (p_latest_active_states == null)
		{
			fatal("p_latest_active_states == null");
			//debugger;
		}

		var l_names_previous = "";
		for(var l_previous in p_previous_active_states)
		{
			if (l_previous == "") l_previous = "*";
			l_names_previous += l_previous + " ";
		}

		//trace("CURRENT " + l_names_previous);

		var l_names_new = "";
		for(var l_new in p_latest_active_states)
		{
			if (l_new == "") l_new = "*";
			l_names_new += l_new + " ";
		}

		if (l_names_previous != l_names_new)
		{
			warn("STATES HAVE TRANSITIONED");
			warn("FROM: " + l_names_previous);
			warn("__TO: " + l_names_new);
			
			//l_states_changed = true;
			
			MetaWrap.State.m_states_changed = true;
		}
}

	
/*!
    @func       MetaWrap.State.callTransitions = function(p_transitions)
    @return     void
    @brief      Call all the transitions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.callTransitions = function(p_transitions)
{
	// if there are no transitions
	if (p_transitions == null)
	{
		// do nothing
		return;
	}
	
	for(var t in p_transitions)
	{
		// get the transition
		var l_transition = p_transitions[t];

		// if its not null, then call it simply
		if (l_transition != null)
		{
			var l_e;
			try
			{
				//alert("call 'enter' transition " + l_transition.m_function );
				l_transition.m_function();
			}
			catch(l_e)
			{
				error("error in transition");
			}
		}
	}
}
	

	
	

/*!
    @func       MetaWrap.State.determineState = function()
    @return     bool
    @brief      Run through the statemachine rules and determine which states are set
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.determineState = function()
{

	if (MetaWrap.State.m_state_suspended)
	{
		if (!MetaWrap.State.m_state_needs_determination)
		{
			//warn("STATE DETERMINATION IS SUSPENDED");
			MetaWrap.State.m_state_needs_determination = true;
		}
		return;
	}

	var l_states_changed = false;

	//trace("MetaWrap.State.determineState");

    // The null state is active, by default
    MetaWrap.State.m_state.m_activated = true;
	
	do // while pulsing other states
	{
		
		// Now propogate the list of dirty items, execute implications and denials and keep
		// evaluating till things settle down so that nothing changes..
		do // while statemachine is still calculating
		{
			//debug("churn");

		    // Make sure we meet activements and mark changes states as dirty
		    this.m_state.meetsRequirements();

			// keep a reference to the current dirty states
		    var l_new_dirty_states = MetaWrap.State.m_dirty_states;

		    // make dirty states a new empty array - we will be adding to it as we work through the dirty states
		    MetaWrap.State.m_dirty_states = [];

			// start by assuming that nothing is dirty
			var l_something_was_dirty = false;

			for(var l_dirty in l_new_dirty_states)
			{
				// well something was dirty...
				l_something_was_dirty = true;

				// get a reference to the dirty state
				var l_dirty_state = l_new_dirty_states[l_dirty];
				
				//debug("state " + l_dirty + " is dirty as "  + l_dirty_state.m_activated );

				// if its parent is not active...
				if ((l_dirty_state.m_parent != null) && (!l_dirty_state.m_parent.m_activated))
				{
					// then.. do nothing
					//debug("dirty state " + l_dirty_state.m_name + "'s parent " + l_dirty_state.m_parent.m_name + " is not activated");
				}
				else
				// if we are now active
				if (l_dirty_state.m_activated)
				{
					// Enforce its implications
					l_dirty_state.doAffirmations();

					// Enforce its denials
					l_dirty_state.doNegations();

					// Enforce its locks
					l_dirty_state.doLocks();

				}
				// if we are now inactive
				else
				{
					// Un-Enforce our implications
					l_dirty_state.undoAffirmations();

					// Un-Enforce our denials
					l_dirty_state.undoNegations();

					// Un-Enforce its unlocks
					l_dirty_state.undoLocks();
				}
			}
			
			// Now if we had something dirty - we could have negated or affirmed another state so we need to re-calculate again.
		}
		while(l_something_was_dirty);
		
		// Make sure we meet exclusions
		this.m_state.meetsExclusions();

		// Make sure we meet exclusions
		this.m_state.meetsInclusions();

		// Make sure we meet mutexes
		this.m_state.meetsMutexes();

		//debug("DIRTY!" + MetaWrap.State.m_dirty_states.length);

		if (MetaWrap.State.m_dirty_states.length > 0)
		{
			alert("DIRTY!");
			fatal("DIRTY!");
		}

	    // Work out which states are currently active

		// Start with no new active states
		var l_new_active_states = [];
		
	    MetaWrap.State.determineActiveStates(this.m_state,l_new_active_states);
		
		// describe the transitions and determine if anything changed
		MetaWrap.State.describeTransitions(MetaWrap.State.m_current_active_states,l_new_active_states);

		// Call the transitions	
		MetaWrap.State.determineAndCallTransitions(MetaWrap.State.m_current_active_states,l_new_active_states);

		// Now we are all finished, our active states are new states
		MetaWrap.State.m_current_active_states = l_new_active_states;

		// And outside of this function, the concept of new states is meaningless
		l_new_active_states = null;

		/////////////////////////////
		//
		// If we have a StateViewMap - then recalculate it
		//

		if (MetaWrap.StateViewMap != null)
		{
			// recalculate the state views
			if (MetaWrap.StateViewMap.reCalculate())
			{
				// if we need to call somewhere when state changes
				if (MetaWrap.State.onstatechange != null)
				{
					// call it
					MetaWrap.State.onstatechange();
				}
			}
		}
		
		//
		//
		/////////////////////////////
		
		// Clear the activation history and pulse - retutn true if the pulses resulted in a change of activation.
		var l_pulsed = MetaWrap.State.m_state.pulseJustActivatedStates();
		
	}
	while(l_pulsed);

	//
	//
	//////////////////////////
	
	return l_states_changed;
}

/*!
    @func       MetaWrap.State.State.prototype.affirmState = function(p_state)
    @return     bool
    @brief      Try setting state to active. If it works then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.affirmState = function(p_state)
{
	//debug("affirmState2 '"  + p_state + "'");

	// 	Find the specified state
	var l_state = this.findState(p_state,true);

	if (l_state != null)
	{

		// If we want to re-initailse the children to their default state when this is activated..
		if (l_state.m_reinitialise_children)
		{
			// .. we force substates to take on their default configuration
			l_state.forceDefaults(true);
		}
	
		// Set the state to active
		l_state.setActive(true);

		// determine the current state
		MetaWrap.State.determineState();

		return l_state.m_activated;
	}

	error("affirmState: failed to find state '" + p_state + "'");

	return false;
}

/*!
    @func       MetaWrap.State.State.prototype.negateState = function(p_state)
    @return     bool
    @brief      Try setting state to in inactive. If it works then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.negateState = function(p_state)
{
	// 	Find the specified state
	var l_state = this.findState(p_state,true);

	if (l_state != null)
	{
		// Set the state to inactive
		l_state.setActive(false);

		// determine the current state
		MetaWrap.State.determineState();

		// Return true if it is inactive
		return !l_state.m_activated;
	}

	error("negateState2: failed to find state '" + p_state + "'");

	return false;
}

/*!
    @func       MetaWrap.State.State.prototype.parentsActivated = function()
    @return     bool
    @brief       return true if all of this state's parents are activated.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.parentsActivated = function()
{
	var l_state = this.m_parent;
	
	while(l_state != MetaWrap.State.m_state)
	{
		if (l_state.m_activated == false)
		{
			return false;
		}
		
		l_state = l_state.m_parent;
	}
	
	return true;
}

/*!
    @func       MetaWrap.State.testState = function(p_state)
    @return     bool
    @brief      Try setting state to active. If it works then return true
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.testState = function(p_state)
{
	//trace("testState in '" + this.m_name + "' for '" + p_state + "'");

	// split up the states
	var l_states = p_state.split('|');

	// if we found something to test
	if (l_states.length > 0)
	{
		for(var i = 0;i<l_states.length;i++)
		{
			//debug("l_state_name = " + l_states[i]);

			// 	Find the specified state
			var l_state = this.findState(l_states[i]);

			if (l_state != null)
			{
			
				//trace("testState in '" + this.m_name + "' for '" + p_state + "' = " + l_state.m_activated);
				
				if (!l_state.parentsActivated())
				{
					return false;
				}
			
				if (l_state.m_activated)
				{
					return true;
				}
			}
			else
			{
				error("testState: failed to find state '" + l_states[i] + "' in " + this.m_name );
				//debugger;
			}
		}

		// we failed to match with anything
		return false;
	}

	error("testState: failed to parse state name '" + p_state + "'");

	return false;
}



/*!
    @func       MetaWrap.State.State.prototype.setActive = function(p_active)
    @return     bool
    @brief      Return true if we marked as dirty and changed active value
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.setActive = function(p_active)
{
	// if its changing
	if (this.m_activated != p_active)
	{
		// if we are locked then don't do anything
		if (this.m_locked)
		{
			warn(this.m_name + " can't change to " + p_active + " (locked) from " + this.m_activated);
			return false;
		}

		// if it has a parent
		if (this.m_parent != null)
		{
			if (!this.m_parent.m_activated)
			{
				error("fail because (parent not active) on call to setActive(" + p_active + ") for state '" + this.m_name + "'");
				return false;
			}
		}

		//trace("set " + this.m_name + " to " + p_active + " from " + this.m_activated);

/*
		if (p_active == "0")
		{
			debugger;
		}
*/

		// set value of active
		this.m_activated = p_active;

		// add to list of dirty states
		this.markDirty();

		// if we are now false
		if (!this.m_activated)
		{
			// force all the substates to be false
			this.forceFalse();
		}
		else
		{
			// as we jave just activated we should force substates to take on their default configuration
			this.forceDefaults(true);
		
			// we changed and we are activated - do all our activations!
			this.doActivations();
			
			// we changed and we are activated - do all ourde activations!
			this.doDeactivations();

			// we are activating - enforce mutual exclusion
			if ((this.m_parent != null) && (this.m_parent.m_substates_mutex))
			{
				//trace("enforcing mutexes");
			
				// Ensure that the sub states are mutually exclusive
				for(var l_s in this.m_parent.m_states)
				{
					if (l_s != this.m_name)
					{
						// Make sure that its not active
						this.m_parent.m_states[l_s].setActive(false);
					}
				}
			}
		}

		// we changed
		return true;
	}

	// no change
	return false;
}



/*!
    @func       MetaWrap.State.State.prototype.markDirty = function()
    @return     bool
    @brief      Mark a state as dirty. The dirty flag is used to determine if the state has changed.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.markDirty = function()
{
	// already dirty?
	if (MetaWrap.State.m_dirty_states[this.m_name] == this)
	{
		error(this.m_name + " is already dirty" );
	}

	// add to list of dirty states
	MetaWrap.State.m_dirty_states[this.m_name] = this;
}

/*!
    @func       MetaWrap.State.State.prototype.doAffirmations = function()
    @return     bool
    @brief      Set all implied states to be active
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doAffirmations = function()
{
    // For each exclusion
    for(var l_r = 0;l_r < this.m_affirmations.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_affirmations[l_r]);
		var l_s = this.findState(this.m_affirmations[l_r]);
		if (l_s == null)
		{
			error("'doAffirmations' could not find state " + this.m_affirmations[l_r]);
		}
		else
		{
		    if  (l_s.m_active.length != 0)
		    {
		    	error("Can't affirm if state '" + l_s.m_name + "' has activements");
		    }
		    else
		    if  (l_s.m_inactive.length != 0)
		    {
		    	error("Can't affirm if state '" + l_s.m_name + "' has inactivements");
		    }
		    else
		    {
		    	//debug("implying " + l_s.m_name);
				// Make it active
				l_s.setActive(true);
			}
		}
    }
}

/*!
    @func       MetaWrap.State.State.prototype.doNegations = function()
    @return     void
    @brief      Negates all the specified states.
    @warning   Its very easy to define negations that are impossible. Beware.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doNegations = function()
{
    // For each exclusion
    for(var l_r = 0;l_r < this.m_negations.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_negations[l_r]);
		var l_s = this.findState(this.m_negations[l_r]);
		if (l_s == null)
		{
			error("'negate' could not find state " + this.m_negations[l_r]);
		}
		else
		{
			//warn("negate " + l_s.m_name);
			// make it inactive
			l_s.setActive(false);
		}
    }
}

/*!
    @func       MetaWrap.State.State.prototype.doLocks = function()
    @return     bool
    @brief      Set all locked states
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doLocks = function()
{
    // For each lock
    for(var l_r = 0;l_r < this.m_locks.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_locks[l_r]);
		var l_s = this.findState(this.m_locks[l_r]);
		if (l_s == null)
		{
			error("'lock' could not find state " + this.m_locks[l_r]);
		}
		else
		{
			if (l_s.m_locked)
			{
				warn("'" + this.m_locks[l_r] + "' (" + l_s.m_name + ") was already locked");
			}
			else
			{
				debug("'"  + this.m_locks[l_r] + "' (" + l_s.m_name + ") is now locked");
			}

			// make it inactive
			l_s.m_locked = true;
		}
    }
}

/*!
    @func       MetaWrap.State.State.prototype.doLocks = function()
    @return     void
    @brief      Pulse the specified states as activated. We allow the state machine to set this back if it needs to. This is akin to a simple flipState
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doPulses = function()
{
	// if this is true, then we pulsed which resulted in a change of activation
	var l_pulsed = false;

    // For each pulse
    for(var l_r = 0;l_r < this.m_pulses.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_pulses[l_r]);
		var l_s = this.findState(this.m_pulses[l_r]);
		if (l_s == null)
		{
			error("'pulse' could not find state " + this.m_pulses[l_r]);
		}
		else
		{
			// make it active			
			l_pulsed = (l_s.setActive(true) || l_pulsed);
		}
    }
	
	// return true if we made a change to the activation of any state
	return l_pulsed;
}

/*!
    @func       MetaWrap.State.State.prototype.doLocks = function()
    @return     void
    @brief      Pulse the specified states as activated. We allow the state machine to set this back if it needs to. This is akin to a simple flipState
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doPulsesGroup = function()
{
	// if this is true, then we pulsed which resulted in a change of activation
	var l_pulsed = false;

    // For each pulse
    for(var l_r = 0;l_r < this.m_pulses_group.length;l_r++)
    {
		var l_states = MetaWrap.State.m_groups[this.m_pulses_group[l_r]];
		
		if (l_states == null)
		{
			error("'pulse' could not find group " + this.m_pulses_group[l_r]);
			return;
		}
		
		for(var l_s = 0;l_s < l_states.length;l_s++)
		{
			var l_state = l_states[l_s];
			if (l_state == null)
			{
				error("'pulse' by group contained invalid state ");
			}
			else
			{
				// make it active								
				l_pulsed = (l_state.setActive(true) || l_pulsed);				
			}
		}
    }
	
	// return true if we made a change to the activation of any state
	return l_pulsed;
}



/*!
    @func       MetaWrap.State.State.prototype.doUnPulses = function()
    @return     void
    @brief      Pulse the specified states as false
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doUnPulses = function()
{
	// if this is true, then we pulsed which resulted in a change of activation
	var l_pulsed = false;

    // For each unpulse
    for(var l_r = 0;l_r < this.m_unpulses.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_unpulses[l_r]);
		var l_s = this.findState(this.m_unpulses[l_r]);
		
		//alert("Unpulse " + l_s.m_name);
		//debug("'unpulse' state '" + this.m_unpulses[l_r] + "'");
		
		
		if (l_s == null)
		{
			error("'unpulse' could not find state " + this.m_unpulses[l_r]);
		}
		else
		{		
			
			// make it inactive
			l_pulsed = (l_s.setActive(false) || l_pulsed);				
		}
    }
	
	// return true if we made a change to the activation of any state
	return l_pulsed;
}

/*!
    @func       MetaWrap.State.State.prototype.doUnPulsesGroup = function()
    @return     void
    @brief      Pulse the specified states in the group deactivated. We allow the state machine to set this back if it needs to. This is akin to a simple flipState
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.doUnPulsesGroup = function()
{	
	// if this is true, then we pulsed which resulted in a change of activation
	var l_pulsed = false;

    // For each pulse
    for(var l_r = 0;l_r < this.m_unpulses_group.length;l_r++)
    {
		//debug("'unpulse' group '" + this.m_unpulses_group[l_r] + "'");
	
		var l_states = MetaWrap.State.m_groups[this.m_unpulses_group[l_r]];
		
		if (l_states == null)
		{
			error("'pulse' could not find group " + this.m_unpulses_group[l_r]);
			return;
		}
		
		for(var l_s = 0;l_s < l_states.length;l_s++)
		{
			var l_state = l_states[l_s];
			if (l_state == null)
			{
				error("'unpulse' by group contained invalid state ");
			}
			else
			{		
				// make it inactive
				l_pulsed = (l_state.setActive(false) || l_pulsed);
			}
		}
    }
	
	// return true if we made a change to the activation of any state
	return l_pulsed;
}




/*!
    @func       MetaWrap.State.State.prototype.undoAffirmations = function()
    @return     bool
    @brief      Undo the affirmations.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.undoAffirmations = function()
{
    // For each exclusion
    for(var l_r = 0;l_r < this.m_affirmations.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_affirmations[l_r]);
		var l_s = this.findState(this.m_affirmations[l_r]);
		if (l_s == null)
		{
			error("'un-affirm' could not find state " + this.m_affirmations[l_r]);
		}
		else
		{
			// make it inactive
			l_s.setActive(false);
		}
    }
}

/*!
    @func       MetaWrap.State.State.prototype.undoNegations = function()
    @return     bool
    @brief      Undo the negations. 
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.undoNegations = function()
{
    // For each exclusion
    for(var l_r = 0;l_r < this.m_negations.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_negations[l_r]);
		var l_s = this.findState(this.m_negations[l_r]);
		if (l_s == null)
		{
			error("'un-negate' could not find state " + this.m_negations[l_r]);
		}
		else
		{
			// make it active
			l_s.setActive(true);
		}
    }
}


/*!
    @func       MetaWrap.State.State.prototype.undoLocks = function()
    @return     bool
    @brief      Undo the locks defined by this state.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.undoLocks = function()
{
    // For each exclusion
    for(var l_r = 0;l_r < this.m_locks.length;l_r++)
    {
		//var l_s = this.m_parent.findState(this.m_locks[l_r]);
		var l_s = this.findState(this.m_locks[l_r]);
		if (l_s == null)
		{
			error("'un-lock' could not find state " + this.m_locks[l_r]);
		}
		else
		{
			// make it inactive
			l_s.m_locked = false;
		}
    }
}


/*!
    @func       MetaWrap.State.State.prototype.doActivations = function()
    @return     void
    @brief      Perfiorm all activations
    @author     James Mc Parlane
    @date       2 August 2008
*/
MetaWrap.State.State.prototype.doActivations = function()
{
    //alert("meetsExclusions " + this.m_name);
	//warn("doActivations " + this.m_name);

    // If this state is not active, then we can't activate anything
    if (!this.m_activated)
    {
        //alert("flee");
        return;
    }

    // Ensure that the sub states meet exclusions
    for(var l_a in this.m_activations)
	{
		//warn("doActivation " + l_a);
		this.affirmState(l_a);
	}

	/*
    // Ensure that the sub states meet exclusions
    for(var l_s in this.m_states)
    {
        this.m_states[l_s].doActivations();
    }
	*/
}


/*!
    @func       MetaWrap.State.State.prototype.doDeactivations = function()
    @return     void
    @brief      Perfiorm all deactivations
    @author     James Mc Parlane
    @date       2 August 2008
*/
MetaWrap.State.State.prototype.doDeactivations = function()
{
    //debug("doDeactivations " + this.m_name);

    // If this state is not active, then we can't deactivate anything
    if (!this.m_activated)
    {
        //alert("flee");
        return;
    }

    // Ensure that the sub states meet exclusions
    for(var l_a in this.m_deactivations)
	{
		//warn("doDeactivation " + l_a);
		this.negateState(l_a);
	}

	/*
    // Ensure that the sub states meet exclusions
    for(var l_s in this.m_states)
    {
        this.m_states[l_s].doDeactivations();
    }
	*/
}




/*!
    @func       MetaWrap.State.State.prototype.meetsInclusions = function()
    @return     bool
    @brief      Return true if this state meets all its inclusions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.meetsInclusions = function()
{
    //alert("meetsExclusions " + this.m_name);

    // If this state is not active, then we can't include anything
    if (!this.m_activated)
    {
        //alert("flee");
        return;
    }

    // For each exclusion
    for(var l_r = 0;l_r < this.m_inclusions.length;l_r++)
    {
        // Make sure they are all true
        if (!MetaWrap.doCall(this.m_inclusions[l_r],this,null))
        {
            fail(this.m_name + " fails inclusion");
        }
/*		
        else
        {
           trace(this.m_name + " passes inclusion");
        }
*/		
    }

    // Ensure that the sub states meet exclusions
    for(var l_s in this.m_states)
    {
        this.m_states[l_s].meetsInclusions();
    }
}

/*!
    @func       MetaWrap.State.State.prototype.meetsExclusions = function()
    @return     bool
    @brief      Return true if this state meets all its exclusions
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.meetsExclusions = function()
{
    //alert("meetsExclusions " + this.m_name);

    // If this state is not active, then we can't exclude anything
    if (!this.m_activated)
    {
        //alert("flee");
        return;
    }

    // For each exclusion
    for(var l_r = 0;l_r < this.m_exclusions.length;l_r++)
    {
        // Make sure they are all true
        if (!MetaWrap.doCall(this.m_exclusions[l_r],this,null))
        {
            fail(this.m_name + " fails exclusion." + this.m_exclusions[l_r]);
        }
/*		
        else
        {
        	trace(this.m_name + " passes exclusion");
        }
*/		
    }

    // Ensure that the sub states meet exclusions
    for(var l_s in this.m_states)
    {
        this.m_states[l_s].meetsExclusions();
    }
}

/*!
    @func       MetaWrap.State.State.prototype.meetsMutexes = function()
    @return     bool
    @brief      Return true if this state meets all its activements for being selected
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.meetsMutexes = function()
{
    //alert("meetsExclusions " + this.m_name);

    // For each exclusions
    for(var l_m = 0;l_m < this.m_mutexes.length;l_m++)
    {
        // Make sure they are all true
        if (!MetaWrap.doCall(this.m_mutexes[l_m],this,null))
        {
            error("mutex failed.");
        }
/*		
        else
        {
            trace("mutex passed.");
        }
*/		
    }

    for(var l_s in this.m_states)
    {
        this.m_states[l_s].meetsMutexes();
    }
}

/*!
    @func       MetaWrap.State.State.prototype.meetsRequirements = function()
    @return     bool
    @brief      Return true if this state meets all its activements for being selected
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.meetsRequirements = function()
{
    //alert("meetsExclusions " + this.m_name);
    // Evaluate current states

	//trace("meetsRequirements");

	var l_meets_actives = this.evaluateRequirements();
	var l_meets_inactives = this.evaluateUnRequirements();

	//trace(this.m_name + "l_meets_actives = " + l_meets_actives);
	//trace(this.m_name + "l_meets_inactives = " + l_meets_inactives);

	// if there are no activements at all
	if (((this.m_active.length + this.m_inactive.length) == 0))
	{
		// do nothing - we are not controlled by the  activation of deactivation of other states
	}
	else
	{	
		// If the state meets all activements and unrequiermens then make it active
		// We do the ((l_meets_actives && l_meets_inactives) == true))  to avoid the evil of javascript bug in bitwise and which results in state being 1 or 0 - which is really annoying.		
		this.setActive(((l_meets_actives && l_meets_inactives) == true));
	}

	// If we are active  - test to see if our children  meet their activements...
	if (this.m_activated)
	{
	    for(l_s in this.m_states)
	    {
			var l_state = this.m_states[l_s];

			if (l_state != null)
			{
		        l_state.meetsRequirements();
			}
			else
			{
				error("substate " + l_s + " is invalid");
			}
	    }
	}
}


/*!
    @func       MetaWrap.State.State.prototype.evaluateRequirements = function()
    @return     bool
    @brief      Return true if this state meets all its activements for being selected
    @author     James Mc Parlane
    @date       19 October 2002

    If there are no activements then we keep our current state.
*/
MetaWrap.State.State.prototype.evaluateRequirements = function()
{
    // start assuming true because all activements at this level need to be true
    var l_return = true;

	// If we have no activements -  - then  we have met out activements
    if (this.m_active.length == 0)
    {
    	//l_return = this.m_activated;
		return true;
	}
	else
    // For each activement
    for(var l_r = 0;l_r < this.m_active.length;l_r++)
    {
        // Make sure they are all true
        l_return &= MetaWrap.doCall(this.m_active[l_r],this,null);

		// todo: can we return false here as soon as l_return is false?
    }

    return l_return;
}

/*!
    @func       MetaWrap.State.State.prototype.evaluateUnRequirements = function()
    @return     bool
    @brief      Return true if this state meets all its activements for being selected
    @author     James Mc Parlane
    @date       19 October 2002

    If there are no activements then we keep our current state.
*/
MetaWrap.State.State.prototype.evaluateUnRequirements = function()
{
	

    // start assuming true because all activements at this level need to be true
    var l_return = true;

	//trace("evaluateUnRequirements");

	// If we have no activements - then  we have met out inactivements
    if (this.m_inactive.length == 0)
    {
    	//l_return = this.m_activated;
		return true;
	}
	else
	{
		//trace("evaluateUnRequirements " + this.m_name);
	    // For each activement
	    for(var l_r = 0;l_r < this.m_inactive.length;l_r++)
	    {
			//trace("unrequre " + this.m_inactive[l_r] + "  -> " + (!MetaWrap.doCall(this.m_inactive[l_r],this,null)));

	        // Make sure they are all false
	        l_return &= (!MetaWrap.doCall(this.m_inactive[l_r],this,null));

			// todo: can we return false here as soon as l_return is false?
	    }
	}
	
	//trace("evaluateUnRequirements " + this.m_name + " returns " + l_return);

    return l_return;
}

/*!
    @func       MetaWrap.State.State.prototype.forceFalse = function()
    @return     bool
    @brief      Force this and all its children to be false
    @author     James Mc Parlane
    @date       19 October 2002

    If there are no activements then we keep our current state.
*/
MetaWrap.State.State.prototype.forceFalse = function()
{
	// If we have no activements or inactivements - then we just return our current state
    if ((this.m_active.length == 0) && (this.m_inactive.length == 0))
    {
   		//alert("force false " + this.m_name);
   		//this.setActive(false);

   		var l_mark_dirty = false;

		// if its currently true - then we are going to make it false
   		if (this.m_activated)
   		{
   			l_mark_dirty = true;
   		}

		// make it false
   		this.m_activated = false;

   		if (l_mark_dirty)
   		{
   			this.markDirty();
   		}
	}

    for(l_s in this.m_states)
    {
    	this.m_states[l_s].forceFalse();
    }
}


/*!
    @func       MetaWrap.State.State.prototype.forceDefaults = function(p_skip)
    @return     bool
    @brief      Force this and all its children tohave their default value.
    @author     James Mc Parlane
    @date       19 October 2002

    If there are no activements then we keep our current state.
*/
MetaWrap.State.State.prototype.forceDefaults = function(p_skip)
{
	if (!p_skip)
	{
		this.m_activated = this.m_activated_default;
	}

	if (this.m_activated)
	{
		for(l_s in this.m_states)
		{
			this.m_states[l_s].forceDefaults(false);
		}
	}
}


/*!
    @func          MetaWrap.State.State.prototype.clearActivationHistory = function()
    @return     void
    @brief        Clear the m_just_activated and m_just_deactivated flags
    @author     James Mc Parlane
    @date          19 January 2009
   
*/
MetaWrap.State.State.prototype.pulseJustActivatedStates = function()
{
    var l_pulsed = false;

	// We only pulse if we are activated
	if (this.m_activated)
	{
		
		if (this.m_just_activated)
		{
			// Do the pulsing...
			
			//debug("pulseJustActivatedStates " + this.m_name);
			
			// Enforce its pulses
			l_pulsed = (this.doPulses() || l_pulsed);
			
			// Enforce its unpulses
			l_pulsed = (this.doUnPulses() || l_pulsed);				

			// Enforce its pulses on groups
			l_pulsed = (this.doPulsesGroup() || l_pulsed);
			
			// Enforce its unpulses on groups
			l_pulsed = (this.doUnPulsesGroup() || l_pulsed);
							
		}

		//this.m_just_activated = false;
		//this.m_just_deactivated = false;

		for(l_s in this.m_states)
		{
			l_pulsed = (this.m_states[l_s].pulseJustActivatedStates() || l_pulsed)
		}
	}
	
	return l_pulsed;
}






/*!
    @func       MetaWrap.State.State.prototype.findState = function(p_path)
    @param      p_path The state path
    @return     Reference to a state
    @brief      Find a state and return it
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.findState = function(p_path,p_noscope)
{
	// If we mean ourself, them return ourself
	if (p_path == ".")
	{
		return this;
	}

    // split up the state handle
    var l_names = p_path.split('/');

	// staert from here
	var l_state = this;

	// if this is true then p_path starts with /.
	var l_root_path = false;

    var i = 0;

    // was / the first character in the path
    if (l_names[0] == "")
    {

		//do we have this cached>
		l_state = MetaWrap.State.State.m_flat_cache[p_path];

		// yes?
		if (l_state != null)
		{
			// return?
			return l_state;
		}

        //alert("to root");
        // we have parsed that one
        i = 1;

		// this is a root path
		l_root_path = true;

        // start from the root
        l_state = MetaWrap.State.m_state;
    }
	else
	if (l_names.length == 1)
	{
		if (p_noscope == true)
		{
			return this.flatFindState(l_names[i]);
		}
		else
		{
			return this.parentFindState(l_names[i]);
		}
	}
	else
	// relative path from root
	if (this == MetaWrap.State.m_state)
	{
			//do we have this cached>
		var l_cached_state = MetaWrap.State.State.m_flat_cache[p_path];

		// yes?
		if (l_cached_state != null)
		{
			// return?
			return l_cached_state;
		}

		// this is a root path
		l_root_path = true;


	}

    // for each part of the state path
    for(;i<l_names.length;i++)
    {
		//trace("find '" +  l_names[i] + "' in '" + l_state.m_name +"'");

        // if we need to go up to the parent
		if (l_names[i] == l_state.m_name)
		{
			break;
		}
		else
        if (l_names[i] == "..")
        {			
		
            // go up to the parent
            l_state = l_state.m_parent;
        }
        else
        if (l_names[i] == ".")
        {
            // choose current
        }
        else
        {
            // find a named state
            l_state = l_state.localFindState(l_names[i]);
        }

        if (l_state == null)
        {
			error("failed to find state '" + l_names[i] + "' in '" + this.m_name + "'");
            //alert("break");
            break;
        }
    }

	// if this wa  root path that was not in the cacghe
	if (l_root_path)
	{
		// add it to the cache
		MetaWrap.State.State.m_flat_cache[p_path] = l_state;
	}

    return l_state;
}

/*!
    @func       MetaWrap.State.State.prototype.localFindState = function(p_name)
    @return     Reference to a state
    @brief      Find a state in the current state
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.localFindState = function(p_name)
{
	//trace("localFindState in " + this.m_name + " for " + p_name);

	var l_state = this.m_states[p_name];

	return l_state;
}

/*!
    @func       MetaWrap.State.State.prototype.parentFindState = function(p_name)
    @return     Reference to a state
    @brief      Find a state in the current state
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.parentFindState = function(p_name)
{
	//trace("parentFindState " + this.m_name);

	if (this.m_name == p_name)
	{
		return this;
	}

	var l_state = this.localFindState(p_name);

	if (l_state != null)
	{
		return l_state;
	}

	// now try our parent
	if (this.m_parent != null)
	{
		this.m_parent.parentFindState(p_name);
	}
    return null;
}


/*!
    @func       MetaWrap.State.State.prototype.flatFindState = function(p_name)
    @return     Reference to a state
    @brief      Find a state in the current state
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.flatFindState = function(p_name)
{
	//trace("flatFindState " + p_name);

	var l_state = MetaWrap.State.m_state.flatFindStateInternal(p_name);

	if (l_state != null)
	{
		MetaWrap.State.State.m_flat_cache[p_name] = l_state;
	}

    return l_state;
}


/*!
    @func       MetaWrap.State.State.prototype.flatFindStateInternal = function(p_name)
    @return     Reference to a state
    @brief      Find a state in the current state
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.flatFindStateInternal = function(p_name)
{
	//trace("flatFindState " + this.m_name);

	if (this.m_name == p_name)
	{
		return this;
	}

	// For each activement
	for(var l_r in this.m_states)
	{
		var l_state = this.m_states[l_r].flatFindStateInternal(p_name);
		if (l_state != null)
		{
			return l_state;
		}
	}

    return null;
}


/*!
    @func       MetaWrap.State.State.prototype.getAbsoulteName = function()
    @return     return the absolute name of the state
    @brief      Find a state in the current state
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.State.prototype.getAbsoluteName = function()
{

	// If we have a cached version
	if (this.m_absolute_name != null)
	{
		// then use it
		return this.m_absolute_name;
	}

	var l_state = this;
	var l_name = "";

	// Otherwise we calculate it
	while(l_state.m_parent != null)
	{
			if (l_name != "")
			{
				l_name = l_state.m_name + "/" +  l_name;
			}
			else
			{
				l_name = l_state.m_name;
			}

			l_state = l_state.m_parent;
	}

	// and then cache it
	this.m_absolute_name = l_name;

	return l_name;
}

/*!
    @func       MetaWrap.State.State.prototype.forceFalseIfNotInList = function(p_list)
    @return     bool
    @brief      Force this and all its children to be false if they are not in  p_list
    @author     James Mc Parlane
    @date       27 October 2008
*/
MetaWrap.State.State.prototype.forceFalseIfNotInList = function(p_list)
{
	// get the absolute name
	var l_abs = this.getAbsoluteName();

	// If we are not the root state
	if (l_abs != "")
	{

		// is it in the list
		var l_in_list = (p_list[l_abs] != null);

		// if it is in the list
		if (l_in_list)
		{
			//debug(l_abs + " is in the list ");
		
			// and its not true
			if (!this.m_activated)
			{
				//alert("set " + this.m_name);

				// make it true
				this.m_activated = true;
				this.markDirty();
			}
		}
		else
		{
			//debug(l_abs + " is NOT in the list ");
		
			// if its not in the list and its currently active
			if (this.m_activated)
			{
				//alert("unset " + this.m_name);
				// make it false
				this.m_activated = false;
				this.markDirty();
			}
		}
	}


    for(l_s in this.m_states)
    {
    	this.m_states[l_s].forceFalseIfNotInList(p_list);
    }
}


/*!
    @brief      The rendering pipeline for the state engine
*/
MetaWrap.State.m_pipeline = new MetaWrap.Pipeline('state')

/*! @name  MetaWrap.State Namespace */
//@{

/*!
    @func       MetaWrap.State.prepare = function()
    @brief      Prepare the pipeline
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.prepare = function()
{
    //trace("MetaWrap.State.prepare");

    var l_p = MetaWrap.State;

   ////////////////////////////////////////
    //
    // Get the name of the XML document we want to process
    //

    // By some process - yet to be defined - we set the xml location
    // Can we have multiple lots of XML?
    // Can we base the XML the name of the file?

    //
    // Lets work out the name of this file and its extension
    //

    var l_path_char = '\\';

    //
    // Because of this rule - we know that we can never have / or \ in a filename or its parameters - it must be escaped or encoded
    //
    if (location.pathname.indexOf(l_path_char) == -1)
    {
        // Use the other path character
        l_path_char = '/';
    }

    // Get the filename with file extension (later on we strip out the extension)
    l_p.m_file_name = location.pathname.substring(location.pathname.lastIndexOf(l_path_char)+1);

    // Get the file extension
    l_p.m_file_extension = location.pathname.substring(location.pathname.lastIndexOf('.')+1);

    // Get the realfile name - sans extension
    l_p.m_file_name = l_p.m_file_name.substring(0,l_p.m_file_name.length - l_p.m_file_extension.length - 1);

	if (l_p.m_file_name == "")
	{
		l_p.m_file_name = "index";
	}

	if (location.protocol == "file:")
	{
	    // Calculate it based on the name of the document
	    l_p.m_xml_location = location.protocol + "//" + l_p.m_file_name + ".xml";

	    // Calculate it based on the name of the document
	    l_p.m_js_location = location.protocol + "//" + l_p.m_file_name + ".js";
		
	}
	else
	{
	    // Calculate it based on the name of the document
	    l_p.m_xml_location = l_p.m_file_name + "_state.xml";
		
	    // Calculate it based on the name of the document
	    l_p.m_js_location = l_p.m_file_name + "_state.js";
		
	}


    //l_p.m_xml_location = "test_13_state.xml";




    //trace(l_p.m_xml_location);
    //trace(l_p.m_xsl_location);
	//trace(l_p.m_js_location);

    //
    //
    ////////////////////////////////////////
}


/*!
    @func       MetaWrap.State.xml = function()
    @brief      xml loader
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.xml = function()
{
   //trace("MetaWrap.State.xml");

    ////////////////////////////////////////
    //
    //  Load XML, Load XSLT - combine it and write it out into the browser..
    //

    var l_p = MetaWrap.State;

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    // Create a XML DOM Object
    l_p.m_xml_document = new MetaWrap.XML.Document();

    // Request the XML
    if (!MetaWrap.XML.Document.Load(l_p.m_xml_document,l_xml_request,l_p.m_xml_location))
    {
        error("MetaWrap.State.xml failed to load '" + l_p.m_xml_location + "'" );
    }

    //
    //
    ////////////////////////////////////////
}

/*!
    @func       MetaWrap.State.xslt = function()
    @brief      xslt loader
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.xslt = function()
{

    //trace("MetaWrap.State.xslt");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.State;

    //trace("load " + l_p.m_xsl_location);

    // Create a new transform
    l_p.m_xslt = new MetaWrap.XML.XSLT.Transform(l_p.m_xsl_location);


    // Create a new processor for this stylesheet
    l_p.m_xslt_processor = new MetaWrap.XML.XSLT.Processor(l_p.m_xslt);


    //
    //
    ////////////////////////////////////////

}

/*!
    @func       MetaWrap.State.transform = function()
    @brief      Xslt transform stage
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.transform = function()
{
    //trace("MetaWrap.State.transform");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.State;
	
    // Process this xml using this processor
    l_p.m_xslt_processor.Process(l_p.m_xml_document);

    // Get the text result of the transform
    l_p.m_result = l_p.m_xslt_processor.getText();
		
    //
    //
    ////////////////////////////////////////

}

/*!
    @func       MetaWrap.State.transform = function()
    @brief      Xslt transform stage
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.load_js_file = function()
{
	warn("running MetaWrap.State.load_js_file");
	
	//MetaWrap.State.m_result = MwFetch(MetaWrap.State.m_js_location);
	
	var l_script = '<script language="JavaScript" type="text/javascript" src="' + MetaWrap.State.m_js_location + '"><\/script>';
	document.write(l_script);
	
}


/*!
    @func       MetaWrap.State.write = function()
    @brief      Write the output from the transformation
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.State.write = function()
{
    //trace("MetaWrap.State.write");

    // Evaluate the resulting JavaScript Code
    //alert("MetaWrap.State.write = " + MetaWrap.State.m_result);
	
	//alert(MetaWrap.State.m_result);
	
	if (MetaWrap.State.m_result != "")
	{
		eval(MetaWrap.State.m_result);
	}
}

// Create the pipeline nodes
var l_p = MetaWrap.State.m_pipeline;

// Get the config flag values
var l_metawrap_config_state_js_file_precompiled  = MetaWrap.eval("g_metawrap_config_state_js_file_precompiled",false);
var l_metawrap_config_state_js_file_precompiled_and_included  = MetaWrap.eval("g_metawrap_config_state_js_file_precompiled_and_included",false);

l_p.add('prepare',MetaWrap.State.prepare);

if (!l_metawrap_config_state_js_file_precompiled_and_included)
{
	//alert("!l_metawrap_config_state_js_file_precompiled_and_included")

	//alert("!l_metawrap_config_state_js_file_precompiled_and_included");

	// If we have specified that we want to load from js file
	if (l_metawrap_config_state_js_file_precompiled)
	{
		//alert("l_metawrap_config_state_js_file_precompiled")
	
		// then load from static js file
		l_p.add('transform',MetaWrap.State.load_js_file);
	}
	else
	{
		//alert("transform!");
		// load the xml
		l_p.add('xml',MetaWrap.State.xml);
		
		// load the xslt
		l_p.add('xslt',MetaWrap.State.xslt);
	
		// run the transform and failover to static js file
		l_p.add('transform',MetaWrap.State.transform,MetaWrap.State.load_js_file);
	}

	l_p.add('write',MetaWrap.State.write);

	//alert("run");
	
	MetaWrap.State.m_pipeline.run();
}


if (MetaWrap.StateViewMap == null)
{
	// Determine our starting state
	MetaWrap.State.determineState();
}


/*!
 *@} endgroup mw_javascript_lib_state MetaWrap - JavaScript - State
 */

/*!
 *@} end of MetaWrap.State
 */

