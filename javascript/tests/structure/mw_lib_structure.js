/*

    @file mw_lib_structure.js

    $Id: mw_lib_structure.js,v 1.13 2007/07/25 10:24:15 james Exp $

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
 * $Log: mw_lib_structure.js,v $
 * Revision 1.13  2007/07/25 10:24:15  james
 * Added XML fragments to views
 *
 * Revision 1.12  2007/07/22 15:15:57  james
 * Latest tweaks to the javascript libs to suppoty view system
 *
 * Revision 1.11  2006/11/08 03:05:43  james
 * Tidy up of action XML code
 * Added ability for 'structure' to take in static xml
 *
 * Revision 1.10  2006/10/30 07:41:31  james
 * Getting XSLT and structure engine back up and running
 *
 * Revision 1.9  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.8  2006/05/06 09:33:04  james
 * More refactoring
 *
 * Revision 1.7  2006/05/06 08:28:30  james
 * More refactoring
 *
 * Revision 1.6  2006/02/13 11:09:30  james
 * Fixes for state
 *
 * Revision 1.5  2005/12/23 10:23:43  james
 * Latest round of work on the rendering pipeline
 *
 * Revision 1.4  2005/12/13 01:28:31  james
 * Updates to JavaScript Library
 *
 * Revision 1.3  2005/11/09 07:27:12  james
 * *** empty log message ***
 *
 * Revision 1.2  2005/11/09 06:25:11  james
 * Getting focused testcases for the structural part of the rendering pipeline
 *
 * Revision 1.1  2005/11/09 06:00:34  james
 * Moved some files about to get more logical naming
 * and division of functionality
 *
 * Revision 1.8  2005/11/09 04:11:25  james
 * Page structure part of pipeline is now running in a pipeline object
 *
 * Revision 1.7  2005/10/03 14:28:42  james
 * Tidied up XSLT code.
 *
 * Revision 1.6  2005/10/03 14:23:00  james
 * Tidied up XSLT code.
 *
 * Revision 1.5  2005/10/03 07:05:16  james
 * Modified behavior testcases to work with addListener
 * Fixed issue in XSLT - unwanted transformix:result element
 * when performing a text only transform. Needed to change API
 * to deal with this. Now have two result accessor functions for
 * getting output.
 *
 * MetaWrap.XML.XSLT.Processor.getText
 * MetaWrap.XML.XSLT.Processor.getXML
 *
 * Revision 1.4  2005/09/21 02:29:54  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.3  2005/07/28 07:28:17  james
 * Standardised cookie names
 * Fixed broken unit tests
 *
 * Revision 1.2  2005/06/20 23:17:21  james
 * Code tidy up
 *
 * Revision 1.1  2005/06/20 08:58:37  james
 * Code tidy up
 *
 * Revision 1.6  2005/06/17 11:21:04  james
 * Streamlining the XSLT document process
 *
 * Revision 1.5  2005/06/17 11:15:01  james
 * Streamlining the XSLT document process
 *
 * Revision 1.4  2005/06/17 09:22:13  james
 * Still objectising javascript XSLT lib.
 *
 * Revision 1.3  2005/06/12 14:27:56  james
 * Objectising javascript XSLT lib.
 *
 * Revision 1.2  2005/06/12 09:08:47  james
 * Fixing some inconsitencies
 *
 * Revision 1.1  2005/06/12 08:02:29  james
 * getting everything into objects
 *
 * Revision 1.17  2005/06/10 13:56:37  james
 * More work on javascript load sequence - refined so that it can load xml based on filename or predefined name.
 *
 * Revision 1.16  2005/06/10 13:02:43  james
 * Tidied up code.
 * Added ability to define xslt and css that gets combined with XML via cookies.
 *
 * Revision 1.15  2005/06/10 11:50:41  james
 * Wired up post parse CSS application.
 * Code tidy up
 *
 * Revision 1.14  2005/06/09 14:53:55  james
 * Tidied up..  Now I just have the Firefix bugs to deal with
 *
 * Joy.
 *
 * Revision 1.13  2005/06/09 14:49:44  james
 * Found another bug in Firefox... thats two in one night..
 *
 * Revision 1.12  2005/06/09 14:38:12  james
 * Seems that Netscape can't parse a file called .xslt
 *
 * Revision 1.11  2005/06/09 14:29:39  james
 * Streamlined XML process
 *
 * Revision 1.10  2005/06/09 13:50:04  james
 * Got css loading consistent.. now to get unloading consistent.
 *
 * Revision 1.9  2005/06/08 14:13:28  metawrap
 * Changes from new linux box
 *
 * Revision 1.8  2005/05/30 06:48:35  james
 * segregated auto xsl/xst or javascript driven client side
 *
 * Revision 1.7  2005/05/26 03:14:34  james
 * Some simple experiments in rendering.
 *
 * Revision 1.6  2005/05/24 08:45:33  james
 * Working on simple CML xslt/css pipeline
 *
 */


