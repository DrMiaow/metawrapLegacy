/*! 

    $Id: mw_lib_widget.js,v 1.1 2006/12/21 07:42:25 james Exp $

    FILE:       @file mw_lib_widget.js
              
    @author     James Mc Parlane

    PROJECT:    MetaWrap JavaScript Library

    COMPONENT:  -

    DATE:       21 October 2001

    COMMENTS:   -

    MODIFIED:   -

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

    This program is free software; you can redistribute it and/or modify
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

/*! \page mw_javascript_lib_widget MetaWrap - JavaScript - Widget

<p>This library is structured such that functionality can be defined using the traditinal OO approach 
layering object interfaces and functionality via object heirarchy.</p>

<pre>
             [WIDGET]
                    |
         [WINDOW]
</pre>

<p>At the top level of the document there are a number of root DIV elements that contain the tags 
and display logic of the main functional blocks of the application. Some of these contain sub-DIV’s, 
but from the perspective of the document root, there is only a finite number of these.</p>

<p>Eg: NowPlaying, Video Window etc..</p>

<p>We call these the Application Widgets or just “Widgets” for short. A widget is a displayable 
element on the screen that is the visual representation of a functional block within the system. 
Eg. The Main Menu. The Video Window etc…</p>

<p>A widget</p>

<ul>
<li>has focusable elements, that when navigated to and activated by the user can trigger the spawning of other widgets.
<li>can have a focusable element (Close Button) that will close that widget and all spawned widgets.
<li>has focusable elements which can be scrolled from side to side.
<li>can have a pop-up menu that contains other focusable elements.
<li>can be visible or hidden.
<li>takes up a rectangular region on the screen.
<li>has a corresponding DIV tag in the root of the document and thus an associated style from the CSS.
<li>can have a popup menu with focusable elements.
<li>can interact with other widgets.
</ul>

*/

/*
 * $Log: mw_lib_widget.js,v $
 * Revision 1.1  2006/12/21 07:42:25  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.3  2005/09/21 13:16:30  james
 * *** empty log message ***
 *
 * Revision 1.2  2005/08/04 05:46:53  james
 * Getting graph widget into fighting shape
 *
 * Revision 1.1  2005/07/07 03:28:29  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/02/24 07:35:42  james
 * Wrong location.... fix.
 *
 */

/*! \defgroup mw_javascript_lib_widget Widget
 *@{
 */
 
 // @brief Create MetaWrap.Widget Namespace
 MetaWrap.Widget = new Object();
 
 /*! @brief     If true then we allow special effects */
 var g_SFX = true;
 
 /*!
    @fn         function IsMCEEnabled()
    @brief      Required if we want this to run on media center
    @return     bool
    @author     James Mc Parlane
    @date       1 November 2004
 */
 

function IsMCEEnabled()
{
    return (window.external.MediaCenter != null);   
}

var g_MCE_Debug = false;

if (g_MCE_Debug && IsMCEEnabled())
{
        document.write("<br><br><input id='inputMCEdebug' name='inputMCEdebug' type='text' value='Hello' width='128'>");
        document.write("<input id='inputMCEwarning' name='inputMCEwarning' type='text' value='Hello' width='128'>");
        document.write("<input id='inputMCEerror' name='inputMCEerror' type='text' value='Hello' width='128'><br>");
}
else
{
    g_MCE_Debug = false;    
}
 
 /*!
    @fn         function debugtext(p_String)
    @brief      Dump debug to console
    @return     void
    @param      p_String String to dump 30 
    @author     James Mc Parlane
    @date       24 August 2004
 */
 function debugtext(p_String)
 {
    if (g_MCE_Debug)
    {
        var l_inputMCEdebug = document.getElementById("inputMCEdebug");     
        l_inputMCEdebug.value = p_String;   
    }
    else
    {
        //alert(p_String);
    }
 }
 

 /*!
    @fn         function debugstatus(p_String)
    @brief      Dump debug to console
    @return     void
    @param      p_String String to dump 30 
    @author     James Mc Parlane
    @date       24 August 2004
 */
 function debugstatus(p_String)
 {
    //window.status = p_String;
 }

/*!
    @fn         function errortext(p_String)
    @brief      Dump errors to console
    @return     void
    @param      p_String String to dump 30 
    @author     James Mc Parlane
    @date       24 August 2004
 */
 function errortext(p_String)
 {
    if (g_MCE_Debug)
    {
        var l_inputMCEerror = document.getElementById("inputMCEerror");     
        l_inputMCEerror.value = p_String;   
    }
    else
    {
        //alert(p_String);
    }
}
 

/*!
    @fn         function warningtext(p_String)
    @brief      Dump warnings to console
    @return     void
    @param      p_String String to dump 30 
    @author     James Mc Parlane
    @date       24 August 2004
 */
 function warningtext(p_String)
 {  
    if (g_MCE_Debug)
    {
        var l_inputMCEwarning = document.getElementById("inputMCEwarning");     
        l_inputMCEwarning.value = p_String;     
    }
    else
    {
        //alert(p_String);
    }
    
 }

 
/*!\verbatim*/
debugtext("* including javascript lib - $Id: mw_lib_widget.js,v 1.1 2006/12/21 07:42:25 james Exp $ ");

/*!\endverbatim*/

/*! @brief If this is true, the widget lib will highlight all elements that it handles. This is handy for debuggins*/
var g_wl_show_highlight = false;


/*! \page mw_javascript_lib_widget Widget

  \ref mw_javascript_lib_widget_manual

  \ref mw_javascript_lib_widget_requirements

  \ref mw_javascript_lib_widget_design

*/


