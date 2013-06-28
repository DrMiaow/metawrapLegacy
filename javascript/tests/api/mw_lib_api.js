/*

    @file tw_lib_api.js

    $Id: tw_lib_api.js,v 1.16 2008/05/15 02:11:24 james Exp $

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




/*! \pipeline tw_javascript_lib_api MetaWrap - JavaScript - API - Services
 *
 * \subsection tw_javascript_lib_api Overview
 *
 */

// Used for debugging
//alert("$Id: tw_lib_api.js,v 1.16 2008/05/15 02:11:24 james Exp $");

/*! \defgroup tw_javascript_lib_api  MetaWrap - JavaScript - API - Services
 *@{
 */

// Ensure we have the namespace we need before we load this pipeline
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap","mw_lib_xml.js");




/*! @name  MetaWrap.API Namespace */
//@{

/*!
    @namespace	MetaWrap
    @brief      Declare the MetaWrap Namespace root
    @author     James Mc Parlane
    @date       16 May 2006
*/
var MetaWrap = MetaWrap || {};

/*!
    @namespace	MetaWrap.API
    @brief      Declare the MetaWrap.API Namespace
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API = MetaWrap.API || {};


/*!
    @namespace	MetaWrap.API.Call
    @brief      Returns a services object, from which you can select a Service and then an action
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Call = function()
{	
	return new MetaWrap.API.Services();
}		

/*!
    @namespace	MetaWrap.API.If
    @param      p_select The xpath to what we are testing
    @brief      Kick off the chaining with an 'If' instruction. Returns a services object, from which you can select a Service and then an action.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.If = function(p_test)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.If(p_test);
	
	return l_services;
}		

/*!
    @namespace	MetaWrap.API.For
    @param      p_select The xpath to what we are selecting
    @brief      Kick off the chaining with a 'For' instruction. Returns a services object, from which you can select a Service and then an action.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.For = function(p_select)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.For(p_select);
	
	
	return l_services;
}		



/*!
    @fn			MetaWrap.API.Var
    @param      p_name The name of the variable we want to define.
    @param      p_value The xpath to what we are selecting
    @brief      Kick off the chaining by declaring a variable. Returns a services object, from which you can select a Service and then an action.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Var = function(p_name,p_select)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.Var(p_name,p_select);
	
	return l_services;
}		


/*!
    @fn			MetaWrap.API.Import
    @param      p_name The name of the content we are importing (it will be wrapped in import element with name = p_name)
    @param      p_content The content we are importing. Can be a URL or XML.    
    @brief      Kick off the chaining by importing some XML. Returns a services object, from which you can select a Service and then an action.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Import = function(p_name,p_content)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.Import(p_name,p_content);
	
	return l_services;
}


/*!
    @fn         MetaWrap.API.Use
    @param      p_name The name of the parameter we want to se a default value for
    @param      p_value The value we want to 'use' for the nominated parameter.
    @brief      Kick off the defining a default parameter value. Returns a services object, from which you can select a Service and then an action.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Use = function(p_name,p_value)
{
	var l_services = new MetaWrap.API.Services();
	
	l_services.Use(p_name,p_value);

	return l_services;
}	


/*!
    @fn         MetaWrap.API.Feed
    @param      p_url URL to the feed we want to process.
    @param      p_fn The
    @brief      Kick off the chaining by Accessing a Feed. Returns a request object.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Feed = function(p_url,p_fn)
{
	log("API.Feed " + p_url);

	var l_feed = new MetaWrap.API.Request.Feed(p_url);

	return l_feed.Request(p_fn);

}
/*!
    @class      MetaWrap.API.Services
    @param      Services class - used to host all the API modules
    @brief      Constructor for Pipeline.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services = function()
{
	
	
	// Our unclosed elements
	this.UnclosedElements = [];
	
	// Our mandatory parameters
	this.MandatoryParameters = [];

	// The current service
	this.Service = "";

	// The current version
	this.Version = "";
	
	// The generated text
	this.Generated = "";
	
	// 'Uses' hash table
	this.Uses = {};
	
	this.OutputElementStart("action");

	// Output for an individual action
	//this.ActionOutput = "";

	
};



/*!
    @namespace	MetaWrap.API.Call
    @brief      Kick off the chaining from a call.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.Call = function()
{	
	return this;
}		



/*!
    @fn			MetaWrap.API.Services.prototype.use
    @param      p_name The name parameter we want to set a default value for.
	@param      p_value The value of the parameter we want to set a default value for.
    @brief      Signify that we want to use the supplied value for all parameters and. Kick off the chaining from a use statement.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.Use = function(p_name,p_value)
{	
	this.Uses[p_name] = p_value;
	
	
	return this;
}	


/*!
    @fn         MetaWrap.API.Services.prototype.execute
    @brief      Closes the current service request and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.prototype.Execute = function(p_url)
{
	this.ClosePendingElements();

	var l_request = new MetaWrap.API.Request(this.Generated);

	return l_request.Request(p_url);
}


/*!
    @fn         MetaWrap.API.Services.prototype.Generate
    @brief      Closes the current service request and generates the XML response
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.prototype.Generate = function()
{
	this.ClosePendingElements();
	
	return new MetaWrap.API.Request(this.Generated);
}




/*!
    @fn			MetaWrap.API.Services.prototype.Var
    @param      p_name The name variable we want to define.
	@param      p_select The value of the variable we want to define.    
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.Var = function(p_name,p_select)
{	
	this.OutputElementStart("var");
	this.OutputAttribute("name",p_name);
	this.OutputAttribute("get",p_select);
	this.OutputElementEnd();
	
	return this;
}		

/*!
    @fn			MetaWrap.API.Services.prototype.Import
    @param      p_name The name of the content we are importing (it will be wrapped in import element with name = p_name)
	@param      p_content The XML or url to the content we want to import
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.Import = function(p_name,p_content)
{	
	this.OutputElementStart("import");
	this.OutputAttribute("name",p_name);

	if (p_content.indexOf("<") == 0)
	{
		this.OutputText(p_content);
	}
	else
	{
		this.OutputAttribute("href",p_content);
	}	

	
	this.OutputElementEnd();
	
	//this.OutputAction();
	
	return this;
}		


/*!
    @namespace	MetaWrap.API.Services.prototype.If
    @param      p_test The condition we are testing  for
    @brief      Kick off the chaining from an if.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.If = function(p_test)
{	
	this.OutputElementStart("if");
	this.OutputAttribute("test",p_test);
	
	return this;
}		

/*!
    @fn			MetaWrap.API.Services.prototype.EndIf
    @brief      Signify that we want to end an If clause.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.EndIf = function()
{	
	this.OutputElementEndUntil("if");
	
	return this;
}		


/*!
    @fn			MetaWrap.API.Services.prototype.For
    @param      p_select Xpath to what we are itterating on
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.For = function(p_select)
{	
	this.OutputElementStart("for");
	this.OutputAttribute("select",p_select);	
	
	return this;
}		

/*!
    @namespace	MetaWrap.API.Services.prototype.EndFor
    @brief      Signify that we want to end a 'for'.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.EndFor = function(p_test)
{	
	this.OutputElementEndUntil("for");
	
	return this;
}		


							
						
//
// Output Stage
//


/*!
    @fn         MetaWrap.API.Services.prototype.OutputAction
    @brief      Used when we can output an individual action.
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an element in the form
	
	<element>value</element>
	
	Will close previously open element (if there is one).
	
	><element>value</element>
*/
MetaWrap.API.Services.prototype.OutputAction = function()
{
	//log("ACTION " + this.ActionOutput);
	//this.ActionOutput = "";		
}

