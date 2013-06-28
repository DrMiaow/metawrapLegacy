/*

    @file mw_lib_macroautosaveer_controlpanel_plugins_autosave.js

    $Id: mw_lib_macrorecorder_controlpanel_plugins_autosave.js,v 1.3 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_plugins_autosave.js,v $
 * Revision 1.3  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:44  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.2  2006/05/10 12:35:39  james
 * Just need to wire up autosaver and we are done
 *
 * Revision 1.1  2006/05/09 11:12:53  james
 * Added plugins
 * Added stub for autosaver
 *
 */


/*! \page mw_javascript_lib_macroautosaveer_controlpanel_plugins_autosave MetaWrap - JavaScript - MacroRecorder - ControlPanel - Plugins - Autosave
 *
 * \subsection mw_javascript_lib_macroautosaveer_controlpanel_plugins_autosave Overview
 */

//alert("$Id: mw_lib_macrorecorder_controlpanel_plugins_autosave.js,v 1.3 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macroautosaveer_controlpanel_plugins_autosave  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Plugins - Autosave
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name  MetaWrap.MacroRecorder.ControlPanel.autosave Namespace */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave");
}

// Declare this plugin as storage
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.m_type = "storage";



/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.reset = function(p_element)
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.reset = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.reset");
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.load = function(p_name)
    @param      p_name The filename to save
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.load = function(p_name)
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.load " + p_name);
    
    return "";
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.save = function(p_name,p_data)
    @param      p_name The filename to save
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.save = function(p_name,p_data)
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.save " + p_name);
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.onunload = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.onunload = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.onunload");
}


/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.onload = function()
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.onload = function()
{
    alert("MetaWrap.MacroRecorder.ControlPanel.Plugins.autosave.onload");
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macroautosaveer_controlpanel_plugins_autosave  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Plugins - Autosave
 */ 