/*!

    @file mw_lib_xml_xslt.js

    $Id: mw_lib_xml_xslt.js,v 1.32 2008/07/19 16:14:53 james Exp $

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
 * $Log: mw_lib_xml_xslt.js,v $
 * Revision 1.32  2008/07/19 16:14:53  james
 * Adding XSLT support to Safari
 *
 * Revision 1.31  2006/11/08 03:05:43  james
 * Tidy up of action XML code
 * Added ability for 'structure' to take in static xml
 *
 * Revision 1.30  2006/10/30 07:41:32  james
 * Getting XSLT and structure engine back up and running
 *
 * Revision 1.29  2006/07/01 08:07:01  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.28  2006/07/01 06:59:06  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.27  2006/05/06 09:33:05  james
 * More refactoring
 *
 * Revision 1.26  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.25  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.24  2005/11/13 01:58:10  james
 * Fixed isssue with remix under Firefox
 *
 * Revision 1.23  2005/11/09 05:04:40  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.22  2005/11/02 11:41:22  james
 * Got basic remix transform happening
 *
 * Revision 1.21  2005/10/30 11:20:14  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.20  2005/10/20 12:19:09  james
 * *** empty log message ***
 *
 * Revision 1.19  2005/10/05 09:18:06  james
 * Sad attempt to fix xslt object issue
 *
 * Revision 1.18  2005/10/04 13:43:46  james
 * Got some more testcases working for wirewrap
 *
 * Revision 1.17  2005/10/03 14:23:00  james
 * Tidied up XSLT code.
 *
 * Revision 1.16  2005/10/03 11:37:26  james
 * Tidied up XSLT code. Still needs more work.
 *
 * Revision 1.15  2005/10/03 11:30:13  james
 * Tidied up XSLT code. Still needs more work.
 *
 * Revision 1.14  2005/10/03 07:05:16  james
 * Modified behavior testcases to work with addListener
 * Fixed issue in XSLT - unwanted transformix:result element
 * when performing a text only transform. Needed to change API
 * to deal with this. Now have two result accessor functions for
 * getting output.
 *
 * MetaWrap.XML.XSLT.Processor.getText
 * MetaWrap.XML.XSLT.Processor.getXML
 *
 * Revision 1.13  2005/10/03 00:20:37  james
 * Working on wirewrap testcases.
 * Porting to use new addEventListener
 *
 * Revision 1.12  2005/09/21 02:29:54  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.11  2005/07/07 01:34:24  james
 * Bug fixes
 *
 * Revision 1.10  2005/06/20 08:58:37  james
 * Code tidy up
 *
 * Revision 1.9  2005/06/19 11:48:19  james
 * Code tidy up
 *
 * Revision 1.8  2005/06/19 11:01:08  james
 * Code tidy up
 *
 * Revision 1.7  2005/06/17 11:21:04  james
 * Streamlining the XSLT document process
 *
 * Revision 1.6  2005/06/17 11:15:01  james
 * Streamlining the XSLT document process
 *
 * Revision 1.5  2005/06/17 09:22:13  james
 * Still objectising javascript XSLT lib.
 *
 * Revision 1.4  2005/06/12 14:27:56  james
 * Objectising javascript XSLT lib.
 *
 * Revision 1.3  2005/06/12 09:08:47  james
 * Fixing some inconsitencies
 *
 * Revision 1.2  2005/06/12 08:25:18  james
 * getting everything into objects
 *
 * Revision 1.1  2005/06/12 08:02:29  james
 * getting everything into objects
 *
 */

//alert("$Id: mw_lib_xml_xslt.js,v 1.32 2008/07/19 16:14:53 james Exp $");

