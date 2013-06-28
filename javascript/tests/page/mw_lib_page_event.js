/*

    @file mw_lib_page_event.js

    $Id: mw_lib_page_event.js,v 1.51 2007/08/13 09:53:41 james Exp $

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
 * $Log: mw_lib_page_event.js,v $
 * Revision 1.51  2007/08/13 09:53:41  james
 * New behaviors
 *
 * Revision 1.50  2007/01/20 01:23:51  james
 * More progress with Editor
 *
 * Revision 1.49  2006/10/21 07:58:49  james
 * Building in page editor
 *
 * Revision 1.48  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.47  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.46  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.45  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.44  2006/05/06 08:08:46  james
 * More code tidy up.
 * Getting control panel to implement the visitor class.
 *
 * Revision 1.43  2006/04/22 06:15:42  james
 * Getting option/select working
 *
 * Revision 1.42  2006/04/09 06:19:07  james
 * Got selection playback working within TEXTAREA and INPUT
 *
 * Revision 1.41  2006/04/07 13:18:19  james
 * Got whole window scrolling working in FireFox/Mozilla
 * Tidied up code
 *
 * Revision 1.40  2006/04/07 08:48:51  james
 * *** empty log message ***
 *
 * Revision 1.39  2006/03/29 06:41:23  james
 * Latest macro recorder
 *
 * Revision 1.38  2006/03/28 12:30:22  james
 * One bug remaining - when an IFRAME is loaded with an href, its not being loaded
 * into a new frame object
 *
 * Revision 1.37  2006/03/27 01:45:23  james
 * events now recording (location handles in longhand)
 * Now need to get shorthand id based locations working again
 *
 * Revision 1.36  2006/03/21 07:11:06  james
 * Tidy up of code
 * Fixed issue under Firefox with mouse animation
 *
 * Revision 1.35  2006/03/02 06:13:25  lela
 * Playback text selection
 *
 * Revision 1.34  2006/03/02 05:53:34  james
 * Doh! Fixed issue in passing selection from module to module
 *
 * Revision 1.33  2006/03/02 02:57:22  james
 * Starting on selection playback
 *
 * Revision 1.32  2006/02/06 04:14:59  james
 * Adding event simulation to MetaWrap.Page.Event
 *
 * Revision 1.31  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.30  2005/11/07 07:23:15  james
 * *** empty log message ***
 *
 * Revision 1.29  2005/10/23 07:57:32  james
 * Added better garbage collector code that uses scrubbing
 * Made sure that cancelEvent and stopPropagation works as advertised.
 *
 * Revision 1.28  2005/09/21 06:47:23  james
 * Moved some code around into more logical
 * namespaces.
 *
 * Revision 1.27  2005/09/21 02:29:53  james
 * Updated license. Linking execpion was not really
 * practical in javascript. Java is distrbuted in source
 * anyway so the GPL pretty much covers everything
 * else.
 *
 * Revision 1.26  2005/09/06 13:07:37  james
 * Building a model that tests event capture vs bubbling
 *
 * Revision 1.25  2005/08/23 14:19:32  james
 * It drools and titters but it is now starting to make
 * sense. Pretty sure that the whole event model is
 * screwed in both browsers. I just may be the first
 * person to try and to this in quite this way and it
 * looks like there are some shortcomings in the
 * message translation models.
 *
 * Revision 1.24  2005/08/23 12:15:16  james
 * Starting to get output
 *
 * Revision 1.23  2005/08/22 14:20:52  james
 * Working out what key codes can be sent.
 *
 * Revision 1.22  2005/08/22 13:35:52  james
 * Working out what key codes can be sent.
 *
 * Revision 1.21  2005/08/22 13:03:09  james
 * Managed to get keyboard events working in Firefox
 *
 * Revision 1.20  2005/08/21 15:10:47  james
 * Getting middle level events working
 * in Firefox.
 *
 * Revision 1.19  2005/08/21 13:53:24  james
 * Managed to completely simulate middle layer.
 * Front end layer is obviously not driven by this
 * so now need to simulate this top level layer.
 *
 * Revision 1.18  2005/08/21 12:02:19  james
 * Using testcases to define full set of event
 * translations.
 *
 * Revision 1.17  2005/08/21 10:25:16  james
 * Trying to simulate operating system focus with only
 * browser messages.
 *
 * Revision 1.16  2005/08/21 09:13:28  james
 * Trying to simulate operating system focus with only
 * browser messages.
 *
 * Revision 1.15  2005/08/21 00:31:12  james
 * Trying to simulate operating system focus with only
 * browser messages.
 *
 * Revision 1.14  2005/08/20 06:26:03  james
 * Now able to simulate events under both IE and Firefox
 *
 * Revision 1.13  2005/08/03 15:55:25  james
 * Adding graph widget to testing framework
 *
 * Revision 1.12  2005/08/02 12:32:17  james
 * *** empty log message ***
 *
 * Revision 1.11  2005/08/02 12:29:22  james
 * Added mozilla smecific events
 *
 * Revision 1.10  2005/08/02 12:01:21  james
 * Adding all event handlers for both browsers to help
 * in diagnosting what events follow what
 *
 * Revision 1.9  2005/08/02 01:16:38  james
 * Added some external libraries for inspiration. These libs
 * represent what seem to be the state of the art in
 * javascript classing, event manipulation and DOM xpath,xslt
 * simulation.
 *
 * Revision 1.8  2005/08/01 13:52:21  james
 * Adding ability to log the important core messages
 *
 * Revision 1.7  2005/07/27 12:52:18  james
 * Added some evaluation test handlers - now to integrate the playback.
 * During playback testing its going to be important to work out if events, when
 * played back spwan logical child events (does a click result in a focus, does a mousemove result in mouseover) etc...
 *
 * Revision 1.6  2005/07/27 12:12:15  james
 * Optomised event handling
 *
 * Revision 1.5  2005/07/25 12:43:40  james
 * Fixed silly bug in event handler - was using this instead of
 * MetaWrap.Macro for object reference.
 *
 * Revision 1.4  2005/07/25 11:42:50  james
 * Wired in onclick
 *
 * Revision 1.3  2005/07/24 08:24:51  james
 * Working on macro editor
 *
 * Revision 1.2  2005/07/21 13:07:43  james
 * Moving more functions into classes
 *
 * Revision 1.1  2005/07/21 12:34:00  james
 * Near perfect mouse click event simulation.
 *
 */


