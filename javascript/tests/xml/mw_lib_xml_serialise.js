/*

    @file mw_lib_xml_serialise.js

    $Id: mw_lib_xml_serialise.js,v 1.29 2008/05/15 02:11:26 james Exp $

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
 * $Log: mw_lib_xml_serialise.js,v $
 * Revision 1.29  2008/05/15 02:11:26  james
 * Merged in some changed from some other projects
 *
 * Revision 1.2  2008/02/20 02:37:35  graham
 * amendments to get loadXML working in Safari, also added Safari condition to use textContent to extract node innerText.
 *
 * Revision 1.1  2007/11/20 04:39:36  graham
 * metawrap files
 *
 * Revision 1.2  2007/10/08 06:42:10  james
 * Fixed issue in example
 *
 * Revision 1.1  2007/10/08 02:54:40  Bahram
 * Web services to communicate to the database created by XML Importer Service
 *
 * Revision 1.2  2007/09/04 05:20:08  jeff
 * *** empty log message ***
 *
 * Revision 1.43  2007/05/22 09:19:57  james
 * *** empty log message ***
 *
 * Revision 1.27  2007/05/03 12:45:57  james
 * Advice from Lela on some more state machine examples
 *
 * Revision 1.26  2006/12/20 10:47:15  james
 * Latest version of the js library
 *
 * Revision 1.25  2006/12/09 06:33:58  james
 * Working on getting in place editing working
 *
 * Revision 1.1  2006/12/09 02:59:49  james
 * *** empty log message ***
 *
 * Revision 1.41  2006/09/25 04:25:44  james
 * Latest fixed to JS Lib
 *
 * Revision 1.23  2006/09/21 05:19:37  james
 * Latest changes
 *
 * Revision 1.2  2006/09/18 08:37:08  james
 * Added latest macro recorder files...
 * Added macro recorder to index_demo.html
 *
 * Revision 1.40  2006/08/28 11:55:37  james
 * Latest updates
 *
 * Revision 1.22  2006/07/02 06:29:25  james
 * Latest update to XmlVault and flash connector
 *
 * Revision 1.21  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.20  2006/05/13 09:20:34  james
 * *** empty log message ***
 *
 * Revision 1.19  2006/05/09 13:44:21  james
 * Can now create a set of tests
 *
 * Revision 1.18  2006/05/06 09:33:05  james
 * More refactoring
 *
 * Revision 1.17  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.16  2006/05/05 08:52:45  james
 * better object handling
 *
 * Revision 1.15  2006/04/30 12:29:23  james
 * I can now save and load macros using an example loader and saver
 * Now need to spit that loader and saver off into another file.
 *
 * Revision 1.14  2006/04/26 14:31:16  james
 * Sorting out issues in XML loading
 *
 * Revision 1.12  2006/03/21 07:11:07  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.11  2005/09/21 02:29:54  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.10  2005/09/09 02:32:17  james
 * More test cases for XML handling
 *
 * Revision 1.9  2005/07/25 11:26:44  james
 * Working on adding more events to macro recorder. Also
 * making code a little more tidy and compact
 *
 * Revision 1.8  2005/07/07 03:28:27  james
 * *** empty log message ***
 *
 * Revision 1.7  2005/07/07 01:34:23  james
 * Bug fixes
 *
 * Revision 1.6  2005/07/06 14:48:53  james
 * Some fixes to help it work with Firefox
 *
 * Revision 1.5  2005/07/06 14:27:02  james
 * Filling out unit test suite
 *
 * Revision 1.4  2005/07/06 08:32:59  james
 * An XMLing we go...
 *
 * Revision 1.3  2005/07/06 07:52:18  james
 * Tests can now jump from page to page.
 * XML.Serialise can now deal with the javascript 'number' type
 *
 * Revision 1.2  2005/07/06 04:56:30  james
 * Simple XML serialiser that is compatble with the MetaWrap object
 * coding standard.
 *
 * Revision 1.1  2005/07/06 03:43:22  james
 * XML Library
 *
 */

