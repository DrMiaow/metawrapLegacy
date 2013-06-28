/*

    @file mw_lib_macrorecorder_controlpanel_actions_load.js

    $Id: mw_lib_macrorecorder_controlpanel_actions_load.js,v 1.8 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_controlpanel_actions_load.js,v $
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

/*! \page mw_javascript_lib_macrorecorder_controlpanel_actions_load MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load
 *
 * \subsection mw_javascript_lib_macrorecorder_controlpanel_actions_load Overview
 */ 

//alert("$Id: mw_lib_macrorecorder_controlpanel_actions_load.js,v 1.8 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecorder_controlpanel_actions_load MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name MetaWrap.MacroRecorder.ControlPanel.Actions.load */
//@{

/*!
    @fn         MetaWrap.MacroRecorder.registerLoader = function(p_name,p_function,p_description)
    @param      p_name 
    @param      p_function 
    @param      p_description 
    @return     void 
    @brief      
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.registerLoader = function(p_name,p_function,p_description)
{
    if (this.m_loaders == null)
    {
        this.m_loaders = [];
    }
    this.m_loaders[this.m_loaders.length] = {m_name:p_name,m_function:p_function,m_description:p_description};
}

/*!
    @fn         function MetaWrap_MacroRecorder_runLoader(p_index)
    @param      p_index The loader to run
    @return     void 
    @brief      Runs the loader specified by p_index 
    @author     James Mc Parlane
    @date       6 September 2004
*/    
MetaWrap.MacroRecorder.runLoader = function(p_index)
{
    this.m_loaders[p_index].m_function();
}

/*!
    @fn         MetaWrap.MacroRecorder.ControlPanel.Actions.load = function()
    @return     void 
    @brief      Implements load controlpanel command
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Find another way to add this
*/    
MetaWrap.MacroRecorder.ControlPanel.Actions.load = function()
{
    //alert("MetaWrap.MacroRecorder.load()");
    
    var l_r = MetaWrap.MacroRecorder;
    
    if (l_r.m_loaders.length == 0)
    {
        alert("No loaders configured. Please read the documentation for the MetaWrap macro recorder.");
    }
    else
    {
        // Open window
        l_r.m_load_window = window.open("","_blank","top=100,left=100,height=300,width=400,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes",true);

        // If we managed to open a window
        if (l_r.m_load_window)
        {   
            l_r.m_load_window.document.write("<html>");            
            l_r.m_load_window.document.write("<head>");            
            l_r.m_load_window.document.write("<title>MetaWrap Macro Recorder - Loaders</title>");            
            l_r.m_load_window.document.write("</head>");            
            l_r.m_load_window.document.write("<body>");            
            
            // for each loader
            for(var l_loader in l_r.m_loaders)
            {
                // get the text
                
                var l_s = l_r.m_loaders[l_loader];
                                    
                var l_loader_text = "<li onclick='window.opener.MetaWrap.MacroRecorder.runLoader(" + l_loader + ");window.close()'>" + l_s.m_name + "</li>";
                
                l_r.m_load_window.document.write(l_loader_text);                
            }
            
            l_r.m_load_window.document.write("</body>");            
            l_r.m_load_window.document.write("</html>");            
            
        }
        else
        {
            alert("Please allow popups for l_r site.");
        }
    }
}

//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_controlpanel_actions_load  MetaWrap - JavaScript - MacroRecorder - ControlPanel - Actions - Load
 */ 