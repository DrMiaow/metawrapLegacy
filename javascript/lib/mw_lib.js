/*

    @file mw_lib.js

    $Id: mw_lib.js,v 1.64 2007/09/27 08:24:06 james Exp $

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

    MetaWrap is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

    MetaWrap.Class code based on Base by Dean Edwards

    Base, version 1.0.2
    Copyright 2006, Dean Edwards
    License: http://creativecommons.org/licenses/LGPL/2.1/

*/

/*
 * $Log: mw_lib.js,v $
 * Revision 1.64  2007/09/27 08:24:06  james
 * Made some changes to start wiring up object model to view
 *
 * Revision 1.63  2007/09/14 05:05:00  james
 * FTP issue resolved
 *
 * Revision 1.62  2007/08/13 09:53:40  james
 * New behaviors
 *
 * Revision 1.61  2007/07/25 10:24:14  james
 * Added XML fragments to views
 *
 * Revision 1.60  2007/04/21 07:14:07  james
 * working towards allowing multiple parallel states
 *
 * Revision 1.59  2007/04/03 12:40:17  james
 * Fixed include system
 *
 * Revision 1.58  2007/04/03 08:15:02  james
 * Latest updates to JavaScript lib - getting some kruft cleared out.
 *
 * Revision 1.57  2007/03/15 02:32:42  james
 * Updates based on changes introduced in last project
 *
 * Revision 1.4  2007/03/02 19:43:27  james
 * Syncronisation  Now Works!
 *
 * Revision 1.3  2007/02/25 12:22:40  james
 * Got attach - detatch and layout generation functioning - issues with talking to flash that needs to be investicated.
 *
 * Revision 1.2  2007/02/02 08:41:21  james
 * Got home page element working and basic component system
 *
 * Revision 1.56  2007/01/18 08:24:53  james
 * Radical change to package mechanism
 *
 * Revision 1.55  2007/01/14 13:05:05  james
 * Looking into adding "storage" to base
 *
 * Revision 1.54  2006/12/21 07:42:24  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.53  2006/12/20 10:47:14  james
 * Latest version of the js library
 *
 * Revision 1.52  2006/12/09 06:33:58  james
 * Working on getting in place editing working
 *
 * Revision 1.51  2006/11/11 06:38:20  james
 * Some javascript tweaks and changes
 *
 * Revision 1.50  2006/10/22 08:40:14  james
 * Creating simple in page editing class
 *
 * Revision 1.49  2006/09/21 05:19:37  james
 * Latest changes
 *
 * Revision 1.3  2006/09/18 08:37:01  james
 * Added latest macro recorder files...
 * Added macro recorder to index_demo.html
 *
 * Revision 1.57  2006/08/28 11:55:37  james
 * Latest updates
 *
 * Revision 1.48  2006/07/01 08:06:56  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.47  2006/05/31 13:09:02  james
 * Latest version
 *
 * Revision 1.46  2006/05/31 12:44:59  james
 * Changed package formal
 *
 * Revision 1.45  2006/05/30 10:53:48  james
 * *** empty log message ***
 *
 * Revision 1.44  2006/05/30 10:49:19  james
 * Latest version of libraries with package support.
 *
 *
 * Revision 1.42  2006/05/23 13:40:51  james
 * http needs to handle 404 when file is not there
 *
 * Revision 1.41  2006/05/17 11:47:59  james
 * Macro recorder fixes
 *
 * Revision 1.40  2006/05/16 04:56:31  james
 * Created simple cypher object and testcases
 *
 * Revision 1.39  2006/05/06 09:33:01  james
 * More refactoring
 *
 * Revision 1.38  2006/05/06 08:28:27  james
 * More refactoring
 *
 * Revision 1.37  2006/05/05 14:25:00  james
 * solved loading isssue - now need to edit each file with correct
 * dependencies
 *
 * Revision 1.36  2006/04/26 12:55:41  james
 * Made it easier to include metawrap js libraries
 * Starting ong load example (xml)
 *
 * Revision 1.35  2006/04/18 07:59:54  james
 * Got scrolling working on playback - now for document wide selection
 *
 * Revision 1.34  2006/04/05 12:20:34  james
 * Text selection is nor recording properly for mozilla and IE
 *
 * Revision 1.33  2006/03/29 06:41:22  james
 * Latest macro recorder
 *
 * Revision 1.32  2006/03/28 12:30:22  james
 * One bug remaining - when an IFRAME is loaded with an href, its not being loaded
 * into a new frame object
 *
 * Revision 1.31  2006/03/27 09:50:19  james
 * Now forming locations in well formed manner in IE and Firefox
 *
 * Revision 1.30  2006/03/27 01:45:23  james
 * events now recording (location handles in longhand)
 * Now need to get shorthand id based locations working again
 *
 * Revision 1.29  2006/03/26 06:51:45  james
 * Getting macro events working across iframes -
 * have proof of concept for Mozilla - now need
 * to get it working in IE.
 *
 * Revision 1.28  2006/03/26 02:24:09  james
 * Code tidy up.
 * Can now look for new iframes on every recorded event.
 * Ready now to start hooking into sub frames - even dynamic ones.
 *
 * Revision 1.27  2006/03/25 04:39:24  james
 * Made macro recorder more stable
 * Made event hooks multiple document aware
 * Added per element/event event handlers for simulation
 *
 * Revision 1.25  2006/02/05 13:18:52  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.24  2005/12/23 10:23:42  james
 * Latest round of work on the rendering pipeline
 *
 * Revision 1.23  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.22  2005/10/26 14:18:16  james
 * Modified pipeline so that it can have multiple fallbacks
 *
 * Revision 1.21  2005/09/26 13:36:28  james
 * Fixed issue with Netscape6
 *
 * Revision 1.20  2005/09/26 12:34:11  james
 * Fixed an issue in Safari - and of course I'm not detecting Geko, but Mozilla.
 *
 * Revision 1.19  2005/09/26 11:55:05  james
 * Emulating a Mozilla Quirk
 *
 * Revision 1.18  2005/09/26 08:27:18  james
 * Added a simple way of specifying js librray search paths.
 *
 * Revision 1.17  2005/09/26 03:42:57  james
 * Includes working in Mozilla and Opera - Safari next.
 * Because of the way that firefox preserves existing inline/assigned
 * listeners, need to look into how this is handled under other browsers.
 *
 * Revision 1.16  2005/09/25 13:47:26  james
 * Added automatic javascript namespace/object dependancy
 * resolution so that you can just include top level namespace
 * js libs and they can specify what else is required and load the
 * files in the correct order.
 *
 * Improved MetaWrap.Page.Element.addEventListener so that
 * it deals with existing listeners that have been added by asignment
 * or by inlining.
 *
 * Revision 1.15  2005/09/23 22:06:46  james
 * Fixed issue with splice in IE5
 *
 * Revision 1.12  2005/09/23 07:34:36  james
 * Tidied up some of the comments.
 *
 * Revision 1.11  2005/09/22 06:48:39  james
 * Added support for IE5
 *
 * Revision 1.10  2005/09/22 04:29:08  james
 * Making lib quieter for competition
 *
 * Revision 1.9  2005/09/21 16:59:00  james
 * Latest snapshot
 *
 * Revision 1.8  2005/09/21 13:41:46  james
 * Mode code tidy up.
 * Added competiton solution page
 *
 *
 * Revision 1.4  2005/09/21 02:29:52  james
 * Updated license. Linking exeception was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.3  2005/07/24 08:24:51  james
 * Working on macro editor
 *
 * Revision 1.2  2005/07/15 08:31:33  james
 * Able to uniquely describe element by DOM location
 *
 * Revision 1.6  2005/07/06 14:27:01  james
 * Filling out unit test suite
 *
 * Revision 1.5  2005/07/03 13:09:09  james
 * latest bits
 *
 * Revision 1.4  2005/06/12 14:27:55  james
 * Objectising javascript XSLT lib.
 *
 * Revision 1.3  2005/06/12 08:02:28  james
 * getting everything into objects
 *
 * Revision 1.2  2005/02/24 21:11:15  james
 * Tweaking Javascript Library
 *
 * Revision 1.1  2005/02/24 07:35:42  james
 * Wrong location.... fix.
 *
 * Revision 1.1  2005/02/21 09:40:25  james
 * The MetaWrap JavaScript library lives again!
 *
 */


