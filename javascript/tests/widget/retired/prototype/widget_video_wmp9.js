/*! 

    $Id: widget_video_wmp9.js,v 1.1 2006/12/21 07:42:26 james Exp $

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
 * $Log: widget_video_wmp9.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.14  2005/09/09 23:45:46  james
 * Deployed version.
 *
 * Revision 1.13  2005/09/09 21:54:32  james
 * Latest fixes.
 * Fixed issue in screen resize.
 * FIxed issue in back key with remote and  flash interaction.
 *
 * Revision 1.12  2005/09/09 13:37:58  james
 * Morified widget system so that animations can occur in 0 steps
 * Dealt with issue in Schedule that emerged because of this
 * Added ability to have pre and post trajectory callbacks on widgets
 * Fixed bug in 16x9 code.
 *
 * Revision 1.11  2004/12/04 03:44:08  james
 * Fixed bug in video control
 *
 * Revision 1.10  2004/12/04 01:36:33  james
 * Looking for bug in telemetry sync
 *
 * Revision 1.9  2004/12/01 05:47:09  james
 * Integrated screens.
 *
 * Revision 1.8  2004/11/29 03:35:24  james
 * Enabled SMPTE code to be faked in javascript
 *
 * Revision 1.7  2004/11/13 06:37:41  james
 * Added time shifting.
 *
 * Revision 1.6  2004/11/11 04:25:53  james
 * Added Transparency as a dimension.
 *
 * Revision 1.5  2004/11/11 02:04:46  james
 * Adding Marquee
 *
 * Revision 1.4  2004/11/10 07:34:04  james
 * Added Marquee Widget type
 *
 * Revision 1.3  2004/11/09 07:33:35  james
 * More progress.
 * Created transparancy effects.
 * Layout engine.
 * Remote control handling.
 *
 * Revision 1.2  2004/11/04 01:27:52  james
 * Simple Media Player 9 control.
 *
 * Revision 1.1  2004/11/04 00:39:46  james
 * Revamped WidgetLib for WMCE
 *
 */


/*! \defgroup video_WMP9_widget Windows Media Player Video Widget
 *@{
 */
 
/*!\verbatim*/ 
//debugtext("* including javascript lib - $Id: widget_video_wmp9.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");
/*!\endverbatim*/

/*! \page video_WMP9_widget Windows Media Player Video Widget
  

  \ref video_WMP9_widget_manual

  \ref video_WMP9_widget_requirements

  \ref video_WMP9_widget_design

*/


/*! \page video_WMP9_widget_requirements MWMCEJ-005 - Windows Media Player Video Widget Requirements 


\section video_WMP9_widget_requirements_TITLE TITLE

Dragable Windows Media Player Video Widget

\section video_WMP9_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_WMP9_widget_requirements_ABSTRACT ABSTRACT

\section video_WMP9_widget_requirements_DESCRIPTION DESCRIPTION

\section video_WMP9_widget_requirements_REQUIREMENTS REQUIREMENTS

Full listing of what this needs to be able to do..

\section video_WMP9_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section video_WMP9_widget_requirements_REFERENCES REFERENCES


\section video_WMP9_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page video_WMP9_widget_design MWMCEJ-004 - Windows Media Player Video Widget Design


\section video_WMP9_widget_design_TITLE TITLE

Dragable Windows Media Player Video Widget

\section video_WMP9_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_WMP9_widget_design_ABSTRACT ABSTRACT

Description Abstract.

\section video_WMP9_widget_design_DESCRIPTION DESCRIPTION

Full description

\section video_WMP9_widget_design_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



/*! \page video_WMP9_widget_manual MWMCEJ-004 - Windows Media Player Video Widget Manual


\section video_WMP9_widget_manual_TITLE TITLE

Short Description

\section video_WMP9_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_WMP9_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section video_WMP9_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section video_WMP9_widget_manual_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/


/**
    @fn             function createElementWMP(objWMP, intWMPWidth, intWMPHeight, p_divTargetName)
    @param          objWMP
    @param          intWMPWidth
    @param          intWMPHeight
    @param          p_divTargetName the div this will be placed in
    @return         void
    @brief          Animate the NowPlaying popup and scroll its elements into place ready for user interaction
    @author         James Mc Parlane
    @date           19 June 2002
*/
function Video_WMP9_CreatePlayer(objWMP, intWMPWidth, intWMPHeight, p_divTargetName)
{
    var oNewNode1 = null;
    var oNewNode2 = null;
    var oNewNode3 = null;
        
    // Create tag : <object>
    oNewNode1 = document.createElement("object");
    oNewNode1.setAttribute("classid","CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6");

    oNewNode1.setAttribute("id",objWMP);
    oNewNode1.setAttribute("name",objWMP);
    oNewNode1.setAttribute("width",intWMPWidth);
    oNewNode1.setAttribute("height",intWMPHeight);
    
    oNewNode1.setAttribute("uiMode","none");    
    oNewNode1.setAttribute("stretchToFit","true");
    oNewNode1.setAttribute("mute","true");
    
    if (g_SFX)
    {
        oNewNode1.setAttribute("windowlessVideo","true");       
    }

    // Create tag : <param>
    oNewNode2 = document.createElement("param");
    oNewNode2.setAttribute("name","URL");
    oNewNode2.setAttribute("value",objWMP);

    // Combine.
    oNewNode1.appendChild(oNewNode2);

    // Remove Windows Media Player interface elements.
    // Create tag : <param>
    oNewNode3 = document.createElement("param");
    oNewNode3.setAttribute("name","uiMode"); // IE ignore the param version
    oNewNode3.setAttribute("value","none");

    // Combine.
    oNewNode1.appendChild(oNewNode3);
    
    // Get our div
    var l_div_dynElement = document.getElementById(p_divTargetName);

    // Get the first child of the div
    
    var oChild = l_div_dynElement.firstChild;
    
    // RemoveAll() removes attributes - so this is slower, but means we don't have uwanted side effects
    while(oChild != null)
    {
        // Replace contents of divName with our dynamicaly generated content
    
        l_div_dynElement.removeChild(oChild);
        
        oChild = l_div_dynElement.firstChild;
    }
    
    l_div_dynElement.appendChild(oNewNode1);
}



