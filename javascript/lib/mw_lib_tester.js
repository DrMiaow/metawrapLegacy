/*

    @file mw_lib_tester.js

    $Id: mw_lib_tester.js,v 1.5 2006/07/01 08:07:00 james Exp $
          
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
 * $Log: mw_lib_tester.js,v $
 * Revision 1.5  2006/07/01 08:07:00  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.4  2006/05/17 11:48:44  james
 * Macro recorder fixes
 *
 * Revision 1.3  2006/05/10 12:35:39  james
 * Just need to wire up autosaver and we are done
 *
 * Revision 1.2  2006/05/09 13:44:20  james
 * Can now create a set of tests
 *
 * Revision 1.1  2006/05/09 10:04:57  james
 * 'jsunit' is taken - now called 'tester'
 *
 * Revision 1.19  2006/05/08 22:03:45  james
 * *** empty log message ***
 *
 * Revision 1.18  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.17  2006/05/06 09:33:02  james
 * More refactoring
 *
 * Revision 1.16  2006/05/06 08:28:27  james
 * More refactoring
 *
 * Revision 1.15  2006/04/04 14:51:39  james
 * Solved IE text selection limitations
 *
 * Revision 1.14  2006/03/21 07:11:06  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.13  2005/09/25 13:47:27  james
 * Added automatic javascript namespace/object dependancy
 * resolution so that you can just include top level namespace
 * js libs and they can specify what else is required and load the
 * files in the correct order.
 *
 * Improved MetaWrap.Page.Element.addEventListener so that
 * it deals with existing listeners that have been added by asignment
 * or by inlining.
 *
 * Revision 1.12  2005/07/28 07:28:17  james
 * Standardised cookie names
 * Fixed broken unit tests
 *
 * Revision 1.11  2005/07/23 05:12:22  james
 * Getting macro system to render its own controller
 *
 * Revision 1.9  2005/07/07 03:17:21  james
 * *** empty log message ***
 *
 * Revision 1.8  2005/07/06 14:27:02  james
 * Filling out unit test suite
 *
 * Revision 1.7  2005/07/06 08:32:59  james
 * An XMLing we go...
 *
 * Revision 1.6  2005/07/06 07:52:18  james
 * Tests can now jump from page to page.
 * XML.Serialise can now deal with the javascript 'number' type
 *
 * Revision 1.5  2005/07/06 04:57:08  james
 * Simple XML serialiser that is compatble with the MetaWrap object
 * coding standard.
 *
 * Revision 1.4  2005/07/05 15:49:11  james
 * Tidy
 *
 * Revision 1.3  2005/07/05 15:42:37  james
 * Fixed typo
 *
 * Revision 1.2  2005/07/05 15:41:03  james
 * Adding unit testing framework
 *
 * Revision 1.1  2005/07/05 14:19:57  james
 * Latest javascript additions
 *
 */


/*! \page mw_javascript_lib_tester MetaWrap - JavaScript - Tester
 *
 * \subsection mw_javascript_lib_tester Overview
 *
 * http://academ.hvcc.edu/~kantopet/javascript/index.php?page=adv+js+functions&parent=js+functions&printme=true
 *
 * Need to allow users to add test pages an any place
 * Need to allow users to add test units to any page at any place.
 *
 * Look at the way MetaWrap.Tester.Suite is set up - this is a perfect example.
 */

//alert("$Id: mw_lib_tester.js,v 1.5 2006/07/01 08:07:00 james Exp $");
 
/*! \defgroup mw_javascript_lib_tester  MetaWrap - JavaScript - Tester
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.Serialise","mw_lib_xml_serialise.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Cookie","mw_lib_cookie.js");

 
/*! @name  MetaWrap.Tester Namespace */
//@{