/*! \page mw_javascript_lib_widget_requirements MWMCEJ-001 - Widget Requirements 

\section mw_javascript_lib_widget_requirements_TITLE TITLE

Short Description

\section mw_javascript_lib_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-July-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section mw_javascript_lib_widget_requirements_ABSTRACT ABSTRACT

JavaScript Widget Requirements

\section mw_javascript_lib_widget_requirements_DESCRIPTION DESCRIPTION

<p>The Massive Media Center Edition Javascript Library (MMCEJL) should provide an extensible framework in which MCE application can be developed..</p>

\section mw_javascript_lib_widget_requirements_REQUIREMENTS REQUIREMENTS

<p>Layout/Look and behavior should be separated. Everything to do with visual design should be in the HTML. Even the image rollovers. But even these should be deferable to the widget library.</p>

<p>Widgets should be able to be opened and closed.</p>

<p>Widgets should be able to be made focusable and non focusable</p>

<p>Widgets should be able to have a pop-up menu.</p>

<p>Widgets should be able to spawn other widgets, and keep track of these.</p>

<p>Widgets should be animatable.</p>

<p>Widgets should be able so save and load state from XML</p>

<p>Widgets should be able to interace via a global widger list such that...</p>

<ul>
    <li>If a widget is closed, all widgets it has opened should be able to be automatically closed 
        without having to have specify code. There is a significant amount of the code in the curent application is iin there to
        just handle these cases.</li>
        
    <li>If a pop is opened, all widgets at the same level should have their popups closed.There is a significant amount of the code in the curent application is iin there to
        just handle these cases</li>
                
</ul>

\section mw_javascript_lib_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section mw_javascript_lib_widget_requirements_REFERENCES REFERENCES


\section mw_javascript_lib_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page mw_javascript_lib_widget_design MWMCEJ-001 - Widget Design


\section mw_javascript_lib_widget_design_TITLE TITLE

Short Description

\section mw_javascript_lib_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-July-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section mw_javascript_lib_widget_design_ABSTRACT ABSTRACT

Description Abstract.

\section mw_javascript_lib_widget_design_DESCRIPTION DESCRIPTION

<p>The Massive Media Center Edition Javascript Library (MMCEJL) provides extensible functionality 
</p>


\section mw_javascript_lib_widget_design_DESIGN DESIGN

*/


/*! \page mw_javascript_lib_widget_manual MWMCEJ-001 - Widget Manual


\section mw_javascript_lib_widget_manual_TITLE TITLE

Short Description

\section mw_javascript_lib_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-July-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section mw_javascript_lib_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section mw_javascript_lib_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section mw_javascript_lib_widget_manual_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/


/*!
    @fn         function Widget_Common_GetELEMENT(p_wWidget,p_sElement_Type,p_sElement_Name)
    @brief      Find a Widget's ELEMENT based on its type and name
    @return     void
    @param      p_wWidget A reference to our widget
    @param      p_sElement_Type A string representing the widget type, eg "td" or "div" etc..
    @param      p_sElement_Name A string representing the widget name, eg "Close" or "Guide" etc..
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Common_GetELEMENT(p_wWidget,p_sElement_Type,p_sElement_Name)
{
    /* get a handle to our div by using the widget name as a basis for its id attribute*/
    var l_eDiv = document.getElementById(p_sElement_Type+ p_wWidget.m_sName + "_" + p_sElement_Name);
    
    /* make sure that our l_eDiv exists*/    
    if (l_eDiv == null)
    {
        errortext("! error could not find widget ELEMENT id='" + p_sElement_Type+ p_wWidget.m_sName + "_" + p_sElement_Name + "'");
    }
    
    return l_eDiv;
}



/*!
    @fn         function Widget_Common_GetDIV(p_wWidget)
    @brief      Find the DIV element which is our Widget
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Common_GetDIV(p_wWidget)
{
    /* get a handle to our div by using the widget name as a basis for its id attribute*/
    var l_eDiv = document.getElementById("div"+ p_wWidget.m_sName);
    
    /* make sure that our l_eDiv exists*/    
    if (l_eDiv == null)
    {
        errortext("! error could not find Widget DIV element id='" + "div"+ p_wWidget.m_sName + "'");
    }
    
    return l_eDiv;
}


/*!
    @fn         function Widget_Constructor(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Constructor
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Constructor(p_wWidget)
{
    debugtext("* Widget_Constructor '" + p_wWidget.m_sName + "'");
}


/*!
    @fn         function Widget_Destructor(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Destructor
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Destructor(p_wWidget)
{
    debugtext("* Widget_Destructor '" + p_wWidget.m_sName + "'");
}

/*!
    @fn         function Widget_Create(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Create
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want the Widget to be 'Created' - that is have its XML/HTML rendered into
    the document.   
*/
function Widget_Create(p_wWidget)
{
    debugtext("* Widget_Create '" + p_wWidget.m_sName + "'");
}

/*!
    @fn         function Widget_Open(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Open
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want the Widget to be 'Opened' (made visible). If you override this 
    function you should call the base class version after you make all the elements in your widget visible. 
*/
function Widget_Open(p_wWidget)
{
    debugtext("* Widget_Open '" + p_wWidget.m_sName + "'");
    
    // wire up to display
    p_wWidget.vft.f_WireUp(p_wWidget);

    // position
    p_wWidget.vft.f_Position(p_wWidget,p_wWidget.m_iX,p_wWidget.m_iY,p_wWidget.m_iWidth,p_wWidget.m_iHeight,p_wWidget.m_iTransparency);
    
    // set size correctly
    p_wWidget.vft.f_ReSize(p_wWidget);
        
    // get a handle to our div
    var l_eDiv = Widget_Common_GetDIV(p_wWidget); 
    
    // hook back into widget
    l_eDiv.m_wWidget = p_wWidget;
        
    // make it visible
    l_eDiv.style.visibility = "visible";

    // make it known, the widget is open
    p_wWidget.m_bOpened = true;

    // make sure that if some other widget at the same level or lower is popped up, that we close it
    WidgetList_PopUp(g_WidgetList,p_wWidget.m_iDepth);  
    
    // make sure that any other widgets of same depth are closed
    WidgetList_CloseByNotMe(p_wWidget,g_WidgetList);
        
    if (p_wWidget.m_bDynamicCreate)
    {
        p_wWidget.vft.f_Create(p_wWidget);          
    }
}


/*!
    @fn         function Widget_ReSize(p_wWidget)
    @brief      his is out Widget base class's implementation of f_ReSize
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want the internal parts of a widget to resize themselves to reflect the new
    poibilities for layout based on previous calls to f_Position
    
*/
function Widget_ReSize(p_wWidget)
{
    debugtext("* Widget_ReSize '" + p_wWidget.m_sName + "'");
}