/*!
    @fn         MetaWrap.API.Services.prototype.Output
    @param      p_string Output some text as part of the Service action invocation
    @brief      Output a raw string.
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an element in the form
	
	<element>value</element>
	
	Will close previously open element (if there is one).
	
	><element>value</element>
*/
MetaWrap.API.Services.prototype.Output = function(p_string)
{
	//log(p_string);
	
	this.Generated += p_string;
	//this.ActionOutput += p_string;
}
		
/*!
    @fn         MetaWrap.API.Services.prototype.OutputElement
    @param      p_element The name of the element we are outputting
	@param      p_value The value of the element we are outputting	
    @brief      Used to output an simple element in the form <element>value</element>
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an element in the form
	
	<element>value</element>
	
	Will close previously open element (if there is one).
	
	><element>value</element>
*/
MetaWrap.API.Services.prototype.OutputElement = function(p_element,p_value)
{
	// We already have an element open
	if (this.CurrentElement	!= null)
	{
		if (!this.CurrentElementClosed)
		{
			//log("OutputElement: > (close current one)");				
			this.Output(">");
		}
		
		this.CurrentElementClosed = true;
	}

	if (p_value == null)
	{
		//log("OutputElement: <" + p_element + "/>");	
		this.Output("<" + p_element + "/>");	
		
	}
	else
	{
		//log("OutputElement: <" + p_element + ">" + p_value + "</" + p_element + ">");	
		this.Output("<" + p_element + ">" + p_value + "</" + p_element + ">");	
	}
}

/*!
    @fn         MetaWrap.API.Services.prototype.OutputElementStart
    @param      p_element The name of the element we are outputting		
    @brief      Opens an element
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an element in the form
	
	<element
	
	Will close previously open element (if there is one).
	
	><element
*/
MetaWrap.API.Services.prototype.OutputElementStart = function(p_element)
{
	// We already have an element open
	if (this.CurrentElement	!= null)
	{
		if (!this.CurrentElementClosed)
		{
			//log("OutputElementStart: > (close current one)");
			this.Output(">");			
		}
		this.UnclosedElements.push(this.CurrentElement);
	}

	this.CurrentElement = p_element;
	this.CurrentElementClosed = false;
	this.CurrentElementhHasContent = false;
		
	//log("OutputElementStart: <" + p_element);
	this.Output("<" + p_element);
}

/*!
    @fn         MetaWrap.API.Services.prototype.OutputAttribute
    @param      p_attribute The name of the attribute we are outputting		
	@param      p_value The name of the attribute we are outputting		
    @brief      Output an attribute in the form attribute="value"
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an attribute in the form attribute="value"
	
	Requires that the current element is open
*/
MetaWrap.API.Services.prototype.OutputAttribute = function(p_attribute,p_value)
{
	// We already have an element open
	if (this.CurrentElement	== null)
	{
		throw("Can not call OutputAttribute if there is no current element.");
	}

	if (this.CurrentElementClosed)
	{
		throw("Can not call OutputAttribute forthe element if the closing '>' has already been output.");
	}		
	
	//log("OutputAttribute:  " + p_attribute + "=\"" + p_value + "\"");	
	this.Output(" " + p_attribute + "=\"" + p_value + "\"");
}

/*!
    @fn         MetaWrap.API.Services.prototype.OutputElementEnd
    @brief      Used to output an closing element of an enclosing pair of elements
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an closing element of an enclosing pair of elements in the form </element>
	
	Will close previously open element (if there is one).
	
	></element>
*/
MetaWrap.API.Services.prototype.OutputElementEnd = function()
{
	if (this.CurrentElement	== null)
	{
		throw("Can not call OutputElementEnd if there is no element open.");
	}

	var l_closed = this.CurrentElement;
	
	//if (this.CurrentElementhHasContent)
	//{
		if (this.CurrentElementClosed)
		{
			//log("OutputElementEnd: </" + this.CurrentElement + ">");			
			this.Output("</" + this.CurrentElement + ">");
		}
		else
		{
			//log("OutputElementEnd: ></" + this.CurrentElement + ">");	
			this.Output("></" + this.CurrentElement + ">");
		}	
	//}
	//else
	//if (!this.CurrentElementClosed)
	//{
		//log("OutputElementEnd: ></" + this.CurrentElement + ">");	
	//	this.Output("/>");
	//}
	
	// If we have one one the stack then pop it off in closed mode
	if (this.UnclosedElements.length > 0)
	{
		this.CurrentElement = this.UnclosedElements.pop();				
		this.CurrentElementClosed = true;
	}
	else
	{	
		this.CurrentElement = null;
	}
	
	return l_closed;
}