/*! \page mw_javascript_lib_xml_xslt MetaWrap - JavaScript - XML - XSLT
 *
 * \subsection mw_javascript_lib_xml_xslt Overview
 *
 *  http://www.netcrucible.com/xslt/msxml-faq.htm
 *  http://www-128.ibm.com/developerworks/web/library/wa-ie2mozgd/
 *  http://www.dpawson.co.uk/xsl/sect2/sect21.html
 *
 *  MSXML3/4
 *  Microsoft released several versions of the MSXML product. The
 *  original beta version 1.0 was quickly superseded by version 2.0,
 *  which was supplied with the final release of Internet Explorer 5.
 *
 *  Version 3, MSXML3, was first released in March 2000 and became
 *  a production release in October 2000. It is included as a standard
 *  part of Internet Explorer 6.
 *
 *  The current version is MSXML4. However, MSXML3 has not been
 *  superseded, because it is the last version that retains support
 *  for Microsoft's obsolete WD-xsl dialect. WD-xsl was first shipped
 *  in 1998 before XSLT 1.0 was finalized, and you still occasionally
 *  come across stylesheets written in this variant of the language:
 *  You can recognize them because they use the namespace URI
 *  http://www.w3.org/TR/WD-xsl. (Microsoft still, confusingly, refer
 *  to WD-xsl by the name "XSL," which means something quite different
 *  in W3C).
 *
 *  You can find download links for both MSXML3 and MSXML4 by going to
 *  http://msdn.microsoft.com/xml.
 *
 *  MSXML is not just an XSLT processor, it also includes Microsoft's
 *  XML parser and DOM implementation. The main difference between
 *  MSXML3 and MSXML4 has nothing to do with the XSLT engine; it is
 *  concerned with support for XML Schema, which is outside our scope here.
 *
 *  The objects, methods, properties, and events available with the
 *  MSXML3 parser are listed in the Help file that comes with the SDK.
 *  I have only included here the parts of the interface that are
 *  relevant to XSLT and XPath processing.
 *
 *  Objects
 *  The objects of particular interest to XSLT and XPath processing are listed below:
 *
 *  Object
 *   Description
 *
 *  IXMLDOMDocument
 *   The root of an XML document
 *
 *  IXMLDOMNode
 *   Any node in the DOM
 *
 *  IXMLDOMNodeList
 *   A collection of Node objects
 *
 *  IXMLDOMParseError
 *   Details of the last parse error that occurred
 *
 *  IXMLDOMSelection
 *   A selection of nodes
 *
 *  IXSLProcessor
 *   An execution of an XSLT stylesheet
 *
 *  IXSLTemplate
 *   A compiled XSLT stylesheet in memory
 *
 *
 *  These objects are described in the sections that follow.
 *
 *  IXMLDOMDocument and IXMLDOMDocument2
 *  The IXMLDOMDocument class inherits all the properties and methods of
 *  IXMLDOMNode. IXMLDOMDocument2 is a later version of the interface,
 *  introducing a few extra properties and methods. This section lists
 *  the additional methods and properties of relevance to XSLT and XPath
 *  processing, in other words, all the methods and properties that are
 *  not also present on IXMLDOMNode, which is described on page 802.
 *
 *  Additional Methods
 *  The methods particularly relevant to XPath and XSLT processing are
 *  described in detail below.
 *
 *  The validate() and setProperty() methods actually belong to the
 *  IXMLDOMDocument2 interface, which is an extension to IXMLDOMDocument
 *  introduced with the MSXML2 product.
 *
 *  Name
 *   Returns
 *   Description
 *
 *  abort
 *   (Nothing)
 *   When a document is being loaded asynchronously, abort() can
 *   be called at any time to abandon the process
 *
 *  load
 *   Boolean
 *   Loads document from the specified XML source. The argument is
 *   normally a string containing a URL. Clears out any existing content
 *   of the Document object, and replaces it with the result of parsing
 *   the XML source. Returns True if successful, False otherwise
 *
 *  loadXML
 *   Boolean
 *   Loads the document from a string containing the text of an XML
 *   document. Clears out any existing content of the Document object,
 *   and replaces it with the result of parsing the XML string. Returns
 *   True if successful, False otherwise
 *
 *  save
 *   (Nothing)
 *   Saves the document to a specified destination. The destination is
 *   usually a filename, given as a string. The effect is to serialize the
 *   Document in XML format as a file. It is also possible to specify various
 *   other objects as a destination, for example, it can be another Document
 *   object, in which case the document is duplicated
 *
 *  setProperty
 *   (Nothing)
 *   Sets various system properties. The most important properties are:
 *
 *  SelectionLanguage. This takes the value «XPath» (the MSXML4 default)
 *  or «XSLPattern» (the default for MSXML3). This affects the syntax
 *  used in the expression passed to the selectNodes() andselectSingleNode()
 *  methods. If you want to use XPath 1.0 syntax you must set this property to
 *  «XPath». The value «XSLPattern», refers to the old Microsoft-specific
 *  WD-xsl dialect
 *
 *  SelectionNamespaces. The value of this property should be a space-separated
 *  list of namespace declarations, for example
 *
 *
 *  «xmlns:a='http:// a.com/'
 *  xmlns:b='http://b.com/»
 *
 *
 *  These define the namespace prefixes that can be used within any expression
 * passed to the selectNodes() and selectSingleNode () methods
 *
 *  validate
 *   (Nothing)
 *   Validates the document, using the current DTD or schema
 *
 *
 *  Additional Properties
 *  Name
 *   Type
 *   Description
 *
 *  async
 *   Boolean
 *   True if the document is to be loaded asynchronously
 *
 *  parseError
 *   IXMLDOMParseError
 *   The last parser error
 *
 *  readyState
 *  Long
 *   Current state of readiness for use. Used when loading asynchronously.
 *   The values are Uninitialized (0), Loading (1), Loaded (2), Interactive
 *   (3), and Completed (4).
 *
 *  validateOnParse
 *   Boolean
 *   Requests validation of the document against its DTD or schema
 *
 *
 *  IXMLDOMNode
 *   This object represents a node in the document tree. Note that the tree
 *   conforms to the DOM model, which is not always the same as the XPath
 *   model described in Chapter 2: For example, the way namespaces are
 *   modeled is different, and text nodes are not necessarily normalized.
 *
 *   There are subclasses of IXMLDOMNode for all the different kinds of node
 *   found in the tree. I have not included descriptions of all these, since
 *   they are not directly relevant to XSLT and XPath processing. The only
 *   subclass I have included is IXMLDOMDocument, which can be regarded as
 *   representing either the whole document or its root node, depending
 *   on your point of view.
 *
 *  Methods
 *  The methods available on IXMLDOMNode that are relevant to XSLT and XPath processing are listed below. Most often, these methods will be applied to the root node (the DOM Document object) but they can be applied to any node.
 *
 *  Name
 *   Returns
 *   Description
 *
 *  selectNodes
 *   IXMLDOMNodeList
 *   Executes an XPath expression and returns a list of matching nodes
 *
 *  selectSingleNode
 *   IXMLDOMNode
 *   Executes an XPath expression and returns the first matching node
 *
 *  transformNode
 *   String
 *   Applies a stylesheet to the subtree rooted at this node, returning the result as a string. The argument identifies the XSLT stylesheet. This will usually be a Document, but it may be a Node representing an embedded stylesheet within a Document. The serialized result of the transformation is returned as a string of characters (the <xsl: output> encoding is ignored)
 *
 *  transformNode ToObject
 *   (Nothing)
 *   Applies a stylesheet to the subtree, placing the result into a supplied document or stream. The difference from transformNode() is that the destination of the transformation is supplied as a second argument. This will usually be a Document. It may also be a Stream
 *
 *
 *  Properties
 *  The most useful properties are listed below. Properties whose main purpose is to navigate through the document are not listed here, because navigation can be achieved more easily using XPath expressions.
 *
 *  Name
 *   Type
 *   Description
 *
 *  baseName
 *   String
 *   The local name of the node, excluding any namespace prefix
 *
 *  namespaceURI
 *   String
 *   The namespace URI
 *
 *  nodeName
 *   String
 *   The name of the node, including its namespace prefix if any. Note that unlike the XPath model, unnamed nodes are given conventional names such as "#document", "#text", and "#comment"
 *
 *  nodeTypeStrin
 *   String
 *   Returns the type of node in string form. For example, "element", "attribute", or "comment"
 *
 *  nodeValue
 *   Variant
 *   The value stored in the node. This is not the same as the XPath string-value; for elements, it is always null
 *
 *  prefix
 *   String
 *   The prefix for the namespace applying to the node
 *
 *  text
 *   String
 *   Text contained by this node (like the XPath string-value)
 *
 *  xml
 *   String
 *   XML representation of the node and its descendants
 *
 *
 *  IXMLDOMNodeList
 *  This object represents a list of nodes. For our present purposes, we are interested in this object because it is the result of the selectNodes() method.
 *
 *  An IXMLDOMNodeList is returned as a result of the selectNodes() method: It contains the list of nodes selected by the supplied XPath expression. You can process all the nodes in the list either by using the nextNode() method or by direct indexing using the item property.
 *
 *  Methods
 *  Name
 *   Returns
 *   Description
 *
 *  item
 *   IXMLDOMNode
 *   item(N) gets the node at position N
 *
 *  nextNode
 *   IXMLDOMNode
 *   Gets the next node
 *
 *  reset
 *   (Nothing)
 *   Resets the current position
 *
 *
 *  Properties
 *  Name
 *   Type
 *   Description
 *
 *  length
 *   Long
 *   Identifies the number of nodes in the collection
 *
 *
 *   IXMLDOMParseError
 *   This object is accessible through the parseError property of the IXMLDOMDocument interface.
 *
 *   Properties
 *   Name
 *    Type
 *    Description
 *
 *   errorCode
 *    Long
 *    The error code
 *
 *   filepos
 *    Long
 *    The character position of the error within the XML document
 *
 *   line
 *    Long
 *    The line number of the error
 *
 *   linepos
 *    Long
 *    The character position in the line containing the error
 *
 *   reason
 *    String
 *    Explanation of the error
 *
 *   srcText
 *    String
 *    The XML text in error
 *
 *   url
 *    String
 *    The URL of the offending document
 *
 *
 *   IXMLDOMSelection
 *   This object represents a selection of nodes. It is returned as the result of the selectNodes() method when the target document implements the IXMLDOMDocument2 interface.
 *
 *   It's simplest to think of this object as a stored expression that returns a list of nodes on demand. It's rather like a relational view: You don't need to know whether the results are actually stored, or whether they are obtained as required.
 *
 *   This interface extends the IXMLDOMNodeList interface.
 *
 *   Methods
 *   Name
 *    Returns
 *    Description
 *
 *   clone
 *    IXMLDOMSelection
 *    Produces a copy of this IXMLDOMSelection
 *
 *   getProperty
 *    String
 *    Returns the value of a named property such as SelectionLanguage
 *
 *   item
 *    IXMLDOMNode
 *    item(N) gets the node at position N
 *
 *   matches
 *    IXMLDOMNode
 *    Tests whether the given node is a member of the set of nodes (returns null if no match, otherwise the node from which the selection succeeds)
 *
 *   nextNode
 *    IXMLDOMNode
 *    Gets the next node
 *
 *   reset
 *    (Nothing)
 *    Resets the current position
 *
 *
 *  Properties
 *  Name
 *   Type
 *   Description
 *
 *  expr
 *   String
 *   The XPath expression that determines the nodes selected. This can be changed at any time; doing so implicitly resets the current list of nodes, replacing it with a new list
 *
 *  context
 *   IXMLDOMNode
 *   Establishes the context node for evaluating the expression. Changing the context node implicitly resets the current list of nodes, replacing it with a new list
 *
 *  length
 *   Long
 *   Identifies the number of nodes in the collection
 *
 *
 *  IXSLProcessor
 *  An IXSLProcessor object represents a single execution of a stylesheet to transform a source document.
 *
 *  The object is normally created by calling the createProcessor() method of an IXSLTemplate object.
 *
 *  The transformation is achieved by calling the transform() method.
 *
 *  Methods
 *  Name
 *   Returns
 *   Description
 *
 *  addParameter
 *   (Nothing)
 *   Sets the value of a stylesheet parameter. The first argument is the local name of the parameter, the second is the parameter value, and the third is the namespace URI (usually ""). The value can be a boolean, a number, or a string, or a Node or NodeLi s t
 *
 *  reset
 *   (Nothing)
 *   Resets the state of the processor and aborts the current transform
 *
 *  setStartMode
 *   (Nothing)
 *   Sets the initial mode. There are two arguments, representing the local name and the namespace URI parts of the mode name
 *
 *  transform
 *   Boolean
 *   Starts or resumes the XSLT transformation process
 *
 *
 *  transform() => Boolean
 *
 *  This method applies the stylesheet (from which this XSLProcessor was derived) to the source document identified in the input property. The result of the transformation is accessible through the output property.
 *
 *  If the transformation is completed, the return value is True. If the source document is being loaded asynchronously, it is possible for the transform() method to return False, which means that it needs to wait until more input is available. In this case, it is possible to resume the transformation by calling transform() again later. The current state of the transformation can be determined from the readyState property.
 *
 *  Properties
 *  Name
 *   Type
 *   Description
 *
 *  input
 *   Variant
 *   XML source document to transform. This is normally supplied as a DOM Document, but it may also be a Node. The input can also be supplied as an IStream
 *
 *  output
 *   Variant
 *   Output of the transformation. If you don't supply an output object, the processor will create a String to hold the output, which you can read using this property. If you prefer, you can supply an object such as a DOM Document, a DOM Node, or an IStream to receive the output
 *
 *  ownerTemplate
 *   IXSLTemplate
 *   The XSLTemplate object used to create this processor object
 *
 *  readyState
 *   Long
 *   The current state of the transformation. This will be READYSTATE_COMPLETE (3) when the transformation is finished
 *
 *  startMode
 *   String
 *   Name of the initial mode. See setStartMode() method above
 *
 *  startModeURI
 *   String
 *   Namespace of the initial mode. See setStartMode() method above
 *
 *  stylesheet
 *   IXMLDOMNode
 *   The current stylesheet being used
 *
 *
 *  IXSLTemplate
 *  An IXSLTemplate object represents a compiled stylesheet in memory. If you want to use the same stylesheet more than once, then creating an IXSLTemplate and using it repeatedly is more efficient than using the raw stylesheet repeatedly using transformNode().
 *
 *  Methods
 *  Name
 *   Returns
 *   Description
 *
 *  createProcessor
 *   IXSLProcessor
 *   Creates an IXSLProcessor object
 *
 *  This method should only be called after the stylesheet property has been set to associate the IXSLTemplate object with a stylesheet
 *
 *  It creates an IXSLProcessor object, which can then be used to initiate a transformation of a given source document
 *
 *
 *  Properties
 *  Name
 *   Type
 *   Description
 *
 *  stylesheet
 *   IXMLDOMNode
 *   Identifies the stylesheet from which this IXSLTemplate is derived
 *
 *
 *  Setting this property causes the specified stylesheet to be compiled; this IXSLTemplate object is the reusable representation of the compiled stylesheet.
 *
 *  The DOM Node representing the stylesheet will normally be a DOM Document object, but it may be an Element representing an embedded stylesheet.
 *
 *  The document identified by the stylesheet property must be a free-threaded document object.
 *
 */

