/*

    @file mw_lib_page_element_addhandler.js

    $Id: mw_lib_page_element_addhandler.js,v 1.33 2007/08/14 09:10:53 james Exp $

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

    In addition, as a special exception, Massive Technologies
    gives permission for parties to develop 'Plugins' via the
    'PluginManager'. Said party is free to develop a proprietary
    'Plugin' and will not be forced to distribute source code for that
    'Plugin', but we of course encourage them to do so. You must obey the GNU
    General Public License in all respects for all of the code used
    other than interfacing with the 'PluginManager'.  If you modify this
    file, you may extend this exception to your version of the file, but
    you are not obligated to do so.  If you do not wish to do so, delete
    this exception statement from your version.
*/

/*
 * $Log: mw_lib_page_element_addhandler.js,v $
 * Revision 1.33  2007/08/14 09:10:53  james
 * Trying to load data from local filesystem
 *
 * Revision 1.32  2007/08/07 10:23:50  james
 * WireWrap prototype example working with Adobe Fireworks CS3
 *
 * Revision 1.31  2007/01/20 01:23:51  james
 * More progress with Editor
 *
 * Revision 1.30  2006/09/12 05:49:43  james
 * Latest changes to the macro recorder to deal with pre-existing application event listeners
 *
 * Revision 1.1  2006/08/21 11:16:45  james
 * Added macro recorder
 *
 * Revision 1.29  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.28  2006/05/09 10:04:56  james
 * 'jsunit' is taken - now called 'tester'
 *
 * Revision 1.27  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.26  2006/05/06 08:21:10  james
 * More refactoring
 *
 * Revision 1.25  2006/05/03 13:11:33  james
 * Working on getting tester testing framework up and running again.
 *
 * Revision 1.24  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.23  2005/10/23 07:57:32  james
 * Added better garbage collector code that uses scrubbing
 * Made sure that cancelEvent and stopPropagation works as advertised.
 *
 * Revision 1.22  2005/10/03 00:20:37  james
 * Working on wirewrap testcases.
 * Porting to use new addEventListener
 *
 * Revision 1.21  2005/09/27 10:39:05  james
 * Fixed another behavior quirk
 *
 * Revision 1.20  2005/09/26 13:36:29  james
 * Fixed issue with Netscape6
 *
 * Revision 1.19  2005/09/26 13:12:19  james
 * Fixign issue under Safari
 *
 * Revision 1.18  2005/09/26 12:38:13  james
 * *** empty log message ***
 *
 * Revision 1.17  2005/09/26 12:34:11  james
 * Fixed an issue in Safari - and of course I'm not detecting Geko, but Mozilla.
 *
 * Revision 1.16  2005/09/26 11:55:05  james
 * Emulating a Mozilla Quirk
 *
 * Revision 1.15  2005/09/26 04:15:57  james
 * Reconsidering moving the existing inline/assigned listener code
 * into MetaWrap.Page.listen. There is a difference between
 * the way that addEventListener deals with these. Once I
 * know what Safari does in this situation I have some hope
 * of emulating the behavior and providing some consistent
 * behavior across all browsers.
 *
 * Revision 1.14  2005/09/26 03:15:26  james
 * Decided to remove last change to MetaWrap.Page.Element.addEventListener
 * which preserves inline/assigned listeners so that it behaves consistently under
 * Firefox.
 *
 * Moved the behavior to MetaWrap.Page.listen where it makes more sense.
 *
 * Revision 1.13  2005/09/25 13:47:27  james
 * Added automatic javascript namespace/object dependancy
 * resolution so that you can just include top level namespace
 * js libs and they can specify what else is required and load the
 * files in the correct order.
 *
 * Improved MetaWrap.Page.Element.addEventListener so that
 * it deals with existing listeners that have been added by asignment
 * or by inlining.
 *
 * Revision 1.12  2005/09/23 22:04:10  james
 * Fixed issue with splice in IE5
 *
 * Revision 1.11  2005/09/23 07:34:36  james
 * Tidied up some of the comments.
 *
 * Revision 1.10  2005/09/22 07:40:26  james
 * Fixed bug that I added when adding MetaWrap call. Stupid typo.
 *
 * Revision 1.8  2005/09/22 06:48:40  james
 * Added support for IE5
 *
 * Revision 1.7  2005/09/21 16:54:08  james
 * Fixed some bugs introduced by moving some of the code around.
 * Revision 1.5  2005/09/21 16:46:57  james
 * Fixed some typos in the test cases
 * Tried to get IE5 support happening, but I'm too sleepy
 *
 * Revision 1.4  2005/09/21 15:01:50  james
 * Latest Release
 *
 * Revision 1.3  2005/09/21 13:07:53  james
 * Normalising function names so that doxygen generates
 * better comments.
 *
 * Revision 1.2  2005/09/21 08:26:57  james
 * Some more documentation
 *
 * Revision 1.1  2005/09/21 06:47:23  james
 * Moved some code around into more logical
 * namespaces.
 *
 * Revision 1.21  2005/09/21 05:59:57  james
 * Added full w3c emulation mode
 * Split up some of the functions so that code is reused
 * a bit more and less parameters are being passed
 * around, more code and a bit uglier, but faster.
 *
 * Revision 1.20  2005/09/20 13:36:18  james
 * Starting to add some modes to control W3C compliance
 * and garbage collection. Seems that Opera is the only browser
 * to correctly implement addEventListener, which complicates
 * things a bit.
 *
 * Revision 1.19  2005/09/20 12:13:18  james
 * removed an anoying alert
 *
 * Revision 1.18  2005/09/20 12:02:35  james
 * Found a bug in Opera
 *
 * Revision 1.17  2005/09/20 08:22:41  james
 * Added garbage collector and fixed bug
 * in MetaWrap.Page.Element.deleteListeners
 *
 * Revision 1.14  2005/09/20 06:33:53  james
 * More test cases that helped me decide that 100% emulation with mixed
 * mode event listeners is not practical.
 *
 * Revision 1.13  2005/09/20 05:44:24  james
 * More test cases
 *
 * Revision 1.12  2005/09/20 03:47:14  james
 * Trying to capture possible behavior differences between
 * MetaWrap.Page.Element.addEventListener and addEventListener
 *
 * Revision 1.11  2005/09/20 03:38:29  james
 * Making the code a little more tidy and useful
 *
 * Revision 1.10  2005/09/13 15:30:30  james
 * Got a few more test cases to write to test the
 * assumptions made in this code.
 *
 * Revision 1.9  2005/09/13 08:36:27  james
 * Working on better testcase
 *
 * Revision 1.8  2005/09/12 11:43:46  james
 * Tweaking event simulation code
 *
 * Revision 1.7  2005/09/08 15:14:39  james
 * First attempt - not to bad.. An issue with IE
 * Opera And Safari work fine.
 *
 * Revision 1.6  2005/09/08 14:38:23  james
 * Saw this post
 *
 * http://www.quirksmode.org/blog/archives/2005/09/addevent_recodi.html
 *
 * And decided to enter.
 *
 * Revision 1.5  2005/09/06 13:07:37  james
 * Building a model that tests event capture vs bubbling
 *
 * Revision 1.4  2005/09/05 14:31:52  james
 * Created alternative event stacker
 *
 * Revision 1.2  2005/09/04 06:58:34  james
 * Happy fathers day to me :)
 * Created stub for event stacker
 *
 * Revision 1.1  2005/09/01 12:09:52  james
 * Adding event handler class
 *
 */

