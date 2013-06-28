/*

    @file mw_lib_htmlform.js

    $Id: mw_lib_htmlform.js,v 1.3 2006/12/22 09:29:20 james Exp $
          
    @author     James Mc Parlane
          
    PROJECT:    MetaWrap JavaScript Library
          
    COMPONENT:  -
        
    @date       11 September 2006
          

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
 * $Log: mw_lib_htmlform.js,v $
 * Revision 1.3  2006/12/22 09:29:20  james
 * Latest changes to get htmlform styling
 *
 * Revision 1.2  2006/12/21 13:07:18  james
 * Started widget library
 * Got htmlform editor working
 *
 * Revision 1.1  2006/12/20 10:47:15  james
 * Latest version of the js library
 *
 */

/*! \page mw_lib_htmlform MetaWrap - JavaScript - XML - HtmlForm
 *
 * \subsection mw_javascript_lib_htmlform Overview
 *
 */

//alert("$Id: mw_lib_htmlform.js,v 1.3 2006/12/22 09:29:20 james Exp $");
 
/*! \defgroup mw_javascript_lib_htmlform  MetaWrap - JavaScript - XML - HtmlForm
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Link","mw_lib_link.js");
 
/*! @name  MetaWrap.HtmlForm  */
//@{

/*!
    @namespace  MetaWrap.HtmlForm
    @fn         MetaWrap.HtmlForm = function(p_object,p_skip)
    @param      p_object reference to the object we want to serialise
    @param      p_name (Optional) - default is 'object' The name to give to the obect as a whole. If null then there is no XML named wrapper.
    @return     void 
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       11 September 2006
*/    
MetaWrap.HtmlForm = function(p_object,p_skip,p_parent,p_name)
{
    if (p_skip == null)
    {
        p_skip = false;
    }

    // The string we will be returning
    var l_return = new String();
    
    
    
    // The object type
    var l_object_type = '';

    // ge the type of the object
    l_object_type = MetaWrap.typeOf(p_object);    
       
    
    //alert(l_object_type + ' <= ' + p_object);
    
    
    if (l_object_type != null)
    {
    
        // What kind of object do we have?
        switch(l_object_type)
        {
            case 'string':
            case 'boolean':        
            case 'number':
            {
            
				if (p_parent == null)
				{
					error("Can't call MetaWrap.HtmlForm dirctly on a value object (String,Number,Boolean)");
				}
            
				// Get the id of this object
				var l_id = MetaWrap.Link.getID(p_parent,p_name);
            
				l_return += '<input id="' + l_id + '" value="';
                // a simple string - just get the value
                l_return += new String(p_object);                                    
                l_return += '"';
                l_return += ' onchange="MetaWrap.HtmlForm.save(this)"';
                if (l_object_type == "boolean")
                {
					l_return += ' type="checkbox"';
					if (p_object)
					{
						l_return += ' checked="true"';
					}
                }
                l_return += ' >';
                l_return += '</input>';
            }
            
            break;

            case 'array':
            {            
                // an array - walk through each one and put in in an item            
                for (var l_item in p_object) 
                {                
                    l_return += MetaWrap.HtmlForm(p_object[l_item],false,p_object,l_item);
                }                                
            }        
            break;

            case 'object':                        
            {         
				l_return += '<div class="ul">';  
               				                 
                // an object - walk through each member in the object
                for (var l_member in p_object) 
                {
                    // get the type of this member
                    var l_member_type = MetaWrap.typeOf(p_object[l_member]);

                    // We only serialise member object
                    if ((l_member_type != 'function') && (l_member.indexOf('m_') == 0))
                    {     
                    
                        // could speed this up by an associative array
                        var l_member_name = l_member.substring(2,l_member.length);

                        //alert(l_member_name + ' (' + l_member_type + ') ' + p_object[l_member])
                        
                        // ge the type of the object
                        var l_sub_object_type = MetaWrap.typeOf(p_object[l_member]);    
                        
                        //alert(l_member + ' := ' + l_sub_object_type + ' == ' + p_object[l_member]);

                        if ((l_member_type == "array") && (p_object[l_member].length == 0))
                        {
							// do nothing
                        }
                        else
                        {                        
							l_return += '<div class="li">';  
	                        
							// wrap the object in a container                           
							//var l_id = MetaWrap.Link.getID(p_object,l_member);
	                        
							//l_return += '<label for="' + l_id + '">' + l_member_name + '</label>';
							l_return += '<label>' + l_member_name + '</label>';
	                        
							l_return += MetaWrap.HtmlForm(p_object[l_member],false,p_object,l_member);
	                        
							l_return += '</div>';    
                        }
                    }                                         
                }   
                
				l_return += '</div>';
            }
            break;

            default:
                alert('Unknown type ' + l_object_type);
            break;
        }
    }
    
        
    // Return the result
    return l_return;
}


MetaWrap.HtmlForm.save = function(p_input)
{
	var l_object = MetaWrap.Link.getObject(p_input.id);
	var l_child = MetaWrap.Link.getChild(p_input.id);
	
	switch(p_input.type)
	{
		case "checkbox":
		{
			l_object[l_child] = p_input.checked;
		}
		break;
	
		case "text":
		{
			l_object[l_child] = p_input.value;
		}
		break;
	}
}


/*! 
 *@} endgroup mw_javascript_lib_htmlform MetaWrap - JavaScript - XML - HtmlForm
 */ 

/*! 
 *@} end of MetaWrap.HtmlForm
 */ 





