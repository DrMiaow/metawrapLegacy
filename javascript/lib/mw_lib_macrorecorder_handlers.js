/*

    @file mw_lib_macro_recorder_handlers.js

    $Id: mw_lib_macrorecorder_handlers.js,v 1.9 2006/09/12 05:49:43 james Exp $
          
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
 * $Log: mw_lib_macrorecorder_handlers.js,v $
 * Revision 1.9  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:44  james
 * Added macro recorder
 *
 * Revision 1.15  2006/06/01 12:05:21  james
 * First Release
 *
 * Revision 1.8  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 * Revision 1.7  2006/05/08 12:49:00  james
 * Integrating unittest system and macro recorder together.
 *
 * Revision 1.6  2006/05/06 10:02:43  james
 * Ready to start next phase of refactoring
 *
 * Revision 1.5  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.4  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.3  2006/05/06 07:09:36  james
 * Refactoring code
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


/*! \page mw_javascript_lib_macrorecoder_handlers MetaWrap - JavaScript - MacroRecorder - Handlers
 *
 * \subsection mw_javascript_lib_macrorecoder_handlers Overview
 */
  
//alert("$Id: mw_lib_macrorecorder_handlers.js,v 1.9 2006/09/12 05:49:43 james Exp $");
 
/*! \defgroup mw_javascript_lib_macrorecoder_handlers  MetaWrap - JavaScript - Macro
 *@{
 */ 
 
// Ensure we have the namespace we need
 
/*! @name  MetaWrap.MacroRecorder.Handlers Namespace */
//@{


/* 
    @brief      MetaWrap.MacroRecorder.Handlers namespace
*/
MetaWrap.MacroRecorder.Handlers = new Object();