/*!
    @fn         function Widget_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
    @brief      This is out Widget base class's implementation of f_Position
    @return     void
    @param      p_wWidget A reference to our widget
    @param      p_iX The new X position
    @param      p_iY The new Y position
    @param      p_iWidth The new Width
    @param      p_iHeight The new Height    
    @param      p_iTransparency The new Transparency
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want to change the location, size and transparancy value of a widget.
*/
function Widget_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
{
    debugtext("* Widget_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight + " (" + p_iTransparency + ")" );
        
    // save the position
    p_wWidget.m_iX = p_iX;
    p_wWidget.m_iY = p_iY;
    p_wWidget.m_iWidth = p_iWidth;
    p_wWidget.m_iHeight = p_iHeight;
    
    if ((p_wWidget.m_iTransparency == 0) && (p_iTransparency != 0)) 
    {
        // transition from invisible to visible
        
        /* get a handle to our div*/
        var l_eDiv = Widget_Common_GetDIV(p_wWidget);    
            
        /* make it hidden */
        l_eDiv.style.visibility = "visible";
        
        //alert(p_wWidget.m_sName + " visible");
        
    }
    else
    if ((p_wWidget.m_iTransparency != 0 ) && (p_iTransparency == 0)) 
    {
        // transition from visible to invisible
        
        /* get a handle to our div*/
        var l_eDiv = Widget_Common_GetDIV(p_wWidget);    
            
        /* make it hidden */
        l_eDiv.style.visibility = "hidden";
        
        //alert(p_wWidget.m_sName + " hidden");     
    }
            
    p_wWidget.m_iTransparency = p_iTransparency;        
}

/*!
    @fn         function Widget_InitialPosition(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
    @brief      This is out Widget base class's implementation of f_InitialPosition
    @return     void
    @param      p_wWidget A reference to our widget
    @param      p_iX The new X position
    @param      p_iY The new Y position
    @param      p_iWidth The new Width
    @param      p_iHeight The new Height    
    @param      p_iTransparency The new transparency    
    @author     James Mc Parlane
    @date       24 August 2004
    
*/
function Widget_InitialPosition(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
{
    debugtext("* Widget_InitialPosition '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight + " (" + p_iTransparency + ")" );
    
    Widget_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
}


/*!
    @fn         function Widget_Element_OnMouseOver(p_wWidget,p_eElement)
    @brief      This is out Widget base class's handler for f_Element_OnMouseOver
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_SetMedia(p_wWidget,p_sMedia)
{
    debugtext("* Widget_SetMedia '" + p_wWidget.m_sName + "' media '" + p_sMedia + "'");    
        
    p_wWidget.m_sMedia = p_sMedia;
}

/*!
    @fn         function Widget_SendMessage(p_wWidget,p_sMessage)
    @brief      Sends a generic text message to the Widget
    @return     void
    @param      p_wWidget A reference to our widget
    @param      p_sMessage The message
    @author     James Mc Parlane
    @date       24 July 2002

    We want to overide f_Open for Video so we can capture clicks for our custom 
    focusable element button"Guide" button, which should open the guide when clicked.
*/
function Widget_SendMessage(p_wWidget,p_sMessage)
{
    debugtext("* Widget_SendMessage '" + p_wWidget.m_sName + "' message '" + p_sMessage + "'");
}

/*!
    @fn         function Widget_WireUp(p_wWidget)
    @brief      Wires up the widget to the display layer
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
*/
function Widget_WireUp(p_wWidget)
{
    debugtext("* Widget_WireUp '" + p_wWidget.m_sName + "'");
}


/*!
    @fn         function Widget_Close(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Close
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want the Widget to be 'Closed' (made invisible). 
    If you override this function you should call the base class version after you make all 
    the elements in your widget invisible.  
*/
function Widget_Close(p_wWidget)
{
    debugtext("* Widget_Close '" + p_wWidget.m_sName + "'");
    
    /* get a handle to our div*/
    var l_eDiv = Widget_Common_GetDIV(p_wWidget);    
        
    /* make it hidden */
    l_eDiv.style.visibility = "hidden";

    /* make it known, the widget is closed*/
    p_wWidget.m_bOpened = false;
    
}




/*!
    @fn         function Widget_Activate(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Activate
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    
    This function should be called when you want the Widget to be navigable. If you override this 
    function you should call the base class version after you make all the elements in your widget focusable.   
*/
function Widget_Activate(p_wWidget)
{
    debugtext("* Widget_Activate '" + p_wWidget.m_sName + "'");
    
    /* make sure the Close button is focusable*/
    var l_close = Widget_Common_GetELEMENT(p_wWidget,"td","Close")
    
    if (l_close != null)
    {
        /* make it so we can focus*/
        l_close.focusable = true;
        
        
        if (g_wl_show_highlight) 
            l_close.highlightable = true;
    }


    /* make sure the PopUp button is focusable*/
    var l_popup = Widget_Common_GetELEMENT(p_wWidget,"td","PopUp")
    
    if (l_popup != null)
    {
        /* make it so we can focus*/
        l_popup.focusable = true;
        if (g_wl_show_highlight) 
          l_popup.highlightable = true;
    }


    /* Let it be known.. this widget is activated*/
    p_wWidget.m_bActivated = true;


}


/*!
    @fn         function Widget_Deactivate(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Deactivate
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want to stop the Widget from being navigable. If you override this 
    function you should call the base class version after you make all the elements in your widget non focusable
*/
function Widget_Deactivate(p_wWidget)
{
    debugtext("* Widget_Deactivate '" + p_wWidget.m_sName + "'");
    
    /* make sure the Close button is not focusable*/
    var l_close = Widget_Common_GetELEMENT(p_wWidget,"td","Close")
    
    if (l_close != null)
    {
        /* make it so we can focus*/
        l_close.focusable = false;
        if (g_wl_show_highlight) 
         l_close.highlightable = false;
    }


    /* make sure the PopUp button is not focusable*/
    var l_popup = Widget_Common_GetELEMENT(p_wWidget,"td","PopUp")
    
    if (l_popup != null)
    {
        /* make it so we can focus*/
        l_popup.focusable = false;
        if (g_wl_show_highlight) 
         l_popup.highlightable = false;
    }


    /* Let it be known.. this widget is deactivated*/
    p_wWidget.m_bActivated = false;

    
}



/*!
    @fn         function Widget_PopUpMenuScrollUp(p_wWidget)
    @brief      This is out Widget base class's implementation of f_PopUpMenuScrollUp
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want to pop up the widgets pop-up menu. If you override this 
    function you should call the base class version after you make all the elements in your menu visible and focusable. 
*/
function Widget_PopUpMenuScrollUp(p_wWidget)
{
    debugtext("* Widget_PopUpMenuScrollUp '" + p_wWidget.m_sName + "'");

    /* make sure that if some other widget at the same level is popped up, that we close it*/
    WidgetList_PopUp(g_WidgetList,p_wWidget.m_iDepth);
    
    /* make sure that if some other widget at the GREATER level is opened - then close it*/
    WidgetList_Close(g_WidgetList,p_wWidget.m_iDepth+1)
    
    /* make it known, the menu is up*/
    p_wWidget.m_bScrolledup = true;
}


/*!
    @fn         function Widget_PopUpMenuScrollDown(p_wWidget)
    @brief      This is out Widget base class's implementation of f_PopUpMenuScrollDown
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
    This function should be called when you want to close the widgets pop-up menu. If you override this 
    function you should call the base class version after you make all the elements in your menu invisible 
    and non focusable.  
*/
function Widget_PopUpMenuScrollDown(p_wWidget)
{
    debugtext("* Widget_PopUpMenuScrollDown '" + p_wWidget.m_sName + "'");

    /* make it known, the menu is down*/
    p_wWidget.m_bScrolledup = false;

}



/*!
    @fn         function Widget_Populate(p_wWidget)
    @brief      This is out Widget base class's implementation of f_Populate
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Populate(p_wWidget)
{
    debugtext("* Widget_Populate '" + p_wWidget.m_sName + "'");
}


/*!
    @fn         function Widget_Depopulate(p_wWidget)
    @brief      This is out Widget base class
    @return     void
    @brief      This is out Widget base class's implementation of f_Depopulate
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Depopulate(p_wWidget)
{
    debugtext("* Widget_Depopulate '" + p_wWidget.m_sName + "'");

    /* get a handle to our div*/
    var l_divScroller = document.getElementById("div"+ p_wWidget.m_sName + "Scroller");

    /* nukem rico...*/
    while (l_divScroller.hasChildNodes())
        l_divScroller.removeChild(n.firstChild);
    
}



/*!
    @fn         function Widget_SlideLeft(p_wWidget)
    @brief      This is out Widget base class's implementation of f_SlideLeft
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_SlideLeft(p_wWidget)
{
    debugtext("* Widget_SlideLeft '" + p_wWidget.m_sName + "'");
}


/*!
    @fn         function Widget_SlideRight(p_wWidget)
    @brief      This is out Widget base class's implementation of f_SlideRight
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_SlideRight(p_wWidget)
{
    debugtext("* Widget_SlideRight '" + p_wWidget.m_sName + "'");
}



/*!
    @fn         function Widget_Element_OnClick(p_wWidget,p_eElement)
    @brief      This is out Widget base class's implementation of f_Element_OnClick
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Element_OnClick(p_wWidget,p_eElement)
{
    debugtext("* Widget_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");


    
    /* is this the Close button?*/
    if (p_eElement.id == ("td" + p_wWidget.m_sName + "_Close"))
    {
        debugtext("* Toggle Close " + p_wWidget.m_sName);

        /* close all widgets with a greater than or equal to depth */
        WidgetList_Close(g_WidgetList,p_wWidget.m_iDepth);
        
        /*
        // if we are open 
        if (p_wWidget.m_bOpened)
        {
            // close ourselves 
            p_wWidget.vft.f_Close(p_wWidget);
        }
        */
        
        // make sure that if some other widget at the same level or lower is popped up, that we close it
        //WidgetList_PopUp(g_WidgetList,p_wWidget.m_iDepth);
        
    }

    /* is this the PopUp button?*/
    if (p_eElement.id == ("td" + p_wWidget.m_sName + "_PopUp"))
    {
        debugtext("* Toggle PopUp " + p_wWidget.m_sName);
    
        /* do we scroll the menu up or down*/

        if (p_wWidget.m_bScrolledup)
        {                                   
            /* scroll the menu down*/
            p_wWidget.vft.f_PopUpMenuScrollDown(p_wWidget);
        }
        else
        {
            /* scroll the menu down*/
            p_wWidget.vft.f_PopUpMenuScrollUp(p_wWidget);
        }

    }

}


/*!
    @fn         function Widget_Element_OnFocus(p_wWidget,p_eElement)
    @brief      This is out Widget base class's implementation of f_Element_OnFocus
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Element_OnFocus(p_wWidget,p_eElement)
{
    debugtext("* Widget_Element_OnFocus '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
}



/*!
    @fn         function Widget_Element_OnBlur(p_wWidget,p_eElement)
    @brief      This is out Widget base class's implementation of f_Element_OnBlur
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Element_OnBlur(p_wWidget,p_eElement)
{
    debugtext("* Widget_Element_OnBlur '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
}


/*!
    @fn         function Widget_Element_OnGrab(p_wWidget,p_eElement)
    @brief      This is out Widget base class's implementation of f_Element_OnGrab which is called when an object is 'Grabbed' by the user
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
    
*/
function Widget_Element_OnGrab(p_wWidget,p_eElement)
{
    debugtext("* Widget_Element_OnGrab '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
}



/*!
    @fn         function Widget_Element_OnDrop(p_wWidget,p_eElement)
    @brief      This is out Widget base class's implementation of f_Element_OnDrop  which is called when an object is 'Dropped' by the user
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Element_OnDrop(p_wWidget,p_eElement) 
{
    debugtext("* Widget_Element_OnDrop '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
}

/*!
    @fn         function Widget_Element_OnMouseOver(p_wWidget,p_eElement)
    @brief      This is out Widget base class's handler for f_Element_OnMouseOver
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Element_OnMouseOver(p_wWidget,p_eElement)
{
    debugtext("* Widget_Element_OnMouseOver '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");  
}


/*!
    @fn         function Widget_Element_OnMouseOut(p_wWidget,p_eElement)
    @brief      This is out Widget base class's implementation of f_Element_OnMouseOut
    @return     void
    @param      p_wWidget A reference to our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Element_OnMouseOut(p_wWidget,p_eElement)
{
    debugtext("* Widget_Element_OnMouseOut '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
}


/*!
    @fn         function Class_Widget_Inherit(p_vft)
    @brief      This will initalise p_vft from its parent's virtial function table
    @return     void
    @param      p_vft A reference to our widgets virtual function table.
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Class_Widget_Inherit(p_vft)
{
    debugtext("+ Class_Widget_Inherit");
    
    /* if we have not parent, then scram. */
    if (p_vft.parent == null) 
    {
        debugtext("- Class_Widget_Inherit");
        return;
    }
    
    /* if we have a parent, then we populate our virtual function table from them*/

    debugtext("* populate vft from parent");

    p_vft.f_Constructor = p_vft.parent.f_Constructor;       
    p_vft.f_Destructor = p_vft.parent.f_Destructor;
            
    p_vft.f_Open = p_vft.parent.f_Open;
    p_vft.f_Create = p_vft.parent.f_Create;
    p_vft.f_Close = p_vft.parent.f_Close;
            
    p_vft.f_Activate = p_vft.parent.f_Activate;
    p_vft.f_Deactivate = p_vft.parent.f_Deactivate;

    p_vft.f_WireUp = p_vft.parent.f_WireUp;
    p_vft.f_ReSize = p_vft.parent.f_ReSize;
    p_vft.f_Position = p_vft.parent.f_Position;
    p_vft.f_InitialPosition = p_vft.parent.f_InitialPosition;

    p_vft.f_PopUpMenuScrollUp = p_vft.parent.f_PopUpMenuScrollUp;
    p_vft.f_PopUpMenuScrollDown = p_vft.parent.f_PopUpMenuScrollDown;
                    
    p_vft.f_Populate = p_vft.parent.f_Populate;
    p_vft.f_Depopulate = p_vft.parent.f_Depopulate;
    
    p_vft.f_SetMedia = p_vft.parent.f_SetMedia;
    p_vft.f_SendMessage = p_vft.parent.f_SendMessage
                    
    p_vft.f_SlideLeft = p_vft.parent.f_SlideLeft;
    p_vft.f_SlideRight = p_vft.parent.f_SlideRight;

    p_vft.f_Element_OnClick = p_vft.parent.f_Element_OnClick;
    p_vft.f_Element_OnFocus = p_vft.parent.f_Element_OnFocus;
    p_vft.f_Element_OnBlur = p_vft.parent.f_Element_OnBlur;
    p_vft.f_Element_OnMouseOver = p_vft.parent.f_Element_OnMouseOver;
    p_vft.f_Element_OnMouseOut = p_vft.parent.f_Element_OnMouseOut;
    p_vft.f_Element_OnGrab = p_vft.parent.f_Element_OnGrab;
    p_vft.f_Element_OnDrop = p_vft.parent.f_Element_OnDrop;

    debugtext("- Class_Widget_Inherit");

}

/*!
    @fn         function Class_Widget_VFTBL()
    @brief      This function populates our virtual function table
    @return     void
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Class_Widget_VFTBL()
{
    debugtext("+ creating virtual function table for Widget");

    /* we are a base class - we have not parent*/
    this.parent = null;

    /* we are a base class - so we declare all our functions*/

    /* Our constructor destructor pair, default implementation*/
    this.f_Constructor = Widget_Constructor;        
    this.f_Destructor = Widget_Destructor;
        
    /* Constructor destructor pair*/
    this.f_Open = Widget_Open;
    this.f_Create = Widget_Create;
    this.f_Close = Widget_Close;
        
    /* Focus control functions*/
    this.f_Activate = Widget_Activate;
    this.f_Deactivate = Widget_Deactivate;

    /* Size Control Functions */
    this.f_ReSize = Widget_ReSize;
    this.f_WireUp = Widget_WireUp;
    this.f_Position = Widget_Position;
    this.f_InitialPosition = Widget_InitialPosition;
    
    /* Set Media */
    this.f_SetMedia = Widget_SetMedia;
    
    /* Send a text message to a widget */
    this.f_SendMessage = Widget_SendMessage;
    
    /* Pop-Up Menu Scrolling functions*/
    this.f_PopUpMenuScrollUp = Widget_PopUpMenuScrollUp;
    this.f_PopUpMenuScrollDown = Widget_PopUpMenuScrollDown;
                        
    /* Dynamic content functions*/
    this.f_Populate = Widget_Populate;
    this.f_Depopulate = Widget_Depopulate;
                        
    /* Element Sliding/Scrolling Functions*/
    this.f_SlideLeft = Widget_SlideLeft;
    this.f_SlideRight = Widget_SlideRight;

    /* our element event messages*/
    this.f_Element_OnClick = Widget_Element_OnClick;
    this.f_Element_OnFocus = Widget_Element_OnFocus;
    this.f_Element_OnBlur = Widget_Element_OnBlur;
    this.f_Element_OnMouseOver = Widget_Element_OnMouseOver;
    this.f_Element_OnMouseOut = Widget_Element_OnMouseOut;
    this.f_Element_OnGrab = Widget_Element_OnGrab;
    this.f_Element_OnDrop = Widget_Element_OnDrop;
}