/*! \defgroup mw_javascript_libxml  MetaWrap - JavaScript - XML - XSLT
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap.XML","mw_lib_xml.js");

/*! @name  MetaWrap.XML.XSLT */
//@{

/*!
    @namespace	MetaWrap.XML.XSLT
    @brief      Declare the MetaWrap.XML.XSLT namespace container
    @author     James Mc Parlane
    @date       19 October 2004
*/
MetaWrap.XML.XSLT = new Object();

/*!
    @fn         MetaWrap.XML.XSLT.Transform = function(p_xslt_loc)
    @param      p_xslt_loc The location of the XSLT
    @brief      Constructor for a transform
    @author     James Mc Parlane
    @date       19 February 2005
    @warning    BUG in IE XSLT this.m_xslt_processor.output is read once only
*/
MetaWrap.XML.XSLT.Transform = function(p_xslt_loc)
{
    // We start with no XSLT
    this.m_xslt = null;

    // Load the xslt
    this.Load(p_xslt_loc);

    return this;
}

/*!
    @fn         function MetaWrap_XML_XSLT_Transform_Load(p_xslt_loc)
    @param      p_xslt_loc The location of the XSLT
    @brief      Load a transform object
    @author     James Mc Parlane
    @date       19 February 2005
    @todo       Handle HTTP Request errors
*/
function MetaWrap_XML_XSLT_Transform_Load(p_xslt_loc)
{
    if (document.all)
    {
        // IE 4+

        // Create a new XSLT Document
        this.m_xslt = new ActiveXObject(g_ms_latest_xml_XSLT_object_name)

        // Load it
        this.m_xslt.async = false
        this.m_xslt.load(p_xslt_loc)
        return this.m_xslt;
    }
    else
    if (document.layers)
    {
        // Netscape [4..5]
    }
    else
    if (document.getElementById)
    {
        // Netscape 6 and above

        var l_http = new XMLHttpRequest();
        l_http.open("GET", p_xslt_loc, false);
        l_http.send(null);

        this.m_xslt = l_http.responseXML;
		
		//alert(this.m_xslt.xml);
    }
}