/*! \page mw_javascript_lib_structure MetaWrap - JavaScript - Structure
 *
 * http://javascriptkit.com/dhtmltutors/cssreference.shtml
 * http://home.tampabay.rr.com/bmerkey/cheatsheet.htm
 * http://www.w3.org/TR/1998/REC-CSS2-19980512/sample.html
 *
 */

//debug("$Id: mw_lib_structure.js,v 1.13 2007/07/25 10:24:15 james Exp $");

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Pipeline","mw_lib_pipeline.js");
MwUse("MetaWrap.Network","mw_lib_network.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.XSLT","mw_lib_xml_xslt.js");

/*! \defgroup mw_javascript_lib_structure  MetaWrap - JavaScript - Structure
 *@{
 */

MetaWrap.Structure = {};
MetaWrap.Structure.m_file_name = "unknown";
MetaWrap.Structure.m_file_extension = "unknown";
MetaWrap.Structure.m_xml_location = "";
MetaWrap.Structure.m_xsl_location = "metawrap_application.xsl";

MetaWrap.Structure.m_doctype = "";
MetaWrap.Structure.m_xml = null;
MetaWrap.Structure.m_xslt = null;
MetaWrap.Structure.m_xslt_processor = null;
MetaWrap.Structure.m_result = "";


MetaWrap.Structure.doAction = function(p_form,p_action)
{
    alert("MetaWrap.Structure.doAction: " + p_action);
}

/*!
    @brief      The WireWrap rendering pipeline
*/
MetaWrap.Structure.m_pipeline = new MetaWrap.Pipeline('structure')




/*! @name  MetaWrap.XSLTCSSPage Namespace */
//@{


MetaWrap.Structure.prepare = function()
{
    trace("MetaWrap.Structure.prepare");

    var l_p = MetaWrap.Structure;

   ////////////////////////////////////////
    //
    // Get the name of the XML document we want to process
    //

    // By some process - yet to be defined - we set the xml location
    // Can we have multiple lots of XML?
    // Can we base the XML the name of the file?

    //
    // Lets work out the name of this file and its extension
    //

    var l_path_char = '\\';

    //
    // Because of this rule - we know that we can never have / or \ in a filename or its parameters - it must be escaped or encoded
    //
    if (location.pathname.indexOf(l_path_char) == -1)
    {
        // Use the other path character
        l_path_char = '/';
    }

    // Get the filename with file extension (later on we strip out the extension)
    l_p.m_file_name = location.pathname.substring(location.pathname.lastIndexOf(l_path_char)+1);

    // Get the file extension
    l_p.m_file_extension = location.pathname.substring(location.pathname.lastIndexOf('.')+1);

    // Get the realfile name - sans extension
    l_p.m_file_name = l_p.m_file_name.substring(0,l_p.m_file_name.length - l_p.m_file_extension.length - 1);

    // Calculate it based on the name of the document
    l_p.m_xml_location = l_p.m_file_name + ".xml";

    // get the doctype
    l_p.m_doctype = "xhtml";

    try
    {
        // Look for global declaration of xsl hint
        if (MetaWrap_Structure_m_xml_location != null)
        {
              l_p.m_xml_location = MetaWrap_Structure_m_xml_location;
        }
    }
    catch(l_e)
    {
    }

    trace("" + l_p.m_xml_location);

    try
    {
        // Look for global declaration of xsl hint
        if (MetaWrap_Structure_m_xsl_location != null)
        {
              l_p.m_xsl_location = MetaWrap_Structure_m_xsl_location;
        }
    }
    catch(l_e)
    {
    }

    trace("" + l_p.m_xsl_location);

    try
    {
        // Look for global declaration of raw XML
        if (MetaWrap_Structure_m_xml_raw != null)
        {
              l_p.m_xml_raw = MetaWrap_Structure_m_xml_raw;
              trace("using raw XML");
        }
    }
    catch(l_e)
    {
        l_p.m_xml_raw = null;
    }




    //
    //
    ////////////////////////////////////////
}


