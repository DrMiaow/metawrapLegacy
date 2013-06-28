/*

    @file mw_lib_page_edit.js

    $Id: mw_lib_page_edit.js,v 1.12 2007/01/20 12:33:59 james Exp $
          
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
 * $Log: mw_lib_page_edit.js,v $
 * Revision 1.12  2007/01/20 12:33:59  james
 * Added more to editor
 *
 * Revision 1.11  2007/01/20 01:23:51  james
 * More progress with Editor
 *
 * Revision 1.10  2006/12/10 05:59:57  james
 * Completed proof of concept general selector - next step is to get the cursor working
 *
 * Revision 1.9  2006/12/01 07:01:59  james
 * Recursive element/text offset evaluator
 *
 * Revision 1.8  2006/11/12 08:25:42  james
 * Simplified the whole page selection process
 *
 * Revision 1.7  2006/11/12 07:30:17  james
 * Got single click working - now just need to compare both systems
 *
 * Revision 1.6  2006/11/12 06:46:43  james
 * Got page edit selection working the same as Mozilla - now just need to tidy it up
 *
 * Revision 1.5  2006/10/22 08:36:56  james
 * Creating simple in page editing class
 *
 * Revision 1.4  2006/10/21 08:17:57  james
 * *** empty log message ***
 *
 * Revision 1.3  2006/10/21 07:58:49  james
 * Building in page editor
 *
 * Revision 1.2  2006/10/20 08:05:32  james
 * working on edit in place
 *
 * Revision 1.1  2006/10/18 08:47:06  james
 * Playing with edit in place
 *
 */

/*! \page mw_javascript_lib_page_element MetaWrap - JavaScript - Page -  Edit
 *
 */

// Used for debugging
//alert("$Id: mw_lib_page_edit.js,v 1.12 2007/01/20 12:33:59 james Exp $");
 
/*! \defgroup mw_javascript_lib_page_element  MetaWrap - JavaScript - Page -  Edit
 *@{
 */ 
 
// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Page.Element","mw_lib_page_element.js");
MwUse("MetaWrap.Page.Selection","mw_lib_page_selection.js");

/*! @namespace  MetaWrap.Page.Edit */
MetaWrap.Page.Edit = {};
 
/*! @name       MetaWrap.Page.Edit */
//@{


/*!
    @fn         MetaWrap.Page.Edit.uniqueID = function(p_element)
    @param     p_element A reference to the edit we want to get the unique id for
    @return     a string representing the unique ID for an edit
    @brief      Returns the unique ID for an edit
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       I assume that document.addEventListener => edit.addEventListener and document|edit.removeEventListener Is this correct?
*/ 
MetaWrap.Page.Edit.update = function()
{
    // Look at what is selected

}

/*!
    @fn         MetaWrap.Page.Edit.uniqueID = function(p_element)
    @param     p_element A reference to the edit we want to get the unique id for
    @return     a string representing the unique ID for an edit
    @brief      Returns the unique ID for an edit
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       I assume that document.addEventListener => edit.addEventListener and document|edit.removeEventListener Is this correct?
*/ 
MetaWrap.Page.Edit.start = function()
{
    // Look at what is selected
    
    for(var l_event_type in MetaWrap.Page.Edit.m_standard_events)
    {
    	//alert(l_event_type);
    	
    	document["on" + l_event_type] = MetaWrap.Page.Edit.handleSelection;    
    }
    
//	document[l_event_type] = this.Handlers[l_event_type];    

}

var l_img_location = "";
//var l_string = '<div id="MetaWrap.Page.Edit.cursor" style="position:absolute;top:0;left:0;width:10;height:10;z-index:2147483647;background-color:#FF0000; " ></div>';

var l_string = '<span id="MetaWrap.Page.Edit.cursor" style="position:relative;width:2;height:10;z-index:2147483647;background-color:#FF0000; " ><img src="images/cursor.gif" width="2"></span>';

//document.write(l_string);

/* 
    @brief  List of standard w3c event handlers
*/
MetaWrap.Page.Edit.m_standard_events = 
{
    "click":1,
    "dblclick":1,
    "keydown":1,
    "keypress":1,
    "keyup":1,
    "keypress":1,
    "mousemove":1,
    "mousedown":1,
    "mouseout":1,
    "mouseover":1,
    "mouseup":1,
    "focus":1,
    "blur":1,
    "select":1,
    "keypress":1,
    "reset":1,
    "submit":1,
    "change":1
};


MetaWrap.Page.Edit.m_current_cursor = null;
MetaWrap.Page.Edit.m_last_mousedown = null;

MetaWrap.Page.Edit.m_current_event_element = null
MetaWrap.Page.Edit.m_current_event = null;

MetaWrap.Page.Edit.m_click_x = 0;
MetaWrap.Page.Edit.m_click_y = 0

MetaWrap.Page.Edit.m_selection = {};
MetaWrap.Page.Edit.m_selection.m_start_location = "";
MetaWrap.Page.Edit.m_selection.m_start = 0;
MetaWrap.Page.Edit.m_selection.m_end_location = "";                                  
MetaWrap.Page.Edit.m_selection.m_end = 0;