/*

---------------------------------------------------------------------------------------

IE Events on 'window'

Bubbling
--------

onactivate   : Fires when the object is set as the active element. 
onbeforedeactivate : Fires immediately before the activeElement is changed from the current object to another object in the parent document. 
oncontrolselect : Fires when the user is about to make a control selection of the object. 
ondeactivate : Fires when the activeElement is changed from the current object to another object in the parent document. 
onhelp : Fires when the user presses the F1 key while the browser is the active window.  
onmove : Fires when the object moves. 
onmoveend : Fires when the object stops moving. 
onmovestart : Fires when the object starts to move. 
onresizeend : Fires when the user finishes changing the dimensions of the object in a control selection. 
onresizestart : Fires when the user begins to change the dimensions of the object in a control selection. 

Non Bubbling
------------

onafterprint : Fires on the object immediately after its associated document prints or previews for printing.  
onbeforeprint : Fires on the object before its associated document prints or previews for printing.  
onbeforeunload : Fires prior to a page being unloaded.  
onblur : Fires when the object loses the input focus.  
onerror : Fires when an error occurs during object loading. 
onfocus : Fires when the object receives focus.  
onload : Fires immediately after the browser loads the object.  
onresize : Fires when the size of the object is about to change.  
onscroll : Fires when the user repositions the scroll box in the scroll bar on the object.  
onunload : Fires immediately before the object is unloaded.   

----------------------------------------------------------------------------

IE Events on 'document'


Bubbling
--------

onactivate : Fires when the object is set as the active element. 
onbeforeactivate : Fires immediately before the object is set as the active element. 
onbeforecut : Fires on the source object before the selection is deleted from the document. 
onbeforedeactivate : Fires immediately before the activeElement is changed from the current object to another object in the parent document. 
onbeforeeditfocus : Fires before an object contained in an editable element enters a UI-activated state or when an editable container object is control selected. 
onbeforepaste : Fires on the target object before the selection is pasted from the system clipboard to the document. 
onclick : Fires when the user clicks the left mouse button on the object.  
oncontextmenu : Fires when the user clicks the right mouse button in the client area, opening the context menu.  
oncontrolselect : Fires when the user is about to make a control selection of the object. 
oncut : Fires on the source element when the object or selection is removed from the document and added to the system clipboard. 
ondblclick : Fires when the user double-clicks the object.  
ondeactivate : Fires when the activeElement is changed from the current object to another object in the parent document. 
ondrag : Fires on the source object continuously during a drag operation. 
ondragend : Fires on the source object when the user releases the mouse at the close of a drag operation. 
ondragenter : Fires on the target element when the user drags the object to a valid drop target. 
ondragleave : Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation. 
ondragover : Fires on the target element continuously while the user drags the object over a valid drop target. 
ondragstart : Fires on the source object when the user starts to drag a text selection or selected object.  
ondrop : Fires on the target object when the mouse button is released during a drag-and-drop operation. 
onfocusin : Fires for an element just prior to setting focus on that element. 
onfocusout : Fires for the current element with focus immediately after moving focus to another element.  
onhelp : Fires when the user presses the F1 key while the browser is the active window.  
onkeydown : Fires when the user presses a key. 
onkeypress : Fires when the user presses an alphanumeric key. 
onkeyup : Fires when the user releases a key. 
onmousedown : Fires when the user clicks the object with either mouse button.  
onmousemove : Fires when the user moves the mouse over the object.  
onmouseout : Fires when the user moves the mouse pointer outside the boundaries of the object.  
onmouseover : Fires when the user moves the mouse pointer into the object.  
onmouseup : Fires when the user releases a mouse button while the mouse is over the object.  
onmousewheel : Fires when the wheel button is rotated.  
onmove : Fires when the object moves. 
onmoveend : Fires when the object stops moving. 
onmovestart : Fires when the object starts to move. 
onpaste : Fires on the target object when the user pastes data, transferring the data from the system clipboard to the document. 
onresizeend : Fires when the user finishes changing the dimensions of the object in a control selection. 
onresizestart : Fires when the user begins to change the dimensions of the object in a control selection. 

Non Bubbling
------------

onpropertychange : Fires when a property changes on the object. 
onreadystatechange : Fires when the state of the object has changed.  
onselectionchange : Fires when the selection state of a document changes. 
onstop : Fires when the user clicks the Stop button or leaves the Web page. 

------------------------------------------------------------

IE Events On 'element'

Bubbling
--------

onactivate : Fires when the object is set as the active element. 
onafterupdate : Fires on a databound object after successfully updating the associated data in the data source object.  
onbeforeactivate : Fires immediately before the object is set as the active element. 
onbeforecopy : Fires on the source object before the selection is copied to the system clipboard. 
onbeforecut : Fires on the source object before the selection is deleted from the document. 
onbeforedeactivate : Fires immediately before the activeElement is changed from the current object to another object in the parent document. 
onbeforeeditfocus : Fires before an object contained in an editable element enters a UI-activated state or when an editable container object is control selected. 
onbeforepaste : Fires on the target object before the selection is pasted from the system clipboard to the document. 
onbeforeupdate : Fires on a databound object before updating the associated data in the data source object.  
onclick : Fires when the user clicks the left mouse button on the object.  
oncontextmenu : Fires when the user clicks the right mouse button in the client area, opening the context menu.  
oncontrolselect : Fires when the user is about to make a control selection of the object. 
oncopy : Fires on the source element when the user copies the object or selection, adding it to the system clipboard. 
oncut : Fires on the source element when the object or selection is removed from the document and added to the system clipboard. 
ondblclick : Fires when the user double-clicks the object.  
ondeactivate : Fires when the activeElement is changed from the current object to another object in the parent document. 
ondrag : Fires on the source object continuously during a drag operation. 
ondragend : Fires on the source object when the user releases the mouse at the close of a drag operation. 
ondragenter : Fires on the target element when the user drags the object to a valid drop target. 
ondragleave : Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation. 
ondragover : Fires on the target element continuously while the user drags the object over a valid drop target. 
ondragstart : Fires on the source object when the user starts to drag a text selection or selected object.  
ondrop : Fires on the target object when the mouse button is released during a drag-and-drop operation. 
onerrorupdate : Fires on a databound object when an error occurs while updating the associated data in the data source object.  
onfocusin : Fires for an element just prior to setting focus on that element. 
onfocusout : Fires for the current element with focus immediately after moving focus to another element.  
onhelp : Fires when the user presses the F1 key while the browser is the active window.  
onkeydown : Fires when the user presses a key. 
onkeypress : Fires when the user presses an alphanumeric key. 
onkeyup : Fires when the user releases a key. 
onlayoutcomplete : Fires when the print or print preview layout process finishes filling the current LayoutRect object with content from the source document. 
onlosecapture : Fires when the object loses the mouse capture.  
onmousedown : Fires when the user clicks the object with either mouse button.  
onmousemove : Fires when the user moves the mouse over the object.  
onmouseout : Fires when the user moves the mouse pointer outside the boundaries of the object.  
onmouseover : Fires when the user moves the mouse pointer into the object.  
onmouseup : Fires when the user releases a mouse button while the mouse is over the object.  
onmousewheel : Fires when the wheel button is rotated.  
onmove : Fires when the object moves. 
onmoveend : Fires when the object stops moving. 
onmovestart : Fires when the object starts to move. 
onpaste : Fires on the target object when the user pastes data, transferring the data from the system clipboard to the document. 
onresize : Fires when the size of the object is about to change.  
onresizeend : Fires when the user finishes changing the dimensions of the object in a control selection. 
onresizestart : Fires when the user begins to change the dimensions of the object in a control selection. 
onselectstart : Fires when the object is being selected.  

Non Bubbling
------------

onblur : Fires when the object loses the input focus.  
onfilterchange : Fires when a visual filter changes state or completes a transition.  
onfocus : Fires when the object receives focus.  
onmouseleave : Fires when the user moves the mouse pointer outside the boundaries of the object. 
onmouseenter : Fires when the user moves the mouse pointer into the object. 
onpropertychange : Fires when a property changes on the object. 
onreadystatechange : Fires when the state of the object has changed.  
ontimeerror : Fires whenever a time-specific error occurs, usually as a result of setting a property to an invalid value. 
onscroll : Fires when the user repositions the scroll box in the scroll bar on the object.  
onresize : Fires when the size of the object is about to change.  
*/