/* Create the virtual function table*/
/*!\verbatim*/
debugtext("* creating g_Class_Widget_VFTBL");
/*!\endverbatim*/
var g_Class_Widget_VFTBL = new Class_Widget_VFTBL();



/*!
    @fn         function Class_Widget(p_sName)
    @brief      This is our Widget base class
    @return     void
    @param      p_sName The name of our widget.
    @param      p_sName The logical depth of our widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Class_Widget(p_sName)
{
    this.m_sName = p_sName;
    this.m_iDepth = 0
    this.m_iElements = 0;
    this.m_bOpened = false;
    this.m_bSplitLevel = false; /*!< id this is true then this widgets can be open at the same time with the same as other widgets at the same depth */
    this.m_bActivated = false;
    this.m_bScrolledup = false;                     
    this.m_bPopulated = false;
    this.m_bDraggable = false;
    this.m_bHoldDrag = false;
    
    // div location
    this.m_bDynamicCreate = true;
    
    // dragging - pixel offsets of div
    this.m_iPickUpX = 0;
    this.m_iPickUpY = 0;
    this.m_iDeltaX = 0;
    this.m_iDeltaY = 0; 
    
    // div location
    this.m_iStartDragPixelLeft = 0;
    this.m_iStartDragPixelTop = 0;

    // position that we started dragging from
    this.m_iSX = 0;
    this.m_iSY = 0;

    // initial position
    this.m_iX = 64;
    this.m_iY = 64;
    this.m_iWidth = 256;
    this.m_iHeight = 256;
    this.m_iTransparency = 100;

    this.m_bSizeBoxImage = false;
    this.m_iSizeBoxWidth = 0;
    this.m_iSizeBoxHeight = 0;

    this.m_bCloseBoxImage = false;
    this.m_iCloseBoxWidth = 0;
    this.m_iCloseBoxHeight = 0;

    this.m_bDragBarImage = false;
    this.m_iDragBarWidth = 0;
    this.m_iDragBarHeight = 0;
    
    // custom media
    this.m_sMedia = "";

    /* assign our virtual function table */
    this.vft = g_Class_Widget_VFTBL;

    /* start off by not belonging to a list*/       
    this.m_next = null; 
    this.m_prev = null;         
}


