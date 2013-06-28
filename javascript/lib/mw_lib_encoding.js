/*

    @file mw_lib_hash.js

    $Id: mw_lib_hash.js,v 1.2 2006/07/01 08:06:57 james Exp $
          
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
 * $Log: mw_lib_hash.js,v $
 * Revision 1.2  2006/07/01 08:06:57  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.1  2006/05/23 13:08:19  james
 * Fixed bug in macro recorder.
 * Added hash object
 *
 */

/*! \page mw_javascript_lib_hash MetaWrap - JavaScript - Encoding
 *
 * \subsection mw_javascript_lib_hash Overview
 *  
 */

//alert("$Id: mw_lib_hash.js,v 1.2 2006/07/01 08:06:57 james Exp $");
 
/*! \defgroup mw_javascript_lib_hash  MetaWrap - JavaScript - Encoding
 *@{
 */ 

//
// Ensure we have the namespaces we need
//
MwUse("MetaWrap","mw_lib.js");

//
// Now that we have the pre-requisite namespaces, then off we go
//
 
/*! @name MetaWrap.Encoding */
//@{

/*!
    @namespace  MetaWrap.Encoding
    @brief      MetaWrap.Encoding namespace
*/
MetaWrap.Encoding = {};
 
 
 MetaWrap.Encoding.UTF8 = 
 {
 	encode : function (p_string) 
	{
		p_string = p_string.replace(/\r\n/g,"\n");
		var p_utftext = "";
 
		for (var n = 0; n < p_string.length; n++) {
 
			var c = p_string.charCodeAt(n);
 
			if (c < 128) {
				p_utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				p_utftext += String.fromCharCode((c >> 6) | 192);
				p_utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				p_utftext += String.fromCharCode((c >> 12) | 224);
				p_utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				p_utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return p_utftext;
	},
 	
	decode : function (p_utftext) 
	{
		var p_string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < p_utftext.length ) {
 
			c = p_utftext.charCodeAt(i);
 
			if (c < 128) {
				p_string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = p_utftext.charCodeAt(i+1);
				p_string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = p_utftext.charCodeAt(i+1);
				c3 = p_utftext.charCodeAt(i+2);
				p_string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return p_string;
	}
 }
 
 
MetaWrap.Encoding.Base64 = 
{
	c_keystr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 	
	encode : function (p_input) 
	{
		var l_output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		p_input = MetaWrap.Encoding.UTF8.encode(p_input);
 
		while (i < p_input.length) {
 
			chr1 = p_input.charCodeAt(i++);
			chr2 = p_input.charCodeAt(i++);
			chr3 = p_input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			l_output = l_output +
				this.c_keystr.charAt(enc1) + this.c_keystr.charAt(enc2) +
				this.c_keystr.charAt(enc3) + this.c_keystr.charAt(enc4);
 
		}
 
		return l_output;
	},
 	
	decode : function (p_input) 
	{
		var l_output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		p_input = p_input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < p_input.length) {
 
			enc1 = this.c_keystr.indexOf(p_input.charAt(i++));
			enc2 = this.c_keystr.indexOf(p_input.charAt(i++));
			enc3 = this.c_keystr.indexOf(p_input.charAt(i++));
			enc4 = this.c_keystr.indexOf(p_input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			l_output = l_output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				l_output = l_output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				l_output = l_output + String.fromCharCode(chr3);
			}
 
		}
 
		l_output = MetaWrap.Encoding.UTF8.decode(l_output);
 
		return l_output;
 
	}
}

MetaWrap.Encoding.Url = 
{
 	// public method for url encoding
	encode : function (p_string) 
	{
		return escape(MetaWrap.Encoding.UTF8.encode(p_string));
	},
 
	// public method for url decoding
	decode : function (p_string) 
	{
		return MetaWrap.Encoding.UTF8.decode(unescape(p_string));
	}
}

/*! 
 *@} end of MetaWrap.Encoding
 */ 

/*! 
 *@} endgroup mw_javascript_lib_hash MetaWrap - JavaScript - Encoding
 */ 
 