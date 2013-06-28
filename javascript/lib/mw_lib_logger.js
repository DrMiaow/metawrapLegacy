/*

    @file mw_lib_logger.js

    $Id: mw_lib_logger.js,v 1.6 2008/07/20 07:55:58 james Exp $

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
 * $Log: mw_lib_logger.js,v $
 * Revision 1.6  2008/07/20 07:55:58  james
 * Made default behavior of logger more friendly
 *
 * Revision 1.5  2008/07/19 16:14:53  james
 * Adding XSLT support to Safari
 *
 * Revision 1.4  2007/08/13 09:53:40  james
 * New behaviors
 *
 * Revision 1.3  2007/05/02 12:46:57  james
 * Updated logger so that filtering mainains state for selected level.
 *
 * Revision 1.2  2007/05/01 12:08:49  james
 * Updated state engine so that we can require by state name
 *
 * Revision 1.1  2007/01/18 08:24:53  james
 * Radical change to package mechanism
 *
 * Revision 1.31  2006/07/26 08:26:15  james
 * Updates fixed and tweaks
 *
 * Revision 1.30  2006/07/01 08:06:58  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.29  2006/05/31 13:35:55  james
 * Getting Logger integrated
 *
 * Revision 1.28  2006/05/09 13:44:20  james
 * Can now create a set of tests
 *
 * Revision 1.27  2006/05/09 10:04:56  james
 * 'jsunit' is taken - now called 'tester'
 *
 * Revision 1.26  2006/05/06 09:33:02  james
 * More refactoring
 *
 * Revision 1.25  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.24  2006/05/03 13:11:32  james
 * Working on getting tester testing framework up and running again.
 *
 * Revision 1.23  2005/10/03 13:27:54  james
 * Modified behavior testcases to work with addListener
 * Fixed issue in XSLT - unwanted transformix:result element
 * when performing a text only transform. Needed to change API
 * to deal with this. Now have two result accessor functions for
 * getting output.
 *
 * MetaWrap.XML.XSLT.Processor.getText
 * MetaWrap.XML.XSLT.Processor.getXML
 *
 * Revision 1.22  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.21  2005/09/18 10:21:40  james
 * Some more testcases just to make sure that all is as
 * it should be in event simulation land.
 *
 * Revision 1.20  2005/09/17 17:01:16  james
 * Added testcase for addEvent on self
 *
 * Revision 1.19  2005/09/16 15:36:45  james
 * Added ability to hide and show log messages
 *
 * Revision 1.12  2005/09/16 14:11:14  james
 * added timestamp 'ms'
 *
 * Revision 1.11  2005/09/16 14:09:59  james
 * better filtering message
 *
 * Revision 1.10  2005/09/16 13:43:51  james
 * test without buttons
 *
 * Revision 1.9  2005/09/16 13:35:14  james
 * Updared logging class
 *
 * Revision 1.8  2005/09/15 15:24:06  james
 * *** empty log message ***
 *
 * Revision 1.7  2005/09/15 13:20:32  james
 * Logging, revision 1
 *
 * Revision 1.6  2005/09/15 12:38:08  james
 * Inspired by the Amiga Guru Meditation popup.
 * The MetaWrap Javascript Logging framework
 *
 */

/*! \page mw_javascript_lib_logger MetaWrap - JavaScript - Logger
 *
 * \subsection mw_javascript_lib_logger Overview
 *
 * http://www.w3.org/TR/REC-CSS2/box.html
 *
 * How do I debug JavaScript in Safari?
 *
 * Safari's "Debug" menu allows you to turn on the logging of JavaScript errors.
 * To display the debug menu, open a Terminal window and type:
 *
 * defaults write com.apple.Safari IncludeDebugMenu 1
 *
 * Now relaunch Safari and check the "Log Javascript Exceptions" menu item in
 * the Debug menu. In Safari 1.3 and above, select the "Show JavaScript
 * Console" menu item and the JavaScript Console window will open to display
 * JavaScript exceptions. For Safari versions before 1.3, JavaScript exceptions
 * will appear in the Console application (/Applications/Utilities/Console).
 *
 * Safari 1.3 and above supports explicit logging of arbitrary information
 * - similar to Objective-C NSLog() - function by using window.console.log()
 * in your JavaScript. All messages are routed to the JavaScript Console
 * window and show up nicely in a dark green, to easily differentiate
 * themselves from JavaScript exceptions.
 *
 *  if(window.console) {
 *      window.console.log("I think therefore I code!");
 *  }
 *  else {
 *      alert("I think therefore I code!");
 *  }
 * Using Safari 1.3 or above? Open the JavaScript Console and click to see it in action!
 *
 */

