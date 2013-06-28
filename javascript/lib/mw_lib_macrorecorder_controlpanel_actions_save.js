/*

    @file mw_lib_macrorecorder_controlpanel_actions_save.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_save.js,v 1.8 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_save.js,v $
 * Revision 1.8  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:42  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.7  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.6  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.5  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:28:28  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.2  2006/05/05 14:25:00  james
 * solved loading isssue - now need to edit each file with correct
 * dependencies
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


/*! \page mw_javascript_lib_macrorecorder_controlpanel_actions_save MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Save
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_save Overview
 
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_save Web Applications - Event Streams
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_actions_save.js,v 1.8 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_actions_save  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Save
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name  MetaWrap.MacroRecorder.ControlPanel.Actions.save Namespace */
//@{


/*!
    @fn         MetaWrap.MacroRecorder.registerSaver = function(p_name,p_function,p_description)
    @param      p_name 
    @param      p_function 
    @param      p_description 
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.registerSaver = function(p_name,p_function,p_description)
{
    this.m_savers[this.m_savers.length] = {m_name:p_name,m_function:p_function,m_description:p_description};
}

/*!
    @fn         MetaWrap.MacroRecorder.runSaver = function(p_index)
    @param      p_index
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.runSaver = function(p_index)
{
    this.m_savers[p_index].m_function();
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.save = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.save = function()
{
    //alert("MetaWrap.MacroRecorder.save()");
    
    var l_r = MetaWrap.MacroRecorder;
    
    if (l_r.m_savers.length == 0)
    {
        alert("No savers configured. Please read the documentation for the MetaWrap macro recorder.");
    }
    else
    {        
        // Open window
        l_r.m_save_window = window.open("","_blank","top=100,left=100,height=300,width=400,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes",true);

        // If we managed to open a window
        if (l_r.m_save_window)
        {   
            l_r.m_save_window.document.write("<html>");            
            l_r.m_save_window.document.write("<head>");            
            l_r.m_save_window.document.write("<title>MetaWrap Macro Recorder - Savers</title>");            
            l_r.m_save_window.document.write("</head>");            
            l_r.m_save_window.document.write("<body>");            
            
            // for each saver
            for(var l_saver in l_r.m_savers)
            {
                // get the text
                
                var l_s = l_r.m_savers[l_saver];
                                    
                var l_saver_text = "<li onclick='window.opener.MetaWrap.MacroRecorder.runSaver(" + l_saver + ");window.close()'>" + l_s.m_name + "</li>";
                
                l_r.m_save_window.document.write(l_saver_text);                
            }
            
         /*
            // if we have some events to display
            if (l_r.m_recording.m_events.length)
            {
                        
                l_r.m_save_window.document.write("<pre>");            
                
                // for each event
                for(var l_event in l_r.m_recording.m_events)
                {
                    // get the text
                    
                    var l_e = l_r.m_recording.m_events[l_event];
                                     
                    var l_event_text = "MetaWrap.MacroRecorder.m_recording.m_events.push(new MetaWrap.MacroRecorder.Event(" + l_e.toString() + "));\n";
                    
                    l_r.m_save_window.document.write(l_event_text);
                    
                }
                
                l_r.m_save_window.document.write("</pre>");            
            }
            else
            {
                l_r.m_save_window.document.write("No events..");
            }
    */            
            
            l_r.m_save_window.document.write("</body>");            
            l_r.m_save_window.document.write("</html>");            
            
        }
        else
        {
            alert("Please allow popups for l_r site.");
        }
    }
}



//MetaWrap_MacroRecorder.prototype.registerSaver = MetaWrap_MacroRecorder_registerSaver;
//MetaWrap_MacroRecorder.prototype.runSaver = MetaWrap_MacroRecorder_runSaver;


//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_actions_save  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Save
 */ 
