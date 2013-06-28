/*! 

    $Id: mw_lib_widget.js,v 1.5 2006/12/21 13:07:18 james Exp $

    FILE:       @file mw_lib_widget.js
              
    @author     James Mc Parlane

    PROJECT:    MetaWrap JavaScript Library

    COMPONENT:  -

    DATE:       21 October 2001

    COMMENTS:   -

    MODIFIED:   -

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

    This program is free software; you can redistribute it and/or modify
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

/*! \page mw_javascript_lib_widget MetaWrap - JavaScript - Widget
*/

/*
 * $Log: mw_lib_widget.js,v $
 * Revision 1.5  2006/12/21 13:07:18  james
 * Started widget library
 * Got htmlform editor working
 *
 * Revision 1.4  2006/12/21 07:42:25  james
 * Started working on dynamic layout widgets
 *
 */

/*! \defgroup mw_javascript_lib_widget Widget
 *@{
 */
 
// @brief Create MetaWrap.Widget Namespace
MetaWrap.Widget = MetaWrap.Class.extend(
{
		constructor: function(p_name) 
		{
			this.m_name = p_name;
			this.attach();
		},

		m_type: "widget",
		m_name: "",
		m_x:0,
		m_y:0,
		m_width:100,
		m_height:100,		
		m_transparency:100,		

		attach: function() 
		{
		},
		
		div: function() 
		{
			return null;
		},
		
		move: function(p_x,p_y,p_width,p_height,p_transparency)
		{
		    trace("* Widget_Position '" + this.m_sName + "'" + p_x + "," + p_y + " " + p_width + "," + p_height + " (" + p_transparency + ")" );
            
		    // save the position and transparency
		    this.m_x = p_x;
		    this.m_y = p_y;
		    this.m_width = p_width;
		    this.m_height = p_height;
		    this.m_transparency = p_transparency;   
		},
		
		show: function()
		{
		},	
		
		hide:function()
		{		            		
		}
});


// @brief Create MetaWrap.Widget Namespace
MetaWrap.Widget.DIV = MetaWrap.Widget.extend(
{
		m_div: null,

		move: function(p_x,p_y,p_width,p_height,p_transparency)
		{
		    trace("* Widget_Position '" + this.m_sName + "'" + p_x + "," + p_y + " " + p_width + "," + p_height + " (" + p_transparency + ")" );
		    
		    //
		    // work out if we need to be visible or invisible
		    //
		    
		    if ((this.m_transparency == 0) && (p_transparency != 0)) 
		    {
		        // transition from invisible to visible
		        this.m_div.style.visibility = "visible";
		    }
		    else
		    if ((this.m_transparency != 0 ) && (p_transparency == 0)) 
		    {
				// transition from visible to invisible
				this.m_div.style.visibility = "hidden";
		    }
		    
		    
		    // Get a reference to the style of the div
		    var l_div_style = this.m_div.style;
		    
            // set the width and height and         
            l_div_style.left = p_x;
            l_div_style.top = p_y; 
                        
            l_div_style.width = p_width; 
            l_div_style.height = p_height;    
                        
            if (MetaWrap.Widget.g_SFX)
            {
                l_div_style.filter = "Alpha(Opacity=" + p_transparency + ", Style=0)";             
            }

			this.base(p_x,p_y,p_width,p_height,p_transparency);            
		},
		
		attach: function() 
		{
		    /* get a handle to our div by using the widget name as a basis for its id attribute*/
			this.m_div = document.getElementById(this.m_name);

			ASSERT(this.m_div,"unable to find div " + this.m_name);
			
		    // Get a reference to the style of the div
		    var l_div_style = this.m_div.style;
			
			
            // set the width and height and         
            this.m_x = l_div_style.left;
            this.m_y = l_div_style.top; 
                        
            this.m_width = l_div_style.width; 
            this.m_height = l_div_style.height;    			
            
            if (MetaWrap.Widget.g_SFX)
            {
	            alert(l_div_style.filter);
            }
		},
		
		div: function() 
		{
			return this.m_div;
		},
		
		show: function()
		{
		    /* make it hidden */
		    this.m_div.style.visibility = "visible";		
		},	
		
		hide:function()
		{		            		
		    /* make it hidden */
		    this.m_div.style.visibility = "hidden";				
		}
			
});


MetaWrap.Widget.g_SFX = false;

/* end of group mw_javascript_lib_widget */
/*! @}*/
