/*

    @file mw_lib_page_onload.js

    $Id: mw_lib_page_onload.js,v 1.1 2007/04/03 12:40:17 james Exp $
          
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
 * $Log: mw_lib_page_onload.js,v $
 * Revision 1.1  2007/04/03 12:40:17  james
 * Fixed include system
 *
 * Revision 1.1  2006/10/21 07:58:50  james
 * Building in page editor
 *
 * Revision 1.5  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.4  2006/07/16 22:16:18  james
 * Latest changes to getting the flash connector running properly
 * Flash can only be contacted after the document is loaded
 *
 * Revision 1.3  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.2  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.1  2006/03/25 04:39:24  james
 * Made macro recorder more stable
 * Made event hooks multiple document aware
 * Added per element/event event handlers for simulation
 *
 */


/*! \mainpage

<h3>MetaWrap - JavaScript Library</h3>

*/

/*! \page mw_javascript_libxml MetaWrap - JavaScript
 *
 * \subsection mw_network_client_http Overview
 *
 */


// used for debugging
//alert("$Id: mw_lib_page_onload.js,v 1.1 2007/04/03 12:40:17 james Exp $"); 

MwUse("MetaWrap","mw_lib.js");
 
/*! \defgroup mw_javascript_lib  MetaWrap - JavaScript
 *@{
 */ 

/*! @name Solve Some Fundamantal Browser Issues */
//@{
 

// Call the post load function 
MetaWrap.Page.postLoadInit();


/*! 
 *@} endgroup mw_javascript_lib_page_element MetaWrap - JavaScript - Page - Element
 */ 

/*! 
 *@} end of MetaWrap.Page.Element
 */ 

      