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
//var MetaWrap = {};

/*!
    @namespace	MetaWrap.API
    @brief      Declare the MetaWrap.API Namespace
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API = {};

/*!
    @namespace	MetaWrap.API.call
    @brief      Kick off the chaining from a call.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.call = function()
{	
	return new MetaWrap.API.Services();
}		

/*!
    @namespace	MetaWrap.API.if
    @brief      Kick off the chaining from a if.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.if = function(p_test)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.if(p_test);
	
	return l_services;
}		

/*!
    @namespace	MetaWrap.API.if
    @brief      Kick off the chaining from a if.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.foreach = function(p_select)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.foreach(p_select);
	
	
	return l_services;
}		



/*!
    @fn			MetaWrap.API.variable
    @param      p_name The name of the variable we want to define.
    @param      p_value The xpath to what we are selecting
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.variable = function(p_name,p_select)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.variable(p_name,p_select);
	
	return l_services;
}		


/*!
    @fn			MetaWrap.API.import
    @param      p_name The name of the content we are importing (it will be wrapped in import element with name = p_name)
    @param      p_content The    
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.import = function(p_name,p_content)
{	
	var l_services = new MetaWrap.API.Services();
	
	l_services.import(p_name,p_content);
	
	return l_services;
}


/*!
    @fn         MetaWrap.API.use
    @param      p_name The name of the parameter we want to se a default value for
    @param      p_value The
    @brief      set default parameter name value pairs
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.use = function(p_name,p_value)
{
	var l_services = new MetaWrap.API.Services();
	
	l_services.use(p_name,p_value);

	return l_services;
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
	
	// 'Use' hash table
	this.Use = {};
	
	this.OutputElementStart("action");

	// Output for an individual action
	//this.ActionOutput = "";

	
};

/*!
    @namespace	MetaWrap.API.call
    @brief      Kick off the chaining from a call.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.call = function()
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
MetaWrap.API.Services.prototype.use = function(p_name,p_value)
{	
	this.Use[p_name] = p_value;
	
	
	return this;
}	


/*!
    @fn         MetaWrap.API.Services.prototype.execute
    @brief      Closes the current service request and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.prototype.execute = function(p_url)
{
	this.ClosePendingElements();

	var l_request = new MetaWrap.API.Request(this.Generated);

	return l_request.request(p_url);
}


/*!
    @fn         MetaWrap.API.Services.prototype.generate
    @brief      Closes the current service request and generates the XML response
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.prototype.generate = function()
{
	this.ClosePendingElements();
	
	return new MetaWrap.API.Request(this.Generated);
}




/*!
    @fn			MetaWrap.API.Services.prototype.variable
    @param      p_name The name variable we want to define.
	@param      p_value The value of the variable we want to define.    
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.variable = function(p_name,p_value)
{	
	this.OutputElementStart("var");
	this.OutputAttribute("name",p_name);
	this.OutputAttribute("get",p_value);
	this.OutputElementEnd();
	
	//this.OutputAction();
	
	return this;
}		

/*!
    @fn			MetaWrap.API.Services.prototype.import
    @param      p_name The name of the content we are importing (it will be wrapped in import element with name = p_name)
	@param      p_content The XML or url to the content we want to import
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.import = function(p_name,p_content)
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
    @namespace	MetaWrap.API.Services.prototype.if
    @param      p_test The condition we are testing  for
    @brief      Kick off the chaining from an if.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.if = function(p_test)
{	
	this.OutputElementStart("if");
	this.OutputAttribute("test",p_test);
	
	return this;
}		

/*!
    @fn			MetaWrap.API.Services.prototype.if
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.endif = function()
{	
	this.OutputElementEndUntil("if");
	
	return this;
}		


/*!
    @fn			MetaWrap.API.Services.prototype.foreach
    @param      p_select Xpath to what we are itterating on
    @brief      Kick off the chaining from a variable.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.foreach = function(p_select)
{	
	this.OutputElementStart("foreach");
	this.OutputAttribute("select",p_select);	
	
	return this;
}		

/*!
    @namespace	MetaWrap.API.Services.prototype.endforeach
    @brief      Signify that we want to end a foreach.
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.prototype.endforeach = function(p_test)
{	
	this.OutputElementEndUntil("foreach");
	
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
		throw("Can not call OutputAttribute if the element if the closing '>' has already been output.");
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
		//log("ClosePendingElements: ></" + this.UnclosedElements.pop() + ">");		
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
	this.OutputAttribute("module",this.Service);
	this.OutputAttribute("version",this.Version);
}

/*!
    @class      MetaWrap.API.Action
    @param      p_module The module this action is part of
	@param      p_name The name  of this action
	@param		p_mandatory_parameters The mandatory parameters
    @brief      Action class - Represents an action being invoked
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
    @fn         MetaWrap.API.Services.Action.prototype.call	
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.call = function()
{
	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);
	
 	//this.Service.OutputAction();

	return this.Service;
}

/*!
    @fn         MetaWrap.API.Services.Action.prototype.if	
	@param      p_test What the if is testing for
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.if = function(p_test)
{
	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	//this.Service.OutputAction();

	this.Service.if(p_test)
	
	return this.Service;
}

/*!
    @namespace	MetaWrap.API.Services.prototype.endif
    @brief      Signify that we are ending an 'if'
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.Action.prototype.endif = function()
{	
	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.endif()

	//this.Service.OutputAction();			
	
	return this.Service;
}		



/*!
    @fn         MetaWrap.API.Services.Action.prototype.foreach	
	@param      p_select What the foreach is matching.
    @brief      Closes the current Action and calls the next one.
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.foreach = function(p_select)
{
	

	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	//this.Service.OutputAction();			

	this.Service.foreach(p_select)
	
	return this.Service;
}


/*!
    @namespace	MetaWrap.API.Services.prototype.endforeach
    @brief      Signify that we are ending a 'foreach'
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.API.Services.Action.prototype.endforeach = function()
{	
	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	this.Service.endforeach()

	//this.Service.OutputAction();			
	
	return this.Service;
}		



/*!
    @fn         MetaWrap.API.Services.Action.prototype.execute	
    @brief      Closes the current Action and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.execute = function(p_url)
{
	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	//this.Service.OutputAction();
	
	return this.Service.execute(p_url);
}

/*!
    @fn         MetaWrap.API.Services.Action.prototype.generate	
    @brief      Closes the current Action and triggers execution of the service
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.generate = function()
{
	this.validateMandatory(this);
	
	this.Service.OutputElementEndUntil(this.Name);

	//this.Service.OutputAction();			
	
	return this.Service.generate();
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
			this.removeMandatory(p_name)
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
    @param      p_action The action this parameter is tied to
	@param      p_name The parameter name
	@param      p_mandatory If true then the parameter is mandatory
    @brief      Represents an extended parameter being invoked
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services.Action.Parameter = function(p_action,p_name,p_mandatory)
{
	this.m_action = p_action;
	this.m_name = p_name;
	this.m_mandatory = p_mandatory;
}


/*!
    @fn      	MetaWrap.API.Services.Action.Parameter.prototype.select
    @param      p_select Represents an extended parameter being invoked
    @brief      Constructor for Parameter.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Services.Action.Parameter.prototype.select = function(p_select)
{

	this.m_action.Service.OutputElementStart(this.m_name);	
	this.m_action.Service.OutputAttribute("get",p_select);	
	this.m_action.Service.OutputElementEnd();
	
	// If it is mandatory.
	if (this.m_mandatory)
	{
		// Remove it from our mandatory list
		this.m_action.removeMandatory(this.m_name);
	}
	
	return this.m_action;
}

//
// Parameter Validation
//

/*!
    @fn         MetaWrap.API.Services.Action.prototype.removeMandatory	
	@param      p_name The name of the parameter we are processing for this Action
    @brief      Removes a mandatory paremeter from the list
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.removeMandatory = function (p_name)
{
	for(var i=0; i<this.MandatoryParameters.length;i++ )
	{ 
		if(this.MandatoryParameters[i]==p_name)
		{
			this.MandatoryParameters.splice(i,1); 
			return;
		}
	} 									
	throw("'" + p_name + "' is a mandatory parameter for action 'identity_request', but was not in the list of mandatory parameters.");
}


/*!
    @fn         MetaWrap.API.Services.Action.prototype.validateMandatory	
    @brief      Called to validate that all mandatory parameters have been included
    @author     James Mc Parlane
    @date       6 June 2009
	
*/
MetaWrap.API.Services.Action.prototype.validateMandatory = function()
{
	if (this.MandatoryParameters.length != 0)
	{
		var l_list = "";
				
	
		for(var i=0; i< this.MandatoryParameters.length; i++ )
		{ 
			var l_parameter = this.MandatoryParameters[i];
		
			if (this.Service.Use[l_parameter] != null)
			{				
				this[l_parameter](this.Service.Use[l_parameter]);
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
			throw("Call to 'identity_request' is missing the following parameter" + (this.MandatoryParameters.length > 1 ?"s":"") + ": " + l_list);
		}
	}
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
	this.Url = MetaWrap.API.Request.Url;
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
    @fn      	MetaWrap.API.Request.prototype.call
    @param      p_url The url we want call
    @brief      Constructor for Request.
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Request.prototype.request = function(p_fn)
{		
	// If we pass in a callback function then we are asyncronous
	var l_async = (typeof(p_fn) == "function");

	var l_url = this.Url + MetaWrap.API.Request.Batch;

	// Do the XHR thing
	var l_xhr = new MetaWrap.Network.Client.HTTP();	
	l_xhr.open("POST",this.Url + MetaWrap.API.Request.Batch,l_async);
	l_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	//log("REQUEST: " + this.XML);

	if (l_async)
	{
		// make damn sure we don't repeat
		l_xhr.onreadystatechange = function()
		{

			//log("status = " + l_xhr.status);

			if ((l_xhr.readyState == 4) & (l_xhr.status == 200))
		    {
		    	//log("RESPONSE: " + l_xhr.responseXML.xml);

				var l_response = new MetaWrap.API.Response(l_url,this,l_xhr.responseXML);

				p_fn.call(l_response);	
			}
			
		};
			
		// Punch it rico
		l_xhr.send(this.XML);	
					
	}
	else
	{
		// make damn sure we don't repeat
		l_xhr.onreadystatechange = function(){};

		// Punch it rico
		l_xhr.send(this.XML);	
		
		// Wait for the response
		if (l_xhr.status == 200)
	    {
	    	//log("RESPONSE: " + l_xhr.responseXML.xml);

			return new MetaWrap.API.Response(l_url,this,l_xhr.responseXML);
		}
		else
		{
			log("FAIL " + l_xhr.status);
		}

	}



	
};



/*!
    @fn      	MetaWrap.API.Request.prototype.url
    @param      p_url The url we want call
    @brief      Sets the url for the request
    @author     James Mc Parlane
    @date       6 June 2009    
*/
MetaWrap.API.Request.prototype.url = function(p_url)
{		

	this.Url = 	p_url

	return this;
};



/*!
    @class      MetaWrap.API.Request
    @param      p_url An actual request object
    @param      p_request The request object
    @param      p_response_xml The Response XML object
    @brief      Constructor for Response.
    @author     James Mc Parlane
    @date       6 June 2009
    
*/
MetaWrap.API.Response = function(p_url,p_request,p_response_xml)
{		
	
	this.Request = p_request;
	this.Url = p_url;
	this.XML = p_response_xml;	
	this.ResponseNode = this.XML.selectSingleNode("response");	

	if (this.ResponseNode == null)
	{
		throw("XML Response was missing root 'response' element.");
	}
};

/*!
    @fn      	MetaWrap.API.Request.prototype.with
    @param      p_xpath The url we want to select
    @param      p_fn The function we want to call
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Response.prototype.with = function(p_xpath,p_fn)
{
	var l_node = this.ResponseNode.selectSingleNode(p_xpath);

	if (l_node == null)
	{
		throw("'with' called with invalid xpath '" + p_xpath + "' into xml " + this.ResponseNode.xml);
	}

	var l_value = l_node.text;

	//log("with " + p_xpath + " = " + l_value);

	p_fn.call(l_node,l_value);

	return this;
}

/*!
    @fn      	MetaWrap.API.Request.prototype.if
    @param      p_xpath The url we want to select
    @param      p_fn The function we want to call if we managed to select something
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Response.prototype.if = function(p_xpath,p_fn)
{
	var l_node = this.ResponseNode.selectSingleNode(p_xpath);

	if (l_node == null)
	{
		return this;
	}

	var l_value = l_node.text;

	//log("with " + p_xpath + " = " + l_value);

	p_fn.call(l_node,l_value);

	return this;
}


/*!
    @fn      	MetaWrap.API.Request.prototype.foreach
    @param      p_xpath The url we want to select
    @param      p_fn The function we want to call
    @brief      With this value, call the following
    @author     James Mc Parlane
    @date       6 June 2009

    Use - Is used to set default parameter name value pairs
*/
MetaWrap.API.Response.prototype.foreach = function(p_xpath,p_fn)
{
	var l_nodes = this.ResponseNode.selectNodes(p_xpath);

	if (l_nodes == null)
	{
		throw("with called with invalid xpath '" + p_xpath + "'");
	}

	for (var i = 0; i < l_nodes.length; i++) 
	{
		var l_value = l_nodes[i].text;

		p_fn.call(l_nodes[i],l_value);		
	}

	return this;
}



/*!
 *@} endgroup tw_javascript_lib_api MetaWrap - JavaScript - API - Services
 */

/*!
 *@} end of MetaWrap.API.Services
 */