/*! \page mw_javascript_lib_page_addhandler MetaWrap - JavaScript - Page -  Element - AddHandler

\section mw_javascript_lib_page_addhandler_description Description

This file implements a complete replacement for the W3C standard functions addEventListener and removeEventListener.


\section mw_javascript_lib_page_addhandler_functions Functions Implemented

\subsection mw_javascript_lib_page_addhandler_addEventListener addEventListener

MetaWrap.Page.Element.addEventListener(p_element,p_event_type,p_function,p_capture);

This is a complete replacement for W3C element.addEventListener. The parameters are the same as the W3C version of the function with the same name

\subsection mw_javascript_lib_page_addhandler_removeEventListener removeEventListener

MetaWrap.Page.Element.removeEventListener(p_element,p_event_type,p_function,p_capture);This is a complete replacement for W3C element.removeEventListener.
The parameters are the same as the W3C version of the function with the same name

Here is a testcase that tests both addEventListener and removeEventListener.

\subsection mw_javascript_lib_page_addhandler_deleteListeners deleteListeners

MetaWrap.Page.deleteListeners();This function implements the classic IE memory leak fix and should only be executed at window.onunload

\subsection mw_javascript_lib_page_addhandler_garbageCollectListeners garbageCollectListeners

MetaWrap.Page.garbageCollectListeners();This function will garbage collect any dangling element references.

There is a global variable MetaWrap.Page.m_listeners_auto_garbage that if set to true will force a garbage collect after every event.

\section mw_javascript_lib_page_addhandler_options Options

MetaWrap.Page.m_listeners_strict_w3c = false;

Its default behavior (false) is to force all browsers to behave like Netscape/Mozilla/Firefox and Safari. If we are running Opera, we execute the same emulation mode that we use for IE.

If you set its value to true however, it will emulate for all other browsers the way that Opera handles its event propagation.

The logic behind this decision is rational yet complicated but it comes down to providing a choice for the developer who can choose performance vs compliance but still maintain consistency across all browsers.

*/