/*! \page mw_javascript_lib_page_event MetaWrap - JavaScript - Page -  Event
 *
 *
 * http://www.ditchnet.org/wp/?p=6
 * http://www.faqts.com/knowledge_base/view.phtml/aid/19340
 * http://www.mozilla.org/docs/dom/domref/dom_el_ref.html
 * http://www.quirksmode.org/js/events_properties.html
 * http://www.quirksmode.org/js/events_compinfo.html
 *
 * IE4+ doesn't allow that as focus/blur events in IE don't bubble
 * (meaning the focus/blur event of page elements dont't show up at the
 * document level). So all you could do with IE4+ is loop through
 * document.all and assign onfocus/onblur handlers for every element.
 * \subsection mw_javascript_lib_page_event Overview
 *
 *  IE6 window.event
 *
 *     NAME                    VALUE       TYPE
 *
 *  returnValue             undefined   Variant
 *  cancelBubble            false       Boolean
 *  keyCode                 0           Long
 *  propertyName            ""          String
 *  bookmarks               null        Object
 *  recordset               null        Object
 *  dataFld                 ""          String
 *  boundElements           {...}       Object
 *  repeat                  false       Boolean
 *  srcUrn                  ""          String
 *  srcElement              {...}       Object
 *  altKey                  false       Boolean
 *  ctrlKey                 false       Boolean
 *  shiftKey                false       Boolean
 *  fromElement             null        Object
 *  toElement               null        Object
 *  button                  0           Long
 *  type                    "click"     String
 *  qualifier               ""          String
 *  reason                  0           Long
 *  x                       54          Long
 *  y                       298         Long
 *  clientX                 54          Long
 *  clientY                 298         Long
 *  offsetX                 42          Long
 *  offsetY                 281         Long
 *  screenX                 54          Long
 *  screenY                 423         Long
 *  srcFilter               null        Object
 *  dataTransfer            null        Object
 *  contentOverflow         false       Boolean
 *  shiftLeft               false       Boolean
 *  altLeft                 false       Boolean
 *  ctrlLeft                false       Boolean
 *  imeCompositionChange    0           Object
 *  imeNotifyCommand        0           Object
 *  imeNotifyData           0           Object
 *  imeRequest              0           Object
 *  imeRequestData          0           Object
 *  keyboardLayout          0           Object
 *  behaviorCookie          0           Long
 *  behaviorPart            0           Long
 *  nextPage                ""          String
 *  wheelDelta              0           Long
 *
 * -----------------------------------------------------------------
 *
 * IE6 Event handlers
 *
 * onabort - nonstandard
 * Fires when the user aborts the download of an image.
 *
 * onactivate - nonstandard
 * Fires when the object is set as the active element.
 *
 * onafterprint - nonstandard
 * Fires on the object immediately after its associated document prints
 * or previews for printing.
 *
 * onafterupdate - nonstandard
 * Fires on a databound object after successfully updating the associated
 * data in the data source object.
 *
 * onbeforeactivate - nonstandard
 * Fires immediately before the object is set as the active element.
 *
 * onbeforecopy - nonstandard
 * Fires on the source object before the selection is copied to the system
 * clipboard.
 *
 * onbeforecut - nonstandard
 * Fires on the source object before the selection is deleted from the document.
 *
 * onbeforedeactivate - nonstandard
 * Fires immediately before the activeElement is changed from the current
 * object to another object in the parent document.
 *
 * onbeforeeditfocus - nonstandard
 * Fires before an object contained in an editable element enters a
 * UI-activated state or when an editable container object is control selected.
 *
 * onbeforepaste - nonstandard
 * Fires on the target object before the selection is pasted from the system
 * clipboard to the document.
 *
 * onbeforeprint - nonstandard
 * Fires on the object before its associated document prints or previews for
 * printing.
 *
 * onbeforeunload - nonstandard
 * Fires prior to a page being unloaded.
 *
 * onbeforeupdate - nonstandard
 * Fires on a databound object before updating the associated data in the
 * data source object.
 *
 * onblur
 * Fires when the object loses the input focus.
 *
 * onbounce - nonstandard
 * Fires when the behavior property of the marquee object is set to "alternate"
 * and the contents of the marquee reach one side of the window.
 *
 * oncellchange - nonstandard
 * Fires when data changes in the data provider.
 *
 * onchange
 * Fires when the contents of the object or selection have changed.
 *
 * onclick
 * Fires when the user clicks the left mouse button on the object.
 *
 * oncontextmenu - nonstandard
 * Fires when the user clicks the right mouse button in the client area,
 * opening the context menu.
 *
 * oncontrolselect - nonstandard
 * Fires when the user is about to make a control selection of the object.
 *
 * oncopy - nonstandard
 * Fires on the source element when the user copies the object or selection,
 * adding it to the system clipboard.
 *
 * oncut - nonstandard
 * Fires on the source element when the object or selection is removed from
 * the document and added to the system clipboard.
 *
 * ondataavailable - nonstandard
 * Fires periodically as data arrives from data source objects that
 * asynchronously transmit their data.
 *
 * ondatasetchanged - nonstandard
 * Fires when the data set exposed by a data source object changes.
 *
 * ondatasetcomplete - nonstandard
 * Fires to indicate that all data is available from the data source object.
 *
 * ondblclick
 * Fires when the user double-clicks the object.
 *
 * ondeactivate - nonstandard
 * Fires when the activeElement is changed from the current object to another
 * object in the parent document.
 *
 * ondrag - nonstandard
 * Fires on the source object continuously during a drag operation.
 *
 * ondragend - nonstandard
 * Fires on the source object when the user releases the mouse at the
 * close of a drag operation.
 *
 * ondragenter - nonstandard
 * Fires on the target element when the user drags the object to a
 * valid drop target.
 *
 * ondragleave - nonstandard
 * Fires on the target object when the user moves the mouse out of a
 * valid drop target during a drag operation.
 *
 * ondragover - nonstandard
 * Fires on the target element continuously while the user drags the
 * object over a valid drop target.
 *
 * ondragstart - nonstandard
 * Fires on the source object when the user starts to drag a text
 * selection or selected object.
 *
 * ondrop - nonstandard
 * Fires on the target object when the mouse button is released
 * during a drag-and-drop operation.
 *
 * onerror - nonstandard
 * Fires when an error occurs during object loading.
 *
 * onerrorupdate - nonstandard
 * Fires on a databound object when an error occurs while updating
 * the associated data in the data source object.
 *
 * onfilterchange - nonstandard
 * Fires when a visual filter changes state or completes a transition.
 *
 * onfinish - nonstandard
 * Fires when marquee looping is complete.
 *
 * onfocus
 * Fires when the object receives focus.
 *
 * onfocusin - nonstandard
 * Fires for an element just prior to setting focus on that element.
 *
 * onfocusout - nonstandard
 * Fires for the current element with focus immediately after moving
 * focus to another element.
 *
 * onhelp - nonstandard
 * Fires when the user presses the F1 key while the browser is
 * the active window.
 *
 * onkeydown
 * Fires when the user presses a key.
 *
 * onkeypress
 * Fires when the user presses an alphanumeric key.
 *
 * onkeyup
 * Fires when the user releases a key.
 *
 * onlayoutcomplete - nonstandard
 * Fires when the print or print preview layout process finishes filling
 * the current LayoutRect object with content from the source document.
 *
 * onload
 * Fires immediately after the browser loads the object.
 *
 * onlosecapture - nonstandard
 * Fires when the object loses the mouse capture.
 *
 * onmousedown
 * Fires when the user clicks the object with either mouse button.
 *
 * onmouseenter - nonstandard
 * Fires when the user moves the mouse pointer into the object.
 *
 * onmouseleave - nonstandard
 * Fires when the user moves the mouse pointer outside the boundaries
 * of the object.
 *
 * onmousemove
 * Fires when the user moves the mouse over the object.
 *
 * onmouseout
 * Fires when the user moves the mouse pointer outside the boundaries of
 * the object.
 *
 * onmouseover
 * Fires when the user moves the mouse pointer into the object.
 *
 * onmouseup
 * Fires when the user releases a mouse button while the mouse is over
 * the object.
 *
 * onmousewheel - nonstandard
 * Fires when the wheel button is rotated.
 *
 * onmove - nonstandard
 * Fires when the object moves.
 *
 * onmoveend - nonstandard
 * Fires when the object stops moving.
 *
 * onmovestart - nonstandard
 * Fires when the object starts to move.
 *
 * onpaste - nonstandard
 * Fires on the target object when the user pastes data, transferring the
 * data from the system clipboard to the document.
 *
 * onpropertychange - nonstandard
 * Fires when a property changes on the object.
 *
 * onreadystatechange - nonstandard
 * Fires when the state of the object has changed.
 *
 * onreset
 * Fires when the user resets a form.
 *
 * onresize - nonstandard
 * Fires when the size of the object is about to change.
 *
 * onresizeend - nonstandard
 * Fires when the user finishes changing the dimensions of the object in
 * a control selection.
 *
 * onresizestart - nonstandard
 * Fires when the user begins to change the dimensions of the object in a
 * control selection.
 *
 * onrowenter - nonstandard
 * Fires to indicate that the current row has changed in the data source
 * and new data values are available on the object.
 *
 * onrowexit - nonstandard
 * Fires just before the data source control changes the current row in
 * the object.
 *
 * onrowsdelete - nonstandard
 * Fires when rows are about to be deleted from the recordset.
 *
 * onrowsinserted - nonstandard
 * Fires just after new rows are inserted in the current recordset.
 *
 * onscroll - nonstandard but widely supported
 * Fires when the user repositions the scroll box in the scroll bar on the object.
 *
 * onselect
 * Fires when the current selection changes.
 *
 * onselectionchange
 * Fires when the selection state of a document changes.
 *
 * onselectstart - nonstandard
 * Fires when the object is being selected.
 *
 * onstart - nonstandard
 * Fires at the beginning of every loop of the marquee object.
 *
 * onstop - nonstandard
 * Fires when the user clicks the Stop button or leaves the Web page.
 *
 * onsubmit
 * Fires when a FORM is about to be submitted.
 *
 * onunload
 * Fires immediately before the object is unloaded.
 *
 * -----------------------------------------------------------------
 *
 * Mozilla Events
 *
 * http://www.xulplanet.com/references/elemref/ref_EventHandlers.html
 * http://www.mozilla.org/docs/dom/domref/dom_shortIX.html
 *
 * CheckboxStateChange
 * This event is sent when a checkbox is checked or unchecked, either by the
 * user or a script. This event has no corresponding attribute; it must be
 * added using the addEventListener method. Normally, you would use the
 * command event to listen to checkbox changes, however, the command event
 * is only sent when the user modifies the value, while the
 * CheckboxStateChange event is also sent when a script modifies the
 * checked property of a checkbox. For user changes, the CheckboxStateChange
 * event is sent before the command event. The CheckboxStateChange event
 * does not bubble.
 *
 * DOMAttrModified
 * This event is sent to an element when one of its attributes is modified.
 * In the event handler, you can retrieve the attribute that was modified
 * using the event's attrName property, and you can retrieve the old and
 * new values of the attribute using the event's prevValue and newValue
 * properties.
 *
 * DOMMenuItemActive
 * This event is sent when a menu or menuitem is hovered over, or highlighted.
 * This event bubbles.
 *
 * DOMMenuItemInactive
 * This event is sent when a menu or menuitem is no longer being hovered over,
 * or highlighted. This event bubbles.
 *
 * DOMMouseScroll
 * This event is sent when the mousewheel is moved, causing the content to scroll.
 *
 * DOMNodeInserted
 * This event is sent when a node is added as a child of a element. If you
 * capture this element at the document level, you can be notified of document
 * changes.
 *
 * DOMNodeRemoved
 * This event is sent when a node is removed from an element. If you capture
 * this element at the document level, you can be notified of document changes.
 *
 * RadioStateChange
 * This event is sent when a radio button is selected, either by the user or a
 * script. This event has no corresponding attribute; it must be added using
 * the addEventListener method. Normally, you would use the command event to
 * listen to radio button selection changes, however, the command event is
 * only sent when the user changes the selected radio button, while the
 * RadioStateChange event is also sent when a script modifies the selection.
 * For user changes, the RadioStateChange event is sent before the command event.
 * The RadioStateChange event bubbles so you can also attach the event handler
 * to the enclosing radiogroup.
 *
 * onblur
 * The opposite of the focus event, the blur event is passed just as an element
 * loses the focus.
 *
 * onbroadcast
 * The event handler should be placed on an observer. The broadcast event is sent
 * when the attributes of the broadcaster being listened to are changed.
 *
 * onchange
 * This event is sent when the value of the textbox is changed. The event is not
 * sent until the focus is moved to another element.
 *
 * onclick
 * This event is sent when a mouse button is pressed and released. You can determine
 * which mouse button was clicked by retrieving the button property of the event
 * object. This event is also sent when the user double-clicks with the mouse. The
 * detail property specifies how many clicks occured. You can also check for
 * triple-clicks in a similar manner. For buttons and menus, you should use oncommand instead.
 *
 * onclose
 * This event is sent when a request has been made to close the window, for example,
 * when the user presses the close button. If you place an event handler on the
 * window element, you can trap the window close. If you return false from the
 * onclose handler, the window will not close. Return true to have it close normally.
 *
 * oncommand
 * This event handler is called when an element is activated. How it is activated
 * varies for each element and in many cases, there are several ways to activate an
 * element. For example, a button can be activated by clicking on it with the mouse
 * or by pressing ENTER while it has the focus. Menus can be activated by selecting
 * them with the mouse or by pressing a shortcut key. You should always use the
 * oncommand event instead of onclick because it will be called in all of the needed cases.
 *
 * oncommandupdate
 * This event occurs when a command update occurs. You would use this to update
 * the disabled status of items.
 *
 * oncontextmenu
 * This event is sent to an element when the user requests to open the context
 * menu for the element. The action to do this varies by platform, but it will
 * typically be a right click. This handler is usually used to dynamically set
 * the commands on a menu when the user requests to display it, or you can use
 * onpopupshowing event. Returning false from this event handler prevents the
 * popup from appearing.
 *
 * ondblclick
 * This event is like the click event except it is only sent when the user
 * double clicks with the mouse. This is an alternative to checking the detail
 * property in the click event.
 *
 * ondragdrop
 * This event is sent when the user releases the mouse button to drop an object
 * being dragged. The element, if it accepts the drop, should respond in some
 * manner such inserting the dragged object into itself.
 *
 * ondragenter
 * The dragenter event is sent when the mouse pointer first moves over an element
 * during a drag. It is similar to the mouseover event but occurs while dragging.
 *
 * ondragexit
 * This event is sent when the mouse pointer moves away from an element during a
 * drag. It is also called after a drop on an element. It is similar to the
 * mouseout event but occurs during a drag.
 *
 * ondraggesture
 * This event is sent when the user starts dragging the element, usually by
 * holding down the mouse button and moving the mouse.
 *
 * ondragover
 * Related to the mousemove event, this event is sent while something is
 * being dragged over an element. The handler should indicate whether the
 * object being dragged can be dropped.
 *
 * onfocus
 * The focus event is sent to an element when it receives the focus. Once
 * an element has the focus, keyboard events are sent to it. The focus
 * can be changed by clicking on an element or by pressing TAB to switch
 * to the next element is sequence.
 *
 * oninput
 * This event is sent when a user enters text in a textbox. This event is
 * only called when the text displayed would change, thus it is not
 * called when the user presses non-displayable keys.
 *
 * onkeydown
 * The keydown event is sent to an element that has the focus and a key
 * is pressed but not released.
 *
 * onkeypress
 * The keypress event is sent to an element that has the focus and a key
 * is pressed and released. When the user presses a key, the keydown
 * event is first sent, followed by the keypress event and then the keyup
 * event. In a textbox, a user normally can hold down a key to repeat a
 * character In this case, multiple sets of key events are sent as if the
 * user rapidly pressed the same key repeatedly.
 *
 * onkeyup
 * The keyup event is sent to an element that has the focus and a key is released.
 *
 * onload
 * This event is sent to the window after it has been fully loaded. You
 * should place this event handler on the window element. This event may
 * also be used on the image element, or an element that accepts an image
 * attribute, and will be fired when the image has finished loading. For
 * images, this event does not bubble up the element tree, so it will
 * not conflict with the window's onload event.
 *
 * onmousedown
 * This event is sent when the mouse is pressed on an element but not released.
 *
 * onmousemove
 * This event is sent repeatedly as the mouse is moved over an element.
 *
 * onmouseout
 * This mouseout event is sent to an element when the user moves the mouse
 * outside the element. This event is the reverse of onmouseover.
 *
 * onmouseover
 * This event is sent to an element when the mouse first moves over an
 * element. You can use this event to provide feedback to the user.
 *
 * onmouseup
 * This event is sent when the mouse is released on an element.
 *
 * onoverflow
 * This event is sent to a box or other layout element when there is
 * not enough space to display it at full size. This might be the result
 * of maximum sizes on elements. For example, if a box has a maximum size
 * of 100 pixels, and only enough space for 80 pixels is available, the
 * overflow event will be sent to the box. If the size changes, for
 * example, by the user resizing the window, you can use the onunderflow
 * event handler to determine when enough space is available.
 *
 * onoverflowchanged
 * This event is sent when the overflow state changes.
 *
 * onpopuphidden
 * This event is sent to a popup after it has been hidden.
 *
 * onpopuphiding
 * This event is sent to a popup when it is about to be hidden.
 *
 * onpopupshowing
 * This event is sent to a popup just before it is popped open. This
 * handler is usually used to dynamically set the contents when the user
 * requests to display it. Returning false from this event handler
 * prevents the popup from appearing.
 *
 * onpopupshown
 * This is event is sent to a popup after it has been opened, much like
 * the onload event is sent to a window when it is opened.
 *
 * onselect
 * This event is sent to a listbox or tree when an item is selected.
 *
 * onunderflow
 * This event is sent to an element when there becomes enough space
 * to display it at full size. This applies to boxes and other layout elements.
 *
 * onunload
 * This event is sent to a window when the window has closed. This is
 * done after the close event. You should place this event handler on
 * the window element.
 *
 *
 *
 *
 * http://msdn.microsoft.com/workshop/author/dhtml/reference/methods/createeventobject.asp
 * http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/objects/obj_event.asp
 *
 * Somewhere to start in Mozilla
 * http://www.mozilla.org/docs/dom/domref/dom_event_ref30.html
 * http://www.w3.org/TR/DOM-Level-2-Events/events.html
 *
 *
 * http://phrogz.net/objjob/method.asp?id=609
 *
 * The eventType argument is typically one of 'UIEvents', 'MouseEvents', 'MutationEvents',
 * or 'HTMLEvents'. For many event types, you must call initEvent(...) before you pass the
 * event object as a parameter to dispatchEvent(...).
 *
 * var evt = document.createEvent('HTMLEvents');
 * evt.initEvent('change',true,true);
 * document.getElementById('foo').dispatchEvent( evt );
 *
 * DOM Events
 *
 * DOMActivate
 * An element is activated, for instance, using a mouse device, a keyboard
 * device, or a voice command.
 * Note: The activation of an element is device dependent but is also
 * application dependent, e.g. a link in a document can be activated using a
 * mouse click or a mouse double click.
 *
 * DOMFocusIn
 * An event target receives focus, for instance via a pointing device being
 * moved onto an element or using keyboard navigation. The focus is given
 * to the element before the dispatch of this event type.
 *
 * DOMFocusOut
 * A event target loses focus, for instance via a pointing device being moved
 * out of an element or by tabbing navigation out of the element. The focus is
 * taken from the element before the dispatch of this event type.
 *
 * textInput
 * One or more characters have been entered. The characters can originate from
 * a variety of sources. For example, it could be characters resulting from a
 * key being pressed or released on a keyboard device, characters resulting
 * from the processing of an input method editor, or resulting from a voice
 * command. Where a "paste" operation generates a simple sequence of characters,
 * i.e. a text without any structure or style information, this event type
 * should be generated as well.
 *
 * click
 * A pointing device button is clicked over an element. The definition of a
 * click depends on the environment configuration; i.e. may depend on the
 * screen location or the delay between the press and release of the pointing
 * device button. In any case, the target node must be the same between the
 * mousedown, mouseup, and click. The sequence of these events is:
 * {"http://www.w3.org/2001/xml-events", "mousedown"},
 * {"http://www.w3.org/2001/xml-events", "mouseup"}, and
 * {"http://www.w3.org/2001/xml-events", "click"}.
 * Note that, given the definition of a click, If one or more of the event types
 * {"http://www.w3.org/2001/xml-events", "mouseover"},
 * {"http://www.w3.org/2001/xml-events", "mousemove"}, and
 * {"http://www.w3.org/2001/xml-events", "mouseout"}
 * occur between the press and release of the pointing device button, the
 * event type {"http://www.w3.org/2001/xml-events", "click"} cannot occur.
 * In the case of nested elements, this event type is always targeted at
 * the most deeply nested element.
 *
 * mousedown
 * A pointing device button is pressed over an element. In the case of nested
 * elements, this event type is always targeted at the most deeply nested element.
 *
 * mouseup
 * A pointing device button is released over an element. In the case of nested
 * elements, this event type is always targeted at the most deeply nested element.
 *
 * mouseover
 * A pointing device is moved onto an element. In the case of nested elements,
 * this event type is always targeted at the most deeply nested element.
 *
 * mousemove
 * A pointing device is moved while it is over an element. In the case of nested
 * elements, this event type is always targeted at the most deeply nested element.
 *
 * mouseout
 * A pointing device is moved away from an element. In the case of nested elements,
 * this event type is always targeted at the most deeply nested element.
 *
 * keydown
 * A key is pressed down. This event type is device dependent and relies on the
 * capabilities of the input devices and how they are mapped in the operating system.
 * This event type is generated after the keyboard mapping but before the
 * processing of an input method editor. This event should logically happen before
 * the event {"http://www.w3.org/2001/xml-events", "keyup"} is produced. Whether
 * a keydown contributes or not to the generation of a text event is
 * implementation dependent.
 *
 * keyup
 * A key is released. This event type is device dependent and relies on the
 * capabilities of the input devices and how they are mapped in the operating
 * system. This event type is generated after the keyboard mapping but before
 * the processing of an input method editor. This event should logically happen
 * after the event {"http://www.w3.org/2001/xml-events", "keydown"} is
 * produced. Whether a keyup contributes or not to the generation of a text
 * event is implementation dependent.
 *
 * DOMSubtreeModified
 * This is a general event for notification of all changes to the document.
 * It can be used instead of the more specific events listed below. It may
 * be dispatched after a single modification to the document or, at the
 * implementation's discretion, after multiple changes have occurred. The
 * latter use should generally be used to accommodate multiple changes
 * which occur either simultaneously or in rapid succession. The target of
 * this event is the lowest common parent of the changes which have taken
 * place. This event is dispatched after any other events caused by the
 * mutation(s) have occurred.
 *
 * DOMNodeInserted
 * A node has been added as a child of another node. This event is dispatched
 * after the insertion has taken place. The target node of this event is
 * the node being inserted.
 *
 * DOMNodeRemoved
 * A node is being removed from its parent node. This event is dispatched
 * before the node is removed from the tree. The target node of this event
 * is the node being removed.
 *
 * DOMNodeRemovedFromDocument
 * A node is being removed from a document, either through direct removal of
 * the node or removal of a subtree in which it is contained. This event is
 * dispatched before the removal takes place. The target node of this event
 * type is the node being removed. If the node is being directly removed,
 * the event type {"http://www.w3.org/2001/xml-events", "DOMNodeRemoved"}
 * will fire before this event type.
 *
 * DOMNodeInsertedIntoDocument
 * A node is being inserted into a document, either through direct insertion
 * of the node or insertion of a subtree in which it is contained. This event
 * is dispatched after the insertion has taken place. The target node of this
 * event is the node being inserted. If the node is being directly inserted,
 * the event type {"http://www.w3.org/2001/xml-events", "DOMNodeInserted"}
 * will fire before this event type.
 *
 * DOMAttrModified
 * Occurs after an Attr has been modified on a node. The target node of this
 * event is the parent Element node whose Attr changed. It is expected that
 * string based replacement of an Attr value will be viewed as a modification
 * of the Attr since its identity does not change. Subsequently replacement
 * of the Attr node with a different Attr node is viewed as the removal of
 * the first Attr node and the addition of the second.
 *
 * DOMCharacterDataModified
 * Occurs after CharacterData.data or ProcessingInstruction.data have been
 * modified but the node itself has not been inserted or deleted. The target
 * node of this event is the CharacterData node or the ProcessingInstruction
 * node.
 *
 * DOMElementNameChanged
 * Occurs after the namespaceURI and/or the nodeName of an Element node have
 * been modified (e.g., the element was renamed using Document.renameNode()).
 * The target of this event is the renamed Element node.
 *
 * DOMAttributeNameChanged
 * Occurs after the namespaceURI and/or the nodeName of a Attr node have been
 * modified (e.g., the attribute was renamed using Document.renameNode). The
 * target of this event is the parent Element node whose Attr has been renamed.
 *
 * load
 * The DOM Implementation finishes loading the resource (such as the document)
 * and any dependent resources (such as images, style sheets, or scripts).
 * Dependent resources that fail to load will not prevent this event from
 * firing if the resource that loaded them is still accessible via the DOM.
 * If this event type is dispatched, implementations are required to dispatch
 * this event at least on the Document node.
 *
 * unload
 * The DOM implementation removes from the environment the resource (such as
 * the document) or any dependent resources (such as images, style sheets,
 * scripts). The document is unloaded after the dispatch of this event type.
 * If this event type is dispatched, implementations are required to
 * dispatch this event at least on the Document node.
 *
 * abort
 * The loading of the document, or a resource linked from it, is stopped
 * before being entirely loaded.
 *
 * error
 * The document, or a resource linked from it, has been loaded but cannot
 * be interpreted according to its semantic, such as an invalid image, a
 * script execution error, or non-well-formed XML.
 *
 * select
 * A user selects some text. DOM Level 3 Events does not provide contextual
 * information to access the selected text. The selection occured before
 * the dispatch of this event type.
 *
 * change
 * A control loses the input focus and its value has been modified since gaining focus.
 *
 * submit
 * A form, such as [HTML 4.01], [XHTML 1.0], or [XForms 1.0] form, is submitted.
 *
 * reset
 * A form, such as [HTML 4.01], [XHTML 1.0], or [XForms 1.0] form, is reset.
 *
 * resize
 * A document view or an element has been resized. The resize occured before
 * the dispatch of this event type.
 *
 * scroll
 * A document view or an element has been scrolled. The scroll occured before
 * the dispatch of this event type.
 *
 */

