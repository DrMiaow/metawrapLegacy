/*

    @file mw_lib_page_selection.js

    $Id: mw_lib_page_selection.js,v 1.17 2007/01/20 01:23:51 james Exp $
          
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
 * $Log: mw_lib_page_selection.js,v $
 * Revision 1.17  2007/01/20 01:23:51  james
 * More progress with Editor
 *
 * Revision 1.16  2006/12/10 07:37:24  james
 * Working on cursor placement
 *
 * Revision 1.15  2006/12/10 05:59:57  james
 * Completed proof of concept general selector - next step is to get the cursor working
 *
 * Revision 1.14  2006/12/09 23:58:24  james
 * Working text selection algorithm
 *
 * Revision 1.13  2006/12/09 06:33:58  james
 * Working on getting in place editing working
 *
 * Revision 1.12  2006/12/01 07:01:59  james
 * Recursive element/text offset evaluator
 *
 * Revision 1.11  2006/11/12 08:25:42  james
 * Simplified the whole page selection process
 *
 * Revision 1.10  2006/11/12 07:30:17  james
 * Got single click working - now just need to compare both systems
 *
 * Revision 1.9  2006/11/12 06:46:43  james
 * Got page edit selection working the same as Mozilla - now just need to tidy it up
 *
 * Revision 1.8  2006/11/11 06:38:20  james
 * Some javascript tweaks and changes
 *
 * Revision 1.7  2006/10/22 08:36:56  james
 * Creating simple in page editing class
 *
 * Revision 1.6  2006/10/20 08:05:32  james
 * working on edit in place
 *
 * Revision 1.5  2006/10/18 08:47:06  james
 * Playing with edit in place
 *
 * Revision 1.4  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.3  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.2  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.1  2006/05/06 07:09:36  james
 * Refactoring code
 *
 */

/*! \page mw_javascript_lib_page_selection MetaWrap - JavaScript - Page -  Selection
 *
 */

// Used for debugging
//("$Id: mw_lib_page_selection.js,v 1.17 2007/01/20 01:23:51 james Exp $");
 
/*! \defgroup mw_javascript_lib_page_selection  MetaWrap - JavaScript - Page -  Selection
 *@{
 */ 
 
// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");

/*! @name 	MetaWrap.Page.Selection */
//@{

/*! @namespace  MetaWrap.Page.Selection */
MetaWrap.Page.Selection = {};

