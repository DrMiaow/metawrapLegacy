/*

    @file mw_libxml.js

    $Id: mw_lib_xml.js,v 1.31 2008/09/25 05:54:39 james Exp $

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
 * $Log: mw_lib_xml.js,v $
 * Revision 1.31  2008/09/25 05:54:39  james
 * *** empty log message ***
 *
 * Revision 1.30  2008/09/16 07:33:00  james
 * Fix for Node.text issue when deserialising xml
 *
 * Revision 1.27  2004/01/06 00:43:24  james
 * Added activate and deactivate to statemachine
 * Added login via sms to example application.
 *
 * Revision 1.26  2004/01/04 23:41:24  james
 * Getting state view to make callouts
 *
 * Revision 1.25  2008/07/22 15:04:01  james
 * Fixed a bug in the state machine that was causing it to skip an a re-evaluation after dirtying via an affirmation or negation.
 *
 * Revision 1.24  2008/07/21 10:16:19  james
 * Added unrequire - now just need a better name for it....
 *
 * Revision 1.23  2008/05/15 02:11:26  james
 * Merged in some changed from some other projects
 *
 * Revision 1.22  2007/08/22 00:10:11  jeff
 * Fixed possible issue on MetaWrap.XML.Document.Request
 *
 * Revision 1.21  2007/08/14 09:10:53  james
 * Trying to load data from local filesystem
 *
 * Revision 1.20  2007/08/14 08:08:53  james
 * Hardening against prototype.js evil
 *
 * Revision 1.19  2007/08/07 10:23:51  james
 * WireWrap prototype example working with Adobe Fireworks CS3
 *
 * Revision 1.18  2007/07/25 14:34:10  james
 * got xml parsing working faster and without the xml-declaration
 *
 * Revision 1.17  2007/07/22 15:15:57  james
 * Latest tweaks to the javascript libs to suppoty view system
 *
 * Revision 1.16  2007/06/21 05:08:41  james
 * Fixed issue in firefox
 *
 * Revision 1.15  2007/03/15 02:32:42  james
 * Updates based on changes introduced in last project
 *
 * Revision 1.9  2007/03/02 19:43:27  james
 * Syncronisation  Now Works!
 *
 * Revision 1.8  2007/03/02 09:37:55  james
 * Latest changes
 *
 * Revision 1.7  2007/02/22 08:07:54  james
 * Latest flash engine changes
 *
 * Revision 1.6  2007/02/14 12:58:36  james
 * Latest race engine updates
 *
 * Revision 1.5  2007/02/13 12:16:08  james
 * Moved the last startup xml loading into document.onload
 *
 * Revision 1.4  2007/02/13 10:11:52  james
 * Now loading the real data into JavaScript - next step - display the real data in flash
 *
 * Revision 1.3  2007/02/07 03:33:02  james
 * Fixed issue with whitespace in XML in firefox
 *
 * Revision 1.14  2006/12/09 06:33:58  james
 * Working on getting in place editing working
 *
 * Revision 1.1  2006/12/09 02:59:49  james
 * *** empty log message ***
 *
 * Revision 1.48  2006/11/11 06:38:20  james
 * Some javascript tweaks and changes
 *
 * Revision 1.12  2006/11/08 03:05:43  james
 * Tidy up of action XML code
 * Added ability for 'structure' to take in static xml
 *
 * Revision 1.11  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.10  2006/05/06 09:33:05  james
 * More refactoring
 *
 * Revision 1.9  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.8  2006/03/07 07:31:35  james
 * Added environment object to enable more expeimentation with transitions
 *
 * Revision 1.7  2005/11/02 11:41:22  james
 * Got basic remix transform happening
 *
 * Revision 1.6  2005/10/30 11:20:13  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.5  2005/09/21 02:29:54  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.4  2005/07/21 12:33:59  james
 * Near perfect mouse click event simulation.
 *
 * Revision 1.3  2005/07/06 14:48:53  james
 * Some fixes to help it work with Firefox
 *
 * Revision 1.2  2005/07/06 08:32:59  james
 * An XMLing we go...
 *
 * Revision 1.1  2005/07/06 03:43:22  james
 * XML Library
 *
 * Revision 1.4  2005/06/12 14:27:55  james
 * Objectising javascript XSLT lib.
 *
 * Revision 1.3  2005/06/12 09:08:47  james
 * Fixing some inconsitencies
 *
 * Revision 1.2  2005/06/12 08:25:18  james
 * getting everything into objects
 *
 * Revision 1.1  2005/06/12 08:02:28  james
 * getting everything into objects
 *
 * Revision 1.3  2005/02/25 06:32:54  james
 * CVS test
 *
 * Revision 1.2  2005/02/24 21:11:15  james
 * Tweaking Javascript Library
 *
 * Revision 1.1  2005/02/24 07:35:42  james
 * Wrong location.... fix.
 *
 * Revision 1.1  2005/02/21 09:40:25  james
 * The MetaWrap JavaScript library lives again!
 *
 */

 //alert("$Id: mw_lib_xml.js,v 1.31 2008/09/25 05:54:39 james Exp $");

/*! \page mw_javascript_lib_xml MetaWrap - JavaScript - XML
 *
 * \subsection mw_javascript_lib_xml Overview
 *
 *  XML Processing Module for The MetaWrap Project
 *
 *  http://www.webreference.com/programming/javascript/domwrapper/3.html
 *  http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/xmmthsettimeoutsmethod.asp
 *  http://www.mozilla.org/js/language/js20/core/functions.html
 *  http://www.mozilla.org/js/language/js20/core/variables.html
 *  http://www.dcs.bbk.ac.uk/~ptw/teaching/client/notes.html
 *  http://www.quirksmode.org/dom/w3c_core.html
 *  http://blogs.acceleration.net/russ/archive/2004/11/02/373.aspx
 *  http://www.mozilla.org/docs/dom/reference/levels.html
 *  http://xulplanet.com/tutorials/mozsdk/xmlparse.php
 *  http://www.xulplanet.com/references/objref/XMLDocument.html
 *  http://www.mozilla.org/js/language/js20/core/variables.html
 *  http://www.mozilla.org/docs/dom/domref/
 *  http://www.mozilla.org.uk/docs/proprietary-features-bad.html
 *
 */

/*! \defgroup mw_javascript_lib_xml  MetaWrap - JavaScript - XML
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");

/*! @name  MetaWrap.XML */
//@{