//alert("$Id: mw_lib_logger.js,v 1.6 2008/07/20 07:55:58 james Exp $");

/*! \defgroup mw_javascript_lib_logger  MetaWrap - JavaScript - Logger
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");

/*! @name  MetaWrap.Logger */
//@{


/*!
    @namespace  MetaWrap.Logger
    @class      MetaWrap.Logger
    @brief      MetaWrap.Logger Class
    @author     James Mc Parlane
    @date       11 September 2005
*/
MetaWrap.Logging =
{

	// If this is true - the debugger shows as soon as something is logged
	g_auto_show:true,

	// The level of message at which point we want to trigger a message
	g_auto_show_trigger_level:5,

    /// If this is true, then logging is enabled
    g_on:true,

    /// If this is true, then we have logged something
    g_used:false,

    // The current visibility level (what we are filtering on)
	g_visible_level: 0,

    /// if this is true then show the filter buttons
    g_buttons:false,

    /// The types of logging that we support
    g_classes:["all","fatal","error","warn","debug","trace"],

    /// The types of logging that we support
    g_ids:[],

    /// The ID of the logging element
    g_id:'mw_log_content',

    /// The content element that we add after g_id
    g_element:'p',

    /// The
    //g_item:0,

    /// The Guru meditation sub-message
    g_guru_message:"#00000004.000018D0",


    /// The content element that we add after g_id
    g_start_time:(new Date()).getTime(),


    /*!
        @fn         Create:function()
        @return     void
        @brief      Creates the contents of the logger
        @author     James Mc Parlane
        @date       11 September 2005
    */
    CreateWidgetHTML:function()
    {
	
        var l_contents = "";

        l_contents += "<div id=\"mw_log_border\" >";
        l_contents += "<div id=\"mw_log\">";
        l_contents += "<table id=\"mw_log_table\">";
        l_contents += "<tr width=\"100%\">";
        l_contents += "<td id=\"mw_log_logo\" colspan=\"6\" >";
		
		l_contents += "<span id=\"mw_log_main_message\"  onclick=\"MetaWrap.Logging.Minimise()\">Logging.";
		
        l_contents += "   ";
        if (this.g_buttons)
        {
            l_contents += "Use buttons to filter logging messages.<u id='mw_log_main_expander'>[collapse]</u> </span>";
        }
        else
        {
            l_contents += "Click on messages to filter by type. <u id='mw_log_main_expander'>[collapse]</u> </span><u onclick='MetaWrap.Logging.Clear(); return true;'>[clear]</u> <u onclick='MetaWrap.Logging.Wait(3);return true;'>[wait]</u> <u onclick='MetaWrap.Logging.g_auto_show = false;MetaWrap.Logging.g_on = false;MetaWrap.Logging.Hide();return true;'>[x]</u>";
        }

        l_contents += "<br>Guru Meditation ";

        var l_date = new Date();

        g_guru_message =  "#" + this.Pad("0",l_date.getFullYear(),4) + this.Pad("0",l_date.getMonth()+1,2) + this.Pad("0",l_date.getDate(),2);
        g_guru_message += ".";
        g_guru_message += this.Pad("0",l_date.getHours(),2) + this.Pad("0",l_date.getMinutes(),2) + this.Pad("0",l_date.getSeconds(),2) + this.Pad("0",l_date.getMilliseconds(),4);
		
		g_guru_message += " " + g_bid + "(" + g_beng + ") ";

        l_contents += g_guru_message;

        l_contents += "</td>";
        l_contents += "</tr>";
        if (this.g_buttons)
        {
            l_contents += "<tr>";

            for(var l_class in this.g_classes)
            {
                var l_c = this.g_classes[l_class];
                l_contents += "<td class=\"" + l_c + "\"><a href=\"#mw_log\" onclick=\"MetaWrap.Logging.show." + l_c + "();\" title=\"show " + l_c + "\" id=\"mw_show_" + l_c + "\">" + l_c + "</a></td>";
            }

            l_contents += "</tr>";
        }
        l_contents += "</table>";
        l_contents += "<div id=\"mw_log_content\">";
        l_contents += "</div>";
        l_contents += "</div>";
        l_contents += "</div>";

        return l_contents;
    },

    /*!
		@fn         Wait:function()
		@return     void
		@brief      Waits for a message of level p_level
		@author     James Mc Parlane
		@date       11 September 2005
	*/	
	Wait:function(p_level)
	{
		this.g_auto_show = true; 
		MetaWrap.Logging.g_auto_show_trigger_level = p_level; 
		MetaWrap.Logging.Clear();
		MetaWrap.Logging.Hide();	
	},
	

    /*!
        @fn         Create:function()
        @return     void
        @brief      Creates the contents of the logger
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Create:function()
    {
		if (this.g_on)
		{
			document.write(this.CreateWidgetHTML());
		}
    },


    /*!
        @fn         Reset:function()
        @return     void
        @brief      Minimise the logging widget
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Reset:function()
    {
        // find the content container
        var l_log_content = MetaWrap.$("mw_log_content");

        // empty it
        l_log_content.innerHTML = "";

        //var l_log_border = MetaWrap.$("mw_log_border");

        // Hide it
        //l_log_border.style.display = "hide";

        // Back to starting state
        this.g_used = false;

        this.g_start_time = (new Date()).getTime();
    },
	
		
	/*!
        @fn         Clear:function()
        @return     void
        @brief      Clear the logging widget
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Clear:function()
    {
        // find the content container
        var l_log_content = MetaWrap.$("mw_log_content");

        // empty it
        l_log_content.innerHTML = "";
    },	
	
	/*!
        @fn         Show:function()
        @return     void
        @brief      Show the logging widget
        @author     James Mc Parlane
        @date       11 August 2009
    */
    Show:function()
    {
        var l_log_border = MetaWrap.$("mw_log_border");

        // Show it
        l_log_border.style.display = "block";       
    },
	
	
	/*!
        @fn         IsVisible:function()
        @return     void
        @brief      return true if this is debugger is visible
        @author     James Mc Parlane
        @date       11 August 2009
    */
    IsVisible:function()
    {
        var l_log_border = MetaWrap.$("mw_log_border");

        // Show it
        return (l_log_border.style.display == "block");       
    },
	
	/*!
        @fn         Hide:function()
        @return     void
        @brief      Hide the logging widget
        @author     James Mc Parlane
        @date       11 August 2009
    */
    Hide:function()
    {
        var l_log_border = MetaWrap.$("mw_log_border");

        // Show it
        l_log_border.style.display = "none";       
    },
	
	
    /*!
        @fn         Minimise:function()
        @return     void
        @brief      Minimise the logging widget
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Minimise:function()
    {				

        // find the content container
        var l_log_content = MetaWrap.$("mw_log_content");

        // hide it
        l_log_content.style.display = "none";

        // next time - we maximise
        var l_log_border = MetaWrap.$("mw_log_main_message");
        l_log_border.onclick = MetaWrap.Logging.Maximise;

        
        var l_mw_log_main_expander = MetaWrap.$("mw_log_main_expander");
        l_mw_log_main_expander.innerHTML = "[expand]";


    },

    /*!
        @fn         Maximise:function()
        @return     void
        @brief      maximise the logging widget
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Maximise:function()
    {
        // find the content container
        var l_log_content = MetaWrap.$("mw_log_content");

        // and hide it
        l_log_content.style.display = "block";

        // next time - we minimise
        var l_log_border = MetaWrap.$("mw_log_main_message");
        l_log_border.onclick = MetaWrap.Logging.Minimise;
		
        var l_mw_log_main_expander = MetaWrap.$("mw_log_main_expander");
        l_mw_log_main_expander.innerHTML = "[collapse]";

    },

    /*!
        @fn         pad:function()
        @param      p_char The character to pad
        @param      p_string The string to pad
        @param      p_length  The length that the string should be
        @return     void
        @brief      Create the initial invisible wrapper
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Pad:function(p_char,p_string,p_length)
    {
        p_string = new String(p_string);

        while(p_string.length < p_length)
        {
            p_string = p_char + p_string;
        }

        return p_string;
    },


    /*!
        @fn         Constructor:function(p_level)
        @param      p_level
        @return     void
        @brief      Constructor for MetaWrap.Logging
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Constructor:function(p_buttons)
    {

        // No buttons?
        if (p_buttons == null)
        {
            // Assume none
            this.g_buttons = false;
        }
        else
        {
            // Remember how we want buttons
            this.g_buttons = p_buttons;
        }

        var l_index = 0;
        for(var l_class in this.g_classes)
        {
            var l_c = this.g_classes[l_class];

            eval("var l_function = function(){MetaWrap.Logging.mwShowMessages(MetaWrap.Logging.g_" + l_c + ");}");

            this.show[l_c] = l_function;

            eval("var l_function = function(p_message,p_url,p_line){MetaWrap.Logging.Log(p_message,MetaWrap.Logging.g_" + l_c + ",p_url,p_line);}");
            this[l_c] = l_function;

            //alert("g_" + l_c);
            this[("g_" + l_c)] = l_index;


            this.g_ids[l_c] = l_index;

            l_index++;
        }

        this.Create();

        if (this.g_on)
        {
            //document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://js.metawrap.com/css/mw_lib_logger.css\" />");
			
			document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + MetaWrap.g_site_root + MetaWrap.g_js_root + "css/mw_lib_logger.css\" />");

            window.onerror = this.fatal;
        }
    },


    /*!
        @fn         Constructor:function(p_level)
        @param      p_level
        @return     void
        @brief      Constructor for MetaWrap.Logging
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Reconstruct:function(p_buttons)
    {

			// Make the link
			var l_div_node = document.createElement('div');

			l_div_node.innerHTML = this.CreateWidgetHTML() + "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://js.metawrap.com/css/mw_lib_logger.css\" />";

			if (document.body.firstChild != null)
			{
				document.body.insertBefore(l_div_node,document.body.firstChild);
			}
			else
			{
				document.body.appendChild(l_div_node);
			}

			// find the content container
			var l_log_content = MetaWrap.$("mw_log_content");

			// and show it
			l_log_content.style.display = "block";

			var l_log_border = MetaWrap.$("mw_log_border");

			//alert("block");
			// Show it
			l_log_border.style.display = "block";
			//alert("block done");

			//MetaWrap.Logging.mwShowMessages(0,true);

			this.Reset();
    },

    /*!
        @fn         getLogger:function(p_id)
        @return     Returns a reference to the element that we want to write the logger data into
        @brief      MetaWrap.Tester.Suite Class
        @author     James Mc Parlane
        @date       11 September 2005
    */
    getLogger:function()
    {
        return MetaWrap.$(this.g_id);
    },

    /// Placeholder for error class 'show' methods - determined by content of this.g_classes
    show:{
    },

    /*!
        @fn         mwShowType:function(p_event)
        @param      p_event
        @return     void
        @brief      Show the messages for a given type
        @author     James Mc Parlane
        @date       11 September 2005
    */
    mwShowType:function(p_event)
    {
        MetaWrap.Logging.mwShowMessages(MetaWrap.Logging.g_ids[MetaWrap.Logging.getNodeClass(this)],true);
    },

    /*!
        @fn         mwShowAll:function(p_event)
        @param      p_event
        @return     void
        @brief      Show all the messages, no matter what the type
        @author     James Mc Parlane
        @date       11 September 2005
    */
    mwShowAll:function(p_event)
    {
        MetaWrap.Logging.mwShowMessages(0,false);
    },



    /*!
        @fn         mwShowMessages:function(p_level,p_hide_others)
        @param      p_level The level of message to show
        @param      p_hide_others if true then we hide all the other messages
        @return     void
        @brief      Shoe messages
        @author     James Mc Parlane
        @date       11 September 2005
    */
    mwShowMessages:function(p_level, p_hide_others)
    {
        var l_showall = false;

        // set the visibility level
        this.g_visible_level =  p_level;
				

        // if no p_level has been specified, use the default
        if (arguments.length == 0)
        {
            p_level = this.g_all;
            l_showall = true;
        }
        else
        if (p_level == 0)
        {
            p_level = this.g_all;
            l_showall = true;
        }

        // If we only specified p_level, then we want to hide all the others
        if (p_hide_others == null)
        {
            p_hide_others = true;
        }

        // retrieve the element and current statements
        var l_mw_log = MetaWrap.$(this.g_id);

        // no log - then we fail
        if (!l_mw_log)
        {
            return false;
        }

        // Fund all the logging elements
        var l_ps = l_mw_log.getElementsByTagName(this.g_element);

        // None? then nothing to do.
        if (l_ps.length == 0)
        {
            return true;
        }

        // get the class name for the specified p_level
        var l_lookup = this.g_classes[p_level];

        // loop through all logging statements/<p> elements...
        for (var i = l_ps.length - 1; i >= 0; i--)
        {
            // hideNode all elements by default, if specified
            if (p_hide_others)
            {
                l_ps[i].style.display = "none";
            }

            // get the class name for this <p>
            var l_c = this.getNodeClass(l_ps[i]);

            if (l_c && l_c.indexOf(l_lookup) > -1 || l_showall)
            {
                l_ps[i].style.display = "";

                if (l_showall)
                {
                    l_ps[i].onclick = this.mwShowType;
                }
                else
                {
                    l_ps[i].onclick = this.mwShowAll;
                }
            }
        }
    },


    /*!
        @fn         Log:function(p_message,p_level,p_url,p_line)
        @param      p_message The message
        @param      p_level The error level
        @param      p_url URL in which we got error
        @param      p_line Line number of error
        @return     void
        @brief      appends a statement to the logging element if the threshold p_level is exceeded
        @author     James Mc Parlane
        @date       11 September 2005
    */
    Log:function(p_message,p_level,p_url,p_line)
    {
		

        //alert("level = " + p_level)

        // check to make sure logging is turned on
        if (!this.g_on)
        {
            // if not - flee at a great pace
            return false;
        }

        // Get a reference to the logging element
        var l_mw_log = MetaWrap.$(this.g_id);

        // No container to write to, no pretty error
        if (!l_mw_log)
        {
            // Construct
			MetaWrap.Logging.Reconstruct(false);

			l_mw_log = MetaWrap.$(this.g_id);

			if (!l_mw_log)
			{
				// old school Logging :)
				alert(p_message);

				// limp away
				return false;
			}

			//MetaWrap.Logging.Minimise();
			MetaWrap.Logging.Maximise();
        }

        // Log the line number
        if (p_line != null)
        {
            p_message = p_line + ": " + p_message
        }

        // Log the url
        if (p_url != null)
        {
            p_message = p_url + ":" + p_message
        }

        // Timestamp the log entry
        var l_elapsed_time = ((new Date()).getTime() - this.g_start_time);
        p_message = l_elapsed_time + " ms : " + p_message;
		
		// Look for  the mozilla console
		if (window.console)
		{
			console.log(p_message);
		}
		
		// look for the onyx serial port
		if ((debug) && (debug.print))
		{
			debug.print(p_message);
		}

        // If we have no level the assume this is a simple trace
        if (p_level == null)
        {
            p_level = this.g_trace;
        }

		var l_log_border = MetaWrap.$("mw_log_border");

		/*
        if (this.g_classes[p_level] == "trace")
        {
            // Do nothing
        }
        else*/
        // If we have not created the containers - then create them
        if ((!this.g_used) && (this.g_auto_show))
        {

            // find the content container
            var l_log_content = MetaWrap.$("mw_log_content");
			
            // and hide it
            l_log_content.style.display = "block";

            //var l_log_border = MetaWrap.$("mw_log_border");

            // lets never speak of this again..
            this.g_used = true;

            //MetaWrap.Logging.Minimise();
			//MetaWrap.Logging.Maximise();
        }
				

		// If it is not visible
		if (l_log_border.style.display != "block")
		{
				// And if we want to auto show on any message that passes a threshold
				if ((this.g_auto_show) && (p_level <= this.g_auto_show_trigger_level))
				{
					//alert(p_level + " " + p_message);
					// Show it
					l_log_border.style.display = "block";

					MetaWrap.Logging.Maximise();
				}
		}

        // If we have an error for this link
        var l_class_link = MetaWrap.$("mw_show_" + this.g_classes[p_level]);

        // Then show it
        if (l_class_link)
        {
            l_class_link.style.visibility = "visible";
        }

        // append the statement
        var l_p = document.createElement(this.g_element);
        l_p.onclick = this.mwShowType;

        //l_p.id = "logid" + this.g_item++;

        // this is a hack work around a bug in ie
        if (l_p.getAttributeNode("class"))
        {
            for (var i = 0; i < l_p.attributes.length; i++)
            {
                //alert(l_p.attributes[i].name.toUpperCase());
                if (l_p.attributes[i].name.toUpperCase() == 'CLASS')
                {
                    l_p.attributes[i].value = this.g_classes[p_level];
                }
            }
        }
        else
        {
            l_p.setAttribute("class", this.g_classes[p_level]);
        }

        var text = document.createTextNode(p_message);

        l_p.appendChild(text);

        //alert("this.g_visible_level = " + this.g_visible_level);

		/*
        if (this.g_visible_level != 0)
        {
        	if (this.g_visible_level != p_level)
        	{
        		l_p.style.display = "none";
        		//alert("invisible");
        	}
        }
*/
        l_mw_log.appendChild(l_p);

        return true;
    },


/*!
        @fn         getNodeClass:function(p_object)
        @param      p_object
        @return     string The class of a given node
        @brief      returns the class attribute of a node
        @author     James Mc Parlane
        @date       11 September 2005
    */
    getNodeClass:function(p_object)
    {
        var l_result = "";

        if (p_object.getAttributeNode("class"))
        {
            l_result = p_object.attributes.getNamedItem("class").value;
        }
        return l_result;
    }

};

