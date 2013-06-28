/*

    @file mw_lib_view.js

    $Id: mw_lib_view.js,v 1.19 2008/08/05 02:05:10 james Exp $

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

/*
 * $Log: mw_lib_view.js,v $
 * Revision 1.19  2008/08/05 02:05:10  james
 * Fixed issue in recursive determineStates
 *
 * Revision 1.18  2004/01/06 22:16:01  james
 * Added mutex="true" to <states> to save some typing.
 * Added error handling for requests
 *
 * Revision 1.17  2004/01/06 00:43:24  james
 * Added activate and deactivate to statemachine
 * Added login via sms to example application.
 *
 * Revision 1.16  2004/01/05 19:29:44  james
 * Wired up transition event pairs to the viewstate
 *
 * Revision 1.15  2004/01/04 23:41:23  james
 * Getting state view to make callouts
 *
 * Revision 1.14  2004/01/02 05:57:07  james
 * Hidden iframe now works
 *
 * Revision 1.13  2008/07/22 15:04:01  james
 * Fixed a bug in the state machine that was causing it to skip an a re-evaluation after dirtying via an affirmation or negation.
 *
 * Revision 1.12  2008/07/21 10:16:18  james
 * Added unrequire - now just need a better name for it....
 *
 * Revision 1.11  2008/07/20 16:31:18  james
 * Added yellow fade example
 *
 * Revision 1.10  2008/07/20 15:59:46  james
 * Can now have page defined by superstate - wondering if viewmap should be recursive or should I keep it flat?
 *
 * Revision 1.9  2008/07/20 14:12:40  james
 * getting states and views integrated with stateviewmap
 *
 * Revision 1.8  2008/07/19 14:41:01  james
 * Working on getting state to control view
 *
 * Revision 1.7  2007/09/27 08:24:06  james
 * Made some changes to start wiring up object model to view
 *
 * Revision 1.6  2007/09/27 06:52:36  james
 * *** empty log message ***
 *
 * Revision 1.5  2007/09/27 03:14:44  james
 * making structure more logical
 *
 * Revision 1.4  2007/07/25 11:13:28  james
 * Fix ro schema creation script
 * Tweaking javascript code for view
 *
 * Revision 1.3  2007/07/25 10:24:15  james
 * Added XML aspects to views
 *
 * Revision 1.2  2007/07/23 09:34:28  james
 * Added XML aspects
 *
 * Revision 1.1  2007/07/22 15:15:57  james
 * Latest tweaks to the javascript libs to suppoty view system
 *
 */


/*! \page mw_lib_javascript_view MetaWrap - JavaScript - View
 *
 *  A Page consists Of a XHTML definition file
 *  	Within that file can be defined aspects using
 *
 *  A Aspect is a small section of HTML
 *    A Aspect can be defined within HTML or within a file as a HTML delta.
 *    When a aspect renders - it fills up its surrounding DIV
 *
 */

//debug("$Id: mw_lib_view.js,v 1.19 2008/08/05 02:05:10 james Exp $");

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Pipeline","mw_lib_pipeline.js");
MwUse("MetaWrap.Network","mw_lib_network.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.XSLT","mw_lib_xml_xslt.js");

/*! \defgroup mw_lib_javascript_view  MetaWrap - JavaScript - View
 *@{
 */

 //var g_USESEARCHFORHISTORYBUFFER = ((g_bid == "IE") || (g_bid == "Safari") || (g_bid == "Opera") || (g_bid == "Mozilla")  );
 
 
/*!
    @namespace  MetaWrap.View
    @brief      Declare the MetaWrap.View namespace
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View = {};

// Create a HTTP Request object
var l_xml_view_request = new MetaWrap.Network.Client.HTTP();

// used to create ids on the fly
MetaWrap.View.m_id = 0;

// collection of pages
MetaWrap.View.m_pages = {};

// collection of pages
MetaWrap.View.m_current_page = "";

// If this is true then we bypass the cache for all requests by adding "?v=" + (new Date()).getTime(); to the end of every request
MetaWrap.View.m_cache_bypass = true;

// collection of effects to run when page opens
MetaWrap.View.m_page_open_effects = [];

// collection of effects to run when page opens
MetaWrap.View.m_page_close_effects = [];

// collection of effects to run when page opens
MetaWrap.View.m_aspect_show_effects = [];

// collection of effects to run when page opens
MetaWrap.View.m_aspect_hide_effects = [];

// functions to call when  a specific aspect is shown on any page
MetaWrap.View.m_aspects_events = [];

// functions to call when  a specific page is shown on any page
MetaWrap.View.m_pages_events = [];

// If this is true then we just transitioned our location and the MetaWrap.View.CheckLocationHash should not deserialise our state
MetaWrap.View.m_location_transitioned = false;

// Save away our current location hash (If you set the iframe with the # in the intial html, you can save an extra reload of the page every time you history back to the initial page)
//MetaWrap.View.m_location_hash = ( g_USESEARCHFORHISTORYBUFFER ? "" : "#" );
MetaWrap.View.m_location_hash = "";

// This is our starting history for the view so when we go foward and then back to a url with no history  info after the #  (or no # at all)  then we know what the state should be. Without this we deserialise to all states set to off.
MetaWrap.View.m_initial_history_state = null;
				
// Regular expression that can pull out standard variable subscitution
MetaWrap.View.g_variable_substitution = new RegExp("\\{\\$[0-9a-zA-Z_\\(\\)\\.\\,\\?\\:\\|\\']+\\}","gi");

// Regular expression that can pull out standard variable subscitution
MetaWrap.View.g_checkbox_substitution = new RegExp("checked=\"false\"","gi");

// If this is true then we are debugging
MetaWrap.View.g_debug = false;

/*!
    @dn 	 MetaWrap.View.CheckLocationHash = function()
    @brief     This is called periodically to work out if the back button has taken us to another point in the history.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.GetLocationHash = function()
{	

	// the magic AJAX history iframe
	var l_frame = frames['history_iframe'];
	
	try
	{				
		// If we can't find the frame..
		if (l_frame != null)
		{
			//.. and use its hash
			//l_hash = (g_USESEARCHFORHISTORYBUFFER ? l_frame.location.search : l_frame.location.hash);
			return l_frame.location.search;
		}
		else
		{
			warn("CheckLocationHash is USING location.hash  = '" + location.hash + "'");
			// ... then we use the frame of the whole page..
			return location.hash;		
		}
	}
	catch(l_e)
	{
		error('location.search error');
	}
	
	return "";
}

/*!
    @dn 	 MetaWrap.View.CheckLocationHash = function()
    @brief     This is called periodically to work out if the back button has taken us to another point in the history.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.CheckLocationHash = function()
{	
	// kill the old timeour
	window.clearTimeout(MetaWrap.View.m_location_hash_timer);
	MetaWrap.View.m_location_hash_timer = null;

	// this will be the hash we have found
	var l_hash = MetaWrap.View.GetLocationHash();	
	
	
	// if our location hash has changed then we need to load the state that 
	// is serialised after the # in the url (location.hash) which we nov conveniently have in l_hash
	if (MetaWrap.View.m_location_hash != l_hash)
	{	
		//debug("MetaWrap.View.m_location_hash " + MetaWrap.View.m_location_hash);
		//debug("l_hash " + l_hash);

		//warn("CheckLocationHash CHANGED!");			
		//debug("READ " + MetaWrap.View.m_location_hash + " => " + l_hash);		
		
		// save it away for later so we know the next time its changed
		MetaWrap.View.m_location_hash = l_hash;

		// If we were not making the change ourselves in response to a new state
		if (!MetaWrap.View.m_location_transitioned)
		{							

			// If the location hash/search is blank
			if ((l_hash == "")  || (l_hash == "?") || (l_hash == "#") )
			{
					MetaWrap.State.deSerialise(MetaWrap.View.m_initial_history_state);
			}
			else
			{				
				// Load the new state
				MetaWrap.State.deSerialise(l_hash.slice(1));
			}
		}
	}
	
	// reset the transition flag
	MetaWrap.View.m_location_transitioned = false;
	
	// Set the timer to fire off again soon
	MetaWrap.View.m_location_hash_timer = setTimeout(MetaWrap.View.CheckLocationHash, 500);
}


/*!
    @dn 	 MetaWrap.View.OnStateChange = function()
    @brief     This should be called every time the state changes. This is used to push the serialised state onto the history buffer iframe.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.OnStateChange = function()
{
	// Get the complete serialised state
	var l_serialised = MetaWrap.State.serialise();
	
	//debug("MetaWrap.View.OnStateChange " + 	l_serialised);
	
	// yes we have tarnsitioned
	MetaWrap.View.m_location_transitioned = true;
	
	// If we have no initial history state - then now is the time to save it..			
	if (MetaWrap.View.m_initial_history_state == null)
	{
	
		//debug("saving initial history state as " + l_serialised);		
		MetaWrap.View.m_initial_history_state = l_serialised;
		
		var l_lh = MetaWrap.View.GetLocationHash();
		//debug("l_lh = " + l_lh);		
		
		if ((l_lh != "") && (l_lh != "?"))
		{
			var l_lhs = l_lh.slice(1);
		
			trace("reconstitude current state " +  l_lhs);			
			MetaWrap.View.m_location_hash = l_lhs;
			MetaWrap.State.deSerialise(l_lhs);
			return;
		}
		
	}
	

	// Get the history iframe
	var l_frame = frames['history_iframe'];
	
	// If we have an iframe
	if (l_frame != null)
	{		
	
		//if (g_USESEARCHFORHISTORYBUFFER)
		//{
			//alert("move from " + l_frame.location.search  + " to ?" + l_serialised);
			//if (l_frame.location.search != null)
			//{	
				//trace("l_serialised          =  " + l_serialised);
				//trace("l_frame.location.search= " + l_frame.location.search);
				
				// make a copy of the location
				var l_location = l_frame.location.search;
				
				// Normalise it
				if ((l_location == "") || (l_location == "?"))
				{	
					//trace("normalising '" + l_location + "' to " + MetaWrap.View.m_initial_history_state);				
					l_location = MetaWrap.View.m_initial_history_state;			
					
				}
							
				//trace("l_location = " + l_location);
				//trace("l_serialised = " + l_serialised);
			
				// If our location has changed
				if (l_location != l_serialised)
				{					
						
					// If we are serialising to the initial history state - then go back to the original page
					if (l_serialised == MetaWrap.View.m_initial_history_state)
					{
						//warn("NULL HISTORY OVERRIDE " + l_frame.location.search + " => ");
						//trace("SET (FROM INITIAL HISTORY)" + l_frame.location.search + " => " );
						l_frame.location.search = "";
						
					}
					else
					{
						//trace("SET " + l_frame.location.search + " => " + l_serialised);
						// choose the serailised state
						l_frame.location.search = l_serialised;					
					}
				}
			//}		
		/*}
		else
		{
			//alert("move from " + l_frame.location.search  + " to ?" + l_serialised);
			if (l_frame.location.hash != null)
			{	
				trace("l_serialised          = #" + l_serialised);
				trace("l_frame.location.hash = " + l_frame.location.hash);
				
				// make a copy of the location
				var l_location = l_frame.location.hash;
				
				// Normalise it
				if ((l_location == "") || (l_location == "#"))
				{		
					l_location = "#" + MetaWrap.View.m_initial_history_state;			
					trace("normalising to " + l_location);
				}
							
				trace("l_location = " + l_location);
			
				// If our location has changed
				if (l_location != ("#" + l_serialised))
				{					
						
					// If we are serialising to the initial history state - then go back to the original page
					if (l_serialised == MetaWrap.View.m_initial_history_state)
					{
						alert("NULL HISTORY OVERRIDE " + l_frame.location.hash + " => #");
						trace("SET (FROM INITIAL HISTORY)" + l_frame.location.hash + " => #" );
						l_frame.location.hash = "#";
						
					}
					else
					{
						trace("SET " + l_frame.location.hash + " => #" + l_serialised);
						// choose the serailised state
						l_frame.location.hash = l_serialised;					
					}
				}
			}
		}
		*/
	}
	else	
	{		
		warn("OnStateChange is USING location.hash  = '" + location.hash + "'");
		if (location.hash  != l_serialised)
		{				
			location.hash =  l_serialised;				
		}
	}
}