// Set the load method determined by browser type
MetaWrap.XML.XSLT.Transform.prototype.Load = MetaWrap_XML_XSLT_Transform_Load;


/*!
    @fn      	MetaWrap.XML.XSLT.Processor = function(p_transform)
    @param      p_transform The MetaWrap.XML.XSLT.Transform object that we want to process
    @brief      This is the constructor for a processor object based the supplied transform
    @author     James Mc Parlane
    @date       19 February 2005
    @warning    This breaks under Safari because it does not support client side XSLT

*/
MetaWrap.XML.XSLT.Processor = function(p_transform)
{
    // Our stylesheet
    this.m_transform = p_transform;

    if (document.all)
    {
		//alert("iE4");
        // IE 4+

        // This is our processor factory
        this.m_xslt_processor_factory = new ActiveXObject(g_ms_latest_xml_XSLTPROC_object_name);

        // assign the stylesheet we will be using
        this.m_xslt_processor_factory.stylesheet = p_transform.m_xslt;

        // Create an XSLT processor
        this.m_xslt_processor = this.m_xslt_processor_factory.createProcessor();
    }
    else
    if (document.layers)
    {
        // Netscape [4..5]
		//alert("hmm...");
    }
    else if (document.getElementById)
    {
		//alert("netscape");
	
        // Check for Netscape 6 and above

        // Create XSLT processor object
        this.m_xslt_processor = new XSLTProcessor();

        // Load the stylesheet
        this.m_xslt_processor.importStylesheet(p_transform.m_xslt);
    }

    /// The result as an XML/HTML node document
    this.m_result_document = null;

    /// The result as a string
    this.m_result_string = null;

    return this;
}


