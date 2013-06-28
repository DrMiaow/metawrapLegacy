/*

    @file mw_lib_pipeline.js

    $Id: mw_lib_pipeline.js,v 1.16 2008/05/15 02:11:24 james Exp $

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
 * $Log: mw_lib_pipeline.js,v $
 * Revision 1.16  2008/05/15 02:11:24  james
 * Merged in some changed from some other projects
 *
 * Revision 1.15  2007/08/14 09:10:53  james
 * Trying to load data from local filesystem
 *
 * Revision 1.14  2006/07/01 08:06:59  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.13  2006/05/06 09:33:03  james
 * More refactoring
 *
 * Revision 1.12  2006/05/06 08:28:29  james
 * More refactoring
 *
 * Revision 1.11  2005/12/29 03:00:38  james
 * Latest lib changes
 *
 * Revision 1.10  2005/12/27 09:11:07  james
 * Latest updates
 *
 * Revision 1.9  2005/12/23 10:23:43  james
 * Latest round of work on the rendering pipeline
 *
 * Revision 1.8  2005/11/09 07:27:12  james
 * *** empty log message ***
 *
 * Revision 1.7  2005/11/02 11:41:22  james
 * Got basic remix transform happening
 *
 * Revision 1.6  2005/10/30 11:20:13  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.5  2005/10/30 09:38:51  james
 * Protoype of WireWrap based on pipline processing
 *
 * Revision 1.4  2005/10/27 13:38:40  james
 * Translating WireWrap to use pipeline
 *
 * Revision 1.3  2005/10/27 12:27:59  james
 * Revamping WireWrap to use new pipeline
 *
 * Revision 1.2  2005/10/26 14:18:16  james
 * Modified pipeline so that it can have multiple fallbacks
 *
 * Revision 1.1  2005/10/25 13:46:05  james
 * Greated degradable pipeline
 *
 */


/*! \pipeline mw_javascript_lib_pipeline MetaWrap - JavaScript - Pipeline
 *
 * \subsection mw_javascript_lib_pipeline_overview Overview
 *
 * This class implements a degradable pipeline.
 * The pipeline can be primed with a series of steps and inputs
 * If a step fails, a fallback can be provided.
 */

// Used for debugging
//alert("$Id: mw_lib_pipeline.js,v 1.16 2008/05/15 02:11:24 james Exp $");

/*! \defgroup mw_javascript_lib_pipeline  MetaWrap - JavaScript - Pipeline
 *@{
 */

// Ensure we have the namespace we need before we load this pipeline
MwUse("MetaWrap","mw_lib.js");

/*! @name  MetaWrap.Pipeline Namespace */
//@{

/*!
    @fn         function MetaWrap_Pipeline(p_name)
    @param      p_name The name of the pipeline
    @brief      Constructor for Pipeline.
    @author     James Mc Parlane
    @date       25 October 2005

    A pipeline consists of a number of nodes
*/
MetaWrap.Pipeline = function(p_name)
{
    /// The name of the pipeline
    this.m_name = p_name;

    /// The parent of the pipeline
    this.m_parent = null;

    /// The the next item, if this is a chain of items
    this.m_next = null;

    /// The nodes in the pipeline
    this.m_nodes = new Array();

    /// The start of the pipeline - automaticaly set to the first node in the pipeline
    this.m_start = null;

    /// The the last node added - used to chain the nodes together, one after anoother
    this.m_last = null;

    /// return this new object
    return this;
}



