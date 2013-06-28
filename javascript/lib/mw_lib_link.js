/*

    @file mw_lib_link.js

    $Id: mw_lib_link.js,v 1.1 2006/12/21 13:07:19 james Exp $
          
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
 * $Log: mw_lib_link.js,v $
 * Revision 1.1  2006/12/21 13:07:19  james
 * Started widget library
 * Got htmlform editor working
 *
 */

/*! \page mw_javascript_lib_link MetaWrap - JavaScript - Link
 *
 * \subsection mw_javascript_lib_link Overview
 *  
 */

//alert("$Id: mw_lib_link.js,v 1.1 2006/12/21 13:07:19 james Exp $");
 
/*! \defgroup mw_javascript_lib_link  MetaWrap - JavaScript - Link
 *@{
 */ 

//
// Ensure we have the namespaces we need
//
MwUse("MetaWrap","mw_lib.js");

//
// Now that we have the pre-requisite namespaces, then off we go
//
 
/*! @name MetaWrap.Link */
//@{

/*!
    @namespace  MetaWrap.Link
    @brief      MetaWrap.Link namespace
*/
MetaWrap.Link = {
	m_id : 0,
	m_count : 0,
	m_objects : [],
	m_children : []
};

MetaWrap.Link.unlink = function(p_object)
{
	// is the link already there?
	var l_id = p_object["$link"];
	
	// no?
	if (l_id != null)
	{
		// the object forgets the link
		p_object["$link"] = null;
		
		// forget the object
		this.m_objects[l_id] = null;
		
		// forget the child	
		this.m_children[l_id] = null;
		
		// one less
		this.m_count--;
		
		if (this.m_count == 0)
		{
			// empty the arrays
			this.m_objects = [];
			this.m_children = [];
		}
	}
}

MetaWrap.Link.link = function(p_object,p_child)
{
	if (p_child == null)
	{	
		// is the link already there?
		var l_id = p_object["$link"];
		
		if (l_id == null)
		{
			// make an id
			l_id = "GUID" + this.m_id++;
				
			// remember the object
			this.m_objects[l_id] = p_object;
			
			// make the object remember the id
			p_object["$link"] = l_id; 
			
			// one more
			this.m_count++;
			
		}
	}
	else
	{
		// is the link already there?
		var l_id = p_object[p_child]["$link"];
		
		if (l_id == null)
		{
			// make an id
			l_id = "GUID" + this.m_id++;
				
			// remember the object
			this.m_objects[l_id] = p_object;
			
			// remember the object
			this.m_children[l_id] = p_child;
			
			// make the object remember the id
			p_object["$link"] = l_id; 
			
			// one more
			this.m_count++;
		}		
	}
	
	return l_id;
}

MetaWrap.Link.getObject = function(p_id)
{
	return this.m_objects[p_id];
}

MetaWrap.Link.getChild = function(p_id)
{
	return this.m_children[p_id];
}


MetaWrap.Link.getID = MetaWrap.Link.link;

/*! 
 *@} end of MetaWrap.Link
 */ 

/*! 
 *@} endgroup mw_javascript_lib_link MetaWrap - JavaScript - Link
 */ 
 