/*

    @file mw_lib_objectmodel.js

    $Id: mw_lib_objectmodel.js,v 1.11 2007/01/10 11:48:34 james Exp $
          
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
 * $Log: mw_lib_objectmodel.js,v $
 * Revision 1.11  2007/01/10 11:48:34  james
 * First objectmodel experiment
 *
 * Revision 1.10  2006/07/01 08:06:58  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.9  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.8  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.7  2006/03/21 20:52:33  james
 * Adding Classes to ObjectModel
 *
 * Revision 1.6  2006/02/23 12:27:32  james
 * Added stub dataschema
 *
 * Revision 1.5  2006/02/22 11:20:08  james
 * Added experimental code dispatch
 *
 * Revision 1.4  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.3  2006/01/29 09:12:12  james
 * more work on objectmodel
 *
 * Revision 1.2  2006/01/26 11:31:52  james
 * *** empty log message ***
 *
 * Revision 1.1  2006/01/26 11:14:21  james
 * Getting JavaScript version of object model up and running.
 *
 */


/*! \page mw_javascript_lib_objectmodel MetaWrap - JavaScript - ObjectModel
 *
 * \subsection mw_javascript_objectmodel_Overview Overview
 */
 
/*! \defgroup mw_javascript_lib_objectmodel  MetaWrap - JavaScript - ObjectModel
 *@{
 */ 

/*! @name  MetaWrap.ObjectModel*/
//@{

//alert("$Id: mw_lib_objectmodel.js,v 1.11 2007/01/10 11:48:34 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");

/*!
    @namespace	MetaWrap.ObjectModel
    @fn         MetaWrap.ObjectModel = function()
    @brief      Declare the MetaWrap.ObjectModel namespace
    @author     James Mc Parlane
    @date       19 October 2002    
*/
MetaWrap.ObjectModel = {};

 
/*!
    @fn         MetaWrap.ObjectModel.resolve = function(p_handle)
    @param      p_handle The handle of the object to resolve
    @return     A reference to the node with the handle of p_handle
    @brief      Looks into the object model and
    
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing p_value of specified objectmodel,
    or null if objectmodel does not exist.    
*/
MetaWrap.ObjectModel.resolve = function(p_handle)
{
    //alert("resolve " + p_handle);
    
    // Tokenise handle
    var l_array = p_handle.match(/([A-Za-z_]+[0-9]*|\[.+\])/g);
    
    var l_result = null;
    
    switch(l_array[0])
    {
        case "Client":
        {
            //alert("*SPECIAL CLIENT OBJECT*");
            
            switch(l_array[1])
            {
                case "Cookies":
                {
                    var l_name = MwOmDecodeHandleSegment(l_array[2]);
                
                    //alert("into cookies " + l_name);
                    
                    return new MetaWrap.ObjectModel.Node.Cookie(l_name);
                }
                break;
                
                default:
                {
                    return l_result;
                }
                break;
            }
        }
        break;
        
        default:
        {     
            // Make sure the object model is not empty    
            if (MetaWrap.ObjectModel.m_root != null)
            {           
                // Resolve this current node
                l_result = MetaWrap.ObjectModel.m_root.resolve(l_array,0);
            }
            else
            {
                alert("Object model empty");
            }
        }
    }
    
    return l_result;
}



/*!
    @fn         MetaWrap.ObjectModel.resolve = function(p_handle)
    @param      p_handle The handle of the object to resolve
    @return     A reference to the node with the handle of p_handle
    @brief      Looks into the object model and
    
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing p_value of specified objectmodel,
    or null if objectmodel does not exist.    
*/
MetaWrap.ObjectModel.addChild = function(p_handle,p_name)
{
    //alert("resolve " + p_handle);
    
    // Tokenise handle for standard match
    var l_array = p_handle.match(/([A-Za-z_]+[0-9]*|\[.+\])/g);
    
    var l_parent = null;
    
    switch(l_array[0])
    {
        case "Client":
        {
            //alert("*SPECIAL CLIENT OBJECT*");
        }
        break;
        
        default:
        {     
            // Make sure the object model is not empty    
            if (MetaWrap.ObjectModel.m_root != null)
            {           
                // Resolve this current node
                l_parent = MetaWrap.ObjectModel.m_root.resolve(l_array,0);
            }
            else
            {
                alert("Object model empty");
            }
        }
    }
    
    var l_result = null;
    
    // if we got a parent object
    if (l_parent != null)
    {
		l_result = l_parent.addChild(p_name);
    }
    
    
    
    return l_result;
}