/*!
    @dn 	  MetaWrap.View.renderMap = function(p_maps)
    @brief      Render an update map
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.renderMap = function(p_map)
{
	// if the map is not already rendered
	if (!p_map.rendered)
	{
		// get the element
		var l_element = MetaWrap.$(p_map.id);

		// has we element?
		if (l_element != null)
		{
		
			//alert("render map " + p_map.content);
			
			
			//
			// Perform substitutions
			//
			
			var l_matches = null;
			
			//alert(p_map.content);
			
			var l_original = p_map.content;
			
			//alert(l_original);

			while(l_matches = MetaWrap.View.g_variable_substitution.exec( p_map.content ))
			{
				var l_match = p_map.content.substring(l_matches.index+2,MetaWrap.View.g_variable_substitution.lastIndex -1 );
				
				try
				{
					//var l_value = eval(l_match);	
					
					// Get an expression object
					var l_value = MetaWrap.View.Binding.Expression.findOrCreate(l_match).evaluate().m_current_value;
					
					//debug(l_match + " = " + l_value)
					
					//alert("match = " + l_match + " = " + eval(l_match));	

					l_match = l_match.replace(/\(/, "\\(");
					l_match = l_match.replace(/\)/, "\\)");
					l_match = l_match.replace(/\?/, "\\?");
					l_match = l_match.replace(/\|/, "\\|");
					
					var l_regex = new RegExp("\\{\\$" + l_match + "\\}","gi");
					
					l_original = l_original.replace(l_regex, l_value)
					
					//alert(l_original);										
				}
				catch(l_e)
				{
					error("unable to find substitution match for {$" + l_match + "}");					
				}
			}
			
			l_original = l_original.replace(MetaWrap.View.g_checkbox_substitution,"");
			
			
			//alert(l_original);
			
			//alert("p_map.target = " + p_map.target);
			//alert("l_element.nodeName = " + l_element.nodeName);
			//alert("p_map.target = " + p_map.target);
			
			
			// apply the map
			l_element[p_map.target] = l_original;
			
			
			
												
			
			/*
			if (p_map.content != l_element[p_map.target])
			{
				//warn("content did not go into browser as specified - empty element bug or attribute reordering?");
				//debug(p_map.content);
				//debug(l_element[p_map.target]);
			}
			*/
			
			
			//debug(l_element.nodeName);
			// show it
			if ((l_element.nodeName == "SPAN") || (l_element.nodeName == "span"))
			{			
				l_element.style.display = "inline";		
			}
			else
			{
				l_element.style.display = "block";		
			}

			//
			// Show the special effects
			//
			
			p_map.rendered = true;
			
			var l_fx = MetaWrap.View.m_aspect_show_effects;

			for(var e = 0;e < l_fx.length;e++)
			{
				l_fx[e](l_element);
			}
			
			
		}
		else
		{
			// no element? - then I would say there is a parent map that has not been rendered
			fatal("renderMaps: unable to find element '" + p_map.id + "'");			
		}
	}
}


/*!
    @dn 	  MetaWrap.View.renderMaps = function(p_maps)
    @brief      Render an update map
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.renderMaps = function(p_maps)
{
	var l_ok = true;

	// Now display it
	for(var l_id = 0;l_id < p_maps.length;l_id++)
	{
		//alert(l_id);

		var l_map = p_maps[l_id];
		
		MetaWrap.View.renderMap(l_map);
	}
	
	return l_ok;
}


MetaWrap.View.mapCompareDescendingNodeDepth = function(p_mapa,p_mapb)
{
	return MetaWrap.XML.Node.compareDepthDescending(MetaWrap.$(p_mapa.id),MetaWrap.$(p_mapb.id));
}

MetaWrap.View.mapCompareAscendingDepth = function(p_mapa,p_mapb)
{
	return p_mapa.depth - p_mapb.depth;
}


MetaWrap.View.mapCompareDescendingDepth = function(p_mapa,p_mapb)
{
	return p_mapb.depth - p_mapa.depth;
}



/*!
    @fn      MetaWrap.View.teardownMap = function(p_map)
    @brief      Teardown an update map
    @author    James Mc Parlane
    @date        22 July 2007
*/
MetaWrap.View.teardownMap = function(p_map)
{
	var l_element = MetaWrap.$(p_map.id);
	
	// This is no longer rendered
	p_map.rendered = false;

	if (l_element != null)
	{
		//warn("TEADDOWN " + l_element[p_map.target]);
	
		l_element[p_map.target] = "";
		
		// show it
		l_element.style.display = "none";				
	}
	else
	{
		error("teardownMaps: unable to find element '" + p_map.id + "'");
	}	
}


/*!
    @fn      MetaWrap.View.teardownMaps = function(p_maps)
    @brief      Teaddown the maps
    @author    James Mc Parlane
    @date        22 July 2007
*/
MetaWrap.View.teardownMaps = function(p_maps)
{
	for(var l_id = 0;l_id < p_maps.length;l_id++)
	{
		MetaWrap.View.teardownMap(p_maps[l_id]);
	}
}



