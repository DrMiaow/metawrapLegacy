/*

    @file mw_lib_xml_vault.js

    $Id: mw_lib_xml_vault.js,v 1.18 2006/07/01 08:02:09 james Exp $
          
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
 * $Log: mw_lib_xml_vault.js,v $
 * Revision 1.18  2006/07/01 08:02:09  james
 * Trying to fix Doxygen comments
 * --------------------------------------------------
 *
 * Revision 1.4  2006/06/20 13:41:15  james
 * Improved Action AJAX so that it can be executed asyncronously, either serially or in parallel
 *
 * Revision 1.3  2006/05/18 12:18:45  james
 * Tidied some stuff up
 *
 * Revision 1.2  2006/05/16 04:56:31  james
 * Created simple cypher object and testcases
 *
 * Revision 1.1  2006/05/14 07:36:23  james
 * *** empty log message ***
 *
 */

/*! \page mw_javascript_lib_xml_vault MetaWrap - JavaScript - XML - Vault
 *
 * \subsection mw_javascript_lib_xml_vault Overview
 *
 */

//alert("$Id: mw_lib_xml_vault.js,v 1.18 2006/07/01 08:02:09 james Exp $");
 
/*! \defgroup mw_javascript_lib_xml_vault  MetaWrap - JavaScript - XML - Vault
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
MwUse("MetaWrap.XML.Action","mw_lib_xml_action.js");
 
/*! @name  MetaWrap.XML.Vault */
//@{

/*!
    @namespace  MetaWrap.XML.Vault
    @brief      Register the namespace
*/    
MetaWrap.XML.Vault = {};


/*!
    @class      MetaWrap.XML.Vault.Action.get = function(p_from,p_as)
    @param      p_from
    @param      p_as
    @return     void
    @brief      
    @author     James Mc Parlane
    @date       8 May 2006

    Example XML Sent to server
	<action>
		<get>
			<from>text.xml</from>
			<as>cdata</as>
		</get>
	</action>
*/
MetaWrap.XML.Vault.get = function(p_apikey,p_from,p_as)
{
	this.m_action = {};
	this.m_action.m_get = { m_apikey:p_apikey,m_from:p_from,m_as:p_as};
}


/*!
	@class      Search.Command.Search.Response = function()
	@return     void
	@brief      Implemenets Class that contains response of a search
	@author     James Mc Parlane
	@date       8 May 2006

	Example XML Recieved from server
	<?xml version="1.0" encoding="utf-8" ?> 
	<response datetime="2006-05-14T14:52:40" duration="47.9585ms">
		<get>
			<status>success</status> 
			<data><![CDATA[<?xml version="1.0" encoding="utf-8" ?> 
<name>
<first>Bill</first>
<last>Gates</last>
</name>]]></data>
		</get>
	</response>
*/
MetaWrap.XML.Vault.get.response = function()
{
    this.m_get = {m_status:"",m_data:""};
    return this;
}

/*!
    @class      MetaWrap.XML.Vault.put = function(p_data,p_in,p_failonexists)
    @param      p_data
    @param      p_in
    @param      p_failonexists
    @return     void
    @brief      
    @author     James Mc Parlane
    @date       8 May 2006

    Example XML Sent to server
    <action>
        <get>
            <from>text.xml</from>
            <as>cdata</as>
        </get>
    </action>
*/
MetaWrap.XML.Vault.put = function(p_apikey,p_data,p_in,p_failonexists)
{
	p_failonexists = p_failonexists||false;

	this.m_action = {};
	this.m_action.m_put = { m_apikey:p_apikey,m_data:"<![CDATA[" + p_data + "]]>",m_in:p_in,m_failonexists:p_failonexists};
}

/*!
	@class      MetaWrap.XML.Vault.put.response = function()
	@return     void
	@brief      Implemenets Class that contains response of a search
	@author     James Mc Parlane
	@date       8 May 2006

	Example XML Recieved from server
	<?xml version="1.0" encoding="utf-8" ?> 
	<response datetime="2006-05-14T14:52:40" duration="47.9585ms">
        <put>
            <status>success</status> 
        </put>
	</response>
*/
MetaWrap.XML.Vault.put.response = function()
{
    this.m_put = {m_status:""};
    return this;
}


/*! 
 *@} endgroup mw_javascript_lib_xml_vault MetaWrap - JavaScript - XML - Vault
 */ 

/*! 
 *@} end of MetaWrap.XML.Vault
 */ 