/*! \mainpage

<h3>MetaWrap - JavaScript Library</h3>


<p>The library is structured such that functionality can be defined using the traditinal OO approach
layering object interfaces and functionality via object heirarchy.</p>

<p>A set of heiarchical namespaces divide the library as a whole into a set of logical groups</p>



*/

/*! \page mw_javascript_lib MetaWrap - JavaScript
 *
 * \subsection mw_javascript_lib Overview
 *
 */


// used for debugging
//alert("$Id: mw_lib.js,v 1.64 2007/09/27 08:24:06 james Exp $");

/*! \defgroup mw_javascript_lib  MetaWrap - JavaScript
 *@{
 */

/*! @name Solve Some Fundamantal Browser Issues */
//@{


/*!
    @fn         function debug(p_msg)
	@param		p_msg Message to display
    @brief      Debugging routine
    @author     James Mc Parlane
    @date       10 June 2005
*/
function debug(p_msg)
{
    //window.status = "DEBUG: " + p_msg;
    //alert("DEBUG: " + p_msg);
}

/*!
    @fn         function error(p_msg)
	@param		p_msg Message to display
    @brief      Error routine
    @author     James Mc Parlane
    @date       10 June 2005
*/
function error(p_msg)
{
    //alert("ERROR: " + p_msg);
}

/*!
    @fn         function trace(p_msg)
	@param		p_msg Message to display
    @brief      Trace routine
    @author     James Mc Parlane
    @date       10 June 2005
*/
function trace(p_msg)
{
    //window.status = "TRACE: " + p_msg;
    //alert(p_msg);
}

/*!
    @fn         function trace(p_msg)
	@param		p_msg Message to display
    @brief      Trace routine
    @author     James Mc Parlane
    @date       10 June 2005
*/
function warn(p_msg)
{
    //window.status = "WARN: " + p_msg;
}

/*!
    @fn         function trace(p_msg)
	@param		p_msg Message to display
    @brief      Trace routine
    @author     James Mc Parlane
    @date       10 June 2005
*/
function fatal(p_msg)
{
    //window.status = p_msg;
    //alert("FATAL: " + p_msg);
}



/*!
    @fn         function ASSERT(p_cond,p_msg)
	@param		p_cond The flag that determines if we don't display p_msg
	@param		p_msg Message to display
    @brief      If p_cond is not true then display p_msg
    @author     James Mc Parlane
    @date       10 June 2005
*/
function ASSERT(p_cond,p_msg)
{
    if (!p_cond)
    {
        alert("ASSERT:" + p_msg);
    }
}


 //
 // Some fundamental browser incompatibility issues
 //

 // Ensure that we have 'undefined' MacOSXIE5.2 does not seem to define it
 try
 {
    // If we acess undefined and we crash (like in IE5.2 on OSX)....
    if (undefined != null)
    {
        error("This browser does not have undefined null loose equivalance.");
    }
 }
 catch(l_e)
 {
    // Then we define our own 'undefined'
    var undefined = null;
 }

//@}

/*! @name  Browser Version Detection */
//@{

/* @brief The name of the newest Microsoft XMLHTTP Object that we support

    Possible values

    Msxml2.XMLHTTP
    Microsoft.XMLHTTP
*/
var g_ms_latest_xml_request_object_name = "MSXML2.XMLHTTP.4.0";

/*! @brief The name of the safest and most commonly distributed (with IE5 and above) Microsoft XMLHTTP Object that we support*/
var g_ms_safe_xml_request_object_name = "Microsoft.XMLHTTP";

/*! @brief The name of the Microsoft XSLT Document Object we want to use

 Possible values

 Msxml2.XMLDOM
 Microsoft.XMLDOM
 Msxml2.DOMDocument.4.0
 Msxml2.DOMDocument.5.0
 Msxml3.DOMDocument.5.0

 3.0 Is default under XP
*/
var g_ms_latest_xml_DOM_object_name = "Msxml2.DOMDocument.3.0";

/*! @brief The name of the Microsof XSLT Document Object we want to use*/
var g_ms_latest_xml_XSLTPROC_object_name = "MSXML2.XSLTemplate.3.0";

/*! @brief The name of the Microsof XSLT Document Object we want to use*/
var g_ms_latest_xml_XSLT_object_name = "MSXML2.FreeThreadedDOMDocument.3.0";

/*! @brief The name of the Microsoft XML Document Object we want to use */
var g_ms_safest_xml_DOM_object_name = "Microsoft.XMLDOM";

/*!   @brief        Tells us which browser we are running */
var g_bid = "Unknown";

/*!   @brief        Tells us which browser engine we are running */
var g_beng = "Unknown";

/*!   @brief        Tells us which operating system we are running */
var g_bOS = "";

/*!   @brief        Tells us which browser version  */
var g_bver = 0;

/*!   @brief        XmlDocument implementation style*/
var g_bxmldoc = "Unknown";

var l_browser_signature = navigator.userAgent.toLowerCase();
var l_browser_type;
var l_browser_type_location;


//alert(l_browser_signature);

function checkIt(p_string)
{
    return l_browser_type_location = (l_browser_signature.indexOf(l_browser_type = p_string) + 1);
}




//
// Look for generic engines first
//

if (checkIt('oreganmediabrowser'))
{
    //g_bid = "oreganmediabrowser";
	//g_beng = "Gekco";
    g_bid = "Onyx";
	g_beng = "OreganMediaBrowser";
}
else
if (checkIt('webkit'))
{
    g_bid = "Webkit";
	g_beng = g_bid;

	if (checkIt('arora'))
	{
		g_bid = "Webkit";
	}
	else
	if (checkIt('safari'))
	{
		g_bid = "Safari";
	}

}
else
if (checkIt('opera'))
{
    g_bid = "Opera";
	g_beng = g_bid;
}
else
if (checkIt('msie'))
{
    g_bid = "IE";
	g_beng = g_bid;
}
else
if (!checkIt('compatible'))
{
    g_bid = "Mozilla";
	g_beng = g_bid;
    g_bver = l_browser_signature.charAt(8);
}
else
{
    g_bid = "Unknown";
}
if (!g_bver)
{
    g_bver = l_browser_signature.charAt(l_browser_type_location + l_browser_type.length);
}


if (!g_bOS)
{
    if (checkIt('linux'))
    {
        g_bOS = "Linux";
    }
    else
    if (checkIt('x11'))
    {
        g_bOS = "Unix";
    }
    else
    if (checkIt('mac'))
    {
        g_bOS = "Mac"
    }
    else
    if (checkIt('win'))
    {
        g_bOS = "Windows"
    }
    else
    {
        OS = "an unknown operating system";
    }
}