/*!
    @fn         function MetaWrap_XML_XSLT_Processor_Process(p_xml)
    @param      p_xml The XML we want to process
    @return     A string that is the transformed xml
    @brief      This function takes the transform and runs it against the supplied XML
    @author     James Mc Parlane
    @date       11 June 2005
    @todo       IE: Profile XSLT(XML)->DOM vs XSLT(XML)->TEXT
    @warning    BUG in IE XSLT this.m_xslt_processor.output is read once only

    The aim was to have this create a DOMDocument that can be grafted into
    a document to save an unnecessary parse. But the MSXML does not seem
    to return anything in the document if I do a.....

    this.m_xslt_processor.output = new ActiveXObject(g_ms_latest_xml_DOM_object_name);

    .. which I suspect is caused by a namespace issue. Need to investigate this
    later. For now the solution is to ignore the DOMDocument and just use the text.
    Just like everybody else does.

    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/0699dcba-7721-40cb-9faf-e76c35af8d05.asp

*/
function MetaWrap_XML_XSLT_Processor_Process(p_xml)
{

	//alert("MetaWrap_XML_XSLT_Processor_Process");

    // New process, so abandon the last result.
    this.m_result_string = null;


    if (document.all)
    {
        // IE4+ code

        // Reset the processor
        this.m_xslt_processor.reset();

        //this.m_xslt_processor.output = "";

        // Create a new document to hold our output
        this.m_result_document = new ActiveXObject(g_ms_latest_xml_DOM_object_name);

        // Take the input
        this.m_xslt_processor.input = p_xml;

        // assign our empty document so that it can be populated with the result of the transform ** SEE ISSUE IN FUNCTION NOTES
        //this.m_xslt_processor.output = this.m_result_document;

        // perform the transform
        if (!this.m_xslt_processor.transform())
        {
            error("Transform failed");
        }
        else
        {
            // return the document - as soon as someone tries to getText() we will invoke this.m_xslt_processor.output once.
            return this.m_result_document;
        }
    }
    else
    if (document.layers)
    {
        // Netscape [4..5]
    }
    else
    if (document.getElementById)
    {
        // Netscape 6 and above

		if ((g_bid == "Safari") || (g_bid == "Webkit"))
		{
			// Webkit seems to treat transformToDocument as an XHTML - so we need to use transformToFragment or we get unwanted elements.
			var l_reference = document.implementation.createDocument("", "", null);
			this.m_result_document = this.m_xslt_processor.transformToFragment(p_xml,l_reference);		
		}
		else
		{		
			//alert("transformToDocument!! " + this.m_xslt_processor);
			// Run the transform
			this.m_result_document = this.m_xslt_processor.transformToDocument(p_xml);
		}
		

        // Return the result document
        return this.m_result_document;
    }

    return null;
}

