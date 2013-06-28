/*! 

    $Id: widget_video_mce.js,v 1.1 2006/12/21 07:42:26 james Exp $

    FILE:       @file xml.js
              
    AUTHOR:     James Mc Parlane

    PROJECT:    Windows Media Center Javascript Library

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

/*
 * $Log: widget_video_mce.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.13  2005/10/07 22:36:56  james
 * Before Modifcation - looking for possible crash in some MCE Systems
 *
 * Revision 1.12  2005/09/09 23:45:46  james
 * Deployed version.
 *
 * Revision 1.11  2005/09/08 05:00:16  james
 * Getting ready for Thursday deployment
 *
 * Revision 1.10  2005/08/17 06:47:14  james
 * Stopping javascript from throwing an error under WMC2005
 *
 * Revision 1.9  2004/12/03 07:11:29  james
 * Latest changes - all working
 *
 * Revision 1.8  2004/12/01 05:47:09  james
 * Integrated screens.
 *
 * Revision 1.7  2004/11/29 03:35:24  james
 * Enabled SMPTE code to be faked in javascript
 *
 * Revision 1.6  2004/11/13 06:37:41  james
 * Added time shifting.
 *
 * Revision 1.5  2004/11/11 06:30:10  james
 * Animating transitions.
 *
 * Revision 1.4  2004/11/11 04:25:53  james
 * Added Transparency as a dimension.
 *
 * Revision 1.3  2004/11/10 07:34:03  james
 * Added Marquee Widget type
 *
 * Revision 1.2  2004/11/09 07:33:35  james
 * More progress.
 * Created transparancy effects.
 * Layout engine.
 * Remote control handling.
 *
 * Revision 1.1  2004/11/08 04:52:46  james
 * Created Windows Media Center Edition control.
 */


/*! \defgroup video_MCE_widget Windows Media Center Video Widget
 *@{
 */
 
/*!\verbatim*/ 
//debugtext("* including javascript lib - $Id: widget_video_mce.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");
/*!\endverbatim*/

var g_MCE_Debug_Remote = false;
var g_MCE_Debug_Playstate = false;
var g_MCE_Debug_ScaleEvent = false;
var g_MCE_Debug_MediaPosition = false;

/*! \page video_MCE_widget Windows Media Center Video Widget
  

  \ref video_MCE_widget_manual

  \ref video_MCE_widget_requirements

  \ref video_MCE_widget_design

*/


/*! \page video_MCE_widget_requirements MWMCEJ-004 - Windows Media Center Video Widget Requirements 


\section video_MCE_widget_requirements_TITLE TITLE

Dragable Windows Media Center Video Widget

\section video_MCE_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_MCE_widget_requirements_ABSTRACT ABSTRACT

\section video_MCE_widget_requirements_DESCRIPTION DESCRIPTION

\section video_MCE_widget_requirements_REQUIREMENTS REQUIREMENTS

\section video_MCE_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section video_MCE_widget_requirements_REFERENCES REFERENCES


\section video_MCE_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page video_MCE_widget_design MWMCEJ-004 - Windows Media Center Video Widget Design


\section video_MCE_widget_design_TITLE TITLE

Dragable Windows Media Center Video Widget

\section video_MCE_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_MCE_widget_design_ABSTRACT ABSTRACT

\section video_MCE_widget_design_DESCRIPTION DESCRIPTION

\section video_MCE_widget_design_DESIGN DESIGN

*/