/*!
    @fn         function Class_Widget(p_sName)
    @brief      This is our Widget List
    @return     void
    @param      p_sName The name of our widget.
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Class_WidgetList(p_sName)
{

  /* init list pointers */  

  this.m_head = null;
  this.m_tail = null;
}

/*!
    @fn         function WidgetList_Add(p_lList,p_wWidget,p_iDepth)
    @brief      Add p_wWidget to p_lList
    @return     void
    @param      p_lList The WidgetList we want to add p_wWidget to.
    @param      p_wWidget The Widget we want added to p_lList.
    @param      p_iDepth The logical Depth of this widget
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_Add(p_lList,p_wWidget,p_iDepth)
{   
    debugtext("+ WidgetList_Add");
        
    if (WidgetList_Find(p_lList,p_wWidget))
    {
        errortext("! error - can't add a widget that already in the list");
        debugtext("- WidgetList_Add");
        return; 
    }

    /* set the widgets depth*/
    p_wWidget.m_iDepth = p_iDepth

    if (p_lList.m_tail == null)
    {
        /* if the list is empty*/
        p_wWidget.m_next = null;
        p_wWidget.m_prev = null;
        p_lList.m_head = p_wWidget;
        p_lList.m_tail = p_wWidget;
    }
    else
    {
        /* if the list is not empty*/
        p_wWidget.m_next = null;
        p_wWidget.m_prev = p_lList.m_tail;
        p_lList.m_tail.m_next = p_wWidget;
        p_lList.m_tail = p_wWidget;
    }   
    
    debugtext("- WidgetList_Add");   
}