MetaWrap.XML.XSLT.Processor.prototype.Process = MetaWrap_XML_XSLT_Processor_Process;

/*!
    @fn         function MetaWrap_XML_XSLT_Processor_getText()
    @return     A string that is the XML/HTML from a transform
    @brief
    @author     James Mc Parlane
    @date       2 October2005
    @warning    BUG in IE XSLT this.m_xslt_processor.output is read once only
*/
function MetaWrap_XML_XSLT_Processor_getText()
{
    ASSERT(this.m_result_document,"XSLT this.m_result_document is null");
	
	//alert("MetaWrap_XML_XSLT_Processor_getText");

    if (document.all)
    {
        // IE4+ code

        if (this.m_result_string == null)
        {
            // Get the output object of the processor ** SEE ISSUE IN FUNCTION NOTES for MetaWrap_XML_XSLT_Processor_Process()
            //this.m_result_string = this.m_result_document.text;

            // Get the output object of the processor
            this.m_result_string = this.m_xslt_processor.output;
        }
        else
        {
            return this.m_result_string;
        }
    }
    else
    if (document.layers)
    {
        // Netscape [4..5]
    }
    else
    if (document.getElementById)
    {
        // Netscape 6 and above
		
		//alert("ping!");
		
		//alert(this.m_result_string);

        if (this.m_result_string == null)
        {
            /*
						The resultant object is an HTMLDocument if the output method of the stylesheet
						is HTML, an XMLDocument for XML and for output method text an XMLDocument with a
						single root element &lt;transformiix:result&gt; with the text as a child.
						So we need to process the content this way to get the result.
			*/
			
			//alert(" this.m_result_document.firstChild.nodeName = " + this.m_result_document.firstChild.nodeName);

            if (this.m_result_document.firstChild)
            {
			
				//alert("first child");

                if ((this.m_result_document.firstChild.nodeName == "transformiix:result") || (this.m_result_document.firstChild.nodeName == "result"))
                {
                    this.m_result_string = this.m_result_document.firstChild.firstChild.data;
                }
                else
                {
                    // Make a serialiser
                    var l_serializer = new XMLSerializer();

                    // Serialise it
                    this.m_result_string = l_serializer.serializeToString(this.m_result_document);
                }
            }
         }
    }

    // return the document version
    return this.m_result_string;
}