var IS_IE = (g_bid == "IE");

// http://www.gnu.org/licenses/lgpl.html (c) Ruben Daniels
var TAGNAME = IS_IE ? "baseName" : "localName";

//Browser Detection
IS_SAFARI = navigator.userAgent.toLowerCase().indexOf("safari") != -1 || navigator.userAgent.toLowerCase().indexOf("konqueror") != -1;
IS_SAFARI_OLD = false;
if(IS_SAFARI)
{
	var matches = navigator.userAgent.match(/AppleWebKit\/(\d+)/);
	if(matches) IS_SAFARI_OLD = parseInt(matches[1]) < 420;
}
IS_OPERA = navigator.userAgent.toLowerCase().indexOf("opera") != -1;
IS_GECKO = !IS_SAFARI && navigator.userAgent.toLowerCase().indexOf("gecko") != -1;



var g_XPATH_NEEDS_NAMESPACE = false;

if (g_bid == "Mozilla")
{
	g_XPATH_NEEDS_NAMESPACE = true;

	if (checkIt('lg browser') || checkIt('multi-browser'))
	{
		g_bid = "LGTVBrowser";
		//alert(l_browser_signature);
	}

}

if (g_bid == "Opera")
{
	g_XPATH_NEEDS_NAMESPACE = true;
}

/*! @brief  Our array of required objects */
var g_required_paths = new Array();

/*!
    @func       function MwPath(p_file_path)
    @param      p_file_path The path to add
    @return     void
    @brief      Add a search path
    @author     James Mc Parlane
    @date       19 October 2002
    @todo       Make this happen automagically
*/
function MwPath(p_file_path)
{
    // Add a path to the array
    //alert("add path " + p_file_path);

    g_required_paths[g_required_paths.length] = p_file_path;
}

// We always look in the local directory
//MwPath("");


/*!
    @func       function MwFetchAndExec(p_js_url)
    @param      p_js_url The url to fetch
    @return     boolean true if we loaded the file, false if we loaded nothing.
    @brief      Checks to make sure that an object exists, if not provides a warning.
    @author     James Mc Parlane
    @date       19 October 2002
*/
function MwFetch(p_js_url)
{
	// work out the URL that we are fetching
	var l_js_url = p_js_url;

	// Choose a HTTP request object the primitive way
	var l_transport =  MetaWrap.Try
	(
		function() {return new ActiveXObject('Msxml2.XMLHTTP')},
		function() {return new ActiveXObject('Microsoft.XMLHTTP')},
		function() {return new XMLHttpRequest()}
	);

	//alert("try " + g_required_paths[l_path] + p_filename);

	// Get it - we want to wait
	l_transport.open("GET",l_js_url,false);

	// Start the download
	l_transport.send(null);

	// On readystate 4 - we are complete
	if (l_transport.readyState == 4)
	{
		//alert(l_transport.responseText);

		// Evaluate our include file
		return l_transport.responseText;
	}

	return "";
}




/*!
    @func       function MwFetchAndExec(p_js_url)
    @param      p_js_url The url to fetch
    @return     boolean true if we loaded the file, false if we loaded nothing.
    @brief      Checks to make sure that an object exists, if not provides a warning.
    @author     James Mc Parlane
    @date       19 October 2002
*/
function MwFetchAndExec(p_js_url)
{
	var l_script = "";

	trace("loading " + p_js_url);

/*

    // Appcelerator


remoteInclude = function (url) {
    var httpClient = Titanium.Network.createHTTPClient();
 
    httpClient.onload = function (e) {
        var tempFile = Titanium.Filesystem.createTempFile();
        tempFile.write(this.responseText);
 
        Titanium.include(tempFile.nativePath);
 
        tempFile.deleteFile();
    };
 
    httpClient.open("GET", url);
    httpClient.send();
}

*/


	try
	{
		// work out the URL that we are fetching
		try
		{
			l_script = MwFetch(p_js_url);
		}
		catch(l_e)
		{
			error("GET failed to load from " + p_js_url + " " + MetaWrap.exceptionMessage(l_e));
			// Try the direct include method
			//var l_script = '<script language="JavaScript" type="text/javascript" src="' + p_js_url + '"><\/script>';
			//document.write(l_script);

			//alert(l_script);
			return true;
		}

		try
		{
			// Evaluate our include file
			eval(l_script);
			return true;
		}

		catch(l_e)
		{
			error("EVAL failed to load from " + p_js_url + " " + MetaWrap.exceptionMessage(l_e));
			return false;
		}
	}
	catch(l_e)
	{
		error("UNKNOWN failure loading from " + p_js_url + " " + MetaWrap.exceptionMessage(l_e));
	}

	return false;
}



/*!
    @func       function MwInclude(p_filename)
    @param      p_filename The filename of the required javascrip file
    @return     boolean true if we loaded the file, false if we loaded nothing.
    @brief      Checks to make sure that an object exists, if not provides a warning.
    @author     James Mc Parlane
    @date       19 October 2002
*/
function MwInclude(p_filename)
{
    //alert(p_filename);

    // If we are loading from a package, it contains all the files we need to satisfy dependencies
    if (MetaWrap.m_eval_package)
    {
        return;
    }

	// if we have been given a filepath
	if (p_filename.indexOf("/") != -1)
	{
		return MwFetchAndExec(p_filename);
	}
	else
	{

		// We try to fetch from each of the suggested paths
		for(var l_path = g_required_paths.length-1;l_path >= 0;l_path--)
		{
			if (MwFetchAndExec(g_required_paths[l_path] + p_filename))
			{
				return true;
			}
		}
	}

    error("Unable to locate \"" + p_filename + "\"");

    // Return result
    return false;
}



/*!
    @func       function MwUse(p_object,p_lib_file)
    @param      p_object The namespace we want to use
    @return     p_lib_file (optional) The file name of the javascript library that will load the require onject
    @brief      Checks to make sure that an object exists, if not provides a warning.
    @author     James Mc Parlane
    @date       19 October 2002

    If p_lib_file is not defined, we can generate it magically from p_object
*/
function MwUse(p_namespace,p_lib_file)
{
    //alert(p_namespace);

    // Make sure we have pre-requisite namespaces
    try
    {
        if (p_lib_file == null)
        {
            p_lib_file = p_namespace;
            p_lib_file = p_lib_file.replace(/MetaWrap/gi,"mw_lib");
            p_lib_file = p_lib_file.replace(/\./gi,"_") + ".js";

            p_lib_file = p_lib_file.toLowerCase();

            //alert(p_lib_file);
        }
        else
        {
			// if we end with .js
			if (p_lib_file.indexOf(".js") == (p_lib_file.length-3))
			{
				//alert(p_lib_file + " ends with js");
			}
			else
			{
				//alert(p_lib_file + " does not end with js");


				var l_lib_file = p_namespace;
				l_lib_file = l_lib_file.replace(/MetaWrap/gi,"mw_lib");
				l_lib_file = l_lib_file.replace(/\./gi,"_") + ".js";

				p_lib_file += l_lib_file.toLowerCase();

				//alert(p_lib_file);
			}

		}

        // Try any get the type of the object, if the objects parent exist, but the object does not then it will be undefined.
        // If the parent does not exist, then an exeception will be thrown
        if (eval("MetaWrap.typeOf(window." + p_namespace + ")") != "undefined")
        {
            // We got a valid type - then all is good and there is nothing more to be done?
            return true;
        }
    }
    catch(l_e)
    {
        // Threw an exception - somthing is up - we need to include that library.
    }

    //alert("Missing namespace/object "  + p_object + ".\r\nAuto including " + p_lib_file);
    return MwInclude(p_lib_file);
}