/*!
    @fn         function WidgetList_Remove(p_lList,p_wWidget)
    @brief      Remove a Widget from the list
    @return     void
    @param      p_lList The WidgetList we want to remove p_wWidget from.
    @param      p_wWidget The Widget we want removed from p_lList.
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_Remove(p_lList,p_wWidget)
{
    debugtext("+ WidgetList_Remove");

    if (p_wWidget == null)
    {
        debugtext("! error - can't remove null widget");
        debugtext("- WidgetList_Remove");
        return;
    }

    if (!WidgetList_Find(p_lList,p_wWidget))
    {
        debugtext("! error - can't remove a widget that is not in the list");
        debugtext("- WidgetList_Remove");
        return; 
    }
        
    if ((p_wWidget == p_lList.m_head) && (p_wWidget == p_lList.m_tail))
    {
        p_lList.m_head = null;
        p_lList.m_tail = null;
    }
    else if (p_wWidget == p_lList.m_head)
    {
        p_lList.m_head = p_wWidget.m_next;
        p_lList.m_head.m_prev = nill;
    }
    else if (p_wWidget == p_lList.m_tail)
    {
        p_lList.m_tail = p_wWidget.m_prev;
        p_lList.m_tail.m_next = null;
    }
    else
    {
        p_wWidget.m_prev.m_next = p_wWidget.m_next;
        p_wWidget.m_next.m_prev = p_wWidget.m_prev;
    }

    debugtext("- WidgetList_Remove");
}

/*!
    @fn         function WidgetList_Find(p_lList)
    @brief      Add p_wWidget to p_lList
    @return     void
    @param      p_lList The list
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_Find(p_lList,p_wWidget)
{
    debugtext("+ WidgetList_Find");
    

    /* get a reference to the first widget */
    var l_widget = p_lList.m_head;

    while(l_widget != null)
    {
        debugtext("find [" + l_widget.m_sName + "] == [" + p_wWidget.m_sName + "] ?" );
        if (p_wWidget == l_widget) 
        {
            debugtext("- WidgetList_Find");
            return true;
        }
        l_widget = l_widget.m_next;
    }

    debugtext("- failed to find widget" + p_wWidget.m_sName );
    
    debugtext("- WidgetList_Find");
    
    return false;
}


/*!
    @fn         function WidgetList_MatchElement(p_lList,p_eElement)
    @brief      Add p_wWidget to p_lList
    @return     reference to widget
    @param      p_lList The list
    @param      p_eElement The Element we are trying to match it with
    @param      p_eElement The Element we are trying to match it with
    @param      p_sType The functional type of element we are trying to match
    @author     James Mc Parlane
    @date       24 August 2004  
    @todo       Not Being used - remove?
*/
function WidgetList_MatchElement(p_lList,p_eElement,p_sElement,p_sType)
{
    debugtext("+ WidgetList_FindElement");
    
    if (p_eElement.m_wWidget != null)
    {
        //alert("cached :)");
        return p_eElement.m_wWidget;
    }
    
    /* get a reference to the first widget */
    var l_widget = p_lList.m_head;

    while(l_widget != null)
    {
        debugtext("find ['" + p_sElement + "'+" + l_widget.m_sName + "'_" + p_sType + "'] == [" + p_eElement.id + "] ?" );
        if (p_sElement + l_widget.m_sName + "_" +  p_sType == p_eElement.id) 
        {
            debugtext("- WidgetList_FindElement");
            
            p_eElement.m_wWidget = l_widget;
            return l_widget;
        }
        l_widget = l_widget.m_next;
    }

    debugtext("- failed to find matching widget for '" + p_eElement.id + "'");  
    debugtext("- WidgetList_FindElement");
    
    return null;
}

/*!
    @fn         function WidgetList_Walk(p_lList)
    @brief      Add p_wWidget to p_lList
    @return     void
    @param      p_lList The list
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_Walk(p_lList)
{
    debugtext("+ WidgetList_Walk");
    

    /* get a reference to the first widget */
    var l_widget = p_lList.m_head;

    while(l_widget != null)
    {
        debugtext("[" + l_widget.m_sName + "]");
        l_widget = l_widget.m_next;
    }

    debugtext("- WidgetList_Walk");
}


/*!
    @fn         function WidgetList_Close(p_lList,p_iDepth)
    @brief      Close all widgets with a depth than or equal to this
    @return     void
    @param      p_lList The list
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_Close(p_lList,p_iDepth)
{
    debugtext("+ WidgetList_Close p_iDepth=" + p_iDepth);

    /* get a reference to the first widget */
    var l_widget = p_lList.m_head;

    while(l_widget != null)
    {
        var l_widget_next = l_widget.m_next;

        
        /* close widgets only if they are at the same or greater depth*/
        debugtext("+ examine for forced f_Close " + l_widget.m_sName + " depth = "+ l_widget.m_iDepth + " m_bScrolledup = " + l_widget.m_bScrolledup );     
        if ((l_widget.m_iDepth >= p_iDepth) && (!l_widget.m_bSplitLevel))
        {
            debugtext("[CLOSE " + l_widget.m_sName + "@" + l_widget.m_iDepth +"]");

            WidgetList_Remove(p_lList,l_widget);

            l_widget.vft.f_Close(l_widget);         
                
        }

        l_widget = l_widget_next;
    }

    debugtext("- WidgetList_Close");
}

/*!
    @fn         function WidgetList_CloseByNotMe(p_rWidget,p_lList)
    @brief      Close all widgets with a depth than or equal to p_rWidget but don't remove p_rWidget
    @return     void
    @param      p_lList The list
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_CloseByNotMe(p_rWidget,p_lList)
{
    debugtext("+ WidgetList_Close p_iDepth=" + p_rWidget.m_iDepth);
    
    
    /* get a reference to the first widget */
    var l_widget = p_lList.m_head;

    while(l_widget != null)
    {
        var l_widget_next = l_widget.m_next;

        
        /* close widgets only if they are at the same or greater depth*/
        debugtext("+ examine for forced f_Close " + l_widget.m_sName + " depth = "+ l_widget.m_iDepth + " m_bScrolledup = " + l_widget.m_bScrolledup );     
        if ( (p_rWidget != l_widget)  && (l_widget.m_iDepth >= p_rWidget.m_iDepth) && (!l_widget.m_bSplitLevel))
        {
            debugtext("[CLOSE " + l_widget.m_sName + "@" + l_widget.m_iDepth +"]");

            WidgetList_Remove(p_lList,l_widget);

            l_widget.vft.f_Close(l_widget);         
                
        }

        l_widget = l_widget_next;
    }

    debugtext("- WidgetList_Close");
}


