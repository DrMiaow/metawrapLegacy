/*

    @file mw_lib_cipher.js

    $Id: mw_lib_cipher.js,v 1.3 2006/07/01 08:06:56 james Exp $
          
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
 * $Log: mw_lib_cipher.js,v $
 * Revision 1.3  2006/07/01 08:06:56  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.2  2006/05/16 05:38:48  james
 * Latest cipher code
 *
 * Revision 1.1  2006/05/16 04:56:31  james
 * Created simple cypher object and testcases
 *
 */


/*! \page mw_javascript_lib_cipher MetaWrap - JavaScript - Cipher
 *
 * \subsection mw_javascript_lib_cipher_Overview Overview
 */
 
/*! \defgroup mw_javascript_lib_cipher  MetaWrap - JavaScript - Cipher
 *@{
 */ 

/*! @name  MetaWrap.Cipher */
//@{

//alert("$Id: mw_lib_cipher.js,v 1.3 2006/07/01 08:06:56 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");

/*!
    @namespace	MetaWrap.Cipher
    @fn         MetaWrap.Cipher = function()
    @brief      Declare the MetaWrap.Cipher Class constructor
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.Cipher = function(p_key)
{
	// no key => empty key	
	p_key = p_key||"";
	
	// generate empty key containers
	this.m_forward = [];
	this.m_reverse = [];	
	
	// if the key is 
	if (p_key.length == 512)
	{
		this.load(p_key);
	}			
	else
	if (p_key.length == 0)
	{
		// do nothing	
	}
	else
	{
		error("MetaWrap.Cipher: key is invalid length " + p_key + " is " + p_key.length + " characters - expecting 512.");
	}
}

/*!
    @fn         MetaWrap.Cipher.prototype.encrypt = function(p_message)
    @param		p_message The plaintext message to be encrypted
    @brief      Encrypt p_message using the current key
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.Cipher.prototype.encrypt = function(p_message)
{
	var l_result = "";
	
	for(var i = 0;i<p_message.length;i++)
	{
		var l_byte = new Number(p_message.charCodeAt(i));
		
		var l_byte_encrypted = this.m_forward[l_byte];
		
		l_result += MetaWrap.d2h2(l_byte_encrypted);
	}
	
	return l_result;
}

/*!
    @fn         MetaWrap.Cipher.prototype.decrypt = function(p_secret)
    @param		p_secret The hex encoded string to be decrypted
    @brief      Decrypt p_secret using the current key
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.Cipher.prototype.decrypt = function(p_secret)
{
	var l_result = "";
	
	ASSERT((p_secret.length%2) == 0);
	
	// Generate key
	for(var i = 0;i<p_secret.length/2;i++)
	{
		// Get a 2 character hex string that represents a byte
		var l_byte_string = p_secret.substr(i*2,2);
		
		// convert it to a number
		var l_byte = MetaWrap.h2d(l_byte_string);
		
		// Decrypt it
		var l_byte_decrypted = this.m_reverse[l_byte];
		
		// add it to result
		l_result += String.fromCharCode(l_byte_decrypted);		
	}
	
	// flee with the goods..
	return l_result;
}

/*!
    @fn         MetaWrap.Cipher.prototype.getKey = function()
    @brief      Return a string representing the cipher key
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.Cipher.prototype.getKey = function()
{
	var l_result = "";

	// for each byte in the reverse lookup table
	for(var i = 0;i<256;i++)
	{
		// Add a hex representation to the result
		l_result += MetaWrap.d2h2(this.m_reverse[i]);
	}
	
	return l_result;	
}

/*!
    @fn         MetaWrap.Cipher.prototype.getInverseKey = function()
    @brief      Return a string representing the inverse cipher key
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.Cipher.prototype.getInverseKey = function()
{
	var l_result = "";

	// for each byte in the reverse lookup table
	for(var i = 0;i<256;i++)
	{
		// Add a hex representation to the result
		l_result += MetaWrap.d2h2(this.m_forward[i]);
	}
	
	return l_result;	
}

/*!
    @fn         MetaWrap.Cipher.prototype.generate = function()
    @brief      Generate a random cypher
    @author     James Mc Parlane
    @date       16 May 2006
*/
MetaWrap.Cipher.prototype.generate = function()
{
	var l_result = "";

	// clear out existing key				
	this.m_forward = [];	
	this.m_reverse = [];
	this.m_key = "";	
	
	// We want to generate this many slots
	var l_slots = 0;
	
	// While we still have slots to allocate
	while(l_slots < 256)
	{
		// Generate a random number
		var l_slot = new Number(Math.floor(Math.random()*256));
		
		// Do we have a forward lookup for this?
		if (this.m_forward[l_slot] == null)
		{
			// no - so make one	
			this.m_forward[l_slot] = l_slots;
			
			// And while we are at it generate the reverse
			this.m_reverse[l_slots] = l_slot;
			
			// now we are ready
			l_slots++;			
		}
	}
	

	// Calculate the key string
	l_result = this.getKey();
	
	// This is our key	
	this.m_key = l_result;
	
	// run with it...
	return l_result;
}

MetaWrap.Cipher.prototype.load = function(p_key)
{
	this.m_forward = [];	
	this.m_reverse = [];	
	
	// For each 2 byte hex string in the key
	for(var i = 0;i<256;i++)
	{
		// get 2 byte hex string
		var l_byte_string = p_key.substr(i*2,2);	
		
		// convert to number
		var l_byte = MetaWrap.h2d(l_byte_string);		
		
		// populate forward lookup table
		this.m_forward[l_byte] = i;
		
		// populate reverse lookup table
		this.m_reverse[i] = l_byte;
	}

	// This is out key	
	this.m_key = p_key;	
}


/*! 
 *@} endgroup mw_javascript_lib_cipher MetaWrap - JavaScript - Cipher
 */ 

/*! 
 *@} end of MetaWrap.Cipher
 */ 
      