/*! \page mw_lib_xml_serialise MetaWrap - JavaScript - XML - Serialise
 *
 * \subsection mw_javascript_lib_xml_serialise Overview
 *
 */

//alert("$Id: mw_lib_xml_serialise.js,v 1.29 2008/05/15 02:11:26 james Exp $");

/*! \defgroup mw_javascript_lib_xml_serialise  MetaWrap - JavaScript - XML - Serialise
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");

/*! @name  MetaWrap.XML.Serialise  */
//@{

/*!
    @namespace  MetaWrap.XML.Serialise
    @fn         MetaWrap.XML.Serialise = function(p_object,p_name)
    @param      p_object reference to the object we want to serialise
    @param      p_name (Optional) - default is 'object' The name to give to the obect as a whole. If null then there is no XML named wrapper.
    @return     void
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.XML.Serialise = function(p_object,p_compact,p_name,p_skip)
{

    if (p_skip == null)
    {
        p_skip = false;
    }

    if (p_object == null)
    {
        return "";
    }


    // The string we will be returning
    var l_return = "";

    // The object type
    var l_object_type = "";

    // ge the type of the object
    l_object_type = MetaWrap.typeOf(p_object);

    // If we forgot to define the wrapper name (p_name) then use 'object'
    if ((arguments.length < 3) && (p_name === undefined))
    {
        if (l_object_type == "array")
        {
            p_name = "array";
        }
        else
        {
            p_name = "object";
        }
    }


    // Prefix
    if (p_name)
    {
          l_return += "<?xml version=\"1.0\" ?>\r";

          if (!p_skip)
          {
              l_return += "<" + p_name + ">\r";
          }
    }

    //alert(l_object_type + " <= " + p_object);


    if (l_object_type != null)
    {

        // What kind of object do we have?
        switch(l_object_type)
        {

            case "string":
            case "boolean":
            case "number":
            {
                // a simple string - just get the value
                //l_return += new String(p_object);
				l_return += p_object;
            }
            break;

            case "array":
            {
                // an array - walk through each one and put in in an item
                for (var l_item in p_object)
                {
                    l_return += "<item>\r";
                    l_return += MetaWrap.XML.Serialise(p_object[l_item],p_compact,null,false);
                    l_return += "</item>\r";
                }
            }
            break;

            case "object":
            {
                // an object - walk through each member in the object
                for (var l_member in p_object)
                {
                    // get the type of this member
                    var l_member_type = MetaWrap.typeOf(p_object[l_member]);

                    // We only serialise member object
                    if ((l_member_type != "function") && (l_member.indexOf("m_") == 0))
                    {
                        // could speed this up by an associative array
                        var l_member_name = l_member.substring(2,l_member.length);

                        //alert(l_member_name + " (" + l_member_type + ") " + p_object[l_member])

                        // ge the type of the object
                        var l_sub_object_type = MetaWrap.typeOf(p_object[l_member]);

                        //alert(l_member + " := " + l_sub_object_type + " == " + p_object[l_member]);


                        if ((p_compact) &&
                            (
                                ((l_sub_object_type == "string")  &&  ((p_object[l_member] == null) || (p_object[l_member] == "")) )
                                ||
                                ((l_sub_object_type == "undefined")  &&  ((p_object[l_member] == null) || (p_object[l_member] == "")) )
                                ||
                                ((l_sub_object_type == "array")  &&  ((p_object[l_member].length == 0)) )
                            )
                           )
                        {
                            // Do nothing
                        }
                        else
                        {
                            // wrap the object in a container
                            l_return += "<" + l_member_name + ">";
                            l_return += MetaWrap.XML.Serialise(p_object[l_member],p_compact,null,false);
                            l_return += "</" + l_member_name + ">\r";
                        }
                    }
                }
            }
            break;

            default:
                alert("Unknown type " + l_object_type);
            break;
        }
    }

    // Suffix
    if (p_name)
    {
          if (!p_skip)
          {
            l_return += "</" + p_name + ">\r";
          }
    }

    // Return the result
    return l_return;
}



/*!
    @fn         MetaWrap.XML.Deserialise = function(p_xml_string,p_object)
    @param      p_xml_string XML string that we want to deserialise
    @param      p_object reference to the object we want to de-serialise into
    @return     A reference to the deserialised object
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.XML.Deserialise = function(p_xml_string,p_object)
{
	//alert(p_xml_string);

    // If we have no object
    if (p_object == null)
    {
        error("MetaWrap.XML.Deserialise expects an object to populate");
        return null;
    }

    if (p_xml_string == null)
    {
        error("MetaWrap.XML.Deserialise expects an xml to deserialise");
        return null;
    }

    //alert("MetaWrap.XML.Deserialise " + p_xml_string);

    // Create a document
    var l_xml = new MetaWrap.XML.Document();
	
	l_xml.loadXML(p_xml_string);

    var l_node = l_xml.firstChild;

    if (l_node == null)
    {
        error("empty or invalid xml document - loadXML has not returned with a non null 'firstChild'");
		alert("empty or invalid xml document - loadXML has not returned with a non null 'firstChild'");
        return null;
    }

    while ((l_node) && (l_node.nodeType != MetaWrap.XML.Node.Type.ELEMENT))
    {
        l_node = l_node.nextSibling;
    }

    // Did we end up with a node...
    if (l_node)
    {
        if (l_node.nodeName == "array")
        {
            error("MetaWrap.XML.Deserialise: 'array' cannot be root element.");
            return p_object;
        }
		
		// If we have any attributes - serialise them
		MetaWrap_XML_Deserialise2Attributes(l_node,p_object);
		
		// Now serialise the main body
        MetaWrap_XML_Deserialise2(l_node.firstChild,p_object);
    }
	else
	{
		trace("empty xml?");
	}

    return p_object;
}

/*!
    @fn         MetaWrap.XML.DeserialiseXMLDocument = function(p_xml,p_object)
    @param      p_x reference to the object we want to serialise
    @return     A reference to the deserialised object
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.XML.DeserialiseXMLDocument = function(p_xml,p_object,p_is_array)
{
    // If we have no object
    if (p_object == null)
    {
        error("MetaWrap.XML.Deserialise expects an object to populate");
        return null;
    }

    var l_node = p_xml.firstChild;

    while ((l_node) && (l_node.nodeType != MetaWrap.XML.Node.Type.ELEMENT))
    {
        l_node = l_node.nextSibling;
    }

    // Did we end up with a node...
    if (l_node)
    {
        if (l_node.nodeName == "array")
        {
            error("MetaWrap.XML.Deserialise: 'array' cannot be root element.");
            return p_object;
        }
		
		if (p_is_array)
		{
			//warn("TREAT AS ARRAY");
			MetaWrap_XML_Deserialise2(l_node,p_object);
		}
		else
		{

			if (l_node.firstChild != null)
			{
				MetaWrap_XML_Deserialise2(l_node.firstChild,p_object);
			}
		}

        MetaWrap_XML_Deserialise2Attributes(l_node,p_object);
    }

    return p_object;
}

/*!
    @fn         function MetaWrap_XML_Deserialise2Attributes(p_node,p_object)
    @param      p_node
    @param      p_object
    @return     void
    @brief
    @author     James Mc Parlane
    @date       6 September 2004
*/
function MetaWrap_XML_Deserialise2Attributes(p_node,p_object)
{
    //
    // Parse all the attributes and add them
    //
	
	if (p_node == null)
	{
		debugger;
	}

    //alert(p_node.attributes.length);
	
	if (p_node.attributes == null)
	{
		return;
	}

    for(var l_a = 0;l_a < p_node.attributes.length;l_a++)
    {
        //alert(p_node.attributes[l_a].name);
        //alert(p_node.attributes[l_a].value);

        // Construct the normalised name of the object
        var l_attribute_name = "a_" + p_node.attributes[l_a].name;

        // Determine the name of the object
        var l_attribute_type = MetaWrap.typeOf(p_object[l_attribute_name]);

        var l_attribute_value = p_node.attributes[l_a].value;

        // then depending on the name of the object - load it
        switch(l_attribute_type)
        {
            // basic atomic types
            case "boolean":
                p_object[l_attribute_name] = (false || (l_attribute_value == "true"));
            break;

            case "number":
                p_object[l_attribute_name] = new Number(l_attribute_value);
            break;

            case "string":
                p_object[l_attribute_name] = l_attribute_value;
            break;

            case "undefined":
                p_object[l_attribute_name] = l_attribute_value;
            break;

            default:
                error("unknown " + l_attribute_value);
                return;
            break;
        }

    }

}