/*!
    @fn         function WidgetList_PopUp(p_lList,p_iDepth)
    @brief      Close all popup menus that are open with a depoth equal to this
    @return     void
    @param      p_lList The list
    @author     James Mc Parlane
    @date       24 August 2004
*/
function WidgetList_PopUp(p_lList,p_iDepth)
{
    debugtext("+ WidgetList_PopUp p_iDepth=" + p_iDepth);
    

    /* get a reference to the first widget */
    var l_widget = p_lList.m_head;

    while(l_widget != null)
    {
        var l_widget_next = l_widget.m_next;

        debugtext("+ examine for forced f_PopUpMenuScrollDown " + l_widget.m_sName + " depth = "+ l_widget.m_iDepth + " m_bScrolledup = " + l_widget.m_bScrolledup );       
        if ((l_widget.m_iDepth <= p_iDepth) && (l_widget.m_bScrolledup))
        {
            l_widget.vft.f_PopUpMenuScrollDown(l_widget);                           
        }

        l_widget = l_widget_next;
    }

    debugtext("- WidgetList_PopUp");
}




/*! @brief If True - then we are dragging */
var g_Class_Widget_Dragging = false; 

/*! @brief The current grabbed object */
var g_Class_Grabed_Widget = null; 

/*! @brief The current grabbed object style */
var g_Style_Widget_Grabed = null; 

/*! @brief Overide the original onclick function */
document.onmousedown=Widget_Common_Grabber;

/*! @brief Overide the original onmouseup function */
document.onmouseup=Widget_Common_Dropper;

/*! @brief Overide the original ondblclick function */
document.ondblclick=Widget_Common_Launcher;

/*! @brief Overide the original onclick function */
var Widget_Common_Moover_Original = document.onmousemove;

/*!
    @fn         function Widget_Common_Launcher()
    @brief      This is called when a user double clicks on an object
    @return     void
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Common_Launcher()
{
    alert("Launch!");
}

/*!
    @fn         function Widget_Common_Grabber()
    @brief      This is called when a user grabs an object and remembers which object has been grabbed.
    @return     void
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Common_Grabber()
{
    //if( event.button!=2 )
    {   
        if (event.srcElement != null)
        {
            // if we are dragging - we KNOW which object we are dragging
            if (!g_Class_Widget_Dragging)
            {
                g_Class_Grabed_Widget = WidgetList_MatchElement(g_WidgetList,event.srcElement,"img","DragBar");
            }

            
            if ((g_Class_Grabed_Widget != null) && (g_Class_Grabed_Widget.m_bDraggable != null) && (g_Class_Grabed_Widget.m_bDraggable))
            {           
                
                if (g_Class_Grabed_Widget.m_bHoldDrag)
                {
                    g_Class_Widget_Dragging = true;
                }
                else
                {
                    g_Class_Widget_Dragging = !g_Class_Widget_Dragging;
                }                   
                
                if (g_Class_Widget_Dragging)
                {               
                    //debugstatus("start dragging");    
                    
                    //debugstatus("start dragging " + event.clientX + "," + event.clientY);
                    
                    g_Style_Widget_Grabed = Widget_Common_GetDIV(g_Class_Grabed_Widget).style;
                    
                    g_Class_Grabed_Widget.m_iPickUpX = event.clientX;
                    g_Class_Grabed_Widget.m_iPickUpY = event.clientY;
                    
                    g_Class_Grabed_Widget.m_iStartDragPixelLeft = g_Style_Widget_Grabed.pixelLeft;
                    g_Class_Grabed_Widget.m_iStartDragPixelTop = g_Style_Widget_Grabed.pixelTop;

                    g_Class_Grabed_Widget.m_iSX = g_Class_Grabed_Widget.m_iX;
                    g_Class_Grabed_Widget.m_iSY = g_Class_Grabed_Widget.m_iY;
                    
                    
                    document.onmousemove = Widget_Common_Moover;
                }
                else
                {
                    //debugstatus("end dragging");  
                    
                    g_Class_Widget_Dragging= false;
                            
                    document.onmousemove = Widget_Common_Moover_Original;                           
                }
            }
        }
    }
}

/*!
    @fn         function Widget_Common_Dropper()
    @brief      This is called when a user drops the current object
    @return     void
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Common_Dropper()
{
    if( event.button!=2 )
    {   
        if (event.srcElement != null)
        {
            if ((g_Class_Grabed_Widget != null) && (g_Class_Grabed_Widget.m_bDraggable != null) && (g_Class_Grabed_Widget.m_bDraggable))
            {           
                if (g_Class_Grabed_Widget.m_bHoldDrag)                                          
                {
                    //debugstatus("dropped");
                    
                    g_Class_Widget_Dragging= false;
                                    
                    document.onmousemove = Widget_Common_Moover_Original;
                    
                    g_Style_Widget_Grabed = null;
                }
            }
        }
    }
}

/*!
    @fn         function Widget_Common_Moover()
    @brief      This is called when a user moves a grabbed object
    @return     void
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_Common_Moover()
{
    if( g_Class_Widget_Dragging && g_Style_Widget_Grabed != null)
    {
        g_Class_Grabed_Widget.m_iDeltaX = (event.clientX - g_Class_Grabed_Widget.m_iPickUpX);
        g_Class_Grabed_Widget.m_iDeltaY = (event.clientY - g_Class_Grabed_Widget.m_iPickUpY);
        
        //debugstatus("dragging " + g_Class_Grabed_Widget.m_iDeltaX + "," + g_Class_Grabed_Widget.m_iDeltaY);
        
        g_Style_Widget_Grabed.zIndex=100 ;
        
        g_Class_Grabed_Widget.vft.f_Position(g_Class_Grabed_Widget,g_Class_Grabed_Widget.m_iSX + g_Class_Grabed_Widget.m_iDeltaX,g_Class_Grabed_Widget.m_iSY + g_Class_Grabed_Widget.m_iDeltaY,g_Class_Grabed_Widget.m_iWidth,g_Class_Grabed_Widget.m_iHeight,g_Class_Grabed_Widget.m_iTransparency);
        
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////

var g_Widget_Trajectories = new Array();
var g_Widget_Trajectories_Count = 0;
var g_Widget_Trajectories_InPlay = 0;
var g_Widget_Trajectory_Ticker_On = false;

/*!
    @fn         function Trajectory(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iSteps,p_iTime)
    @brief      Create a new trajectory object
    @return     void
    @author     James Mc Parlane
    @date       24 September 2004   
*/
function Trajectory(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iFTransparency,p_iSteps,p_iTime)
{
    this.m_wWidget = p_wWidget;

    // starting point   
    this.m_iSX = p_wWidget.m_iX;
    this.m_iSY = p_wWidget.m_iY;
    this.m_iSWidth = p_wWidget.m_iWidth;
    this.m_iSHeight = p_wWidget.m_iHeight;  
    this.m_iSTransparency = p_wWidget.m_iTransparency;  
    
    // finishing point
    this.m_iFX = p_iFX;
    this.m_iFY = p_iFY;
    this.m_iFWidth = p_iFWidth;
    this.m_iFHeight = p_iFHeight;       
    this.m_iFTransparency = p_iFTransparency;

    // steps
    this.m_iSteps = p_iSteps;
    this.m_iTime = p_iTime;

    // Total Delta for location
    this.m_iDX = p_iFX - this.m_iSX;
    this.m_iDY = p_iFY - this.m_iSY;
    this.m_iDWidth = p_iFWidth - this.m_iSWidth;
    this.m_iDHeight = p_iFHeight - this.m_iSHeight;     
    this.m_iDTransparency = p_iFTransparency - this.m_iSTransparency;       
    
    // Total Delta for location
    this.m_iDtX = this.m_iDX/this.m_iSteps;
    this.m_iDtY = this.m_iDY/this.m_iSteps;
    this.m_iDtWidth = this.m_iDWidth/this.m_iSteps;
    this.m_iDtHeight = this.m_iDHeight/this.m_iSteps;   
    this.m_iDtTransparency = this.m_iDTransparency/this.m_iSteps;   
    
    // Time delta
    this.m_iDt = p_iTime/p_iSteps;
    
    // first step
    this.m_iStep = 0;
    
    // If this is true then we service this transition
    this.m_bService = true;
    
}

