/*! 

    $Id: widget_video_flash.js,v 1.1 2006/12/21 07:42:26 james Exp $

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
 * $Log: widget_video_flash.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.22  2005/10/20 03:22:11  james
 * Latest changes
 *
 * Revision 1.21  2005/10/06 07:42:27  james
 * Added buffering
 *
 * Revision 1.20  2005/09/27 06:54:48  james
 * Latest changes - adding buffering widget
 *
 * Revision 1.19  2005/09/09 23:45:46  james
 * Deployed version.
 *
 * Revision 1.18  2005/09/09 13:37:58  james
 * Morified widget system so that animations can occur in 0 steps
 * Dealt with issue in Schedule that emerged because of this
 * Added ability to have pre and post trajectory callbacks on widgets
 * Fixed bug in 16x9 code.
 *
 * Revision 1.17  2005/09/08 06:02:10  james
 * Release version for Thursday
 *
 * Revision 1.16  2005/09/08 05:00:16  james
 * Getting ready for Thursday deployment
 *
 * Revision 1.15  2005/09/07 11:09:04  james
 * Praparing for Thursday deployment.
 *
 * Revision 1.14  2004/12/03 07:11:29  james
 * Latest changes - all working
 *
 * Revision 1.13  2004/12/01 05:47:08  james
 * Integrated screens.
 *
 * Revision 1.12  2004/11/29 07:28:25  james
 * Scaling behavior back to something that is usable in production.
 *
 * Revision 1.11  2004/11/29 03:35:24  james
 * Enabled SMPTE code to be faked in javascript
 *
 * Revision 1.10  2004/11/18 02:11:58  james
 * Latest updates - getting ready for deployed version.
 *
 * Revision 1.9  2004/11/17 02:15:35  james
 * *** empty log message ***
 *
 * Revision 1.8  2004/11/13 06:37:41  james
 * Added time shifting.
 *
 * Revision 1.7  2004/11/11 06:42:39  james
 * Animating transitions.
 *
 * Revision 1.6  2004/11/11 04:25:53  james
 * Added Transparency as a dimension.
 *
 * Revision 1.5  2004/11/11 02:04:46  james
 * Adding Marquee
 *
 * Revision 1.4  2004/11/10 07:34:03  james
 * Added Marquee Widget type
 *
 * Revision 1.3  2004/11/09 07:33:35  james
 * More progress.
 * Created transparancy effects.
 * Layout engine.
 * Remote control handling.
 *
 * Revision 1.2  2004/11/08 05:48:20  james
 * Adding simple flash control.
 *
 * Revision 1.1  2004/11/08 04:52:46  james
 * Created Windows Media Center Edition control.
 *
 * Revision 1.2  2004/11/04 01:27:52  james
 * Simple Media Player 9 control.
 *
 * Revision 1.1  2004/11/04 00:39:46  james
 * Revamped WidgetLib for WMCE
 *
 */


/*! \defgroup video_Flash_widget Flash Movie Widget
 *@{
 */
 
/*!\verbatim*/ 
//debugtext("* including javascript lib - $Id: widget_video_flash.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");
/*!\endverbatim*/

/*! \page video_Flash_widget Flash Movie Widget
  

  \ref video_Flash_widget_manual

  \ref video_Flash_widget_requirements

  \ref video_Flash_widget_design

*/


/*! \page video_Flash_widget_requirements MWMCEJ-003 - Flash Movie Widget Requirements 


\section video_Flash_widget_requirements_TITLE TITLE

Video On Demand Jukebox Widget

\section video_Flash_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_Flash_widget_requirements_ABSTRACT ABSTRACT

Javascript library to encapsulate Video On Demand Widget.

\section video_Flash_widget_requirements_DESCRIPTION DESCRIPTION

\section video_Flash_widget_requirements_REQUIREMENTS REQUIREMENTS

Full listing of what this needs to be able to do..

\section video_Flash_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section video_Flash_widget_requirements_REFERENCES REFERENCES


\section video_Flash_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page video_Flash_widget_design MWMCEJ-003 - Flash Movie Widget Design


\section video_Flash_widget_design_TITLE TITLE

Dragable Flash Animation Widget

\section video_Flash_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_Flash_widget_design_ABSTRACT ABSTRACT

\section video_Flash_widget_design_DESCRIPTION DESCRIPTION

\section video_Flash_widget_design_DESIGN DESIGN

*/