// Used for debugging
//alert("$Id: mw_lib_page_element_addhandler.js,v 1.33 2007/08/14 09:10:53 james Exp $");

/*! \defgroup mw_javascript_lib_page_addhandler  MetaWrap - JavaScript - Page -  Element - AddHandler
 *@{
 */

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.Page","mw_lib_page.js");
MwUse("MetaWrap.Page.Event","mw_lib_page_event.js");
MwUse("MetaWrap.Page.Element","mw_lib_page_element.js");

/*! @name  MetaWrap.Page.Element */
//@{

/*!
    @fn         function MetaWrap_Page_Element_addEventListener(p_element,p_event_type,p_function,p_capture)
    @param      p_element The element that is getting an event listener added to it
    @param      p_event_type A string representing the event type that we want to handle. eg: "click" for onclick()
    @param      p_function The function that should be called when the event fires. Should be in the form of fn() 'this' will be the element that the eventhandler is defined on.
    @param      p_capture If true, p_capture indicates that the user wishes to initiate capture.
    @return     bool true on success, false on failure. Will fail on a duplicate event being added.
    @brief      Adds an event listener for the specified event type to an element. If p_capture is true then the event is 'captured', otherwise it is 'bubbled'.
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       Ensure that we fail for the same parameters that addEventListener fails on

    This function provides an emulation layer for browsers that don't
    support the W3C addEventListener method and because there are two
    different ways to support the W3C spec it provides a way of specifying
    which method is to be used.

    The strict w3c way (Opera) and the way that Mozilla/Firefox and Safari support it.

    RULE1
    After initiating capture, all events of the specified type will be
    dispatched to the registered EventListener before being dispatched
    to any EventTargets beneath them in the tree. Events which are
    bubbling upward through the tree will not trigger an EventListener
    designated to use capture.

    RULE2
    If an EventListener is added to an EventTarget
    while it is processing an event, it will *not* be triggered by
    the current actions but may be triggered during a later stage
    of event flow, such as the bubbling phase.

    RULE3
    If multiple identical EventListeners are registered on the
    same EventTarget with the same parameters the duplicate
    instances are discarded. They  do not cause the EventListener
    to be called twice and since they are discarded they do not
    need to be removed with the removeEventListener method.

    RULE 4
    If a listener was registered twice, one with capture and one without,
    each must be removed separately. Removal of a capturing listener does
    not affect a non-capturing version of the same listener, and vice versa.

    RULE 5
    Even if an event is captured or bubbles up, the target/srcElement
    always remains the element the event took place on.

    RULE 6 *
    A capturing EventListener will not be triggered by events
    dispatched directly to the EventTarget upon which it is registered.

    * Seems that RULE 6 is only followed by Opera

    BEHAVIOR 1 *ON TRIAL*
    The Mozilla based browsers do something extra in addEventListener, they preserve
    the inline/assigned listeners as capture mode events - I emulate the behavior below.

    My only justification for this is that.

    1) It standardises behaviors (and yes I choose geko as the default behavior because of point 2)
    2) Its going to make more robust code. In WireWrap behaviors I don't want
    to inadvertently clobber the existing inline/assigned listeners so I have
    decided to 'do no harm'.

    Only time will tell for this one.

    BEHAVIOR 2 *ON TRIAL*

    Fixed issue in the following sequence under Emulation mode

    MetaWrap.Page.Element.addEventListener(l_a3,"click",f1,true);
    l_a3.onclick = f3;
    l_a3.onclick = f4;
    MetaWrap.Page.Element.addEventListener(l_a3,"click",f2,true);

    So the events will fire in the order

    f1,f4,f2 as they do on other browsers that use addEventListener

*/
function MetaWrap_Page_Element_addEventListener(p_element,p_event_type,p_function,p_capture)
{

    // If we don't need to emulate addEventListener...
    if (!MetaWrap.Page.shouldEmulateEventPropagation())
    {
        // START - BEHAVIOR 1 *ON TRIAL* (see function comments for explanation of this bit)
        // Is there an old inline/assigned listener?
        var l_current_inline_listener = p_element["on" + p_event_type];

        // If we had an old listener that is not the shim...
        if ((l_current_inline_listener != null) && (l_current_inline_listener != MetaWrap.Page.Element.listenerShimFunction))
        {
            // make sure its gone - or Safari will get this very wrong because as long as its not null - it will fire in safari as a bubbling handler
            p_element["on" + p_event_type] = null;

            // then register it as a listener before we add p_function to preserve order
            p_element.addEventListener(p_event_type,l_current_inline_listener,true);
        }
        // END - BEHAVIOR 1 *ON TRIAL* (see function comments for explanation of this bit)

        // No need to emulate addEventListener - just use the native version
        p_element.addEventListener(p_event_type,p_function,p_capture);
        return true;
    }
    else
    {

        // Fake addEventListener - emulating

        // Generate a uniqueid for the element
        var l_unique_id = (p_element == window)?"window":MetaWrap.Page.Element.uniqueID(p_element);

        // Get a reference to the listeners for this element by using a
        // unique identifier to check for the element in a hash table
        var l_listeners = MetaWrap.Page.m_elements_listeners[l_unique_id];

        // No collection of listeners for this element?
        if (!l_listeners)
        {
            // Create one using the elements unique id
            l_listeners = MetaWrap.Page.m_elements_listeners[l_unique_id] = {m_element:p_element,m_listener_stacks:[]};
        }

        // Get the listener stack for this event type
        var l_listener_stack = l_listeners.m_listener_stacks[p_event_type];

        // Is there no event stack?
        if (!l_listener_stack)
        {
            // Create a listener stack
            l_listener_stack = l_listeners.m_listener_stacks[p_event_type] = [];

            // START - BEHAVIOR 1 *ON TRIAL* (see function comments for explanation of this bit)
            // Is there an old inline/assigned listener
            var l_current_inline_listener = p_element["on" + p_event_type];

            // If we had an old listener that is not the shim... (if it *was* the shim I would be worried if we got here - should be able to loose this comparison)
            if ((l_current_inline_listener != null) && (l_current_inline_listener != MetaWrap.Page.Element.listenerShimFunction))
            {
                // then register it as a listener before we add the current one to the list of listeners below, to preserve order
                l_listener_stack[l_listener_stack.length] = {m_listener:l_current_inline_listener,m_capture:true};
            }
            // END - BEHAVIOR 1 *ON TRIAL* (see function comments for explanation of this bit)

            // Add the main listener for this event type
            p_element["on" + p_event_type] = MetaWrap.Page.Element.listenerShimFunction;
        }
        else
        {
            /*
                There was a pre-existing event stack, so we have some
                pre-existing listeners for this event type, so lets
                check for duplicates
            */

            // Now compare to every listener we have
            var i = 0;
            for(;i<l_listener_stack.length;i++)
            {
                /*
                    we are looking in the listener stack for by p_element and p_event_type
                    so if we find a duplicate
                    and if we get a match..
                */
                if ((l_listener_stack[i].m_listener === p_function) && (l_listener_stack[i].m_capture == p_capture))
                {
                    /*
                        Reading from the book of W3C - chapter addEventListener

                        "When EventListeners are registered on the same EventTarget
                        with the same parameters the duplicate instances are discarded.
                        They do not cause the EventListener to be called twice and since
                        they are discarded they do not need to be removed with the
                        removeEventListener method."
                    */

                    return false;
                }
            }

            // START - BEHAVIOR 2 *ON TRIAL* (see function comments for explanation of this bit)
            // Get the current inline listener
            var l_current_inline_listener = p_element["on" + p_event_type];

            // If we had an old listener that is not the shim...
            if ((l_current_inline_listener != null) && (l_current_inline_listener != MetaWrap.Page.Element.listenerShimFunction))
            {
                // make sure its gone - or Safari will get this very wrong because as long as its not null - it will fire in safari as a bubbling handler
                p_element["on" + p_event_type] = null;

                // Add this changed listener
                l_listener_stack[l_listener_stack.length] = {m_listener:l_current_inline_listener,m_capture:true};

                // Resurrect the clobbered shim
                p_element["on" + p_event_type] = MetaWrap.Page.Element.listenerShimFunction;
            }
            // END - BEHAVIOR 2 *ON TRIAL* (see function comments for explanation of this bit)
        }

        // Add the listener and capture flag to the listener stack for this element/event_type
        l_listener_stack[l_listener_stack.length] = {m_listener:p_function,m_capture:p_capture};
        return true;
    }

    // And so how do we get here? :)
    return false;
}