/*!
    @fn         MetaWrap.API.Services.prototype.OutputText
    @param      p_text The text we want to output
    @brief      Used to output some text
    @author     James Mc Parlane
    @date       6 June 2009

    Ouputs text

    eg.

    TEXT
	
	Will close previously open element (if there is one).

	eg.
	
	>TEXT
*/
MetaWrap.API.Services.prototype.OutputText = function(p_text)
{
	if (this.CurrentElement	== null)
	{
		throw("Can not call OutputText if there is no element open.");
	}

	var l_closed = this.CurrentElement;
	
	if (this.CurrentElementClosed)
	{
		//log("OutputElementEnd: </" + this.CurrentElement + ">");			
		this.Output(p_text);
	}
	else
	{
		//log("OutputElementEnd: ></" + this.CurrentElement + ">");	
		this.Output(">" + p_text);
	}	

	if (p_text != "")
	{
		this.CurrentElementhHasContent = true;
	}
}

/*!
    @fn         MetaWrap.API.Services.prototype.OutputElementEnd
	@param      p_element We keep closing elements till we close this one
    @brief      Used to output an closing element of an enclosing pair of elements
    @author     James Mc Parlane
    @date       6 June 2009

    Used to output an closing element of an enclosing pair of elements in the form </element>
	
	Will close previously open element (if there is one).
	
	></element>
*/
MetaWrap.API.Services.prototype.OutputElementEndUntil = function(p_element)
{
	while(this.OutputElementEnd() != p_element);
}

/*!
    @fn         MetaWrap.API.Services.prototype.ClosePendingElements
    @brief      Close any pending elements
    @author     James Mc Parlane
    @date       6 June 2009
	
	Closes any current or pending elements that need closing all the way down to the root element.
	
	Should be called when you have finished outputing the elmement.
*/
MetaWrap.API.Services.prototype.ClosePendingElements = function()
{
	if (this.CurrentElement	!= null)
	{		
		if (this.CurrentElementClosed)
		{
			//log("OutputElementEnd: </" + this.CurrentElement + ">");			
			this.Output("</" + this.CurrentElement + ">");			
		}
		else
		{
			//log("OutputElementEnd: ></" + this.CurrentElement + ">");	
			this.Output("></" + this.CurrentElement + ">");	
		}
	}

	// We already have an element open
	if (this.CurrentElement	!= null)
	{
		if (!this.CurrentElementClosed)
		{
			//log("ClosePendingElements: > (close last one)");				
			this.Output(">");
		}
		
		this.CurrentElementClosed = true;
	}

	while(this.UnclosedElements.length > 0)
	{
		//trace("ClosePendingElements: ></" + this.UnclosedElements.pop() + ">");		
		this.Output("</" + this.UnclosedElements.pop() + ">");		
	}
}


//
// Higher order output
//

