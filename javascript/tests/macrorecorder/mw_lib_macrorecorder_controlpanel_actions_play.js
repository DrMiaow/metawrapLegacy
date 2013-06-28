/*

    @file mw_lib_macrorecorder_controlpanel_actions_play.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_play.js,v 1.10 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_play.js,v $
 * Revision 1.10  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:42  james
 * Added macro recorder
 *
 * Revision 1.9  2006/07/26 08:26:15  james
 * Updates fixed and tweaks
 *
 * Revision 1.8  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.7  2006/05/07 10:36:09  james
 * Refactored events options so that they now interact properly.
 *
 * Revision 1.6  2006/05/07 08:07:20  james
 * Refactored control panel Actions so that they are
 * more like plugins. Display of Control panel now
 * separated from main engine
 *
 * Revision 1.5  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 08:08:46  james
 * More code tidy up.
 * Getting control panel to implement the visitor class.
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


/*! \page mw_javascript_lib_macrorecorder_controlpanel_actions_play MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Play
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_play Overview
 
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_play Web Applications - Event Streams
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_actions_play.js,v 1.10 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_actions_play  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Play
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name MetaWrap.MacroRecorder.ControlPanel.Actions.play Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.play = function()
    @return     void 
    @brief      Impelements the play control panel plugin
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Find another way to add this 
    @todo       Get the event started from main class
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.play = function()
{
    var l_r = MetaWrap.MacroRecorder;

    // Stop playing
    l_r.stopPlaying();

    // Stop recording
    l_r.stopRecording();
    
    // Reset logging if we have it
    if (MetaWrap.Logging)
    {
        // Clear and reset our logging
        MetaWrap.Logging.Reset();
    }
    
    // If we have events in m_recording.m_events to play
    if ((l_r.m_recording != null) && (l_r.m_recording.m_events.length != 0))
    {
        // .. then play them
        
        
        var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Actions.play");        
        l_element.innerHTML = "[playing]";                
        
        // Start playing
        l_r.startPlaying();
                                
    }
    else
    {
        alert("Playback Buffer Empty - Try Loading Or Recording A Macro");
        
        // Stop everything
        l_r.stopEverything();        
    }
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.play.reset = function()
    @return     void 
    @brief      Resets the play state
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Find another way to add this 
    @todo       Get the event started from main class
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.play.reset = function()
{
    var l_element = document.getElementById("MetaWrap.MacroRecorder.ControlPanel.Actions.play");        
    l_element.innerHTML = "[play]";
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_actions_play  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load
 */ 