/*!
    @fn         MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffsetByNode = function(p_parent,p_element,r_o) 
    @param      p_parent The parent of p_element
    @param      p_element The element that we are getting the offset within
    @param      r_o The object that contains both our parameters and our return value
    @return     true if we found our element within the alloted region
    @brief      This calculates the element and the relative offset to based on the supplied absolute offset.
    @author     James Mc Parlane
    @date       6 September 2004
    
    This calculates the element and the text offset within that element relative to p_parent based on the 
    supplied absolute offset (r_o.m_offset).
    
	If I use the offsets from my createRange/moveStart.inRange algorithm 
	these are not accurate because createRange is a map into a set of characters that 
	includes mysterious cr and lf pairs that seem to correspond to 'browser lines' in 
	the browser rendering. This function takes this whitespace into account when
	calculating which element matches what.
    
    For example - we want to work our the relative location of *
    
    <body><p>Hello</p><p>Cruel</p><p>Wo*rld</p></body>
    
    If p_parent is <body> and offset is 16 it will return element P[2] offset 2
    
    Its invoked in the following way...
    
	var l_o = 
		{		
			m_start:p_start,
			m_offset:p_offset,		
			m_total_offset:0,
			m_location:null
		};
	
	MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffsetByNode(null,p_document.body,l_o);        
*/    
MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffsetByNode = function(p_parent,p_element,r_o) 
{
	// Start element..
	var l_element = p_element;	

	// We know of no previous element.. yet...	
	var l_prev = null;	

	// While we have a non null element	
	while(l_element != null)
	{	

	
		// If its a node - we need to calculat what its 'text'
		if (l_element.nodeType == 1)
		{
			//////////////////////////////////////////////////
			//
			// Process the previous element rules.
			//
			
			if (l_prev != null)
			{
				// If we are breaking out of
				switch(l_prev.nodeName)
				{
					case "INPUT":
					case "SELECT":					
					case "TEXTAREA":	
					case "BR":										
					case "SPAN":
						switch(l_element.nodeName)
						{
							case "H1":
							case "H2":
							case "H4":
							case "H5":
							case "H6":	
								//alert("prev INPUT");	
								//alert("PREV +2");					
								r_o.m_total_offset+=2;					
							break;								
						}				
					break;								
				/*
					case "BR":					
					switch(l_element.nodeName)
					{
						case "H1":
						case "H2":
						case "H4":
						case "H5":
						case "H6":	
							alert("PRE BR +2");			
							r_o.m_total_offset+=2;					
						break;								
					}				
					break;								
					*/
				}
			}	
			
			//
			//
			//////////////////////////////////////////////////
			
			//////////////////////////////////////////////////
			//
			// Evaluate the "child emerging from parent" rules
			//			
			
			if (p_parent != null)
			{
				// If we are breaking out of
				switch(p_parent.nodeName)
				{
					case "H1":
					case "H2":
					case "H4":
					case "H5":
					case "H6":				
					case "P":
					
					switch(l_element.nodeName)
					{
						case "H1":
						case "H2":
						case "H4":
						case "H5":
						case "H6":				
						case "P":
							//alert("CEFP +2");
							r_o.m_total_offset+=2;					
						break;								
					}				
					break;								
				}
			}	
			
			//
			//
			//////////////////////////////////////////////////
				
			//////////////////////////////////////////////////		
			//
			// Process the children
			//
		
			// and if it has children - we want to enter the first one..
			if (l_element.firstChild != null)
			{
				// go get em...
				if (MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffsetByNode(l_element,l_element.firstChild,r_o))
				{
					return true;
				}
			}	
			
			//
			//
			//////////////////////////////////////////////////
			
			//////////////////////////////////////////////////
			//
			// Evaluate the post children element rules
			//
						
			switch(l_element.nodeName)
			{
				case "BR":				
				case "H1":
				case "H2":
				case "H4":
				case "H5":
				case "H6":				
				case "P":
				case "LI":				
				//case "SPAN":
					//alert("POST +2");
					r_o.m_total_offset+=2;
				break;				
				//case "IMG":
					//r_o.m_total_offset+=1;
				//break;								
			}
			
			//
			//
			//////////////////////////////////////////////////

			// remember the previous element		    
	   		l_prev = l_element;
		}
		else	
		// If its text		
		if (l_element.nodeType == 3)
		{
			var l_length = l_element.data.length;
			 
			//	The text inside TEXTAREA needs to be treated differently.
			//	IE selection text treats a single CR or LF in a TEXTAREA 
			//	as a CRLF pair so we need to detect this and adjust our count accordingly
			
			if ((p_parent != null) && (p_parent.nodeName == "TEXTAREA"))
			{
					//alert(MetaWrap.strip0D0A(l_element.data) + " " + MetaWrap.strip0D0A(l_element.data).length);
					
					l_length += ((l_length - MetaWrap.strip0D0A(l_element.data).length));
					
			}
			
		
			// If we are selecting the start then we are allowed to 
			// select from the end of the previous element, including the newline
			if (
					(r_o.m_start && (r_o.m_total_offset + l_length > r_o.m_offset))
					||			
					(!r_o.m_start && (r_o.m_total_offset + l_length >= r_o.m_offset))
				)
			{
				// Work out the remainder of the offset
				var l_offset = r_o.m_offset - r_o.m_total_offset;
			    
			    // Get the location string
			    var l_location = MetaWrap.getDOMLocationFromElement(l_element);
			    
			    // Get the location string, offset and element
				r_o.m_location = {m_location:l_location,m_offset:l_offset,m_element:l_element}
			    
			    // Return it as a real location and offset
				return true;
			}
			else
			{				
			
				r_o.m_total_offset += l_length;
			}
		}
		else	
		// If its a comment
		if (l_element.nodeType == 8)
		{
			// Skip it..
		}		
		else
		{
			error("Unknon nodeType  " + l_element.nodeType);
		}
		
		//alert(l_element.nodeName + " " + r_o.m_total_offset);

		// Go to the next element
		l_element = l_element.nextSibling;
	}	
	
	// we didn't finish in up there - so we didn't find anything in this set of sibling elements
	return false;	
}