/*!
    @func       function MwPackage(p_path,p_array)
    @param      p_path Path from which to load the files in the package
    @param      p_name Name of the package
    @return     p_array Array of namespaces to import
    @brief      Import a package
    @author     James Mc Parlane
    @date       19 October 2002

    EG

    MwPackage(
        "http://localhost/metawrap/javascript/tests/",
        "com.metawrap",
        [
            "MetaWrap.Logger",
            "MetaWrap.Network",
            "MetaWrap.Cookie",
            "MetaWrap.Page",
            "MetaWrap.Page.Event",
            "MetaWrap.Page.Selection",
            "MetaWrap.Page.Event.Simulate",
            "MetaWrap.Page.Element",
            "MetaWrap.Page.Element.Addhandler",
            "MetaWrap.Page.Output",
            ["MetaWrap.Xml","http://localhost/metawrap/javascript/tests/xml/mw_lib_xml.js"]
            "MetaWrap.Xml.Serialise",
            "MetaWrap.Tester"
        ],
        [
        "http://localhost/metawrap/javascript/tests/logging/",
        "http://localhost/metawrap/javascript/tests/page/",
        "http://localhost/metawrap/javascript/tests/network/",
        "http://localhost/metawrap/javascript/tests/cookie/",
        "http://localhost/metawrap/javascript/tests/xml/",
        "http://localhost/metawrap/javascript/tests/tester/"
        ]
        );


MwPackage(
    "/live_race_engine/js/",
    "com.metawrap",
    [
        ["MetaWrap.Network",                    "/live_race_engine/js/mw_lib_network.js"],
        ["MetaWrap.Cookie",                     "/live_race_engine/js/mw_lib_cookie.js"],
        ["MetaWrap.Page",                       "/live_race_engine/js/mw_lib_page.js"],
        ["MetaWrap.Page.Event",                 "/live_race_engine/js/mw_lib_page_event.js"],
        ["MetaWrap.Page.Selection",             "/live_race_engine/js/mw_lib_page_selection.js"],
        ["MetaWrap.Page.Event.Simulate",        "/live_race_engine/js/mw_lib_page_event_simulate.js"],
        ["MetaWrap.Page.Element",               "/live_race_engine/js/mw_lib_page_element.js"],
        ["MetaWrap.Page.Element.Addhandler",    "/live_race_engine/js/mw_lib_page_element_addhandler.js"],
        ["MetaWrap.Page.Output",                "/live_race_engine/js/mw_lib_page_output.js"],
        ["MetaWrap.Xml",                        "/live_race_engine/js/mw_lib_xml.js"],
        ["MetaWrap.Xml.Serialise",              "/live_race_engine/js/mw_lib_xml_serialise.js"],
        ["MetaWrap.Tester",                     "/live_race_engine/js/mw_lib_tester.js"],
        ["MetaWrap.Massive",              						"/live_race_engine/mw_lib_massive.js"],
        ["MetaWrap.Massive.example",              				"/live_race_engine/mw_lib_massive_example.js"],
        ["MetaWrap.Massive.example.V8",              			"/live_race_engine/mw_lib_massive_example_v8.js"],
        ["MetaWrap.Massive.example.V8.Championshippoints",     	"/live_race_engine/mw_lib_massive_example_v8_championshippoints.js"],
        ["MetaWrap.Massive.example.V8.Roundpoints",				"/live_race_engine/mw_lib_massive_example_v8_roundpoints.js"],
        ["MetaWrap.Massive.example.V8.Car",       				"/live_race_engine/mw_lib_massive_example_v8_car.js"],
		["MetaWrap.Massive.example.V8.Team",       				"/live_race_engine/mw_lib_massive_example_v8_team.js"],
        ["MetaWrap.Massive.example.V8.Driver",       			"/live_race_engine/mw_lib_massive_example_v8_driver.js?v=2"],
        ["MetaWrap.Massive.example.V8.TrackPosition",       	"/live_race_engine/mw_lib_massive_example_v8_trackposition.js"],
        ["MetaWrap.Massive.example.V8.Leaderboard",				"/live_race_engine/mw_lib_massive_example_v8_leaderboard.js"],
        ["MetaWrap.Massive.example.V8.LeaderboardPosition",     "/live_race_engine/mw_lib_massive_example_v8_leaderboardposition.js"],
        ["MetaWrap.Massive.example.V8.Component",       		"/live_race_engine/mw_lib_massive_example_v8_component.js"],
        ["MetaWrap.Massive.example.V8.Component.Header",       	"/live_race_engine/mw_lib_massive_example_v8_component_header.js"],
        ["MetaWrap.Massive.example.V8.Component.Footer",       	"/live_race_engine/mw_lib_massive_example_v8_component_footer.js"],
        ["MetaWrap.Massive.example.V8.Component.Panel",       	"/live_race_engine/mw_lib_massive_example_v8_component_panel.js"],
        ["MetaWrap.Massive.example.V8.Component.Welcome",       "/live_race_engine/mw_lib_massive_example_v8_component_welcome.js"],
		["MetaWrap.Massive.example.V8.Component.Schedule",      "/live_race_engine/mw_lib_massive_example_v8_component_schedule.js"],
        ["MetaWrap.Massive.example.V8.Component.Video",       	"/live_race_engine/mw_lib_massive_example_v8_component_video.js"],
        ["MetaWrap.Massive.example.V8.Component.Tracker",      	"/live_race_engine/mw_lib_massive_example_v8_component_tracker.js"],
		["MetaWrap.Massive.example.V8.Component.Telemetry",   	"/live_race_engine/mw_lib_massive_example_v8_component_telemetry.js"],
		["MetaWrap.Massive.example.V8.Component.Livetiming",   	"/live_race_engine/mw_lib_massive_example_v8_component_livetiming.js"],
		["MetaWrap.Massive.example.V8.Component.Controlpanel",  "/live_race_engine/mw_lib_massive_example_v8_component_controlpanel.js"],
        ["MetaWrap.Massive.example.V8.State",       			"/live_race_engine/mw_lib_massive_example_v8_state.js"],
        ["MetaWrap.Massive.example.V8.Countdown",   			"/live_race_engine/mw_lib_massive_example_v8_countdown.js"],
        ["MetaWrap.Massive.example.V8.Engine",   				"/live_race_engine/mw_lib_massive_example_v8_engine.js"],
        ["MetaWrap.Massive.example.V8.Config",   				"/live_race_engine/mw_lib_massive_example_v8_config.js"]
    ]
    );

*/
function MwPackage(p_path,p_name,p_array,p_paths)
{
    MetaWrap.g_js_root = p_path;

	// We are loading from a package
	MetaWrap.m_package = true;

    //alert("MwPackage");

    MwPath(p_path);

    // First set up all the required paths
    if (p_paths != null)
    {
        for(var i = 0;i<p_paths.length;i++)
        {
            // Set up the requited paths
            try
            {
                MwPath(p_paths[i]);

            }
            catch(l_e)
            {
                // Threw an exception - something is up with that path
            }
        }
    }

    // Then try and include the libraries
    for(var i = 0;i<p_array.length;i++)
    {

        //
        // Two different formats
        //

        // Namespace string only "MetaWrap.Page.Output",
        if (MetaWrap.typeOf(p_array[i]) == "string")
        {
            MwUse(p_array[i]);
        }
        // or Namespace string with direct location ["MetaWrap.Xml","http://localhost/metawrap/javascript/tests/xml/mw_lib_xml.js"]
        else
        {
            MwUse(p_array[i][0],p_array[i][1]);
        }

    }

	// We are not loading from a package
    MetaWrap.m_package = false;

}

