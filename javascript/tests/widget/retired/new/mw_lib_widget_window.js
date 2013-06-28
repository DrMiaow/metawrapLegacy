/*! 

	$Id: mw_lib_widget_window.js,v 1.1 2006/12/21 07:42:25 james Exp $

	FILE:	@file mw_lib_widget_window.js
              
	@author     James Mc Parlane

	PROJECT:    MetaWrap JavaScript Library

	COMPONENT:  -

	DATE:       21 October 2001

	COMMENTS:   -

	MODIFIED:	-

	GENERAL INFO:

		Massive Technologies
		PO Box 567
		Darlinghurst 2010
		NSW, Australia
		email:	james@massive.com.au
		tel:	(+61-2) 9331 8699
		fax:	(+61-2) 9331 8699
		mob:	(+61) 407-909-186

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

/*
 * $Log: mw_lib_widget_window.js,v $
 * Revision 1.1  2006/12/21 07:42:25  james
 * Started working on dynamic layout widgets
 *
 * Revision 1.1  2005/07/07 03:28:29  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/02/24 07:35:42  james
 * Wrong location.... fix.
 *
 */

/*! \defgroup mw_javascript_lib_window_widget Window Widget
 *@{
 */
 
/*!\verbatim*/ 
debugtext("* including javascript lib - $Id: mw_lib_widget_window.js,v 1.1 2006/12/21 07:42:25 james Exp $ ");
/*!\endverbatim*/

/*! \page mw_javascript_lib_window_widget Window Widget
  

  \ref mw_javascript_lib_window_widget_manual

  \ref mw_javascript_lib_window_widget_requirements

  \ref mw_javascript_lib_window_widget_design

*/


/*! \page mw_javascript_lib_window_widget_requirements MWMCEJ-001 - Window Widget Requirements 


\section mw_javascript_lib_window_widget_requirements_TITLE TITLE

Dragable Window Widget

\section mw_javascript_lib_window_widget_requirements_VERSION VERSION
	- <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
	- <b>Date.</b> 23-Sept-2004
	- <b>Version.</b> 1
	- <b>Number.</b> 001
</pre>

\section mw_javascript_lib_window_widget_requirements_ABSTRACT ABSTRACT

Implements a dragable window widget that can be used as a base class for other dragable objects.

\section mw_javascript_lib_window_widget_requirements_DESCRIPTION DESCRIPTION

\section mw_javascript_lib_window_widget_requirements_REQUIREMENTS REQUIREMENTS

\section mw_javascript_lib_window_widget_requirements_IMPLEMENTATION IMPLEMENTATION

\section mw_javascript_lib_window_widget_requirements_REFERENCES REFERENCES

\section mw_javascript_lib_window_widget_requirements_STATUS STATUS

*/


/*! \page mw_javascript_lib_window_widget_design MWMCEJ-001 - Window Widget Design


\section mw_javascript_lib_window_widget_design_TITLE TITLE

Dragable Window Widget

\section mw_javascript_lib_window_widget_design_VERSION VERSION
	- <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
	- <b>Date.</b> 23-Sept-2004
	- <b>Version.</b> 1
	- <b>Number.</b> 001
</pre>

\section mw_javascript_lib_window_widget_design_ABSTRACT ABSTRACT

Description Abstract.

\section mw_javascript_lib_window_widget_design_DESCRIPTION DESCRIPTION

Full description

\section mw_javascript_lib_window_widget_design_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/



/*! \page mw_javascript_lib_window_widget_manual MWMCEJ-004 - Window Widget Manual


\section mw_javascript_lib_window_widget_manual_TITLE TITLE

Short Description

\section mw_javascript_lib_window_widget_manual_VERSION VERSION
	- <b>Maintainer.</b> James Mc Parlane, james@massive.com.au 
	- <b>Date.</b> 23-Sept-2004
	- <b>Version.</b> 1
	- <b>Number.</b> 001
</pre>

\section mw_javascript_lib_window_widget_manual_ABSTRACT ABSTRACT

Description Abstract.

\section mw_javascript_lib_window_widget_manual_DESCRIPTION DESCRIPTION

Full description

\section mw_javascript_lib_window_widget_manual_DESIGN DESIGN

Full listing of what this needs to be able to do.  
*/




/************************************************************************/
/*                                                                      */
/*                     Define Window Class                            */

/*!
	@fn			function Window_Open(p_wWidget)
	@brief		This opens our main menu
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2002

	We want to overide f_Open for Window so we can insert some 
	text into our main menu when it is created.
*/
function Window_Open(p_wWidget)
{
	debugtext("* Window_Open '" + p_wWidget.m_sName + "'");			

	/* call the parents version of f_Open via the virtual function table*/
	Widget_Open(p_wWidget);
}

/*!
	@fn			function Widget_Create(p_wWidget)
	@brief		This creates the XML/HTML for this widget
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2002

	We want to overide f_Open for Window so we can insert some 
	text into our main menu when it is created.
*/
function Window_Create(p_wWidget)
{
	debugtext("* Widget_Create '" + p_wWidget.m_sName + "'");			

	/* call the parents version of f_Open via the virtual function table*/
	Widget_Create(p_wWidget);
}		