/*!
    @fn    	MetaWrap.View.loadMaps = function(p_url)
    @brief      Load an update map from a URL
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.loadMaps = function(p_url)
{
	var l_maps = null;

	// Create a XML DOM Object
	var l_xml = new MetaWrap.XML.Document();

	//trace("fetch " + this.m_aspect_url);

	// Request the drivers XML file
	if (!MetaWrap.XML.Document.Request(l_xml,l_xml_view_request,p_url ,"GET",false,false,null,null,null))
	{
		error("loadMaps: Unable to fetch " + p_url);
	}

	// Take the resulting XML, deserialise it into a maps update and then return ir
	return MetaWrap.View.deserialiseMaps(l_xml,p_url);
}


/*!
    @fn  	MetaWrap.View.deserialiseMaps = function(p_xml,p_description)
    @brief      Load an update map from a XML
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.deserialiseMaps = function(p_xml,p_description)
{
	// Convert to an object
	var l_data_feed = MetaWrap.XML.ToObject(p_xml);

	if (l_data_feed == null)
	{
		//trace("empty aspect (type 1) " + p_description);
		// nothing in this xml
		l_maps = [];
	}
	else
	if (l_data_feed.content2ids != null)
	{
		//trace("empty aspect (type 2)" + p_description);
		// nothing in this xml
		l_maps = [];
	}
	// if we got an array - then all is good and we got more than one element
	if (l_data_feed.content2ids.content2id.length != null)
	{
		l_maps = l_data_feed.content2ids.content2id;
	}
	else
	{
		// We must have gotten none
		l_maps = [];

		l_maps[0] = l_data_feed.content2ids.content2id;
	}

	return l_maps;
}





/*!
    @class  	MetaWrap.View.Page
    @brief      Declare the MetaWrap.View.Page class
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page = function(p_name,p_path)
{
	// An array of page deltas that can be loaded against the page
	this.m_deltas = {};

	// An array of aspects that can be shown in a page
	this.m_aspects = {};

	// Array of ids of divs that need binding calls at load time
	this.m_onload_binding_ids = [];
		
	// what to use as the path character
    this.m_path_char = '\\';

    //
    // Because of this rule - we know that we can never have / or \ in a filename or its parameters - it must be escaped or encoded
    //
    if (location.pathname.indexOf(this.m_path_char) == -1)
    {
        // Use the other path character
        this.m_path_char = '/';
    }

    // Get the filename with file extension (later on we strip out the extension)
    this.m_file_name = location.pathname.substring(location.pathname.lastIndexOf(this.m_path_char)+1);

    // Get the realfile name - sans extension
    this.m_file_path = location.pathname.substring(0,location.pathname.length - this.m_file_name.length);

    // Get the file extension
    this.m_file_extension = location.pathname.substring(location.pathname.lastIndexOf('.')+1);

    // Get the realfile name - sans extension
    this.m_file_name = this.m_file_name.substring(0,this.m_file_name.length - this.m_file_extension.length - 1);

	// Remember the name
	this.m_name = p_name;

	if (p_path == null)
	{
		p_path = "";
	}
	else
	{

	}



	// The path to this pages's files
	this.m_path = p_path + "pages" + this.m_path_char + this.m_name;

	// Construct the URL
	this.m_markup_url =   this.m_path + this.m_path_char + "index.html";

	// If we are doing direct file access  - make sure we build and absolute path with
	// file: so that we can feed that into the xml fetch - it will need to run different
	// code to fetch xml from the filesystem
	if (location.protocol == "file:")
	{
		this.m_markup_url =  "file://" + this.m_file_path + this.m_path_char + this.m_markup_url;
	}
	else
	if (MetaWrap.View.m_cache_bypass)
	{
		// Add optional cache bypass
		this.m_markup_url += "?v=" + (new Date()).getTime();
	}

	//trace(this.m_markup_url);
}

/*!
    @fn  	MetaWrap.View.renderPageAspect = function(p_name)
    @brief      Render a page aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.renderPageAspect = function(p_name)
{
	MetaWrap.View.m_pages[MetaWrap.View.m_current_page].renderAspect(p_name);
}

/*!
    @fn  	MetaWrap.View.renderBindings = function()
    @brief      Render the page bindings
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.renderBindings = function()
{
	//warn("MetaWrap.View.renderBindings");

	// start with a reset expression cache
	MetaWrap.View.Binding.Expression.resetAll();	
	
	// reset all the rendered maps
	MetaWrap.View.Map.resetRendered();
	
	// now render all the  bindings
	MetaWrap.View.m_pages[MetaWrap.View.m_current_page].renderBindings();

	// run any transition effects on the updated
	MetaWrap.View.Map.doFXForRendered();
}


/*!
    @fn  	MetaWrap.View.Page.prototype.addAspect = function(p_name,p_target)
    @brief      Add a aspect to this page
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.addAspect = function(p_name)
{
	//alert("add aspect '" + p_name + "'");


	// do we have it already?
	var l_aspect = this.m_aspects[p_name];

	// if we don;t
	if (l_aspect == null)
	{
		l_aspect = new MetaWrap.View.Page.Aspect(this,p_name);
	}
	else
	{
		//alert("Already have aspect " + p_name);
	}
		

	return l_aspect;
}

/*!
    @fn  	MetaWrap.View.Page.prototype.renderAspect = function(p_name)
    @brief      Render the specified aspect inside a page
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.renderAspect = function(p_name)
{
	// do we have it already?
	var l_aspect = this.m_aspects[p_name];

	// if we have this aspect
	if (l_aspect != null)
	{
		// show it
		
		if (!l_aspect.render())
		{
			//fatal("page aspect " + p_name + " failed to render");
			l_aspect.m_failed = true;
		}
		else
		{		
			l_aspect.m_failed = false;
			// now call any subscribers
			MetaWrap.View.callAspectEvent("onshow",p_name);
		}		
	}
	else
	{
		error("renderAspect: No such aspect called '" + p_name + "'");
	}

	return l_aspect;
}


/*!
    @fn  	MetaWrap.View.Page.prototype.renderAspect = function(p_name)
    @brief      Render the specified aspect inside a page
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.teardownAspect = function(p_name)
{
	// do we have it already?
	var l_aspect = this.m_aspects[p_name];

	// if we have this aspect
	if (l_aspect != null)
	{
		l_aspect.teardown();
	}
	else
	{
		error("teardownAspect: No such aspect called '" + p_name + "'");
	}

	return l_aspect;
}

/*!
    @fn      MetaWrap.View.Page.prototype.getAspectMaps = function(p_name)
    @brief      return all the maps of this aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.getAspectMaps = function(p_name,p_array)
{	
	var l_aspect = this.m_aspects[p_name];

	// if we have this aspect
	if (l_aspect != null)
	{
		l_aspect.getMaps(p_array);
	}
	else
	{
		error("getAspectMaps: No such aspect called '" + p_name + "'");
	}

	return l_aspect;
}

/*!
    @fn      MetaWrap.View.Page.prototype.getUnrenderedAspectMaps = function(p_name)
    @brief      return all the maps of this aspect that have not been rendered
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.getUnrenderedAspectMaps = function(p_name,p_array)
{	
	var l_aspect = this.m_aspects[p_name];

	// if we have this aspect
	if (l_aspect != null)
	{
		l_aspect.getMapsByRenderState(p_array,false);
	}
	else
	{
		error("getUnrenderedAspectMaps: No such aspect called '" + p_name + "'");
	}

	return l_aspect;
}

/*!
    @fn      MetaWrap.View.Page.prototype.getRenderedAspectMaps = function(p_name)
    @brief      return all the maps of this aspect that have  been rendered
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.getRenderedAspectMaps = function(p_name,p_array)
{	
	var l_aspect = this.m_aspects[p_name];

	// if we have this aspect
	if (l_aspect != null)
	{
		l_aspect.getMapsByRenderState(p_array,true);
	}
	else
	{
		error("getRenderedAspectMaps: No such aspect called '" + p_name + "'");
	}

	return l_aspect;
}



/*!
    @fn      MetaWrap.View.Page.prototype.getAspect = function(p_name)
    @brief      return the aspact if it exists
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.getAspect = function(p_name)
{	
	var l_aspect = this.m_aspects[p_name];

	// if we have this aspect
	if (l_aspect == null)
	{
		error("getAspectMaps: No such aspect called '" + p_name + "'");
	}

	return l_aspect;
}




/*!
    @fn  	MetaWrap.View.Page.prototype.load = function()
    @brief      Load a page
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.load = function()
{
	//trace("load xml from " + this.m_markup_url);

    var l_p = MetaWrap.View;

    // Create a XML DOM Object
    this.m_markup_document = new MetaWrap.XML.Document();

	//debug("loading " + this.m_markup_url);
	
    // Request the XML
    if (!MetaWrap.XML.Document.Load(this.m_markup_document,l_xml_view_request,this.m_markup_url))
    {
        error("MetaWrap.State.xml failed to load '" + this.m_markup_url + "'" );
    }
    else
    {
		//debug("loaded " + this.m_markup_url);
    	//trace("loaded");
    }
	
	
}


/*!
    @fn  	MetaWrap.View.addPageOnShow = function(p_page,p_function)
    @brief      Add an event to be triggered when page is shown
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.addPageEvent = function(p_event,p_page,p_function,p_guid)
{
	//alert("MetaWrap.View.addPageEvent '" + p_page + "' '" + p_event + "' ");

	var l_events = MetaWrap.View.m_pages_events;

	// make sure we know about this event type - make it
	if (l_events[p_event] == null)
	{
		l_events[p_event] = [];
	}
	
	var l_page_events = l_events[p_event];

	// If we need to, add a slot for this page
	if (l_page_events[p_page] == null)
	{
		l_page_events[p_page] = [];
	}
	
	// add the event for this page
	l_page_events[p_page].push({m_guid:p_guid,m_fn:p_function});
}

/*!
    @fn  	MetaWrap.View.callPageEvent = function(p_event,p_page,p_hashtracker)
    @param 	p_event is the event name eg "onshow" or "state.onshow"
    @param 	p_page is the name of the page this is linked to
    @param 	p_hashtracker is used to keep track of what function have been called - p_hashtracker is not null  and a fn has been called already (guid in hash table) - we don't call it.
    @brief      Trigger events for a given page when it is shown.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.callPageEvent = function(p_event,p_page,p_hashtracker)
{
	//alert("MetaWrap.View.callPageEvent '" + p_page + "' '" + p_event + "' ");

	if (MetaWrap.View.m_pages_events[p_event] == null)
	{
		//alert("no such event type");
		return false;
	}

	var l_page_events = MetaWrap.View.m_pages_events[p_event][p_page];
	
	if (l_page_events != null)
	{
		return MetaWrap.View.callEvents(l_page_events,p_hashtracker);	
	}	
	else
	{
		trace("no '" + p_event +"' callbacks for page '" + p_page + "'");
	}
	
	
	return false;
}



/*!
    @fn  	MetaWrap.View.addAspectEvent = function(p_aspect,p_function)
    @brief      Add an event to be triggered when aspect is shown
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.addAspectEvent = function(p_event,p_aspect,p_function,p_guid)
{
	var l_events = MetaWrap.View.m_aspects_events;

	// make sure we know about this event type - make it
	if (l_events[p_event] == null)
	{
		l_events[p_event] = [];
	}
	
	var l_aspect_events = l_events[p_event];

	// If we need to, add a slot for this aspect
	if (l_aspect_events[p_aspect] == null)
	{
		l_aspect_events[p_aspect] = [];
	}
	
	// add the event for this aspect
	l_aspect_events[p_aspect].push({m_guid:p_guid,m_fn:p_function});
}


/*!
    @fn  	MetaWrap.View.callAspectEvent = function(p_event,p_aspect,p_hashtracker)
    @param 	p_event is the event name eg "onshow" or "state.onshow"
    @param 	p_aspect is the name of the aspect this is linked to
    @param 	p_hashtracker is used to keep track of what function have been called - p_hashtracker is not null  and a fn has been called already (guid in hash table) - we don't call it.
    @brief      Trigger events for a given page when it is shown.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.callAspectEvent = function(p_event,p_aspect,p_hashtracker)
{
	//alert("MetaWrap.View.callAspectEvent '" + p_aspect + "' '" + p_event + "' ");

	if (MetaWrap.View.m_aspects_events[p_event] == null)
	{
		return false;
	}

	var l_aspect_events = MetaWrap.View.m_aspects_events[p_event][p_aspect];
	
	if (l_aspect_events != null)
	{
		return MetaWrap.View.callEvents(l_aspect_events,p_hashtracker);
	}	
	else
	{
		trace("no '" + p_event +"' callbacks for aspect '" + p_aspect + "'");
	}
	
	
	return false;
}

/*!
    @fn  	MetaWrap.View.callAspectEvent = function(p_event,p_aspect,p_hashtracker)
    @param 	p_event is the event name eg "onshow" or "state.onshow"
    @param 	p_aspect is the name of the aspect this is linked to
    @param 	p_hashtracker is used to keep track of what function have been called - p_hashtracker is not null  and a fn has been called already (guid in hash table) - we don't call it.
    @brief      Trigger events for a given page when it is shown.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.callEvents = function(p_events,p_hashtracker)
{
	var l_called = false;
	
	//alert("MetaWrap.View.callEvents");
	
	for(var i = 0; i < p_events.length;i++)
	{
		if (p_hashtracker != null)
		{
			if (p_hashtracker[p_events[i].m_guid])
			{
				continue;
			}
		}
		
		//alert("call " + p_events[i].m_guid);
	
		//alert("MetaWrap.View.callAspectEvent '" + p_aspect + "' '" + p_event + "' #" + i);
		//trace("call '" + p_aspect + "' '" + p_event + "' " + i);
		//MetaWrap.doCall(l_aspect_events[i],null,something)
		
		p_events[i].m_fn();
		
		if (p_hashtracker != null)
		{
			p_hashtracker[p_events[i].m_guid] = true;
		}
		
		l_called = true;
	}
	
	return l_called;
}

// TODO: Bind these to a page or set of aspects such that when the page or aspects are shown, we can walk through the bindings

/*!
    @class      MetaWrap.View.Map = function(p_id,p_target,p_content)
    @brief      
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map = function(p_id,p_target,p_template_node,p_parents)
{
	if (p_parents == null)
	{
		p_parents = [];
	}

	this.m_id = p_id;
	this.m_target = p_target;	
	this.m_template_node = p_template_node;	
	this.m_rendered = false;		
	// TODO: test this.m_parents = p_parents || []
	
	// The list of maps that contains this map
	this.m_parents = p_parents;
	
	// All the bindings that use this map
	this.m_bindings = [];
}

// Array of maps that have been rendered in the current session
MetaWrap.View.Map.g_rendered = [];

/*!
    @fn   MetaWrap.View.Map.resetRendered = function()
    @brief      Clear all the maps that have been rendered in this session
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.resetRendered = function()
{
	for(var b = 0;b<MetaWrap.View.Map.g_rendered.length;b++)
	{		
		MetaWrap.View.Map.g_rendered[b].reset();
	}	
	
	MetaWrap.View.Map.g_rendered = [];
}

/*!
    @fn             MetaWrap.View.Map.doFXForRendered = function()
    @brief      Run any transition effects on the rendered items
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.doFXForRendered = function()
{
	for(var b = 0;b<MetaWrap.View.Map.g_rendered.length;b++)
	{		
		var l_map = MetaWrap.View.Map.g_rendered[b];
		
		//debug("#" + b + " rendered " + l_map.m_id + "." + l_map.m_target);

		var l_element = MetaWrap.$(l_map.m_id);
		
		var l_fx = MetaWrap.View.m_aspect_show_effects;

		for(var e = 0;e < l_fx.length;e++)
		{
			l_fx[e](l_element);
		}	
		
	}	
}


/*!
    @fn             MetaWrap.View.Map.prototype.parentsMapsContainsModifiedBindings = function()
    @brief      Return true if any of this maps parents contain bindings that have updates that need to be rendered
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.prototype.parentsMapsContainsModifiedBindings = function()
{
	// Now for each of the parent maps
	for(var p = 0;p<this.m_parents.length;p++)
	{		
		// get the map
		var l_map = this.m_parents[p];
	
		// Looka at their bindings and find out of they have changed
		for(var b = 0;b<l_map.m_bindings.length;b++)
		{
			// get the binding
			var l_binding = l_map.m_bindings[b];
			
			// Work out if we contains any modifi
			//l_contains_modified_bindings = (l_binding.thisOrParentsMapsContainsModifiedBindings() || l_contains_modified_bindings);
			
			if (l_binding.thisOrParentsMapsContainsModifiedBindings())
			{
				return true;
			}
		}
	}
}
/*!
    @fn   MetaWrap.View.Map.reset = function()
    @brief      Clear all the maps that have been rendered in this session
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.prototype.reset = function()
{
	//trace("reset " + this.fullName());

	this.m_rendered = false;
}

/*!
    @fn    
    @brief      
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.prototype.fullName = function()
{
	return this.m_id + "." + this.m_target;
}


/*!
    @fn    	      MetaWrap.View.Map.prototype.renderDirect = function()
    @brief      Directly renders map without question or any clever logic.
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.prototype.renderDirect = function()
{
	var l_element = MetaWrap.$(this.m_id);
	
	//alert("renderDirect this.m_id = " + this.m_id + " this.m_target = " + this.m_target);

	if (l_element != null)
	{
	
		//
		// Perform substitutions
		//
		
		var l_matches = null;
		
		//alert(this.m_template_node.xml);
		
		var l_is_attribute = (this.m_target.charAt(0) == "@");
		
		var l_attribute_name = "";
		
		// TODO: can we make do with 1 copy?
		var l_content = "";		
		
		if (l_is_attribute)
		{
			//l_attribute_name = this.m_target.substring(1);
			//alert(l_attribute_name);
			//alert(this.m_template_node.xml);
			//alert(this.m_template_node.value);
			l_content = this.m_template_node.value;			
			//alert(l_content);
		}
		else
		{
			l_content = MetaWrap.XML.Node.getInnerXml(this.m_template_node); //this.m_template_node.xml;
		}
		
		var l_original = l_content;
		
		//warn("              this.m_template_node = " + MetaWrap.XML.Node.getInnerXml(this.m_template_node));
		//warn("              l_content = " + l_content);		
		//warn("              this.m_template_node.xml = " + this.m_template_node.xml);		
		
		//alert(l_original);

		while(l_matches = MetaWrap.View.g_variable_substitution.exec( l_content ))
		{
			var l_match = l_content.substring(l_matches.index+2,MetaWrap.View.g_variable_substitution.lastIndex -1 );
			
			try
			{
				//var l_value = eval(l_match);		
				var l_value = MetaWrap.View.Binding.Expression.findOrCreate(l_match).evaluate().m_current_value;				
				//alert("match = " + l_match + " = " + eval(l_match));	

				l_match = l_match.replace(/\(/, "\\(");
				l_match = l_match.replace(/\)/, "\\)");
				l_match = l_match.replace(/\?/, "\\?");
				l_match = l_match.replace(/\|/, "\\|");
				
				var l_regex = new RegExp("\\{\\$" + l_match + "\\}","gi");
				
				l_original = l_original.replace(l_regex, l_value)
				
				//alert(l_original);										
			}
			catch(l_e)
			{
				error("unable to find substitution match for {$" + l_match + "}");					
			}
		}
		
		// Normalise checkbox logic
		l_original = l_original.replace(MetaWrap.View.g_checkbox_substitution,"");			
		
		//alert(l_original);										

		warn("RENDER " + this.fullName() + " " + l_content + " AS " + l_original);
		
		//var l_first = this.m_template_node.substring(l_matches.index+2,MetaWrap.View.g_variable_substitution.lastIndex -1 );
		
		if (l_is_attribute)
		{			
			
			//var l_target = this.m_target.substring(1);
			//alert("ATTRIBUTE " + this.m_target.substring(1) + " = " + l_original);
									
			l_element.setAttribute(this.m_target.substring(1),l_original);

		}
		else
		{	
/*		
			//warn("               this.m_id = " + this.m_id);		
			//warn("              l_original = " + l_original);
			//warn("           this.m_target = " + this.m_target);
			
			{			
				warn("BEFORE l_element[this.m_target] = " + l_element[this.m_target]);
			}	
*/		
			// apply the map
			l_element[this.m_target] = l_original;
			
			//alert(l_original);