/*! @brief  Our array of required objects */
var g_required_objects = [];

/*!
    @func       function MwUse(p_object,p_lib_file)
    @param      p_object The object required. Can be global variable, a namespace or namespace member.
    @return     p_lib_file (optional) The file name of the javascript library that will load the require onject
    @brief      Checks to make sure that an object exists, if not provides a warning.
    @author     James Mc Parlane
    @date       19 October 2002
    @todo       Make it automagically include the lib
*/
function MwRequire(p_object,p_lib_file)
{
    g_required_objects[g_required_objects.length] = {m_object:p_object,m_lib_file:p_lib_file};
}

/*!
    @func       function MwInit()
    @return     void
    @brief      Initialise the library
    @author     James Mc Parlane
    @date       19 October 2002
    @todo       Make this happen automagically
*/
function MwInit()
{
    // Make sure we have all our requirements
    for (var l_requirement = 0; l_requirement < g_required_objects.length;l_requirement++)
    {
        MwUse(g_required_objects[l_requirement].m_object,g_required_objects[l_requirement].m_lib_file)
    }
}

//@}


/*! @name  MetaWrap */
//@{


/*!
    @namespace  MetaWrap
    @brief      Declare the MetaWrap namespace
    @author     James Mc Parlane
    @date       19 October 2002

    Attempt to allocate a function. If we can create a standard object that satisfies all
    our required functions - then we just return that - otherwise we return a custom object
    with custom functions. The way the JacaScript engine works - when this function is
    called as

    var l_obj = new MetaWrap.Network.Client.HTTP();

    If we return anything, it becomes this l_obj.

    We use this to ensure that if the browser is able to support the functions we want with
    existing objects, the existing object is returned and this there is no overhead going
    through any stub functions.

    The bottom line.

    No speed penalty when not emulating - And thats a Good Thing.
*/
MetaWrap = {};


/*! @brief  True if we are currently loading from a package */
MetaWrap.m_package = false;

/*! @brief  True if we are currently performing an eval on js from inside a package */
MetaWrap.m_eval_package = false;

/*! @brief  Root location of the javascript files */
MetaWrap.g_js_root = "js/";

/*! @brief  Root  location of the site g_site_root +  g_js_root should reolve to the lication of the metawrap libraries*/
MetaWrap.g_site_root = "";

/*! @brief  If true then we are running in DEV mode */
MetaWrap.g_dev = false;


/*!
    @func       MetaWrap.exceptionMessage = function(p_exception)
    @param      p_exception The exeception objet
    @return     A string which is the exception message
    @brief      return Translates an exception message into its string message
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.exceptionMessage = function(p_exception)
{
	//debugger;

	var l_message = "";

    if (p_exception.message != undefined)
    {
        l_message = p_exception.message;
    }
    else
    {
       l_message = p_exception;
    }

    if (p_exception.name != undefined)
    {
        l_message += " " + p_exception.name;
    }

    if (p_exception.file != undefined)
    {
        l_message += " " + p_exception.file;
    }


    if (p_exception.lineNumber != undefined)
    {
        l_message += ":" + p_exception.lineNumber;
    }

	return l_message;
}

/*!
    @func       MetaWrap.typeOf = function(p_object)
    @param      p_object return the type of an object
    @return     A string which is the name of the javascript type of the object
    @brief      return the name of the javascript type of the object.
    @author     James Mc Parlane
    @date       19 October 2002
    @warning    If an object has a member called 'push' it will be seen to be an array
    @todo       Find a better way to do this, use deep comparsison to match undefined and null

    We differentiate between javascript arrays and objects. Normally a javascript array
    is reported as an object, but we want to know the difference.

*/
MetaWrap.typeOf = function(p_object)
{
    if (p_object === undefined)
    {
        return "undefined";
    }
    else
    if (p_object === null)
    {
        return "null";
    }
    else
    if ((p_object == "undefined") || (p_object == null))
    {
        return "undefined";
    }
    else
    // If it has the 'push' member
    if (p_object.push)
    {
        // then its most likely to be an array
        return "array";
    }
    else
    // If it has the 'push' member
    if (p_object.getDate)
    {
        // then its most likely to be an array
        return "Date";
    }

    // just rely on the basic type
    return typeof(p_object);
}


/*!
    @func       MetaWrap.try =  function()
    @param      arguments One or more functions - the first one to succeed, we return the result of its execution
    @return     The result from the first argument function not to fail, else null
    @brief      Takes a list of one or more functions - the first one to succeed, we return the result of its execution, else null
    @author     James Mc Parlane
    @date       19 October 2002
    @todo       Make it automagically include the lib
*/
MetaWrap.Try =  function()
{
    // For each argument, try each one till we succeed
    for (var i = 0; i < arguments.length; i++)
    {
        try
        {
            // Try - If we did not throw an exeception then this is the one that we want
            return arguments[i]();
        }
        catch (e)
        {
            // Absorb error quietly
        }
    }
    return null;
}


/*!
    @func       MetaWrap.getAllChildren = function (p_element)
    @param      p_element The element to return the children of
    @return     A list of all the children of p_element
    @brief      Return all the children of the specified element.
    @author     James Mc Parlane
    @date       19 October 2002

    Return all the children of the specified element.
*/
MetaWrap.getAllChildren = function(p_element)
{
    return p_element.all ? p_element.all : p_element.getElementsByTagName('*');
}


/*!
    @func       MetaWrap.doRemove = function(p_array,p_item)
    @param      p_array The array to remove an item from
    @p_this     p_item The item to remove

    @return     void
    @brief      Removed item p_item from array p_array
    @author     James Mc Parlane
    @date       22 September 2005
*/
MetaWrap.doRemove = function(p_array,p_item)
{
    // If we have native fn.call(this,arg,...)
    if (p_array.splice)
    {
        // use it
        p_array.splice(p_item,1);
    }
    else
    {
        for(var i=p_item;i<p_array.length-1;i++)
        {
            p_array[i] = p_array[i+1]
        }
        p_array.length--;
    }
}


/*!
    @func       MetaWrap.copyArray = function(p_array)
    @param      p_array The array to copy

    @return     array (copy of p_array)
    @brief      Removed item p_item from array p_array
    @author     James Mc Parlane
    @date       24 January 2009
*/
MetaWrap.copyArray = function(p_array)
{
	// If its a null array - then we return a null array too.
	if (p_array == null)
	{
		return null;
	}

    // If we have native slice
    if (p_array.slice)
    {
        // use it
        return p_array.slice();
    }
    else
    {
		// start with an empty array
		var l_array = [];

		// make a manual copy
        for(var i=0;i<p_array.length;i++)
        {
            l_array[i] = p_array[i]
        }
        return l_array;
    }
}