/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.Element.addEventListener = MetaWrap_Page_Element_addEventListener;

/*!  @brief Shortcut to MetaWrap.Page.Element.addEventListener */
var MWPEaEL = MetaWrap_Page_Element_addEventListener;


/*!
    @fn         function MetaWrap_Page_Element_listenerShimFunction(p_event)
    @param      p_event The event that we are processing
    @return     void
    @brief      This is the master function that acts as a shim between the normal event system and the event emulation system.
    @author     James Mc Parlane
    @date       6 September 2005
*/
function MetaWrap_Page_Element_listenerShimFunction(p_event)
{

    // Work out the target and event
    MetaWrap.Page.Event.getEventAndTarget(p_event);

    //  These are the vital elements of this event
    var l_event = MetaWrap.Page.Element.m_event;
    var l_target = MetaWrap.Page.Element.m_target;

    // This will store the resultant elements for bubbling
    var l_bubbling_elements = [];

    /*
        Recurse the element tree all the way to the bottom, firing off any capture
        events that we have and return a list of elements in the correct order to
        execute a bubbling run.
    */
    MetaWrap.Page.Element.recurseElementsAndCapture(this,l_bubbling_elements);

    // If nothing cancelled bubbling - then bubble..
    if (!l_event.cancelBubble)
    {
        // Now l_bubbling_elements contains a list of all the events that we should bubble....
        for(var i = 0;i<l_bubbling_elements.length;i++)
        {
            // Get its unique ID
            var l_unique_id = (this == window)?"window":MetaWrap.Page.Element.uniqueID(l_bubbling_elements[i]);

            // Get the listeners for this element
            var l_element_listeners = MetaWrap.Page.m_elements_listeners[l_unique_id];

            // if we have some listeners
            if (l_element_listeners)
            {
                // Get the listener stack for this event
                var l_listener_stack = l_element_listeners.m_listener_stacks[l_event.type];

                // If we have a listener stack
                if (l_listener_stack)
                {
                    // then bubble ourselves
                    for(var l = 0;l<l_listener_stack.length;l++)
                    {
                        // If we are not capturing - then we are bubbling.
                        if (!l_listener_stack[l].m_capture)
                        {
                            // Even if an event is captured or bubbles up, the target/srcElement always remains the element the event took place on.
                            MetaWrap.doCall(l_listener_stack[l].m_listener,l_bubbling_elements[i],l_event);
                        }
                    }
                }
                else
                // .. let all the rest fire using listeners assigned using the inline or traditional method
                {
                    var l_listener = l_bubbling_elements[i]["on"+l_event.type];
                    if (l_listener)
                    {
                        // Even if an event is captured or bubbles up, the target/srcElement always remains the element the event took place on.
                        MetaWrap.doCall(l_listener,l_bubbling_elements[i],l_event);
                    }
                }
            }

            // If someone wants out - then leave
            if (l_event.cancelBubble)
            {
                // then we break out of the bubbling loop
                break;
            }
        }
    }

    // Now - 'officialy' Stop all bubbling - because we just faked it perfectly (cross fingers)

    // The W3C way?
    if (l_event.stopPropagation)
    {
        l_event.stopPropagation();
    }
    else
    {
        // The IE way
        l_event.cancelBubble = true;
    }

    // Call garbage collector to unhook any elements that have since been removed
    if (MetaWrap.Page.m_listeners_auto_garbage)
    {
        MetaWrap.Page.garbageCollectListeners();
    }
}