/*			
			//if (l_original != l_element[this.m_target])
			{										
				warn("AFTER l_element[this.m_target] = " + l_element[this.m_target]);
			}	
*/			
						
		}
		
	
		// mark as rendered
		this.m_rendered = true;
		
		// remember that this has been rendered		
		MetaWrap.View.Map.g_rendered.push(this);
	}
	else
	{
		error("MetaWrap.View.Map.prototype.render: unable to find element '" + this.m_id + "' for map " + this.fullName() + "");
		
		return false;
	}
	
	// Return true
	return true;
}

/*!
    @fn    	      MetaWrap.View.Map.prototype.render = function()
    @brief      Smart render of Map. If the map has parents that also needs to be rendered it will render the best one of those.
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Map.prototype.render = function()
{

	// If we have already been rendered - then there is nothing to be done
	if (this.m_rendered)
	{
		// we have already been rendered - so we don't care
		return true;
	}
	
	// If it has no parents, then render it
	if (this.m_parents.length == 0)
	{
		// No parents and we need to render this map - so we render it
		this.renderDirect();
	}
	else	
	{
		// If any of the parents bindings have changed then we want to try and render the parents
		
		// If our parent does not contain modified bindings...
		if (!this.parentsMapsContainsModifiedBindings())
		{			
			//debug("Contains NO modified bindings " + this.fullName() + " " + this.m_template_node.xml );
			// so we should just render this directly
			this.renderDirect();
			
			return true;		
		}
		else
		{
			//debug("Contains modified bindings " + this.m_id + "." + this.m_target + " " + this.m_template_node.xml );
		
			// Any parents we render, will render this - and maybe others so they are worth more bang for buck - so lets try all our parents first
			for(var m = 0;m<this.m_parents.length;m++)
			{	
				/*
				//debug("parent " + m + " " + l_map_parent.m_id + "." + l_map_parent.m_target + " EXPRESSION " + " CONTENT = " + l_map_parent.m_template_node.nodeValue );
				
				if (this.m_parents[m].m_rendered)
				{
					warn("parent " + this.m_parents[m].fullName() + " is already rendered");
				}
				else
				{
					trace("parent " + this.m_parents[m].fullName() + " is NOT already rendered");					
				}
				*/
				
				// Render all the parents first we declare that this has been rendered if any of the parents were rendered
				this.m_rendered = (this.m_parents[m].render() || this.m_rendered);
				
				// If any parent renders - then we can get out of here. becuase it means we have by implication rendered this map, which was contained inside our parent
				if (this.m_rendered == true)
				{
					return true;
				}
			}	
						
			// Now - if none of our parents rendered - its because they didn't need to be rendered because they contains no 
			// modified bindings - so if we need  to render this  map (and if we are here, then that means we need to, then we should render this one directly).		
			if (!this.rendered)
			{				
				warn("no parents rendered");
				// So we render this one directly.
				this.renderDirect();					
			}
		}
	}
	
	return this.m_rendered;
}



// Hash table that assoaciates variable names with bindings
MetaWrap.View.g_variable_bindings = [];


// All the bindings that are active
MetaWrap.View.g_bindings = [];