/*!
    @func       MetaWrap.appendArray = function(p_destination_array,p_src_array)
    @param      p_destination_array The array to to add p_src_array to.
    @param      p_src_array The array to add to p_destination_array
    @return     array (copy of p_array)
    @brief      Copies one array onto the end of another
    @author     James Mc Parlane
    @date       20 February 2009
*/
MetaWrap.appendArray = function(p_destination_array,p_src_array)
{
	// make a manual append: TODO: look into faster ways to do this
	for(var i=0;i<p_src_array.length;i++)
	{
		p_destination_array.push(p_src_array[i]);
	}
	return p_destination_array;
}


/*!
    @func       MetaWrap.eval = function(p_expression)
    @param      p_expression The array to copy

    @return     eval(p_expression) or the text from the exception
    @brief      Removed item p_item from array p_array
    @author     James Mc Parlane
    @date       24 January 2009
*/
MetaWrap.eval = function(p_expression,p_default)
{
	var l_e;
	try
	{
		// Get the result
		return eval(p_expression);
	}
	catch(l_e)
	{
		if (p_default != null)
		{
			return p_default;
		}
		else
		{
			// we use the exception message
			return MetaWrap.exceptionMessage(l_e);
		}
	}
}


/*!
    @func       MetaWrap.doCall = function(p_function,p_this,p_arg)
    @param      p_function The function that we want to call
    @p_this     p_this The object that we want to be 'this' inside the function
    @p_arg      p_this A single argument..

    @return     A list of all the children of p_element
    @brief      Return all the children of the specified element.
    @author     James Mc Parlane
    @date       22 September 2005


*/
MetaWrap.doCall = function(p_function,p_this,p_arg)
{
    // Our return value
    var l_return = null;

    // If we have native fn.call(this,arg,...)
    if (p_function.call)
    {
        // use it
        l_return = p_function.call(p_this,p_arg);
    }
    else
    {
        // Set up a reference to the function as a member of the object we want to be 'this'
        p_this['mwcfunc'] = p_function;

        // Call it in the context of the object
        l_return = p_this['mwcfunc'](p_arg);

        // Clean up
        p_this['mwcfunc'] = null;
    }

    if (l_return !== undefined)
    {
        // Return the value
        return l_return;
    }
}

/*!
    @func       MetaWrap.getDOMLocation = function (p_element)
    @param      p_element The element to return a location descriptor of
    @return     A name and bracket description of the location of an element within the DOM.
    @brief      Return all the children of the specified element.
    @author     James Mc Parlane
    @date       19 October 2002

    Return all the children of the specified element.

*/
MetaWrap.getDOMLocationFromElement = function (p_element)
{
    var l_result = "";

    if (p_element == null)
    {
    	return "";
    }

    // If this is the root document element ,we know there is no need to look for an index within children or anything - this is as low as we can go
    if (p_element == document)
    {
        return "document";
    }

    // We handle iframes a little but differently because they can be referenced absolutely within the current document
    if (p_element.nodeName == 'IFRAME')
    {
        // Its the name that is important for an IFRAME, not the id
        // http://www.quirksmode.org/js/iframe.html
        l_result = "frames['" + p_element.name + "']";

        //  this is global within the document, so lets zoom up to our next document node
        while (p_element.parentNode.nodeName != "#document")
        {
            p_element = p_element.parentNode;
        }

        p_element = p_element.parentNode;
    }
    else
    // ID is unique - so if we have it - then use it.
    if (p_element.id)
    {
        // is it a frame?
        l_result = "#" + p_element.id;

        //  this is global within the document, so lets zoom up to our next document node
        while (p_element.parentNode.nodeName != "#document")
        {
            p_element = p_element.parentNode;
        }

        p_element = p_element.parentNode;
    }
    else
    {
        // We start by assuming the simplest solution


        if (p_element.nodeName == "#document")
        {
            l_result += "document";
        }
        else
        {
            l_result += p_element.nodeName;
        }

        // we are index 0
        var l_index = 0;

        // start from our immediate sibling
        var l_sibling = p_element.previousSibling;

        // while we have prededing siblings
        while(l_sibling != null)
        {
            // if they have same name as us then our index must be deeper
            if (l_sibling.nodeName == p_element.nodeName)
            {
                l_index++;
            }

            // get next sibling
            l_sibling = l_sibling.previousSibling;
        }

        // if we have an index then add it to our location descriptor
        if (l_index)
        {
            l_result = l_result + "[" + l_index + "]";
        }
    }

    // If the perent is null then p_element is a document
    if (p_element.parentNode == null)
    {
        // Get the current window from this document
        var l_window = p_element.defaultView||p_element.parentWindow;

        ASSERT(l_window != null,"l_window != null");

        ASSERT(p_element.nodeName == '#document',"p_element.nodeName == '#document'");

        // Get the element that this window is embedded in
        var l_window_frameelement = l_window.frameElement;

        // If we have have an element we are embeded in then render from that
        if (l_window_frameelement != null)
        {
            ASSERT(p_element != document,"p_element != document");

            return (MetaWrap.getDOMLocationFromElement(l_window_frameelement) + "." + l_result);
        }
        else
        {
            //return "?doc" + l_result;
            return l_result;
        }
    }
    else
    {
        // Now get the location of our parent and ad ourselves as suffix
        return (MetaWrap.getDOMLocationFromElement(p_element.parentNode) + "." + l_result);
    }
}

/*!
    @func       MetaWrap.getDOMElementFromLocation = function (p_location)
    @param      p_location The location descriptor string
    @return     A name and bracket description of the location of an element within the DOM.
    @brief      Return all the children of the specified element.
    @author     James Mc Parlane
    @date       19 October 2002

    Return all the children of the specified element.

*/
MetaWrap.getDOMElementFromLocation = function (p_location)
{
    // empty location == document
    if (p_location == '')
    {
        return document;
    }

    // we know the name of the document element, and there is no need to look for an index within children or anything
    if (p_location == "document")
    {
        return document;
    }

    var l_frame = window;

    // The tokenised version of our location handle
    var l_tokens = null;

    // the element we are currently focused on
    var l_element = null;

    // split our path into tokens
    l_tokens = p_location.split(".");

    // This is our starting element - l_tokens[0] is always 'document'

    // walk through each of the tokens
    for(var i = 0;i<l_tokens.length;i++)
    {
        // each token is of the form ELEMENT [ '[' INDEX ']' ]

        // Assume we have no index part and grab the whole string for now
        var l_element_string = l_tokens[i];

        // Where is the left bracket?
        var l_left_bracket = l_element_string.indexOf("[");

        // Assume out index is 0
        var l_element_index = 0;

        // if we have a left bracket
        if (l_left_bracket != -1)
        {
            // then we should have a right bracket
            var l_right_bracket = l_element_string.indexOf("]");

            // get the index
            l_element_index = l_element_string.substring(l_left_bracket+1,l_right_bracket);

            // If this is a string - then make it a symbol
            if ((l_element_index.charAt(0) == "'") || (l_element_index.charAt(0) == '"'))
            {
                l_element_index = l_element_index.substring(1,l_element_index.length - 1);
            }

            // if we have the index then we know what the string is
            l_element_string = l_element_string.substring(0,l_left_bracket);

            //alert("l_element_string = " + l_element_string );
        }

        // Is it a text element?
        if ((l_element != null) && (l_element_string == "#text"))
        {
            l_element = l_element.firstChild;
        }
        else
        if (l_element_string.charAt(0) == "#")
        {
            var l_id = l_element_string.substring(1,l_element_string.length);

            l_element = l_frame.document.getElementById(l_id);

            if (!l_element)
            {
                l_element = l_frame.document.getElementById(p_location);

                if (!l_element)
                {
                    return l_element;
                }
            }

            ASSERT(l_element,"MetaWrap.getDOMElementFromLocation: failed to find #" + l_id + " from " + p_location);
        }
        else
        if (l_element_string == 'document')
        {
            l_element = l_document = l_frame.document;

            ASSERT(l_element,"failed to find 'document'")
        }
        else
        if (l_element_string == 'frames')
        {
            //alert("frame! " + l_element_index);

            //alert("l_frame = " + l_frame);

            // find the frame update our frame reference
            for(var l_f = 0;l_f < l_frame.frames.length;l_f++)
            {

                if (l_frame.frames[l_f].name == l_element_index)
                {
                    l_frame = l_frame.frames[l_f];

                    break;
                }
            }


            ASSERT(l_frame != null,"MetaWrap.getDOMElementFromLocation: failed to find frame '" + l_element_index + "'");

            l_element = l_frame.document;
        }
        else
        if (l_element)
        {
            // try and determine the correct child based on the next l_element_string

            // Now we walk through our current element children
            var l_element_children = l_element.firstChild;

            // starting at index o
            var l_element_children_index = 0;

            //alert("l_element_children.nodeName = " + l_element_children.nodeName);

            // We have matched when we have a non null element with the required name at the required index
            while((l_element_children) && ((l_element_children.nodeName != l_element_string) || (l_element_children_index != l_element_index)))
            {
                // if we match
                if (l_element_children.nodeName == l_element_string)
                {
                    // increment the index
                    l_element_children_index++;
                }

                // get the next one
                l_element_children = l_element_children.nextSibling;

                if (l_element_children == null)
                {
                    error("escape with " + l_element_string);
                    return null;
                }
            }

            // The only way out of the while loop to here is with a valid match...
            l_element = l_element_children;
        }
    }

    ASSERT(l_element != null,"MetaWrap.getDOMElementFromLocation: failed to find '" + p_location + "'");

    // Return the final result
    return l_element;
}

