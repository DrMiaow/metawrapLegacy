/*! 

    $Id: widget_window.js,v 1.1 2006/12/21 07:42:26 james Exp $

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
 * $Log: widget_window.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.18  2005/10/06 07:42:27  james
 * Added buffering
 *
 * Revision 1.17  2005/09/09 23:45:46  james
 * Deployed version.
 *
 * Revision 1.16  2005/08/17 06:27:30  james
 * *** empty log message ***
 *
 * Revision 1.15  2004/12/03 07:11:29  james
 * Latest changes - all working
 *
 * Revision 1.14  2004/12/01 05:47:09  james
 * Integrated screens.
 *
 * Revision 1.13  2004/11/29 03:35:24  james
 * Enabled SMPTE code to be faked in javascript
 *
 * Revision 1.12  2004/11/13 06:37:41  james
 * Added time shifting.
 *
 * Revision 1.11  2004/11/11 06:30:10  james
 * Animating transitions.
 *
 * Revision 1.10  2004/11/11 04:25:54  james
 * Added Transparency as a dimension.
 *
 * Revision 1.9  2004/11/11 02:49:23  james
 * *** empty log message ***
 *
 * Revision 1.8  2004/11/11 02:04:46  james
 * Adding Marquee
 *
 * Revision 1.7  2004/11/10 07:34:04  james
 * Added Marquee Widget type
 *
 * Revision 1.6  2004/11/09 07:33:36  james
 * More progress.
 * Created transparancy effects.
 * Layout engine.
 * Remote control handling.
 *
 * Revision 1.5  2004/11/08 05:48:20  james
 * Adding simple flash control.
 *
 * Revision 1.4  2004/11/08 04:52:46  james
 * Created Windows Media Center Edition control.
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


/*! \defgroup window_widget Window Widget
 *@{
 */
 
/*!\verbatim*/ 
//debugtext("* including javascript lib - $Id: widget_window.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");
/*!\endverbatim*/

/*! \page window_widget Window Widget
  

  \ref window_widget_manual

  \ref window_widget_requirements

  \ref window_widget_design

*/


/*! \page window_widget_requirements MWMCEJ-001 - Window Widget Requirements 


\section window_widget_requirements_TITLE TITLE

Dragable Window Widget

\section window_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section window_widget_requirements_ABSTRACT ABSTRACT

Implements a dragable window widget that can be used as a base class for other dragable objects.

\section window_widget_requirements_DESCRIPTION DESCRIPTION

\section window_widget_requirements_REQUIREMENTS REQUIREMENTS

\section window_widget_requirements_IMPLEMENTATION IMPLEMENTATION

\section window_widget_requirements_REFERENCES REFERENCES

\section window_widget_requirements_STATUS STATUS

*/