/*!
    @fn         MetaWrap.Page.Edit.handleSelection = function(p_event)
    @param      p_event The event that has been triggered that we want to save the selection of
    @return     void
    @brief      Handles selection events and saved the current selection away for later recording
    @author     James Mc Parlane
    @date       6 September 2004
*/   
MetaWrap.Page.Edit.handleSelection = function(p_event)
{
	var l_debug = "";
	    
    var l_event = MetaWrap.Page.Event.get(p_event,this); 
	
	// We only record selection for standard w3c events - all the rest get in the way
    if (MetaWrap.Page.Edit.m_standard_events[l_event.type] == 1)  
    {	         
        var l_element = (l_event.target) ? l_event.target : l_event.srcElement;        
        var l_type = l_event.type; 
	
        if ((l_element == null) && (l_event.type == "selectionchange"))
        {        
            // Use the previous location
            l_element = MetaWrap.getDOMElementFromLocation(MetaWrap.Page.Edit.m_current_event_location);                
        }
	         
	    // Get the current location
        var l_current_location = MetaWrap.getDOMLocationFromElement(l_element);
	         
	    // ignore any interaction with the cursor - as that could get rather confusing
        if ((l_current_location == "#MetaWrap.Page.Edit.cursor") || (l_current_location == "#MetaWrap.Page.Edit.cursor.image"))
        {
             return;
		}
	                     
        // Only need to work out the selection once we remove the mouse
        if (l_type == "mouseup") 
		{
	        // If we have an element
	        if (l_element != null)
	        {                        
		        // Work out what the document is
		        var l_document = null;            
		        
			    if (l_element.nodeName == "#document")
		        {
		            l_document = l_element;
		        }
		        else
		        {
		            l_document = l_element.ownerDocument;
		        }
		
		        // Work out what the window is
		        var l_window = l_document.defaultView||l_document.parentWindow;
		
		        // This will store the final selection
		        var l_offset_start = 0;
		        var l_offset_end = 0;
		        var l_node_start = "";
		        var l_node_end = "";
		
		           // Get the selection range offsets
		        var l_selection = MetaWrap.Page.Selection.get(l_element,l_document);
		        
		        // Shortcut
		        var l_sel = MetaWrap.Page.Edit.m_selection;
		          
		        // If we got a selection
				if ((l_selection != null) && (l_selection.m_start_new != null) && (l_selection.m_end_new != null))
				{
					// Store it
					 l_sel.m_start_location = l_selection.m_start_new.m_location;
					 l_sel.m_start = l_selection.m_start_new.m_offset;
					 l_sel.m_start_element = l_selection.m_start_new.m_element;
					 
					 l_sel.m_end_location = l_selection.m_end_new.m_location;                                  
					 l_sel.m_end = l_selection.m_end_new.m_offset;	
 					 l_sel.m_end_element = l_selection.m_end_new.m_element;
					 
					 
					 if (l_sel.m_start == l_sel.m_end)
					 {
						//var l_rect = MetaWrap.Page.Element.getRect(MetaWrap.$("test"));
						
						//document.title = l_sel.m_start_location + " nodeValue " + l_sel.m_start_element.nodeName;

/*						
						if (l_sel.m_start_element.parentNode.style.font == "")
						{
							window.status = l_sel.m_start_element.parentNode.nodeName + " default font";
						}
						else
						{						
							window.status = "move cursor " + l_sel.m_start_element.parentNode.nodeName + " font" + l_sel.m_start_element.parentNode.style.font;
						}
*/						

						//l_sel.m_start_element.parentNode.x.y;
						//x.y.z;
						
						var l_string = new String(l_sel.m_start_element.nodeValue);						
						var l_left = l_string.substring(0,l_sel.m_start);
						var l_right = l_string.substring(l_sel.m_start);
						//l_sel.m_start_element.nodeValue = l_left;
						
						var l_split_node = l_sel.m_start_element.splitText(l_sel.m_start);
						
						// Remove this node
						//l_sel.m_start_element.parentNode.removeNode(l_sel.m_start_element);
						
						/*
						var txt = document.createTextNode('AAA-BBB');
						txt.replaceData(0, 4, 'DDDD');
						var output = txt.data;
						*/
						
						// IE Only
						//object.insertAdjacentHTML(sWhere, sText)
						
						/*
						
						USE THIS FOR TYPING!
						insertData!!!!
						appendData
						*/
						
						
						
						
						var l_span=document.createElement('span');
						l_span.style.color="red";
						//l_span.setAttribute('id','test');
						var l_text=document.createTextNode('I');
						l_span.appendChild(l_text);
						
						
						if (l_sel.m_start_element.nextSibling != null)
						{
							// Add our test cursor at this point
							l_sel.m_start_element.parentNode.insertBefore(l_span,l_sel.m_start_element.nextSibling);
						}
						else
						{
							l_sel.m_start_element.parentNode.appendChild(l_span);
						}
						
						
						/*
						var l_span=document.createElement('span');
						l_span.style.position="relative";
						l_span.style.zIndex="2147483647";
						l_span.style.backgroundColor="rgb(255, 0, 0)";
						l_span.setAttribute('id','MetaWrap.Page.Edit.cursor.firefox');
						var l_img=document.createElement('img');
						l_img.setAttribute('width','2');
						l_img.setAttribute('height','18');
						l_img.setAttribute('src','images/cursor.gif');
						l_span.appendChild(l_img);						
						*/
						
						
						
						
					 }
					 
				}
				else
				{
				    // No selection...
				    l_sel.m_start_location = "";
				    l_sel.m_start = 0;
   				    l_sel.m_start_element = null;
				    
				    l_sel.m_end_location = "";            
				    l_sel.m_end = 0;
  				    l_sel.m_end_element = null;
				}   
	    	} 
	    }
	    else
        if (l_type == "mousedown") 
		{
		
			//var l_rect = MetaWrap.Page.Element.getRect(MetaWrap.$("test"));
			
			//document.title = "mousedown " + l_current_location + " " + l_rect.m_w + " " + l_rect.m_h;
			
			
		}
	    
	}
}



/*! 
 *@} endgroup mw_javascript_lib_page_element MetaWrap - JavaScript - Page - Edit
 */ 

/*! 
 *@} end of MetaWrap.Page.Edit
 */ 