/*!
    @fn         MetaWrap.ObjectModel.resolveClass = function(p_handle)
    @param      p_handle The handle of the object to resolve
    @return     A reference to the node with the handle of p_handle
    @brief      Looks into the object model and
    
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing p_value of specified objectmodel,
    or null if objectmodel does not exist.    
*/
MetaWrap.ObjectModel.resolveClass = function(p_handle)
{
    //alert("resolve " + p_handle);
    
    // Tokenise handle for class match
    var l_array = p_handle.match(/([A-Za-z_]+[0-9]*|\[\])/g);
    
    var l_result = null;
    
    switch(l_array[0])
    {
        case "Client":
        {
            //alert("*SPECIAL CLIENT CLASS*");
        }
        break;
        
        default:
        {     
            // Make sure the object model is not empty    
            if (MetaWrap.ObjectModel.m_root != null)
            {           
                // Resolve this current node
                l_result = MetaWrap.ObjectModel.m_root.resolveClass(l_array,0);
            }
            else
            {
                alert("Object model empty");
            }
        }
    }
    
    return l_result;
}



/*!
    @fn         MetaWrap.ObjectModel.resolveSubClass = function(p_handle)
    @param      p_handle The handle of the object to resolve
    @return     A reference to the node with the handle of p_handle
    @brief      Looks into the object model and..
    
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing p_value of specified objectmodel,
    or null if objectmodel does not exist.    
*/
MetaWrap.ObjectModel.resolveSubClass = function(p_handle)
{
    //alert("resolve " + p_handle);
    
    // Tokenise handle for class match
    var l_array_class = p_handle.match(/([A-Za-z_]+[0-9]*|\[\])/g);
    
    // new empty array
    var l_array = [];    
    
    // We just wany everything but the last and want to avoid array.splice that is still the work of the devil.
    for(var i=0;i<l_array_class.length-1;i++)
    {
		l_array[i] = l_array_class[i];
    }
    
    
    var l_result = null;
    
    //alert(l_array[0]);
    
    switch(l_array[0])
    {
		
    
        case "Client":
        {
            //alert("*SPECIAL CLIENT CLASS*");
        }
        break;
        
        default:
        {     
            // Make sure the object model is not empty    
            if (MetaWrap.ObjectModel.m_root != null)
            {           
                // Resolve this current node
                l_result = MetaWrap.ObjectModel.m_root.resolveClass(l_array,0);
            }
            else
            {
                alert("Object model empty");
            }
        }
    }
    
    return l_result;
}

/*!
    @fn         MetaWrap.ObjectModel.create = function(p_handle,p_value)
    @param      p_handle the handle of the object 
    @param      p_value The value to assign the node when it is created
    @param      p_class The class of the object to create
    @return     A reference to the node with the handle of p_handle
    @brief      Looks into the object model and
    @author     James Mc Parlane
    @date       10 June 2005
    
    Returns a string containing p_value of specified objectmodel,
    or null if objectmodel does not exist.    
*/
MetaWrap.ObjectModel.create = function(p_handle,p_value,p_class)
{
    //alert("resolve " + p_handle);
    
    // Tokenise handle
    var l_array = p_handle.match(/([A-Za-z_]+[0-9]*|\[.+\])/g);
    
    var l_result = null;
    
    switch(l_array[0])
    {
        case "Client":
        {
            //alert("*SPECIAL CLIENT OBJECT*");
        }
        break;
        
        default:
        {                    
            // Resolve this current node
            l_result = MetaWrap.ObjectModel.m_root.create(l_array,0,p_value,p_class);
        }
    }
    
    return l_result;
}


/*!
    @fn         function MwOmDecodeHandleSegment(p_name)
    @param      p_name The raw handle segment
    @return     The decoded handle segment
    @brief      Decode the handle segment into a normalised node name    
    @author     James Mc Parlane
    @date       19 October 2002    
*/
function MwOmDecodeHandleSegment(p_name)
{

    //alert(p_name.substr(p_name.length-1,1));
    
    // look for [name] pattern
    if ((p_name.substr(0,1) == '[') && (p_name.substr(p_name.length-1,1) == ']'))
    {
        // if we are a possible indirect reference
        
        // remove the '[' ']'
        p_name = p_name.substr(1,p_name.length-2);
        
        // If we are a named (string) reference then
        if 
        (
            ((p_name.substr(0,1) == '\'') && (p_name.substr(p_name.length-1,1) == '\''))
            ||
            ((p_name.substr(0,1) == '\"') && (p_name.substr(p_name.length-1,1) == '\"'))
        )
        {
            // extract the name from between the quotes and use that as the node name
            p_name = p_name.substr(1,p_name.length-2);        
        }
        else
        {
            // need to evaluate a real value
            alert("evaluate " + p_name);
        }
            
    }      

    // return the name
    return p_name;
}

/*!
    @fn         MetaWrap.ObjectModel.importClass = function(p_handle,p_class)
    @param      p_handle The handle of the class we want to create
    @param      p_constructor Reference to a javascript constructor
    @return     A reference to the node that represents this class
    @brief      Looks into the object model and
    
    @author     James Mc Parlane
    @date       10 June 2005
*/
MetaWrap.ObjectModel.importClass = function(p_handle,p_constructor)
{
    return MetaWrap.ObjectModel.create(p_handle,p_constructor,"Class");
}

/*! 
 *@} endgroup mw_javascript_lib_objectmodel MetaWrap - JavaScript - ObjectModel
 */ 

/*! 
 *@} end of MetaWrap - JavaScript - ObjectModel
 */       