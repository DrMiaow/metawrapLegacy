/*

    @file mw_lib_stateviewmap.js

    $Id: mw_lib_stateviewmap.js,v 1.14 2004/01/06 22:16:01 james Exp $

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

/*! \page mw_lib_javascript_stateviewmap MetaWrap - JavaScript - StateViewMap
 *
 */

//s"$Id: mw_lib_stateviewmap.js,v 1.14 2004/01/06 22:16:01 james Exp $");

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Pipeline","mw_lib_pipeline.js");
MwUse("MetaWrap.Network","mw_lib_network.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.XSLT","mw_lib_xml_xslt.js");

/*! \defgroup mw_lib_javascript_stateviewmap  MetaWrap - JavaScript - StateViewMap
 *@{
 */

/*!
    @namespace  MetaWrap.StateViewMap
    @brief      Declare the MetaWrap.StateViewMap namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap = {};

/*! @brief  The current state */

// The file name we are loading that is the main name for this application
MetaWrap.StateViewMap.m_file_name = "unknown";

// The extension of the file we are loading
MetaWrap.StateViewMap.m_file_extension = "unknown";

// The location of the XML that represents the state machine
MetaWrap.StateViewMap.m_xml_location = "";

// The location of the State machine XSLT
MetaWrap.StateViewMap.m_xsl_location = "../stateviewmap/stateviewmap.xsl";

// The location of the pre-compiled javascript
MetaWrap.StateViewMap.m_js_location = "";

// The XML document which is the loaded version of the state machine
MetaWrap.StateViewMap.m_xml_document = null;

// The XSLT which is the loaded version of the XSLT
MetaWrap.StateViewMap.m_xslt = null;

// The XSLT processor object
MetaWrap.StateViewMap.m_xslt_processor = null;

// The results of the state machine xml thrown against the xslt
MetaWrap.StateViewMap.m_result = "";

// Hash of state view maps
MetaWrap.StateViewMap.m_state_view_maps = {};

// The current page  as defined by the statemap
MetaWrap.StateViewMap.m_previous_pages = {};

// the current asspects, as defined by the statemap
MetaWrap.StateViewMap.m_previous_aspects = {};

// The current page  as defined by the statemap
MetaWrap.StateViewMap.m_current_pages =  {};
// the current asspects, as defined by the statemap
MetaWrap.StateViewMap.m_current_aspects = {};

// The current page we are displaying...
MetaWrap.StateViewMap.m_page =  null;

// If this is true then a call has been made to MetaWrap.StateViewMap.validate()  to validate the integrity of the state view map.
MetaWrap.StateViewMap.g_validated = false;

/*!
    @func       MetaWrap.StateViewMap.StateViewMap = function(p_name,p_parent)
    @param      p_name
    @brief      Constructor for MetaWrap.StateViewMap.StateViewMap
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.StateViewMap = function(p_name)
{
    this.m_name = p_name;
    this.m_page = null;
    this.m_aspects = {};
}


/*!
    @func       MetaWrap.StateViewMap.reset = function()
    @param      p_name
    @brief      Constructor for MetaWrap.StateViewMap.StateViewMap
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.reset = function()
{
	//alert("reset");

	// Save what we  knew to be the current view
	MetaWrap.StateViewMap.m_previous_pages = MetaWrap.StateViewMap.m_current_pages;
	MetaWrap.StateViewMap.m_current_pages = {};

	// Save what we  knew to be the current asspects
	MetaWrap.StateViewMap.m_previous_aspects = MetaWrap.StateViewMap.m_current_aspects;
	MetaWrap.StateViewMap.m_current_aspects = {};
}

/*!
    @func       MetaWrap.StateViewMap.affirmViewsState = function(p_state)
    @param      p_state
    @brief      Affrirm any states called p_state that are responsible for the current active view pahe
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.affirmActiveViewState = function(p_state)
{	
	for(var l_page_name in MetaWrap.StateViewMap.m_current_pages)
	{
		for(var l_state_name in MetaWrap.StateViewMap.m_current_pages[l_page_name])
	
		debug("affirmActiveViewState view '" + l_page_name + "' is shown because of state '" + l_state_name + "'");

		var l_state = MetaWrap.State.findState(l_state_name);
		
		if (l_state == null)
		{
			error("Cannot find state '" + l_state_name + "'");
		}
		else
		{
			l_state.affirmState(p_state);
		}
	}
}



/*!
    @func      MetaWrap.StateViewMap.stateAsserted = function(p_state)
    @param      p_state
    @brief      Called when the state is asserted
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.stateAsserted = function(p_state)
{
	//debug("assertState " + p_state);

	var l_state = MetaWrap.StateViewMap.m_state_view_maps[p_state];

	// Is this state described in the statemap?
	if (l_state == null)
	{
		//warn("state '" + p_state + "' is not described in the stateviewmap.");
	}
	else
	{
		// If this statemap defins a required page?
		if (l_state.m_page != null)
		{
			// get the page name
			var l_page_name = l_state.m_page.m_name;

			//trace("state '" + p_state + "' requires page '" + l_page_name + "'");

			// If its empty
			if (MetaWrap.StateViewMap.m_current_pages[l_page_name] == null)
			{
				// Create it
				MetaWrap.StateViewMap.m_current_pages[l_page_name] = {};
			}

			// get a reference
			var l_page_states = MetaWrap.StateViewMap.m_current_pages[l_page_name];

			// if this page has already been requested by this state
			if (l_page_states[p_state] != null)
			{
				// the this should be classes as an error  - or could it just be a warning 
				error("page " + l_page_name + " has already been requested by state " + p_state);
			}

			// Add this hash lookup for state by name to the ths page lookup table
			l_page_states[p_state] = l_state;
		}

		//
		// Does this statemap define any aspects
		//

		if (l_state.m_aspects.length != 0)
		{
			for(var l_aspect_name in l_state.m_aspects)
			{
				//trace("state '" + p_state + "' requires aspect '" + l_aspect_name + "'");

				// if we have  not added this aspect yet
				if (MetaWrap.StateViewMap.m_current_aspects[l_aspect_name] == null)
				{
					// create a hash table for it
					MetaWrap.StateViewMap.m_current_aspects[l_aspect_name] = {};
				}

				// Get the list of states that require this aspect
				var l_aspect_states = MetaWrap.StateViewMap.m_current_aspects[l_aspect_name];

				// if this aspect has alredy been requested by this state
				if (l_aspect_states[p_state] != null)
				{
					// the this should be classes as an error  - or could it just be a warning 
					error("aspect '" + l_aspect_name + "' has already been requested by state " + p_state);
				}

				// Add this hash lookup for state by name to the ths aspect lookup table
				l_aspect_states[p_state] = l_state.m_aspects[l_aspect_name];

			}
		}

	}
}

/*!
    @func           MetaWrap.StateViewMap.calculateMapChildren = function(p_aspect,p_map,p_target_array)
    @return     Generate the children map for an aspect's map
    @brief        Update the display
    @author     James Mc Parlane
    @date         19 October 2002
*/
MetaWrap.StateViewMap.calculateMapChildren = function(p_aspect,p_map,p_target_array)
{
	// Then caluclate it
	p_map.children = [];

	// Get the child aspect map pairs for this map for this aspect
	var l_child_aspect_maps = p_aspect.m_all_child_aspect_maps[p_map.id];
	
	// Calculate the maps
	MetaWrap.StateViewMap.calculateMapMaps(p_map.children,l_child_aspect_maps,p_target_array);
}