//alert("$Id: mw_lib_page_event.js,v 1.51 2007/08/13 09:53:41 james Exp $");

/*! \defgroup mw_javascript_lib_page_event  MetaWrap - JavaScript - Page - Event
 *@{
 */

// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");

/*! @name  MetaWrap.Page.Event */
//@{

/*!
 	@namespace  MetaWrap.Page.Event.Event
    @fn         MetaWrap.Page.Event = function(p_event_type,p_X,p_Y,p_ctrl,p_alt,p_shift,p_button,p_key)
    @param      p_event_type
    @param      p_X
    @param      p_Y
    @param      p_ctrl
    @param      p_alt
    @param      p_shift
    @param      p_button
    @param      p_key
    @param      p_selection
    @param      p_scroll
    @param      p_option_select
    @return     void
    @author     James Mc Parlane
    @date       6 September 2004

    http://www.w3.org/TR/DOM-Level-2-Events/events.html
*/
MetaWrap.Page.Event = function(p_event_type,p_X,p_Y,p_ctrl,p_alt,p_shift,p_button,p_key,p_selection,p_scroll,p_option_select)
{
    // DOM uses super set of standard HTML events - we need to map HTML events into this
    var l_event_type_ie = "";
    var l_event_type_dom = "";
    var l_event_class = "";

    this.m_scroll.m_top = 0;
    this.m_scroll.m_left = 0;

    this.m_selection = p_selection;
    this.m_scroll = p_scroll;
    this.m_option_select = p_option_select;


    // alert("MetaWrap.Page.Event " + p_event_type);

    // For our give event - work out its DOM type and class
    switch (p_event_type)
    {
        case "click":
            /*
                The click event occurs when the pointing device button is
                clicked over an element. A click is defined as a mousedown
                and mouseup over the same screen location. The sequence of
                these events is:

                mousedown
                mouseup
                click

                If multiple clicks occur at the same screen location, the
                sequence repeats with the detail attribute incrementing with
                each repetition. This event is valid for most elements.

                Bubbles: Yes
                Cancelable: Yes
                Context Info: screenX, screenY, clientX, clientY, altKey,
                ctrlKey, shiftKey, metaKey, button, detai

                Fires when the user clicks the left mouse button on the object.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onclick.asp
            */
            l_event_type_dom = "click";
            l_event_type_ie = l_event_type_dom
            l_event_class = "MouseEvents";
        break;

        case "mousedown":
            /*
                The mousedown event occurs when the pointing device button is
                pressed over an element. This event is valid for most elements.

                Bubbles: Yes
                Cancelable: Yes
                Context Info: screenX, screenY, clientX, clientY, altKey,
                ctrlKey, shiftKey, metaKey, button, detail

                Fires when the user clicks the object with either mouse button.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onmousedown.asp
            */
            l_event_type_dom = "mousedown";
            l_event_type_ie = l_event_type_dom
            l_event_class = "MouseEvents";
        break;

        case "mouseup":
            /*
                The mouseup event occurs when the pointing device button is
                released over an element. This event is valid for most elements.

                Bubbles: Yes
                Cancelable: Yes
                Context Info: screenX, screenY, clientX, clientY, altKey,
                ctrlKey, shiftKey, metaKey, button, detail

                Fires when the user releases a mouse button while the mouse is over the object.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onmouseup.asp
            */
            l_event_type_dom = "mouseup";
            l_event_type_ie = l_event_type_dom
            l_event_class = "MouseEvents";
        break;

        case "mouseover":
            /*
                The mouseover event occurs when the pointing device is moved
                onto an  element. This event is valid for most elements.
                Bubbles: Yes

                Cancelable: Yes
                Context Info: screenX, screenY, clientX, clientY, altKey,
                ctrlKey, shiftKey, metaKey, relatedTarget indicates the
                EventTarget the pointing device is exiting.

                Fires when the user moves the mouse pointer into the object.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onmouseover.asp
            */
            l_event_type_dom = "mouseover";
            l_event_type_ie = l_event_type_dom
            l_event_class = "MouseEvents";
        break;

        case "mousemove":
            /*
                The mousemove event occurs when the pointing device is moved
                while it is over an element. This event is valid for most
                elements.

                Bubbles: Yes
                Cancelable: No
                Context Info: screenX, screenY, clientX, clientY, altKey,
                ctrlKey, shiftKey, metaKey

                Fires when the user moves the mouse over the object.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onmousemove.asp
            */
            l_event_type_dom = "mousemove";
            l_event_type_ie = l_event_type_dom
            l_event_class = "MouseEvents";
        break;

        case "mouseout":
            /*
                The mouseout event occurs when the pointing device is
                moved away from an element. This event is valid for
                most elements..

                Bubbles: Yes
                Cancelable: Yes
                Context Info: screenX, screenY, clientX, clientY, altKey,
                ctrlKey, shiftKey, metaKey, relatedTarget indicates the
                EventTarget the pointing device is entering.

                Fires when the user moves the mouse pointer outside the boundaries of the object.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onmouseout.asp
            */
            l_event_type_dom = "mouseout";
            l_event_type_ie = l_event_type_dom
            l_event_class = "MouseEvents";
        break;

        case "focusin":
            /*
                The DOMFocusIn event occurs when an EventTarget receives
                focus, for instance via a pointing device being moved onto
                an element or by tabbing navigation to the element. Unlike
                the HTML event focus, DOMFocusIn can be applied to any
                focusable EventTarget, not just FORM controls.

                Bubbles: Yes
                Cancelable: No
                Context Info: None

                Fires for an element just prior to setting focus on that element.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onfocusin.asp
            */
            l_event_type_dom = "DOMFocusIn";
            l_event_type_ie = "focusin";
            l_event_class = "UIEvents";
        break;

        case "focusout":
            /*
                The DOMFocusOut event occurs when a EventTarget loses focus,
                for instance via a pointing device being moved out of an
                element or by tabbing navigation out of the element. Unlike
                the HTML event blur, DOMFocusOut can be applied to any
                focusable EventTarget, not just FORM controls.

                Bubbles: Yes
                Cancelable: No
                Context Info: None

                Fires for the current element with focus immediately after
                moving focus to another element.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onfocusout.asp
            */
            l_event_type_dom = "DOMFocusOut";
            l_event_type_ie = "focusout";
            l_event_class = "UIEvents";
        break;

        case "activate":
            /*
                The activate event occurs when an element is activated, for
                instance, thru a mouse click or a keypress. A numerical
                argument is provided to give an indication of the type of
                activation that occurs: 1 for a simple activation (e.g. a
                simple click or Enter), 2 for hyperactivation (for instance
                a double click or Shift Enter).

                Bubbles: Yes
                Cancelable: Yes
                Context Info: detail (the numerical value)

                Fires for the current element with focus immediately after
                moving focus to another element.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onactivate.asp
            */
            l_event_type_dom = "DOMActivate";
            l_event_type_ie = "activate";
            l_event_class = "UIEvents";
        break;

        case "deactivate":
            /*
                Fires immediately before the object is set as the active element.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/ondeactivate.asp
            */
            l_event_type_dom = "";
            l_event_type_ie = "deactivate";
            l_event_class = "UIEvents";
        break;

        case "propertychange":
            /*
                Fires immediately before the object is set as the active element.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onpropertychange.asp
            */
            l_event_type_dom = "";
            l_event_type_ie = "propertychange";
            l_event_class = "UIEvents";
        break;


        case "focus":
            /*
                The focus event occurs when an element receives focus either
                via a pointing device or by tabbing navigation. This event
                is valid for the following elements: LABEL, INPUT, SELECT,
                TEXTAREA, and BUTTON.

                Bubbles: No
                Cancelable: No
                Context Info: None

                Fires when the object receives focus.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onfocus.asp
            */
            l_event_type_dom = "focus";
            l_event_type_ie = l_event_type_dom;
            l_event_class = "HTMLEvents";
        break;

        case "blur":
            /*
                The blur event occurs when an element loses focus either via
                the pointing device or by tabbing navigation. This event is
                valid for the following elements: LABEL,
                INPUT, SELECT, TEXTAREA, and BUTTON.

                Bubbles: No
                Cancelable: No
                Context Info: None

                Fires when the object loses the input focus.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onblur.asp
            */
            l_event_type_dom = "blur";
            l_event_type_ie = l_event_type_dom;
            l_event_class = "HTMLEvents";
        break;

        case "change":
            /*
                The change event occurs when a control loses the input focus
                and its value has been modified since gaining focus. This
                event is valid for INPUT, SELECT, and TEXTAREA. element.

                Bubbles: Yes
                Cancelable: No
                Context Info: None

                Fires when the contents of the object or selection have changed.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onchange.asp
            */
            l_event_type_dom = "change";
            l_event_type_ie = l_event_type_dom;
            l_event_class = "HTMLEvents";
        break;

        case "select":
            /*
                The select event occurs when a user selects some text in
                a text field. This event is valid for INPUT and TEXTAREA
                elements.

                Bubbles: Yes
                Cancelable: No
                Context Info: None

                Fires when the current selection changes

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onselect.asp
            */
            l_event_type_dom = "select";
            l_event_type_ie = l_event_type_dom;
            l_event_class = "HTMLEvents";
        break;


        case "selectionchange":
            /*
                Fires when the selection state of a document changes.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onselectionchange.asp
            */
            l_event_type_dom = "";
            l_event_type_ie = "selectionchange";
            l_event_class = "UIEvents";
        break;


        case "beforeeditfocus":
            /*
                Fires before an object contained in an editable element enters
                a UI-activated state or when an editable container object is
                control selected.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onbeforeeditfocus.asp
            */
            l_event_type_dom = "";
            l_event_type_ie = "beforeeditfocus";
            l_event_class = "UIEvents";
        break;


        case "beforedeactivate":
            /*
                Fires immediately before the activeElement is changed from
                the current object to another object in the parent
                document.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onbeforedeactivate.asp
            */
            l_event_type_dom = "";
            l_event_type_ie = "beforedeactivate";
            l_event_class = "UIEvents";
        break;

        case "beforeactivate":
            /*
                Fires immediately before the object is set as the active element.

                http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onbeforeactivate.asp
            */
            l_event_type_dom = "";
            l_event_type_ie = "beforeactivate";
            l_event_class = "UIEvents";
        break;


        case "keydown":
                /*
                    The DOM Level 2 Event specification does not provide a key
                    event module. An event module designed for use with
                    keyboard input devices will be included in a later version
                    of the DOM specification.

                    http://www.w3.org/TR/2000/WD-DOM-Level-3-Events-20000901/events.html

                    Fires when the user presses a key.

                    http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onkeydown.asp
                */
                l_event_type_dom = "keydown";
                l_event_type_ie = l_event_type_dom;
                l_event_class = "KeyEvents";
        break;

        case "keypress":
                /*
                    The DOM Level 2 Event specification does not provide a key
                    event module. An event module designed for use with
                    keyboard input devices will be included in a later version
                    of the DOM specification.

                    http://www.w3.org/TR/2000/WD-DOM-Level-3-Events-20000901/events.html

                    Fires when the user presses an alphanumeric key.

                    http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onkeypress.asp
                */
                l_event_type_dom = "keypress";
                l_event_type_ie = l_event_type_dom;
                l_event_class = "KeyEvents";
        break;

        case "keyup":
                /*
                    The DOM Level 2 Event specification does not provide a key
                    event module. An event module designed for use with
                    keyboard input devices will be included in a later version
                    of the DOM specification.

                    http://www.w3.org/TR/2000/WD-DOM-Level-3-Events-20000901/events.html

                    Fires when the user releases a key

                    http://msdn.microsoft.com/library/default.asp?url=/workshop/author/dhtml/reference/events/onkeyup.asp
                */
                l_event_type_dom = "keyup";
                l_event_type_ie = l_event_type_dom;
                l_event_class = "KeyEvents";
            break;

        case "scroll":
            l_event_type_dom = "scroll";
            l_event_type_ie = "scroll";
            l_event_class = "HTMLEvents";

            this.m_scroll.m_left = p_scroll.m_left;
            this.m_scroll.m_top = p_scroll.m_top;

            //alert("scroll " + p_X);
        break;

        default:
        //error("MetaWrap.Page.Event: unknown event " + p_event_type);
        return null;
        break;
    }

    // IE type functionality?
    if (document.createEventObject)
    {
        l_event = document.createEventObject(null);

        // IE has X,Y
        l_event.x = p_X;
        l_event.y = p_Y;

        l_event.clientX = p_X;
        l_event.clientY = p_Y;

        l_event.altKey = p_alt;
        l_event.ctrlKey = p_ctrl;
        l_event.shiftKey = p_shift;

        //l_event.keyCode = p_key;
        l_event.keyCode = p_key;
        l_event.button = p_button;

        l_event.type = l_event_type_ie;


        // depending on the event class - perform some processing
        switch(l_event_class)
        {
                case "UIEvents":
                case "HTMLEvents":


                    // Set this as our current selection for this page.
                    // We can't stuff the document.selection object but we
                    // can store it in MetaWrap.Page for use later
                    //this.m_selection = p_selection;
                    //this.m_scroll = p_scroll;

                break;
        }


    }
    else
    // DOM?
    if (document.createEvent)
    {
        // Is there a direct translation into a DOM event?
        if (l_event_type_dom != "")
        {
            // Create the event
            l_event = document.createEvent(l_event_class);

            // For our give event - work out its DOM type and class
            switch (l_event_class)
            {
                case "KeyEvents":
                /*
                    Seems like because of a vulnerability initkeyevent is nobbled from Firefox 1.0.6 onwards so that
                    it cannot be injected back into the event stream.

                    https://bugzilla.mozilla.org/show_bug.cgi?id=289940
                */

                p_key = Number(p_key);

                var l_key_key_code = 0;
                var l_key_char_code = 0;

                // charCode is never set in the keydown and keyup events. In these cases, keyCode is set instead.
                switch(p_event_type)
                {
                    case "keydown":
                    case "keyup":
                        l_key_key_code = p_key;
                    break;

                    case "keypress":
                        l_key_char_code = p_key;
                    break;
                }

                l_event.initKeyEvent(p_event_type,true,false,document.defaultView,false,false,false,false,l_key_key_code,l_key_char_code);

                break;

                case "HTMLEvents":

                    l_event.initEvent(
                        l_event_type_dom, // typeArg
                        true, // canBubbleArg
                        false  // cancelableArg
                        );

                    //this.m_selection = p_selection;
                    //this.m_scroll = p_scroll;

                break;

                case "UIEvents":

                    l_event.initUIEvent(
                        l_event_type_dom, // typeArg
                        true, // canBubbleArg
                        false, // cancelableArg
                        document.defaultView, // viewArg
                        Event.CLICK // detailArg
                        );


                break;

                case "MouseEvents":

                    l_event.initMouseEvent(
                        l_event_type_dom, // typeArg
                        true, // canBubbleArg
                        false, // cancelableArg
                        document.defaultView, // viewArg
                        Event.CLICK, // detailArg
                        p_X, // screenXArg
                        p_Y, // screenYArg
                        p_X, // clientXArg
                        p_Y, // clientYArg
                        p_ctrl, // ctrlKeyArg
                        p_alt, // altKeyArg
                        p_shift, // shiftKeyArg
                        false, // metaKeyArg
                        0, // buttonArg
                        null // relatedTargetArg
                        );


                    //alert("MouseEvents " + l_event.clientX);


                break;

                default:
                    //error("MetaWrap.Page.Event: unknown event class " + l_event_class);
                    // Init the event
                    //l_event.initEvent(l_event_type,true,false);
                    return null;

                break;

            }
        }
    }

    return l_event;
}

