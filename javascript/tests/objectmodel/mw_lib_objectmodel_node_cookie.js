/*

    @file mw_lib_objectmodel_node_cookie.js

    $Id: mw_lib_objectmodel_node_cookie.js,v 1.5 2006/07/01 08:06:58 james Exp $
          
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
 * $Log: mw_lib_objectmodel_node_cookie.js,v $
 * Revision 1.5  2006/07/01 08:06:58  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.4  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.2  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.1  2006/01/29 09:12:12  james
 * more work on objectmodel
 *
 */


/*! \page mw_javascript_lib_objectmodel_node_cookie MetaWrap - JavaScript - ObjectModel - Node - Cookie
 *
 * \subsection mw_javascript_lib_objectmodel_node_cookie Overview
 */
 
/*! \defgroup mw_javascript_objectmodel_node_cookie  MetaWrap - JavaScript - ObjectModel - Node - Cookie
 *@{
 */ 


/*! @name  MetaWrap.ObjectModel.Node.Cookie Namespace*/
//@{

//alert("$Id: mw_lib_objectmodel_node_cookie.js,v 1.5 2006/07/01 08:06:58 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Cookie","mw_lib_cookie.js");
MwUse("MetaWrap.ObjectModel","mw_lib_objectmodel.js");
MwUse("MetaWrap.ObjectModel.Node","mw_lib_objectmodel_node.js");


/*!
    @namespace	MetaWrap.ObjectModel.Node.Cookie
    @fn         MetaWrap.ObjectModel.Node.Cookie = function(p_name,p_value)
    @brief      MetaWrap.ObjectModel.Node.Cookie class
    @author     James Mc Parlane
    @date       19 October 2002    
*/
MetaWrap.ObjectModel.Node.Cookie = function(p_name,p_value)
{    
    // Each node has a name
    this.m_name = p_name;
}

/*!
    @fn         MetaWrap.ObjectModel.Node.Cookie.prototype.write = function(p_value)
    @param      The value of the cookie to write
    @brief      Writes the value of a cookie
    @author     James Mc Parlane
    @date       19 October 2002    
*/
MetaWrap.ObjectModel.Node.Cookie.prototype.write = function(p_value)
{
    MetaWrap.Cookie.Set(this.m_name,p_value);
}

/*!
    @fn         MetaWrap.ObjectModel.Node.Cookie.prototype.read = function()
    @brief      Reads the value of a cookie
    @author     James Mc Parlane
    @date       19 October 2002    
*/
MetaWrap.ObjectModel.Node.Cookie.prototype.read = function()
{
    return MetaWrap.Cookie.Get(this.m_name);
}


/*! 
 *@} endgroup mw_javascript_lib_objectmodel_node_cookie MetaWrap - JavaScript - ObjectModel - Node - Cookie
 */ 

/*! 
 *@} end of MetaWrap - JavaScript - ObjectModel - Node - Cookie
 */ 
