
/*

    @file mw_lib_json.js

    $Id: mw_lib_json.js,v 1.31 2008/09/25 05:54:39 james Exp $

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

*/

 //alert("$Id: mw_lib_json.js,v 1.31 2008/09/25 05:54:39 james Exp $");

/*! \page mw_javascript_lib_json MetaWrap - JavaScript - JSON
 *
 * \subsection mw_javascript_lib_json Overview
 *
 *  JSON Processing Module for The MetaWrap Project
 *
 */

/*! \defgroup mw_javascript_lib_json  MetaWrap - JavaScript - JSON
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");

/*! @name  MetaWrap.JSON */
//@{

/*!
    @namespace  MetaWrap.JSON
    @brief      Declare the MetaWrap.JSON namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.JSON = new Object();

// implement JSON.stringify serialization
MetaWrap.JSON.stringify = JSON.stringify || function (obj) {

	var t = typeof (obj);
	if (t != "object" || obj === null) {

		// simple data type
		if (t == "string") obj = '"'+obj+'"';
		return String(obj);

	}
	else {

		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);

		for (n in obj) {
			v = obj[n]; t = typeof(v);

			if (t == "string") v = '"'+v+'"';
			else if (t == "object" && v !== null) v = JSON.stringify(v);

			json.push((arr ? "" : '"' + n + '":') + String(v));
		}

		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};


// implement JSON.parse de-serialization
MetaWrap.JSON.parse = JSON.parse || function (str) {
	if (str === "") str = '""';
	eval("var p=" + str + ";");
	return p;
};

/*!
 *@} endgroup mw_javascript_lib_json MetaWrap - JavaScript - JSON
 */

/*!
 *@} end of MetaWrap.JSON
 */