/*!
    @fn         MetaWrap.Page.Event.get = function(p_event,p_element)
    @param      p_event The event we want to dump
    @param      p_element The element the event is occuring on
    @return     void
    @brief      Dumps an event to an alert
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Attempt to replace the code below with one of the following

    //return p_event||getEvent(window.event||(this.ownerDocument?this.ownerDocument.parentWindow.event:this.parentWindow.event))</P>
    //return p_event||getEvent(window.event||(p_element.ownerDocument||p_element).parentWindow.event)

*/
MetaWrap.Page.Event.get = function(p_event,p_element)
{

    // if we have no p_event - then use window.event
    if (!p_event)
    {
        // Try the IE way
        var l_event = window.event;
        // Could this be coming from an external frame?
        if (l_event == null)
        {
            // try the IE way of getting to an external frame event
            l_event = p_element.parentWindow.event;
        }

        return l_event;
    }
    else
        return p_event;
}


/*!
    @fn         MetaWrap.Page.Event.Observe = function(p_element, p_name, p_observer, p_capture)
    @param      p_event The event we want to dump
    @param      p_description The decription of the event
    @return     void
    @brief      Dumps an event to an alert
    @author     James Mc Parlane
    @date       6 September 2004
    @todo       Replace this with MetaWrap.Page.Element.addEventListener
*/
MetaWrap.Page.Event.Observe = function(p_element, p_name, p_observer, p_capture)
{
   if (p_element.addEventListener)
    {
      //this.observers.push([p_element, p_name, p_observer, p_capture]);
      p_element.addEventListener(p_name, p_observer, p_capture);
    }
    else if (p_element.attachEvent)
    {
      //this.observers.push([p_element, p_name, p_observer, p_capture]);
      p_element.attachEvent('on' + name, p_observer);
    }
}