/*!
    @namespave	MetaWrap.Tester
    @brief      Declare the MetaWrap.CSS Namespace
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Tester = new Object();


/*!
    @fn         MetaWrap.Tester.Page = function(p_name)
    @param      p_name The name of the unit test
    @return     void 
    @brief      MetaWrap.Tester.Suite Class
    @author     James Mc Parlane
    @date       6 September 2004
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.Suite = function(p_name)
{      
    return new MetaWrap_JSUnit_Suite(p_name);
}

/*!
    @fn         MetaWrap.Tester.createSuite = function(p_name)
    @param      p_name The name of the test suite to create
    @return     void 
    @brief      MetaWrap.Tester.Suite Class
    @author     James Mc Parlane
    @date       6 September 2004
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.createSuite = function(p_name)
{      
    MetaWrap.Tester.g_current_suite = new MetaWrap.Tester.Suite(p_name);
}

/*!
    @fn         MetaWrap.Tester.startRecording = function()
    @param      p_testname The name of the test
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.startRecording = function(p_testname)
{  
    alert("MetaWrap.Tester.startRecording");    
    
    MetaWrap.Tester.g_current_suite = new MetaWrap.Tester.Suite(p_testname || "Un-named Recorded Test Suite");
    
    MetaWrap.Tester.g_current_suite.m_recording = true;
}


/*!
    @fn         MetaWrap.Tester.save = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.save = function()
{  
    //alert("save");    
    
    var l_serialised = MetaWrap.XML.Serialise(MetaWrap.Tester.g_current_suite,"suite");

    // Save XML as a cookie..
    MetaWrap.Cookie.Set("Class::MetaWrap.Tester.Suite",l_serialised);    
    
    alert("MetaWrap.Tester.save " + "(" + l_serialised.length + " bytes) " + l_serialised);
}

/*!
    @fn         MetaWrap.Tester.load = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.load = function()
{  
    // load the XML
    var l_serialised = MetaWrap.Cookie.Get("Class::MetaWrap.Tester.Suite");
    
    if (l_serialised)
    {            
        this.g_current_suite = new MetaWrap.Tester.Suite("");
        
        MetaWrap.XML.Deserialise(l_serialised,MetaWrap.Tester.g_current_suite); 
        
        return true;
    }
    else
    {
        //alert("no tests");
    }
    
    return false;
}

/*!
    @fn         MetaWrap.Tester.stopRecording = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
    @warning    Because window location
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.addPage = function(p_url)
{
    //alert("MetaWrap.Tester.addPage " + p_url);
    
    return MetaWrap.Tester.g_current_suite.addPage(p_url);
}


/*!
    @fn         MetaWrap.Tester.stopRecording = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
    @warning    
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.addTest = function(p_url)
{
    //alert("MetaWrap.Tester.addPage " + p_url);
    
    if (MetaWrap.Tester.g_current_suite.m_pages.length > 0)
    {    
        return MetaWrap.Tester.g_current_suite.m_pages[MetaWrap.Tester.g_current_suite.m_pages.length-1].addTest(p_url);
    }
}


/*!
    @fn         MetaWrap.Tester.stopRecording = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.stopRecording = function()
{
    alert("MetaWrap.Tester.stopRecording");
    
    MetaWrap.Tester.g_current_suite.m_recording = false;
}

/*!
    @fn         MetaWrap.Tester.recording = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.recording = function()
{
    //alert("MetaWrap.Tester.recording");
    
    if (MetaWrap.Tester.g_current_suite)
    {    
        return MetaWrap.Tester.g_current_suite.m_recording;
    }
    
    return false;
}

/*!
    @fn         MetaWrap.Tester.continueRecording = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
    
    This is just a namespace wrapper
*/    
MetaWrap.Tester.continueRecording = function()
{      
    alert("MetaWrap.Tester.continueRecording");       
}