/*!
    @fn         MetaWrap.API.Services.prototype.OutputActionStart
	@param      p_action The action we are outputting the header for
    @brief      Outputs the current header
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.prototype.OutputActionStart = function(p_action)
{
	this.OutputElementStart(p_action);
	this.OutputAttribute("service",this.Service);
	this.OutputAttribute("version",this.Version.replace("_","."));
}

/*!
    @fn         MetaWrap.API.Services.prototype.OutputResourceStart
	@param      p_resource The resource we are outputting the header for
	@param      p_op The operation for this resource
    @brief      Outputs the current header
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.prototype.OutputResourceStart = function(p_resource,p_op)
{
	this.OutputElementStart(p_resource);
	this.OutputAttribute("service",this.Service);
	this.OutputAttribute("version",this.Version.replace("_","."));
	this.OutputAttribute("op",p_op);
}


//
// Actions
//


/*!
    @class      MetaWrap.API.Action
    @param      p_module The module this resource is part of
	@param      p_name The name  of this resource
	@param		p_mandatory_parameters The mandatory parameters
    @brief      Action class - Represents an resource being invoked
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services.Action = function(p_module,p_name,p_mandatory_parameters)
{
	p_module.OutputActionStart(p_name);

	this.Service = p_module;
	this.Name = p_name;
	this.Parameters = {};
	this.MandatoryParameters = p_mandatory_parameters;
}

/*!
    @fn         MetaWrap.API.Services.Action.prototype.Call	
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.Call = function()
{
	this.validateMandatoryParameters(this);
	this.Service.OutputElementEndUntil(this.Name);

	return this.Service;
}

/*!
    @fn         MetaWrap.API.Services.Action.prototype.If	
	@param      p_test What the if is testing for
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.If = function(p_test)
{
	this.validateMandatoryParameters(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.If(p_test)
	
	return this.Service;
}

/*!
    @namespace	MetaWrap.API.Services.prototype.EndIf
    @brief      Signify that we are ending an 'if'
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.Action.prototype.EndIf = function()
{	
	this.validateMandatoryParameters(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.EndIf()
	
	return this.Service;
}		



/*!
    @fn         MetaWrap.API.Services.Action.prototype.For	
	@param      p_select What the 'for' is matching.
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.For = function(p_select)
{
	this.validateMandatoryParameters(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.For(p_select)
	
	return this.Service;
}


/*!
    @fn         MetaWrap.API.Services.Action.prototype.Var	
	@param      p_select What the 'for' is matching.
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.Var = function(p_name,p_select)
{
	this.validateMandatoryParameters(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.Var(p_name,p_select)
	
	return this.Service;
}


/*!
    @namespace	MetaWrap.API.Services.prototype.EndFor
    @brief      Signify that we are ending a 'for'
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.Action.prototype.EndFor = function()
{	
	this.validateMandatoryParameters(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.EndFor()
	
	return this.Service;
}		



/*!
    @fn         MetaWrap.API.Services.Action.prototype.Execute	
    @brief      Closes the current Action and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.Execute = function(p_url)
{
	this.validateMandatoryParameters(this);
	this.Service.OutputElementEndUntil(this.Name);
	
	return this.Service.Execute(p_url);
}

/*!
    @fn         MetaWrap.API.Services.Action.prototype.Generate	
    @brief      Closes the current Action and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.Generate = function()
{
	this.validateMandatoryParameters(this);
	
	this.Service.OutputElementEndUntil(this.Name);
	
	return this.Service.Generate();
}


/*!
    @fn         MetaWrap.API.Services.Action.prototype.processParameter	
	@param      p_name The name of the parameter we are processing for this Action
	@param      p_value The value of the parameter we are processing for this Action
	@param      p_mandatory If true then this is a mandatory parameter
    @brief      Closes the current Action and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.processParameter = function (p_name,p_value,p_mandatory)
{						
		if (p_value == null)
		{
			return new MetaWrap.API.Services.Action.Parameter(this,p_name,p_mandatory);
		}

		// If it is mandatory.
		if (p_mandatory)
		{
			// Remove it from our mandatory list
			this.removeMandatoryParameter(p_name)
		}

		// remember the value of this parameter
		this.Parameters[p_name] = p_value;

		// Output it
		this.Service.OutputElement(p_name,p_value);

		// Set a trap for if we repeat call this
		this[p_name] = function(p_value) {throw(this.Name + " '" + p_name + "' parameter already applied.(value '" + this.Parameters[p_name] + "')");};

		// return the object
		return this;
}


/*!
    @class      MetaWrap.API.Action.Parameter
    @param      p_resource The resource this parameter is tied to
	@param      p_name The parameter name
	@param      p_mandatory If true then the parameter is mandatory
    @brief      Represents an extended parameter being invoked
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services.Action.Parameter = function(p_resource,p_name,p_mandatory)
{
	this.m_resource = p_resource;
	this.m_name = p_name;
	this.m_mandatory = p_mandatory;
}


/*!
    @fn      	MetaWrap.API.Services.Action.Parameter.prototype.Get
    @param      p_select Represents an extended parameter being invoked
    @brief      Constructor for Parameter.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services.Action.Parameter.prototype.Get = function(p_select)
{

	this.m_resource.Service.OutputElementStart(this.m_name);	
	this.m_resource.Service.OutputAttribute("get",p_select);	
	this.m_resource.Service.OutputElementEnd();
	
	// If it is mandatory.
	if (this.m_mandatory)
	{
		// Remove it from our mandatory list
		this.m_resource.removeMandatoryParameter(this.m_name);
	}
	
	return this.m_resource;
}

//
// Parameter Validation
//

/*!
    @fn         MetaWrap.API.Services.Action.prototype.removeMandatoryParameter	
	@param      p_name The name of the parameter we are processing for this Action
    @brief      Removes a mandatory paremeter from the list
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.removeMandatoryParameter = function (p_name)
{
	for(var i=0; i<this.MandatoryParameters.length;i++ )
	{ 
		if(this.MandatoryParameters[i]==p_name)
		{
			this.MandatoryParameters.splice(i,1); 
			return;
		}
	} 									
	throw("'" + p_name + "' is a mandatory parameter for resource '" + this.Name + "', but was not in the list of mandatory parameters.");
}


/*!
    @fn         MetaWrap.API.Services.Action.prototype.validateMandatoryParameters	
    @brief      Called to validate that all mandatory parameters have been included
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.validateMandatoryParameters = function()
{
	if (this.MandatoryParameters.length != 0)
	{
		var l_list = "";
				
	
		for(var i=0; i< this.MandatoryParameters.length; i++ )
		{ 
			var l_parameter = this.MandatoryParameters[i];
		
			if (this.Service.Uses[l_parameter] != null)
			{				
				this[l_parameter](this.Service.Uses[l_parameter]);
			}
			else
			{		
				if (l_list != "") 
				{
					l_list = l_list + ",";
				}
				l_list = l_list + "'" + this.MandatoryParameters[i] + "'";
			}
		} 				
		
		if (l_list != "")
		{
			throw("Call to '" + this.Name + "' is missing the following parameter" + (this.MandatoryParameters.length > 1 ?"s":"") + ": " + l_list);
		}
	}
	
	
	
}


//
//  Resources
//


/*!
    @class      MetaWrap.API.Resource
    @param      p_module The module this action is part of
	@param      p_name The name  of this action
	@param      p_op The operation for this resouce action.
	@param		p_mandatory_contexts The mandatory contexts
	@param		p_mandatory_fields The mandatory fields
    @brief      Resource class - Represents an action being invoked
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services.Resource = function(p_module,p_name,p_op,p_mandatory_contexts,p_mandatory_fields)
{
	p_module.OutputResourceStart(p_name,p_op);
		
	this.Service = p_module;
	this.Name = p_name;
	this.Op = p_op;
	this.Contexts = {};
	this.Fields = {};
	this.Templates = [];
	this.MandatoryContexts = p_mandatory_contexts || [];
	this.MandatoryFields = p_mandatory_fields || [];
}

/*!
    @fn         MetaWrap.API.Services.Resource.prototype.Call	
    @brief      Closes the current Resource and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.Call = function()
{
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	return this.Service;
}

/*!
    @fn         MetaWrap.API.Services.Resource.prototype.If	
	@param      p_test What the if is testing for
    @brief      Closes the current Resource and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.If = function(p_test)
{
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.If(p_test)
	
	return this.Service;
}

/*!
    @namespace	MetaWrap.API.Services.prototype.EndIf
    @brief      Signify that we are ending an 'if'
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.Resource.prototype.EndIf = function()
{	
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);

	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.EndIf()

	//this.Service.OutputResource(Resource();			
	
	return this.Service;
}		



/*!
    @fn         MetaWrap.API.Services.Resource.prototype.For	
	@param      p_select What the 'for' is matching.
    @brief      Closes the current Resource and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.For = function(p_select)
{
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.For(p_select)
	
	return this.Service;
}


/*!
    @namespace	MetaWrap.API.Services.prototype.EndFor
    @brief      Signify that we are ending a 'for'
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.Resource.prototype.EndFor = function()
{	
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.EndFor()
	
	return this.Service;
}		



/*!
    @fn         MetaWrap.API.Services.Resource.prototype.Execute	
    @brief      Closes the current Resource and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.Execute = function(p_url)
{
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);
	
	this.Service.OutputElementEndUntil(this.Name);
	
	return this.Service.Execute(p_url);
}

/*!
    @fn         MetaWrap.API.Services.Resource.prototype.Generate	
    @brief      Closes the current Resource and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.Generate = function()
{
	this.validateMandatoryContexts(this);
	this.validateMandatoryFields(this);
	this.renderTemplates(this);
	
	this.Service.OutputElementEndUntil(this.Name);
	
	return this.Service.Generate();
}

//
// Field
//


/*!
    @fn         MetaWrap.API.Services.Resource.prototype.processField	
	@param      p_name The name of the field we are processing for this Resource
	@param      p_value The value of the field we are processing for this Resource
	@param      p_mandatory If true then this is a mandatory field
    @brief      Closes the current Resource and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.processField = function (p_name,p_value,p_mandatory)
{					
	this.validateMandatoryContexts();

	if (p_value == null)
	{
		return new MetaWrap.API.Services.Resource.Field(this,p_name,p_mandatory);
	}

	// Remove it from our mandatory list
	this.removeMandatoryField(p_name)

	// remember the value of this field
	this.Fields[p_name] = p_value;

	// Output it
	this.Service.OutputElement(p_name,p_value);

	// Set a trap for if we repeat call this
	this[p_name] = function(p_value) {throw(this.Name + " '" + p_name + "' field already applied.(value '" + this.Fields[p_name] + "')");};

	// return the object
	return this;
}


/*!
    @class      MetaWrap.API.Resource.Field
    @param      p_action The action this field is tied to
	@param      p_name The field name
	@param      p_mandatory If true then the field is mandatory
    @brief      Represents an extended field being invoked
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default field name value pairs
*/
MetaWrap.API.Services.Resource.Field = function(p_action,p_name,p_mandatory)
{
	this.m_action = p_action;
	this.m_name = p_name;
	this.m_mandatory = p_mandatory;
}