/*!
    @fn         MetaWrap.Page.Event.Alert = function(p_event,p_description)
    @param      p_event The event we want to put into an alert
    @param      p_description The decription of the event
    @return     void
    @brief      Dumps an event to an alert
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Alert = function(p_event,p_description)
{
    var l_string = p_description;
    l_string += "\n";
    l_string += "\n";

    l_string += "NAME\tVALUE";

    if (p_event)
    {
        l_string += "\n";

        /*
        if (p_event.x)
        {
            l_string += "X" + "\t" + p_event.x;
            l_string += "\n";
        }

        if (p_event.y)
        {
            l_string += "Y" + "\t" + p_event.y;
            l_string += "\n";
        }
        */

        l_string += "type" + "\t" + p_event.type;
        l_string += "\n";

        if (p_event.button != -1)
        {
            l_string += "button" + "\t" + p_event.button;
            l_string += "\n";
        }

        l_string += "clientX" + "\t" + p_event.clientX;
        l_string += "\n";
        l_string += "clientY" + "\t" + p_event.clientY;
        l_string += "\n";


        if (p_event.keyCode != -1)
        {
            l_string += "keyCode" + "\t" + p_event.keyCode;
            l_string += "\n";
        }

        l_string += "altKey" + "\t" + p_event.altKey;
        l_string += "\n";
        l_string += "ctrlKey" + "\t" + p_event.ctrlKey;
        l_string += "\n";
        l_string += "shiftKey" + "\t" + p_event.shiftKey;
        l_string += "\n";
    }

    alert(l_string);
}