// IE - Monitors all poperties - so we want this first so we can control it

MetaWrap.MacroRecorder.Handlers = {
    // IE - but monitors all properties - so we want this first - so its moved here to the top to ensure it fires first and can be ignorred
//    onpropertychange : MetaWrap.MacroRecorder.genericHandler,

    // W3 Standard

    onclick : MetaWrap.MacroRecorder.genericHandler,
    ondblclick : MetaWrap.MacroRecorder.genericHandler,
    onkeydown : MetaWrap.MacroRecorder.genericHandler,
    onkeypress : MetaWrap.MacroRecorder.genericHandler,
    onkeyup : MetaWrap.MacroRecorder.genericHandler,
    onmousemove : MetaWrap.MacroRecorder.genericHandler,
    onmousedown : MetaWrap.MacroRecorder.genericHandler,
    onmouseout : MetaWrap.MacroRecorder.genericHandler,
    onmouseover : MetaWrap.MacroRecorder.genericHandler,
    onmouseup : MetaWrap.MacroRecorder.genericHandler,
    onfocus : MetaWrap.MacroRecorder.genericHandler,
    onblur : MetaWrap.MacroRecorder.genericHandler,
    onselect : MetaWrap.MacroRecorder.genericHandler,
    onreset : MetaWrap.MacroRecorder.genericHandler,
    onsubmit : MetaWrap.MacroRecorder.genericHandler,
    onchange : MetaWrap.MacroRecorder.genericHandler,

    //
    // Defacto Standard (IE And Mozilla - Not Standard)
    //
    oncontextmenu : MetaWrap.MacroRecorder.genericHandler,
    onscroll : MetaWrap.MacroRecorder.genericHandler,
    onselectstart : MetaWrap.MacroRecorder.genericHandler, 
    onselectionchange : MetaWrap.MacroRecorder.genericHandler,
    ondragenter : MetaWrap.MacroRecorder.genericHandler,
    ondragover : MetaWrap.MacroRecorder.genericHandler,

    //
    // IE Only
    //
    onabort : MetaWrap.MacroRecorder.genericHandler,
    onactivate : MetaWrap.MacroRecorder.genericHandler,
    onafterprint : MetaWrap.MacroRecorder.genericHandler,
    onafterupdate : MetaWrap.MacroRecorder.genericHandler,
    onbeforeactivate : MetaWrap.MacroRecorder.genericHandler,
    onbeforecopy : MetaWrap.MacroRecorder.genericHandler,
    onbeforecut : MetaWrap.MacroRecorder.genericHandler,
    onbeforedeactivate : MetaWrap.MacroRecorder.genericHandler,
    onbeforeeditfocus : MetaWrap.MacroRecorder.genericHandler,
    onbeforepaste : MetaWrap.MacroRecorder.genericHandler,
    onbeforeprint : MetaWrap.MacroRecorder.genericHandler,
    onbeforeunload : MetaWrap.MacroRecorder.genericHandler,
    onbeforeupdate : MetaWrap.MacroRecorder.genericHandler,
    onbounce : MetaWrap.MacroRecorder.genericHandler,
    oncellchange : MetaWrap.MacroRecorder.genericHandler,
    oncontrolselect : MetaWrap.MacroRecorder.genericHandler,
    oncopy : MetaWrap.MacroRecorder.genericHandler,
    oncut : MetaWrap.MacroRecorder.genericHandler,
    ondataavailable : MetaWrap.MacroRecorder.genericHandler,
    ondatasetchanged : MetaWrap.MacroRecorder.genericHandler,
    ondatasetcomplete : MetaWrap.MacroRecorder.genericHandler,
    ondeactivate : MetaWrap.MacroRecorder.genericHandler,
    ondrag : MetaWrap.MacroRecorder.genericHandler,
    ondragend : MetaWrap.MacroRecorder.genericHandler,
    ondragleave : MetaWrap.MacroRecorder.genericHandler,
    ondragstart : MetaWrap.MacroRecorder.genericHandler,
    ondrop : MetaWrap.MacroRecorder.genericHandler,
    onerror : MetaWrap.MacroRecorder.genericHandler,
    onerrorupdate : MetaWrap.MacroRecorder.genericHandler,
    onfilterchange : MetaWrap.MacroRecorder.genericHandler,
    onfinish : MetaWrap.MacroRecorder.genericHandler,
    onfocusin : MetaWrap.MacroRecorder.genericHandler,
    onfocusout : MetaWrap.MacroRecorder.genericHandler,
    onhelp : MetaWrap.MacroRecorder.genericHandler,
    onlayoutcomplete : MetaWrap.MacroRecorder.genericHandler,
    onlosecapture : MetaWrap.MacroRecorder.genericHandler,
    onmouseenter : MetaWrap.MacroRecorder.genericHandler,
    onmouseleave : MetaWrap.MacroRecorder.genericHandler,
    onmousewheel : MetaWrap.MacroRecorder.genericHandler,
    onmove : MetaWrap.MacroRecorder.genericHandler,
    onmoveend : MetaWrap.MacroRecorder.genericHandler,
    onmovestart : MetaWrap.MacroRecorder.genericHandler,
    onpaste : MetaWrap.MacroRecorder.genericHandler,    
    //onpropertychange : MetaWrap.MacroRecorder.genericHandler, // IE - but monitors all properties - so we want this first - so its moved to the top to ensure it fires first and can be ignorred
    onreadystatechange : MetaWrap.MacroRecorder.genericHandler,
    onresize : MetaWrap.MacroRecorder.genericHandler,
    onresizeend : MetaWrap.MacroRecorder.genericHandler,
    onresizestart : MetaWrap.MacroRecorder.genericHandler,
    onrowenter : MetaWrap.MacroRecorder.genericHandler,
    onrowexit : MetaWrap.MacroRecorder.genericHandler,
    onrowsdelete : MetaWrap.MacroRecorder.genericHandler,
    onrowsinserted : MetaWrap.MacroRecorder.genericHandler,
    onstart : MetaWrap.MacroRecorder.genericHandler,
    onstop : MetaWrap.MacroRecorder.genericHandler,

    // Mozilla Only
    CheckboxStateChange  : MetaWrap.MacroRecorder.genericHandler,
    DOMAttrModified : MetaWrap.MacroRecorder.genericHandler,
    DOMMenuItemActive : MetaWrap.MacroRecorder.genericHandler,
    DOMMenuItemInactive : MetaWrap.MacroRecorder.genericHandler,
    DOMMouseScroll : MetaWrap.MacroRecorder.genericHandler, 
    DOMNodeInserted : MetaWrap.MacroRecorder.genericHandler, 
    DOMNodeRemoved : MetaWrap.MacroRecorder.genericHandler, 
    RadioStateChange : MetaWrap.MacroRecorder.genericHandler, 
    onclose : MetaWrap.MacroRecorder.genericHandler,
    oncommand : MetaWrap.MacroRecorder.genericHandler,
    oncommandupdate : MetaWrap.MacroRecorder.genericHandler,
    oncommandupdate : MetaWrap.MacroRecorder.genericHandler,
    ondragdrop : MetaWrap.MacroRecorder.genericHandler,
    ondragexit : MetaWrap.MacroRecorder.genericHandler,
    ondraggesture : MetaWrap.MacroRecorder.genericHandler,
    oninput : MetaWrap.MacroRecorder.genericHandler,
    onoverflow : MetaWrap.MacroRecorder.genericHandler,
    onoverflowchanged : MetaWrap.MacroRecorder.genericHandler,
    onpopuphidden : MetaWrap.MacroRecorder.genericHandler,
    onpopuphiding : MetaWrap.MacroRecorder.genericHandler,
    onpopupshowing : MetaWrap.MacroRecorder.genericHandler,
    onpopupshown : MetaWrap.MacroRecorder.genericHandler
};
//@}

/*! 
 *@} endgroup mw_javascript_lib_macrorecorder_handlers  MetaWrap - JavaScript - MacroRecorder - Handlers 
 */ 