/*!
    @fn      	MetaWrap.API.Services.Resource.Field.prototype.Get
    @param      p_select Represents an extended field being invoked
    @brief      Constructor for Field.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default field name value pairs
*/
MetaWrap.API.Services.Resource.Field.prototype.Get = function(p_select)
{

	this.m_action.Service.OutputElementStart(this.m_name);	
	this.m_action.Service.OutputAttribute("get",p_select);	
	this.m_action.Service.OutputElementEnd();

	// Remove it from our mandatory list, if it was mandatory..
	this.m_action.removeMandatoryField(this.m_name);
	
	return this.m_action;
}

//
// Field Validation
//

/*!
    @fn         MetaWrap.API.Services.Resource.prototype.removeMandatoryField	
	@param      p_name The name of the field we want to remove as mandatory for this Resource
    @brief      Removes a mandatory paremeter from the list
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.removeMandatoryField = function (p_name)
{
	for(var i=0; i<this.MandatoryFields.length;i++ )
	{ 
		if(this.MandatoryFields[i]==p_name)
		{
			this.MandatoryFields.splice(i,1); 
			return;
		}
	} 									
	//throw("'" + p_name + "' is a mandatory field for action '" + this.Name + "', but was not in the list of mandatory fields.");
}

/*!
    @fn         MetaWrap.API.Services.Resource.prototype.addMandatoryField	
	@param      p_name The name of the field we want to make mandatory for this Resource
    @brief      Adds a mandatory paremeter from the list
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.addMandatoryField = function (p_name)
{

	// First make sure the field does not exist..
	for(var i=0; i<this.MandatoryFields.length;i++ )
	{ 
		if(this.MandatoryFields[i]==p_name)
		{
			return;
		}
	} 										
	this.MandatoryFields.push(p_name);
}


/*!
    @fn         MetaWrap.API.Services.Resource.prototype.validateMandatoryFields	
    @brief      Called to validate that all mandatory fields have been included
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.validateMandatoryFields = function()
{
	if (this.MandatoryFields.length != 0)
	{
		var l_list = "";
	
		for(var i=0; i< this.MandatoryFields.length; i++ )
		{ 
			var l_field = this.MandatoryFields[i];
		
			if (this.Service.Uses[l_field] != null)
			{				
				this[l_field](this.Service.Uses[l_field]);
			}
			else
			{		
				if (l_list != "") 
				{
					l_list = l_list + ",";
				}
				l_list = l_list + "'" + this.MandatoryFields[i] + "'";
			}
		} 				
		
		if (l_list != "")
		{
			throw("Call to '" + this.Name + "' is missing the following field" + (this.MandatoryFields.length > 1 ?"s":"") + ": " + l_list);
		}
	}
}


/*!
    @fn         MetaWrap.API.Services.Resource.prototype.validateMandatoryFields	
    @brief      Called to validate that all mandatory fields have been included
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.renderTemplates = function()
{

	if (this.Templates.length != 0)
	{
		//log("renderTemplates");
		
		this.Service.OutputElementStart("_template");
		
		
		
		for(var t in this.Templates)
		{
			this.Templates[t].render(this);
		}
		
		this.Service.OutputElementEnd();
		
		
		// No more templates
		this.Templates = [];
		
	}

}

//
// Context
//


/*!
    @fn         MetaWrap.API.Services.Resource.prototype.processContext	
	@param      p_name The name of the context we are processing for this Resource
	@param      p_value The value of the context we are processing for this Resource
	@param      p_mandatory If true then this is a mandatory context
    @brief      Closes the current Resource and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.processContext = function (p_name,p_value,p_mandatory)
{						
	if (p_value == null)
	{
		return new MetaWrap.API.Services.Resource.Context(this,p_name,p_mandatory);
	}

	// If it is mandatory.
	if (p_mandatory)
	{
		// Remove it from our mandatory list
		this.removeMandatoryContext(p_name)
	}

	// remember the value of this context
	this.Contexts[p_name] = p_value;

	// Output it
	this.Service.OutputAttribute(p_name,p_value);	

	// Set a trap for if we repeat call this
	this[p_name] = function(p_value) {throw(this.Name + " '" + p_name + "' context already applied.(value '" + this.Contexts[p_name] + "')");};

	// return the object
	return this;
}


/*!
    @class      MetaWrap.API.Resource.Context
    @param      p_action The action this context is tied to
	@param      p_name The context name
	@param      p_mandatory If true then the context is mandatory
    @brief      Represents an extended context being invoked
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default context name value pairs
*/
MetaWrap.API.Services.Resource.Context = function(p_action,p_name,p_mandatory)
{
	this.m_action = p_action;
	this.m_name = p_name;
	this.m_mandatory = p_mandatory;
}