/*!
    @class      MetaWrap.View.Binding = function(p_map,p_expression)
    @brief      Constructor for a binding
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Binding = function(p_map,p_expression)
{
	// The map that contains the template that will act as the binding tenplate
	this.m_map = p_map;
	
	// The name of the variable that is the topic of this binding
	this.m_expression = p_expression;
	
	// Add this binding to this variable
	if (MetaWrap.View.g_variable_bindings[this.m_expression] == null)
	{
		MetaWrap.View.g_variable_bindings[this.m_expression] = [];
	}
	
	// Reocord this binding against this variable name
	MetaWrap.View.g_variable_bindings[this.m_expression].push(this);	
	
	// Record this binding
	MetaWrap.View.g_bindings.push(this);	
}

// Used to generate unque binding ids
MetaWrap.View.Binding.g_binding_counter = 0;




/*!
    @fn              MetaWrap.View.Binding.getOrAddElementIdAttribute = function(p_node)
    @brief      Find an existing element id or generate and add a new one
    @author    James Mc Parlane
    @date        24 Jan 2009
*/
MetaWrap.View.Binding.getOrAddElementIdAttribute = function(p_node)
{
	var l_id = p_node.getAttribute("id");
	
	if (l_id == null)
	{						
		l_id = "varbind_" + (MetaWrap.View.Binding.g_binding_counter++);
		
		p_node.setAttribute("id",l_id);
		
		//debug("new id = " + l_id);
	}
	
	return l_id;
}

/*!
    @fn             MetaWrap.View.Binding.prototype.thisOrParentsMapsContainsModifiedBindings = function()
    @brief      Return true if this or any of the other bindings have changed value
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Binding.prototype.thisOrParentsMapsContainsModifiedBindings = function()
{		
	// get the result of this expression
	var l_expression = MetaWrap.View.Binding.Expression.findOrCreate(this.m_expression);
		
	// if this binding has changed
	if (l_expression.changed())
	{
		//debug("'" + this.m_expression + "' has changed from '" + l_expression.m_previous_value + "' to '" + l_expression.m_current_value + "'");
				
		// then return true so signify that this binding's expression has changed value
		return true;
	}	

	// now look at all the parent maps and check their bindings.
	var l_contains_modified_bindings = false;
	
	// Now for each of the parent maps
	for(var p = 0;p<this.m_map.m_parents.length;p++)
	{		
		// get the map
		var l_map = this.m_map.m_parents[p];
	
		// Looka at their bindings and find out of they have changed
		for(var b = 0;b<l_map.m_bindings.length;b++)
		{
			// get the binding
			var l_binding = l_map.m_bindings[b];
			
			// If any of the parents contain modified bindings ...
			if (l_binding.thisOrParentsMapsContainsModifiedBindings())
			{
				// ..then we have matched our criteria and can exit with true
				return true;
			}
		}
	}
	
	// Nothing contained modified bindings.
	return false;
}


/*!
    @fn             MetaWrap.View.Binding.prototype.render = function()
    @brief      Render this binding intelligently. If its map has already rendered - we do nothing. And we only render it if its expression has changed.
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Binding.prototype.render = function()
{
	// Get the current value
	var l_variable_current_value = "";
	
	if (this.m_map.m_rendered)
	{
		//warn("already rendered " + this.m_map.m_target + " " + "for " + this.m_expression );
		return;
	}
		
	// Get an expression object
	var l_expression = MetaWrap.View.Binding.Expression.findOrCreate(this.m_expression);
	
	// if the results of that expression has changed since the expression cache was last updated
	if (l_expression.changed())
	{	
		//warn("We should render " + this.m_map.fullName() + " because '" + this.m_expression + "' has changed from '" + l_expression.m_previous_value + "' to '" + l_expression.m_current_value + "'");	
		// render the map
		this.m_map.render();
	}
}



/*!
    @class      MetaWrap.View.Binding.Expression = function(p_expression)
    @brief      Represents an expression
    @author    James Mc Parlane
    @date        22 Jan 2009
*/
MetaWrap.View.Binding.Expression = function(p_expression)
{
	// Remember the expression
	this.m_expression = p_expression;	
	
	
	this.evaluate();
	this.reset();

}

// Hash table of expressions
MetaWrap.View.Binding.Expression.g_expressions = {};

/*!
    @fn  	     MetaWrap.View.Binding.Expression.resetAll = function()
    @brief      Reset all expressions in the cache
    @author     James Mc Parlane
    @date       27 January 2009
*/
MetaWrap.View.Binding.Expression.resetAll = function()
{
	// get a reference to the array
	var l_ge = MetaWrap.View.Binding.Expression.g_expressions;

	// for each item in the array
	for(var l_e in l_ge)
	{
		//warn("reset " + l_e);
	
		// reset it
		l_ge[l_e].reset();				
	}
}

/*!
    @fn  	     MetaWrap.View.Binding.Expression.prototype.reset = function()
    @brief      Reset the expression
    @author     James Mc Parlane
    @date       27 January 2009
*/
MetaWrap.View.Binding.Expression.prototype.reset = function()
{
	// If we have been evaluated during this run
	if (this.m_evaluated)
	{
		// set our previous value to our current value
		this.m_previous_value = this.m_current_value;
		
		// mark that we need to be evaluated to find the new current value.
		this.m_evaluated = false;
	}
}

/*!
    @fn  	     MetaWrap.View.Binding.Expression.prototype.evaluate = function()
    @brief      Evaluate the expression
    @author     James Mc Parlane
    @date      27 January 2009
*/
MetaWrap.View.Binding.Expression.prototype.evaluate = function()
{
	// If we have not been evaluated
	if (!this.m_evaluated)
	{	
		
		//warn("EVALUATE '" + this.m_expression  + "' was '" + this.m_current_value + "'");
		
		// then... evaluate
		this.m_current_value = MetaWrap.eval(this.m_expression,"FAIL!");	
		
		
		//warn("EVALUATE '" + this.m_expression  + "' is now '" + this.m_current_value + "'");
		
		// And mark us as having been evaluated so we don't do this again
		this.m_evaluated = true;
	}
	
	return this;
}


/*!
    @fn  	     MetaWrap.View.Binding.Expression.prototype.changed = function()
    @brief      Return true if this expression has changed
    @author     James Mc Parlane
    @date       27 January 2009
*/
MetaWrap.View.Binding.Expression.prototype.changed = function()
{
	// Evaluate it (if we have already evaluated then it won't be done again - we cache our answer)
	this.evaluate();
	
	//warn("CHANGED '" + this.m_previous_value  + "' =?= '" + this.m_current_value + "'");

	// Compare to get the answer
	return (this.m_current_value != this.m_previous_value);
}