/*!
    @func           MetaWrap.StateViewMap.calculateMapParents = function(p_aspect,p_map,p_target_array)
    @return     Generate the parents map for an aspect's map
    @brief        Update the display
    @author     James Mc Parlane
    @date         19 October 2002
*/
MetaWrap.StateViewMap.calculateMapParents = function(p_aspect,p_map,p_target_array)
{
	p_map.parents = [];

	// Get the parent aspect map pairs for this map for this aspect
	var l_parent_aspect_maps = p_aspect.m_all_parent_aspect_maps[p_map.id];
	
	// Calculate the maps
	MetaWrap.StateViewMap.calculateMapMaps(p_map.parents,l_parent_aspect_maps,p_target_array);
}



/*!
    @func           MetaWrap.StateViewMap.calculateMapMaps = function(p_aspect,p_map,p_map_array,p_aspect_maps,p_target_array)
    @return     Generate the map sub map for an aspect map pair array
    @brief        Update the display
    @author     James Mc Parlane
    @date         19 October 2002
*/
MetaWrap.StateViewMap.calculateMapMaps = function(p_map_array,p_aspect_maps,p_target_array)
{	
	// Get the parent aspect map pairs for this map for this aspect
	
	// if this map has any parentren
	if (p_aspect_maps != null)
	{				
		// look at all the aspect map pairs
		for(var a = 0;a<p_aspect_maps.length;a++)
		{
			// get an aspect map pair
			var l_aspect_map = p_aspect_maps[a];
			
			// get its map - if its not in the cache
			if (l_aspect_map.m_map == null)
			{
				// then look it up
				l_aspect_map.m_map = l_aspect_map.m_aspect.findMapById(l_aspect_map.m_map_id);
			}
			
			// remember it is one of our parents
			p_map_array.push(l_aspect_map.m_map);
			
			// If our target array is not null
			if (p_target_array != null)
			{
				trace("  add child " + l_aspect_map.m_map.id);
			
				// then add it to that as well.
				p_target_array.push(l_aspect_map.m_map);
			}
		}
	}	
}