/*!
    @fn      	MetaWrap.API.Services.Resource.Context.prototype.Get
    @param      p_select Represents an extended context being invoked
    @brief      Constructor for Context.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default context name value pairs
*/
MetaWrap.API.Services.Resource.Context.prototype.Get = function(p_select)
{

	this.m_action.Service.OutputElementStart(this.m_name);	
	this.m_action.Service.OutputAttribute("get",p_select);	
	this.m_action.Service.OutputElementEnd();
	
	// If it is mandatory.
	if (this.m_mandatory)
	{
		// Remove it from our mandatory list
		this.m_action.removeMandatoryContext(this.m_name);
	}
	
	return this.m_action;
}

//
// Context Validation
//

/*!
    @fn         MetaWrap.API.Services.Resource.prototype.removeMandatoryContext	
	@param      p_name The name of the context we are processing for this Resource
    @brief      Removes a mandatory paremeter from the list
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.removeMandatoryContext = function (p_name)
{
	for(var i=0; i<this.MandatoryContexts.length;i++ )
	{ 
		if(this.MandatoryContexts[i]==p_name)
		{
			this.MandatoryContexts.splice(i,1); 
			return;
		}
	} 									
	throw("'" + p_name + "' is a mandatory context for action '" + this.Name + "', but was not in the list of mandatory contexts.");
}


/*!
    @fn         MetaWrap.API.Services.Resource.prototype.validateMandatoryContexts	
    @brief      Called to validate that all mandatory contexts have been included
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Resource.prototype.validateMandatoryContexts = function()
{
	if (this.MandatoryContexts.length != 0)
	{
		var l_list = "";
				
		for(var i=0; i< this.MandatoryContexts.length; i++ )
		{ 
			var l_context = this.MandatoryContexts[i];
		
			if (this.Service.Uses[l_context] != null)
			{				
				this[l_context](this.Service.Uses[l_context]);
			}
			else
			{		
				if (l_list != "") 
				{
					l_list = l_list + ",";
				}
				l_list = l_list + "'" + this.MandatoryContexts[i] + "'";
			}
		} 				
		
		if (l_list != "")
		{
			throw("Call to '" + this.Name + "' is missing the following context" + (this.MandatoryContexts.length > 1 ?"s":"") + ": " + l_list);
		}
	}
}

//
// Templates
//

/*!
    @name       MetaWrap.API.Services.Resource.recursivelyTemplate
	@param      p_template The starting template
	@param      p_names The template names
    @brief      Adds a level of a template to 
    @author     James Mc Parlane
    @date       26 March 2013

    Use - Is used to set default template name value pairs
*/
MetaWrap.API.Services.Resource.recursivelyTemplate = function(p_template,p_names)
{
		var template = p_template;
		
		for(var n in p_names)
		{
			var l_existing = null;			
			var l_name = p_names[n];			
			for(var t in template.Templates)
			{
				var l_template = template.Templates[t];
			
				if (l_template.m_name == l_name)
				{
					//log(l_template.m_name + " already exists.");
					l_existing = l_template;
					break;
				}
			}			
			if (l_existing == null)
			{
				// Create a new template here
				template = template.Template(l_name);
			}
			else
			{
				template = l_existing;
			}			
		}		
		return template;
}

/*!
    @name       MetaWrap.API.Services.Resource.prototype.Template
	@param      p_name The template name
    @brief      Adds a level of a template to 
    @author     James Mc Parlane
    @date       26 March 2013

    Use - Is used to set default template name value pairs
*/
MetaWrap.API.Services.Resource.prototype.Template = function(p_name)
{
	if (p_name.indexOf('/') != -1)	
	{
		return MetaWrap.API.Services.Resource.recursivelyTemplate(this,p_name.split("/"));
	}
	else	
	{
		var l_template = new MetaWrap.API.Services.Resource.Template(this,null,p_name);
		this.Templates.push(l_template);	
		return l_template;			
	}
	
}


/*!
    @class      MetaWrap.API.Resource.Template
    @param      p_action The action this template is tied to
	@param      p_name The template name
	@param      p_mandatory If true then the template is mandatory
    @brief      Represents an extended template being invoked
    @author     James Mc Parlane
    @date       26 March 2013
    
*/
MetaWrap.API.Services.Resource.Template = function(p_resource, p_template, p_name)
{
	
	this.m_start = -1;
	this.m_end = -1;
	this.m_resource = p_resource;
	this.m_name = p_name;
	this.m_template = p_template;
	this.Templates = [];
	
	
}

/*!
    @name       MetaWrap.API.Services.Resource.Template.prototype.render
	@param      p_resource The resource for which we are rendering this template.
    @brief      Renders the template.
    @author     James Mc Parlane
    @date       7 May 2013
    
*/
MetaWrap.API.Services.Resource.Template.prototype.render = function(p_resource)
{		
		if (this.Templates.length == 0)
		{
			p_resource.Service.OutputElement(this.m_name,null);
			return;
		}

		p_resource.Service.OutputElementStart(this.m_name);
		
		for(var t in this.Templates)
		{
			this.Templates[t].render(p_resource);	
		}
		
		p_resource.Service.OutputElementEnd();
}

/*!
    @class      MetaWrap.API.Resource.Template
    @param      p_name The element name to add
    @brief      Adds a level to a template
    @author     James Mc Parlane
    @date       26 March 2013
    
*/
MetaWrap.API.Services.Resource.Template.prototype.Template = function(p_name)
{
	if (p_name.indexOf('/') != -1)	
	{
		return MetaWrap.API.Services.Resource.recursivelyTemplate(this,p_name.split("/"));
	}
	else	
	{
		var l_template = new MetaWrap.API.Services.Resource.Template(this.m_resource,this,p_name);	
		this.Templates.push(l_template);	
		return l_template;
	}
}