/*!
    @fn  	     MetaWrap.View.Binding.Expression.findOrCreate = function(p_expression)
    @brief      Find or create this expression cache
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Binding.Expression.findOrCreate = function(p_expression)
{
	// get the expression
	var l_expression = MetaWrap.View.Binding.Expression.g_expressions[p_expression];

	// if it does not exist...
	if (l_expression == null)
	{
		// Make the new expression
		l_expression = new MetaWrap.View.Binding.Expression(p_expression);
		
		// Add it to our cache
		MetaWrap.View.Binding.Expression.g_expressions[p_expression] = l_expression;
	}

	return l_expression;
}


MetaWrap.View.Page.g_aspect_counter = 1;

MetaWrap.View.Page.prototype.allocateAspect = function (p_aspect_element)
{
	// make sure it has an id
	//var l_id = p_aspect_element.parentNode.getAttribute('id');	
	var l_id = p_aspect_element.getAttribute('id');

	if (l_id == null)
	{
		//l_id = "mw_aspect_id" + MetaWrap.View.m_id;
		l_id = "mw_aspect_id_" + MetaWrap.View.m_id + "_" + (MetaWrap.View.Page.g_aspect_counter++);

		//alert("set id to " + l_id);
		//p_aspect_element.parentNode.setAttribute("id",l_id);
		p_aspect_element.setAttribute("id",l_id);
	}
	
	var l_aspect_name = p_aspect_element.getAttribute('name');
	
	if (l_aspect_name == null)
	{
		fatal("aspect without a name.");		
	}
	
	// Now create the aspect		
	var l_aspect = this.addAspect(l_aspect_name);

	return l_aspect;
}

/*!
    @fn  	     MetaWrap.View.Page.prototype.extractAspects = function()
    @brief      Extract all the aspects from this page
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.extractAspects = function()
{
	
	if (IS_IE)
	{
		//alert(this.m_markup_document.getProperty("SelectionLanguage"));	
		// Make sure the browser knows we mean XPATH
		this.m_markup_document.setProperty("SelectionLanguage", "XPath");
	}
	
	// locate all the aspects in this page
	//var l_source_aspectspans = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE? "//xhtml:span[@class='aspect']" : "//span[@class='aspect']");	
	var l_source_aspectspans = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE? "//xhtml:*[@class='aspect' or contains(@class,' aspect ')]" : "//*[@class='aspect' or contains(@class,'aspect')]");
	
	
	if (IS_IE)
	{
		//alert(this.m_markup_document.getProperty("SelectionLanguage"));	
		// Make sure the browser knows we mean XPATH
		this.m_markup_document.setProperty("SelectionLanguage", "XSLPattern");
	}
	
	
	//alert("l_source_aspectspans.length  = " + l_source_aspectspans.length);
	// This will contain out sorted spans
	var l_depth_sorted_aspectspans = [];
	
	//
	// First pass - we walk all the aspects and create a dependency tree such that each aspect knows all of its children
	//
	
	var l_parent_aspect_map_ids = [];
	
	// copy into array so we can sort it
	for(var i = 0;i<l_source_aspectspans.length;i++)
	{
		// Get the element
		var l_aspect_element = l_source_aspectspans[i];
		
		// create the aspect and allocate an id to it
		var l_aspect = this.allocateAspect(l_aspect_element);
		
		// get the id of the aspect - this is what we want to tell to our parent
		//var l_aspect_element_map_id = l_aspect_element.parentNode.getAttribute('id');
		var l_aspect_element_map_id = l_aspect_element.getAttribute('id');
		
		//trace("l_aspect_element_map_id = " + l_aspect_element_map_id);
		
		
		// create an object that represents the aspect and the map_id that this element represents - this will be added to each parent m_map is there so we can use it as a quick lookup cache
		//var l_aspect_map = {m_aspect:l_aspect,m_map_id:l_aspect_element_map_id,m_map:null};
		var l_aspect_map = new MetaWrap.View.Page.Aspect.AspectMap(l_aspect,l_aspect_element_map_id);
		
		//debug("aspect " + l_aspect.m_name + " id = " + l_aspect_element_map_id);
		
		// the parent element
		var l_parent_aspect_element = l_aspect_element.parentNode;
				
		
		while(l_parent_aspect_element != null)
		{
			if (l_parent_aspect_element.nodeType == 1) // ELEMENT_NODE
			{
				// get the class so we we can work out if this contains an aspect
				var l_parent_aspect_element_class = l_parent_aspect_element.getAttribute("class");
				
				// If this parent is an aspect
				if (l_parent_aspect_element_class == "aspect")
				{
					
					// get the parent aspect
					var l_parent_aspect = this.allocateAspect(l_parent_aspect_element);
					
					// get the id allocated to this aspect
					//var l_parent_aspect_map_element_id = l_parent_aspect_element.parentNode.getAttribute('id');
					var l_parent_aspect_map_element_id = l_parent_aspect_element.getAttribute('id');
					
					// If we need an aspect map for this map id
					if (l_aspect.m_all_parent_aspect_maps[l_aspect_element_map_id] == null)
					{
						// create one
						l_aspect.m_all_parent_aspect_maps[l_aspect_element_map_id] = [];
					}
					
					var l_parent_aspect_map = new MetaWrap.View.Page.Aspect.AspectMap(l_parent_aspect,l_parent_aspect_map_element_id);
					
					// this is a parent of l_aspect so add the aspect map pair				
					l_aspect.m_all_parent_aspect_maps[l_aspect_element_map_id].push(l_parent_aspect_map);
				
					//trace("parent aspect " + l_parent_aspect.m_name + " id = " + l_parent_aspect_map_element_id);
					
					// So this gets a little complicatd - but here it goes
					
					// The parent aspect needs to know, that for one of its given maps (signified by id)  what map does it contain and what aspects do these come from?
					
					// So if we don't have a container in this parent for this current element's aspect map
					if (l_parent_aspect.m_all_child_aspect_maps[l_parent_aspect_map_element_id] == null)
					{
						// the create an empty container
						l_parent_aspect.m_all_child_aspect_maps[l_parent_aspect_map_element_id] = [];
					}
					
					// Now we add a reference to this aspect/map_id pair so that we know what aspect and what map is contained inside of it
					l_parent_aspect.m_all_child_aspect_maps[l_parent_aspect_map_element_id].push(l_aspect_map);
					
				}
			}
		
			// Walk up to the next parent
			l_parent_aspect_element = l_parent_aspect_element.parentNode;
		}

		// Now go to to each patent
		
		// copy into new array
		l_depth_sorted_aspectspans[i] = l_source_aspectspans[i];		
	}
	
	// sort it
	l_depth_sorted_aspectspans.sort(MetaWrap.XML.Node.compareDepthDescending);
	
	//alert("l_depth_sorted_aspectspans.length  = " + l_depth_sorted_aspectspans.length);

	// for each of the link elements we found
	for(var i = 0;i<l_depth_sorted_aspectspans.length;i++)
	{
		var l_aspect_element = l_depth_sorted_aspectspans[i];
	
		//var l_id = l_aspect_element.parentNode.getAttribute('id');
		var l_id = l_aspect_element.getAttribute('id');

		var l_aspect_name = l_aspect_element.getAttribute('name');
		
		
		var l_aspect_depth = MetaWrap.XML.Node.depth(l_aspect_element);
		
		if (MetaWrap.View.g_debug)
		{
			debug("aspect " + l_id  + " " + l_aspect_name + " is " + l_aspect_depth);
		}
		
		// get the aspect
		var l_aspect = this.addAspect(l_aspect_name);
		

		// extract its bindings
		l_aspect.extractBindings(l_aspect_element);		
				
		// add this mapping
		//l_aspect.addMap(l_id,"innerHTML",l_aspect_element.xml,l_aspect_depth);
		
		//alert("l_aspect_element.InnerXml = " + MetaWrap.XML.Node.getInnerXml(l_aspect_element));
		
		l_aspect.addMap(l_id,"innerHTML",MetaWrap.XML.Node.getInnerXml(l_aspect_element),l_aspect_depth);
				
		// remove the element
		//l_aspect_element.parentNode.removeChild(l_aspect_element);
		
		//debug("IS_IE = " + IS_IE);
		
		// Empty the element		
		if (IS_IE)
		{
			l_aspect_element.text = "";
		}
		else
		{		
			MetaWrap.gut(l_aspect_element);
		}
		
		
		
			//debug(l_element.nodeName);
			// show it
			//l_aspect_element.style.display = "hide";		
		

	}

}


/*!
    @fn  	    MetaWrap.View.Page.prototype.renderBindings = function()
    @brief      Render the page but first it scans for aspects and componnets and wires them up
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.renderBindings = function()
{
	

	for(var l_aspect_name in this.m_aspects)
	{
		//trace("renderBindings for ASPECT " + l_aspect_name);
		
		// do we have it already?
		var l_aspect = this.m_aspects[l_aspect_name];
		
		l_aspect.renderBindings();				
	}
	
	
}



/*!
    @fn  	    MetaWrap.View.Page.prototype.render = function()
    @brief      Render the page but first it scans for aspects and componnets and wires them up
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.prototype.render = function()
{
	//debug("MetaWrap.View.Page.prototype.render");

	//debug(g_bid);

	// Make sure we are known
	MetaWrap.View.m_pages[this.m_name] = this;

	// Make sure we know what page we are operating on
	MetaWrap.View.m_current_page = this.m_name;
	
	//debug("this.m_markup_document.xml = " + this.m_markup_document.xml);	

	// Get a reference to the title in the source
	var l_source_title = this.m_markup_document.selectSingleNode(g_XPATH_NEEDS_NAMESPACE ? "xhtml:html/xhtml:head/xhtml:title" : "html/head/title");
	//alert("l_source_title = " + l_source_title.text);
		

	if (l_source_title == null)
	{
		warn("unable to find title in document");
	}
	else
	{
		// Copy the title from source to destination
		document.title = l_source_title.text;
	}

	// Get a reference to the head where we will be setting links
	var l_destination_head = document.getElementsByTagName("head")[0];

	// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS

	// Get all the links in the source XML
	var l_source_links = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE ? "xhtml:html/xhtml:head/xhtml:link" : "html/head/link");

	//trace("adding " + l_source_links.length + " links");

	// for each of the link elements we found
	for(var i = 0;i<l_source_links.length;i++)
	{

		// Get a reference to the link
		var l_link = l_source_links[i];

		// Get the href
		var l_link_href = l_link.getAttribute('href');

		//debug(l_link_href);

		// Make the link
		var l_link_node = document.createElement('link');

		// populate it
		l_link_node.type = l_link.getAttribute('type');
		l_link_node.rel = l_link.getAttribute('rel');

		// Look for absolute references
		if ((l_link_href.indexOf("http") == 0) || (l_link_href.indexOf("/") == 0))
		{
			// If its absolute - we just take it as it is
			l_link_node.href = l_link.getAttribute('href');
		}
		else
		{
			// if its relative - then adjust for the location
			l_link_node.href = this.m_path  +  "/" + l_link_href;
		}

		// Get the media - default is screen
		l_link_node.media = l_link.getAttribute('screen') == null? "screen" : l_link.getAttribute('screen');

		// add it
		l_destination_head.appendChild(l_link_node);
	}

	//
	// Links
	//

	// Get all the links in the source XML
	var l_source_scripts = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE ? "xhtml:html/xhtml:head/xhtml:script" : "html/head/script");

	//trace("adding " + l_source_scripts.length + " scripts");

	// for each of the link elements we found
	for(var i = 0;i<l_source_scripts.length;i++)
	{

		// Get a reference to the link
		var l_script = l_source_scripts[i];

		// get its src value
		var l_script_src = l_script.getAttribute('src');

		//debug(l_script_src);

		// we only add it if its external
		if (l_script_src != null)
		{
			// Make the link
			var l_script_node = document.createElement('script');

			// get its type
			l_script_node.type = l_script.getAttribute('type');

			// get its language
			l_script_node.language = "JavaScript";

			// Look for absolute references
			if ((l_script_src.indexOf("http") == 0) || (l_script_src.indexOf("/") == 0))
			{
				// If its absolute - we just take it as it is
				l_script_node.src = l_script_src;
			}
			else
			{
				// if its relative - then adjust for the location
				l_script_node.src = this.m_path  +  "/" + l_script_src;
			}

			// add it
			l_destination_head.appendChild(l_script_node);
		}
	}


	//
	// input image src
	//

	// Get all the links in the source XML
	var l_inputs = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE ? "//xhtml:input[@type='image']" : "//input[@type='image']");

	//trace("adding " + l_inputs.length + " images");

	// for each of the link elements we found
	for(var i = 0;i<l_inputs.length;i++)
	{

		// Get a reference to the input element
		var l_input = l_inputs[i];

		// get its src value
		var l_input_src = l_input.getAttribute('src');

		alert("l_input_src = " + l_input_src);

		l_input.setAttribute('src',this.m_path + this.m_path_char + l_input_src);

		//l_src_src.value =  this.m_path + this.m_path_char + l_src_src

	}

	// Get the body element (this will not work after extractAspects because of the poperty we set on the the document to make xpath:contains(s1,s2)  work.
	var l_source_body = this.m_markup_document.selectSingleNode(g_XPATH_NEEDS_NAMESPACE ? "xhtml:html/xhtml:body" : "html/body");
	
	
	///////////////////////////////////////
	//
	// Aspects
	//

	this.extractAspects();
	
	//
	//
	//////////////////////////////////////


	
	
	/////////////////////////////////////
	//
	// What do we need to remove?
	//

	// Remove all the mock spans
	var l_source_mockspans = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE ? "//xhtml:*[@class='mock']" : "//*[@class='mock']");

	//alert("removing " + l_source_mockspans.length + " mock spans");

	// for each of the link elements we found
	for(var i = 0;i<l_source_mockspans.length;i++)
	{
		// remove it
		//l_source_mockspans[i].parentNode.parentNode.removeChild(l_source_mockspans[i].parentNode);
		l_source_mockspans[i].parentNode.removeChild(l_source_mockspans[i]);
	}
	
	//
	//
	//////////////////////////////
	
	//var l_bindings = [];
	
	/////////////////////////////////////
	//
	//  What do  we need to bind to at load time?
	//
	
	/*
	// Remove all the mock spans
	var l_source_bindonloaddivs = this.m_markup_document.selectNodes(g_XPATH_NEEDS_NAMESPACE ? "//xhtml:div[contains(@class,'bindonload')]" : "//div[contains(@class,'bindonload')]");

	//alert("bindonload " + l_source_bindonloaddivs.length + " bindonload spans");
	
	this.m_onload_binding_ids = [];

	// for each of the link elements we found
	for(var i = 0;i<l_source_bindonloaddivs.length;i++)
	{
		
		var l_id = l_source_bindonloaddivs[i].getAttribute('id');

		if (l_id == null)
		{
			//l_id = "mw_aspect_id" + MetaWrap.View.m_id;
			l_id = "mw_bindonload_id_" + MetaWrap.View.m_id + "_" + i;
			
		}
		
		alert("l_id " + l_id);	

		this.m_onload_binding_ids[this.m_onload_binding_ids.length] = l_id;		
	}	
	*/

	//
	//
	//////////////////////////////

	
	
	
	//alert("this.m_markup_document " + this.m_markup_document.xml);

	if (l_source_body  != null)
	{
		//alert(l_source_body.xml);

		//trace("transfer body into this document");

		var l_destination_body = document.body;
		
		var l_destination_body_div = MetaWrap.$("destination_body");
		
		if (l_destination_body_div != null)
		{
			l_destination_body = l_destination_body_div;
		}
		
		
		if (l_destination_body != null)
		{
			//trace("start pouring");

			// http://www.thescripts.com/forum/thread167679.html
			// http://www.456bereastreet.com/archive/200501/the_perils_of_using_xhtml_properly/
			// http://www.codingforums.com/archive/index.php?t-66401.html
			

			// Can we use the fast way
			if (document.importNode)
			{
				//debug("about to pour in new document using appendChild");
				//alert("nice");
			
				var l_cloned_body = document.importNode(l_source_body, true);

				//alert("l_cloned_body = " + l_cloned_body);

				// Clear out the contents
				MetaWrap.gut(l_destination_body);

				// Add the new contents
				l_destination_body.appendChild(l_cloned_body);
				
				//debug("poured in new document using appendChild");
			}
			else
			{
			
				warn("poured in new document using innerHTML");
				// No we have to use the slow clunky way
				
				//\{\$[a-zA-Z_]+\}
				
				//alert("clunkly");

				// Copy the content in
				l_destination_body.innerHTML = l_source_body.xml;
				
				//warn("poured in new document using innerHTML");
				
				
			}
			//alert(document.innerHTML);
			
			var l_fx = MetaWrap.View.m_page_open_effects;
			
			//alert(MetaWrap.View.m_page_open_effects.length);
		
			for(var e = 0;e < l_fx.length;e++)
			{
				l_fx[e](this);
			}
		}
		else
		{
			error("unable to find local document body");
		}

	}
	else
	{
		error("failed to find body element");
		//alert(this.m_markup_document.xml);
	}
	
}