/*!
    @func       MetaWrap.StateViewMap.updateDisplay = function()
    @return		return true if the display changed
    @brief      Update the display
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.updateDisplay = function()
{
	//debug("updateDisplay");
	
	// Make sure we are talking to real states
	MetaWrap.StateViewMap.validate();

	var l_display_changed = false;

	// Some shordhand references...
	var l_pp = MetaWrap.StateViewMap.m_previous_pages;
	var l_cp = MetaWrap.StateViewMap.m_current_pages;
	var l_pa = MetaWrap.StateViewMap.m_previous_aspects;
	var l_ca = MetaWrap.StateViewMap.m_current_aspects;
	
	// To do the teardown cleanly we need to get all all the maps of all the aspects, sort them and return them deepest first 
	// so that we know we are not deleting an aspect inside another aspect if which would happen if we deleted a parent aspect - it would wipe the children.
	var l_pa_maps = [];	

	// To do the render cleanly we need to get all the maps of all the new aspects and render them in order of depth. such that the lowest ones are rendered first.
	var l_ca_maps = [];	

	
	// defer any actions  as we  won't want any  updates to the state machine during this time
	//MetaWrap.XML.Action.deferCallbacks();
	
	MetaWrap.State.suspendStateDetermination();
	

	var l_report_changes = true;
	
	if (l_report_changes)
	{
		MetaWrap.StateViewMap.report();
	}

	//
	// Lets find out what is new with what page we need to open/close
	//
	
	// First - what to we need to get rid off
	for(var l_page in l_pp)
	{
		 if (l_cp[l_page] == null)
		 {
			if (l_report_changes)
			{
				trace("page " + l_page + " is no longer required and needs to be closed");
			}
			l_display_changed = true;					
		 }
	}
		

	// The total number of pages
	var l_total_pages = 0;
	
	
	// Second - what do we need to  add
	for(var l_page in l_cp)
	{
		l_total_pages++;
		if (l_pp[l_page] == null)
		{
			if (l_report_changes)
			{
				debug("page '" + l_page + "' is now required and needs to be opened");
			}
			
			// The page is about to be destroyed so now we tear down all the previous aspects
			for(var l_aspect in l_pa)
			{									
				// now get the aspect maps for this aspect and put them into l_pa_maps
				MetaWrap.StateViewMap.m_page.getAspectMaps(l_aspect,l_pa_maps);
			}
			
			// sort l_pa_maps in order of decending depth
			l_pa_maps.sort(MetaWrap.View.mapCompareDescendingDepth);						
			
			// wipe everything...
			MetaWrap.StateViewMap.m_previous_aspects = [];
			l_pa = MetaWrap.StateViewMap.m_previous_aspects;
			
			// teardown the maps in l_pa_maps, which because of the sort should be in order of decending depth...
			for(var i = 0;i<l_pa_maps.length;i++)
			{				
				MetaWrap.View.teardownMap(l_pa_maps[i]);
			}			
			
			//debug("load new page");
			
			// Now show the page
			MetaWrap.StateViewMap.m_page = new MetaWrap.View.Page(l_page);
			//debug("MetaWrap.StateViewMap.m_page.load();");
			MetaWrap.StateViewMap.m_page.load();
			//debug("MetaWrap.StateViewMap.m_page.render();");
			MetaWrap.StateViewMap.m_page.render();
			
			//debug("new page loaded");

			l_display_changed = true;	
		}
	}
	
	if (l_total_pages > 1)
	{
		var l_pages_list = "";
		for(var l_p in l_cp)
		{
			l_pages_list += " " + l_p;
		}
		error("There is more than one page defined as active... how do we handle this view state? (" + l_pages_list + ")");
	}


	

	//
	// Lets find out what is new with what aspect we need to open/close
	//

	l_pa_maps = [];
	
	// Used to stop duplicate map teardowns
	var l_map_hash = {};

	// First - what do we need to get rid off?
	for(var l_aspect in l_pa)
	{
		// if we have a previous aspect not in the current aspects
		 if (l_ca[l_aspect] == null)
		 {
			// then its been removed and does not need to be deleted

			/*
			if (l_report_changes)
			{
				debug("aspect '" + l_aspect + "' is no longer required and needs to be hidden");
			}
			*/
			
			// temporary container for maps
			var l_maps = [];
			
			

			// now get the aspect maps for this aspect and put them into l_pa_maps
			MetaWrap.StateViewMap.m_page.getRenderedAspectMaps(l_aspect,l_maps);

			// get the aspect object
			var l_aspect_object = MetaWrap.StateViewMap.m_page.m_aspects[l_aspect];
			
			// We are tearing this aspect down - so its no longer active
			l_aspect_object.m_active = false;
			
			
			// Now for the aspect - look at any child aspect/map pairs that we mught want to also tearDown - because they are contained in an  unrendered aspect
			
			// teardown the maps in l_pa_maps, which because of the sort should be in order of decending depth...
			for(var i = 0;i<l_maps.length;i++)
			{
				var l_map = l_maps[i];
								
				// If we have not calculated our aspect children cache
				if (l_map.children == null)
				{
					// Calculate it
					MetaWrap.StateViewMap.calculateMapChildren(l_aspect_object,l_map);						
				}
				
				//
				// Now we make sure that those children from other currently active aspects that are going to be unrendered when we undrender this parent aspect map will be marked as unrendered
				// TODO: deal with duplicates in l_pa_maps gracefully.
				//
				
				// Any child map that is now rendered will  be torn down
				for(var c = 0;c<l_map.children.length;c++)
				{
					// Get the map child
					var l_map_child = l_map.children[c];
					
					// not in hash table
					if (l_map_hash[l_map_child.id] == null)
					{
						// if its rendred
						if (l_map_child.rendered)
						{
							// then we want to unrender it
							l_pa_maps.push(l_map_child);													
						}
						
						// add it to hash table
						l_map_hash[l_map_child.id] = l_map_child;
					}
				}
				
				if (l_map_hash[l_map.id] == null)
				{
					l_pa_maps.push(l_map);	

					// Add this map to the hash table
					l_map_hash[l_map.id] = l_map;

				}				
			}

			
			// Add this to our aspect maps
			//MetaWrap.appendArray(l_pa_maps,l_maps);			
		 }
	}
	

	// sort l_pa_maps in order of decending depth
	l_pa_maps.sort(MetaWrap.View.mapCompareDescendingDepth);

	// teardown the maps in l_pa_maps, which because of the sort should be in order of decending depth...
	for(var i = 0;i<l_pa_maps.length;i++)
	{
		// get the map
		var l_map = l_pa_maps[i];
		
		// we only want to tear it down if it is rendered
		if (l_map.rendered)
		{
			if (l_report_changes)	
			{
				var l_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_map.id);
			
				debug("teardown map '" + l_map.id + "' (depth " + l_map.depth + ") of aspect '" + l_aspect.m_name + "'");
			}
	
			// tear it down
			MetaWrap.View.teardownMap(l_map);
			
			// if we managed to change it to rendered to not rendered
			if (!l_map.rendered)
			{
				// then we changed the display
				l_display_changed = true;	
			}
		}
		else
		{
			var l_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_map.id);
			
			error("map '" + l_map.id + "' (depth " + l_map.depth + ") of aspect '" + l_aspect.m_name + "' is already torn down");
		}
	}

	//
	// Second - what do we need to  add
	//
	for(var l_aspect in l_ca)
	{
		// if its not in the previous aspect list
		if (l_pa[l_aspect] == null)
		{
			/*
			if (l_report_changes)
			{
				debug("aspect '" + l_aspect + "' is now required and needs to be shown");
			}
			*/
			
			var l_maps = [];
			
			// Get the maps we need to show
			MetaWrap.StateViewMap.m_page.getAspectMaps(l_aspect,l_maps);						
						
			// get the aspect object
			var l_aspect_object = MetaWrap.StateViewMap.m_page.m_aspects[l_aspect];
			
			// We are showing this aspect - so we need to set it as active
			l_aspect_object.m_active = true;
						
			// teardown the maps in l_pa_maps, which because of the sort should be in order of decending depth...
			for(var i = 0;i<l_maps.length;i++)
			{
				// get a reference to the map
				var l_map = l_maps[i];

				// does this map know about its parents - if not we generate the parents map now
				if (l_map.parents == null)
				{
					// Generate the parents array
					MetaWrap.StateViewMap.calculateMapParents(l_aspect_object,l_map);										
				}
			}			
			
			// Copy one array onto another
			MetaWrap.appendArray(l_ca_maps,l_maps);
		}		
		else
		{
			// Get the aspect maps we need to show but are not shown
			MetaWrap.StateViewMap.m_page.getUnrenderedAspectMaps(l_aspect,l_ca_maps);
		}
		
	}
		
	// sort l_ca_mapsin order of decending depth
	l_ca_maps.sort(MetaWrap.View.mapCompareAscendingDepth);

	// render  the maps in l_ca_maps, which because of the sort should be in order of decending depth...
	for(var i = 0;i<l_ca_maps.length;i++)
	{
		// get a reference to the map
		var l_map = l_ca_maps[i];
		
		// if its in our list of things to be rendered, and its not rendered - then its fair game to be rendered :)
		if (!l_map.rendered)
		{
			
			
			// This flag signifies that one of our parents as not been rendered - which means we can't be rendered 
			// This is almost certainly caused by an aspect that is inside aother aspect that is not on.
			var l_parent_not_rendered = false;
			
			// If this is true then we know that the parent will be rendered
			var l_parent_willbe_rendered = false;
			
			// If we know of our parents 
			if (l_map.parents != null)
			{
				// Look at each parent
				for(var m = 0;m<l_map.parents.length;m++)
				{
					// get a reference to it
					var l_parent_map = l_map.parents[m];
					
					//debug("  parent map " + l_parent_map.id + " depth " + l_parent_map.depth);
					
					// If its not geen rendered then we have a deviant
					if (!l_parent_map.rendered)
					{	
						// Get the aspect that this map is part of
						var l_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_map.id);
						
						// get the aspect that the unrendered parent map is part of
						var l_parent_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_parent_map.id);
					
						debug("render map defered because map '" + l_map.id + "' of aspect '" + l_aspect.m_name + "' (depth " + l_map.depth + ")" + " is a display child of map '" + l_parent_map.id + "' of aspect '" + l_parent_aspect.m_name + "' (depth " + l_parent_map.depth + ") which is not activated by a stateviewmap rule..");

						// Remember that we have a parent that did not render
						l_parent_not_rendered = true;
					}
					
					
					{
						// get the aspect that the unrendered parent map is part of
						var l_parent_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_parent_map.id);

						//debug("l_parent_aspect.m_name = " + l_parent_aspect.m_name);
						
						if ((l_ca[l_parent_aspect.m_name] != null) && (l_pa[l_parent_aspect.m_name] == null))
						{
							//debug("parent " + l_parent_aspect.m_name + " will be rendered");
							
							//l_parent_willbe_rendered = true;
						}
					}
					
				}
			}
			else
			{
				fatal("map.parents is null - this should not be");
			}
			
			// Are its parents all rendered?
			
			// If all our parents are rendered - then we are fine to be rendered
			if (!l_parent_not_rendered)
			{			
				// Get the aspect that this map is part of
				
				if (!l_parent_willbe_rendered)
				{

					if (l_report_changes)
					{
						var l_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_map.id);
						
						debug("render map '" + l_map.id + "' (depth " + l_map.depth + ") of aspect '" + l_aspect.m_name + "'");
					}
					
					//alert("rendermap in sv");
					// Render this map
					MetaWrap.View.renderMap(l_map);
				
					// if this map rendered - then we have changed the display (when we entered we confirmed that rendered was false)
					if (l_map.rendered)
					{
						l_display_changed = true;
					}
				}
			}
			else
			{
				if (l_report_changes)
				{
					var l_aspect = MetaWrap.StateViewMap.m_page.findAspectByMapId(l_map.id);
								
					warn("skipping map '" + l_map.id + "' of aspect '" + l_aspect.m_name + "' because it's has at least one parent map which is unrendered");
				}
			}
			
		}
		else
		{
			warn("map " + l_map.id + " depth " + l_map.depth + " is already rendered");
		}
		
	}


	
		
	//
	//	NOW THAT EVERYTHING IS RENDERED - WE CAN CALL THE EVENTS
	//
	
	
	var l_hashtracker = {};
	
	
	//
	//  Which pages did we show?
	//
	for(var l_page in l_cp)
	{		
		if (l_pp[l_page] == null)
		{
			//debug("page " + l_page + " is now required and needs to be opened");
	
			// what states that just activated wanted this page
			for(var l_state in l_cp[l_page])
			{
				// get the state
				var l_state_object = MetaWrap.State.findState(l_state);
				
				// if we have a state
				if (l_state_object != null)
				{			
					// and it activated
					if (l_state_object.m_just_activated)
					{
						//debug("state "  + l_state + "just activated!");						
						//alert(l_state + ".onshow");
						
						//debug(9:35 PM 12/3/2008 " + l_state + ".onshow");
						
						// now call any subscribers to this viewstatmap transition pair
						MetaWrap.View.callPageEvent(l_state + ".onshow",l_page,l_hashtracker);						
					}
					//else
					//{
					//	debug("not calling event - m_just_activated is false");
					//}
				}
			}	
		}	

		// what states that just activated wanted this page
		for(var l_state in l_cp[l_page])
		{
			// get the state
			var l_state_object = MetaWrap.State.findState(l_state);
			
			// if we have a state
			if (l_state_object != null)
			{			
				// and it activated
				if (l_state_object.m_just_activated)
				{
					//debug("state "  + l_state + "just activated!");						
					//alert(l_state + ".onshow");
					
					//debug(9:35 PM 12/3/2008 " + l_state + ".onshow");
					
					// now call any subscribers to this viewstatmap transition pair
					MetaWrap.View.callPageEvent(l_state + ".onstate",l_page,l_hashtracker);						
					MetaWrap.View.callPageEvent(l_state + ".onstateactivate",l_page,l_hashtracker);						
				}
				//else
				//{
				//	debug("not calling event - m_just_activated is false");
				//}
			}
		}				
	}
	
	//
	//  Which pages did we hide?
	//
	for(var l_page in l_pp)
	{		
		if (l_cp[l_page] == null)
		{
			//debug("page " + l_page + " is now required and needs to be opened");
	
			// what states that just activated wanted this page
			for(var l_state in l_pp[l_page])
			{							
				// get the state
				var l_state_object = MetaWrap.State.findState(l_state);
				
				// if we have a state
				if (l_state_object != null)
				{			
					// and it activated
					if (l_state_object.m_just_deactivated)
					{
						//debug("state "  + l_state + "just activated!");						
						//alert(l_state + ".onshow");
						
						//debug(9:35 PM 12/3/2008 " + l_state + ".onshow");
						
						// now call any subscribers to this viewstatmap transition pair
						MetaWrap.View.callPageEvent(l_state + ".onhide",l_page,l_hashtracker);						
					}
					//else
					//{
					//	debug("not calling event - m_just_activated is false");
					//}
				}
			}	
		}		
				
		// what states that just activated wanted this page
		for(var l_state in l_pp[l_page])
		{							
			// get the state
			var l_state_object = MetaWrap.State.findState(l_state);
			
			// if we have a state
			if (l_state_object != null)
			{	
				if (l_state_object.m_just_deactivated)
				{			
					// state has changed so we want to call that
					MetaWrap.View.callPageEvent(l_state + ".onstate",l_page,l_hashtracker);						
								
					// its just been deactivated so we can call that
					MetaWrap.View.callPageEvent(l_state + ".onstatedeactivate",l_page,l_hashtracker);						
				}
			}
		}			
	}
		
	
	
	
	
	// Call the aspect events
	for(var l_aspect in l_ca)
	{
		if (l_pa[l_aspect] == null)
		{
			//debug("aspect '" + l_aspect + "' was shown - now lets trigger our events");
			
			// what states that just activated wanted this aspect?
			for(var l_state in l_ca[l_aspect])
			{
				// get the state
				var l_state_object = MetaWrap.State.findState(l_state);
				
				// if we have a state
				if (l_state_object != null)
				{			
					// and it activated
					if (l_state_object.m_just_activated)
					{
						//debug("state "  + l_state + "just activated!");						
						//alert(l_state + ".onshow");
						
						//debug(9:35 PM 12/3/2008 " + l_state + ".onshow");
						
						// now call any subscribers to this viewstatmap transition pair
						MetaWrap.View.callAspectEvent(l_state + ".onshow",l_aspect,l_hashtracker);						
					}
					//else
					//{
					//	debug("not calling event - m_just_activated is false");
					//}
				}
			}			
		}
		
		//
		// We don't care if it wasn't shown - if its state just changed then we want to call an event
		//
	
		// what states that just activated wanted this aspect?
		for(var l_state in l_ca[l_aspect])
		{
			//debug("look for " + l_state);
		
			// get the state
			var l_state_object = MetaWrap.State.findState(l_state);
			
			// if we have a state
			if (l_state_object != null)
			{			
				// and it activated
				if (l_state_object.m_just_activated)
				{
					//debug("state "  + l_state + "just activated!");						
					//alert(l_state + ".onshow");
					
					//debug(l_state + ".onstate");
					
					//alert("ACTIVATED ONSTATE/ONSTATEACTIVATE state " + l_state + " aspect " + l_aspect);
					
					// now call any subscribers to this viewstatmap transition pair
					MetaWrap.View.callAspectEvent(l_state + ".onstate",l_aspect,l_hashtracker);											
					MetaWrap.View.callAspectEvent(l_state + ".onstateactivate",l_aspect,l_hashtracker);						
				}
				//else
				//{
				//	debug("not calling event - m_just_activated is false");
				//}
			}
		}			
	}
	

	
	// Call the aspect events
	for(var l_aspect in l_pa)
	{
		if (l_ca[l_aspect] == null)
		{
			//debug("aspect '" + l_aspect + "' was hidden - now lets trigger our events");
			
			// what states that just activated wanted this aspect?
			for(var l_state in l_pa[l_aspect])
			{
				// get the state
				var l_state_object = MetaWrap.State.findState(l_state);
				
				// if we have a state
				if (l_state_object != null)
				{			
					// and it activated
					if (l_state_object.m_just_deactivated)
					{
					
						//alert("DEACTIVATED ONHIDE state " + l_state + " aspect " + l_aspect);
					
						//debug("state "  + l_state + "just activated!");						
						//alert(l_state + ".onshow");
						
						//debug(9:35 PM 12/3/2008 " + l_state + ".onshow");
						
						// now call any subscribers to this viewstatmap transition pair
						MetaWrap.View.callAspectEvent(l_state + ".onhide",l_aspect,l_hashtracker);						
					}
					//else
					//{
					//	debug("not calling event - m_just_activated is false");
					//}
				}
			}			
		}
		
		//
		// We don't care if it wasn't shown - if its state just changed then we want to call an event
		//
	
		// what states that just activated wanted this aspect?
		for(var l_state in l_pa[l_aspect])
		{
			//debug("look for " + l_state);
		
			// get the state
			var l_state_object = MetaWrap.State.findState(l_state);
			
			// if we have a state
			if (l_state_object != null)
			{			
				// and it activated
				if (l_state_object.m_just_deactivated)
				{
					//debug("state "  + l_state + "just activated!");						
					//alert(l_state + ".onshow");
					
					//debug(l_state + ".onstate");
					
					//alert("DEACTIVATED ONSTATE/ONSTATEDEACTIVATE state " + l_state + " aspect " + l_aspect);
					
					// now call any subscribers to this viewstatmap transition pair
					MetaWrap.View.callAspectEvent(l_state + ".onstate",l_aspect,l_hashtracker);											
					MetaWrap.View.callAspectEvent(l_state + ".onstatedeactivate",l_aspect,l_hashtracker);						
				}
				//else
				//{
				//	debug("not calling event - m_just_activated is false");
				//}
			}
		}		
	
	}
			
		
		/*
		else
		{
			trace("aspect " + l_aspect + " is required and is still being shown");
		}
		*/
	
	
	
	// If there were any callbacks - then complete them
	//MetaWrap.XML.Action.completedDeferrdedCallbacks();

	// If the display has changed
	//if (l_display_changed)
	{
		// Render bindings
		MetaWrap.View.renderBindings();	
	}
	
	MetaWrap.State.resumeStateDetermination();
		

	return l_display_changed;
}