/*!
    @fn         MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffset = function(p_document,p_offset,p_start) 
    @param      p_document The ownerDocument for this element
    @param      p_offset The offset w.r.t the body element
    @param      p_start We are working out the offset for the start of a selection (if this is false then we are choosing the end)    
    @return     An  object containing {m_start:int, m_end:int} which are the start and endpoints of the selection
    @brief      This calculates the element and the relative offset to based on the supplied absolute offset.
    @author     James Mc Parlane
    @date       6 September 2004
    
    For example - we want to work our the relative location of *
    
    <body><p>Hello</p><p>Cruel</p><p>Wo*rld</p></body>
    
    If p_parent is <body> and offset is 16 it will return element P[2] offset 2
*/    
MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffset = function(p_document,p_offset,p_start) 
{
	//alert("getElementAndOffsetFromBodyOffset " + p_start + " " + p_offset);

	var l_o = 
		{		
			m_start:p_start,
			m_offset:p_offset,		
			m_total_offset:0,
			m_location:null
		};

	
	MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffsetByNode(null,p_document.body,l_o);
	
	return l_o.m_location;
}


/*!
    @fn         MetaWrap.MacroRecorder.Selection.get = function(p_element,p_document) 
    @param      p_element The element or document the selection is happening on
    @param      p_document The ownerDocument for this element
    @return     An  object containing {m_start:int, m_end:int} which are the start and endpoints of the selection
    @brief      This is our capture hook for all events
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Page.Selection.get = function(p_element,p_document) 
{
    // The IE way?
    if (p_document.selection)
    {
        // ...requires a lot of thought in IE...

        // Get the current selected range
        var l_range_current = p_document.selection.createRange();
        
        // Make a copy or our selected range
        var l_range_copy = l_range_current.duplicate();

		// this will be our final fill selection start object        
		var l_result_start = null;     

		// this will be our final fill selection end object
		var l_result_end = null;   

		// Absolute Start offset for our selection
        var l_start = 0;
        
        // Absolute end offset for our selection
        var l_end = 0;
        
        // Length of the selection
        var l_length = l_range_current.text.length;
       
        // If text area...
        if (p_element.nodeName == "TEXTAREA")
        {       
        	//
        	// Inside TEXTAREA we need to perform a simple Newtons search, shifting
        	// the range around until we have something that encloses it
        	//
        	// So we start with some two selections <l_range_copy> and {l_range_current} inside a textarea
        	//
        	// [ABCD<{EFG}>HIJK]
        	// 
            // We then take l_range_copy and make it surround all the text selection 
            // we need to measure the location of l_range_current relative to l_range_copy
            //
            //
            if (l_range_copy.text != "")
            {
                l_range_copy.moveToElementText(p_element);
            }            
            // so now we have <l_range_copy> encloses the whole selection and {l_range_current}
            //
        	// [<ABCD(EFG)HIJK>]    
        	//
        	// now we use l_range_copy.inRange(l_range_current) to determine if {l_range_current} is
        	// inside <l_range_copy> as we shrink the start of <l_range_copy>. If we shrink too far then 
        	// l_range_copy.inRange(l_range_current) will return false
        	// 
        	// Instead of shrinking just one character at a time we use the divide and conquer method.
            
	        //  Work out our maximum and minimum changes possible
	        var l_min = 0;            
	        var l_max = l_range_copy.text.length;            
	        
	        // Keep shifting the start until the l_range_current is outside l_range_copy
	        while(l_range_copy.inRange(l_range_current) && (l_start <= l_end))
	        {
	            // create a delta
	            var l_delta = Math.floor((l_max - l_min)/2);
	
				// If there is no delta when are there already.                                    
	            if (l_delta == 0)	            
	            {
	            	if (l_max != l_min)
	            	{
		                // At this point we need to be either l_max or l_min
		                // because of the way this algorithm works - we are currently
		                // at l_min - and l_max can only be l_min + 1                
		                ASSERT(l_max == l_min+1,"l_max should be equal to l_min+1 (" + l_max + "," + l_max + ")");
		                
		                // So we only need to see if moving to l_max keeps us in range - if it does - then 
		                // l_max is our solution, otherwise we want to be l_min.
		            
		                // Test by advancing l_min to one - which takes us to l_min == l_max, which is what we want to test
		                l_min++;
		                l_range_copy.moveStart('character',1);
		                
		                // if we are not in range - then it must have been l_min
		                if (!l_range_copy.inRange(l_range_current))
		                {
		                    // so we go back to original l_min
		                    l_min--;
		
		                    // do the below to be strictly correct - but we never return the data or need it
		                    
		                    l_max--;
		                    l_range_copy.moveStart('character',-1);                            
		                }
	                }            
	                break;
	            }
	            
	            // move in a positive delta so that we shrink by l_delta
	            l_range_copy.moveStart('character',l_delta);
	            
	            // If we are in range then we didn't go far enough
	            if (!l_range_copy.inRange(l_range_current))
	            {
	                // otherwise - we know that our answer is somewhere between l_min and l_min + l_delta
	                l_max = l_min + l_delta;                   
	                
	                // We need to move back to where we started
	                l_range_copy.moveStart('character',-l_delta);
	            }
	            else
	            {
	                // we know that we need to be somewhere in between l_min + delta and l_max                
	                l_min += l_delta;                   
	            }   
	        }  
	        // So now we are out of the loop
	        
	        // start is the minimum offset
	        l_start = l_min;
	        
	        // And the end is the start plus the length (we don't track the end - we could- but we can just calculate it from this)
	        l_end = l_start + l_length;            
        }
        else
        {            
            // Make it surround the selection - seems to be a bug in IE. Can't use moveToElementText on a non TEXTAREA
            //l_range_copy.expand('textedit');
            
	       	// Move back 10000 in chunkds of sentences {which should be large enough for everybody :) }
	        while(l_range_copy.moveStart('sentence',-10000) != 0);
	       		       	
	        // Then move by characers till we can't move any more
	        while(l_range_copy.moveStart('character',-1) != 0);
	        
	        // project the end from the start based on the length of the selected text
	        l_end = l_range_copy.text.length;
	
	        // This is our range
	        l_start = l_end - l_length;            
        }

		// We need to do nothing special in a text input because IE only lets you 
        if (p_element.nodeName == "INPUT" || p_element.nodeName == "TEXTAREA")
        {
		    var l_location = MetaWrap.getDOMLocationFromElement(p_element);        
	        //window.status = l_location + ":" + l_start + " to " + l_end + " " + l_length + "]";					
        }
        else
        {
        	if (l_length == 0)
        	{
        		// length is zero..
        		
        		//alert("l_length == 0");
        		
        		l_result_start = MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffset(p_document,l_start,false);     			
        		l_result_end = l_result_start;
        		
			    //var l_location = MetaWrap.getDOMLocationFromElement(p_element);	       
				//document.title = l_location + ":" + l_start + " to " + l_end + "]";					
        		
        	}
        	else        	
        	{
	  	        
	  	        var l_start_with_crlf = (l_range_copy.text.indexOf("\r\n") == 0);
				
				//document.title = l_inner_diff + " " + l_start_with_crlf + " " + l_diff + " - " + l_start + " " + l_length;
	
	        	// Special case of selecting from end of previous linbe
				l_result_start = MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffset(p_document,l_start,!l_start_with_crlf);     			
				l_result_end = MetaWrap.Page.Selection.getElementAndOffsetFromBodyOffset(p_document,l_end,false);     			
			}
	      	
			
			if (l_result_start == null)
			{
				// do nothing
				window.status = "l_result_start == null";
			}
			else
			if (l_result_end == null)
			{
				// do nothing
				window.status = "l_result_end == null";
			}
			else
			if (l_result_start.m_location == l_result_end.m_location)
			{
				window.status = l_range_current.text.length + "! " + l_result_start.m_location + ":" + l_result_start.m_offset + " to " + l_result_end.m_offset + " [" + l_start + " " + l_end + "]";		
			}
			else
			{
				window.status = l_range_current.text.length + "? " +  l_result_start.m_location + ":" + l_result_start.m_offset + " " + l_result_end.m_location + ":" + l_result_end.m_offset + " [" + l_start + " " + l_end + "]";		
			}
		}
         
        // Return a well structured object
        return { m_start    : l_start,
        	     m_end      : l_end, 
        	     m_start_new : l_result_start, 
        	     m_end_new  : l_result_end };        
    }
    else
    {   
        // The process in Mozilla is so simple that it makes me want to stab someone at Microsoft...    

         // Work out what the window is
         var l_window = p_document.defaultView||p_document.parentWindow; 
         
        // This will store the final selection
        var l_offset_start = 0;
        var l_offset_end = 0;        
        var l_node_start = "";
        var l_node_end = "";
        var l_element_start = null;
        var l_element_end = null;        
         
        // http://developer.mozilla.org/en/docs/DOM:window.getSelection
        var l_sel = l_window.getSelection();

		// no selection, no booty
        if (l_sel != null)
        {               
            // are we selecting inside a TEXTAREA or INPUT?
            if ((p_element.nodeName == "TEXTAREA") || ((p_element.nodeName == "INPUT") && (p_element.type == "text")))
            {
                // get the start node
                l_node_start = MetaWrap.getDOMLocationFromElement(p_element);
                l_node_end = l_node_start;

                // Get the start and end offsets
                l_offset_start = p_element.selectionStart;                                       
                l_offset_end = p_element.selectionEnd;
                
                window.status = "TEXT " + l_node_start + ":" + l_offset_start + " " + l_node_end + ":" + l_offset_end;
            }
            else                   
            {              
                // We must be selecting inside the document
                             
                // get the start offset
                l_offset_start = l_sel.anchorOffset;

                // get the start node
                l_node_start = MetaWrap.getDOMLocationFromElement(l_sel.anchorNode);
                
                // Get the start element
                l_element_start = l_sel.anchorNode;

                // get the end offset               
                l_offset_end = l_sel.focusOffset;

                // get the end node
                l_node_end = MetaWrap.getDOMLocationFromElement(l_sel.focusNode);
                
                // Get the start element
                l_element_end = l_sel.focusNode;
                
				window.status = "OTHER " + l_node_start + ":" + l_offset_start + " " + l_node_end + ":" + l_offset_end;					                
            } 
        }   	

        // Return a well structured object
        return { 
                 m_start     : p_element.selectionStart, 
        		 m_end       : p_element.selectionEnd,
        	     m_start_new : {
        	     					m_location : l_node_start,
        	     					m_offset   : l_offset_start,
        	     					m_element   : l_element_start
        	     			   }, 
        	     m_end_new  :  {
        	     					m_location : l_node_end,
        	     					m_offset   : l_offset_end,
	      	     					m_element   : l_element_end
        	     			   } 
        	     };        
        
    }
        
    return null;
}
 

/*! 
 *@} endgroup mw_javascript_lib_page_selection MetaWrap - JavaScript - Page - Selection
 */ 

/*! 
 *@} end of MetaWrap.Page.Selection
 */  