/*!
    @fn         function Widget_Trajectory_Ticker()
    @brief      This function is fired off when we have something to animate on a trajectory
    @return     void
    @author     James Mc Parlane
    @date       24 September 2004   
*/
function Widget_Trajectory_Find(p_wWidget)
{           
    var i = 0;
    
    for(;i<g_Widget_Trajectories_Count;i++)
    {
        // if we have a valid trajectory
        if (g_Widget_Trajectories[i] != null)
        {
            var l_T = g_Widget_Trajectories[i];
            //debugstatus("tick " + l_T.m_wWidget.m_sName + "step " + l_T.m_iStep); 
            if (l_T.m_wWidget == p_wWidget)
            {
                return i;
            }
        }

    }
    return -1;
}

/*!
    @fn         function setTrajectory(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iSteps,p_iTime)
    @brief      Set a trajectory for a widget - over p_iTime miliseconds and animated in p_iSteps steps it will transform to its new location and size
    @return     void
    @author     James Mc Parlane
    @date       24 September 2004   
*/
function setTrajectory(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iFTransparency,p_iSteps,p_iTime)
{
    // Find existing trajectory for this widget
    var l_existing = Widget_Trajectory_Find(p_wWidget);
    var l_trajectory = new Trajectory(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iFTransparency,p_iSteps,p_iTime);

    if (l_existing == -1)
    {
        // make a new trajectory object
        if (g_Widget_Trajectories_InPlay == 0)
        {
            g_Widget_Trajectories_Count = 0;
        }
        g_Widget_Trajectories[g_Widget_Trajectories_Count] = l_trajectory;
        g_Widget_Trajectories_Count++;
        g_Widget_Trajectories_InPlay++;
    }
    else
    {
        g_Widget_Trajectories[l_existing] = l_trajectory;   
    }
    
    // if we want it in 0 steps then we move it right away
    if (p_iSteps == 0)
    {
        p_wWidget.vft.f_Position(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iFTransparency);
    }
    else
    if (!g_Widget_Trajectory_Ticker_On)
    {
        //setTimeout("Widget_Trajectory_Ticker()", 100);
        Widget_Trajectory_Ticker();
    }
}

/*!
    @fn         function Widget_Trajectory_Ticker()
    @brief      This function is fired off when we have something to animate on a trajectory
    @return     void
    @author     James Mc Parlane
    @date       24 September 2004   
*/
function Widget_Trajectory_Ticker()
{           
    var i = 0;
    var l_bNeedTicker = false;
    var l_bNextTick = 1000000;
    
    for(;i<g_Widget_Trajectories_Count;i++)
    {
        // if we have a valid trajectory
        if (g_Widget_Trajectories[i] != null)
        {
            var l_T = g_Widget_Trajectories[i];
            //debugstatus("tick " + l_T.m_wWidget.m_sName + "step " + l_T.m_iStep); 

            if (g_Widget_Trajectories[i].m_bService)
            {
                var l_wWidget = l_T.m_wWidget;
                var l_iDtX = l_T.m_iDtX;
                var l_iDtY = l_T.m_iDtY;
                var l_iDtWidth = l_T.m_iDtWidth;
                var l_iDtHeight = l_T.m_iDtHeight;
                var l_iDtTransparency = l_T.m_iDtTransparency;
                
                //debugstatus("tick " + l_T.m_wWidget.m_sName + "step " + l_T.m_iStep + "(" + l_iDtX + "," + l_iDtY + ")"); 
                
                // one step on
                l_T.m_iStep++;                      
                
            
                // are we finished?
                if (l_T.m_iStep >= l_T.m_iSteps)
                {
                    // move on
                    l_wWidget.vft.f_Position(l_wWidget,l_T.m_iFX,l_T.m_iFY,l_T.m_iFWidth,l_T.m_iFHeight,l_T.m_iFTransparency);
                
                    // yes
                    g_Widget_Trajectories[i] = null;
                    g_Widget_Trajectories_InPlay--;
                }
                else
                {
                    // move on
                    l_wWidget.vft.f_Position(l_wWidget,l_wWidget.m_iX + l_iDtX,l_wWidget.m_iY + l_iDtY,l_wWidget.m_iWidth + l_iDtWidth,l_wWidget.m_iHeight + l_iDtHeight,l_wWidget.m_iTransparency + l_iDtTransparency);
                
                    // work out the size of this next tick
                    if (l_bNextTick > l_T.m_iDt)
                    {
                        l_bNextTick = l_T.m_iDt;
                        l_bNeedTicker = true;
                    }
                }
            }
        }   
    }
    
    if (l_bNeedTicker)
    {
        setTimeout("Widget_Trajectory_Ticker()",l_bNextTick);
    }
}

/****************************************************************************************************/


/* end of group mw_javascript_lib_widget */
/*! @}*/