/*!
	@fn			function Video_WireUp(p_wWidget)
	@brief		Wires up the widget to the display layer
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2004

*/
function Window_WireUp(p_wWidget)
{
	debugtext("* Window_WireUp '" + p_wWidget.m_sName + "'");

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
	@fn			function Window_Element_OnMouseOver(p_wWidget,p_eElement)
	@brief		This is out Widget base class's handler for f_Element_OnMouseOver
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2004
*/
function Window_Element_OnMouseOver(p_wWidget,p_eElement)
{
	debugtext("* Window_Element_OnMouseOver '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");

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
	@fn			function Window_Element_OnMouseOver(p_wWidget,p_eElement)
	@brief		This is out Widget base class's handler for f_Element_OnMouseOver
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2004
*/
function Window_Element_OnClick(p_wWidget,p_eElement)
{
	debugtext("* Window_Element_OnClick '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");

	// Resize divs			
	var l_Video_Width = g_Video_Screen_Width/5;
	var l_Video_Height = g_Video_WMP9_PIR.ProjectedHeight(l_Video_Width)

	// 100 steps in 10 seconds
	setTrajectory(p_wWidget,128,128,l_Video_Width,l_Video_Height,0,20,1000);

	// bubble
	Widget_Element_OnClick(p_wWidget,p_eElement);
}


/*!
	@fn			function Widget_ReSize(p_wWidget)
	@brief		This is out Widget base class's implementation of f_Open
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2004			
*/
function Window_ReSize(p_wWidget)
{
	debugtext("* Window_ReSize '" + p_wWidget.m_sName + "'");

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
	@fn			function Window_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
	@brief		
	@return	    void
	@param	    p_wWidget A reference to our widget
	@param	    p_iX The new X position
	@param	    p_iY The new Y position
	@param	    p_iWidth The new Width
	@param	    p_iHeight The new Height
	@param		p_iTransparency The new Transparency

	@author		James Mc Parlane
	@date		24 July 2004

	This function should be called when you want the Widget to be 'Opened' (made visible). If you override this 
	function you should call the base class version after you make all the elements in your widget visible.	
*/		
function Window_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency)
{
	Widget_Position(p_wWidget,p_iX,p_iY,p_iWidth,p_iHeight,p_iTransparency);

	debugtext("* Window_Position '" + p_wWidget.m_sName + "'" + p_iX + "," + p_iY + " " + p_iWidth + "," + p_iHeight );

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
		var l_Drag = document.getElementById("img" + p_wWidget.m_sName + "_DragBar");
		l_Drag.style.width = p_iWidth - (p_wWidget.m_iCloseBoxWidth + p_wWidget.m_iSizeBoxWidth);		
	}						
}


/*!
	@fn			function Window_Element_OnMouseOut(p_wWidget,p_eElement)
	@brief		This is out Widget base class's implementation of f_Element_OnMouseOut
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2004
*/
function Window_Element_OnMouseOut(p_wWidget,p_eElement)
{

	debugtext("* Window_Element_OnMouseOut '" + p_wWidget.m_sName + "' element '" + p_eElement.id + "'");

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
	@fn			function Window_Activate(p_wWidget)
	@brief		This opens our main menu
	@return	    void
	@param	    p_wWidget A reference to our widget
	@author		James Mc Parlane
	@date		24 July 2002

	We want to overide f_Open for Window so we can make our custom 
	focusable element "Guide" button focusable.
*/
function Window_Activate(p_wWidget)
{
	debugtext("* Window_Activate '" + p_wWidget.m_sName + "'");			

	/* call the parents version of f_Activate via the virtual function table*/
	Widget_Activate(p_wWidget);
}

/*!
	@fn			function Class_Window_VFTBL()
	@brief		This function populates our virtual function table
	@return	    void
	@author		James Mc Parlane
	@date		24 July 2002
*/
function Class_Window_VFTBL()
{
	debugtext("+ creating virtual function table for Window");

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
	@fn			function Class_Window_Inherit(p_vft)
	@brief		This will initalise p_vft from its parent's virtial function table
	@return	    void
	@param	    p_vft A reference to our widgets virtual function table.
	@author		James Mc Parlane
	@date		24 August 2004
*/
function Class_Window_Inherit(p_vft)
{
	debugtext("+ Class_Window_Inherit");

	debugtext("* populate vft from parent");

	Class_Widget_Inherit(p_vft);

	debugtext("- Class_Window_Inherit");
}


/*!
	@fn			function Class_Window(p_sName,p_iDepth)
	@brief		This is our Window base class
	@return	    void
	@param	    p_sName The name of our widget.
	@author		James Mc Parlane
	@date		24 July 2002
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
		debugtext("* creating g_Class_Window_VFTBL");
/*!\endverbatim*/				
		var g_Class_Window_VFTBL = new Class_Window_VFTBL();

/* end of group mw_javascript_lib_window_widget */
/*! @}*/