/*!
    @func       MetaWrap.StateViewMap.manualStateToggle = function(p_statename)
    @param      p_name
    @brief      Constructor for MetaWrap.StateViewMap.StateViewMap
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.manualStateToggle = function(p_statename)
{
	alert("manualStateToggle " + p_statename);

	//MetaWrap.StateViewMap.manualStateReCalculate();

	return false;
}

/*!
    @func       MetaWrap.StateViewMap.reCalculate = function()
    @return     return true if the display changed, else return false
    @brief      Recalculate the display 
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.reCalculate = function()
{
	//trace("MetaWrap.StateViewMap.reCalculate");

	// If we are integrated with the state system
	if (MetaWrap.State != null)
	{
		// Get ready
		MetaWrap.StateViewMap.reset();

		// Get the active states
		var l_states = MetaWrap.State.m_current_active_states;

		// Tell the StateViewMap what is active
		for(var l_active_state in l_states)
		{
			// if its not the root
			if (l_active_state != '')
			{
				//debug(l_states[l_active_state].getAbsoluteName());

				// get the absolute name
				var l_state_fullname = l_states[l_active_state].getAbsoluteName();
								

				// assert that state to be active
				MetaWrap.StateViewMap.stateAsserted(l_state_fullname);
			}
		}

		return MetaWrap.StateViewMap.updateDisplay();
	}

	return false;
}



/*!
    @func       MetaWrap.StateViewMap.manualStateReCalculate = function()
    @param      p_name
    @brief      Recalculate the display in response to the debugging panel
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.manualStateReCalculate = function()
{
	MetaWrap.StateViewMap.reset();

	for(var l_statename in MetaWrap.StateViewMap.m_state_view_maps)
	{
		var l_checkbox = MetaWrap.$(l_statename);

		if (l_checkbox.checked)
		{
			MetaWrap.StateViewMap.stateAsserted(l_statename);
		}
	}

	MetaWrap.StateViewMap.updateDisplay();

	return false;
}




/*!
    @func       MetaWrap.StateViewMap.validate = function()
    @param      p_name
    @brief     Validat the view map. Ensure that every state we are refering to actually exists.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.validate = function()
{
	if (!MetaWrap.StateViewMap.g_validated)
	{
		for(var l_statename in MetaWrap.StateViewMap.m_state_view_maps)
		{
			//debug("check " + l_statename);
			
			var l_state = MetaWrap.State.findState(l_statename);
			
			if (l_state == null)
			{
				fatal("state '" + l_statename + "' does not exist!");
			}
		}
		
		MetaWrap.StateViewMap.g_validated = true;
	}
}

/*!
    @func       MetaWrap.StateViewMap.report = function()
    @brief      Report on the most recent updates in the state machine
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.report = function()
{
	// Some shordhand references...
	var l_pp = MetaWrap.StateViewMap.m_previous_pages;
	var l_cp = MetaWrap.StateViewMap.m_current_pages;
	var l_pa = MetaWrap.StateViewMap.m_previous_aspects;
	var l_ca = MetaWrap.StateViewMap.m_current_aspects;
	
	//
	// Describe the pages required by the states
	//

	for(var l_page in l_cp)
	{
		if (l_pp[l_page] == null)
		{
			var l_states = l_cp[l_page];

			var l_comment = "";

			l_comment += "page '" + l_page + "' is required by ";

			if (l_states.count > 1)
			{
				l_comment += "the following states"
			}
			else
			{
				l_comment += "state"
			}

			l_comment += " ";

			var l_states_list = "";

			for(var l_state in l_states)
			{
				if (l_states_list != "")
				{
					l_states_list += ",";
				}

				l_states_list += "'" + l_state + "'";
			}

			l_comment += l_states_list;

			trace(l_comment);
		}

	}

	
	//
	// Describe the aspects no longer required by the states
	//

	for(var l_aspect in l_pa)
	{
		if (l_ca[l_aspect] == null)
		{

			var l_states =  l_pa[l_aspect];

			var l_comment = "";

			l_comment += "aspect '" + l_aspect + "' is no longer required by ";

			if (l_states.count > 1)
			{
				l_comment += "the following states"
			}
			else
			{
				l_comment += "state"
			}

			l_comment += " ";

			var l_states_list = "";

			for(var l_state in l_states)
			{
				if (l_states_list != "")
				{
					l_states_list += ",";
				}

				l_states_list += "'" + l_state + "'";
			}

			l_comment += l_states_list;
			

			trace(l_comment);
		
		}

	}
	

	//
	// Describe the aspects required by the states
	//

	for(var l_aspect in l_ca)
	{
		if (l_pa[l_aspect] == null)
		{

			var l_states =  l_ca[l_aspect];

			var l_comment = "";

			l_comment += "aspect '" + l_aspect + "' is required by ";

			if (l_states.count > 1)
			{
				l_comment += "the following states"
			}
			else
			{
				l_comment += "state"
			}

			l_comment += " ";

			var l_states_list = "";

			for(var l_state in l_states)
			{
				if (l_states_list != "")
				{
					l_states_list += ",";
				}

				l_states_list += "'" + l_state + "'";
			}

			l_comment += l_states_list;
			

			trace(l_comment);
		
		}

	}
	
}


/*!
    @func       MetaWrap.StateViewMap.renderManualControls = function()
    @brief     Render the manial state controls
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.renderManualControls = function()
{
	//debug("renderManualControls");

	document.write("<div>");
	for(l_statename in MetaWrap.StateViewMap.m_state_view_maps)
	{
		document.write("<div>");
		document.write(l_statename + "<input type=\"checkbox\" id=\"" + l_statename + "\" name=\"" + l_statename + "\" onclick=\"MetaWrap.StateViewMap.manualStateToggle('" + l_statename + "');\" ><br/>");


		document.write("</div>");
	}

	document.write("<input type=\"button\" value=\"recalculate\" id=\"recalculate\" name=\"recalculate\" onclick=\"MetaWrap.StateViewMap.manualStateReCalculate();\" ><br/>");
	document.write("</div>");

}


/*!
    @func       MetaWrap.StateViewMap.StateViewMap.Page = function(p_name)
    @param      p_name
    @brief      Constructor for MetaWrap.StateViewMap.StateViewMap
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.StateViewMap.Page = function(p_name)
{
    this.m_name = p_name;
}


/*!
    @func       MetaWrap.StateViewMap.StateViewMap.Page = function(p_name)
    @param      p_name
    @brief      Constructor for MetaWrap.StateViewMap.StateViewMap
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.StateViewMap.Aspect = function(p_name)
{
    this.m_name = p_name;
}


/*!
    @brief      The rendering pipeline for the state engine
*/
MetaWrap.StateViewMap.m_pipeline = new MetaWrap.Pipeline('state');