/*!
    @namespace  MetaWrap.XML
    @brief      Declare the MetaWrap.XML namespace
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML = new Object();


/*!
    @fn         MetaWrap.XML.Document.Fetch = function (p_url,p_method,p_async,p_http_client,p_document)
    @param      p_document The document we are converting into javascript objects
    @brief      Take a document and convert it into javascript arrays and object
    @author     James Mc Parlane
    @date       19 Feburary 2005

    Why deal with the overhead of DOM and Xpath when you can just do it in javascript arrays and objects? :)

    This uses a local associative array to track what nodes it has already placed in an array and which
    nodes are duplicates. If we find a duplicate, we convert it into an array and use the local associative
    array to mark it as requiring treatment as an array.
*/
MetaWrap.XML.ToObject = function(p_document)
{
    ASSERT(p_document != null,"p_document is null");

    //alert("p_document.xml = " + p_document.xml);

    var l_node =p_document.firstChild;

    var l_object = new Object();

    // keeps track of which nodes are in an array
    var l_arrays = new Array();

    while(l_node != null)
    {
        // if the previous or next nodes have the same name, create an array

        // get the the node name - we are going to use it a lot
        var l_node_name = l_node.nodeName;

        // get a reference to the nodes first child *node* - we are hoing to use that a lot too.
        var l_node_firstchild = l_node.firstChild;

		//
		// We need to handle the following cases -
		//
		// Mozilla firstChild returns TEXT - and is not limited to Nodes.
		//
		//

		//<node><childnode></childnode></node>
		//<node>SPACE<childnode>TEXT</childnode>SPACE</node>

		// Choose between text only and nodes
		if (l_node.hasChildNodes())
		{
			while((l_node_firstchild != null) && (l_node_firstchild.nodeType != MetaWrap.XML.Node.Type.ELEMENT))
			{
				//alert(l_node_firstchild.nodeName);

				l_node_firstchild = l_node_firstchild.nextSibling;
			}

			// If we are null - then we failed to find a node so we must be just text
			if (l_node_firstchild == null)
			{
				l_node_firstchild = l_node.firstChild;
			}
		}


        // No.. is it in array - or should it be in an array?
        if ((l_arrays[l_node_name] != null) || (l_object[l_node_name] != undefined))
        {
            // ok - so either way - l_node is being added to an array - we know that much..

            // Is there already an array for it?
            if (l_arrays[l_node_name] != null)
            {
                // do nothing
                //trace("we know that " + l_node_name + " is an array");
            }
            else
            // we don't have an array for this - so maybe we are here because we need to create one?
            if (l_object[l_node_name] != undefined)
            {
                // yes.. we have stumbled upon a replica - we need to convert the original object into an array
                //trace("already have a " + l_node_name);

                // copy the single object
                var l_temp = l_object[l_node_name];

                l_object[l_node_name] = new Array();

                // push the original
                l_object[l_node_name].push(l_temp);

                // set up a sentinel that says from now on all siblings called l_node_name go into an array.
                l_arrays[l_node_name] = true;
            }

            // push the new object onto an array
            if ((l_node_firstchild != null) && (l_node_firstchild.nodeType == this.Node.Type.TEXT))
            {
                // its text - so just add it as text to the array
                l_object[l_node_name].push(l_node_firstchild.nodeValue);
            }
            else
            if (l_node_firstchild.nodeType == this.Node.Type.ELEMENT)
            {
                // its got elements as children - so push it onto the array
                l_object[l_node_name].push(this.ToObject(l_node));
            }

        }
        else
        if (l_node_firstchild != null)
        {
            // not in an array - and no need to be in an array
            if (l_node_firstchild.nodeType == this.Node.Type.TEXT)
            {
                // just some text
                l_object[l_node_name] = l_node_firstchild.nodeValue;
            }
            else
            if (l_node_firstchild.nodeType == this.Node.Type.ELEMENT)
            {
                // we have children - assigne them to this object
                l_object[l_node_name] = this.ToObject(l_node);
            }
        }

        // get the next node
        l_node = l_node.nextSibling;
    }
    return l_object;
}

//@}

/*! @name  MetaWrap.XML.Node Namespace */
//@{

/*!
    @brief      Constructor for MetaWrap.XML.Node
    @author     James Mc Parlane
    @date       19 Feburary 2005
*/
MetaWrap.XML.Node = new Object();


/*!
    @brief     If this is true, then we habve the 'text' member
    @author     James Mc Parlane
    @date       19 Feburary 2005
*/
MetaWrap.XML.Node.g_has_text = false;


/*!
    @brief      Constructor for MetaWrap.XML.Node.Type
    @author     James Mc Parlane
    @date       19 Feburary 2005
*/
MetaWrap.XML.Node.Type = new Object();

/*!
    @brief Constant for MetaWrap.XML.Node.Type.ELEMENT type.
    The node represents an element. An element node can have the following child node
    types: Element, Text, Comment, ProcessingInstruction, CDATASection, and EntityReference.
    An element node can be the child of the Document, DocumentFragment, EntityReference,
    and Element nodes. */
MetaWrap.XML.Node.Type.ELEMENT = 1;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.ATTRIBUTE tyep.
    The node represents an attribute of an element. An attribute node can have the
    following child node types: Text and EntityReference. An attribute does not
    appear as the child node of any other node type; note that it is not considered
    a child node of an element. */
MetaWrap.XML.Node.Type.ATTRIBUTE = 2;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.TEXT type
    The node represents the text content of a tag. A text node cannot have any child
    nodes. A text node can appear as the child node of the Attribute, DocumentFragment,
    Element, and EntityReference nodes. */
MetaWrap.XML.Node.Type.TEXT = 3;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.CDATA_SECTION type
    The node represents a CDATA section in the XML source. CDATA sections are used
    to escape blocks of text that would otherwise be recognized as markup. A CDATA
    section node cannot have any child nodes. A CDATA section node can appear as the
    child of the DocumentFragment, EntityReference, and Element nodes. */
MetaWrap.XML.Node.Type.CDATA_SECTION = 4;
/*!
    @brief Constant for MetaWrap.XML.Node.Type.ENTITY_REFERENCE type
    The node represents a reference to an entity in the XML document. This applies
    to all entities, including character entity references. An entity reference node can
    have the following child node types: Element, ProcessingInstruction, Comment, Text,
    CDATASection, and EntityReference. An entity reference node can appear as the child
    of the Attribute, DocumentFragment, Element, and EntityReference nodes. */
MetaWrap.XML.Node.Type.ENTITY_REFERENCE = 5;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.ENTITY type
    The node represents an expanded entity. An entity node can have child nodes that represent
    the expanded entity (for example, Text and EntityReference nodes). An entity node
    can appear as the child of the DocumentType node. */
MetaWrap.XML.Node.Type.ENTITY = 6;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.PROCESSING_INSTRUCTION type
    The node represents a processing instruction from the XML document. A processing
    instruction node cannot have any child nodes. A processing instruction node can appear
    as the child of the Document, DocumentFragment, Element, and EntityReference nodes. */
MetaWrap.XML.Node.Type.PROCESSING_INSTRUCTION = 7;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.COMMENT type
    The node represents a comment in the XML document. A comment node cannot
    have any child nodes. A comment node can appear as the child of Document,
    DocumentFragment, Element, and EntityReference nodes. */
MetaWrap.XML.Node.Type.COMMENT = 8;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.DOCUMENT (9) The node represents a document
     object, which, as the root of the document tree, provides access to the entire XML
     document. It is created using the progID "Msxml2.DOMDocument", or through a data island
     using &lt;XML&gt; or &lt;SCRIPT LANGUAGE=XML&gt;. A document node can have the following child node
     types: Element (maximum of one), ProcessingInstruction, Comment, and DocumentType.
     A document node cannot appear as the child of any node types. */