MetaWrap.Structure.header = function()
{
    trace("MetaWrap.Structure.header");

    var l_p = MetaWrap.Structure;

    ////////////////////////////////////////
    //
    //  Write out the Document header as the page loads
    //

    switch (l_p.m_doctype)
    {
        case "xhtml":
            document.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">");
        break;

    }

    //
    //
    ////////////////////////////////////////
}

MetaWrap.Structure.xml = function()
{
    trace("MetaWrap.Structure.xml");

    ////////////////////////////////////////
    //
    //  Load XML, Load XSLT - combine it and write it out into the browser..
    //

    var l_p = MetaWrap.Structure;

    // Create a XML DOM Object
    l_p.m_xml = new MetaWrap.XML.Document();

    // Load the XML from a string
    if (l_p.m_xml_raw != null)
    {
        if (!l_p.m_xml.loadXML(l_p.m_xml_raw))
        {
            error("Failed to loadXML");
        }
    }
    else
    {
        // Create a HTTP Request object
        var l_xml_request = new MetaWrap.Network.Client.HTTP();

        // Request the XML
        if (!MetaWrap.XML.Document.Load(l_p.m_xml,l_xml_request,l_p.m_xml_location))
        {
            error("MetaWrap.Structure.xml failed to load '" +  l_p.m_xml_location + "'");
        }
    }

    //
    //
    ////////////////////////////////////////
}




MetaWrap.Structure.xslt = function()
{

    trace("MetaWrap.Structure.xslt");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.Structure;

    trace("load " + l_p.m_xsl_location);

    // Create a new transform
    l_p.m_xslt = new MetaWrap.XML.XSLT.Transform(l_p.m_xsl_location);


    // Create a new processor for this stylesheet
    l_p.m_xslt_processor = new MetaWrap.XML.XSLT.Processor(l_p.m_xslt);


    //
    //
    ////////////////////////////////////////

}

MetaWrap.Structure.transform = function()
{

    trace("MetaWrap.Structure.transform");

    ////////////////////////////////////////
    //
    //  Load XSLT - and generate a transform
    //

    var l_p = MetaWrap.Structure;

    // Process this xml using this processor
    l_p.m_xslt_processor.Process(l_p.m_xml);

    // Get the text result of the transform
    l_p.m_result = l_p.m_xslt_processor.getText();

    //
    //
    ////////////////////////////////////////

}

MetaWrap.Structure.write = function()
{
    trace("MetaWrap.Structure.write");

    ////////////////////////////////////////
    //
    //  Load XML, Load XSLT - combine it and write it out into the browser..
    //

    var l_p = MetaWrap.Structure;

    // Make sure the current document is closed
    document.close();

    // As we create a new one..
    document.write(l_p.m_result);

    //
    //
    ////////////////////////////////////////
}

// Create the pipeline nodes
var l_p = MetaWrap.Structure.m_pipeline;
l_p.add('prepare',MetaWrap.Structure.prepare);
l_p.add('header',MetaWrap.Structure.header);
l_p.add('xml',MetaWrap.Structure.xml);
l_p.add('xslt',MetaWrap.Structure.xslt);
l_p.add('transform',MetaWrap.Structure.transform);
l_p.add('write',MetaWrap.Structure.write);

// Run the pipeline
MetaWrap.Structure.m_pipeline.run();

/*!
 *@} endgroup mw_javascript_lib_structure MetaWrap - JavaScript - Structure
 */

/*!
 *@} end of MetaWrap.Structure
 */

