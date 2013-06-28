/*! 

    $Id: widget_video.js,v 1.1 2006/12/21 07:42:26 james Exp $

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
 * $Log: widget_video.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.13  2005/09/09 23:45:46  james
 * Deployed version.
 *
 * Revision 1.12  2005/09/09 14:41:25  james
 * Fixed issue with new help widget. Minor occlusion of help widget by video in 'FIT' mode
 *
 * Revision 1.11  2005/09/09 13:37:58  james
 * Morified widget system so that animations can occur in 0 steps
 * Dealt with issue in Schedule that emerged because of this
 * Added ability to have pre and post trajectory callbacks on widgets
 * Fixed bug in 16x9 code.
 *
 * Revision 1.10  2005/09/06 05:00:59  james
 * Latest changes
 *
 * Revision 1.9  2005/08/31 08:31:36  james
 * Modified code to detect screen dimensions more accurately - better performance in multi display systems
 *
 * Revision 1.8  2004/11/29 03:35:24  james
 * Enabled SMPTE code to be faked in javascript
 *
 * Revision 1.7  2004/11/13 06:37:40  james
 * Added time shifting.
 *
 * Revision 1.6  2004/11/11 04:25:53  james
 * Added Transparency as a dimension.
 *
 * Revision 1.5  2004/11/10 07:34:03  james
 * Added Marquee Widget type
 *
 * Revision 1.4  2004/11/09 07:33:35  james
 * More progress.
 * Created transparancy effects.
 * Layout engine.
 * Remote control handling.
 *
 * Revision 1.3  2004/11/05 06:29:15  james
 * Completed simple Media Player 9 control.
 * Fixed bugs in drag and drop.
 * Created simple trajectory system
 *
 * Revision 1.2  2004/11/04 01:27:52  james
 * Simple Media Player 9 control.
 *
 * Revision 1.1  2004/11/04 00:39:46  james
 * Revamped WidgetLib for WMCE
 *
 */


/*! \defgroup video_widget Video Widget
 *@{
 */
 
/*!\verbatim*/ 
//debugtext("* including javascript lib - $Id: widget_video.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");
/*!\endverbatim*/

/*! \page video_widget Video Widget
  
  \ref video_widget_manual

  \ref video_widget_requirements

  \ref video_widget_design

*/


