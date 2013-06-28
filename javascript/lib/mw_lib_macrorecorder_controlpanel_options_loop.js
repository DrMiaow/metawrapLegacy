/*

    @file mw_lib_macro_recorder.js

    $Id: mw_lib_macrorecorder_controlpanel_options_loop.js,v 1.7 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_options_loop.js,v $
 * Revision 1.7  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:43  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.6  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.5  2006/05/07 10:36:09  james
 * Refactored events options so that they now interact properly.
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


/*! \page mw_javascript_lib_macrorecorder_controlpanel_options_loop MetaWrap - JavaScript - MacroRecorder - ControlPanel - Options - Loop
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_options_loop Overview
 
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_options_loop Web Applications - Event Streams
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_options_loop.js,v 1.7 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_options_loop  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Options - Loop
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name  MetaWrap.MacroRecorder.ControlPanel.Options.loop Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.loop = function(p_element)
    @param      p_element The loop checkbox
    @return     void 
    @brief      Turn On/Turn Off Looping
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Options.loop = function(p_element)
{
    MetaWrap.MacroRecorder.m_loop = p_element.checked;
}


//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_options_loop  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Options - Loop
 */ 