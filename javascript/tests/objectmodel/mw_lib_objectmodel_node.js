/*

    @file mw_lib_objectmodel_node.js

    $Id: mw_lib_objectmodel_node.js,v 1.10 2007/09/27 08:24:06 james Exp $

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
 * $Log: mw_lib_objectmodel_node.js,v $
 * Revision 1.10  2007/09/27 08:24:06  james
 * Made some changes to start wiring up object model to view
 *
 * Revision 1.9  2007/01/10 11:48:34  james
 * First objectmodel experiment
 *
 * Revision 1.8  2006/07/01 08:06:58  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.7  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.6  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.5  2006/04/08 13:47:18  james
 * latest updates
 *
 * Revision 1.4  2006/03/22 22:16:45  james
 * working on class system
 *
 * Revision 1.3  2006/03/21 20:52:33  james
 * Adding Classes to ObjectModel
 *
 * Revision 1.2  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.1  2006/01/29 09:12:12  james
 * more work on objectmodel
 *
 * Revision 1.2  2006/01/26 11:31:52  james
 * *** empty log message ***
 *
 * Revision 1.1  2006/01/26 11:14:21  james
 * Getting JavaScript version of object model up and running.
 *
 */


/*! \page mw_javascript_lib_objectmodel_node MetaWrap - JavaScript - ObjectModel - Node
 *
 * \subsection mw_javascript_lib_objectmodel_node Overview
 */

/*! \defgroup mw_javascript_lib_objectmodel_node  MetaWrap - JavaScript - ObjectModel - Node
 *@{
 */


/*! @name  MetaWrap.ObjectModel.Node  Namespace*/
//@{

//alert("$Id: mw_lib_objectmodel_node.js,v 1.10 2007/09/27 08:24:06 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.ObjectModel","mw_lib_objectmodel.js");

/*!
	@namespace	MetaWrap.ObjectModel.Node
    @fn         MetaWrap.ObjectModel.Node = function(p_name,p_value)
    @param      p_name The name of the node
    @value      p_value The value of the node
    @brief      MetaWrap.ObjectModel.Node class
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node = function(p_name,p_value,p_class)
{
    // Each node has a name
    this.m_name = p_name;

    // If this node has a class then use it, else default to string
    this.m_class = (p_class == null ? "String" : p_class);

    // Each node can have one or more subscribers that get notified on change
    this.m_subscribers = [];

    //alert("new MetaWrap.ObjectModel.Node " + p_name + "," + p_class );

    ASSERT(this.m_class);

    if (this.m_name)
    {
        if (this.m_class == "Class")
        {
            // For a class - the value is the constructor
            this.m_value = p_value;
        }
        else
        if (this.m_class == "String")
        {
            this.m_value = new String(p_value);
        }
        else
        if (this.m_class == "Integer")
        {
            this.m_value = new Number(p_value);
        }
        else
        {
            //alert("MetaWrap.ObjectModel.Node " + p_name + "," + p_class );

            // Tokenise handle
            var l_array = this.m_class.match(/([A-Za-z_]+[0-9]*|\[\])/g);

            // Get the class
            var l_class = this.resolveClass(l_array);

            //alert(l_class._create + l_class.m_name);

            // Keep a reference to the actual class to speed things up
            //this._class = l_class;

            // Create an empty object
            //this.m_value = new Object();

            // Use doCall to call m_value of a class - which means you are calling its constructor
            this.m_value = MetaWrap.doCall(l_class.m_value,this,p_name);

            //this.m_value = l_class.m_value(p_name)

            //l_class.m_value.call(this.m_value,p_name);

            //x.y.z;

        }

    }
    else
    {
        // Each node has a value
        this.m_value = p_value;
    }
}

/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.write = function(p_value)
    @value      p_value The value of the node to wrote
    @brief      Writes to the value of the node
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node.prototype.write = function(p_value)
{
    this.m_value = p_value;

    //alert("write");

	// For each subscriber
    for(var l_s = 0; l_s < this.m_subscribers.length; l_s++)
    {
		//alert(l_s);

		// Get the subscriber
		var l_subscriber = this.m_subscribers[l_s];

		// Make the call
		MetaWrap.doCall(l_subscriber.m_fn,this,l_subscriber.m_id);
	}
}

/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.read = function()
    @brief      Reads the value of the node
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node.prototype.read = function()
{
    return this.m_value;
}

/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.addChild = function()
    @brief      Add A Child to an array
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node.prototype.addChild = function(p_name,p_arg1,p_arg2,p_arg3,p_arg4)
{
    //alert("add child to " + this.m_name +  " " + this.m_class);

    // This is a collection so lets get what it is a collection of
    var l_subclass = MetaWrap.ObjectModel.resolveSubClass(this.m_class);

    ASSERT(l_subclass != null,"Can only addChild an object with a valid class");

    //alert("l_subclass.m_class " + l_subclass.m_name +  " " + l_subclass.m_class);

    // Make sure its a class
    ASSERT(l_subclass.m_class == "Class","Can only addChild a class, not a " + l_subclass.m_class);

	// get a name
    var l_name = (p_name == null ? this.m_value.length : p_name);

	// add the new value
    this.m_value[l_name] =  new l_subclass.m_value(p_arg1,p_arg2,p_arg3,p_arg4);


}


/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.resolve = function(p_names,p_depth)
    @param      p_names An array of names
    @param      p_depth The index into the p_names for the current node we are resolving as a child of 'this' node.
    @return     A reference to the node with the handle defined by all the names in p_name from p_depth to p_names.length
    @brief      Resolves the next node in the array (pointed to by p_names[p_depth]) and then looks for the next subnode in that until we have the final node.
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node.prototype.resolve = function(p_names,p_depth)
{
   var l_name = p_names[p_depth++];

    //alert("MwOmResolve " + l_name);

    // Decode the node name
    l_name = MwOmDecodeHandleSegment(l_name);

    /*
    if (l_name == "_create")
    {
		alert("_create builtin " + this.m_class);

        // Get the class
        var l_class = MetaWrap.ObjectModel.resolveClass(this.m_class);

        if (l_class != null)
        {
			//alert(l_class._create + l_class.m_name);

			//alert("Found class " + l_class._create);
			return l_class._create;
        }

        return null;
    }
    */

    // Get the requested node
    var l_node = this[l_name];

    // If we found the node
    if (l_node != null)
    {
        // While there is still nodes to read
        if (p_depth < p_names.length)
        {
            // Resolve the sub nodes
            l_node = l_node.resolve(p_names,p_depth);
        }
    }

    // return the final answer
    return l_node;
}

