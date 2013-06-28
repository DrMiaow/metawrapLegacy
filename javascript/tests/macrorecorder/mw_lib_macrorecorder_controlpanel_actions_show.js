/*

    @file mw_lib_macrorecorder_controlpanel_actions_show.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_show.js,v 1.7 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_show.js,v $
 * Revision 1.7  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:43  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.6  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.5  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.4  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.3  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.2  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.1  2006/05/04 15:28:27  james
 * Moved code
 *
 * Revision 1.2  2006/05/04 15:25:05  james
 * Adjusting code
 *
 * Revision 1.1  2006/05/04 14:55:42  james
 * Reorganised code - preparing to release into public. Need to
 * provide an obvious way to extend this so that there is a
 * clear place for people to play with it.
 *
 */


/*! \page mw_javascript_lib_macrorecorder_controlpanel_actions_show MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Show
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_show Overview
 */

// //alert("$Id: mw_lib_macrorecorder_controlpanel_actions_show.js,v 1.7 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_actions_show  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Show
 *@{
 */ 
 
// Ensure we have the namespaces we need
 
/*! @name  MetaWrap.MacroRecorder.ControlPanel.Actions.show Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.show = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.show = function()
{
    //alert("MetaWrap.MacroRecorder.show()");
    
    var l_r = MetaWrap.MacroRecorder;
    
    // Open window
    l_r.m_show_window = window.open("","_blank","top=100,left=100,height=600,width=800,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes",true);

    // If we managed to open a window
    if (l_r.m_show_window)
    {   
        l_r.m_show_window.document.write("<html>");            
        l_r.m_show_window.document.write("<head>");            
        l_r.m_show_window.document.write("<title>MetaWrap Macro Recorder - Events</title>");            
        l_r.m_show_window.document.write("</head>");            
        l_r.m_show_window.document.write("<body>");            
     
        // if we have some events to display
        if ((l_r.m_recording) && (l_r.m_recording.m_events.length))
        {
                    
            l_r.m_show_window.document.write("<center>");            
            l_r.m_show_window.document.write("<table>");

            l_r.m_show_window.document.write("<tr bgcolor='#9acd32'>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Type</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Time</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Location</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>B</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>X</font></td>");            
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Y</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Key</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Alt</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Ctrl</font></td>");                        
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Shift</font></td>");
            
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Select-Start-Location</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Select-Start</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Select-End-Location</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Select-End</font></td>");
            
            
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Scroll-Top</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Scroll-Left</font></td>");
            l_r.m_show_window.document.write("<td><font face='Courier New' size='-2'>Option Select</font></td>");
            
            l_r.m_show_window.document.write("</tr>");
            
            // for each event
            for(var l_event in l_r.m_recording.m_events)
            {
                l_r.m_show_window.document.write("<tr>");
                // get the text
                var l_event_text = l_r.m_recording.m_events[l_event].toString();
                
                // Dump it to window                
                l_r.m_show_window.document.write("<td>");

                // first font size                
                l_r.m_show_window.document.write("<font face='Courier New' size='-2' ");
                
                // we want l_r in red if its an external event                
                if (!l_r.m_standard_events[l_r.m_recording.m_events[l_event].m_type] == 1)
                {
                    l_r.m_show_window.document.write(" color='#FF0000' ");                 
                }
                                
                l_r.m_show_window.document.write(">");
                l_r.m_show_window.document.write(l_event_text.replace(/,/gi,"</font></td><td><font face='Courier New' size='-2' >"));
                l_r.m_show_window.document.write("</font>");
                l_r.m_show_window.document.write("</td>");
                
                l_r.m_show_window.document.write("</tr>");
            }
            
            l_r.m_show_window.document.write("</table>");
            
            l_r.m_show_window.document.write("</center>");            
        }
        else
        {
            l_r.m_show_window.document.write("No events..");
        }
        
        l_r.m_show_window.document.write("</body>");            
        l_r.m_show_window.document.write("</html>");            
        
    }
    else
    {
        alert("Please allow popups for this site.");
    }
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_actions_show  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Show
 */ 