/*!
    @fn         MetaWrap.Page.Event.Dump = function(p_event,p_description)
    @param      p_event The event we want to dump
    @param      p_description The decription of the event
    @return     void
    @brief      Dumps an event to an alert
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.Dump = function(p_event,p_description)
{
    var l_description = "";

    if (p_description != "")
    {
        l_description += p_description +  ",";
    }

    l_description +=  p_event.type + "," + p_event.button + "," + p_event.clientX + "," + p_event.clientY + ",*" + p_event.keyCode + "*," + p_event.altKey + "," + p_event.ctrlKey + "," + p_event.shiftKey;

    // describe IE selection info
    if (document.selection)
    {
        // We know we are in a selection type event -
        var l_range = document.selection.createRange();

        l_description += " [" + l_range.boundingLeft + "x" + l_range.boundingTop  + "-" + l_range.boundingWidth + "x" + l_range.boundingHeight + " (" + l_range.text.length + ") chars]";
    }

    return l_description
}

/*!
    @fn         MetaWrap.Page.Event.send = function(p_event,p_element,p_event_type)
    @param      p_event The event we want to dump
    @param      p_element The element we want to send the event to
    @param      p_event_type The event type we want to send
    @return     void
    @brief      Dumps an event to an alert
    @author     James Mc Parlane
    @date       6 September 2004
*/
MetaWrap.Page.Event.send = function(p_event,p_element,p_event_type)
{
    //alert("MetaWrap.Page.Event.send");
    // IE?
    if (p_element.fireEvent)
    {
        // Fire off the event
        p_element.fireEvent("on" + p_event_type,p_event);
    }
    else
    // DOM?
    if (p_element.dispatchEvent)
    {
        // Dispatch the event
        p_element.dispatchEvent(p_event);
    }
}