MetaWrap.XML.hasChildElements = function(p_node)
{
    if (p_node.hasChildNodes())
    {
        var l_node = p_node.firstChild;

        while(l_node != null)
        {
            if (l_node.nodeType == 1)
            {
                return true;
            }

            l_node = l_node.nextSibling;
        }

        return false;
    }

    return false;
}


/*!
    @fn         function MetaWrap_XML_Deserialise2(p_node,p_object)
    @param      p_node
    @param      p_object
    @return     void
    @brief
    @author     James Mc Parlane
    @date       6 September 2004
*/
function MetaWrap_XML_Deserialise2(p_node,p_object)
{
     var l_node = p_node;

     //debug("MetaWrap_XML_Deserialise2(" + p_node.nodeName + ")");
	 MetaWrap_XML_Deserialise2Attributes(p_node,p_object);
	 
	 //debug("l_node.TestGetter = " + TestGetter);
	 
	 // for each node
     while(l_node != null)
     {
		// Handle special case in firefox
		if (l_node.nodeName != "#text")
		{
			// Construct the normalised name of the object
			var l_member_name = "m_" + l_node.nodeName;
			var l_member_type = "undefined";
			var l_member_object =  p_object[l_member_name];			
					
			if (p_object != null)
			{
			
				// Determine the name of the object
				l_member_type = MetaWrap.typeOf(l_member_object);
			}
						

			// then depending on the name of the object - load it
			switch(l_member_type)
			{
				// basic atomic types
				case "boolean":
					p_object[l_member_name] = (false || (MetaWrap.$t(l_node) == "true"));
				break;

				case "number":
					p_object[l_member_name] = new Number(l_node.text);
				break;

				case "string":									
					//p_object[l_member_name] = new String(l_node.text);
					p_object[l_member_name] = MetaWrap.$t(l_node);
				break;

				case "object":
				case "undefined":
				   
				    // If we know there are child elements
					if (MetaWrap.XML.hasChildElements(l_node))
					{
						var l_object = null;
					
						// If there is a template defined
						if (l_member_object == null)
						{
							// create a new object
							l_object = new Object();

							// slot it into place
							p_object[l_member_name] = l_object;
						}
						else
						{
							// grab the existing object
							l_object = l_member_object;
						}
						
						// And load all the children into that object
						MetaWrap_XML_Deserialise2(l_node.firstChild,l_object);
						
					}
					else
					{
						
						/*
						if (g_bid == "Safari")
						{
							//debug("Safari");
							
							p_object[l_member_name] = l_node.textContent;
						}
						else
						{
						*/
													
						     p_object[l_member_name] = MetaWrap.$t(l_node);
					    /*}*/

						//debug("add text '" + p_object[l_member_name] + "'  to " + l_member_name)
					}

					//alert(" <= " + l_node.text)
				break;

				case "array":

					// some debugging
					//debug(l_member_name + " is an array (by type)");

					// All child nodes must be 'item'
					var l_item_node = l_node.firstChild;

					// Get the first node - not the text
					while ((l_item_node) && (l_item_node.nodeType != MetaWrap.XML.Node.Type.ELEMENT))
					{
						l_item_node = l_item_node.nextSibling;
					}

					// Get the array as an object
					var l_item_array = l_member_object;

					// Get the item constructor (if there is one)
					var l_item_constructor = p_object[l_member_name + "_create"];

					// If we have subnodes
					if (l_item_node != null)
					{
						// while we have nodes to read in
						while(l_item_node)
						{
							//alert("got item " + l_item_node.nodeName);
							// Create a new item by using a predefined constructor
							if (l_item_constructor)
							{
								//alert("call item constructor '" +  l_member_name + "_create" + "' on '" + l_item_node.nodeName + "' " + l_item_node.attributes.length + " " + l_item_node.hasChildElements());
								var l_new_item = l_item_constructor.call(p_object);

								//debug("constructor called " + l_item_node.nodeName + " " + l_item_node.attributes.length + " attributes.");
								
								MetaWrap_XML_Deserialise2Attributes(l_item_node,l_new_item);
								
								//MetaWrap_XML_Deserialise2Attributes(l_item_node.firstChild,l_new_item);
								
								// Load the new item
								MetaWrap_XML_Deserialise2(l_item_node.firstChild,l_new_item);
							}
							else
							{
								
								/*
								var l_item_node_child_element = l_item_node.firstChild;

								// Get the first node - not the text
								while ((l_item_node_child_element) && (l_item_node_child_element.nodeType != MetaWrap.XML.Node.Type.ELEMENT))
								{
									l_item_node_child_element = l_item_node_child_element.nextSibling;
								}

								if (l_item_node_child_element == null)
								{
									//l_member_object[l_member_object.length] = l_item_node.text;
									l_member_object.push(l_item_node.text);
								}
								*/
								//debug("l_item_node = " + l_item_node);
								
								l_member_object.push(MetaWrap.$t(l_item_node));

							}

							l_item_node = l_item_node.nextSibling;

							while ((l_item_node) && (l_item_node.nodeType != MetaWrap.XML.Node.Type.ELEMENT))
							{
								l_item_node = l_item_node.nextSibling;
							}

						}
						

						//MetaWrap_XML_Deserialise2Attributes(l_node,l_new_item);
					}
					else
					{
						//debug("No sub nodes");
						// So if we get here there are not child nodes - so this is text or it just has attribiut

						var l_new_item = null;
						
						

						if (l_item_constructor == null)
						{
													
							var l_node_text = MetaWrap.$t(l_node);							
							
							//debug("l_node_text = " + l_node_text);
							//debug("l_node_text = " + l_node.getText());
												
							// If we have no text - then make it a naked object
							if ((l_node_text == null) || (l_node_text == ""))
							{
								l_new_item = {};
								
								l_item_array.push(l_new_item);
								
								MetaWrap_XML_Deserialise2Attributes(l_node,l_new_item);
							}
							else
							{
								
							
								//l_new_item = new String(l_node_text);								
								l_item_array.push(l_node_text);								
								//debug(l_node_text);								
							}						
						}
						else
						{
							if (l_node.attributes.length > 0)
							{
								l_new_item = l_item_constructor.call(p_object);
								
								MetaWrap_XML_Deserialise2Attributes(l_node,l_new_item);
							}
						}
					}

					//MetaWrap_XML_Deserialise2Attributes(l_node,l_item_array);

				break;


				default:
					error("unknown " + l_member_type);
					return;
				break;
			}


			// Deserialise the attributes
			//MetaWrap_XML_Deserialise2Attributes(l_node,p_object);

		}

        l_node = l_node.nextSibling;
    }
 }

 /*!
    @fn         MetaWrap.XML.Serialise.toSafe = function(p_text)
    @param      p_text
    @return     string
    @brief      Make a string XML safe.
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.XML.Serialise.toSafe = function(p_text)
{
	p_text = p_text.replace(/\</gi,"&lt;");
	p_text = p_text.replace(/\>/gi,"&gt;");
	p_text = p_text.replace(/\&/gi,"&amp;");
	p_text = p_text.replace(/\"/gi,"&quot;");

	return p_text;
}

/*!
 *@} endgroup mw_javascript_lib_xml_serialise MetaWrap - JavaScript - XML - Serialise
 */

/*!
 *@} end of MetaWrap.XML.Serialise
 */