/*! \page window_widget_design MWMCEJ-001 - Window Widget Design


\section window_widget_design_TITLE TITLE

Dragable Window Widget

\section window_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section window_widget_design_ABSTRACT ABSTRACT

Description Abstract.

\section window_widget_design_DESCRIPTION DESCRIPTION

Full description

\section window_widget_design_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



/*! \page window_widget_manual MWMCEJ-004 - Window Widget Manual


\section window_widget_manual_TITLE TITLE

Short Description

\section window_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section window_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section window_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section window_widget_manual_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/




        /************************************************************************/
        /*                                                                      */
        /*                     Define Window Class                            */

        /*!
            @fn         function Window_Open(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Window so we can insert some 
            text into our main menu when it is created.
        */
        function Window_Open(p_wWidget)
        {
            //debugtext("* Window_Open '" + p_wWidget.m_sName + "'");           
        
            /* call the parents version of f_Open via the virtual function table*/
            Widget_Open(p_wWidget);
        }
        
    /*!
            @fn         function Widget_Create(p_wWidget)
            @brief      This creates the XML/HTML for this widget
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Window so we can insert some 
            text into our main menu when it is created.
        */
        function Window_Create(p_wWidget)
        {
            //debugtext("* Widget_Create '" + p_wWidget.m_sName + "'");         
        
            /* call the parents version of f_Open via the virtual function table*/
            Widget_Create(p_wWidget);
        }       
        
        /*!
            @fn         function Video_WireUp(p_wWidget)
            @brief      Wires up the widget to the display layer
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2004
            
        */
        function Window_WireUp(p_wWidget)
        {
            //debugtext("* Window_WireUp '" + p_wWidget.m_sName + "'");
            
            /* get a handle to our div*/
            var l_eDiv = Widget_Common_GetDIV(p_wWidget); 

            /* Work out size of components*/
            var l_Size = document.getElementById("img" + p_wWidget.m_sName + "_SizeBox");
            if (l_Size != null)
            {
                p_wWidget.m_bSizeBoxImage = true;
                p_wWidget.m_iSizeBoxWidth = l_Size.style.pixelWidth;
                p_wWidget.m_iSizeBoxHeight = l_Size.style.pixelHeight;  
                l_Size.style.visibility = "hidden"; 
            }

            var l_Close = document.getElementById("img" + p_wWidget.m_sName + "_CloseBox");
            if (l_Close != null)
            {
                p_wWidget.m_bCloseBoxImage = true;
                p_wWidget.m_iCloseBoxWidth = l_Close.style.pixelWidth;
                p_wWidget.m_iCloseBoxHeight = l_Close.style.pixelHeight;    
                l_Close.style.visibility = "hidden";    
            }
            
            var l_Drag = document.getElementById("img" + p_wWidget.m_sName + "_DragBar");
            if (l_Drag != null)
            {
                p_wWidget.m_bDragBarImage = true;
                p_wWidget.m_iDragBarWidth = l_Drag.style.pixelWidth;
                p_wWidget.m_iDragBarHeight = l_Drag.style.pixelHeight;  
                l_Drag.style.visibility = "hidden";
            }   
            
        
            // bubble to widget level
            Widget_WireUp(p_wWidget);
        }
        

        /*!
            @fn         function Window_Element_OnMouseOver(p_wWidget,p_eElement)
            @brief      This is out Widget base class's handler for f_Element_OnMouseOver
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2004
        */
        function Window_Element_OnMouseOver(p_wWidget,p_eElement)
        {
            //debugtext("* Window_Element_OnMouseOver '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
            
            if (!g_Class_Widget_Dragging) 
            {                   
                var l_Size = document.getElementById("img" + p_wWidget.m_sName + "_SizeBox");
                if (l_Size != null)
                {
                    l_Size.style.visibility = "visible";
                }

                var l_Close = document.getElementById("img" + p_wWidget.m_sName + "_CloseBox");
                if (l_Close != null)
                {
                    l_Close.style.visibility = "visible";
                }
                
                var l_Drag = document.getElementById("img" + p_wWidget.m_sName + "_DragBar");
                if (l_Drag != null)
                {
                    l_Drag.style.visibility = "visible";
                }
            }
                        
            // bubble
            Widget_Element_OnMouseOver(p_wWidget,p_eElement);
        }

    

        /*!
            @fn         function Window_Element_OnMouseOver(p_wWidget,p_eElement)
            @brief      This is out Widget base class's handler for f_Element_OnMouseOver
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2004
        */
        function Window_Element_OnClick(p_wWidget,p_eElement)
        {
            //debugtext("* Window_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
            
            // Resize divs          
            var l_Video_Width = g_Video_Screen_Width/5;
            var l_Video_Height = g_Video_WMP9_PIR.ProjectedHeight(l_Video_Width)
                                    
            // 100 steps in 10 seconds
            setTrajectory(p_wWidget,128,128,l_Video_Width,l_Video_Height,0,g_Animation_Steps,g_Animation_Duration);
                        
            // bubble
            Widget_Element_OnClick(p_wWidget,p_eElement);
        }


        /*!
            @fn         function Widget_ReSize(p_wWidget)
            @brief      This is out Widget base class's implementation of f_Open
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2004            
        */
        function Window_ReSize(p_wWidget)
        {
            //debugtext("* Window_ReSize '" + p_wWidget.m_sName + "'");
            
            /* get a handle to our div*/
            /*
            var l_eDiv = Widget_Common_GetDIV(p_wWidget); 
            
                
            if (p_wWidget.m_bDragBarImage)
            {               
                var l_Drag = document.getElementById("img" + p_wWidget.m_sName + "_DragBar");
                l_Drag.style.width = l_eDiv.style.pixelWidth - (p_wWidget.m_iCloseBoxWidth + p_wWidget.m_iSizeBoxWidth);        
            }
            */  
            
            
        }


        /*!
            @fn         function Window_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
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
        function Window_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
        {
            Widget_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
        
            //debugtext("* Window_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );
            
            var l_DIV_style = Widget_Common_GetDIV(p_wWidget).style;
                                            
            // set the width and height and         
            l_DIV_style.left = p_iX;
            l_DIV_style.top = p_iY - p_wWidget.m_iDragBarHeight; 
                        
            l_DIV_style.width = p_iWidth; 
            l_DIV_style.height = p_iHeight + p_wWidget.m_iDragBarHeight;    
                        
            if (g_SFX)
            {
                l_DIV_style.filter = "Alpha(Opacity=" + p_iTransparency + ", Style=0)";             
                //debugstatus("Alpha(Opacity=" + p_iTransparency + ", Style=0)");
            }
            
            if (p_wWidget.m_bDragBarImage && p_wWidget.m_bCloseBoxImage && p_wWidget.m_bSizeBoxImage)
            {               
				var l_Drag_width_new = p_iWidth - (p_wWidget.m_iCloseBoxWidth + p_wWidget.m_iSizeBoxWidth)
                var l_Drag = document.getElementById("img" + p_wWidget.m_sName + "_DragBar");
                
                if (l_Drag_width_new >= 0)
                {
					l_Drag.style.width = l_Drag_width_new;       
                }
            }                       
        }


        /*!
            @fn         function Window_Element_OnMouseOut(p_wWidget,p_eElement)
            @brief      This is out Widget base class's implementation of f_Element_OnMouseOut
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2004
        */
        function Window_Element_OnMouseOut(p_wWidget,p_eElement)
        {
            
            //debugtext("* Window_Element_OnMouseOut '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
            
            if (!g_Class_Widget_Dragging) 
            {           
                var l_Size = document.getElementById("img" + p_wWidget.m_sName + "_SizeBox");
                if (l_Size != null)
                {
                    l_Size.style.visibility = "hidden";
                }

                var l_Close = document.getElementById("img" + p_wWidget.m_sName + "_CloseBox");
                if (l_Close != null)
                {
                    l_Close.style.visibility = "hidden";
                }
                
                var l_Drag = document.getElementById("img" + p_wWidget.m_sName + "_DragBar");
                if (l_Drag != null)
                {
                    l_Drag.style.visibility = "hidden";
                }
            }   
            
            // bubble
            Widget_Element_OnMouseOut(p_wWidget,p_eElement);
        }

        

        /*!
            @fn         function Window_Activate(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Window so we can make our custom 
            focusable element "Guide" button focusable.
        */
        function Window_Activate(p_wWidget)
        {
            //debugtext("* Window_Activate '" + p_wWidget.m_sName + "'");           
                
            /* call the parents version of f_Activate via the virtual function table*/
            Widget_Activate(p_wWidget);
        }

        /*!
            @fn         function Class_Window_VFTBL()
            @brief      This function populates our virtual function table
            @return     void
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_Window_VFTBL()
        {
            //debugtext("+ creating virtual function table for Window");

            /* we inherit from widget*/
            this.parent = g_Class_Widget_VFTBL;

            /* inherit functions from our parent*/
            Class_Widget_Inherit(this);

            /* register functions that Window implements*/  
            this.f_Open = Window_Open;
            this.f_Create = Window_Create;
            this.f_WireUp = Window_WireUp;      
            this.f_ReSize = Window_ReSize;
            this.f_Position = Window_Position;
                        
            this.f_Element_OnMouseOver = Window_Element_OnMouseOver;
            this.f_Element_OnMouseOut = Window_Element_OnMouseOut;
            this.f_Element_OnClick = Window_Element_OnClick;
                
        }

        /*!
            @fn         function Class_Window_Inherit(p_vft)
            @brief      This will initalise p_vft from its parent's virtial function table
            @return     void
            @param      p_vft A reference to our widgets virtual function table.
            @author     James Mc Parlane
            @date       24 August 2004
        */
        function Class_Window_Inherit(p_vft)
        {
            //debugtext("+ Class_Window_Inherit");
            
            //debugtext("* populate vft from parent");
                        
            Class_Widget_Inherit(p_vft);
                    
            //debugtext("- Class_Window_Inherit");
        }


        /*!
            @fn         function Class_Window(p_sName,p_iDepth)
            @brief      This is our Window base class
            @return     void
            @param      p_sName The name of our widget.
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_Window(p_sName)
        {       
            /* Initalise all our members by inheriting from Widget*/            
            this.base = Class_Widget;
            this.base(p_sName);

            /* Point to Window's virtual function pointer table */
            this.vft = g_Class_Window_VFTBL;
                        
            /* allow this and nowplaying to co-exist*/
            this.m_bSplitLevel = true;

            /* Make this object draggable*/         
            this.m_bDraggable = true;                       
        }

        /*                                                                      */
        /*                                                                      */
        /************************************************************************/


        /* Create the virtual function table for our Window Class*/
/*!\verbatim*/      
        //debugtext("* creating g_Class_Window_VFTBL");
/*!\endverbatim*/               
        var g_Class_Window_VFTBL = new Class_Window_VFTBL();

/* end of group window_widget */
/*! @}*/