/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.Element.listenerShimFunction = MetaWrap_Page_Element_listenerShimFunction;


/*!
    @fn         MetaWrap.Page.Element.recurseElementsAndCapture = function (p_element,p_bubbling_elements)
    @param      p_event_type A string representing the event type that we are processing
    @param      p_bubbling_elements An array that we will place referenced to elements to be later bubbled into.
    @return     void
    @brief      Bubbles up to the document root, adding referenced to p_bubbling_elements as it goes, on the way back it calls capture listeners
    @author     James Mc Parlane
    @date       6 September 2005
*/
MetaWrap.Page.Element.recurseElementsAndCapture = function (p_element,p_bubbling_elements)
{
    /*
        We must record all elements as potential bubbling points, its possible
        that one handler can add an event of p_event_type on an ancestor
        element that will be called as we bubble up. I would dearly love to
        cache l_unique_id and l_element_listeners, but this element may not
        be registered yet. It is possible that its entry in
        MetaWrap.Page.m_elements_listeners is destroyed and created as
        child listener functions register and de-register event handlers.
    */

    // Remember this for bubbling later on..
    p_bubbling_elements[p_bubbling_elements.length] = p_element;

    // Recurse deeper
    if ((p_element != null) && (p_element.parentNode != null))
    {
        MetaWrap.Page.Element.recurseElementsAndCapture(p_element.parentNode,p_bubbling_elements);
    }

    // And now in reverse
    var l_unique_id = (p_element == window)?"window":p_element.uniqueID;

    // Get the listeners for this element
    var l_element_listeners = MetaWrap.Page.m_elements_listeners[l_unique_id];

    // if we have some listeners and bubling has not been canceled
    if ((l_element_listeners) && (!MetaWrap.Page.Element.m_event.cancelBubble))
    {
        // This will store the stack of listeners for the element/event pair
        var l_listener_stack = null;

        // Get the listener stack for this event
        l_listener_stack = l_element_listeners.m_listener_stacks[MetaWrap.Page.Element.m_event.type];

        // If we have a listener stack
        if (l_listener_stack)
        {
            // Call each of our capturing listeners for this element
            for(var i = 0;i<l_listener_stack.length;i++)
            {
                // Is this a capturing listener  and we should not skip this event in strict W3C mode...
                if ((l_listener_stack[i].m_capture) && (!(MetaWrap.Page.m_listeners_strict_w3c && (MetaWrap.Page.Element.m_target == p_element))))
                {
                    // Yes.. so call it..
                    MetaWrap.doCall(l_listener_stack[i].m_listener,p_element,MetaWrap.Page.Element.m_event);
                }
            }
        }
    }
}



