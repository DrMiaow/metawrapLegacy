/*

    @file mw_lib_code.js

    $Id: mw_lib_code.js,v 1.4 2006/07/01 08:06:57 james Exp $
          
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
 * $Log: mw_lib_code.js,v $
 * Revision 1.4  2006/07/01 08:06:57  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.3  2006/05/06 09:33:01  james
 * More refactoring
 *
 * Revision 1.2  2006/02/22 11:20:08  james
 * Added experimental code dispatch
 *
 * Revision 1.1  2006/02/15 11:58:26  james
 * Merged code generation into single shared XSLT. There is an issue with
 * namespaces that can't be avoided - have to not include a specific
 * namespace declaration in the XML and  XSLT or have everything in
 * the same schema. At the moment everything has a separate schema
 * This may change at some point to allow a single XML file solution.
 *
 */


/*! \page mw_javascript_lib_code MetaWrap - JavaScript - Code
 *
 * \subsection mw_javascript_lib_code Overview
 * 
 */

//debug("$Id: mw_lib_code.js,v 1.4 2006/07/01 08:06:57 james Exp $");
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.ObjectModel","mw_lib_objectmodel.js");
 
/*! \defgroup mw_javascript_lib_code  MetaWrap - JavaScript - Code
 *@{
 */ 


/*! @name  MetaWrap.Code */
//@{

/*!
    @namespace  MetaWrap.Code
    @brief      Declare the MetaWrap.Code namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/     
MetaWrap.Code = {};



/*!
    @func       MetaWrap.Code.varToHandle = function(p_var,p_handle)
    @param      p_var The variable value that we are going to write into the handle
    @param      p_handle The handle to the node that we are writing to
    @brief      Return the value of the node in p_handle.
    @author     James Mc Parlane
    @date       19 October 2002
*/  
MetaWrap.Code.varToHandle = function(p_var,p_handle)
{
    //alert("MetaWrap.Code.varToHandle " + p_handle);
    
    // Get a reference to the actual object
    var l_reference = MetaWrap.ObjectModel.resolve(p_handle);
    
    // If we got a valid reference
    if (l_reference != null)
    {
        // Get the value from the handle
        l_reference.write(p_var);
    }
    else
    {
        throw("error MetaWrap.Code.varToHandle");
    }        
}


/*!
    @func       MetaWrap.Code.getHandle = function(p_handle)
    @param      p_handle The handle that we are getting the value of
    @brief      Get the value of the node with the handle of p_handle
    @author     James Mc Parlane
    @date       19 October 2002
*/     
MetaWrap.Code.getHandle = function(p_handle)
{
    var l_return = null;

    //alert("MetaWrap.Code.getHandle " + p_handle);
    
    // Get a reference to the actual object
    var l_reference = MetaWrap.ObjectModel.resolve(p_handle);
    
    // If we got a valid reference
    if (l_reference != null)
    {
        // Get the value from the handle
        l_return = l_reference.read();
    }
    else
    {
        //throw("error MetaWrap.Code.getHandle");
        alert('throw("error MetaWrap.Code.getHandle");');
    }
    
    // Return the value
    return l_return;
}




/*!
    @namespace  MetaWrap.Code.copy
    @brief      Declare the MetaWrap.Code.copy namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/     
MetaWrap.Code.copy = {};



/*!
    @func       MetaWrap.Code.copy.handleToHandle = function(p_handle_src,p_handle_dest)
    @param      p_handle_src The source handle that we read from
    @param      p_handle_dest The destination handle that we write to
    @brief      Copy the value from the node at p_handle_src into the node at p_handle_dest
    @author     James Mc Parlane
    @date       19 October 2002
*/   
MetaWrap.Code.copy.handleToHandle = function(p_handle_src,p_handle_dest)
{
    //alert("MetaWrap.Code.copy.handleToHandle " + p_handle_src + " to " + p_handle_dest);
    
    // Get a reference to the actual object
    var l_reference_src = MetaWrap.ObjectModel.resolve(p_handle_src);

    // Get a reference to the actual object
    var l_reference_dest = MetaWrap.ObjectModel.resolve(p_handle_dest);
    
    if ((l_reference_src != null) && (l_reference_dest != null))
    {
        // read from node at p_handle_src and write to node at p_handle_dest
        l_reference_dest.write(l_reference_src.read());
    }
    else
    {
        throw("error MetaWrap.Code.copy.handleToHandle");
    }
}