MetaWrap.XML.XSLT.Processor.prototype.getText = MetaWrap_XML_XSLT_Processor_getText;


/*
if (XSLTProcessor == null)
{
	//alert("Load safari XSLT");

	function XSLTProcessor(){
		this.templates = {};
		this.p = {
			"value-of" : function(context, xslNode, childStack, result){
				var xmlNode = XPath.selectNodes(xslNode.getAttribute("select"), context)[0];// + "[0]"

				if(!xmlNode) value = "";
				else if(xmlNode.nodeType == 1) value = xmlNode.firstChild ? xmlNode.firstChild.nodeValue : "";
				else value = typeof xmlNode == "object" ? xmlNode.nodeValue : xmlNode;

				result.appendChild(this.xmlDoc.createTextNode(value));
			},

			"copy-of" : function(context, xslNode, childStack, result){
				var xmlNode = XPath.selectNodes(xslNode.getAttribute("select"), context)[0];// + "[0]"
				if(xmlNode) result.appendChild(IS_SAFARI ? result.ownerDocument.importNode(xmlNode, true) : xmlNode.cloneNode(true));
			},

			"if" : function(context, xslNode, childStack, result){
				if(XPath.selectNodes(xslNode.getAttribute("test"), context)[0]){// + "[0]"
					this.parseChildren(context, xslNode, childStack, result);
				}
			},

			"for-each" : function(context, xslNode, childStack, result){
				var nodes = XPath.selectNodes(xslNode.getAttribute("select"), context);
				for(var i=0;i<nodes.length;i++){
					this.parseChildren(nodes[i], xslNode, childStack, result);
				}
			},

			"choose" : function(context, xslNode, childStack, result){
				var nodes = xslNode.childNodes;
				for(var i=0;i<nodes.length;i++){
					if(!nodes[i].tagName) continue;

					if(nodes[i][TAGNAME] == "otherwise" || nodes[i][TAGNAME] == "when" && XPath.selectNodes(nodes[i].getAttribute("test"), context)[0])
						return this.parseChildren(context, nodes[i], childStack[i][2], result);
				}
			},

			"apply-templates" : function(context, xslNode, childStack, result){
				var t = this.templates[xslNode.getAttribute("select") || xslNode.getAttribute("name")];
				this.parseChildren(context, t[0], t[1], result);
			},

			cache : {},
			"import" : function(context, xslNode, childStack, result){
				var file = xslNode.getAttribute("href");
				if(!this.cache[file]){
					var data = new HTTP().get(file, false, true);
					this.cache[file] = data;
				}

				//compile
				//parseChildren
			},

			"include" : function(context, xslNode, childStack, result){

			},

			"when" : function(){},
			"otherwise" : function(){},

			"copy-clone" : function(context, xslNode, childStack, result){
				result = result.appendChild(xslNode.cloneNode(false));
				if(result.nodeType == 1){
					for(var i=0;i<result.attributes.length;i++){
						var blah = result.attributes[i].nodeValue; //stupid Safari shit
						result.attributes[i].nodeValue = result.attributes[i].nodeValue.replace(/\{([^\}]+)\}/g, function(m, xpath){
							var xmlNode = XPath.selectNodes(xpath, context)[0];

							if(!xmlNode) value = "";
							else if(xmlNode.nodeType == 1) value = xmlNode.firstChild ? xmlNode.firstChild.nodeValue : "";
							else value = typeof xmlNode == "object" ? xmlNode.nodeValue : xmlNode;

							return value;
						});

						result.attributes[i].nodeValue; //stupid Safari shit
					}
				}

				this.parseChildren(context, xslNode, childStack, result);
			}
		}

		this.parseChildren = function(context, xslNode, childStack, result){
			if(!childStack) return;
			for(var i=0;i<childStack.length;i++){
				childStack[i][0].call(this, context, childStack[i][1], childStack[i][2], result);
			}
		}

		this.compile = function(xslNode){
			var nodes = xslNode.childNodes;
			for(var stack=[],i=0;i<nodes.length;i++){
				if(nodes[i][TAGNAME] == "template"){
					this.templates[nodes[i].getAttribute("match") || nodes[i].getAttribute("name")] = [nodes[i], this.compile(nodes[i])];
				}
				else if(this.p[nodes[i][TAGNAME]]){
					stack.push([this.p[nodes[i][TAGNAME]], nodes[i], this.compile(nodes[i])]);
				}
				else{
					stack.push([this.p["copy-clone"], nodes[i], this.compile(nodes[i])]);
				}
			}
			return stack;
		}

		this.importStylesheet = function(xslDoc){
			this.xslDoc = xslDoc.nodeType == 9 ? xslDoc.documentElement : xslDoc;
			xslStack = this.compile(xslDoc);

			var t = this.templates["/"] ? "/" : false;
			if(!t) for(t in this.templates) if(typeof this.templates[t] == "array") break;
			this.xslStack = [[this.p["apply-templates"], {getAttribute : function(){return t}}]]
		}

		//return nodes
		this.transformToFragment = function(doc, newDoc){
			this.xmlDoc = Kernel.getObject("XMLDOM", "<xsltresult></xsltresult>");
			var docfrag = this.xmlDoc.createDocumentFragment();
			var result = this.parseChildren(doc.nodeType == 9 ? doc.documentElement : doc, this.xslDoc, this.xslStack, docfrag);
			return docfrag;
		}

		//return nodes
		this.transformToDocument = function(doc, newDoc){
			alert("transformToDocument0");
			this.xmlDoc = Kernel.getObject("XMLDOM", "<xsltresult></xsltresult>");
			alert("transformToDocument2");
			var docfrag = this.xmlDoc.createDocumentFragment();
			alert("transformToDocument3");
			var result = this.parseChildren(doc.nodeType == 9 ? doc.documentElement : doc, this.xslDoc, this.xslStack, docfrag);
			alert("transformToDocument4");
			return docfrag;
		}

	}
}
*/


/*!
 *@} endgroup mw_javascript_lib_xml_xslt MetaWrap - JavaScript - XML - XSLT
 */

/*!
 *@} end of MetaWrap.XML.XSLT
 */
