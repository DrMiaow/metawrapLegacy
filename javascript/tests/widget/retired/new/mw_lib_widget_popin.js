/*

    @file mw_lib_widget_popin.js

    $Id: mw_lib_widget_popin.js,v 1.1 2006/12/21 07:42:25 james Exp $
          
    @author     James Mc Parlane
          
    PROJECT:    MetaWrap JavaScript Library
          
    COMPONENT:  -
        
    @date       3 August 2005
          

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
 * $Log: mw_lib_widget_popin.js,v $
 * Revision 1.1  2006/12/21 07:42:25  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.5  2006/05/08 12:49:01  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.4  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.3  2005/11/13 13:14:26  james
 * Code tidy up
 *
 * Revision 1.2  2005/11/13 12:18:29  james
 * Added transparency
 *
 * Revision 1.1  2005/11/13 11:40:36  james
 * Added simple popin widget
 *
 */

/*! \page mw_javascript_lib_macro MetaWrap - JavaScript - Widget - Popin
 * 
 * Some cool special effects here...
 * http://www.mandarindesign.com/opacitycolor.html
 *
 * \subsection mw_javascript_lib_widget_popin Overview
 *
 *
 */

//alert("$Id: mw_lib_widget_popin.js,v 1.1 2006/12/21 07:42:25 james Exp $");
 
/*! \defgroup mw_javascript_lib_widget_popin  MetaWrap - JavaScript - Widget - Popin
 *@{
 */ 
 
 // Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");

MetaWrap.Widget = {};

/*!
	@fn			MetaWrap.Widget.Popin = function(p_id,p_x,p_y,p_width,p_height,p_class)
	@param      p_id the ID to give this popin
	@param      p_x the x position of the popin
	@param      p_y the y position of the popin
	@param      p_width the width of the popin
	@param      p_height the width of the popin
	@param      p_class The class that is assigned to the popin
	@warning    Mozilla seem to have issues if you don't use pass your width and height as "NNNpx" eg "100px"
	@warning    Some style elements don't work if they are not included in the style.
	@brief		Constructor for MetaWrap.Widget.Popin
	@return	    
	@author		James Mc Parlane
	@date		14 November 2005
	@todo       use setAttribute and getAttribute for IE5.5 support
*/
MetaWrap.Widget.Popin = function(p_id,p_x,p_y,p_width,p_height,p_class)
{
    // Set the id
    this.m_id = p_id;

    // Create the main 'div' attribute
    this.m_element = document.createElement("div");
    
    // Create the 'id' element
    var l_id = document.createAttribute("id");
    
    // Set its value to our required id in p_id
    l_id.value = p_id;
    
    // Add 'id' to our 'div'
    this.m_element.setAttributeNode(l_id);
    
    // if we have a class, then declare it
    if (p_class != null)
    {
        // Create the 'class' attribute
        var l_class = document.createAttribute("class");
        
        // Set its value to our required id in p_id
        l_class.value = p_class;
        
        // Add 'id' to our 'div'
        this.m_element.setAttributeNode(l_class);
    }
    
    // Set the main container to use absolute positioning
    this.m_element.style.position = "absolute";   
    // Set the main container to start as hidden
    this.m_element.style.visibility = "hidden";    
    
    // Set the position    
    this.m_element.style.left = p_x;
    this.m_element.style.top = p_y;
    
    // set the size
    this.m_element.style.width = p_width;
    this.m_element.style.height = p_height;
    
    // Make a shortcut to the style
    this.m_style = this.m_element.style;    

    // "All This Popins Are Belong To Us"
    this.m_element.m_popin = this;

    // Find me some 'body' to love.
    l_body = document.getElementsByTagName("body");
    
    // Add the lovechild.
    l_body[0].appendChild(this.m_element);
}

/*!
	@fn			function MetaWrap_Widget_Popin_show()
	@brief		Shows a popin widget - makes it visible
	@return	    void
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_show()
{
    this.m_element.style.visibility = "visible";    
}
MetaWrap.Widget.Popin.prototype.show = MetaWrap_Widget_Popin_show;

/*!
	@fn			function MetaWrap_Widget_Popin_show()
	@brief		Shows a popin widget
	@return	    void
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_hide()
{
    this.m_element.style.visibility = "hidden";    
}
MetaWrap.Widget.Popin.prototype.hide = MetaWrap_Widget_Popin_hide;

/*!
	@fn			function MetaWrap_Widget_Popin_move(p_x,p_y)
	@param      p_x The new x position
	@param      p_y The new y position
	@brief		Repositions a popin window
	@return	    
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_move(p_x,p_y)
{
    this.m_element.style.left = p_x;    
    this.m_element.style.top = p_y;    
}
MetaWrap.Widget.Popin.prototype.move = MetaWrap_Widget_Popin_move;

/*!
	@fn			function MetaWrap_Widget_Popin_size(p_width,p_height)
	@param      p_width The new width
	@param      p_height The new height
	@brief		Resizes a popin window
	@return	    
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_size(p_width,p_height)
{
    this.m_element.style.width = p_width;    
    this.m_element.style.height = p_height;    
}
MetaWrap.Widget.Popin.prototype.size = MetaWrap_Widget_Popin_size;


/*!
	@fn			function MetaWrap_Widget_Popin_style(p_name,p_value)
	@param      p_name The style
	@param      p_value The value to set it to
	@brief		Sets the style of an element
	@return	    
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_style(p_name,p_value)
{
    this.m_style[p_name] = p_value;    
}
MetaWrap.Widget.Popin.prototype.style = MetaWrap_Widget_Popin_style;


/*!
	@fn			function MetaWrap_Widget_Popin_transparency(p_transparency)
	@param      p_transparency A real number between 0.0 (transparent) and 1.0 (opaque).
	@brief		Sets the transparency level of the widget
	@return	    
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_transparency(p_transparency)
{
    this.style('filter',"Alpha(Opacity=" + p_transparency*100 + ", Style=0)");
    this.style('-moz-opacity',p_transparency);
    this.style('opacity',p_transparency);
}
MetaWrap.Widget.Popin.prototype.transparency = MetaWrap_Widget_Popin_transparency;

/*!
	@fn			function MetaWrap_Widget_Popin_populate(p_html)
	@brief		
	@return	    
	@author		James Mc Parlane
	@date		14 November 2005
*/
function MetaWrap_Widget_Popin_populate(p_html)
{
    this.m_element.innerHTML = p_html;
}
MetaWrap.Widget.Popin.prototype.populate = MetaWrap_Widget_Popin_populate;

/*!
	@fn			MetaWrap.Widget.Popin.current = function(p_element)
	@param      p_element any element that is, or is inside the popin
	@brief		Statif member function that gets the a reference to the popin we are currently inside wrt. p_element
	@return	    A reference to the current popin that p_element is, or is inside
	@author		James Mc Parlane
	@date		14 November 2005
*/
MetaWrap.Widget.Popin.current = function(p_element)
{
    // Start from this one
    while(p_element != null)
    {
        // if this element has a popin
        if (p_element.m_popin != null)
        {
            // then we assume its the current popin..
            return p_element.m_popin;
        }        
        
        // no popin - try the next level up
        p_element = p_element.parentNode;        
    }
    
    return null;
}
 
/*! @name  MetaWrap.Widget.Popin Namespace */
//@{


//@}