/*!
    @fn         function MetaWrap_Pipeline_add(p_name,p_process,p_fallback,p_result)
    @param      p_name The name of the pipeline node
    @param      p_process The process function reference
    @param      p_fallback The fallback function reference
    @param      p_result The result
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_add(p_name,p_process,p_fallback,p_result)
{
    // Create the new pipeline node
    var l_node = new MetaWrap.Pipeline.Node(p_name,p_process,p_fallback,p_result);

    // remember its parent
    l_node.parent(this);

    // make the first one we add the start
    if (this.m_start == null)
    {
        this.m_start = l_node;
    }

    // If we know what the last node added was, then chain it to this one
    if (this.m_last != null)
    {
        this.m_last.next(l_node);
    }

    // remember the last node added
    this.m_last = l_node;

    // Add it
    return this.m_nodes[p_name] = l_node;
}
MetaWrap.Pipeline.prototype.add = MetaWrap_Pipeline_add;


/*!
    @fn         function MetaWrap_Pipeline_add(p_name,p_process,p_fallback,p_result)
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_start(p_node)
{
    this.m_start = p_node;
}
MetaWrap.Pipeline.prototype.start = MetaWrap_Pipeline_start;


/*!
    @fn         function MetaWrap_Pipeline_run()
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_run()
{
    //alert("run pipeline " + this.m_name);

    var l_start = null;

    // If we have a known start, then run that
    if (this.m_start)
    {
        // Choose the designated start node
        l_start = this.m_start;
    }


    var l_result = null;

    while(l_start)
    {
        l_result = l_start.run();
        l_start = l_start.m_next;
    }

    // return null
    return l_result;
}
MetaWrap.Pipeline.prototype.run = MetaWrap_Pipeline_run;


/*!
    @fn         function MetaWrap_Pipeline_Node(p_name,p_process,p_fallback,p_result)
    @brief      Constructor for Pipeline node.
    @author     James Mc Parlane
    @date       25 October 2005
*/
MetaWrap.Pipeline.Node = function(p_name,p_process,p_fallback,p_result)
{
    /// The name of the Node
    this.m_name = p_name;

    /// The posible inputs
    this.m_nodes = new Array();

    /// The function that consumes the inputs and make a result
    this.m_processes = new Array();

    /// if we have a process
    if (p_process)
    {
        this.addProcess(p_process);
    }

    /// if we have a fallback
    if (p_fallback)
    {
        this.addProcess(p_fallback);
    }

    /// The cached result
    this.m_result = p_result;

    /// The next node in a pipeline
    this.m_next = null;

    /// return this new object
    return this;
}