/*!
    @fn      	MetaWrap.API.Services.Resource.Template.prototype.End 
    @brief      Bring us back to the start.
    @author     James Mc Parlane
    @date       27 March 2013

*/
MetaWrap.API.Services.Resource.Template.prototype.End = function()
{	
	return this.m_resource;
}

/*!
    @fn      	MetaWrap.API.Services.Resource.Template.prototype.Back
    @brief      Bring us back to the start.
    @author     James Mc Parlane
    @date       27 March 2013
   
*/
MetaWrap.API.Services.Resource.Template.prototype.Back = function()
{	
    if (this.m_template == null)
	{
		return this.m_resource;;
	}

	return this.m_template;
}


/*!
    @fn      	MetaWrap.API.Services.Resource.Template.prototype.Get
    @param      p_select Represents an extended template being invoked
    @brief      Constructor for Template.
    @author     James Mc Parlane
    @date       6 June 2009

    
*/
MetaWrap.API.Services.Resource.Template.prototype.Get = function(p_select)
{

	this.m_action.Service.OutputElementStart(this.m_name);		
	this.m_action.Service.OutputElementEnd();
	
	return this.m_action;
}





/*!
    @class      MetaWrap.API.Request
    @param      p_request_xml The XML that we send as part of the request
    @brief      Constructor for Request.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Request = function(p_request_xml)
{		
	// The XML we want to request
	this.XML = p_request_xml;

	//warn("REQUEST:  = " + this.XML);

	this.Url = MetaWrap.API.Request.Url;
	this.XHR = null;
};

/*!
    @config     MetaWrap.API.Request.Batch
    @brief      The batching enrpoint
    @author     James Mc Parlane
    @date       6 June 2009
*/
MetaWrap.API.Request.Batch = "batch/";

/*!
    @config     MetaWrap.API.Request.Url
    @brief      The batching enrpoint
    @author     James Mc Parlane
    @date       6 June 2009
*/
MetaWrap.API.Request.Url = "http://thumbwhere.com/api/";

/*!
    @fn      	MetaWrap.API.Request.prototype.Request
    @param      p_fn The function we want to call if we are making a request
    @brief      Perform the request
    @author     James Mc Parlane
    @date       6 June 2009    
*/
MetaWrap.API.Request.prototype.Request = function(p_fn)
{		
	// If we pass in a callback function then we are asyncronous
	var l_async = (typeof(p_fn) == "function");

	var l_url = this.Url + MetaWrap.API.Request.Batch;


	//log("REQUEST: " + this.XML);

	if (l_async)
	{
		this.postAsynchronous(l_url,this.XML,p_fn);
		return this;
	}
	else
	{
		return this.postSynchronous(l_url,this.XML);
	}
	
};



/*!
    @fn      	MetaWrap.API.Request.prototype.Url
    @param      p_url The url we want call
    @brief      Sets the url for the request
    @author     James Mc Parlane
    @date       27 July 2009    
*/
MetaWrap.API.Request.prototype.Url = function(p_url)
{		

	this.Url = 	p_url

	return this;
};





/*!
    @class      MetaWrap.API.Feed
    @param      Feed request
    @brief      Constructor for Request.
    @author     James Mc Parlane
    @date       27 July 2009   
*/
MetaWrap.API.Request.Feed = function(p_url)
{		

	log("Feed " + p_url);

	// The XML we want to request
	this.Url = p_url;
	
	// We use this to signify that we are not an action request object	
	this.XML = null; 
};


/*!
    @fn      	MetaWrap.API.Feed.prototype.Request
    @param      p_fn The function we want to call if we are making a request for a feed
    @brief      Perform the request
    @author     James Mc Parlane
    @date       6 June 2009   
*/
MetaWrap.API.Request.Feed.prototype.Request = function(p_fn)
{		
	// If we pass in a callback function then we are asyncronous
	var l_async = (typeof(p_fn) == "function");

	var l_url = this.Url;


	log("Feed request: " + this.Url);

	if (l_async)
	{
		this.getAsynchronous(this.Url,p_fn);
		return this;
	}
	else
	{
		return this.getSynchronous(this.Url);
	}
	
};


