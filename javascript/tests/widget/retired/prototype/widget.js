/*! 

    $Id: widget.js,v 1.1 2006/12/21 07:42:26 james Exp $

    FILE:       @file widget.js
              
    AUTHOR:     James Mc Parlane

    PROJECT:    Massive - Windows Media Center -

    COMPONENT:  -

    DATE:       21 October 2001

    COMMENTS:   -

    MODIFIED:   -

    GENERAL INFO:

        Massive Technologies 2000
        PO Box 567, Darlinghurst
        NSW, Australia
        email:  info@massive.com.au
        tel:    (+61-2) 9331 8699
        fax:    (+61-2) 9331 8699
  
    LICENSE:
  
    Copyright (C) 2001  Massive Technologies, Pty Ltd.  
*/

/*! \mainpage

<h3>Massive - Media Center Edition - JavaScript Library</h3>

<p>To aid in developing applications in the MCE HTML environment, Massive has developed this library which provides an abstraction layer between MCE and the normal IE object model. This provides for a simple development environment in which the IE and MCE versions of a program can share significant code.</p>

<p>The library is stucutured such that functionality can be defined using the traditinal OO approach layering object interfaces and functionality via object heirarchy.</p>

<pre>
             [WIDGET]
                |
             [WINDOW]------+
                |          |
             [VIDEO]    [MARQUEE]
                |
     +----------+---------+
     |          |         |
  [WMP9/10]  [FLASH]  [WMC-VIDOUT]                  
</pre>

<p>At the top level of the document there are a number of root DIV elements that contain the tags and display logic of the main functional blocks of the application. Some of these contain sub-DIV’s, but from the perspective of the document root, there is only a finite number of these.</p>

<p>Eg: NowPlaying, Video Window etc..</p>

<p>We call these the Application Widgets or just “Widgets” for short. A widget is a displayable element on the screen that is the visual representation of a functional block within the system. Eg. The Main Menu. The Video Window etc…</p>

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
 * $Log: widget.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.29  2005/10/09 16:00:17  james
 * Working on flash loader issue
 *
 * Revision 1.28  2005/10/06 07:42:26  james
 * Added buffering
 *
 * Revision 1.27  2005/09/27 06:54:47  james
 * Latest changes - adding buffering widget
 *
 * Revision 1.26  2005/09/09 23:45:45  james
 * Deployed version.
 *
 * Revision 1.25  2005/09/09 21:54:32  james
 * Latest fixes.
 * Fixed issue in screen resize.
 * FIxed issue in back key with remote and  flash interaction.
 *
 * Revision 1.24  2005/09/09 14:41:25  james
 * Fixed issue with new help widget. Minor occlusion of help widget by video in 'FIT' mode
 *
 * Revision 1.23  2005/09/09 13:37:58  james
 * Morified widget system so that animations can occur in 0 steps
 * Dealt with issue in Schedule that emerged because of this
 * Added ability to have pre and post trajectory callbacks on widgets
 * Fixed bug in 16x9 code.
 *
 * Revision 1.22  2005/09/07 11:09:04  james
 * Praparing for Thursday deployment.
 *
 * Revision 1.21  2005/08/22 02:56:27  james
 * Made site work with IE6 and normal keys
 *
 * Revision 1.20  2005/08/19 06:09:12  james
 * Latest data
 *
 * Revision 1.19  2005/08/17 06:27:30  james
 * *** empty log message ***
 *
 * Revision 1.18  2004/12/05 06:41:09  james
 * Post race testing
 *
 * Revision 1.17  2004/12/04 09:55:18  james
 * Dealing with bug in WMCE timeshifting - a random value seems to be added to window.external.MediaCenter.Experience.MediaPosition at the start of each buffering session - dealing with it by zeroing it when we do something that will restart the buffer.
 *
 * Revision 1.16  2004/12/04 04:01:33  james
 * Production Test version
 *
 * Revision 1.15  2004/12/04 01:36:33  james
 * Looking for bug in telemetry sync
 *
 * Revision 1.14  2004/12/03 07:11:29  james
 * Latest changes - all working
 *
 * Revision 1.13  2004/11/29 07:28:25  james
 * Scaling behavior back to something that is usable in production.
 *
 * Revision 1.12  2004/11/29 03:35:24  james
 * Enabled SMPTE code to be faked in javascript
 *
 * Revision 1.11  2004/11/13 06:37:40  james
 * Added time shifting.
 *
 * Revision 1.10  2004/11/11 06:42:38  james
 * Animating transitions.
 *
 * Revision 1.9  2004/11/11 06:30:10  james
 * Animating transitions.
 *
 * Revision 1.8  2004/11/11 04:25:52  james
 * Added Transparency as a dimension.
 *
 * Revision 1.7  2004/11/11 02:04:45  james
 * Adding Marquee
 *
 * Revision 1.6  2004/11/10 07:34:02  james
 * Added Marquee Widget type
 *
 * Revision 1.5  2004/11/09 07:33:35  james
 * More progress.
 * Created transparancy effects.
 * Layout engine.
 * Remote control handling.
 *
 * Revision 1.4  2004/11/08 04:52:46  james
 * Created Windows Media Center Edition control.
 *
 * Revision 1.3  2004/11/05 06:29:15  james
 * Completed simple Media Player 9 control.
 * Fixed bugs in drag and drop.
 * Created simple trajectory system
 *
 * Revision 1.2  2004/11/04 01:27:51  james
 * Simple Media Player 9 control.
 *
 * Revision 1.1  2004/11/04 00:39:46  james
 * Revamped WidgetLib for WMCE
 *
 * Revision 1.15  2004/08/30 04:53:04  james
 * Fixed widget system bug that was casing some widgets at the
 * same depth to co-exist. Added m_bSplitLevel to widget that allows a widget
 * to co-exist if needed (as is needed by nowplaying and jukebox widgets)
 *
 * Revision 1.14  2004/08/29 04:26:10  james
 * Got most of genre into widget lib
 *
 * Revision 1.13  2004/08/22 03:40:53  james
 * Fixed bug in widget library that would cause it to go into an infinate loop
 * if a widget was added to the widgetlist twice. Also stopped widgets that
 * are not in the list from being removed.
 *
 * Fine tuned some of the defaullt behaviors. Now when you pop up a menu,
 * default behavior is to close all widgets with a highet depth. And when you
 * open a widget, to PopDown all menus that are open.
 *
 * Revision 1.12  2004/08/14 10:01:38  james
 * tidied up some highlighing
 *
 * Revision 1.11  2004/08/14 02:42:57  james
 * added more persistence code...
 *
 * fixed bug in widget_popup where code for ScrollUp/ScrollDown was in Activate
 *
 * Revision 1.10  2004/07/22 01:16:56  james
 * no message
 *
 * Revision 1.9  2004/07/11 02:15:23  james
 * Updating documentation.
 *
 * Revision 1.8  2004/07/02 08:15:46  james
 * Fixed bug in WidgetList_Popup() that was stopping menu tracking from happening properly.
 *
 * Revision 1.7  2004/07/02 06:06:17  james
 * Fixed more of the jukebox
 *
 * Revision 1.6  2004/07/01 14:52:24  james
 * Started on fix for PopUp menu collisions with jukebox and guide etc..
 *
 * Revision 1.5  2004/07/01 14:33:21  james
 * Knocked Jukebox into shape.. Its still in pretty bad state.. But one more day should get it done...
 *
 * Revision 1.4  2004/06/29 15:52:21  james
 * Completed global gadget list. Tested gadget closing system.
 * It works very well. Now need to make popup menu code test.
 *
 * Revision 1.3  2004/06/29 14:16:30  james
 * Completed widget tests. It all works fantasticly. Full inheritence model. Now starting on global gadget list.
 *
 * Revision 1.2  2004/06/28 08:33:38  james
 * Completed base of framework..
 *
 * Revision 1.1  2004/06/28 04:07:35  james
 * Added basic frmaework filers... this is before we start splitting up the functiionality.
 *
 */

