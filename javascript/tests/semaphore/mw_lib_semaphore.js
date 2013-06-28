/*

    @file mw_lib_semaphore.js

    $Id: mw_lib_semaphore.js,v 1.5 2006/07/01 08:06:59 james Exp $
          
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
 * $Log: mw_lib_semaphore.js,v $
 * Revision 1.5  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.4  2006/05/08 12:49:01  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.3  2006/05/06 09:33:04  james
 * More refactoring
 *
 * Revision 1.2  2006/05/06 08:28:29  james
 * More refactoring
 *
 * Revision 1.1  2005/09/27 07:47:39  james
 * Added semaphore class
 *
 */

/*! \page mw_javascript_lib_semaphore MetaWrap - JavaScript - Semaphore
 *
 * \subsection mw_javascript_lib_semaphore Overview
 *
 * http://www.w3.org/TR/REC-CSS2/box.html
 */

//alert("$Id: mw_lib_semaphore.js,v 1.5 2006/07/01 08:06:59 james Exp $");
 
/*! \defgroup mw_javascript_lib_semaphore  MetaWrap - JavaScript - Semaphore
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
 
/*! @name  MetaWrap.Semaphore Namespace */
//@{
  
/*!
    @namespace  MetaWrap.Semaphore
    @class      MetaWrap.Semaphore
    @brief      MetaWrap.Semaphore Class
    @author     James Mc Parlane
    @date       27 September 2005
*/    
MetaWrap.Semaphore = function(p_count,p_function)
{
	/// The semaphore count
	this.m_count = p_count;
	
	/// The initial semaphore count
	this.m_initial = p_count;
	
	/// The semaphore payload - gets executed when this.m_count makes transition to 0
	this.m_function = p_function;
}

/*!
    @class      function MetaWrap_Semaphore_post()
    @brief      Decrement semaphore count, if the count goes down to zero then fire the semaphore function
    @author     James Mc Parlane
    @date       27 September 2005
*/    
function MetaWrap_Semaphore_post()
{
	if (--this.m_count == 0)
	{
		this.m_function();
	}
}

MetaWrap.Semaphore.prototype.post = MetaWrap_Semaphore_post;

/*!
    @class      function MetaWrap_Semaphore_unPost()
    @brief      Incremment semaphore count
    @author     James Mc Parlane
    @date       27 September 2005
*/    
function MetaWrap_Semaphore_unPost()
{
	this.m_count++;
}

MetaWrap.Semaphore.prototype.unPost = MetaWrap_Semaphore_unPost;


/*!
    @class      function MetaWrap_Semaphore_reset(p_count)
    @brief      Incremment semaphore count
    @author     James Mc Parlane
    @date       27 September 2005
*/    
function MetaWrap_Semaphore_reset(p_count)
{
	if (p_count == null)
	{
		p_count = this.m_initial;
	}
	
	this.m_count = p_count;
}

MetaWrap.Semaphore.prototype.reset = MetaWrap_Semaphore_reset;


/*! 
 *@} endgroup mw_javascript_lib_semaphore MetaWrap - JavaScript - Semaphore
 */ 

/*! 
 *@} end of MetaWrap.Semaphore
 */ 