/*!
    @namespace  MetaWrap.Code.compare
    @brief      Declare the MetaWrap.Code.compare namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/     
MetaWrap.Code.compare = {};



/*!
    @func       MetaWrap.Code.compare.doOp = function(p_op,p_with,p_to)
    @param      p_op Operator for comparison
    @param      p_with A variable thet we are comparing (left)
    @param      p_to A variable thet we are comparing (right)
    @brief      Return the value of the node in p_handle.
    @author     James Mc Parlane
    @date       19 October 2002
*/  
MetaWrap.Code.compare.doOp = function(p_op,p_with,p_to)
{
    var l_result = false;
    
    switch(p_op)
    {
        case "equal":            
            l_result = (p_with == p_to);
        break;

        case "greaterthan":            
            l_result = (p_with > p_to);
        break;

        case "greaterthanequal":            
            l_result = (p_with >= p_to);
        break;

        case "lessthan":            
            l_result = (p_with < p_to);
        break;

        case "lessthanequal":            
            l_result = (p_with <= p_to);
        break;

        case "notequal":   
            l_result = (p_with != p_to);
        break;
        
        default:
            throw("unknown logic operation");             
        
    }
    
    //alert(p_with + " " + p_op + " " + p_to + " = " + l_result);    
    
    return l_result;
}

/*!
    @func       MetaWrap.Code.compare.allHandle = function(p_op,p_handle_with,p_handle_to,p_handle_result)
    @param      p_op Operator for comparison
    @param      p_handle_with Handle that we are comparing (left)
    @param      p_handle_to Handle that we are comparing (right)
    @param      p_handle_result Handle were we will store result
    @brief      Compare one node to another and store the result in another node
    @author     James Mc Parlane
    @date       19 October 2002
*/  
MetaWrap.Code.compare.allHandle = function(p_op,p_handle_with,p_handle_to,p_handle_result)
{
    //alert("MetaWrap.Code.compare.allHandle " + p_op + " " + p_handle_with + " " + p_handle_to + " " + p_handle_result);
    
    // Get a reference to the actual object
    var l_reference_with = MetaWrap.ObjectModel.resolve(p_handle_with);

    // Get a reference to the actual object
    var l_reference_to = MetaWrap.ObjectModel.resolve(p_handle_to);

    // Get a reference to the actual object
    var l_reference_result = MetaWrap.ObjectModel.resolve(p_handle_result);
    
    if ((l_reference_with != null) && (l_reference_to != null) && (l_reference_result != null))
    {
        // Get a reference to the actual object
        var l_var_with = l_reference_with.read();

        // Get a reference to the actual object
        var l_var_to = l_reference_to.read();
        
        // Make comparison and get the result
        var l_result = MetaWrap.Code.compare.doOp(p_op,l_var_with,l_var_to);
        
        // Write the result into the intehded node
        l_reference_result.write(l_result);
    }
    else
    {
        throw("error MetaWrap.Code.compare.allHandle");
    }
}

/*!
    @func       MetaWrap.Code.compare.handleToHandle = function(p_op,p_handle_with,p_handle_to)
    @param      p_op Operator for comparison
    @param      p_handle_with Handle that we are comparing (left)
    @param      p_handle_to Handle that we are comparing (right)
    @return     The result of the comparison
    @brief      Compare one node to another and store the result in another node
    @author     James Mc Parlane
    @date       19 October 2002
*/  
MetaWrap.Code.compare.handleToHandle = function(p_op,p_handle_with,p_handle_to)
{
    //alert("MetaWrap.Code.compare.handleToHandle " + p_op + " " + p_handle_with + " " + p_handle_to);
    
    // Get a reference to the actual object
    var l_reference_with = MetaWrap.ObjectModel.resolve(p_handle_with);

    // Get a reference to the actual object
    var l_reference_to = MetaWrap.ObjectModel.resolve(p_handle_to);
    
    if ((l_reference_with != null) && (l_reference_to != null))
    {
        // Get a reference to the actual object
        var l_var_with = l_reference_with.read();

        // Get a reference to the actual object
        var l_var_to = l_reference_to.read();
        
        // Make comparison and get the result
        return MetaWrap.Code.compare.doOp(p_op,l_var_with,l_var_to);
        
    }    
    else
    {
       throw("error MetaWrap.Code.compare.handleToHandle"); 
    }
}

/*! 
 *@} endgroup mw_javascript_lib_code MetaWrap - JavaScript - Code
 */ 

/*! 
 *@} end of MetaWrap.Code
 */       