/*! \page video_widget_requirements MWMCEJ-002 - Video Widget Requirements 


\section video_widget_requirements_TITLE TITLE

Video On Demand Jukebox Widget

\section video_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_widget_requirements_ABSTRACT ABSTRACT

\section video_widget_requirements_DESCRIPTION DESCRIPTION

\section video_widget_requirements_REQUIREMENTS REQUIREMENTS

\section video_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section video_widget_requirements_REFERENCES REFERENCES

\section video_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page video_widget_design MWMCEJ-002 - Video Widget Design


\section video_widget_design_TITLE TITLE

Short Description

\section video_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_widget_design_ABSTRACT ABSTRACT

\section video_widget_design_DESCRIPTION DESCRIPTION

\section video_widget_design_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



/*! \page video_widget_manual MWMCEJ-004 - Video Widget Manual


\section video_widget_manual_TITLE TITLE

Short Description

\section video_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section video_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section video_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section video_widget_manual_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



function Video_PIR_ProjectedWidth(p_Height)
{
    return p_Height * this.m_fWHRatio;
}

function Video_PIR_ProjectedHeight(p_Width)
{
    return p_Width / this.m_fWHRatio;
}

//336,272,1,1,64,45
function Video_PIR(p_iWidth,p_iHeight,p_iXSRatio,p_iYSRatio,p_iXERatio,p_iYERatio)
{
    this.m_iWidth = p_iWidth;
    this.m_iHeight = p_iHeight;
    this.m_iXSRatio = p_iXSRatio;
    this.m_iYSRatio = p_iYSRatio;
    this.m_iTSRatio = p_iXSRatio + p_iYSRatio;

    this.m_iXERatio = p_iXERatio;
    this.m_iYERatio = p_iYERatio;
    this.m_iTERatio = p_iXERatio + p_iYERatio;

    // calculate true width & height in square pixels
    this.m_iTEHeight = this.m_iHeight*this.m_iYERatio/this.m_iTERatio;
    this.m_iTEWidth = this.m_iWidth*this.m_iXERatio/this.m_iTERatio;
    
    /*
    alert(
    "m_iTEWidth = "+this.m_iTEWidth + " " + "m_iTEHeight = "+this.m_iTEHeight
    
    );
    */
    
    this.m_fWHRatio = this.m_iTEWidth/this.m_iTEHeight;
    
    this.ProjectedWidth = Video_PIR_ProjectedWidth;
    this.ProjectedHeight = Video_PIR_ProjectedHeight;
}




        /************************************************************************/
        /*                                                                      */
        /*                     Define Video Class                            */

        /*!
            @fn         function Video_Open(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       11 October 2004

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_Open(p_wWidget)
        {
            //debugtext("* Video_Open '" + p_wWidget.m_sName + "'");          
        
            /* get a handle to our div*/            
            //var l_eDiv = Widget_Common_GetDIV(p_wWidget); 
        
            /* add some text to it....*/
            //l_eDiv.appendChild(document.createTextNode("This text was added by Video.vft.f_Open"));
                    
            /* call the parents version of f_Open via the virtual function table*/
            Window_Open(p_wWidget);
        }
        

        /*!
            @fn         function Video_Create(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       11 October 2004

            We want to overide f_Open for Video so we can insert some 
            text into our main menu when it is created.
        */
        function Video_Create(p_wWidget)
        {
            //debugtext("* Video_Create '" + p_wWidget.m_sName + "'");            
        
            /* get a handle to our div*/            
            //var l_eDiv = Widget_Common_GetDIV(p_wWidget); 
        
            /* add some text to it....*/
            //l_eDiv.appendChild(document.createTextNode("This text was added by Video.vft.f_Open"));
                    
            /* call the parents version of f_Open via the virtual function table*/
            Window_Create(p_wWidget);
        }       

        /*!
            @fn         function Video_Activate(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       11 October 2004

            We want to overide f_Open for Video so we can make our custom 
            focusable element "Guide" button focusable.
        */
        function Video_Activate(p_wWidget)
        {
            //debugtext("* Video_Activate '" + p_wWidget.m_sName + "'");          
                
            /* call the parents version of f_Activate via the virtual function table*/
            Window_Activate(p_wWidget);
        }
        

        /*!
            @fn         function Window_Element_OnClick(p_wWidget,p_eElement)
            @brief      This is out Widget base class's handler for f_Element_OnMouseOver
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2004
        */      
        function Video_Element_OnClick(p_wWidget,p_eElement)
        {
            //debugtext("* Video_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
                        
            // bubble
            Window_Element_OnClick(p_wWidget,p_eElement);
        }
        
        /*!
            @fn         function Video_Mute(p_wWidget,p_bMute)
            @brief      Controls muting of audio
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_bMute True if we want volume muted - false if we don't
            @author     James Mc Parlane
            @date       11 November 2004
        */
        function Video_Mute(p_wWidget,p_bMute)
        {
            //debugtext("* Video_Mute '" + p_wWidget.m_sName + "' mute '" + p_bMute + "'");          
        }               
        
        /*!
            @fn         function Video_Play(p_wWidget)
            @brief      Controls muting of audio
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_bMute True if we want volume muted - false if we don't
            @author     James Mc Parlane
            @date       11 November 2004
        */
        function Video_Play(p_wWidget)
        {
            //debugtext("* Video_Play '" + p_wWidget.m_sName);          
        }               
        
        
        /*!
            @fn         function Video_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency))
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
        
        function Video_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
        {                       
            Window_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
            
            //debugtext("* Video_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );          
        }
        
        
        

        /*!
            @fn         function Class_Video_VFTBL()
            @brief      This function populates our virtual function table
            @return     void
            @author     James Mc Parlane
            @date       11 October 2004
        */
        function Class_Video_VFTBL()
        {
            //debugtext("+ creating virtual function table for Video");

            /* we inherit from widget*/
            this.parent = g_Class_Window_VFTBL;

            /* inherit functions from our parent*/
            Class_Widget_Inherit(this);

            /* register functions that Video implements*/   
            this.f_Open = Video_Open;                       
            this.f_Create = Video_Create;
            this.f_Position = Video_Position;
            this.f_Mute = Video_Mute;
            this.f_Play = Video_Play;
            
        }
        
        /*!
            @fn         function Class_Video_Inherit(p_vft)
            @brief      This will initalise p_vft from its parent's virtial function table
            @return     void
            @param      p_vft A reference to our widgets virtual function table.
            @author     James Mc Parlane
            @date       24 August 2004
        */
        function Class_Video_Inherit(p_vft)
        {
            //debugtext("+ Class_Video_Inherit");
            
            //debugtext("* populate vft from parent");
                        
            p_vft.f_Mute = p_vft.parent.f_Mute;
            p_vft.f_Play = p_vft.parent.f_Play;
            
            Class_Window_Inherit(p_vft);
                    
            //debugtext("- Class_Video_Inherit");
        }       

        /*!
            @fn         function Class_Video(p_sName,p_iDepth)
            @brief      This is our Video base class
            @return     void
            @param      p_sName The name of our widget.
            @author     James Mc Parlane
            @date       11 October 2004
        */
        function Class_Video(p_sName)
        {       
            /* Initalise all our members by inheriting from Widget*/            
            this.base = Class_Window;
            this.base(p_sName);

            /* Point to Video's virtual function pointer table */
            this.vft = g_Class_Video_VFTBL;
                        
            /* allow this and nowplaying to co-exist*/
            this.m_bSplitLevel = true;

            /* Make this object draggable*/         
            this.m_bDraggable = true;                       
        }

        /*                                                                      */
        /*                                                                      */
        /************************************************************************/


        /* Create the virtual function table for our Video Class*/
/*!\verbatim*/      
        //debugtext("* creating g_Class_Video_VFTBL");
/*!\endverbatim*/               
        var g_Class_Video_VFTBL = new Class_Video_VFTBL();

/* end of group video_widget */
/*! @}*/