/*!
    @fn         function MetaWrap_Page_Element_removeEventListener(p_element,p_event_type,p_function,p_capture)
    @param      p_element The element that we are removing the handler from
    @param      p_event_type A string representing the event type that we want to remove. eg:  "click" for onclick()
    @param      p_function The function that would be called when the event fires. We will match on this and remove it
    @param      p_capture Specifies whether the EventListener registered with MetaWrap.Page.AddHandler that is being removed was registered as a capturing listener or not. If a listener was registered twice, one with capture and one without, each must be removed separately. Removal of a capturing listener does not affect a non-capturing version of the same listener, and vice versa.
    @return     bool true on success, false on failure
    @brief      Removes an event
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       Find a replacement for splice - IE5 does not implement it

    RULE 4
    If a listener was registered twice, one with capture and one without,
    each must be removed separately. Removal of a capturing listener does
    not affect a non-capturing version of the same listener, and vice versa.
*/
function MetaWrap_Page_Element_removeEventListener(p_element,p_event_type,p_function,p_capture)
{
    // Do we have t emulate?
    if (!MetaWrap.Page.shouldEmulateEventPropagation())
    {
        // No
        p_element.removeEventListener(p_event_type, p_function, p_capture);
        return true;
    }
    else
    {
        // Yes - lets emulate removeEventListener

        // Get a reference to the listeners for this element by using a
        // unique identifier to check for the element in a hash table
        var l_listeners = MetaWrap.Page.m_elements_listeners[p_element.uniqueID];

        // No listeners for this element?
        if (!l_listeners)
        {
            // Then we have nothing to remove - return false, an error state
            return false;
        }

        // Get the listener stack for this event type
        var l_listener_stack = l_listeners.m_listener_stacks[p_event_type];

        // Is there an event stack?
        if (!l_listener_stack)
        {
            // That event tupe is not being used..
            return false;
        }

        // Now compare to every listener we have

        for(var i = 0;i<l_listener_stack.length;i++)
        {
            //.. and if we get a match..
            if ((l_listener_stack[i].m_listener == p_function) && (l_listener_stack[i].m_capture == p_capture))
            {
                // remove it
                MetaWrap.doRemove(l_listener_stack,i);

                // if we have no more
                if (l_listener_stack.length == 0)
                {
                    // No handlers required for this type
                    p_element[p_event_type] = null;

                    // null and off to the garbage collector
                    delete l_listeners.m_listener_stacks[p_event_type];

                    // and if listeners is now empty - we have no events at all for this element
                    if (l_listeners.m_listener_stacks.length == 0)
                    {
                        // null and then off to the garbage collector
                        delete MetaWrap.Page.m_elements_listeners[p_element.uniqueID];
                    }
                }
                return true;
            }
        }
    }

    // And so how do we get here? :)
    return false;
}