MetaWrap.XML.Node.Type.DOCUMENT = 9;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.DOCUMENT_TYPE type
    The node represents the document type declaration, indicated by the &lt;!DOCTYPE &gt;
    tag. A document type node can have the following child node types: Notation and Entity.
    A document type node can appear as the child of the Document node. */
MetaWrap.XML.Node.Type.DOCUMENT_TYPE = 10;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.DOCUMENT_FRAGMENT type
    The node represents a document fragment. A document fragment
    node associates a node or subtree with a document without actually being
    contained within the document. A document fragment node can have the following
    child node types: Element, ProcessingInstruction, Comment, Text, CDATASection, and
    EntityReference. A DocumentFragment node cannot appear as the child of any node types. */
MetaWrap.XML.Node.Type.DOCUMENT_FRAGMENT = 11;

/*!
    @brief Constant for MetaWrap.XML.Node.Type.NOTATION  type
    A node represents a notation in the document type declaration.
    A notation node cannot have any child nodes. A notation node can
    appear as the child of the DocumentType node. */
MetaWrap.XML.Node.Type.NOTATION  = 12;



 /*!
    @fn         MetaWrap.XML.Node.getInnerText = function(p_node)
    @brief      MicroSoft Style Accessor Function for MetaWrap.XML.Node.text
    @author     James Mc Parlane
    @date       19 October 2002

    http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core.html#ID-1312295772
*/
MetaWrap.XML.Node.getInnerText = function(p_node)
{
    var l_children = p_node.childNodes,

    l_return = "";

    for(i = 0;i < l_children.length;i++)
    {
        var n = l_children.item(i);
        if(n.nodeType == MetaWrap.XML.Node.Type.TEXT)
        {
            l_return += n.data;
        }
    }
    return l_return;
}



 /*!
    @fn         MetaWrap.XML.Node.text = function()
    @brief      MicroSoft Style Accessor Function for MetaWrap.XML.Node.text
    @author     James Mc Parlane
    @date       19 October 2002

    http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core.html#ID-1312295772
*/
MetaWrap.XML.Node.text = function()
{
	return MetaWrap.XML.Node.getInnerText(this);
}

MetaWrap.$t = function(p_node)
{
	if (MetaWrap.XML.Node.g_has_text)
	{
		return p_node.text;
	}
	else
	{
		return  MetaWrap.XML.Node.getInnerText(p_node);
	}
}


/*!
    @fn         MetaWrap.XML.Node.InnerXml = function()
    @brief      MicroSoft C# XML Style Accessor Function for MetaWrap.XML.Node.InnerXml
    @author     James Mc Parlane
    @date       19 October 2002

*/
MetaWrap.XML.Node.getInnerXml = function(p_node)
{
    var l_children = p_node.childNodes,

    l_return = "";

    for(i = 0;i < l_children.length;i++)
    {
        var n = l_children.item(i);
        l_return += n.xml;
    }
    return l_return;
}

/*!
    @fn         MetaWrap.XML.Node.xml = function()
    @brief      MicroSoft Style Accessor Function for MetaWrap.XML.Node.xml
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML.Node.xml = function()
{
    //create a new XMLSerializer
    var l_XMLSerializer = new XMLSerializer;

    //get the XML string
    return l_XMLSerializer.serializeToString(this);
}


/*!
    @fn         MetaWrap.XML.Node.InnerXml = function()
    @brief      MicroSoft C# XML Style Accessor Function for MetaWrap.XML.Node.InnerXml
    @author     James Mc Parlane
    @date       19 October 2002

*/
MetaWrap.XML.Node.InnerXml = function()
{
	return MetaWrap.XML.Node.getInnerXml(this);
}


/*!
    @fn         MetaWrap.XML.Node.getTextSafari
    @brief      Get text from Safari XML node
    @author     James Mc Parlane
    @date       16 September 2008
*/
MetaWrap.XML.Node.getTextSafari = function()
{
	return this.textContent;
}