/*!
    @fn         MetaWrap.Tester.Suite = function(p_name)
    @param      p_name The name of the unit test
    @return     void 
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Tester.Suite = function(p_name)
{
    // The name of the test suite
    this.m_name = p_name;
    
    // We are on the first page
    this.m_page = 0;        

    // We are on the first page
    this.m_running = false;        

    // We are recording a test
    this.m_recording = false;        
    
    // The collection of test pages
    this.m_pages = new Array();
  
    // return this object
    return this;
}

/*!
    @fn         MetaWrap.Tester.Suite.prototype.start = function()
    @param      p_name The name of the unit test
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.prototype.start = function()
{
    // We start at page 0
    this.m_page = 0;

    // And we are running
    this.m_running = true;
    
    // Load the tests    
    MetaWrap.Tester.save();

    // Serialise our state
    //var l_serialised = MetaWrap.XML.Serialise(this,"suite");

    // Save XML as a cookie..
    //MetaWrap.Cookie.Set("Class::MetaWrap.Tester.Suite",l_serialised);
    
    // we go here
    document.location = this.m_pages[0].m_url;
}


/*!
    @fn         function MetaWrap_JSUnit_Suite_continue()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.prototype.onError = function(p_error_message,p_url,p_line)
{
    var l_stacktrace = MetaWrap.Tester.getStackTrace();

    alert("This testcase threw an error \n" + p_error_message + "\n" + p_url + ":" + p_line + "\n\nStacktrace: \n" + l_stacktrace);
    
    return true;
}

/*!
    @fn         MetaWrap.Tester.Suite.prototype.onParse = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.prototype.onParse = function()
{
    // load the XML
    //var l_serialised = MetaWrap.Cookie.Get("Class::MetaWrap.Tester.Suite");
    
    //if (l_serialised)
    //{ 
    
    if (MetaWrap.Tester.load())   
    {
        //alert("MetaWrap.Tester.Suite.onParse" +  l_serialised);
        
        //MetaWrap.XML.Deserialise(l_serialised,this); 

        if (this.m_recording)
        {
            alert("Tests are recording");
        }
        else        
        if (this.m_running)
        {
            trace("Tests are running");

            // add our custom error handler
            MetaWrap.Page.listen("onerror",this.onError);
            //
            
            this.run();
        }
        else
        {
            // no tests
            trace("tests complete");
        }       
    }
    else
    {
        trace("no tests");
    }
}

/*!
    @fn         MetaWrap.Tester.Suite.prototype.run = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.prototype.run = function()
{
    //alert("Running test suite " + this.m_name + " from page #" + this.m_page + 1);
    
    // assume we are on the corect page
    
    // run the tests on this page 
    this.m_pages[this.m_page].run();
}

/*!
    @fn         MetaWrap.Tester.Suite.prototype.addPage = function(p_url)
    @param      p_name The name of the test
    @param      p_url The URL of the test page
    @return     void 
    @brief      Add a destination page to the suite
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.prototype.addPage = function(p_url)
{
    return this.m_pages[this.m_pages.length] = new MetaWrap.Tester.Suite.Page(p_url)
}

// Wire Up the methods
MetaWrap.Tester.Suite.prototype.m_pages_create = MetaWrap.Tester.Suite.prototype.addPage;


/*!
    @fn         function MetaWrap_JSUnit_Suite_Page(p_url)
    @param      p_name The name of the test
    @return     void 
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.Page = function(p_url)
{    
    // The URL of the test        
    this.m_url = p_url || "";
    
    //alert("MetaWrap.Tester.Suite.Page " + this.m_url);    
    
    // The test number that is being run
    this.m_test = 0;        

    // The collection of tests        
    this.m_tests = new Array();
}


/*!
    @fn         MetaWrap.Tester.Suite.Page.prototype.addTest = function(p_name)
    @param      p_name The name of the test
    @param      p_url The URL of the test page
    @return     void 
    @brief      Register the ruleset
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.Page.prototype.addTest = function(p_url)
{
    //alert("MetaWrap_JSUnit_Suite_Page_addTest p_name = '" + p_name  + "' to '" + this.m_name + "'");        
    return this.m_tests[this.m_tests.length] = new MetaWrap.Tester.Suite.Page.Test(p_url)
}

// Methods
MetaWrap.Tester.Suite.Page.prototype.m_tests_create = MetaWrap.Tester.Suite.Page.prototype.addTest;


/*!
    @fn         MetaWrap.Tester.Suite.Page.prototype.run = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.Page.prototype.run = function()
{
    //alert("Running page " + this.m_name + " @ " + this.m_url);
    
    // This is the current page
    MetaWrap.Tester.g_current_page = this
    
    // run each test    
    for(;this.m_test<this.m_tests.length;this.m_test++)
    {
        this.m_tests[this.m_test].run();
    }
    
    // We have finished this page
    MetaWrap.Tester.g_current_page = null;    
}


MetaWrap.Tester.Suite.Page.Test = function(p_url)
{
    // The name of the Test
    this.m_name = p_url||"";
    return this;
}


/*!
    @fn         MetaWrap.Tester.Suite.Page.Test.prototype.run = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.Suite.Page.Test.prototype.run = function()
{
    // This is the current test
    MetaWrap.Tester.g_current_test = this;

    //alert("Running test " + this.m_name);
    
    // We have finished the page
    MetaWrap.Tester.g_current_test = null;    
}

/*!
    @fn         MetaWrap.Tester.getFunctionName = function(p_function) 
    @param      p_function The function to return the name of
    @return     String The name of the function
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.getFunctionName = function(p_function) 
{
    var l_name = null;
    var l_e = null;
    
    try
    {  
        l_name = p_function.toString().match(/function (\w*)/)[1];
    }
    catch(l_e)
    {
        // do nothing
    }
    
    if ((l_name == null) || (l_name.length == 0))
    {
        l_name = 'anonymous';
    }
    
    return l_name;
}
/*!
    @fn         MetaWrap.Tester.getStackTrace = function() 
    @param      
    @return     
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.getStackTrace = function() 
{
    var result = '';

    if (typeof(arguments.caller) != 'undefined') 
    { 
        // IE, not ECMA
        for (var a = arguments.caller; a != null; a = a.caller) 
        {
            result += '> ' + MetaWrap.Tester.getFunctionName(a.callee) + '\n';
            if (a.caller == a) 
            {
                result += '*';
                break;
            }
        }
    }
    else 
    { 
        // Mozilla, not ECMA
        // fake an exception so we can get Mozilla's error stack
        var l_exception;        
        try
        {
            foo.bar;
        }
        catch(l_exception)
        {
            var l_stack = MetaWrap.Tester.parseErrorStack(l_exception);
            for (var i = 1; i < l_stack.length; i++)
            {
                result += '> ' + l_stack[i] + '\n';
            }
        }
    }

    return result;
}

/*!
    @fn         MetaWrap.Tester.parseErrorStack = function(p_exception)
    @param      p_exception The exception we want to describe
    @brief      Take the provided execption and return a description in a formnatted string
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.Tester.parseErrorStack = function(p_exception)
{
    var l_stack = [];
    var l_name;
    
    // No stack? Just show the message
    if (p_exception && !p_exception.stack)
    {
        l_stack[0] = p_exception.message;
        
        return l_stack;
    }

    // Process the stack    
    var l_stack_frames = p_exception.stack.split('\n');
    
    // For each stack frame
    for (var i = 0; i < l_stack_frames.length - 1; i++)
    {
        var l_frame_data = l_stack_frames[i];
        
        //alert(l_framedata);
        
        l_name = l_frame_data.match(/^(\w*)/)[1];
        
        if (!l_name) 
        {
            l_name = 'anonymous';
        }
        
        l_stack[l_stack.length] = l_name;
    }
    
    // remove top level anonymous functions to match IE    
    while (l_stack.length && l_stack[l_stack.length - 1] == 'anonymous')
    {
        l_stack.length--;
    }
    
    return l_stack;
}

// Create the default test suite
MetaWrap.Tester.g_current_suite = null;
// We start on no page
MetaWrap.Tester.g_current_page = null;
// We start on no test
MetaWrap.Tester.g_current_test = null;

// Parse in the current test suite
//MetaWrap.Tester.g_current_suite.onParse();

/*! 
 *@} endgroup mw_javascript_lib_tester MetaWrap - JavaScript - Tester
 */ 

/*! 
 *@} end of MetaWrap.Tester
 */ 




