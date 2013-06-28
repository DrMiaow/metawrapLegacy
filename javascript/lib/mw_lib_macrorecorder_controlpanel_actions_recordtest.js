/*

    @file mw_lib_macrorecordtester_controlpanel_actions_recordtest.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_recordtest.js,v 1.6 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_recordtest.js,v $
 * Revision 1.6  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:42  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.5  2006/05/17 11:48:14  james
 * Macro recorder fixes
 *
 * Revision 1.4  2006/05/10 12:35:39  james
 * Just need to wire up autosaver and we are done
 *
 * Revision 1.3  2006/05/09 13:44:20  james
 * Can now create a set of tests
 *
 * Revision 1.2  2006/05/09 11:12:53  james
 * Added plugins
 * Added stub for autosaver
 *
 * Revision 1.1  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.6  2006/05/07 10:36:09  james
 * Refactored events options so that they now interact properly.
 *
 * Revision 1.5  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.4  2006/05/06 09:33:03  james
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


/*! \page mw_javascript_lib_macrorecordtester_controlpanel_actions_recordtest MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Record
 *
 * \subsection mw_javascript_lib_macrorecordtester_controlpanel_actions_recordtest Overview
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_actions_recordtest.js,v 1.6 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecordtester_controlpanel_actions_recordtest  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Record
 *@{
 */ 
 
// Ensure we have the namespaces we need

MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Tester","mw_lib_tester.js");
MwUse("MetaWrap.MacroRecorder","mw_lib_macrorecorder.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel","mw_lib_macrorecorder_controlPanel.js");
 
/*! @name  MetaWrap.MacroRecorder.ControlPanel.recordtest Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest = function()
{    
    if (MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.m_recording)
    {        
        MetaWrap.MacroRecorder.stopEverything(); 
    }
    else    
    {    
        var l_test_name = prompt('What do you want to call this test?',"test-" + MetaWrap.dateTimeString());
    
        // We are recording
        MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.m_recording = true;
    
        // Start recording
        MetaWrap.Tester.startRecording(l_test_name);

        // Add a page to the test        
        MetaWrap.Tester.addPage("" + window.location.href);    
        
        // Hit the control panel record button
        MetaWrap.MacroRecorder.ControlPanel.Actions.record();
    
        var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest");        
        l_element.innerHTML = "[recording test]";        
    }
}

MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.m_recording = false;
MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.m_current_page = null;

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.reset = function(p_element)
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.reset = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.reset");

    var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest");        
    l_element.innerHTML = "[recordtest]";
    
    // If we are recording
    if (MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.m_recording)
    {
        // then stop recording
        MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.m_recording = false;
        
        MetaWrap.MacroRecorder.stopEverything();
        
        // Start recording
        MetaWrap.Tester.stopRecording();
        
        alert("save macro");        
        MetaWrap.Tester.addTest("macro-filename.xml");
        
        // Save current recording
        MetaWrap.Tester.save();                
    }
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.onunload = function(p_element)
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.onunload = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.onunload");
    
    if (MetaWrap.Tester.recording())
    {
        alert("RECORDING onunload");
        
        // save the current macro
        alert("save macro");        
        MetaWrap.Tester.addTest("macro-filename.xml");

        // Save current recording
        MetaWrap.Tester.save();        
    }        
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.onload = function(p_element)
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.onload = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest.onload");
    
    // Load the test
    MetaWrap.Tester.load();
    
    // If we are recording
    if (MetaWrap.Tester.recording())
    {
        alert("RECORDING onload");
        
        // Add this page to the test
        MetaWrap.Tester.addPage(window.location.href); 
        
        // Hit the control panel record button and start recording
        MetaWrap.MacroRecorder.ControlPanel.Actions.record();                   
    }    
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecordtester_controlpanel_actions_recordtest  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Record
 */ 