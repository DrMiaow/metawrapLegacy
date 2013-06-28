/*

    @file mw_lib_page_output.js

    $Id: mw_lib_page_output.js,v 1.10 2006/12/20 10:47:15 james Exp $
          
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
 * $Log: mw_lib_page_output.js,v $
 * Revision 1.10  2006/12/20 10:47:15  james
 * Latest version of the js library
 *
 * Revision 1.9  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.8  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.7  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.6  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.5  2006/05/06 08:28:29  james
 * More refactoring
 *
 * Revision 1.4  2005/10/18 03:42:54  james
 * *** empty log message ***
 *
 * Revision 1.3  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.2  2005/08/17 08:33:05  james
 * Fixes
 *
 * Revision 1.1  2005/08/17 08:06:39  james
 * created page ouput
 *
 */


/*! \page mw_javascript_lib_page_output MetaWrap - JavaScript - Page - Output
 *
 * \subsection mw_network_client_http Overview
 * 
 */

//alert("$Id: mw_lib_page_output.js,v 1.10 2006/12/20 10:47:15 james Exp $"); 
 
/*! \defgroup mw_javascript_lib_page_output  MetaWrap - JavaScript - Page - Output
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");


/*! @name  MetaWrap.Page.Output  */
//@{

/*! 
    @namespace  MetaWrap.Output
    @fn         MetaWrap.Output = function(p_target)
    @param      p_target The element we want to output to.
    @return     void 
    @brief      MetaWrap.Output namespace wrapper for a static class
    @author     James Mc Parlane
    @date       3 August 2005
*/
MetaWrap.Page.Output = function(p_target)
{
    return new MetaWrap_Page_Output(p_target);
}

/*!
    @fn         function MetaWrap_Page_Output(p_target)
    @param      p_target The target element
    @return     void 
    @brief      MetaWrap.Macro namespace
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Page_Output(p_target)
{
    // If we got a string - turn it onto an element
    switch(MetaWrap.typeOf(p_target))
    {
        // string?
        case "string":
        {
            // an element!
            p_target = MetaWrap.$(p_target);
        }
        break;
    }

    // remember our target
    this.m_target = p_target;
    
    // if no target
    if (!this.m_target)
    {
        // we will output in document body
        this.m_target = document.body;
        
        // if there is no document bodd
        if (!this.m_target)
        {
            // just output into the root of the document
            this.m_target = document;
        }
    }
    
    // start the buffer empty
    this.m_buffer = ""; 
    
    // create our functions
    this.write = MetaWrap_Page_Output_write;
    this.writeln = MetaWrap_Page_Output_write;
    this.flush = MetaWrap_Page_Output_flush;
    this.clear = MetaWrap_Page_Output_clear;
    return this;
}

/*!
    @fn         function MetaWrap_Page_Output_write(p_string)
    @param      p_string
    @return     void 
    @brief      Add p_string to our output buffer
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Page_Output_write(p_string)
{
    this.m_buffer += p_string;
}

/*!
    @fn         function MetaWrap_Page_Output_writeln(p_string)
    @param      p_string
    @return     void 
    @brief      Add p_string to our output buffer
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Page_Output_writeln(p_string)
{
    this.m_buffer += p_string + "\r\n";
}

/*!
    @fn         function MetaWrap_Page_Output_Flush()
    @return     void 
    @brief      Flush our buffer into the target element
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Page_Output_flush()
{   
    // If our target is the document
    if (this.m_target == document)
    {
        // Output our buffered string using document.write
        document.write(this.m_buffer);
    }
    else
    {
        // Output our buffered string into the element
        this.m_target.innerHTML += this.m_buffer;
    }
 
    // Clear our buffer   
    this.m_buffer = "";
}

/*!
    @fn         function MetaWrap_Page_Output_clear()
    @return     void 
    @brief      Clear the target or all content
    @author     James Mc Parlane
    @date       3 August 2005
*/
function MetaWrap_Page_Output_clear()
{    
    // If our target is the document
    if (this.m_target == document)
    {
        // Output our buffered string using document.write
        document.close();
    }
    else
    {
        // Output our buffered string into the element
        this.m_target.innerHTML = "";
    }
}

/*! 
 *@} endgroup mw_javascript_lib_page_output MetaWrap - JavaScript - Page - Output
 */ 

/*! 
 *@} end of MetaWrap.Page.Output
 */       