function wmpStop(p_wWidget) // Stop
{           
        //alert("wmpStop");
        try
        {
            var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));
                                                                                                                    
            if (l_wmpPlayer.controls.isAvailable('Stop'))
            {
                //alert("stop() available");
                l_wmpPlayer.controls.stop();
                //alert("stop()");
            }
        }
        catch(e)
        {
            // this may happen if the WMP is not ready, or has been removed by another process
            alert("wmpStop failed");
        }                               
}

function wmpSetURLAndPlay(p_wWidget)
{
        alert("wmpSetURLAndPlay");
        try
        {
            var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));
                      
            alert("setURL");     
			l_wmpPlayer.URL = p_wWidget.m_sMedia; 
			alert("setURL done");     
			                                                                                                                    
            //if (l_wmpPlayer.controls.isAvailable('Play'))
            //{
            //    //l_wmpPlayer.controls.play();
            //}
            //else
            //{
			//	alert("play() not available");
            //}
        }
        catch(e)
        {
            alert("wmpPlay failed");
            // this may happen if the WMP is not ready, or has been removed by another process
        }                               
}

function wmpPlay(p_wWidget) // Play.
{           
        //alert("wmpPlay");
        try
        {
            var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));
                                                                                                                    
            if (l_wmpPlayer.controls.isAvailable('Play'))
            {
                l_wmpPlayer.controls.play();
                //alert("play()");
            }
        }
        catch(e)
        {
            alert("wmpPlay failed");
            // this may happen if the WMP is not ready, or has been removed by another process
        }                               
}

function wmpReplay(p_wWidget,objValues) // Replay video.
{   
    wmpPlay(p_wWidget);
}

function wmpStatus(p_wWidget) // Pause.
{   
    try
    {           
        var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));                               
        return (l_wmpPlayer.status);
    }
    catch(e)
    {
        // this may happen if the WMP is not ready, or has been removed by another process
    }   
    
    return -1;            
}

function wmpURL(p_wWidget) // Pause.
{   
    try
    {           
        var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));                               
        return (l_wmpPlayer.URL);
    }
    catch(e)
    {
        // this may happen if the WMP is not ready, or has been removed by another process
    }   
    
    return "";            
}



function wmpPause(p_wWidget) // Pause.
{   
    try
    {           
        var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));                       
        if (l_wmpPlayer.controls.isAvailable('Pause'))
            l_wmpPlayer.controls.pause();
    }
    catch(e)
    {
        // this may happen if the WMP is not ready, or has been removed by another process
    }               
}

