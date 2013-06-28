/*
 
     @file mw_lib_macrorecorder_config.js

    $Id: mw_lib_macrorecorder_config.js,v 1.3 2006/11/09 11:00:27 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_config.js,v $
 * Revision 1.3  2006/11/09 11:00:27  james
 * Fixed poller - prevening multiple poller_entries from occuring in m_poller and m_check
 *
 * Revision 1.2  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:41  james
 * Added macro recorder
 *
 * Revision 1.6  2006/06/19 12:52:49  james
 * Getting MetaWrap to deploy using Ant
 *
 * Revision 1.1  2006/05/31 12:45:00  james
 * Changed package formal
 *
 * Revision 1.11  2006/05/30 10:49:19  james
 * Latest version of libraries with package support.
 *
 * Revision 1.10  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.9  2006/05/09 11:12:53  james
 * Added plugins
 * Added stub for autosaver
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
 * Revision 1.5  2006/05/06 12:11:21  james
 * More refactoring
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


/*! \page mw_javascript_lib_macro_customise MetaWrap - JavaScript - MacroRecorder - Customise
 *
 * \subsection mw_javascript_lib_macro_customise Overview
 
 * \subsection mw_javascript_lib_macro_customise Web Applications - Event Streams
 */

//alert("$Id: mw_lib_macrorecorder_config.js,v 1.3 2006/11/09 11:00:27 james Exp $");
 
/*! \defgroup mw_javascript_lib_macro_customise  MetaWrap - JavaScript - MacroRecorder - Customise
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name  MetaWrap.MacroRecorder.Customise Namespace */
//@{

MetaWrap.MacroRecorder.Customise = {};

// Add the control panel


MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.record","mw_lib_macrorecorder_controlpanel_actions_record.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.stop","mw_lib_macrorecorder_controlpanel_actions_stop.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.show","mw_lib_macrorecorder_controlpanel_actions_show.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.play","mw_lib_macrorecorder_controlpanel_actions_play.js");
//MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.goaway","mw_lib_macrorecorder_controlpanel_actions_goaway.js");
//MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.load","mw_lib_macrorecorder_controlpanel_actions_load.js");
//MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.load.xml","mw_lib_macrorecorder_controlpanel_actions_load_xml.js");
//MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.save","mw_lib_macrorecorder_controlpanel_actions_save.js");
//MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.save.xml","mw_lib_macrorecorder_controlpanel_actions_save_xml.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Options.fast","mw_lib_macrorecorder_controlpanel_options_fast.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Options.fast","mw_lib_macrorecorder_controlpanel_options_slow.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Options.hide","mw_lib_macrorecorder_controlpanel_options_hide.js");
MwUse("MetaWrap.MacroRecorder.ControlPanel.Options.loop","mw_lib_macrorecorder_controlpanel_options_loop.js");



//MwUse("MetaWrap.MacroRecorder.ControlPanel.Actions.recordtest","mw_lib_macrorecorder_controlpanel_actions_recordtest.js");
//MwUse("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave","mw_lib_macrorecorder_controlpanel_plugins_autosave.js");


// Render the macro recorder control panel
MetaWrap.MacroRecorder.ControlPanel.render();


//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_customise  MetaWrap - JavaScript - MacroRecorder - Customise 
 */ 