/*!
    @fn         MetaWrap.XML.Node.getText
    @brief      getText  that will always work..
    @author     James Mc Parlane
    @date       16 September 2008
*/
MetaWrap.XML.Node.getText = function()
{
	if (this.nodeValue)
	{
		return this.nodeValue;
	}
	else
	if (this.textContent)
	{
		return this.textContent;
	}
	else
	if (this.data)
	{
		return this.data;
	}
	else
	if (this.innerText)
	{
		return this.innerText;
	}
	else if (this.text)
	{
		l_value = this.text;
	}

    return null;
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

/*
MetaWrap.XML.Node.hasChildElements = function()
{
	return MetaWrap.XML.hasChildElements(this);
}

Node.prototype.hasChildElements = MetaWrap.XML.Node.hasChildElements
*/

if (g_beng== "Opera")
{
    // In Mozilla its possible to overide
    Node.prototype.__defineGetter__("xml", MetaWrap.XML.Node.xml);
	//Node.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
    Node.prototype.__defineGetter__("text", MetaWrap.XML.Node.text);
	
    DocumentFragment.prototype.__defineGetter__("xml", MetaWrap.XML.Node.xml);
	//DocumentFragment.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
    DocumentFragment.prototype.__defineGetter__("text", MetaWrap.XML.Node.text);	
	
	MetaWrap.XML.Node.g_has_text = true;
}
else
if (g_beng == "Mozilla")
{
    // In Mozilla its possible to overide
    Node.prototype.__defineGetter__("xml", MetaWrap.XML.Node.xml);
	//Node.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
    Node.prototype.__defineGetter__("text", MetaWrap.XML.Node.text);
	
	MetaWrap.XML.Node.g_has_text = true;
}
else
if (g_beng == "Webkit")
{
	Node.prototype.__defineGetter__("text", MetaWrap.XML.Node.getTextSafari);
	//Node.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
	Node.prototype.__defineGetter__("xml", MetaWrap.XML.Node.xml);
	
	DocumentFragment.prototype.__defineGetter__("text", MetaWrap.XML.Node.getTextSafari);
	//DocumentFragment.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
	DocumentFragment.prototype.__defineGetter__("xml", MetaWrap.XML.Node.xml);	
	
	MetaWrap.XML.Node.g_has_text = true;
}
else
if (g_beng == "IE")
{
	// This will only work in IE 8
	//Node.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
	//DocumentFragment.prototype.__defineGetter__("InnerXml", MetaWrap.XML.Node.InnerXml);
	
	MetaWrap.XML.Node.g_has_text = true;
}
else
if (g_beng == "OreganMediaBrowser")
{	
	// No support for getters in Oregan
	
	//alert("apply getter");	
	//Node.prototype.__defineGetter__("TestGetter", function() { return "Hello Cruel World");
	//DocumentFragment.prototype.__defineGetter__("TestGetter", function() { return "Hello Cruel World");	
}




/*!
    @fn         MetaWrap.XML.Node.depth = function(p_node)
    @brief      Calculate the depth of the node
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML.Node.depth = function(p_node)
{
	if (p_node == null)
	{
		error("MetaWrap.XML.Node.depth - there is no node, only Zuul");
		return;
	}

	if (p_node.parentNode == null)
	{
		return 0;
	}
	else
	{
		return 1 + MetaWrap.XML.Node.depth(p_node.parentNode);
	}
}

/*!
    @fn         MetaWrap.XML.Node.compareDepthDecending = function(p_nodea,p_nodeb)
    @brief      Compare the depth of two nodes for decending sort
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML.Node.compareDepthDescending = function(p_nodea,p_nodeb)
{
	return MetaWrap.XML.Node.depth(p_nodeb) - MetaWrap.XML.Node.depth(p_nodea);
}

/*!
    @fn         MetaWrap.XML.Node.compareDepthDecending = function(p_nodea,p_nodeb)
    @brief      Compare the depth of two nodes for ascending sort
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML.Node.compareDepthAscending= function(p_nodea,p_nodeb)
{
	return MetaWrap.XML.Node.depth(p_nodea) - MetaWrap.XML.Node.depth(p_nodeb);
}


//@}

/*! @name  MetaWrap.XML.Document Namespace */
//@{

/*!
    @fn         MetaWrap.XML.Document = function()
    @brief      Constructor for MetaWrap.XML.Document
    @author     James Mc Parlane
    @date       19 Feburary 2005
*/
MetaWrap.XML.Document = function()
{
    this.m_xml_document = null;	

    // The kind of XML object we have allocated
    g_bxmldoc = "none";

    // try the new microsoft way
    try
    {
        // http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/xmmthsettimeoutsmethod.asp
        this.m_xml_document = new ActiveXObject(g_ms_latest_xml_DOM_object_name)
		this.m_xml_document.async = false;
		this.m_xml_document.validateOnParse = false;
		this.m_xml_document.resolveExternals = false;
        g_bxmldoc = "MSXML";
        //trace(g_ms_latest_xml_DOM_object_name);
    }
    catch(e)
    {
        // try the old microsoft way
        try
        {
            // http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/xmmthsettimeoutsmethod.asp
            this.m_xml_document = new ActiveXObject(g_ms_safest_xml_DOM_object_name);
            g_bxmldoc = "MSXML";
			this.m_xml_document.async = false;
			this.m_xml_document.validateOnParse = false;
			this.m_xml_document.resolveExternals = false;
            //trace(g_ms_safest_xml_DOM_object_name);
        }
        catch(e2)
        {
            // try the new netscape way
            try
            {
                // http://www.xulplanet.com/references/objref/XMLDocument.html
                this.m_xml_document = document.implementation.createDocument("", "", null);
                g_bxmldoc = "DOM";
				//if (this.m_xml_document.loadXML == null)
				//{
				//		return this;
				//}
            }
            catch(n)
            {
                /*
                // try the old netscape way
                try
                {
                    this.m_xml_document = new DOMParser();
                    l_type = "NS";
                }
                catch(n2)
                {
                    this.m_xml_document = null
                }
                */

                //error("MetaWrap.XML.Document requires custom implementation");
            }
        }
    }

    // Got a standard object?
    if (this.m_xml_document != null)
    {
        return this.m_xml_document;
    }
    else
    {
        // whine if we fail
        error("MetaWrap.XML.Document requires custom implementation");
        return null;
    }
}





/*!
    @fn         MetaWrap.XML.Document.xml = function()
    @brief      MicroSoft Style Accessor Function for XmlDocument.Xml
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML.Document.xml = function()
{
	//alert("MetaWrap.XML.Document.xml");

    //create a new XMLSerializer
    var l_XMLSerializer = new XMLSerializer;

    //get the XML string
    return l_XMLSerializer.serializeToString(this);
}

/*!
    @fn         MetaWrap.XML.Document.text = function()
    @brief      MicroSoft Style Accessor Function for XmlDocument.Xml
    @author     James Mc Parlane
    @date       19 October 2002
    @todo        This is wrong
*/
MetaWrap.XML.Document.text = function()
{
    return "Not implemented";
}


/*!
    @fn         MetaWrap.XML.Document.Url = function()
    @brief      MicroSoft Style Accessor Function for XmlDocument.url
    @author     James Mc Parlane
    @date       19 October 2002
*/
MetaWrap.XML.Document.url = function()
{
    return this.documentURI;
}

if (g_beng == "Webkit")
{

	XPath = {
	
		cache : {},

		getChildNode : function(h, tagName, info, count, num, sResult)
		{
			var numfound = 0, result = null, data = info[count];

			var nodes = h.childNodes;
			
			if(!nodes) 
			{
				return; 
			}
			
			for(var i=0;i<nodes.length;i++)
			{
				if (tagName && (nodes[i].style ? nodes[i].tagName.toLowerCase() : nodes[i].tagName) != tagName) 
				{
					continue;
				}

				if (data) 
				{
					data[0](nodes[i], data[1], info, count+1, numfound++ , sResult);					
				}
				else 
				{
					sResult.push(nodes[i]);
				}
			}
			
		},

		doQuery : function(h, qData, info, count, num, sResult)
		{
			var result = null;
			var data = info[count];
			var query = qData[0];
			var returnResult = qData[1];
			var qResult = null;
			var l_e;
			try
			{
				qResult = eval(query);
			}
			catch(l_e)
			{
				return;
			}

			if(returnResult) 
			{
				return sResult.push(qResult);
			}
			
			if(!qResult) 
			{
				return;
			}

			if (data) 
			{
				data[0](h, data[1], info, count+1, 0, sResult);
			}
			else 
			{
				sResult.push(h);
			}
		},

		getTextNode : function(h, empty, info, count, num, sResult)
		{
			var result = null;
			var	data = info[count];

			var nodes = h.childNodes;
			for(var i=0;i<nodes.length;i++)
			{
				if(nodes[i].nodeType != 3 && nodes[i].nodeType != 4) continue;

				if(data) data[0](nodes[i], data[1], info, count+1, i, sResult);
				else sResult.push(nodes[i]);
			}
		},

		getAnyNode : function(h, empty, info, count, num, sResult){
			var result = null;
			var data = info[count];

			var sel = [], nodes = h.childNodes;
			for(var i=0;i<nodes.length;i++)
			{
				if(data) data[0](nodes[i], data[1], info, count+1, i, sResult);
				else sResult.push(nodes[i]);
			}
		},

		getAttributeNode : function(h, attrName, info, count, num, sResult)
		{
			if(!h || h.nodeType != 1) return;

			var result = null, data = info[count];
			var value = h.getAttributeNode(attrName);

			if(data) data[0](value, data[1], info, count+1, 0, sResult);
			else if(value) sResult.push(value);
		},

		getAllNodes : function(h, x, info, count, num, sResult){
			var result = null;
			var data = info[count];
			var tagName = x[0];
			var inclSelf = x[1];
			var prefix = x[2];

			if(inclSelf && (h.tagName == tagName || tagName == "*"))
			{
				if(data) 
				{
					data[0](h, data[1], info, count+1, 0, sResult);
				}
				else 
				{
					sResult.push(h);
				}
			}

			var nodes = MetaWrap.$T(tagName, h, (tagName==prefix?"":prefix));
			
			for(var i=0;i<nodes.length;i++)
			{
				if(data)
				{
					data[0](nodes[i], data[1], info, count+1, i, sResult);
				}				
				else 
				{
					sResult.push(nodes[i]);
				}
			}
		},

		getParentNode : function(h, empty, info, count, num, sResult)
		{
			var result = null;
			var data = info[count];
			
			var node = h.parentNode;

			if(data) 
			{
				data[0](node, data[1], info, count+1, 0, sResult);
			}
			else 
			if(node) 
			{
				sResult.push(node);
			}
		},

		//precsiblg[3] might not be conform spec
		getPrecedingSibling : function(h, tagName, info, count, num, sResult)
		{
			var result = null;
			var data = info[count];

			var node = h.previousSibling;
			while(node)
				{
				if(tagName != "NODE()" && node.tagName != tagName)
				{
					node = node.previousSibling;
					continue;
				}

				if(data) 
				{
					data[0](node, data[1], info, count+1, 0, sResult);
				}
				else 
				if(node)
				{
					sResult.push(node);
					break;
				}
			}
		},

		//flwsiblg[3] might not be conform spec
		getFollowingSibling : function(h, tagName, info, count, num, sResult)
		{
			var result = null, data = info[count];

			var node = h.nextSibling;
			while(node)
			{
				if(tagName != "NODE()" && node.tagName != tagName)
				{
					node = node.nextSibling;
					continue;
				}

				if(data) 
				{
					data[0](node, data[1], info, count+1, 0, sResult);
				}
				else 
				if(node)
				{
					sResult.push(node);
					break;
				}
			}
		},

		multiXpaths : function(contextNode, list, info, count, num, sResult)
		{
			for(var i=0;i<list.length;i++)
			{
				var info = list[i][0];
				var rootNode = (info[3] ? contextNode.ownerDocument.documentElement : contextNode);
				info[0](rootNode, info[1], list[i], 1, 0, sResult);
			}

			sResult.makeUnique();
		},

		compile : function(sExpr)
		{
			sExpr = sExpr.replace(/\[(\d+)\]/g, "/##$1");
			sExpr = sExpr.replace(/\|\|(\d+)\|\|\d+/g, "##$1");
			sExpr = sExpr.replace(/\.\|\|\d+/g, ".");
			sExpr = sExpr.replace(/\[([^\]]*)\]/g, "/##$1");

			if(sExpr == ".") return ".";

			//Mark // elements
			//sExpr = sExpr.replace(/\/\//g, "/[]/self::");
			sExpr = sExpr.replace(/\/\//g, "descendant::");

			//Check if this is an absolute query
			return this.processXpath(sExpr);
		},

		processXpath : function(sExpr){
			var results = new Array();
			sExpr = sExpr.replace(/('[^']*)\|([^']*')/g, "$1_@_$2");
			sExpr = sExpr.split("\|");
			for(var i=0;i<sExpr.length;i++) sExpr[i] = sExpr[i].replace(/('[^']*)\_\@\_([^']*')/g, "$1|$2");

			if(sExpr.length == 1) sExpr = sExpr[0];
			else{
				for(var i=0;i<sExpr.length;i++) sExpr[i] = this.processXpath(sExpr[i]);
				results.push([this.multiXpaths, sExpr]);
				return results;
			}

			var isAbsolute = sExpr.match(/^\/[^\/]/);
			var sections = sExpr.split("/");
			for(var i=0;i<sections.length;i++){
				if(sections[i] == "." || sections[i] == "") continue;
				else if(sections[i].match(/^[\w-_\.]+(?:\:[\w-_\.]+){0,1}$/)) results.push([this.getChildNode, sections[i]]);//.toUpperCase()
				else if(sections[i].match(/^\#\#(\d+)$/)) results.push([this.doQuery, ["num+1 == " + parseInt(RegExp.$1)]]);
				else if(sections[i].match(/^\#\#(.*)$/)){

					//FIX THIS CODE
					var query = RegExp.$1;
					var m = [query.match(/\(/g), query.match(/\)/g)];
					if(m[0] || m[1]){
						while(!m[0] && m[1] || m[0] && !m[1] || m[0].length != m[1].length){
							if(!sections[++i]) break;
							query += sections[i];
						}
					}

					results.push([this.doQuery, [this.compileQuery(query)]]);
				}
				else if(sections[i] == "*") results.push([this.getChildNode, null]); //FIX - put in def function
				else if(sections[i].substr(0,2) == "[]") results.push([this.getAllNodes, ["*", false]]);//sections[i].substr(2) ||
				else if(sections[i].match(/descendant-or-self::node\(\)$/)) results.push([this.getAllNodes, ["*", true]]);
				else if(sections[i].match(/descendant-or-self::([^\:]*)(?:\:(.*)){0,1}$/)) results.push([this.getAllNodes, [RegExp.$2 || RegExp.$1, true, RegExp.$1]]);
				else if(sections[i].match(/descendant::([^\:]*)(?:\:(.*)){0,1}$/)) results.push([this.getAllNodes, [RegExp.$2 || RegExp.$1, false, RegExp.$1]]);
				else if(sections[i].match(/^\@(.*)$/)) results.push([this.getAttributeNode, RegExp.$1]);
				else if(sections[i] == "text()") results.push([this.getTextNode, null]);
				else if(sections[i] == "node()") results.push([this.getAnyNode, null]);//FIX - put in def function
				else if(sections[i] == "..") results.push([this.getParentNode, null]);
				else if(sections[i].match(/following-sibling::(.*)$/)) results.push([this.getFollowingSibling, RegExp.$1.toUpperCase()]);
				else if(sections[i].match(/preceding-sibling::(.*)$/)) results.push([this.getPrecedingSibling, RegExp.$1.toUpperCase()]);
				else if(sections[i].match(/self::(.*)$/)) results.push([this.doQuery, ["XPath.doXpathFunc('local-name', h) == '" + RegExp.$1 + "'"]]);
				else
				{
					var query = sections[i];

					//FIX THIS CODE
					//add some checking here
					var m = [query.match(/\(/g), query.match(/\)/g)];
					if(m[0] || m[1]){
						while(!m[0] && m[1] || m[0] && !m[1] || m[0].length != m[1].length){
							if(!sections[++i]) break;
							query += "/" + sections[i];
							m = [query.match(/\(/g), query.match(/\)/g)];
						}
					}

					results.push([this.doQuery, [this.compileQuery(query), true]])

					//throw new Error(1503, "---- Javeline Error ----\nMessage : Could not match XPath statement: '" + sections[i] + "' in '" + sExpr + "'");
				}
			}

			results[0][3] = isAbsolute;
			return results;
		},

		compileQuery : function(code)
		{
			var c = new CodeCompilation(code);
			return c.compile();
		},

		doXpathFunc : function(type, arg1, arg2, arg3)
		{
			switch(type){
				case "not": return !arg1;
				case "position()": return num == arg1;
				case "format-number": return new String(Math.round(parseFloat(arg1)*100)/100).replace(/(\.\d?\d?)$/, function(m1){return m1.pad(3, "0", PAD_RIGHT)});; //this should actually do something
				case "floor": return Math.floor(arg1);
				case "ceiling": return Math.ceil(arg1);
				case "starts-with": return arg1 ? arg1.substr(0, arg2.length) == arg2 : false;
				case "string-length": return arg1 ? arg1.length : 0;
				case "count": return arg1 ? arg1.length : 0;
				case "last": return arg1 ? arg1[arg1.length-1] : null;
				case "local-name": return (arg1 ? arg1.tagName : "");
				case "substring": return (arg1 && arg2 ? arg1.substring(arg2, arg3 || 0) : "");
				case "contains": return (arg1 && arg2 ? arg1.indexOf(arg2) > -1 : false);
				case "concat":
					for(var str="",i=1;i<arguments.length;i++){
						if(typeof arguments[i] == "object"){
							str += getNodeValue(arguments[i][0]);
							continue;
						}
						str += arguments[i];
					}
				return str;
			}
		},

		selectNodeExtended : function(sExpr, contextNode)
		{
			var sResult = this.selectNodes(sExpr, contextNode);

			if(sResult.length == 0) 
			{
				return null;
			}
			if(sResult.length == 1)
			{
				sResult = sResult[0];
				return getNodeValue(sResult);
			}

			return sResult;
		},

		selectNodes : function(sExpr, contextNode)
		{
			if(!this.cache[sExpr]) this.cache[sExpr] = this.compile(sExpr);
			
			//alert(" sExpr = " + sExpr);
			//alert(" contextNode = " + contextNode);

			//#ifdef __DEBUG
			//setStatus("Processing custom XPath: " + sExpr + ":" + contextNode.serialize().replace(/</g, "&lt;"));
			//#endif

			if(typeof this.cache[sExpr] == "string" && this.cache[sExpr] == ".") return [contextNode];

			var info = this.cache[sExpr][0];
			var rootNode = (info[3] && !contextNode.nodeType == 9 ? contextNode.ownerDocument.documentElement : contextNode);//document.body
			var sResult = [];

			info[0](rootNode, info[1], this.cache[sExpr], 1, 0, sResult);

			return sResult;
		},
		
		selectSingleNode : function(sExpr, contextNode)
		{
			//alert("selectSingleNode");
			
			var l_nodes = this.selectNodes(sExpr,contextNode);
			
			if (l_nodes == null)
			{
				//alert("no nodes found");
				return null;
			}
			
			//alert(l_nodes.length);
			
			if (l_nodes.length == 0)
			{
				return null;
			}			

			return l_nodes[0];
		}
		
	}

	function getNodeValue(sResult){
		if(sResult.nodeType == 1) return sResult.firstChild ? sResult.firstChild.nodeValue : "";
		if(sResult.nodeType > 1 || sResult.nodeType < 5) return sResult.nodeValue;
		return sResult;
	}

	function CodeCompilation(code)
	{
		this.data = {
			F : [],
			S : [],
			I : [],
			X : []
		};

		this.compile = function(){
			code = code.replace(/ or /g, " || ");
			code = code.replace(/ and /g, " && ");
			code = code.replace(/!=/g, "{}");
			code = code.replace(/=/g, "==");
			code = code.replace(/\{\}/g, "!=");

			// Tokenize
			this.tokenize();

			// Insert
			this.insert();

			return code;
		}

		this.tokenize = function(){
			//Functions
			var data = this.data.F;
			code = code.replace(/(format-number|contains|substring|local-name|last|node|position|round|starts-with|string|string-length|sum|floor|ceiling|concat|count|not)\s*\(/g, function(d, match){return (data.push(match) - 1) + "F_";});

			//Strings
			data = this.data.S;
			code = code.replace(/'([^']*)'/g, function(d, match){return (data.push(match) - 1) + "S_";});
			code = code.replace(/"([^"]*)"/g, function(d, match){return (data.push(match) - 1) + "S_";});

			//Xpath
			data = this.data.X;
			code = code.replace(/(^|\W|\_)([\@\.\/A-Za-z][\.\@\/\w]*(?:\(\)){0,1})/g, function(d, m1, m2){return m1 + (data.push(m2) - 1) + "X_";});
			code = code.replace(/(\.[\.\@\/\w]*)/g, function(d, m1, m2){return (data.push(m1) - 1) + "X_";});

			//Ints
			data = this.data.I;
			code = code.replace(/(\d+)(\W)/g, function(d, m1, m2){return (data.push(m1) - 1) + "I_" + m2;});
		}

		this.insert = function(){
			var data = this.data;
			code = code.replace(/(\d+)([FISX])_/g, function(d, nr, type)
			{
				var value = data[type][nr];

				if(type == "F"){
					return "XPath.doXpathFunc('" + value + "', ";
				}
				else if(type == "S"){
					return "'" + value + "'";
				}
				else if(type == "I"){
					return value;
				}
				else if(type == "X"){
					return "XPath.selectNodeExtended('" + value.replace(/'/g, "\\'") + "', h)";
				}
			});
		}
	}

}


/*!
    @fn         MetaWrap.XML.Document.loadXML = function(p_xml_string)
    @param      p_xmldocument  The document we are loading into
    @param      p_xml_string  The XML string we are loading
    @brief      MicroSoft Style loadXML Function
    @author     James Mc Parlane
    @date       19 October 2002
    @todo       test this
*/
MetaWrap.XML.Document.loadXML = function(p_xmldocument,p_xml_string)
{
    try
    {
        // Create a DOMParser object
        var l_DOMParser = new DOMParser();

        // Create new document from string
        var l_doc = l_DOMParser.parseFromString(p_xml_string, "text/xml");

        // Make sure to remove all child nodes from this document as loadXML should replace everything
        while (p_xmldocument.hasChildNodes())
        {
            p_xmldocument.removeChild(p_xmldocument.lastChild);
        }
				
		
        // Add the nodes from the newly created document
        for (var i=0; i < l_doc.childNodes.length; i++)
        {
			try
			{
				var l_childnode = l_doc.childNodes[i];
										
										
				if (l_childnode.nodeType == 10)
				{
					// do nothing if its a DOCTYPE
				}
				else
				{
			
					//import a node
					var l_node  = p_xmldocument.importNode(l_doc.childNodes[i],true);

					//append a child node to the current document
					p_xmldocument.appendChild(l_node);
				}

			}
			catch(l_e2)
			{
				error("p_xmldocument.importNode failed\n p_xmldocument: '" + p_xmldocument + " " + l_doc.childNodes[i] + "'\nreason: '" + MetaWrap.exceptionMessage(l_e2) + "'" );
			}
        }
    }
    catch(e_l)
    {
        error("MetaWrap.XML.Document.loadXML failed\n p_xmldocument: '" + p_xmldocument.url + "'\p_xml_string.length: '" + p_xml_string.length + "'\nreason: '" + MetaWrap.exceptionMessage(e_l) + "'" );
    }

}


/*!
    @fn         MetaWrap.XML.Document.selectNodes = function(p_xmldocument, p_xpath)
    @param      p_xmldocument The xml document we are searching
    @param      p_xpath The XPath we are searching for
    @brief      Performs an XPath Query Under Mozilla
    @author     James Mc Parlane
    @date       19 October 2002

    http://www.nabble.com/XPath-difference-between-%3Cxsl:output-method%3D%22html%22%3E-and-%22xml%22-t3563509.html
*/
MetaWrap.XML.Document.selectNodes = function(p_xmldocument, p_xpath)
{
	//alert("MetaWrap.XML.Document.selectNodes");

    try
    {
        var l_xpe = new XPathEvaluator();
        var l_nodes = new Array();
        var l_node = null;
        var result = l_xpe.evaluate(p_xpath, p_xmldocument,
        //l_xpe.createNSResolver(p_xmldocument.documentElement)
		function lookupNamespaceURI (prefix)
		{
			//alert(prefix);
			 switch (prefix)
			 {
			   case 'xhtml':
				 return 'http://www.w3.org/1999/xhtml';
			}
		}
        ,0
        ,null);

        while (l_node = result.iterateNext())
        {
            l_nodes.push(l_node);
        }

        return l_nodes;
    }
    catch(e_x)
    {
        error("MetaWrap.XML.Document.selectNodes failed\n p_xmldocument: '" + p_xmldocument.url + "'\np_xpath: '" + p_xpath + "'\nreason: '" + MetaWrap.exceptionMessage(e_x) + "'" );
    }
}

/*!
    @fn         MetaWrap.XML.Document.selectSingleNode = function(p_xmldocument,p_xpath)
    @param      p_xmldocument The xml document we are searching
    @param      p_xpath The XPath we are searching for
    @brief      Performs an XPath Query aware of the xhtml namespace
    @author     James Mc Parlane
    @date       19 October 2002

    http://www.nabble.com/XPath-difference-between-%3Cxsl:output-method%3D%22html%22%3E-and-%22xml%22-t3563509.html
*/
MetaWrap.XML.Document.selectSingleNode = function(p_xmldocument,p_xpath)
{
	if( !p_xmldocument )
	{
		p_xmldocument = this;
	}

	var l_nodes = this.selectNodes(p_xmldocument,p_xpath);
	if( l_nodes.length > 0 )
	{
		return l_nodes[0];
	}
	else
	{
		return null;
	}
}


/*
if( document.implementation.hasFeature("XPath", "3.0") )
{
	alert("add xpath");
	

	if ((Element != null) && (Element.prototype != null))
	{
		Element.prototype.selectNodes = function(cXPathString)
		{
			if(this.ownerDocument.selectNodes)
			{
				return this.ownerDocument.selectNodes(cXPathString, this);
			}
			else{throw "For XML Elements Only";}
		}

		Element.prototype.selectSingleNode = function(cXPathString)
		{
			if(this.ownerDocument.selectSingleNode)
			{
				return this.ownerDocument.selectSingleNode(cXPathString, this);
			}
			else{throw "For XML Elements Only";}
		}
	}	
}
*/


if (g_beng == "Mozilla")
{
	//g_XPATH_NEEDS_NAMESPACE = true;
    // In Mozilla its possible to overide
    XMLDocument.prototype.__defineGetter__("xml", MetaWrap.XML.Document.xml);
    XMLDocument.prototype.__defineGetter__("url", MetaWrap.XML.Document.url);
    XMLDocument.prototype.__defineGetter__("text", MetaWrap.XML.Document.text);
    XMLDocument.prototype.selectNodes = function(p_xpath) {return MetaWrap.XML.Document.selectNodes(this,p_xpath);};
    XMLDocument.prototype.selectSingleNode = function(p_xpath) {return MetaWrap.XML.Document.selectSingleNode(this,p_xpath);};
    XMLDocument.prototype.loadXML = function(p_xml_string) {return MetaWrap.XML.Document.loadXML(this,p_xml_string);};
	
    Element.prototype.selectNodes = function(p_xpath) {return MetaWrap.XML.Document.selectNodes(this,p_xpath);};
    Element.prototype.selectSingleNode = function(p_xpath) {return MetaWrap.XML.Document.selectSingleNode(this,p_xpath);};
	
}

if (g_beng == "Webkit")
{
	
    XMLDocument.prototype.__defineGetter__("xml", MetaWrap.XML.Document.xml);
    XMLDocument.prototype.__defineGetter__("url", MetaWrap.XML.Document.url);
    XMLDocument.prototype.__defineGetter__("text", MetaWrap.XML.Document.text);
    XMLDocument.prototype.selectNodes = function(p_xpath) {return XPath.selectNodes(p_xpath,this);};
    XMLDocument.prototype.selectSingleNode = function(p_xpath) {return XPath.selectSingleNode(p_xpath,this);};


	
	XMLDocument.prototype.loadXML = function(p_xml_string) 
	{		
		MetaWrap.XML.Document.loadXML(this,p_xml_string);
				
		//this.load("data:application/xml;charset=utf-8," + encodeURIComponent("<xml></xml>") );
		//var l_dp = new DOMParser();				
		//return l_dp.parseFromString(p_xml_string, "text/xml");
	};


    Element.prototype.selectNodes = function(p_xpath) {return XPath.selectNodes(p_xpath,this);};
    Element.prototype.selectSingleNode = function(p_xpath) {return XPath.selectSingleNode(p_xpath,this);};
	
}

/*
var e = Element.prototype;
e.__defineGetter__("innerXHTML",function(){
      var buffer = "";
      var currentElt = this;
      for (var index=0;index!=currentElt.childNodes.length;index++){
         var node = currentElt.childNodes.item(index);
         buffer += (new XMLSerializer()).serializeToString(node);
          }
      return buffer;
}); 
*/

if (g_beng == "Opera")
{
	//g_XPATH_NEEDS_NAMESPACE = true;
    XMLDocument.prototype.__defineGetter__("xml", MetaWrap.XML.Document.xml);
    XMLDocument.prototype.__defineGetter__("url", MetaWrap.XML.Document.url);
    XMLDocument.prototype.__defineGetter__("text", MetaWrap.XML.Document.text);
	
    XMLDocument.prototype.selectNodes = function(p_xpath) {return MetaWrap.XML.Document.selectNodes(this,p_xpath);};
    XMLDocument.prototype.selectSingleNode = function(p_xpath) {return MetaWrap.XML.Document.selectSingleNode(this,p_xpath);};
	
	
	XMLDocument.prototype.loadXML = function(p_xml_string) 
	{
		MetaWrap.XML.Document.loadXML(this,p_xml_string);
	};
}


/*!
    @fn         MetaWrap.XML.Document.Request = function (p_document,p_http_client,p_url,p_method,p_async,p_errorsok)
    @param      p_document Reference to MetaWrap.XML.Document that will contain the requested XML
    @param      p_url The URL to the XML file
    @param      p_method HTTP Method - eg GET POST HEAD PUT
    @param      p_async If true then this is an asyncronous request
    @param      p_http_client Reference to MetaWrap.Network.Client.HTTP that will request the document
    @brief      Take a document and request object and go and fetch some XML, returning it in the document
    @author     James Mc Parlane
    @date       19 Feburary 2005

    We rely on p_http_client not parsing the XML until its accessed as XML nodes to avoid double parsing.
    Experiments have shown that the difference in speed is insignificant - so this simpler, standard brutal approach
    works fine. We don't expect our XMLHttpRequest object to be a fully functioning DOM implementation so we
    assume that we have to transfer the response from from p_http_client into p_document
*/
MetaWrap.XML.Document.Request = function (p_document,p_http_client,p_url,p_method,p_async,p_errorsok,p_oncomplete,p_this,p_data)
{
    //alert("MetaWrap.XML.Document.Request " + p_url);

    if ((p_url.indexOf("file:") == 0) || (window.location.protocol == 'file:'))
    {

		if (g_beng != "IE")
		{
			error("Only IE can load XML when APP is running in local file system");
			return false;
		}


		try
		{
			//alert("load from filesystem");

			return p_document.load(p_url);
		}
		catch(e_f)
		{
			error("failed to load local document " + p_url + " " + MetaWrap.exceptionMessage(e_f));


/*
			try
			{

				//var fsoXML = new ActiveXObject("Scripting.FileSystemObject");
				//var XMLFile = fsoXML.OpenTextFile(p_url,1);
				//var Data = XMLFile.ReadAll();
				//XMLFile.Close();

				//alert(Data);

				//var xml = new ActiveXObject("Microsoft.XMLDOM");
				//xml.async = false;
				//xml.loadXML(Data);

			}
			catch(e_a)
			{
				error("failed to load local document " + p_url + " " + MetaWrap.exceptionMessage(e_a));
			}

*/

/*
			try
			{

				var http = new ActiveXObject("Microsoft.XMLHTTP");
				http.open("GET", p_url, false);
				http.send(null);
				var xmlDocument = http.responseXML;

			}
			catch(e_a)
			{
				error("failed to load local document " + p_url + " " + MetaWrap.exceptionMessage(e_a));
			}


			if (document.body != null)
			{
				try
				{
					var xml = document.createElement("xml");
					xml.src = p_url;
					document.body.appendChild(xml);
					var xmlDocument = xml.XMLDocument;
					document.body.removeChild(xml);

					return xmlDocument;
				}
				catch(e_i)
				{
					error("failed to load local document " + p_url + " " + MetaWrap.exceptionMessage(e_i));
				}
			}
*/

		}

	}


    try
    {
        // 5 seconds to resolve
        var l_resolve_timeout = 5 * 1000;

        // 5 seconds to connect
        var l_connect_timeout = 5 * 1000;

        // 15 seconds to send
        var l_send_timeout = 5 * 1000;

        // 15 seconds to ger response
        var l_receive_timeout = 15 * 1000;

        // Set the timeouts to something a bit more reasonable
        p_http_client.setTimeouts(l_resolve_timeout, l_connect_timeout, l_send_timeout, l_receive_timeout);
    }
    catch(e_t)
    {
        //trace("failed to set timeouts ");
    }

    // now try to fetch the document
    try
    {

        // open the request
        p_http_client.open(p_method, p_url, p_async);

		if (p_async == true)
		{
			// Call this this.readyStateChange when something responds to this request and redraws the display
			var l_this = this;

			p_http_client.onreadystatechange = function()
			{
				try
				{
					MetaWrap.XML.Document.ProcessResponse(p_document,p_http_client,p_url,p_oncomplete,p_this,p_data);
				}
				catch(l_e)
				{
					//alert("failed to process response");
					MetaWrap.XML.Document.Request.g_error_handler();
				}
			};
		}
		else
		{
			p_http_client.onreadystatechange = function()
			{
			};
		}

        // send the request
        p_http_client.send(null);
    }
    catch(e_l)
    {
        if (p_errorsok)
        {
            error("failed to fetch xml document '" + p_url + "' reason: " + MetaWrap.exceptionMessage(e_l));
        }
        return false;
    }

    if (!p_async)
    {
		if ((p_http_client.status == 404) || (p_http_client.status == 500))
		{

			if (p_errorsok)
			{
				error("failed to fetch xml document '" + p_url + "' reason: " + p_http_client.status);
			}
			return false;
		}
    }

	return MetaWrap.XML.Document.ProcessResponse(p_document,p_http_client,p_url,p_oncomplete,p_this,p_data);
}

MetaWrap.XML.Document.Request.g_error_handler = null;

MetaWrap.XML.Document.ProcessResponse = function(p_document,p_http_client,p_url,p_oncomplete,p_this,p_data)
{
	// 4 Means done...
    if (p_http_client.readyState == 4)
    {
        // 200 is good :)
        if (p_http_client.status == 200)
        {
			// transfer the XML from our response into our document - our abstratction does not
			try
			{
				// MS4 DOM does not support importNode - but if we load XML and the HTTP Content type
				// is wrong  (this happens on badly configured HTTP servers/response pages or when you
				// load XML from the  file system ), then p_http_client.responseXML will be empty - in which
				// case we *want* it to blow up on the next line when it accesses firstChild.nodeName
				var l_trigger = p_http_client.responseXML.firstChild.nodeName;

				var l_node = p_http_client.responseXML.firstChild;

				// try fastest method first - just transfer the nodes from one document to another
				while (l_node != null)
				{
					//append the child to the current document
					p_document.appendChild(p_document.importNode(l_node, true));

					// get the next node
					l_node = l_node.nextSibling;
				}

				//trace("IMPORT");
			}
			catch(e_i)
			{
				try
				{
					var l_response = p_document.loadXML(p_http_client.responseText);

					if (p_oncomplete != null)
					{
						p_oncomplete(p_http_client.status,p_document,p_http_client,p_url,p_this,p_data);
					}

					// load as text
					return true;

					//trace("LOADXML");
				}
				catch(e_l)
				{

					if (p_oncomplete != null)
					{
						p_oncomplete(p_http_client.status,p_document,p_http_client,p_url,p_this,p_data);
					}

					return false;
				}
			}

			if (p_oncomplete != null)
			{
				p_oncomplete(p_http_client.status,p_document,p_http_client,p_url,p_this,p_data);
			}
        }
        else
        {
        	//alert(p_http_client.status);
        	//alert(p_document.xml);

			if (p_oncomplete != null)
			{
				p_oncomplete(p_http_client.status,p_document,p_http_client,p_url,p_this,p_data);
			}

			return false;
        }

    }

    return true;
}


/*!
    @fn         MetaWrap.XML.Document.Load = new function(p_document,p_xml_request,p_url)
    @param      p_document The document we are loading into
    @param      p_request The request object
    @param      p_url The URL to the XML file
    @brief      Take a document and request object and go and fetch some XML, returning it in the document
    @author     James Mc Parlane
    @date       12 June 2005
*/
MetaWrap.XML.Document.Load = function(p_xml_document,p_xml_request,p_url)
{
    return MetaWrap.XML.Document.Request(p_xml_document,p_xml_request,p_url,"GET",false,false);
}

/*!
 *@} endgroup mw_javascript_lib_xml MetaWrap - JavaScript - XML
 */

/*!
 *@} end of MetaWrap.XML
 */