/*! \defgroup vod_widget Widget
 *@{
 */
 
 /*! @brief     If true then we allow special effects */
var g_SFX = false;

 /*! @brief     Number of steps to make when animating a transition */
var g_Animation_Steps = 20;

 /*! @brief     Number of milliseconds duration to make a transition*/
var g_Animation_Duration = 1000;

/*! @brief     The timer object for this trajectory*/
var g_TrajectoryTimer = null;

/*!
    @fn         function IsMCEEnabled()
    @brief      Required if we want this to run on media center
    @return     bool
    @author     James Mc Parlane
    @date       1 November 2004
*/
function IsMCEEnabled()
{
    
    // First check for the object
    try
    {    
        // if the MediaCenter object does not exist then return false.
        return (window.external.MediaCenter != null);     
    }
    catch(l_e)
    {
        // Now - when media center is starting up, the above will throw an error and get us here... 
        // so we should return true - IE by itself will not throw an error, but return false.
        return true;
    }
}

var g_MCE_Debug = false;
/*
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
*/
 
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
    window.status = p_String + window.status;
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
 
 var g_Standard_Width =  [640,800,1024,1152,1280,1280,1400,1600,1792,1800,1856,1920,2048];
 var g_Standard_Height = [480,600,768,864,960,1024,1050,1080,1200,1280,1344,1392,1440,1536];
 
 function nearest_width(p_width)
 {
     var i;
     for(i = 0;i<g_Standard_Width.length;i++)
     {
         if (g_Standard_Width[i] >= (p_width - 16))
         {
             return g_Standard_Width[i];
         }
     }
 
     return g_Video_Screen_Width;
 }
 
 
 function nearest_height(p_height)
 {
     
     
     var i;
     for(i = 0;i<g_Standard_Height.length;i++)
     {
         if (g_Standard_Height[i] >= (p_height - 16))
         {
             return g_Standard_Height[i];
         }
     }
 
     return g_Video_Screen_Height;
 }
 
 
 function MwSniffDisplayDimensions()
 {
 /*
     // Outer Dimensions
     var l_width,l_height;
     var test1 = document.body.scrollHeight;
     var test2 = document.body.offsetHeight
     if (test1 > test2) // all but Explorer Mac
     {
         l_width = document.body.scrollWidth;
         l_height = document.body.scrollHeight;
     }
     else // Explorer Mac;
          //would also work in Explorer 6 Strict, Mozilla and Safari
     {
         l_width = document.body.offsetWidth;
         l_height = document.body.offsetHeight;
     }
 */
 
     // Inner Dimensions
     var l_width,l_height;
     if (self.innerHeight) // all except Explorer
     {
         l_width = self.innerWidth;
         l_height = self.innerHeight;
     }
     else if (document.documentElement && document.documentElement.clientHeight)
         // Explorer 6 Strict Mode
     {
         l_width = document.documentElement.clientWidth;
         l_height = document.documentElement.clientHeight;
     }
     else if (document.body) // other Explorers
     {
         l_width = document.body.clientWidth;
         l_height = document.body.clientHeight;
     }
     
     g_Video_Screen_Width = l_width ;
     g_Video_Screen_Height = l_height;
     
     //g_Video_Screen_Width = nearest_width(l_width) ;
     //g_Video_Screen_Height = nearest_height(l_height);
     
 
     //alert("inner_width "+  l_width + "x" + l_height);
     //alert("screen " + screen.width + "x" + screen.height +  " vs inner "+  l_width + "x" + l_height + " => " + "MwSniffDisplayDimensions "+  nearest_width(l_width) + "x" + nearest_height(l_height));
 }
 
 
 // http://www.microsoft.com/windows/windowsmedia/howto/articles/NonSquarePixel.aspx
 // http://www.microsoft.com/windows/windowsmedia/howto/articles/PixelFrames.aspx
 
 
 
 var g_Video_Screen_Width = 640;
 var g_Video_Screen_Height = 480;
 
 if (parseInt(navigator.appVersion)>3) 
 {
  g_Video_Screen_Width = screen.width;
  g_Video_Screen_Height = screen.height;
 }
 else 
 if (navigator.appName == "Netscape" 
     && parseInt(navigator.appVersion)==3
     && navigator.javaEnabled()
    ) 
 {
  var jToolkit = java.awt.Toolkit.getDefaultToolkit();
  var jScreenSize = jToolkit.getScreenSize();
  g_Video_Screen_Width = jScreenSize.width;
  g_Video_Screen_Height = jScreenSize.height;
 }
 
 //self.menubar.visible=false;
 //self.toolbar.visible=false;
 //self.locationbar.visible=false;
 //self.personalbar.visible=false;
 //self.scrollbars.visible=false;
 //self.statusbar.visible=false; 
 
 
 // open the window as large as possible
 
 
 
 function MwMaximiseDisplay()
 {
 
     window.moveTo(0,0);
     if (document.all) 
     {
         top.window.resizeTo(screen.availWidth,screen.availHeight);
     } 
     else 
     if (document.layers || document.getElementById) 
     {           
         if (top.window.outerHeight < screen.availHeight ||top.window.outerWidth < screen.availWidth)
         {
             top.window.outerHeight = screen.availHeight;
             top.window.outerWidth = screen.availWidth;
         }
     }
 
 
     //g_Video_Screen_Width = document.body.clientWidth;
     //g_Video_Screen_Height = document.body.clientHeight;
 
     /*
     alert(
      "Screen width = "+g_Video_Screen_Width+" "
     +"Screen height = "+g_Video_Screen_Height
     );
     */
}

 
/*!\verbatim*/
//debugtext("* including javascript lib - $Id: widget.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");