/*!
    @func       MetaWrap.s2h = function(p_string)
    @param      p_string The string to be converted to hex
    @return     Hex version fo string
    @brief      Return p_string stripped of whitespace
    @author     James Mc Parlane
    @date       21 Oct 2006
*/
MetaWrap.s2h = function(p_string)
{
	var l_result = "";

    var l_length = p_string.length;

	for(var i = 0;i<l_length;i++)
	{
		l_result += MetaWrap.d2h2(p_string.charCodeAt(i));
	}

	return l_result;
}

/*!
    @func       MetaWrap.d2h = function(p_decimal)
    @param      p_decimal Number to convert
    @return     A hex encoded version of p_decimal
    @brief      Returns the hex representation of p_decimal
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.d2h = function(p_decimal)
{
    // grab the hex lookup string
    var l_l = MetaWrap.d2h.c_lookup;

    // get first nibble
    var l_hex = l_l.substr(p_decimal&15,1);

    // while there are more nibbles
    while(p_decimal>15)
    {
        // Rotate down by one nibble
        p_decimal >>= 4;

        // grab the next nibble
        l_hex = l_l.substr(p_decimal&15,1) + l_hex;
    }
    return l_hex;
}

MetaWrap.d2h.c_lookup = "0123456789abcdef";

/*!
    @func       MetaWrap.d2h2 = function(p_decimal)
    @param      p_decimal Number to convert
    @return     A hex encoded version of p_decimal that is at least 2 bytes
    @brief      Returns the hex representation of p_decimal as at least two characters
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.d2h2 = function(p_decimal)
{
    var l_hex = MetaWrap.d2h(p_decimal);

    if (l_hex.length == 0)
    {
        return "00";
    }
    else
    if (l_hex.length < 2)
    {
        return "0" + l_hex;
    }
    else
    if (l_hex.length > 2)
    {
        return l_hex.substr(0,2);
    }

    return l_hex;
}

/*!
    @func       MetaWrap.h2d = function(p_hex)
    @param      p_hex Hex string to convert into a number
    @return     The number represented by p_hex
    @brief      Return the number represented by p_hex
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.h2d = function(p_hex)
{
    return parseInt(p_hex,16);
}

/*!
    @func       MetaWrap.stripWhitespace = function(p_string)
    @param      p_string The string to be stripped of whitespace
    @return     p_string stripped of whitespace
    @brief      Return p_string stripped of whitespace
    @author     James Mc Parlane
    @date       21 Oct 2006
*/
MetaWrap.stripWhitespace = function(p_string)
{
	var l_result = "";

	if (p_string == null) return l_result;

	var l_total = 0;

    var l_length = p_string.length;

	for(var i = 0;i<l_length;i++)
	{
		switch(p_string.charCodeAt(i))
		{
			case 10:
			case 32:
			case 13:
			case 7:
			break;

			default:
				l_result += p_string.charAt(i);
			break;
		}
	}

	return l_result;
}


/*!
    @func       MetaWrap.strip0D0A = function(p_string)
    @param      p_string The string to be stripped of whitespace
    @return     A string stripped of 0Ds 0As and
    @brief      Return p_string stripped of whitespace
    @author     James Mc Parlane
    @date       21 Oct 2006
*/
MetaWrap.strip0D0A = function(p_string)
{
	var l_result = "";

	if (p_string == null) return l_result;

	var l_total = 0;

    var l_length = p_string.length;

	for(var i = 0;i<l_length;i++)
	{
		switch(p_string.charCodeAt(i))
		{
			case 10:
			case 13:
			break;

			default:
				l_result += p_string.charAt(i);
			break;
		}
	}

	return l_result;
}

