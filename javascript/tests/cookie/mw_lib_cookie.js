/*

    @file mw_libcookie.js

    $Id: mw_lib_cookie.js,v 1.12 2006/07/01 08:06:57 james Exp $
          
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

    In addition, as a special exception, Massive Technologies
    gives permission for parties to develop 'Plugins' via the
    'PluginManager'. Said party is free to develop a proprietary
    'Plugin' and will not be forced to distribute source code for that
    'Plugin', but we of course encourage them to do so. You must obey the GNU 
    General Public License in all respects for all of the code used 
    other than interfacing with the 'PluginManager'.  If you modify this 
    file, you may extend this exception to your version of the file, but 
    you are not obligated to do so.  If you do not wish to do so, delete 
    this exception statement from your version.
*/

/*
 * $Log: mw_lib_cookie.js,v $
 * Revision 1.12  2006/07/01 08:06:57  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.11  2006/05/06 09:33:02  james
 * More refactoring
 *
 * Revision 1.10  2006/05/06 08:28:27  james
 * More refactoring
 *
 * Revision 1.9  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.8  2006/01/29 09:12:39  james
 * Cosmetic tweak
 *
 * Revision 1.7  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.6  2005/10/30 11:20:12  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.5  2005/09/09 02:32:17  james
 * More test cases for XML handling
 *
 * Revision 1.4  2005/08/29 08:06:25  james
 * *** empty log message ***
 *
 * Revision 1.3  2005/08/29 07:51:40  james
 * Latest wirewrap test
 *
 * Revision 1.2  2005/07/28 07:28:17  james
 * Standardised cookie names
 * Fixed broken unit tests
 *
 * Revision 1.1  2005/07/07 01:49:53  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/06/10 13:02:43  james
 * Tidied up code.
 * Added ability to define xslt and css that gets combined with XML via cookies.
 *
 */


/*! \page mw_javascript_lib_cookie MetaWrap - JavaScript - Cookie
 *
 * \subsection mw_javascript_lib_cookie Overview
 * 
 * http://javascriptkit.com/dhtmltutors/cssreference.shtml
 * http://home.tampabay.rr.com/bmerkey/cheatsheet.htm
 * http://www.w3.org/TR/1998/REC-CSS2-19980512/sample.html
 *
 */
 
/*! \defgroup mw_javascript_lib_cookie  MetaWrap - JavaScript - Cookie
 *@{
 */ 


/*! @name  MetaWrap.Cookie */
//@{

//alert("$Id: mw_lib_cookie.js,v 1.12 2006/07/01 08:06:57 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");


/*!
    @namespace  MetaWrap.Cookie
    @fn         MetaWrap.Cookie = function()
    @brief      Declare the MetaWrap.Cookie namespace
    @author     James Mc Parlane
    @date       19 October 2002
    
*/
MetaWrap.Cookie = function()
{
}

/*!
    @fn         MetaWrap.Cookie.Set = function(p_name, p_value, p_expires, p_path, p_domain, p_secure)
    @param      p_name Name of the cookie
    @param      p_value Value of the cookie
    @param      p_expires (Optional) Expiration date of the cookie (default: end of current session)
    @param      p_path (Optional) Path where the cookie is valid (default: p_path of calling document)
    @param      p_domain (Optional) Domain where the cookie is valid (default: p_domain of calling document)
    @param      p_secure(Optional)  Boolean p_value indicating if the cookie transmission requires a p_secure transmission
    @brief      Sets a Cookie with the given p_name and p_value.
    @author     James Mc Parlane
    @date       10 June 2005
*/
MetaWrap.Cookie.Set = function(p_name, p_value, p_expires, p_path, p_domain, p_secure)
{

	if (p_path == null)
	{
		p_path = "/";
	}

	if (p_domain == null)
	{
		p_domain = document.location.host;		
	}
	
	if (p_domain == "localhost")
	{
		error("Cookies do not work on 'localhost'");
	}
	
	if (p_value == null)
	{
		p_value = "1";
	}
	
	if (p_expires == null)
	{
		p_expires =new Date();
		p_expires.setTime(p_expires.getTime()+(1000*24*60*60*1000));
	}

	/*
    var l_cookie = p_name + "=" + escape(p_value) +
        ((p_expires) ? "; expires=" + p_expires.toGMTString() : "") +
        ((p_path) ? "; path=" + p_path : "") +
        ((p_domain) ? "; domain=" + p_domain : "") +
        ((p_secure) ? "; secure" : "");
		
	debug("MetaWrap.Cookie.Set = " + l_cookie);
	*/
	
    document.cookie= p_name + "=" + escape(p_value) +
        ((p_expires) ? "; expires=" + p_expires.toGMTString() : "") +
        ((p_path) ? "; path=" + p_path : "") +
        ((p_domain) ? "; domain=" + p_domain : "") +
        ((p_secure) ? "; secure" : "");
		
}

/*!
    @fn         MetaWrap.Cookie.Get = function(p_name)
    @param      p_name Name of the desired cookie.
    @brief      Gets the p_value of the specified cookie.
    @return     null if the cookie does not exist, otherwise the cookie as string
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing value of specified cookie,
    or null if cookie does not exist.
    
*/
MetaWrap.Cookie.Get = function(p_name)
{
    var l_dc = document.cookie;
	
	//debug(l_dc);
	
    var l_prefix = p_name + "=";
    var l_begin = l_dc.indexOf("; " + l_prefix);
    if (l_begin == -1)
    {
        l_begin = l_dc.indexOf(l_prefix);
        if (l_begin != 0) return null;
    }
    else
    {
        l_begin += 2;
    }
    var l_end = document.cookie.indexOf(";", l_begin);
    if (l_end == -1)
    {
        l_end = l_dc.length;
    }
    return unescape(l_dc.substring(l_begin + l_prefix.length, l_end));
}
 
/*!
    @fn         MetaWrap.Cookie.Delete = function(p_name, p_path, p_domain)
    @param      p_name The name of the cookie
    @param      p_path The path of the cookie (must be same as path used to create cookie)
    @param      p_domain The p_domain of the cookie (must be same as domain used to create cookie)
    @brief      Deletes the specified cookie.
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing p_value of specified cookie,
    or null if cookie does not exist.    
*/
MetaWrap.Cookie.Delete = function(p_name, p_path, p_domain)
{
	if (p_path == null)
	{
		p_path = "/";
	}

	if (p_domain == null)
	{
		p_domain = document.location.host;
	}
		
	//debug("MetaWrap.Cookie.Delete " + MetaWrap.Cookie.Get(p_name) + " "  + p_domain + " " + p_path);
	
    if (MetaWrap.Cookie.Get(p_name))    
    {
		//var l_cookie = p_name + "=" + ((p_path) ? "; path=" + p_path : "") + ((p_domain) ? "; domain=" + p_domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		//debug("MetaWrap.Cookie.Delete = " + l_cookie);
        document.cookie = p_name + "=" + ((p_path) ? "; path=" + p_path : "") + ((p_domain) ? "; domain=" + p_domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";    
    }
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_cookie MetaWrap - JavaScript - Cookie
 */ 

/*! 
 *@} end of MetaWrap.Cookie
 */ 
      