/*!\endverbatim*/

/*! @brief If this is true, the widget lib will highlight all elements that it handles. This is handy for debuggins*/
var g_wl_show_highlight = false;


/*! \page vod_widget Widget

  \ref vod_widget_manual

  \ref vod_widget_requirements

  \ref vod_widget_design

*/






/*! \page vod_widget_requirements MWMCEJ-001 - Widget Requirements 

\section vod_widget_requirements_TITLE TITLE

Short Description

\section vod_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-July-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section vod_widget_requirements_ABSTRACT ABSTRACT

JavaScript Widget Requirements

\section vod_widget_requirements_DESCRIPTION DESCRIPTION

<p>The Massive Media Center Edition Javascript Library (MMCEJL) should provide an extensible framework in which MCE application can be developed..</p>

\section vod_widget_requirements_REQUIREMENTS REQUIREMENTS

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

\section vod_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section vod_widget_requirements_REFERENCES REFERENCES


\section vod_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page vod_widget_design MWMCEJ-001 - Widget Design


\section vod_widget_design_TITLE TITLE

Short Description

\section vod_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-July-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section vod_widget_design_ABSTRACT ABSTRACT

Description Abstract.

\section vod_widget_design_DESCRIPTION DESCRIPTION

<p>The Massive Media Center Edition Javascript Library (MMCEJL) provides extensible functionality 
</p>


\section vod_widget_design_DESIGN DESIGN

*/