/*!
    @fn         function MetaWrap_Pipeline_Node_next(p_name,p_process,p_fallback,p_result)
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_next(p_node)
{
    this.m_next = p_node;
}
MetaWrap.Pipeline.Node.prototype.next = MetaWrap_Pipeline_next;
MetaWrap.Pipeline.prototype.next = MetaWrap_Pipeline_next;


/*!
    @fn         function MetaWrap_Pipeline_Node_parent(p_name,p_process,p_fallback,p_result)
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_parent(p_node)
{
    this.m_parent = p_node;
}
MetaWrap.Pipeline.Node.prototype.parent = MetaWrap_Pipeline_parent;
MetaWrap.Pipeline.prototype.parent = MetaWrap_Pipeline_parent;


/*!
    @fn         function MetaWrap_Pipeline_Node_input(p_node)
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_input(p_node)
{
    this.m_nodes[p_node.m_name] = p_node;
}
MetaWrap.Pipeline.Node.prototype.input = MetaWrap_Pipeline_Node_input;

/*!
    @fn         function MetaWrap_Pipeline_Node_require(p_name,p_process,p_fallback,p_result)
    @brief      Adds a node to the requirements of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_require(p_name,p_process,p_fallback,p_result)
{
    // Create the node
    var l_node = new MetaWrap.Pipeline.Node(p_name,p_process,p_fallback,p_result);

    // remember its parent
    l_node.parent(this);

    // make it an input
    this.input(l_node);
}
MetaWrap.Pipeline.Node.prototype.require = MetaWrap_Pipeline_Node_require;

/*!
    @fn         function MetaWrap_Pipeline_Node_add(p_name,p_process,p_fallback,p_result)
    @brief      Adds a node to the input of the pipeline
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_addProcess(p_process)
{
    this.m_processes[this.m_processes.length] = p_process;
}
MetaWrap.Pipeline.Node.prototype.addProcess = MetaWrap_Pipeline_Node_addProcess;

/*!
    @fn         function MetaWrap_Pipeline_Node_get(p_name)
    @brief      Gets a named input
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_get(p_name)
{
    //alert("MetaWrap_Pipeline_Node_get " + p_name + " in " + this.m_name);

    // Look in list of subnodes
    var l_result = this.m_nodes[p_name];

    // Got a resul? Then return it
    if (l_result)
    {
        // return the result
        return l_result.m_result;
    }
    else
    {
        // No result? Go all the way back up to the root
        var l_parent = this;
        while(l_parent.m_parent)
        {
            l_parent = l_parent.m_parent;
        }

        // now perform exhaustive search of the whole pipeline
        l_result = l_parent.find(p_name);

        if (!l_result)
        {
            //alert("*THROW*");
            throw("MetaWrap.Pipeline.Node.get: unable to get " + p_name);
        }
    }

    return l_result;
}
MetaWrap.Pipeline.Node.prototype.get = MetaWrap_Pipeline_Node_get;
MetaWrap.Pipeline.prototype.get = MetaWrap_Pipeline_Node_get;

/*!
    @fn         function MetaWrap_Pipeline_Node_find(p_name)
    @brief      Gets a named input
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_find(p_name)
{
    //alert("MetaWrap_Pipeline_Node_find " + p_name + " in " + this.m_name);

    // Look in local nodes
    var l_result = this.m_nodes[p_name];

    // if we get a result then return it
    if (l_result)
    {
        //alert("local result");
        return l_result.m_result;
    }

    // Try subnodes
    for(var l_node in this.m_nodes)
    {
        // Guard against prototype
		if (l_node == "extend") continue;

        // This node?
        if (l_node == p_name)
        {
            //alert("match subnode");

           // return its result
           return this.m_nodes[l_node].m_result;
        }

        // find in all subnodes
        l_result = this.m_nodes[l_node].find(p_name);

        // if we get a result then return it
        if (l_result)
        {
            return l_result;
        }
    }

    // found nothing...
    return null;
}
MetaWrap.Pipeline.Node.prototype.find = MetaWrap_Pipeline_Node_find;
MetaWrap.Pipeline.prototype.find = MetaWrap_Pipeline_Node_find;


/*!
    @fn         function MetaWrap_Pipeline_Node_debug(p_name)
    @brief      Gets a named input
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_debug()
{
    //alert("MetaWrap_Pipeline_Node_debug " + this.m_name);

    for(var l_node in this.m_nodes)
    {
        // Guard against prototype
		if (l_node == "extend") continue;

        //alert(this.m_name + " subnode " +  l_node);
        this.m_nodes[l_node].debug();
    }

    return null;
}
MetaWrap.Pipeline.Node.prototype.debug = MetaWrap_Pipeline_Node_debug;
MetaWrap.Pipeline.prototype.debug = MetaWrap_Pipeline_Node_debug;

/*!
    @fn         function MetaWrap_Pipeline_Node_run()
    @brief      Runs all the inputs
    @author     James Mc Parlane
    @date       25 October 2005
*/
function MetaWrap_Pipeline_Node_run()
{
    //alert("run node " + this.m_name);

    // Run each input subnode
    for(var l_node in this.m_nodes)
    {
		// Guard against prototype
		if (l_node == "extend") continue;

		// This will run the input node and its result will be established
		this.m_nodes[l_node].run();

    }

    // If the result is not already established
    if (!this.m_result)
    {
        // For each possible process - run it till one works
        for(var l_process in this.m_processes)
        {
        	// Guard against prototype
			if (l_process == "extend") continue;

            var l_e = null;
            try
            {
                // get the type of the process
                var l_process_type = MetaWrap.typeOf(this.m_processes[l_process]);

                switch(l_process_type)
                {
                    // Is the process a pipeline?
                    case "object":
                    {
                        // Run the process function, which will consume the inputs....
                        return this.m_result = this.m_processes[l_process].run();
                    }
                    break;

                    // Is the process a function?
                    case "function":
                    {
                        // Run the process function, which will consume the inputs....
                        return this.m_result = MetaWrap.doCall(this.m_processes[l_process],this);
                    }
                    break;

                    default:
                    {
                        alert(l_process_type);
                    }
                    break;
                }
            }
            catch(l_e)
            {
                error("failed during " + this.m_name + "(" + MetaWrap.exceptionMessage(l_e) + ")");
				//alert("failed during " + this.m_name + "(" + MetaWrap.exceptionMessage(l_e) + ")");
                // keep on trucking
            }
        }
    }

    // Return the answer
    return this.m_result;
}
MetaWrap.Pipeline.Node.prototype.run = MetaWrap_Pipeline_Node_run;

/*!
 *@} endgroup mw_javascript_lib_pipeline MetaWrap - JavaScript - Pipeline
 */

/*!
 *@} end of MetaWrap.Pipeline
 */