/*!
    @class      MetaWrap.API.Response
    @param      p_url The url we called
    @param      p_request The request object
    @param      p_response_xml The Response XML object (not a string)
    @param      p_status The response status
    @brief      Constructor for Response.
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response = function(p_url,p_request,p_response_xml,p_status)
{		
	this.Url = p_url;
	this.XML = p_response_xml;	
	this.Status = p_status;

	// Our decided root node for all xpath requests
	var l_responsenode = null;

	// If this was an action request...
	if (p_request.XML != null)
	{
		// Select the root node of the request
		l_responsenode = MetaWrap.API.selectSingleNode(this.XML,this.XML,"response");	

		if (l_responsenode == null)
		{
			throw("XML Response was missing root 'response' element.");
		}

		this.Request = p_request;
	}
	else
	{
		// Select the root node of the feed
		l_responsenode = MetaWrap.API.selectSingleNode(this.XML,this.XML,"/");	

		if (l_responsenode == null)
		{
			throw("XML Response was missing root element.");
		}

	}
	
	this.NodeStack = [];

	// Now we push this onto teh stack
	this.NodeStack.push(l_responsenode);

};



/*!
    @fn      	MetaWrap.API.Request.prototype.With
    @param      p_xpath The xml we want to select
    @param      p_fn The function we want to call
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009

*/
MetaWrap.API.Response.prototype.With = function(p_xpath,p_fn)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no nodes to test with the 'With'.");
	}

	var l_node = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath);

	if (l_node == null)
	{
		throw("'With' called with invalid xpath '" + p_xpath + "' into xml " + this.Current().xml);
	}


	//log("with " + p_xpath + " = " + l_value);

	// Push our node onto the array
	this.NodeStack.push(l_node)

	// Call the method
	p_fn.call(this);

	// Push our node onto the array
	this.NodeStack.pop()


	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.If
    @param      p_xpath The url we want to select
    @param      p_fn The function we want to call if we managed to select something
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response.prototype.If = function(p_xpath,p_fn)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no nodes to test with the 'If'.");
	}

	var l_node = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath);

	if (l_node == null)
	{
		return this;
	}
	
	// Push our node onto the array
	//this.NodeStack.push(l_node)

	// Call the method
	p_fn.call(this);

	// Push our node onto the array
	//this.NodeStack.pop()


	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.IfNot
    @param      p_xpath The url we want to select
    @param      p_fn The function we want to call if we fail to select something
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response.prototype.IfNot = function(p_xpath,p_fn)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no nodes to test with the 'If'.");
	}

	var l_node = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath);

	// If we match something then we don't want to execute anything.
	if (l_node != null)
	{
		return this;
	}
	
	// Push our node onto the array
	//this.NodeStack.push(l_node)

	// Call the method
	p_fn.call(this);

	// Push our node onto the array
	//this.NodeStack.pop()


	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.IfElse
    @param      p_xpath The url we want to select
    @param      p_fn_true The function we want to call if we managed to select something
    @param      p_fn_false The function we want to call if we managed to not select something
    @brief      Conditional: if(p_xpath) then p_fn_true else p_fn_false
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response.prototype.IfElse = function(p_xpath,p_fn_true,p_fn_false)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no nodes to test with the 'If'.");
	}

	var l_node = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath);

	if (l_node == null)
	{

		// Call the method
		p_fn_false.call(this);

		return this;
	}
	
	// Push our node onto the array
	//this.NodeStack.push(l_node)

	// Call the method
	p_fn_true.call(this);

	// Push our node onto the array
	//this.NodeStack.pop()


	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.IfElse
    @param      p_xpath_true The url we want to select
    @param      p_fn_true The function we want to call if we managed to select something
    @param      p_fn_false The function we want to call if we managed to not select something
    @brief      Conditional: if(p_xpath) then p_fn_true else p_fn_false
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response.prototype.IfElseIf = function(p_xpath_true,p_fn_true,p_xpath_false,p_fn_false)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no nodes to test with the 'If'.");
	}

	var l_node_true = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath_true);

	if (l_node_true == null)
	{
	
		var l_node_false = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath_false);	
		
		if (l_node_false != null)
		{

			// Call the method
			p_fn_false.call(this);
		}

		return this;
	}
	
	// Push our node onto the array
	//this.NodeStack.push(l_node)

	// Call the method
	p_fn_true.call(this);

	// Push our node onto the array
	//this.NodeStack.pop()


	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.IfNotElse
    @param      p_xpath The url we want to select
    @param      p_fn_true The function we want to call if we managed to not select something
    @param      p_fn_true The function we want to call if we managed to select something
    @brief      Conditional: if(not xpath) then p_fn_true else p_fn_false
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response.prototype.IfNotElse = function(p_xpath,p_fn_true,p_fn_false)
{

	return this.IfElse(p_xpath,p_fn_false,p_fn_true);
}

/*!
    @fn      	MetaWrap.API.Request.prototype.selectNodes
    @param      p_xpath For the nodes we want to select. 
    @brief      Select a set of nodes using the current node on the nodestack as the context.
    @author     James Mc Parlane
    @date       6 June 2009

*/
MetaWrap.API.Response.prototype.selectNodes = function(p_xpath)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no nodes to select.");
	}

	return MetaWrap.API.selectNodes(this.XML,this.Current(),p_xpath);
}


/*!
    @fn      	MetaWrap.API.Request.prototype.selectSingleNode
    @param      p_xpath For the nodes we want to select. 
    @brief      Select a set of nodes using the current node on the nodestack as the context.
    @author     James Mc Parlane
    @date       6 June 2009

*/
MetaWrap.API.Response.prototype.selectSingleNode = function(p_xpath)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so there is no  node to select");
	}

	return MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_xpath);
}

/*!
    @fn      	MetaWrap.API.Request.prototype.Current    
    @brief      return the current node on top of the node stack
    @author     James Mc Parlane
    @date       6 June 2009

*/
MetaWrap.API.Response.prototype.Current = function()
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node current on the node stack.");
	}

	return this.NodeStack[this.NodeStack.length-1];
}


/*!
    @fn      	MetaWrap.API.Request.prototype.Value    
    @param      p_select (optional) The xpath for the nodes we want to select. If null then we get the value of the current node.
    @brief      Return the text value of the current node
    @author     James Mc Parlane
    @date       6 June 2009

*/
MetaWrap.API.Response.prototype.Value = function(p_select)
{
	if (this.NodeStack.length == 0)
	{
		throw("There is no node on the node stack, so no value to be read.");
	}

	if (p_select == null)
	{
		switch(this.Current().nodeType)
		{
			case 1: return this.Current().text;
			case 2: return this.Current().value;
		}
	}
	else
	{
		var node = MetaWrap.API.selectSingleNode(this.XML,this.Current(),p_select);
		
		if (node == null)
		{
			return null;
		}
		
		switch(node.nodeType)
		{
			case 1: return node.text;
			case 2: return node.value;
		}
		
	}
}



/*!
    @fn      	MetaWrap.API.Request.prototype.For
    @param      p_xpath The xpath for the nodes we want to select
    @param      p_fn The function we want to call
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009
*/
MetaWrap.API.Response.prototype.For = function(p_xpath,p_fn)
{
	var l_nodes = MetaWrap.API.selectNodes(this.XML,this.Current(),p_xpath);

	if (l_nodes == null)
	{
		throw("'For' called with invalid xpath '" + p_xpath + "'");
	}

	for (var i = 0; i < l_nodes.length; i++) 
	{
		// Push our node onto the array
		this.NodeStack.push(l_nodes[i])

		// Call the for function
		p_fn.call(this);		

		// Remove from nodestack
		this.NodeStack.pop();

	}

	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.Do
    @param      p_fn The function we want to call
    @brief      Just call some javascript..
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Response.prototype.Do = function(p_fn)
{
	p_fn.call(this);

	return this;
}







/*!
 *@} endgroup tw_javascript_lib_api MetaWrap - JavaScript - API - Services
 */

/*!
 *@} end of MetaWrap.API.Services
 */
