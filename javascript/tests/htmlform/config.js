/*

    @file mw_lib_xml_action_gha.js

    $Id: config.js,v 1.2 2006/12/22 01:03:58 james Exp $
          
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
  
    Copyright (C) 2006  Massive Technologies, Pty Ltd.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

/*
 * $Log: config.js,v $
 * Revision 1.2  2006/12/22 01:03:58  james
 * *** empty log message ***
 *
 * Revision 1.1  2006/12/20 10:47:15  james
 * Latest version of the js library
 *
 */

/*! \page mw_javascript_lib_panasonic_ife_config MetaWrap - JavaScript - Panasonic - Panasonic - IFE - Config 
 *
 * \subsection mw_javascript_lib_panasonic_ife_config Overview
 *
 */

//alert("$Id: config.js,v 1.2 2006/12/22 01:03:58 james Exp $");
 
/*! \defgroup mw_javascript_lib_panasonic_ife_config  MetaWrap - JavaScript - Panasonic - Panasonic - IFE - Config 
 *@{
 */ 
 
// Ensure we have the namespace we need
MwUse("MetaWrap","mw_lib.js");
MwUse("MetaWrap.XML","mw_lib_xml.js");
 
/*! @name  Panasonic.IFE.Config */
//@{

var Panasonic = {};

Panasonic.IFE = {};

/*!
    @namespace  Panasonic.IFE.Config
    @brief      Register the namespace
*/    
Panasonic.IFE.Config = function(p_name)
{
    this.m_name = p_name;
    this.m_config_string = MetaWrap.Cookie.Get(this.m_name);
    
    if (this.m_config_string == null)    
    {
        // Make a new one
        this.create();
    }
    else
    {     
		// create an empty object 
        this.m_config = new Panasonic.IFE.Config.Item();    
        
        // Turn the XML into an Object
        this.m_config = MetaWrap.XML.Deserialise(this.m_config_string,this.m_config);
    }
}

/*!
    @fn         Panasonic.IFE.Config.prototype.create = function()
    @return     A fully populated Panasonic.IFE.Config object
    @brief      Create a fully populated Panasonic.IFE.Config object
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.prototype.create = function()
{
    // no - Create the setup object using defaults
    this.m_config = new Panasonic.IFE.Config.Item("menu",true,"Main Menu");
    this.m_config.add("ent");
    this.m_config.add("news");
    this.m_config.add("inflight");
    this.m_config.add("info");
    this.m_config.add("comms");
    this.m_config.add("mags");
    this.m_config.add("language");
    this.m_config.add("help");
}


/*!
    @fn         Panasonic.IFE.Config.prototype.string = function()
    @return     The serilaised XML represntation of the config state
    @brief      Return the serilaised XML represntation of the config state
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.prototype.string = function()
{
    // Serialise it
    return  MetaWrap.XML.Serialise(this.m_config,true);
}


/*!
    @fn         Panasonic.IFE.Config.prototype.save = function()
    @return     void
    @brief      Save the config into a cookie
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.prototype.save = function()
{
    // Serialise it   

    alert("save " + this.string());

    // Show it
    MetaWrap.Cookie.Set(this.m_name,this.string());
}


/*!
    @fn         Panasonic.IFE.Config.prototype.enable = function(p_id,p_child)
    @param		p_id The id of the config item to enable
    @param		p_child The child id of the config item to enable
    @return     Enable a config item. If you specify both the parent and child id then it will enable the child item
    @brief      Enables the 
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.prototype.enable = function(p_id,p_child)
{
    var l_item = this.m_config.find(p_id);
    
    if (l_item)
    {
        l_item.enable(p_child); 
    }
}

/*!
    @fn         Panasonic.IFE.Config.prototype.disable = function(p_id,p_child)
    @return     void
    @brief      Enable a config item. If you specify both the parent and child id then it will disable the child item
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.prototype.disable = function(p_id,p_child)
{
    var l_item = this.m_config.find(p_id);
    
    if (l_item)
    {
        l_item.disable(p_child); 
    }
}


/*!
    @class      Panasonic.IFE.Config.Item = function(p_id,p_on,p_name)
    @brief      Declare class for a config item
    @author     James Mc Parlane
    @date       6 December 2006
*/  
Panasonic.IFE.Config.Item = function(p_id,p_on,p_name)
{
    this.m_id = p_id || "";
    
    
    if (p_on == null)
    {
        this.m_on = true;
    }
    else
    {
        this.m_on = p_on;
    }
    
    this.m_name = p_name || "";
    this.m_items = [];    
    return this;
}


/*!
    @fn         Panasonic.IFE.Config.Item.prototype.m_items_create = function()
    @return     A newly created config element
    @brief      Wire up the constructor for the 'm_items' array
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.Item.prototype.m_items_create = function(p_id,p_on,p_name)
{
    var l_object = new Panasonic.IFE.Config.Item(p_id,p_on,p_name);
    this.m_items[this.m_items.length] = l_object;
    return l_object;
}

/*!
    @fn         Panasonic.IFE.Config.Item.prototype.add = function(p_id,p_on,p_name)
    @param      p_id The id of the item
    @param      p_on If this is true then t
    @return     The added  Panasonic.IFE.Config.Item
    @brief      Adds a config item with the details provided
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.Item.prototype.add = function(p_id,p_on,p_name)
{
    var l_object = this.m_items_create(p_id,p_on,p_name);    
    return l_object;
}


/*!
    @fn         Panasonic.IFE.Config.Item.prototype.find = function(p_id)
    @return     The found Panasonic.IFE.Config.Item
    @brief      Find the child item with an id of p_id
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.Item.prototype.find = function(p_id)
{
    for(var i = 0;i<this.m_items.length;i++)
    {
        if (this.m_items[i].m_id == p_id)
        {
            return this.m_items[i];
        }
    }
}

/*!
    @fn         Panasonic.IFE.Config.Item.prototype.enable = function(p_id)
    @return     void
    @brief      Enable the specified child item
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.Item.prototype.enable = function(p_id)
{
    if (p_id == undefined)
    {
        this.m_on = true;
        return;
    }

    var l_item = this.find(p_id);
    
    if (l_item)
    {
        l_item.m_on = true; 
    }
}

/*!
    @fn         Panasonic.IFE.Config.Item.prototype.disable = function(p_id)
    @return     void
    @brief      Disable the specified child item
    @author     James Mc Parlane
    @date       18 December 2006
*/  
Panasonic.IFE.Config.Item.prototype.disable = function(p_id)
{
    if (p_id == undefined)
    {
        this.m_on = false;
        return;
    }

    var l_item = this.find(p_id);
    
    if (l_item)
    {
        l_item.m_on = false;
    }
}

// Create the global menu
var g_config = new Panasonic.IFE.Config("IFE");

/*! 
 *@} endgroup mw_javascript_lib_panasonic_ife_config MetaWrap - JavaScript - Panasonic - Panasonic - IFE - Config 
 */ 

/*! 
 *@} end of Panasonic.IFE.Config
 */ 