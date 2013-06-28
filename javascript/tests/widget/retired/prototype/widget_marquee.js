/*! 

    $Id: widget_marquee.js,v 1.1 2006/12/21 07:42:26 james Exp $

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
 * $Log: widget_marquee.js,v $
 * Revision 1.1  2006/12/21 07:42:26  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.5  2005/09/09 23:45:46  james
 * Deployed version.
 *
 * Revision 1.4  2004/11/13 06:37:40  james
 * Added time shifting.
 *
 * Revision 1.3  2004/11/11 04:25:52  james
 * Added Transparency as a dimension.
 *
 * Revision 1.2  2004/11/11 02:04:45  james
 * Adding Marquee
 *
 * Revision 1.1  2004/11/10 07:34:04  james
 * Added Marquee Widget type
 *
 */

/*! \defgroup marquee_widget Marquee Widget
 *@{
 */
 
/*!\verbatim*/ 
//debugtext("* including javascript lib - $Id: widget_marquee.js,v 1.1 2006/12/21 07:42:26 james Exp $ ");
/*!\endverbatim*/

/*! \page marquee_widget Marquee Widget
  
  \ref marquee_widget_manual

  \ref marquee_widget_requirements

  \ref marquee_widget_design

*/


/*! \page marquee_widget_requirements MWMCEJ-002 - Marquee Widget Requirements 


\section marquee_widget_requirements_TITLE TITLE

Marquee On Demand Jukebox Widget

\section marquee_widget_requirements_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section marquee_widget_requirements_ABSTRACT ABSTRACT

\section marquee_widget_requirements_DESCRIPTION DESCRIPTION

\section marquee_widget_requirements_REQUIREMENTS REQUIREMENTS

\section marquee_widget_requirements_IMPLEMENTATION IMPLEMENTATION

Description of how it might be implemented.

\section marquee_widget_requirements_REFERENCES REFERENCES

\section marquee_widget_requirements_STATUS STATUS

Mulling Over In Progress - describing handler mechanism

*/


/*! \page marquee_widget_design MWMCEJ-002 - Marquee Widget Design


\section marquee_widget_design_TITLE TITLE

Short Description

\section marquee_widget_design_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section marquee_widget_design_ABSTRACT ABSTRACT

\section marquee_widget_design_DESCRIPTION DESCRIPTION

\section marquee_widget_design_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



/*! \page marquee_widget_manual MWMCEJ-004 - Marquee Widget Manual


\section marquee_widget_manual_TITLE TITLE

Short Description

\section marquee_widget_manual_VERSION VERSION
    - <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
    - <b>Date.</b> 23-Sept-2004
    - <b>Version.</b> 1
    - <b>Number.</b> 001
</pre>

\section marquee_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section marquee_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section marquee_widget_manual_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



        /************************************************************************/
        /*                                                                      */
        /*                     Define Marquee Class                            */

        /*!
            @fn         function Marquee_Open(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Marquee so we can insert some 
            text into our main menu when it is created.
        */
        function Marquee_Open(p_wWidget)
        {
            //debugtext("* Marquee_Open '" + p_wWidget.m_sName + "'");          
        
            /* get a handle to our div*/            
            var l_eDiv = Widget_Common_GetDIV(p_wWidget); 
        
            /* add some text to it....*/
            //l_eDiv.appendChild(document.createTextNode("<b>This text was added by Marquee.vft.f_Open</b>"));
                    
            /* call the parents version of f_Open via the virtual function table*/
            Window_Open(p_wWidget);
        }

        /*!
            @fn         function Marquee_Activate(p_wWidget)
            @brief      This opens our main menu
            @return     void
            @param      p_wWidget A reference to our widget
            @author     James Mc Parlane
            @date       24 July 2002

            We want to overide f_Open for Marquee so we can make our custom 
            focusable element "Guide" button focusable.
        */
        function Marquee_Activate(p_wWidget)
        {
            //debugtext("* Marquee_Activate '" + p_wWidget.m_sName + "'");          
                
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
        function Marquee_Element_OnClick(p_wWidget,p_eElement)
        {
            //debugtext("* Marquee_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");
                        
            // bubble
            Window_Element_OnClick(p_wWidget,p_eElement);
        }
        

        /*!
            @fn         function Marquee_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
            @brief      
            @return     void
            @param      p_wWidget A reference to our widget
            @param      p_iX The new X position
            @param      p_iY The new Y position
            @param      p_iWidth The new Width
            @param      p_iHeight The new Height
            @param      p_iTransparency Transparency value
            
            @author     James Mc Parlane
            @date       24 July 2004
            
            This function should be called when you want the Widget to be 'Opened' (made visible). If you override this 
            function you should call the base class version after you make all the elements in your widget visible. 
        */
        
        function Marquee_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
        {                       
            Window_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);
            
            //debugtext("* Marquee_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );          
        }
        
        
        

        /*!
            @fn         function Class_Marquee_VFTBL()
            @brief      This function populates our virtual function table
            @return     void
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_Marquee_VFTBL()
        {
            //debugtext("+ creating virtual function table for Marquee");

            /* we inherit from widget*/
            this.parent = g_Class_Window_VFTBL;

            /* inherit functions from our parent*/
            Class_Widget_Inherit(this);

            /* register functions that Marquee implements*/ 
            this.f_Open = Marquee_Open;                     
            this.f_Position = Marquee_Position;
            
        }

        /*!
            @fn         function Class_Marquee(p_sName,p_iDepth)
            @brief      This is our Marquee base class
            @return     void
            @param      p_sName The name of our widget.
            @author     James Mc Parlane
            @date       24 July 2002
        */
        function Class_Marquee(p_sName)
        {       
            /* Initalise all our members by inheriting from Widget*/            
            this.base = Class_Window;
            this.base(p_sName);

            /* Point to Marquee's virtual function pointer table */
            this.vft = g_Class_Marquee_VFTBL;
                        
            /* allow this and nowplaying to co-exist*/
            this.m_bSplitLevel = true;

            /* Make this object draggable*/         
            this.m_bDraggable = true;                       
        }

        /*                                                                      */
        /*                                                                      */
        /************************************************************************/


        /* Create the virtual function table for our Marquee Class*/
/*!\verbatim*/      
        //debugtext("* creating g_Class_Marquee_VFTBL");
/*!\endverbatim*/               
        var g_Class_Marquee_VFTBL = new Class_Marquee_VFTBL();

/* end of group marquee_widget */
/*! @}*/