/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.create = function(p_names,p_depth,p_value)
    @param      p_names An array of names
    @param      p_depth The index into the array
    @param      p_value The value to assign the node when it is created
    @param      p_class The class of the object to create
    @return     A reference to the node with the handle defined by the names in p_name
    @brief      Resolves and creates if required the next element in the array (pointed to by p_depth) into a Node
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node.prototype.create = function(p_names,p_depth,p_value,p_class)
{
      // Get the name of the node
    var l_name = p_names[p_depth++];

    //alert("MwOmResolve " + l_name);

    // Decode the node name
    l_name = MwOmDecodeHandleSegment(l_name);

    // Get the requested node
    var l_node = this[l_name];

    // If we should create the nodes if we don't find them
    if (l_node == null)
    {
        //alert("create node " + l_name);

        // If we need to create subnodes
        if (p_depth < p_names.length)
        {
            // Create the subnode
            l_node = this[l_name] = new MetaWrap.ObjectModel.Node(l_name);
        }
        else
        // if we should be creating the final node
        {
            // Create the final node with the specified class
            l_node = this[l_name] = new MetaWrap.ObjectModel.Node(l_name,p_value,p_class);

            // return
            return l_node;
        }
    }

    if (l_node != null)
    {
        // While there is still nodes to read
        if (p_depth < p_names.length)
        {
            // Resolve the sub node
            l_node = l_node.create(p_names,p_depth,p_value,p_class);
        }
    }

    // return the final answer
    return l_node;
}


// return the arrayize version of this class
MetaWrap.ObjectModel.Node.prototype.arrayize = function()
{

    var l_local = this;

	// This will be passed into m_value of the class, so that it is the constructor for the Array of this class
    var l_constructor = function(p_name)
    {
        // when called - 'this' is the object to be constructed
        alert('construct array called ' + p_name + " of " + l_local.m_name + " this.m_name = " + this.m_name + " this.m_class = " + this.m_class );

        // return a new array
        return [];
    }

    // Create a new class that uses this constructor
    var l_class = MetaWrap.ObjectModel.create(this.m_name + "Array",l_constructor,"Class");

    // Will for 'this' class add an array element into p_instance
    l_class._create = function(p_instance,p_name)
    {
        alert('construct element of array called ' + p_name + ' into instance ' + p_instance.m_name + + " this.m_name = " + this.m_name + " this.m_class = " + this.m_class );

        l_local.addChild(p_name);
    }

    return l_class
}

/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.resolveClass = function(p_names)
    @param      p_names An array of names
    @return     Make 'this' the class described by p_names
    @brief
    @author     James Mc Parlane
    @date       19 October 2002

    In reverse, construct subtypes.

    "X[]"

    Is a new class that is an array of X

    So the constructor creates a new array
    for m_value and has a function called _create
    that calls the old constructor with the arguments
    from _create and

    // if only one part then find

*/
MetaWrap.ObjectModel.Node.prototype.resolveClass = function(p_names)
{
    var l_class = null;

    var l_name = "";

    for(var i = 0;i<p_names.length;i++)
    {
		//alert('resolveClass Node ' + p_names[i]);

        // If this is an array
        if (p_names[i] == '[]')
        {

            // Take the last name and create an extension
            l_name += "Array";

            //alert('find1 ' + l_name);

            // Does the object already exist
            var l_resolved_class = MetaWrap.ObjectModel.resolve(l_name);

            // Does the class alreayd exist?
            if (l_resolved_class)
            {
                // We resolved this class - it already existed
                l_class = l_resolved_class;
            }
            else
            {
                // It does not exist - we need to create it
                //alert("Arrayize '" + l_class.m_name + "'" );

                // Make JavaScript construtor for an array of l_class
                var l_class = l_class.arrayize();
            }
        }
        else
        {
            //alert('find ' + p_names[i]);

            l_name += p_names[i];

            //alert('find2 ' + l_name);

            l_class = MetaWrap.ObjectModel.resolve(p_names[i]);

            if (l_class == null)
            {
                alert("failed to resolve class " + p_names[i]);
                return null;
            }
        }
    }

    return l_class;
}


/*!
    @fn         MetaWrap.ObjectModel.Node.prototype.subscribe = function(p_function,p_name)
    @param      p_function The callback function
    @value      p_name The id of this subscriber
    @brief      Add a subscriber
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.ObjectModel.Node.prototype.subscribe = function(p_function,p_id)
{
	this.m_subscribers[this.m_subscribers.length] = {m_fn:p_function,m_id:p_id};
}



// Create the root node
MetaWrap.ObjectModel.m_root = new MetaWrap.ObjectModel.Node();


/*!
 *@} endgroup mw_javascript_lib_objectmodel_node MetaWrap - JavaScript - ObjectModel - Node
 */

/*!
 *@} end of MetaWrap - JavaScript - ObjectModel - Node
 */
