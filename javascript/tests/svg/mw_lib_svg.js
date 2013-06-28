/*

    @file mw_lib_svg.js

    $Id: mw_lib_svg.js,v 1.2 2006/07/01 08:07:00 james Exp $
          
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
 * $Log: mw_lib_svg.js,v $
 * Revision 1.2  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.1  2006/05/15 13:49:12  james
 * Developed SVG library for some visualisation
 *
 */
 
 //alert("$Id: mw_lib_svg.js,v 1.2 2006/07/01 08:07:00 james Exp $");

/*! \page mw_javascript_lib_svg MetaWrap - JavaScript - SVG
 *
 * \subsection mw_network_client_http Overview
 *
 * http://www.kevlindev.com/tutorials/basics/shapes/js_dom/
 */
 
/*! \defgroup mw_javascript_lib_svg  MetaWrap - JavaScript - SVG
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
 

/*! @name  MetaWrap.SVG Namespace */
//@{

/*!
    @namespace  MetaWrap.SVG
    @brief      Declare the MetaWrap.SVG namespace
    @author     James Mc Parlane
    @date       19 October 2002    
*/
MetaWrap.SVG = function()
{
    this.m_svg = null;
    this.m_document = document;
}

MetaWrap.SVG.NAMESPACE = "http://www.w3.org/2000/svg";

MetaWrap.SVG.prototype.bind = function(p_id,p_document)
{    
    this.m_document = p_document||document;
    this.m_svg = this.m_document.getElementById(p_id);
    
    if (this.m_svg == null)
    {
        error("unable to bind to svg element with id of '" + p_id + "'");
    }
}

MetaWrap.SVG.Circle = function(p_document)
{
    this.m_element = p_document.createElementNS(MetaWrap.SVG.NAMESPACE, "circle");
}

MetaWrap.SVG.prototype.circle = function(p_x,p_y,p_r,p_color) 
{   
    var l_shape = new MetaWrap.SVG.Circle(this.m_document);
    
    l_shape.m_element.setAttributeNS(null, "cx", p_x);
    l_shape.m_element.setAttributeNS(null, "cy", p_y);
    l_shape.m_element.setAttributeNS(null, "r",  p_r);
    l_shape.m_element.setAttributeNS(null, "fill", p_color);
    
    this.m_svg.appendChild(l_shape.m_element);
    
    return l_shape;
}

MetaWrap.SVG.prototype.stop = function() 
{   
    this.m_svg.suspendRedraw(2000);
}

MetaWrap.SVG.prototype.restart = function() 
{   
    this.m_svg.unsuspendRedraw(2000);
}

/*! 
 *@} endgroup mw_javascript_lib_svg MetaWrap - JavaScript - SVG
 */ 

/*! 
 *@} end of MetaWrap.SVG
 */ 
      