/*!
    @class  	MetaWrap.View.Page.Delta = function(p_page,p_name,p_in_page)
    @brief      Declare the MetaWrap.View.Page.Delta class
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Delta = function(p_page,p_name,p_in_page)
{
	// Reference to tha page that this delta is part of
    this.m_page = p_page;

    // The name of the delta
    this.m_name = p_name;

    // The delta mappings
    this.m_maps = null;

	// If this is true then this delta came from a page
    this.m_in_page = p_in_page || false;

	// If we have a page
    if (this.m_page != null)
    {
		// add this as a fregment
		this.m_page.m_deltas[p_name] = this;
	}

	//alert(this.m_in_page);

	// start with no url
	this.m_delta_url = null;

	// If this delta did not come from a page, then we load it as a delta delta
	if (!this.m_in_page)
	{
		this.m_delta_url =  this.m_page.m_path + this.m_page.m_path_char +  "deltas" + this.m_page.m_path_char + this.m_name  + ".xml";

		// If we are doing direct file access  - make sure we build and absolute path with
		// file: so that we can feed that into the xml fetch - it will need to run different
		// code to fetch xml from the filesystem
		if (location.protocol == "file:")
		{
			this.m_delta_url =  "file://" + this.m_page.m_file_path + this.m_delta_url;
		}
		else
		if (MetaWrap.View.m_cache_bypass)
		{
			// Add optional cache bypass
			this.m_delta_url += "?v=" + (new Date()).getTime();
		}

		trace(this.m_delta_url);
	}

	//"?v=" + (new Date()).getTime();
}


/*!
    @fn  	MetaWrap.View.Page.Delta.prototype.addMap = function(p_id,p_target,p_content)
    @brief      Add a delta mapping.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Delta.prototype.addMap = function(p_id,p_target,p_content,p_depth)
{
	//alert("Page.Delta.addMap " + p_id + " " + p_target + " " + p_content);

	if (this.m_maps == null)
	{
		this.m_maps = [];
	}

	this.m_maps[this.m_maps.length]	 = {id:p_id,target:p_target,content:p_content,rendered:false,depth:p_depth};
	
	//alert("this.m_maps.length = " + this.m_maps.length);
}



/*!
    @fn  	MetaWrap.View.Page.Delta.prototype.render = function()
    @brief      Render the delta
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Delta.prototype.render = function()
{

	// Do we have a display map?
	if (this.m_maps == null)
	{
		// If not - go off and get it
		this.m_maps = MetaWrap.View.loadMaps(this.m_delta_url);
	}

	    // Now display the maps
	return MetaWrap.View.renderMaps(this.m_maps);
}



/*
 *  Aspects
 */



/*!
    @class  	MetaWrap.View.Page.Aspect = function(p_page,p_name,p_target)
    @brief      Declare the MetaWrap.View.Page.Aspect class
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect = function(p_page,p_name)
{
	// if this is is true then this aspect is active
	this.m_active = false;

	// Reference to tha page that this aspect is part of
    this.m_page = p_page;

    // The name of the aspect
    this.m_name = p_name;

    // The aspect mappings
    this.m_maps = null;
	
	// Maps path names onto maps (used to find maps we already have in this fragment)
	this.m_var_binding_maps = {};

	// maps a variable name into a an array of bindings.
	this.m_var_bindings = {};

	// Array of bindings that are part of this aspect
	this.m_bindings = [];

	/*  
		As an aspect have have serveral maps visual dependsency in the html tree is represented by an aspect/map_id pair.
	*/
	
	// An hash array of the maps per aspect that are contained under this aspect's map. 
	this.m_all_child_aspect_maps = {};

	// An array of the maps per aspect that are containedabove this aspect's map.  
	this.m_all_parent_aspect_maps = {};

    // If this is in a failed state - then we need to re-display it
    this.m_failed = false;
	
	
	// If this is true then this aspect came from a page
    //this.m_in_page = p_in_page || false;

	// If we have a page
    if (this.m_page != null)
    {
		// add this as a fregment
		this.m_page.m_aspects[p_name] = this;
	}

	/*
	// This is from when we could load aspects from XML - will probbaly need to add this back
	// when we get the server to pre-generate all the aspects from the source templates

	//alert(this.m_in_page);

	// start with no url
	this.m_aspect_url = null;

	// If this aspect did not come from a page, then we load it as a aspect delta
	if (!this.m_in_page)
	{
		this.m_aspect_url =  this.m_page.m_path + this.m_page.m_path_char +  "aspects" + this.m_page.m_path_char + this.m_name  + ".xml";

		// If we are doing direct file access  - make sure we build and absolute path with
		// file: so that we can feed that into the xml fetch - it will need to run different
		// code to fetch xml from the filesystem
		if (location.protocol == "file:")
		{
			this.m_aspect_url =  "file://" + this.m_page.m_file_path + this.m_aspect_url;
		}
		else
		if (MetaWrap.View.m_cache_bypass)
		{
			// Add optional cache bypass
			this.m_aspect_url += "?v=" + (new Date()).getTime();
		}

		trace(this.m_aspect_url);
	}
	*/
}

/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.renderBindings = function()
    @brief      Render all the bindings for this aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.renderBindings = function()
{
	if (this.m_active)
	{
		// Two strategies , 
		
		// 1) if you are rendering all then better to render all the root maps by drilling down till there are no parents - then all the encompasing children are rendered by defacto.
		// 2) if you are rendering known expressions then try and find the minimal spanning set my marking maps that contain them first - then do the above but treat as sparse tree of marked items
		
		//debug(this.m_name + " has " + this.m_bindings.length + " bindings");

		for(var b = 0;b<this.m_bindings.length;b++)
		{
			var l_binding = this.m_bindings[b];	

			//debug("binding " + b + " " + l_binding.m_map.m_id + "." + l_binding.m_map.m_target + " EXPRESSION " + l_binding.m_expression + " CONTENT = " + l_binding.m_map.m_template_node.xml );
			
			// Render all the bindings (if the map has a an encompasing parent, render it instead).
			l_binding.render();
		}	

		// reset all the binding maps for this aspect
		this.resetBindingMaps();
	}	
	else
	{
		
	}
}

/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.renderBindings = function()
    @brief      Render all the bindings for this aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.resetBindingMaps = function()
{
	for(var l_m in this.m_var_binding_maps)
	{
		//debug("RESET " + l_m);
		
		var l_map = this.m_var_binding_maps[l_m];
		
		l_map.reset();
	}	
}



/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.addMapAndBinding = function(p_id,p_expression,p_target,p_content)
    @brief      For this apspect, add a Map (if it does not already exist) and create a binding for this p_expression (variable)
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.addMapAndBinding = function(p_id,p_expression,p_target,p_template_node,p_parent_maps)
{
	//alert("addMapAndBinding " + p_template_node);
	// This is the map that we create ,or find if it already exists.
	var l_map = null;
	
	var l_path = p_id + "." + p_target;

	// If we don't have the map
	if (this.m_var_binding_maps[l_path] == null)
	{
		// create the map
		l_map = new MetaWrap.View.Map(p_id,p_target,p_template_node,p_parent_maps);
	
		// add it
		this.m_var_binding_maps[l_path] = l_map;
	}
	else
	{
		// get the map
		l_map = this.m_var_binding_maps[l_path];
	}
		
	
	// If we have no hash for this binding array for this expression
	if (this.m_var_bindings[p_expression] == null)
	{
		this.m_var_bindings[p_expression] = [];
	}
	
	// Create the new binding.
	var l_binding = new MetaWrap.View.Binding(l_map,p_expression);
					
	// add this binding
	this.m_var_bindings[p_expression].push(l_binding);

	// add this binding to our list
	this.m_bindings.push(l_binding);

	// add this binding to our maps list
	l_map.m_bindings.push(l_binding);
	
	// return binding
	return l_binding;
}

