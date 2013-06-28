/*

    @file mw_libnetwork.js

    $Id: mw_lib_network.js,v 1.5 2006/05/06 09:33:03 james Exp $
          
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

/*
 * $Log: mw_lib_network.js,v $
 * Revision 1.5  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.3  2005/10/30 11:20:12  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.2  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.1  2005/07/07 03:28:28  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/06/12 08:02:28  james
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


/*! \page mw_javascript_libnet MetaWrap - JavaScript - Network
 *
 * \subsection mw_javascript_libnet Overview
 *
 */

//alert("$Id: mw_lib_network.js,v 1.5 2006/05/06 09:33:03 james Exp $");
 
/*! \defgroup mw_javascript_libnet  MetaWrap - JavaScript - Network
 *@{
 */ 
 
/*! @name  MetaWrap.Network Namespace */
//@{

/*!
    @fn         MetaWrap.Network = function()
    @brief      Declare the MetaWrap.Network namespace
    @author     James Mc Parlane
    @date       19 October 2002
    
*/
MetaWrap.Network = function()
{
}

/*!
    MetaWrap.Network.Client = function()
    @brief      Declare the MetaWrap.Network.Client namespace
    @author     James Mc Parlane
    @date       19 October 2002
    
*/
MetaWrap.Network.Client = function()
{
}

/*!
    @fn         function MetaWrap.Network.Client.HTTP
    @brief      Cross platform implentation of XMLHttpRequest
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
    
    No speed penalty. And thats a good thing.
*/
MetaWrap.Network.Client.HTTP = function()
{
    // This is the real request object - this is passed into real functions via the stub functions 
    // if we manage to allocate one - otherwse we go 100% custom and this.m_xml_http_request is 
    // undefined.
    this.m_xml_http_request = null;
    
    //
    // First try to allocate a standard XMLHttpRequest Object
    //    

    // try the new microsoft way
    try
    {
        this.m_xml_http_request = new ActiveXObject(g_ms_latest_xml_request_object_name)        
    }
    catch(e)
    {
        // try the old microsoft way
        try
        {
            this.m_xml_http_request = new ActiveXObject(g_ms_safe_xml_request_object_name)
        } 
        catch(oc)
        {
        }
    }  

    // try the propper as per w3/ECMA spec DOM way
    if(!this.m_xml_http_request && (typeof XMLHttpRequest != "undefined")) 
    {
        this.m_xml_http_request = new XMLHttpRequest()
    }
    
    // so have we managed to create a 'standard' object?
    if (this.m_xml_http_request != null)
    {   
        // yes - lets return it and be done with it.
        return this.m_xml_http_request;         
    }     
    else        
    {
        // whine if we fail - can't really emulate networking functions on a javascript browser that does not support it.
        error("Unable to instantiate MetaWrap.Network.Client.HTTP object");
        return null;
    }         
}

//@}


/*! 
 *@} end of mw_javascript_libnetwork
 */ 
      