/*! \page video_Flash_widget_manual MWMCEJ-003 - Flash Movie Widget Manual


\section video_Flash_widget_manual_TITLE TITLE

Dragable Flash Animation Widget

\section video_Flash_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_Flash_widget_manual_ABSTRACT ABSTRACT

\section video_Flash_widget_manual_DESCRIPTION DESCRIPTION

\section video_Flash_widget_manual_DESIGN DESIGN

*/

/**
    @fn             function Video_Flash_CreatePlayer(p_objectName,p_divTargetName,p_swfFileName)
    @param          p_objectName
    @param          p_divTargetName the div this will be placed in
    @return         void
    @brief          Animate the NowPlaying popup and scroll its elements into place ready for user interaction
    @author         James Mc Parlane
    @date           19 June 2002
*/
function Video_Flash_CreatePlayer(p_WidgetName,p_objectName,p_divTargetName,p_swfFileName)
{
    // Get our div
    var l_div_dynElement = document.getElementById(p_divTargetName);
    
    var l_embed = "<embed ";
    
    l_embed += "id='" + p_objectName + "' ";
    l_embed += "pluginspage='" + "http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" + "' ";
    l_embed += "type='" + "application/x-shockwave-flash" + "' ";
    l_embed += "width='" + "100%" + "' ";
    l_embed += "height='" + "100%" + "' ";    
    l_embed += "src='" + p_swfFileName + "' ";
    l_embed += "base='" + g_File_Flash + "' ";
    l_embed += "SWLIVECONNECT='" + "true" + "' ";
    l_embed += "PLAY='" + "false" + "' ";
    
    if (g_SFX)
    {   
	    l_embed += "wMode='" + "opaque" + "' ";
    }
    
    l_embed += ">";

	// Generate script for fscommand listener    
	var l_fshandler = "<SCRIPT event=FSCommand(command,args) for="+ p_objectName + ">flash" + p_WidgetName + "Player_DoFSCommand(command, args);</SCRIPT>";    
	
	// Write it out into the document
    l_div_dynElement.innerHTML = l_embed + l_fshandler; 
   
  
    /*
    var oNewNode1 = null;
    var oNewNode2 = null;
    var oNewNode3 = null;
        
    oNewNode1 = document.createElement("embed");
    oNewNode1.setAttribute("id",p_objectName);
    oNewNode1.setAttribute("pluginspage","http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash");
    oNewNode1.setAttribute("type","application/x-shockwave-flash");
    oNewNode1.setAttribute("width","100%");
    oNewNode1.setAttribute("height","100%");
    oNewNode1.setAttribute("src",p_swfFileName);
    oNewNode1.setAttribute("base",g_File_Flash);
    oNewNode1.setAttribute("SWLIVECONNECT","true"); 

    if (g_SFX)
    {   
        oNewNode1.setAttribute("wMode","opaque");
    }
        
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
    */
         
}

/*!
    @fn         function send2Flash(p_objectName, p_Params)
    @brief      Make a live connect call to a SWF
    @return     void
    @param      p_sName The name of our widget.
    @author     James Mc Parlane
    @date       24 July 2002
*/
function send2Flash(p_objectName, p_Params)
{
    document.getElementById(p_objectName).SetVariable('System.externalFunction.call', p_Params);
}