/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.extractBindings = function(p_node)
    @brief      For this apspect, add a Map (if it does not already exist) and create a binding for this p_expression (variable)
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.extractBindings = function(p_node,p_parent_maps)
{
	//debug("extractBindings");
	
	var l_parent_maps = null;
	
	if (p_parent_maps == null)
	{
		p_parent_maps = [];
		l_parent_maps = [];
	}
	else
	{	
		// Make a copy of the current parent maps array
		l_parent_maps = MetaWrap.copyArray(p_parent_maps);
	}
	
	//debug("l_parent_maps.length = " + l_parent_maps.length);
	
	// The map that was created for the innerhtml of this node. 
	// We keep track of this because we need to tell all the child nodes that this is their parent. 
	// That we we know that if we need to render any of the child nodes, if the parent has been rendered already - we don't need to render the child
	// as it would have been written out again in an updated form in the innerhtml
	var l_node_innerhtml_map = null;
	
	// We want to examine all the child nodes for embedded expressions, so lets start with the first one
	var l_child = p_node.firstChild;
	
	// This is the id of the element 
	var l_id = "";
	
	// Now walk through all the text children of p_node 
	// We do this first because we need to generate a list of all the parent maps
	while(l_child != null)
	{
		if (l_child.nodeType == 3) // TEXT_NODE
		{
			// This is the Regex matches object. 
			var l_matches = null;
			
			// Expressions we have added
			var l_expression_binding = {};
			
			// extract all the expression escaping sequences for the content of this node
			while(l_matches = MetaWrap.View.g_variable_substitution.exec(l_child.nodeValue))
			{
				// get the match name out from the {$ and } delimiters
				var l_expression = l_child.nodeValue.substring(l_matches.index+2,MetaWrap.View.g_variable_substitution.lastIndex -1 );
				
				// Make sure we don't add the same binding twice
				if (l_expression_binding[l_expression] == null)
				{				
					//debug("l_expression = " + l_expression);
					
					// We need the id now, so if we don't know it...
					if (l_id == "")
					{			
						// go off and get it or generate one.. 
						l_id = MetaWrap.View.Binding.getOrAddElementIdAttribute(p_node);
					}
					
					var l_binding = this.addMapAndBinding(l_id,l_expression,"innerHTML",p_node,p_parent_maps);
					
					// now add the map and binding and add it to our tracking hash
					l_expression_binding[l_expression] = l_binding;
					
					if (l_node_innerhtml_map == null)
					{
						l_node_innerhtml_map = l_binding.m_map;
						//trace("new innerhtmlmap " + l_binding.m_map.m_id + " " + l_binding.m_map.m_target + " " + l_binding.m_map.m_template_node.xml);
					}
/*					
					else
					{
						warn("existing innerhtmlmap " + l_binding.m_map.m_id + " " + l_binding.m_map.m_target + " " + l_binding.m_map.m_template_node.xml);
					}
*/					
					
				}
			}			
		}
	
		// Now lets look at the next child
		l_child = l_child.nextSibling;
	}
	
	
	if (l_node_innerhtml_map != null)
	{
		//trace("new parent = " + l_node_innerhtml_map.m_id + " " + l_node_innerhtml_map.m_target + " " + l_node_innerhtml_map.m_template_node.xml);
		l_parent_maps.push(l_node_innerhtml_map);
	}

	// start again...
	l_child = p_node.firstChild;	
	
	// Now walk through all the children of p_node
	while(l_child != null)
	{
		// If the child is an element..
		if (l_child.nodeType == 1) // ELEMENT_NODE
		{
			// we want to extract its bindings - this is deepest first - we want to find the minimal spanning elements that contain the expression
			this.extractBindings(l_child,l_parent_maps);
		}
	
		// Now lets look at the next child
		l_child = l_child.nextSibling;
	}
	
	
	
	//debug("p_node = " +  p_node.nodeName);
	
	if (p_node.nodeType == 1) // ELEMENT_NODE
	{
		// if we have no attrbutes, then bugger off
		if (p_node.attributes != null)
		{
			// get the attrbutes array
			var l_attributes = p_node.attributes;
		
			// cache the total number
			var l_attributes_total = l_attributes.length;
		
			for(var a = 0;a<l_attributes_total;a++)
			{
				// Get the attribute of the moment
				var l_attribute = l_attributes[a];
				
				// Get its name
				var l_attribute_name = l_attribute.nodeName;				
				
				// Get its value
				var l_attribute_value = l_attribute.nodeValue;
				
				// If its the id, then we want to skip it.
				if ((l_attribute_name == "id") || (l_attribute_name == "ID"))
				{
					l_id = l_attribute_value;
				}
				else
				{					
					// This is the Regex matches object. 						
					var l_matches = null;
					
					// extract all the expression escaping sequences
					while(l_matches = MetaWrap.View.g_variable_substitution.exec(l_attribute_value))
					{
						// get the match name out from the {$ and } delimiters
						var l_expression = l_attribute_value.substring(l_matches.index+2,MetaWrap.View.g_variable_substitution.lastIndex -1 );
						
						//debug("l_expression = " + l_expression);
						
						// We need the id now, so if we don't know it...
						if (l_id == "")
						{			
							// go off and get it or generate one.. n (if its generated and added, we expect it to be on the end of the p_node.attributes array) 
							// which will mean that l_attributes_total will not included it, but we want to miss it anyway.
							l_id = MetaWrap.View.Binding.getOrAddElementIdAttribute(p_node);
						}
						
						// now add the map and binding
						var l_binding = this.addMapAndBinding(l_id,l_expression,"@" + l_attribute.nodeName,l_attribute,p_parent_maps);
					}
				}
			}
		}
	}
	
	
	
}


/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.addMap = function(p_id,p_target,p_content)
    @brief      Add a map to this aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.addMap = function(p_id,p_target,p_content,p_depth)
{
	//alert("Page.Aspect.addMap " + p_id + " " + p_target + " " + p_content);

	if (this.m_maps == null)
	{
		this.m_maps = [];
	}

	this.m_maps[this.m_maps.length]	 = {id:p_id,target:p_target,content:p_content,rendered:false,depth:p_depth};
	
	//alert("this.m_maps.length = " + this.m_maps.length);
}


/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.findMapById = function(p_id)
    @brief      Find a map based on its id
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.findMapById = function(p_id)
{
	
	if (this.m_maps != null)
	{	
		for(var i = 0;i < this.m_maps.length;i++)
		{
			if (this.m_maps[i].id == p_id)
			{
				return this.m_maps[i];
			}
		}
	}
	
	return null;

}

/*!
    @fn  		MetaWrap.View.Page.prototype.findAspectByMapId = function(p_id)
    @brief      	Find a map based on its id
    @author     	James Mc Parlane
    @date       	22 July 2007
*/
MetaWrap.View.Page.prototype.findAspectByMapId = function(p_id)
{	
	// For each aspect
	for(var a in this.m_aspects)
	{
		var l_aspect = this.m_aspects[a];

		if (l_aspect.m_maps != null)
		{
			for(var m = 0;m < l_aspect.m_maps.length;m++)		
			{
				if (l_aspect.m_maps[m].id == p_id)
				{
					return l_aspect;
				}
			}
		}
	}
	
	return null;
}




/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.render = function()
    @brief      Render the aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.render = function()
{
	/*
	// This is from when we could load aspects from XML - will probbaly need to add this back
	// when we get the server to pre-generate all the aspects from the source templates
	// Do we have a display map?
	if (this.m_maps == null)
	{
		// If not - go off and get it
		this.m_maps = MetaWrap.View.loadMaps(this.m_aspect_url);
	}
	*/

	//alert("render aspect '" + this.m_name + "'");
	
	// This sapect is now active
	this.m_active = true;

    // Now display the maps
	return MetaWrap.View.renderMaps(this.m_maps);
}


/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.render = function()
    @brief      Render the aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.teardown = function()
{
	/*
	// This is from when we could load aspects from XML - will probbaly need to add this back
	// when we get the server to pre-generate all the aspects from the source templates
	// Do we have a display map?
	if (this.m_maps == null)
	{
		// If not - go off and get it
		this.m_maps = MetaWrap.View.loadMaps(this.m_aspect_url);
	}
	*/

	//alert("teardown aspect '" + this.m_name + "'");

    // Now display the maps
	MetaWrap.View.teardownMaps(this.m_maps);
	
	// This aspect is now not active
	this.m_active = false;

}


/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.getMaps = function(p_array)
    @brief      Return the maps for this aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.getMaps = function(p_array)
{
	for(var l_id = 0;l_id < this.m_maps.length;l_id++)
	{
		p_array[p_array.length] = this.m_maps[l_id];	
	}
}

/*!
    @fn  	MetaWrap.View.Page.Aspect.prototype.getMapsByRenderState = function(p_array,p_rendered)
    @brief      Return the maps for this aspect
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.prototype.getMapsByRenderState = function(p_array,p_rendered)
{
	for(var l_id = 0;l_id < this.m_maps.length;l_id++)
	{
		var l_map = this.m_maps[l_id];
		
		if (l_map.rendered == p_rendered)
		{
			p_array[p_array.length] = l_map;	
		}
	}
}


/*!
    @class  	MetaWrap.View.Page.Aspect.AspectMap = function(p_aspect,p_map_id)
    @brief      Represents an aspect, map_id pair.
    @author     James Mc Parlane
    @date       22 July 2007
*/
MetaWrap.View.Page.Aspect.AspectMap = function(p_aspect,p_map_id)
{
	// The aspect
	this.m_aspect = p_aspect;
	
	// The map element id
	this.m_map_id = p_map_id;
	
	// A reference to map object (used for caching lookups)
	this.m_map = null;
}


/*
	Component View
*/

/*
	Delta Aspect
*/

//  Start the history tracking timer up
MetaWrap.View.m_location_hash_timer = window.setTimeout(MetaWrap.View.CheckLocationHash, 500);

/*!
 *@} endgroup mw_javascript_lib_view MetaWrap - JavaScript - View
 */

/*!
 *@} end of MetaWrap.View
 */