/*! @name  MetaWrap.StateViewMap Namespace */
//@{

/*!
    @func       MetaWrap.StateViewMap.prepare = function()
    @brief      Prepare the pipeline
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.prepare = function()
{
    //trace("MetaWrap.StateViewMap.prepare");

    var l_p = MetaWrap.StateViewMap;

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
	    l_p.m_xml_location = location.protocol + "//" + l_p.m_file_name + "_stateviewmap.xml";
		
		l_p.m_js_location = location.protocol + "//" + l_p.m_file_name + "_stateviewmap.js";

	}
	else
	{
	    // Calculate it based on the name of the document
	    l_p.m_xml_location = l_p.m_file_name + "_stateviewmap.xml";
		
		l_p.m_js_location = l_p.m_file_name + "_stateviewmap.js";
	}


    //l_p.m_xml_location = "test_13_state.xml";


    //trace(l_p.m_xml_location);
    //trace(l_p.m_xsl_location);

    //
    //
    ////////////////////////////////////////
}


/*!
    @func       MetaWrap.StateViewMap.xml = function()
    @brief      xml loader
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.xml = function()
{
    //trace("MetaWrap.StateViewMap.xml");

    ////////////////////////////////////////
    //
    //  Load XML, Load XSLT - combine it and write it out into the browser..
    //

    var l_p = MetaWrap.StateViewMap;

    // Create a HTTP Request object
    var l_xml_request = new MetaWrap.Network.Client.HTTP();

    // Create a XML DOM Object
    l_p.m_xml_document = new MetaWrap.XML.Document();

    // Request the XML
    if (!MetaWrap.XML.Document.Load(l_p.m_xml_document,l_xml_request,l_p.m_xml_location))
    {
        error("MetaWrap.StateViewMap.xml failed to load '" + l_p.m_xml_location + "'" );
    }

    //
    //
    ////////////////////////////////////////
}

/*!
    @func       MetaWrap.StateViewMap.xslt = function()
    @brief      xslt loader
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.xslt = function()
{

    //trace("MetaWrap.StateViewMap.xslt");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.StateViewMap;

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
    @func       MetaWrap.StateViewMap.transform = function()
    @brief      Xslt transform stage
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.transform = function()
{

    //trace("MetaWrap.StateViewMap.transform");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.StateViewMap;

    // Process this xml using this processor
    l_p.m_xslt_processor.Process(l_p.m_xml_document);
	
	//alert("l_p.m_xml_document = " + l_p.m_xml_document.xml);

	
	
    // Get the text result of the transform
    l_p.m_result = l_p.m_xslt_processor.getText();
	
	//alert("transformed! to " + l_p.m_result);

    //
    //
    ////////////////////////////////////////

}

/*!
    @func       MetaWrap.StateViewMap.transform = function()
    @brief      Xslt transform stage
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.load_js_file = function()
{    
	warn("running MetaWrap.StateViewMap.transform_fallback");
	//MetaWrap.State.m_result = MwFetch(MetaWrap.StateViewMap.m_js_location);
	
	// Try the direct include method
	var l_script = '<script language="JavaScript" type="text/javascript" src="' + MetaWrap.StateViewMap.m_js_location + '"><\/script>';
	document.write(l_script);
	
}


/*!
    @func       MetaWrap.StateViewMap.write = function()
    @brief      Write the output from the transformation
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.StateViewMap.write = function()
{
    //trace("MetaWrap.StateViewMap.write again..");
	
	//alert("MetaWrap.StateViewMap.write " + MetaWrap.StateViewMap.m_result);

    // Evaluate the resulting JavaScript Code
    //alert(MetaWrap.StateViewMap.m_result);
	if (MetaWrap.StateViewMap.m_result != "")
	{
		eval(MetaWrap.StateViewMap.m_result);
	}
}

// Create the pipeline nodes
var l_p = MetaWrap.StateViewMap.m_pipeline;
l_p.add('prepare',MetaWrap.StateViewMap.prepare);

// Get the config flag values
var l_metawrap_config_stateviewmap_js_file_precompiled  = MetaWrap.eval("g_metawrap_config_stateviewmap_js_file_precompiled",false);
var l_metawrap_config_stateviewmap_js_file_precompiled_and_included  = MetaWrap.eval("g_metawrap_config_stateviewmap_js_file_precompiled_and_included",false);


if (!l_metawrap_config_stateviewmap_js_file_precompiled_and_included)
{

	// If we have specified that we want to load from js file
	if (l_metawrap_config_stateviewmap_js_file_precompiled)
	{
		// then load from static js file - failover is to run the transform
		l_p.add('transform',MetaWrap.StateViewMap.load_js_file);
	}
	else
	{	
		// Download the xml
		l_p.add('xml',MetaWrap.StateViewMap.xml);
		
		// Download the xslt
		l_p.add('xslt',MetaWrap.StateViewMap.xslt);
	
		// run the transform but failover to a static js file
		l_p.add('transform',MetaWrap.StateViewMap.transform,MetaWrap.StateViewMap.load_js_file);
	}
	
	// Embed in browser
	l_p.add('write',MetaWrap.StateViewMap.write);

	// Run the pipeline
	MetaWrap.StateViewMap.m_pipeline.run();
}



/*!
 *@} endgroup mw_javascript_lib_stateviewmap MetaWrap - JavaScript - StateViewMap
 */

/*!
 *@} end of MetaWrap.StateViewMap
 */