/*!
    @fn         MetaWrap.Page.Element.stopPropagation = function(p_event)
    @param      p_event Reference to the event we want to cancel
    @return     void
    @brief      Cancels an event.
    @author     James Mc Parlane
    @date       23 October 2005

    Allows events listeners on the current element to fire,
    but prevents any listeners on any other events from firing.
*/
MetaWrap.Page.Event.stopPropagation = function(p_event)
{

    // If we have a native version
    if (p_event.stopPropagation)
    {
        // Then use it
        p_event.stopPropagation();
    }
    else
    {
        // Simulate it - the rest of the simulation code will interpret cancelBubble correctly
        p_event.cancelBubble = true;
    }
}



/*!
    @fn         MetaWrap.Page.Event.getEventAndTarget = function(p_event)
    @return     void
    @brief      Sets some global variables and determines the current event target and
    @author     James Mc Parlane
    @date       6 September 2005
    @warning    I assume the JavaScript is single threaded, if this ever changes then the following needs to be rethought.
*/
MetaWrap.Page.Event.getEventAndTarget = function(p_event)
{
    // Our evaluated event
    var l_event = p_event;

    // Our evaluated target
    var l_target = null;

    // Deal with IE6
    if (!l_event)
    {
         l_event = window.event;
    }

    // Get the event target
    if (l_event.target)
    {
        // The IE way
        l_target = l_event.target;
    }
    else
    if (l_event.srcElement)
    {
        // The Netscape way
        l_target = l_event.srcElement;
    }

    // defeat Safari bug
    if (l_target && l_target.nodeType == 3)
    {
        l_target = l_target.parentNode
    }

    // Remember these
    MetaWrap.Page.Element.m_event = l_event;
    MetaWrap.Page.Element.m_target = l_target;
}


/*!
    @fn         MetaWrap.Page.Event.getTarget = function(p_event)
    @return     void
    @brief      Get the target element
    @author     James Mc Parlane
    @date       6 September 2005
    @warning    I assume the JavaScript is single threaded, if this ever changes then the following needs to be rethought.
*/
MetaWrap.Page.Event.getTarget = function(p_event)
{
	alert("MetaWrap.Page.Event.getTarget");

    // Our evaluated event
    var l_event = p_event;

    // Our evaluated target
    var l_target = null;

    // Deal with IE6
    if (!l_event)
    {
         l_event = window.event;
    }

    // Get the event target
    if (l_event.target)
    {
        // The IE way
        l_target = l_event.target;
    }
    else
    if (l_event.srcElement)
    {
        // The Netscape way
        l_target = l_event.srcElement;
    }

    // defeat Safari bug
    if (l_target && l_target.nodeType == 3)
    {
        l_target = l_target.parentNode
    }

    // Remember these
    return l_target;
}


/*!
 *@} endgroup mw_javascript_lib_page_event MetaWrap - JavaScript - Page - Event
 */

/*!
 *@} end of MetaWrap.Page.Event
 */