function wmpSetVideoBuffering(p_wWidget,buffering_val) // Set video buffering value.
{
    try
    {                                       
        var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));   
        l_wmpPlayer.network.bufferingTime = buffering_val;
    }
    catch(e)
    {
        alert("wmpSetVideoBuffering failed");
        // this may happen if the WMP is not ready, or has been removed by another process
    }   
}





        /*!
            @fn         function Video_Common_WMP9_Name(p_wWidget)
            @brief      Return the name of the player object of this widget
            @return     String the name of the player object of this widget
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002
        */
        
        function Video_Common_WMP9_Name(p_wWidget)
        {       
            //return "wmpPlayer";
            return "wmp" + p_wWidget.m_sName + "_Player";           
        }
        


        /************************************************************************/
        /*                                                                      */
        /*                     Define Video Class                            */


        /*!
            @fn         function Video_WMP9_Open(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_WMP9_Open(p_wWidget)
        {
            //debugtext("* Video_WMP9_Open '" + p_wWidget.m_sName + "'");         

            /* call the parents version of f_Open via the virtual function table*/
            Video_Open(p_wWidget);
            
            //Video_WMP9_Create(p_wWidget);
        }
        
        

        /*!
            @fn         function Video_WMP9_Create(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_WMP9_Create(p_wWidget)
        {
            //debugtext("* Video_WMP9_Create '" + p_wWidget.m_sName + "'");           

            /* call the parents version of f_Open via the virtual function table*/
            Video_Create(p_wWidget);
        
            // get a handle to our div
            var l_eDiv = Widget_Common_GetDIV(p_wWidget);           
                            
            var l_Video_Width = l_eDiv.style.pixelWidth;
            var l_Video_Height = l_eDiv.style.pixelHeight - p_wWidget.m_iDragBarHeight;

            Video_WMP9_CreatePlayer(Video_Common_WMP9_Name(p_wWidget), l_Video_Width, l_Video_Height, "div" + p_wWidget.m_sName + "_VideoOut");
            
            var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));   

            l_wmpPlayer.URL = p_wWidget.m_sMedia;   
            
            // Setup click handler
            //l_wmpPlayer.Click = WMP9Click;
        }       

        /*!
            @fn         function Video_WMP9_Activate(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can make our custom 
            focusable element "Guide" button focusable.
        */
        function Video_WMP9_Activate(p_wWidget)
        {
            //debugtext("* Video_WMP9_Activate '" + p_wWidget.m_sName + "'");         
                
            /* call the parents version of f_Activate via the virtual function table*/
            Video_Activate(p_wWidget);
        }


        /*!
            @fn         function Video_WMP9_Element_OnClick(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can capture clicks for our custom 
            focusable element button"Guide" button, which should open the guide when clicked.
        */
        function Video_WMP9_Element_OnClick(p_wWidget,p_eElement)
        {
            //debugtext("* Video_WMP9_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");

            //wmpPlayer.windowlessVideo = false;

            /*  bubble the call down to the parents version of Video_WMP9_Element_OnClick 
                via the virtual function table*/

            //debugtext("* try the parent to see if it responds to any of these");
            p_wWidget.vft.parent.f_Element_OnClick(p_wWidget,p_eElement);

        }
        
        /*!
            @fn         function Video_WMP9_Element_OnClick(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_bMute True if we want volume muted - false if we don't
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Video_WMP9_Mute(p_wWidget,p_bMute)
        {
            //debugtext("* Video_WMP9_Mute '" + p_wWidget.m_sName + "' mute '" + p_bMute + "'");

            //wmpPlayer.windowlessVideo = false;

            /*  bubble the call down to the parents version of Video_WMP9_Element_OnClick 
                via the virtual function table*/

                var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));   

                try
                {                                                   
                    l_wmpPlayer.settings.mute = p_bMute;
                }
                catch(e)
                {
                    // this may happen if the WMP is not ready, or has been removed by another process
                }


            //debugtext("* try the parent to see if it responds to any of these");
            //p_wWidget.vft.parent.f_Mute(p_wWidget,p_eElement);
        }               

        /*!
            @fn         function Video_WMP9_Element_OnClick(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_bMute True if we want volume muted - false if we don't
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Video_WMP9_Play(p_wWidget)
        {
            //alert("* Video_WMP9_Play '" + p_wWidget.m_sName);

            //wmpPlayer.windowlessVideo = false;

            /*  bubble the call down to the parents version of Video_WMP9_Element_OnClick 
                via the virtual function table*/

                var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));   

                try
                {       
					//alert(l_wmpPlayer.URL + " => " + p_wWidget.m_sMedia);												
                                                            
					if (l_wmpPlayer.controls.isAvailable('Stop'))
					{
						//alert("stop() available");
						l_wmpPlayer.controls.stop();
						//alert("stop()");
					}
					
					
                    //l_wmpPlayer.settings.mute = p_bMute;
					//alert("setURL");     
					l_wmpPlayer.URL = p_wWidget.m_sMedia; 
					//alert("setURL done");     
                    
                    /*                    
                    if (l_wmpPlayer.controls.isAvailable('Play'))
                    {                     
                        l_wmpPlayer.controls.play();
                        //alert("play()");
                    }                    
                    //alert("Video_WMP9_Play(p_wWidget)");
                    */
                }
                catch(e)
                {
                    // this may happen if the WMP is not ready, or has been removed by another process
                }


            //debugtext("* try the parent to see if it responds to any of these");
            //p_wWidget.vft.parent.f_Mute(p_wWidget,p_eElement);
        }   

        /*!
            @fn         function  Video_WMP9_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
            @brief      
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_iX The new X position
            @param      p_iY The new Y position
            @param      p_iWidth The new Width
            @param      p_iHeight The new Height
            
            @author     James Mc Parlane
            @date       24 July 2004
            
            This function should be called when you want the Widget to be 'Opened' (made visible). If you override this 
            function you should call the base class version after you make all the elements in your widget visible. 
        */      
        function  Video_WMP9_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
        {
            Video_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
        
            //debugtext("* Video_WMP9_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );
            
            var l_divVideoOut = document.getElementById("div" + p_wWidget.m_sName + "_VideoOut");
            
            l_divVideoOut.style.left = 0;
            l_divVideoOut.style.right = 0;          
            l_divVideoOut.style.width = p_iWidth;
            l_divVideoOut.style.height = p_iHeight; 
            
            var l_wmpPlayer = document.getElementById(Video_Common_WMP9_Name(p_wWidget));   
            
            if (l_wmpPlayer != null)
            {
                l_wmpPlayer.width = p_iWidth;
                l_wmpPlayer.height = p_iHeight;
            }
        }   


        /*!
            @fn         function Class_VideoWMP9_VFTBL()
            @brief      This function populates our virtual function table
            @return     void
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_VideoWMP9_VFTBL()
        {
            //debugtext("+ creating virtual function table for Video");

            /* we inherit from widget*/
            this.parent = g_Class_Video_VFTBL;

            /* inherit functions from our parent*/
            Class_Video_Inherit(this);

            /* register functions that Video implements*/   
            this.f_Open = Video_WMP9_Open;
            this.f_Create = Video_WMP9_Create;
            this.f_Activate = Video_WMP9_Activate;
            this.f_Element_OnClick = Video_WMP9_Element_OnClick;
            this.f_Position = Video_WMP9_Position;  
            this.f_Mute = Video_WMP9_Mute;      
            this.f_Play = Video_WMP9_Play;
        }

        /*!
            @fn         function Class_VideoWMP9_Inherit(p_vft)
            @brief      This will initalise p_vft from its parent's virtial function table
            @return     void
            @param      p_vft A reference to our widgets virtual function table.
            @author     James Mc Parlane
            @date       24 August 2004
        */
        function Class_VideoWMP9_Inherit(p_vft)
        {
            //debugtext("+ Class_VideoWMP9_Inherit");
            
            //debugtext("* populate vft from parent");
                        
            Class_Video_Inherit(p_vft);
                    
            //debugtext("- Class_VideoWMP9_Inherit");
        }       


        /*!
            @fn         function Class_VideoWMP9(p_sName,p_iDepth)
            @brief      This is our Video base class
            @return     void
            @param      p_sName The name of our widget.
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_VideoWMP9(p_sName)
        {       
            /* Initalise all our members by inheriting from Widget*/            
            this.base = Class_Video;
            this.base(p_sName);

            /* Point to Video's virtual function pointer table */
            this.vft = g_Class_VideoWMP9_VFTBL;         
            
            /* Make this object draggable*/         
            this.m_bDraggable = true;                       
        }

        /*                                                                      */
        /*                                                                      */
        /************************************************************************/


        /* Create the virtual function table for our Video Class*/
/*!\verbatim*/      
        //debugtext("* creating g_Class_VideoWMP9_VFTBL");
/*!\endverbatim*/               
        var g_Class_VideoWMP9_VFTBL = new Class_VideoWMP9_VFTBL();

/* end of group video_WMP9_widget */
/*! @}*/