/*! \page video_MCE_widget_manual MWMCEJ-004 - Windows Media Center Video Widget Manual


\section video_MCE_widget_manual_TITLE TITLE

Short Description

\section video_MCE_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_MCE_widget_manual_ABSTRACT ABSTRACT

\section video_MCE_widget_manual_DESCRIPTION DESCRIPTION

\section video_MCE_widget_manual_DESIGN DESIGN

*/


        /************************************************************************/
        /*                                                                      */
        /*                     Define Video Class                            */


        /*!
            @fn         function Video_MCE_Open(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_MCE_Open(p_wWidget)
        {
            //debugtext("* Video_MCE_Open '" + p_wWidget.m_sName + "'");            

            /* call the parents version of f_Open via the virtual function table*/
            Video_Open(p_wWidget);
        }
        
        /*!
            @fn         function Video_MCE_Create(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

        */
        function Video_MCE_Create(p_wWidget)
        {
            //debugtext("* Video_MCE_Create '" + p_wWidget.m_sName + "'");          

            /* call the parents version of f_Open via the virtual function table*/
            Video_Create(p_wWidget);
        }
        

        /*!
            @fn         function Video_MCE_Activate(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can make our custom 
            focusable element "Guide" button focusable.
        */
        function Video_MCE_Activate(p_wWidget)
        {
            //debugtext("* Video_MCE_Activate '" + p_wWidget.m_sName + "'");            
                
            /* call the parents version of f_Activate via the virtual function table*/
            Video_Activate(p_wWidget);
        }


        /*!
            @fn         function Video_MCE_Element_OnClick(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can capture clicks for our custom 
            focusable element button"Guide" button, which should open the guide when clicked.
        */
        function Video_MCE_Element_OnClick(p_wWidget,p_eElement)
        {
            //debugtext("* Video_MCE_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");

            /*  bubble the call down to the parents version of Video_MCE_Element_OnClick 
                via the virtual function table*/

            //debugtext("* try the parent to see if it responds to any of these");
            p_wWidget.vft.parent.f_Element_OnClick(p_wWidget,p_eElement);           
        }
                

        /*!
            @fn         function  Video_MCE_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
            @brief      
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_iX The new X position
            @param      p_iY The new Y position
            @param      p_iWidth The new Width
            @param      p_iHeight The new Height
            @param      p_iTransparency The new Transparency
            
            @author     James Mc Parlane
            @date       24 July 2004
            
            This function should be called when you want the Widget to be 'Opened' (made visible). If you override this 
            function you should call the base class version after you make all the elements in your widget visible. 
        */      
        function  Video_MCE_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
        {           
            Video_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
        
            //debugtext("* Video_MCE_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );

            
            // Set the media center viewport
            if (g_UseMCE)           
            {
                try
                {           					
                    var rc = window.external.MediaCenter.CustomViewPort.Rectangle;
                    rc.Left = p_iX;
                    rc.Top = p_iY;
                    rc.Width = p_iWidth;
                    rc.Height = p_iHeight;
                    window.external.MediaCenter.CustomViewPort.Rectangle = rc;              
                }               
                catch(l_e)
                {
                }
            }
            //window.external.MediaCenter.CustomViewPort.Visible = true;
        }   


        /*!
            @fn         function Class_VideoMCE_VFTBL()
            @brief      This function populates our virtual function table
            @return     void
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_VideoMCE_VFTBL()
        {
            //debugtext("+ creating virtual function table for Video");

            /* we inherit from widget*/
            this.parent = g_Class_Video_VFTBL;

            /* inherit functions from our parent*/
            Class_Video_Inherit(this);

            /* register functions that Video implements*/   
            this.f_Open = Video_MCE_Open;
            this.f_Create = Video_MCE_Create;
            this.f_Activate = Video_MCE_Activate;
            this.f_Element_OnClick = Video_MCE_Element_OnClick;
            this.f_Position = Video_MCE_Position;           
        }

        /*!
            @fn         function Class_VideoWMP9_Inherit(p_vft)
            @brief      This will initalise p_vft from its parent's virtial function table
            @return     void
            @param      p_vft A reference to our widgets virtual function table.
            @author     James Mc Parlane
            @date       24 August 2004
        */
        function Class_VideoMCE_Inherit(p_vft)
        {
            //debugtext("+ Class_VideoMCE_Inherit");
            
            //debugtext("* populate vft from parent");
                        
            Class_Video_Inherit(p_vft);
                    
            //debugtext("- Class_VideoMCE_Inherit");
        }       


        /*!
            @fn         function Class_VideoMCE(p_sName,p_iDepth)
            @brief      This is our Video base class
            @return     void
            @param      p_sName The name of our widget.
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_VideoMCE(p_sName)
        {       
            /* Initalise all our members by inheriting from Widget*/            
            this.base = Class_Video;
            this.base(p_sName);

            /* Point to Video's virtual function pointer table */
            this.vft = g_Class_VideoMCE_VFTBL;          
            
            /* Make this object draggable*/         
            this.m_bDraggable = true;                       
        }

        /*                                                                      */
        /*                                                                      */
        /************************************************************************/


        /* Create the virtual function table for our Video Class*/