/*!
    @fn         function doCall( swfId, what)
    @brief      Make a live connect call to a SWF
    @return     void
    @param      p_sName The name of our widget.
    @author     James Mc Parlane
    @date       24 July 2002
*/
function doCall( swfId, what)
{
    //alert(swfId + " " +  what);
    
    if (document.getElementById(swfId) != null)
    {
        document.getElementById(swfId).SetVariable('System.externalFunction.call', what);
    }
}


        /*!
            @fn         function Flash_Common_WMP9_Name(p_wWidget)
            @brief      Return the name of the player object of this widget
            @return     String the name of the player object of this widget
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002
        */
        
        function Video_Flash_Common_Flash_Name(p_wWidget)
        {       
            return "flash" + p_wWidget.m_sName + "Player";
        }


        /************************************************************************/
        /*                                                                      */
        /*                     Define Video Class                            */


        /*!
            @fn         function Video_Flash_Open(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_Flash_Open(p_wWidget)
        {
            //debugtext("* Video_Flash_Open '" + p_wWidget.m_sName + "'");            

            /* Call the parents version of f_Open via the virtual function table. */

	        Video_Open(p_wWidget);

            //
            // Flash elements will not run if they are not visible - we need to 
            // allow the elements to start up
            //
            
			// get a handle to our div
			var l_eDiv = Widget_Common_GetDIV(p_wWidget); 
		        
			// make it visible
			l_eDiv.style.visibility = "visible";
        }
        
        /*!
            @fn         function Video_Flash_SendMessage(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_sMessage Message to send to LiveConnect
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can capture clicks for our custom 
            focusable element button"Guide" button, which should open the guide when clicked.
        */
        function Video_Flash_Ready(p_wWidget)
        {
            //alert("* Video_Flash_Ready '" + p_wWidget.m_sName + "'");
            
			// get a handle to our div
			var l_eDiv = Widget_Common_GetDIV(p_wWidget); 

			// If we need to be visble - then be visible		        
			if (p_wWidget.m_iTransparency == 0)
			{		        
				// make it visible
				l_eDiv.style.visibility = "hidden";
			}
			else
			{
				// make it visible
				l_eDiv.style.visibility = "visible";			
			}
        }        
        

        /*!
            @fn         function Video_Flash_Create(p_wWidget)
            @brief      This creates the the flash emebed code withing the HTML
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_Flash_Create(p_wWidget)
        {
            //debugtext("* Video_Flash_Create '" + p_wWidget.m_sName + "'");          

            // Call the parents version of f_Open via the virtual function table.
            Video_Create(p_wWidget);
            
			// Create the player object
            Video_Flash_CreatePlayer(
                p_wWidget.m_sName,
                Video_Flash_Common_Flash_Name(p_wWidget),                 
                "div" + p_wWidget.m_sName + "_VideoOut",
                p_wWidget.m_sMedia);
        }       

        /*!
            @fn         function Video_Flash_Activate(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can make our custom 
            focusable element "Guide" button focusable.
        */
        function Video_Flash_Activate(p_wWidget)
        {
            //debugtext("* Video_Flash_Activate '" + p_wWidget.m_sName + "'");            
                
            /* call the parents version of f_Activate via the virtual function table*/
            Video_Activate(p_wWidget);
        }

        /*!
            @fn         function Video_Flash_Element_OnClick(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can capture clicks for our custom 
            focusable element button"Guide" button, which should open the guide when clicked.
        */
        function Video_Flash_Element_OnClick(p_wWidget,p_eElement)
        {
            //debugtext("* Video_Flash_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");

            /*  bubble the call down to the parents version of Video_Flash_Element_OnClick 
                via the virtual function table*/

            //debugtext("* try the parent to see if it responds to any of these");
            p_wWidget.vft.parent.f_Element_OnClick(p_wWidget,p_eElement);

        }

        /*!
            @fn         function Video_Flash_SendMessage(p_wWidget,p_eElement)
            @brief      This is out Video implementation of f_Element_OnClick
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_sMessage Message to send to LiveConnect
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Video so we can capture clicks for our custom 
            focusable element button"Guide" button, which should open the guide when clicked.
        */
        function Video_Flash_SendMessage(p_wWidget,p_sMessage)
        {
            //debugtext("* Video_Flash_SendMessage '" + p_wWidget.m_sName + "' message '" + p_sMessage + "'");
            
            doCall(Video_Flash_Common_Flash_Name(p_wWidget),p_sMessage);
        }

        /*!
            @fn         function  Video_Flash_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
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
        */      
        function  Video_Flash_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
        {
            var l_divVideoOut = document.getElementById("div" + p_wWidget.m_sName + "_VideoOut");
        
            // Play on transition from Invisible to visible
            if ((p_wWidget.m_iTransparency == 0) && (p_iTransparency != 0)) 
            {
                // transition from invisible to visible
                
                //alert(p_wWidget.m_sName + " setMovieState,play");
                doCall(Video_Flash_Common_Flash_Name(p_wWidget),'setMovieState,play');                
            }
            else
            // Stop on transition from Visible to Invisible
            if ((p_wWidget.m_iTransparency != 0 ) && (p_iTransparency == 0)) 
            {
                // transition from visible to invisible
                
                //alert(p_wWidget.m_sName + " setMovieState,stop");       
                doCall(Video_Flash_Common_Flash_Name(p_wWidget),'setMovieState,stop');
            }  
            
            if ((p_iWidth != p_wWidget.m_iWidth) || (p_iHeight != p_wWidget.m_iHeight))
            {
				//doCall(Video_Flash_Common_Flash_Name(p_wWidget),'onResize,' + parseInt(p_iWidth) + ',' + parseInt(p_iHeight));
			}
            
            // Change in browser
            Video_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
            
            
            
        
            //debugtext("* Video_Flash_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );
            
            
            l_divVideoOut.style.left = 0;
            l_divVideoOut.style.right = 0;          
            l_divVideoOut.style.width = p_iWidth;
            l_divVideoOut.style.height = p_iHeight; 
            
            
            
            //alert('onResize,' + parseInt(p_iWidth) + ',' + parseInt(p_iHeight));            
            // Now tell the flash to pick up the DIV size change
            
            
                        
/*                  
            var l_flashPlayer = document.getElementById(Video_Flash_Common_Flash_Name(p_wWidget));
            

            if (l_flashPlayer != null)
            {
                //alert("setflash " + p_iWidth + "x" + p_iHeight);
                l_flashPlayer.width = p_iWidth;
                l_flashPlayer.height = p_iHeight;
            }           
            else
            {
                alert("noflash");           
            }
*/          
            
        }   

        /*!
            @fn         function Class_VideoFlash_VFTBL()
            @brief      This function populates our virtual function table
            @return     void
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_VideoFlash_VFTBL()
        {
            //debugtext("+ creating virtual function table for Video");

            /* we inherit from widget*/
            this.parent = g_Class_Video_VFTBL;

            /* inherit functions from our parent*/
            Class_Video_Inherit(this);

            /* register functions that Video implements*/   
            this.f_Open = Video_Flash_Open;
            this.f_Create = Video_Flash_Create;
            this.f_Activate = Video_Flash_Activate;
            this.f_Element_OnClick = Video_Flash_Element_OnClick;
            this.f_Position = Video_Flash_Position;         
            this.f_SendMessage = Video_Flash_SendMessage;
            
            this.f_Ready = Video_Flash_Ready;
        }

        /*!
            @fn         function Class_VideoFlash_Inherit(p_vft)
            @brief      This will initalise p_vft from its parent's virtial function table
            @return     void
            @param      p_vft A reference to our widgets virtual function table.
            @author     James Mc Parlane
            @date       24 August 2004
        */
        function Class_VideoFlash_Inherit(p_vft)
        {
            //debugtext("+ Class_VideoMCE_Inherit");
            
            //debugtext("* populate vft from parent");
                        
            Class_Video_Inherit(p_vft);
                    
            //debugtext("- Class_VideoFlash_Inherit");
        }       


        /*!
            @fn         function Class_VideoFlash(p_sName,p_iDepth)
            @brief      This is our Video base class
            @return     void
            @param      p_sName The name of our widget.
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_VideoFlash(p_sName)
        {       
            /* Initalise all our members by inheriting from Widget*/            
            this.base = Class_Video;
            this.base(p_sName);

            /* Point to Video's virtual function pointer table */
            this.vft = g_Class_VideoFlash_VFTBL;            
            
            /* Make this object draggable*/         
            this.m_bDraggable = true;   
            
            /* because of issues with fscommand and dynamic generation - if we want fscommand we have to create this during html parse - no via onload()*/
            this.m_bDynamicCreate = false;
        }

        /*                                                                      */
        /*                                                                      */
        /************************************************************************/


        /* Create the virtual function table for our Video Class*/
/*!\verbatim*/      
        //debugtext("* creating g_Class_VideoFlash_VFTBL");
/*!\endverbatim*/               
        var g_Class_VideoFlash_VFTBL = new Class_VideoFlash_VFTBL();


/* end of group video_Flash_widget */
/*! @}*/