/*!
    @func       MetaWrap.f0 = function(p_n,p_string)
    @param      p_n required length of string
    @param      p_string starting string
    @return     p_string padded with '0's to length p_n
    @brief      Pads a string with '0's up to string characters long
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.f0 = function(p_n,p_string)
{
    p_string = new String(p_string);
    while(p_string.length < p_n)
    {
        p_string = "0" + p_string;
    }

    return p_string;
}

/*!
    @func       MetaWrap.dateTimeString = function()
    @brief
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.dateTimeString = function()
{
    var l_today=new Date()

    var l_hours = this.f0(2,l_today.getHours());
    var l_minutes = this.f0(2,l_today.getMinutes());
    var l_seconds = this.f0(2,l_today.getSeconds());

    var l_date = this.f0(2,l_today.getDate());
    var l_month = this.f0(2,l_today.getMonth()+1);
    var l_year = this.f0(4,l_today.getFullYear());


    return l_year + "" + l_month + "" +  l_date + "-" + l_hours + "" +  l_minutes + "" + l_seconds;
}

/*!
    @func       MetaWrap.doOnIn = function(p_array,p_function_name)
    @brief
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.doOnIn = function(p_array,p_function_name)
{
    for(var l_a in p_array)
    {
        if (p_array[l_a][p_function_name] != null)
        {
            p_array[l_a][p_function_name]();
        }
    }
}

/*!
    @func       MetaWrap.forEach= function(p_array, p_function, p_this)
    @brief
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.forEach= function(p_array, p_function, p_this)
{
	p_this = p_this || this;
	var l_length = p_array.length;
	for (var l_i = 0; l_i < l_length; l_i++)
	{
		var l_return = p_function.call(p_this, p_array[l_i], l_i);

		if (l_return !== undefined)
		{
	  		return l_return;
		}
	}
}

/*!
    @func       MetaWrap.doOnIn = function(p_name)
    @brief
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.qs = function(p_name)
{
  var l_query = window.location.search.substring(1);
  var l_vars = l_query.split("&");
  for (var i=0;i<l_vars.length;i++)
  {
	var l_pair = l_vars[i].split("=");
	if (l_pair[0] == p_name)
	{
	  return l_pair[1];
	}
  }
  return "";
}

/*!
    @func       MetaWrap.$ = function(p_id)
    @brief      Return element with id of p_id
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.$ = function(p_id,p_document)
{
	if (p_document == null) p_document = document;
    return p_document.getElementById(p_id);
}

MetaWrap.$E = function(l_data,p_document)
{
	if (p_document == null) p_document = document;

	var l_e;
	if ('string'==typeof l_data)
	{
		l_e=document.createTextNode(l_data);
	}
	else
	{
		//create the element
		l_e=p_document.createElement(l_data.tag);
		delete(l_data.tag);

		//append the children
		if ('undefined'!=typeof l_data.children)
		{
			if ('string'==typeof l_data.children ||	'undefined'==typeof l_data.children.length)
			{
				//strings and single elements
				l_e.appendChild(MetaWrap.$E(l_data.children,p_document));
			}
			else
			{
				//arrays of elements
				for (var i=0, child=null; 'undefined'!=typeof (child=l_data.children[i]); i++) {
					l_e.appendChild(MetaWrap.$E(child,p_document));
				}
			}
			delete(l_data.children);
		}

		//any other l_data is attributes
		for (attr in l_data)
		{
			l_e[attr]=l_data[attr];
		}
	}

	return l_e;
}


	//Set up the $ method
	if(IS_OPERA){
MetaWrap.$T = function(tag, doc, prefix, force){
			if(!prefix)
				return (doc || document).getElementsByTagName(tag);

			return (doc || document).getElementsByTagName(prefix + ":" + tag);
		}
	}
	else{
MetaWrap.$T = function(tag, doc, prefix, force){
			return (doc || document).getElementsByTagName((prefix && (force || IS_GECKO) ? prefix + ":" : "") + tag);
		}
	}




/*!
    @func       MetaWrap.gut
    @brief      Guts an element
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.gut = function(p_element)
{        
    while(p_element.firstChild != null)
    {
        // Replace contents of divName with our dynamicaly generated content
        p_element.removeChild(p_element.firstChild);        
    }
}




/*!
    @func       MetaWrap.Class = function()
    @brief      Constructor for the MetaClass
    @author     Dean Edwards
    @date       16 May 2006

    http://dean.edwards.name/weblog/2006/03/base/#comment4041
*/
MetaWrap.Class = function()
{
	// If we have some arguments
    if (arguments.length)
    {
    	// if we are calling this from
        if (this == window)
        {
        	// cast an object to this class
            MetaWrap.Class.prototype.extend.call(arguments[0], arguments.callee.prototype);
        }
        else
        {
            this.extend(arguments[0]);
        }
    }
};


/*!
    @func       MetaWrap.Class.extend = function(p_instance, p_static)
    @brief      Declares a class based on this class
    @param      p_instance An object where each member is to be added to this class
    @author     Dean Edwards
    @date       16 May 2006

    http://dean.edwards.name/weblog/2006/03/base/#comment4041

*/
MetaWrap.Class.extend = function(p_instance, p_static)
{
	// get a shorthand handle to the extend method
    var l_extend = MetaWrap.Class.prototype.extend;

	// if instance is null
    if (!p_instance)
    {
		// then make an empty one so the code below is simpler and happy
        p_instance = {};
    }

    // tell the world we are prototyping
    MetaWrap.Class.$_prototyping = true;

	// create a new one of these
    var _prototype = new this;


    l_extend.call(_prototype, p_instance);

    var constructor = _prototype.constructor;

    _prototype.constructor = this;

    delete MetaWrap.Class.$_prototyping;

    // create the wrapper for the constructor function
    var klass = function()
    {
		// If we are not already prototyping
        if (!MetaWrap.Class.$_prototyping)
        {
			// call the constructor
			constructor.apply(this, arguments);
		}
        this.constructor = klass;
    };

    klass.prototype = _prototype;

    // build the class interface
    klass.extend = this.extend;

    klass.implement = this.implement;

    klass.toString =    function()
    {
        return String(constructor);
    };

    l_extend.call(klass, p_static);
    // single instance
    var object = constructor ? klass : _prototype;
    // class initialisation
    if (object.init instanceof Function) object.init();
    return object;
};


/*!
    @func       MetaWrap.Class.implement = function(_interface)
    @brief
    @author     Dean Edwards
    @date       16 May 2006

    http://dean.edwards.name/weblog/2006/03/base/#comment4041
*/
MetaWrap.Class.implement = function(_interface)
{
    if (_interface instanceof Function)
    {
        _interface = _interface.prototype;
    }

    this.prototype.extend(_interface);
};


/*!
    @func       MetaWrap.Class.prototype.extend =  function(p_source, p_value)
    @brief
    @author     Dean Edwards
    @date       16 May 2006

    http://dean.edwards.name/weblog/2006/03/base/#comment4041
*/
MetaWrap.Class.prototype.extend =  function(p_source, p_value)
{
		// get a shorthand handle to this extend method
        var l_extend = MetaWrap.Class.prototype.extend;

		// If we have a p_source and a p_value
        if (arguments.length == 2)
        {
        	//
            var l_ancestor = this[p_source];

            // overriding?
            if ((l_ancestor instanceof Function) && (p_value instanceof Function) && l_ancestor.valueOf() != p_value.valueOf() && /\bbase\b/.test(p_value))
            {

                var l_method = p_value;

                p_value = function()
                {
                    var l_previous = this.base;
                    this.base = l_ancestor;
                    var l_return = l_method.apply(this, arguments);
                    this.base = l_previous;
                    return l_return;
                };

                // point to the underlying l_method
                p_value.valueOf = function()
                {
                    return l_method;
                };

                p_value.toString = function()
                {
                    return String(l_method);
                };
            }
            return this[p_source] = p_value;
        }
        else
        if (p_source)
        {
            var l_prototype = {toSource: null};

            // do the "toString" and other methods manually
            var l_protected = ["toString", "valueOf"];

            // if we are prototyping then include the constructor
            if (MetaWrap.Class.$_prototyping) l_protected[2] = "constructor";

            for (var i = 0; (name = l_protected[i]); i++)
            {
                if (p_source[name] != l_prototype[name])
                {
                    l_extend.call(this, name, p_source[name]);
                }
            }
            // copy each of the p_source object's properties to this object
            for (var name in p_source)
            {
                if (!l_prototype[name])
                {
                    l_extend.call(this, name, p_source[name]);
                }
            }
        }
        return this;
}


/*!
    @func       MetaWrap.Class.prototype.base = function()
    @brief
    @author     Dean Edwards
    @date       16 May 2006

    http://dean.edwards.name/weblog/2006/03/base/#comment4041
*/
MetaWrap.Class.prototype.base = function()
{
    // call this method from any other method to invoke that method's l_ancestor
}

/*!
 *@} endgroup mw_javascript_lib MetaWrap - JavaScript
 */

/*!
 *@} end of MetaWrap
 */