/*!\verbatim*/      
        //debugtext("* creating g_Class_VideoMCE_VFTBL");
/*!\endverbatim*/               
        var g_Class_VideoMCE_VFTBL = new Class_VideoMCE_VFTBL();
        
    
/*      
function onRemoteEvent(keyChar)
{
    try
    {
    
        if (g_MCE_Debug_Remote)
        {    
            var l_inputMCEkeytest = document.getElementById("inputMCEkeytest");
            
            l_inputMCEkeytest.value = 0 + keyChar;
        }
        
        //  In your HTML application, you can provide additional functionality to the BACK 
        //  button by adding a function call to this case, and you can prevent Media Center 
        //  from navigating back by returning <B>true</B>. (However, this behavior may be 
        //  contrary to your user's expectations.)
                
        switch(keyChar)
        {
            case 166:
            {
                MediaCenter.CloseApplication();
                return true;
            }
            break;
            
            default:
            {
                return true;
            }
            break;
        }
                    
        
    
    }
    catch(ex)
    {
        //debugtext("onRemoteEvent(" + keyChar + ")", ex);
    }
}
*/

/*
function onPlayStateChange()
{
    //debugtext("onPlayStateChange " + window.external.MediaCenter.Experience.PlayRate);

    if (g_MCE_Debug_Playstate)  
    {
        var l_inputMCEplaystate = document.getElementById("inputMCEplaystate");     
        l_inputMCEplaystate.value = "onPlayStateChange " + window.external.MediaCenter.Experience.PlayRate;
    }   
}

function onScaleEvent(ScaleAmount)
{
    //debugtext("onScaleEvent");

    if (g_MCE_Debug_ScaleEvent) 
    {
        var l_inputMCEscaleevent = document.getElementById("inputMCEscaleevent");       
        l_inputMCEscaleevent.value = "onScaleEvent";
    }   

}
*/

/*
function HideCustomViewPort()
{
    //debugtext("HideCustomViewPort");
    
    return false;
}
*/

if (IsMCEEnabled())
{   
    if (g_MCE_Debug_Remote)
    {
        document.write("<input id='inputMCEkeytest' name='inputMCEkeytest' type='text' value='keytest'>");
    }

    if (g_MCE_Debug_Playstate)
    {
        document.write("<input id='inputMCEplaystate' name='inputMCEplaystate' type='text' value='playstate'>");
    }
    
    if (g_MCE_Debug_ScaleEvent)
    {
        document.write("<input id='inputMCEscaleevent' name='inputMCEscaleevent' type='text' value='scaleevent'>");
    }
    
    if (g_MCE_Debug_MediaPosition)
    {
        document.write("<input id='inputMCEMediaPosition' name='inputMCEMediaPosition' type='text' value='MediaPosition'>");
    }

    if (g_UseMCE)
    {
        // wire us up
        //window.external.MediaCenter.onRemoteEvent = onRemoteEvent;

        // wire us up
        //window.external.MediaCenter.onPlayStateChange = onPlayStateChange;

        // wire us up
        //window.external.MediaCenter.onScaleEvent = onScaleEvent;
    }

    // wire us up
    //window.external.MediaCenter.HideCustomViewPort = HideCustomViewPort;
}


function WMCGetPlayRate()
{
    try
    {
        if (window.external.MediaCenter)
        {
            return window.external.MediaCenter.Experience.PlayRate;
        }
    }
    catch(l_e)
    {
    
    }
    
    return 0;
}

/* end of group video_MCE_widget */
/*! @}*/