/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.Element.removeEventListener = MetaWrap_Page_Element_removeEventListener;

/*!  @brief Shortcut to MetaWrap.Page.Element.addEventListener */
var MWPErEL = MetaWrap_Page_Element_removeEventListener;


/*!
    @fn         function MetaWrap_Page_Element_deleteListeners(p_element_guid)
    @param      p_element_guid The unique id of the element that we are going to delete all the listeners for
    @return     void
    @brief      Deletes all the listeners for a given element
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       Need to test this for leaks - I suspect I need to null/delete a little deeper.
*/
function MetaWrap_Page_Element_deleteListeners(p_element_guid)
{
        // Get the listeners for this elment
        var l_listeners = MetaWrap.Page.m_elements_listeners[p_element_guid];

        // We have listeners
        if (l_listeners)
        {
            // For each of the event types listeners in that element
            for(var l_event_type in l_listeners.m_listener_stacks)
            {
                // Clear the event type list
                l_listeners.m_element["on" + l_event_type] = null;

                // Dispose of the Array of functions and capture flags
                delete l_listeners.m_listener_stacks[l_event_type];
            }

            // Clear the element
            l_listeners.m_element = null;
        }

        // Dispose of the element handler
        delete MetaWrap.Page.m_elements_listeners[p_element_guid];
}
/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.Element.deleteListeners = MetaWrap_Page_Element_deleteListeners;



/*!
    @fn         function MetaWrap_Page_garbageCollectListeners()
    @return     void
    @brief      Garage collects any event listener stacks for elements that no longer exist.
    @author     James Mc Parlane
    @date       6 September 2005

    If you call this you may have issues with any elements that you construct
    outside the document (using createElement) if you add listeners to the
    elements  before you insert the elements into the document and then call
    MetaWrap.Page.garbageCollectListeners before such an element is added
    to the document.

    It will strip away your event listeners.

*/
function MetaWrap_Page_garbageCollectListeners()
{
    //alert("MetaWrap.Page.garbageCollectListener");

    // Should we emulate?
    if (!MetaWrap.Page.shouldEmulateEventPropagation())
    {
        // No - in which case there is nothing to do
        return;
    }
    else
    {
        // For all the events we have events registered with
        for(var l_element in MetaWrap.Page.m_elements_listeners)
        {
            // get a reference to the element
            var l_element_reference = MetaWrap.Page.m_elements_listeners[l_element].m_element;

            // save a copy for later so we can scrub this element
            var l_element_reference_actual = l_element_reference;

            // bubble back up its parents till we get the containing document, or null
            while((l_element_reference != null) && (l_element_reference != document))
            {
                l_element_reference = l_element_reference.parentNode;
            }

            // If we got null, then this element does not belong to the DOM any more
            if (l_element_reference == null)
            {
                // Make sure all its listeners are deleted
                MetaWrap.Page.Element.deleteListeners(l_element);

                // Scrub it clean of possible circular references
                MetaWrap.Page.Element.scrub(l_element_reference_actual);
            }
        }
    }
}

/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.garbageCollectListeners = MetaWrap_Page_garbageCollectListeners;