/*!
 *@} endgroup mw_javascript_lib_logger MetaWrap - JavaScript - Logger
 */

/*!
 *@} end of MetaWrap.Logger
 */


// Construct
MetaWrap.Logging.Constructor(false);

function log(p_msg)
{
    MetaWrap.Logging.debug(p_msg);
}

function debug(p_msg)
{
    MetaWrap.Logging.debug(p_msg);
}

function error(p_msg)
{
    MetaWrap.Logging.error(p_msg);
}

function trace(p_msg)
{
    MetaWrap.Logging.trace(p_msg);
}

function warn(p_msg)
{
   MetaWrap.Logging.warn(p_msg);
}

function fatal(p_msg)
{
   MetaWrap.Logging.fatal(p_msg);
}

function ASSERT(p_cond,p_msg)
{
    if (!p_cond)
    {
        error("ASSERT FAILED: " + p_msg);
    }
}

//
// Handle logging on and off from query string
//

var l_debug_qs = MetaWrap.qs("debug");
if ((l_debug_qs == "true") || (l_debug_qs == "1")|| (l_debug_qs == "yes") || (l_debug_qs == "on"))
{
	MetaWrap.Logging.g_on = true;
}
else
if ((l_debug_qs == "false") || (l_debug_qs == "0")|| (l_debug_qs == "no") || (l_debug_qs == "off"))
{
	MetaWrap.Logging.g_on = false;
}
else
if ((l_debug_qs == "wait") || (l_debug_qs == "delay"))
{
	MetaWrap.Logging.Wait(3);
}