/*! \page vod_widget_manual MWMCEJ-001 - Widget Manual


\section vod_widget_manual_TITLE TITLE

Short Description

\section vod_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-July-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section vod_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section vod_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section vod_widget_manual_DESIGN DESIGN

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
    //alert("* Widget_Create '" + p_wWidget.m_sName + "'");
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
    l_eDiv.style.visibility = "hidden";

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
        //alert("Widget_Position show " + p_wWidget.m_sName);
    
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
        //alert("Widget_Position hide " + p_wWidget.m_sName);
        
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
    //alert("* Widget_InitialPosition '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight + " (" + p_iTransparency + ")" );
    
    //Widget_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
    
    // save the position
    p_wWidget.m_iX = p_iX;
    p_wWidget.m_iY = p_iY;
    p_wWidget.m_iWidth = p_iWidth;
    p_wWidget.m_iHeight = p_iHeight;
    p_wWidget.m_iTransparency = p_iTransparency;     
}


/*!
    @fn         function Widget_SetMedia(p_wWidget,p_sMedia)
    @brief      Set the media element for this widget
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
    @fn         function Widget_SetPostTrajectory(p_wWidget,p_fFunction)
    @brief      This is out Widget base class's handler for f_Element_OnMouseOver
    @return     void
    @param      p_wWidget A reference to our widget
    @param      p_fFunction Function to call after trajectory complete
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_SetPostTrajectory(p_wWidget,p_fFunction)
{
    debugtext("* Widget_SetPostTrajectory '" + p_wWidget.m_sName);    
        
    p_wWidget.m_fPostTrajectory = p_fFunction;
}

/*!
    @fn         function Widget_SetPreTrajectory(p_wWidget,p_fFunction)
    @brief      This is out Widget base class's handler for f_Element_OnMouseOver
    @return     void
    @param      p_wWidget A reference to our widget
    @param      p_fFunction Function to before trajectory starts
    @author     James Mc Parlane
    @date       24 August 2004
*/
function Widget_SetPreTrajectory(p_wWidget,p_fFunction)
{
    debugtext("* Widget_SetPreTrajectory '" + p_wWidget.m_sName);    
        
    p_wWidget.m_fPreTrajectory = p_fFunction;
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
    
    p_vft.f_SetPreTrajectory = p_vft.parent.f_SetPreTrajectory;
    p_vft.f_SetPostTrajectory = p_vft.parent.f_SetPostTrajectory;
        
                    
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

    /* Trajectory Functions */
    this.f_SetPreTrajectory = Widget_SetPreTrajectory;
    this.f_SetPostTrajectory = Widget_SetPostTrajectory;
        
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
    
    // Trajectory prefix/postfixes
    this.m_fPreTrajectory = null;
    this.m_fPostTrajectory = null;

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
    //alert("Launch!");
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
        // If we have none in play, then start back at the top
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
    
    if (p_wWidget.m_fPreTrajectory)
    {
        p_wWidget.m_fPreTrajectory(p_wWidget);
        p_wWidget.m_fPreTrajectory = null;
    }
    
    //p_iSteps = 0;
    
    // if we want it in 0 steps then we move it right away
    if (p_iSteps == 0)
    {
        p_wWidget.vft.f_Position(p_wWidget,p_iFX,p_iFY,p_iFWidth,p_iFHeight,p_iFTransparency);

        // A quick move - we are finished- so call the        
        if (p_wWidget.m_fPostTrajectory)
        {
            //alert("p_wWidget.m_fPostTrajectory(p_wWidget);")
            p_wWidget.m_fPostTrajectory(p_wWidget);
            p_wWidget.m_fPostTrajectory = null;
        }        
    }
    else
    // If the ticker is not currently going
    if (!g_Widget_Trajectory_Ticker_On)
    {
        // start the new ticker
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
    
    // Start with a large value - we only use this if we have set this to a real delta
    var l_bNextTick = 1000000;
    
    // Clear the timer
    if (g_TrajectoryTimer)
    {
        clearTimeout(g_TrajectoryTimer);
    }
    
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
                    
                    // If we have a Pre Trajectory function, then call it
                    
                    if (l_wWidget.m_fPostTrajectory)
                    {
                        l_wWidget.m_fPostTrajectory(l_wWidget);
                        l_wWidget.m_fPostTrajectory = null;
                    }
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
        g_TrajectoryTimer = setTimeout("Widget_Trajectory_Ticker()",l_bNextTick);
    }
}

/****************************************************************************************************/


/* end of group vod_widget */
/*! @}*/