/*!
    @fn         function MetaWrap_Page_deleteListeners()
    @return     void
    @brief      Walks the whole event element tracking array and nulls everything to guard against IE memory leak
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       Need to test this for leaks - I suspect I need to null/delete a little deeper.
    @todo       Test how delete affects for/for in - does it skip?
*/
function MetaWrap_Page_deleteListeners()
{
    //alert("MetaWrap.Page.deleteListeners");

    // For each set of listeners for a given element
    for(var l_element in MetaWrap.Page.m_elements_listeners)
    {
        // get a reference to the element
        var l_element_reference = MetaWrap.Page.m_elements_listeners[l_element].m_element;

        // Delete all its listeners
        MetaWrap.Page.Element.deleteListeners(l_element);

        // Scrub it clean of possible dangling circular references
        MetaWrap.Page.Element.scrub(l_element_reference);
    }

    // Out with the old - let the garbage collector do the rest
    MetaWrap.Page.m_elements_listeners = new Array();
}

/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.deleteListeners = MetaWrap_Page_deleteListeners;


/*!
    @fn         function MetaWrap_Page_shouldEmulateEventPropagation()
    @return     void
    @brief      Returns true if we should emulate event propogation
    @author     James Mc Parlane
    @date       6 September 2005
    @todo       I assume that document.addEventListener implies element.addEventListener and document|element.removeEventListener Is this correct?
*/
function MetaWrap_Page_shouldEmulateEventPropagation()
{

    // We have the ability to not emulate
    if (document.addEventListener)
    {
        // but if we want strict w3c compliance then its gets tricky
        if (MetaWrap.Page.m_listeners_strict_w3c)
        {
            // because at this point in time, only opera
            // does it properly, so we emulate if we are
            // not opera
            return !window.opera;
        }
        else
        {
            // all the other browsers have a defacto standard
            // that opera does not follow, because it follows
            // the W3C spec - so we want to emulate the defacto
            // standard for Opera
            return window.opera;
        }
    }
    else
    {
        // We have no choice, we have to emulate
        return true;
    }
}

/*!  @brief Publish In Namespace - functions created this way are for export */
MetaWrap.Page.shouldEmulateEventPropagation = MetaWrap_Page_shouldEmulateEventPropagation;


/*!
    @var        MetaWrap.Page.m_elements_listeners
    @brief      Array of handlers that contains the listeners for all the event types for all the elements

    Each handler tracks an element

    For each element there is a collection of event types.
    For each event type there is a collection of listeners.
    Each listener has a reference to a function and a flag.
    that determined if the event is using bubbling or capture..

    eg.

    MetaWrap.Page.m_elements_listeners[eventid].m_listener_stacks[event_type][listener].
*/
MetaWrap.Page.m_elements_listeners = new Array();


/*!
    @var        MetaWrap.Page.m_listeners_strict_w3c
    @brief      Determines if we follow the strict W3C intrepretation.

    If this is false then we emulate for Opera and IE. If this is true then
    we follow the strict W3C specification, which means we are emulating
    for all browsers other than Opera.

    At the time of writing this comment, the current version of Opera (8.5)
    is the only browser to addEventListener properly.

    http://blog.metawrap.com/blog/OperaBug180474Doh.aspx
*/
MetaWrap.Page.m_listeners_strict_w3c = false;


/*!
    @var        MetaWrap.Page.m_listeners_auto_garbage
    @brief      If true we automatically garbage collect after every event

    If you are destroying and creating lots of elements with listeners then
    to avoid memory leaks, you need to perform a listener garbage collect.

    If you make this true, you may have issues with any elements that you construct
    outside the document (using createElement) if you add listeners to the
    elements before you insert the elements into document.

    If you call MetaWrap.Page.garbageCollectListeners before such an element is added
    to the document, it will strip away your event listeners.

*/
MetaWrap.Page.m_listeners_auto_garbage = false;


// Make sure that the garbage collector is called on window.onunload
MetaWrap.Page.Element.addEventListener(window,"unload",MetaWrap.Page.garbageCollectListeners,false);

// Make sure that we delete the whole hast table on unload
MetaWrap.Page.Element.addEventListener(window,"unload",MetaWrap.Page.deleteListeners,false);

/*!
 *@} end of MetaWrap.Page.Element
 */



