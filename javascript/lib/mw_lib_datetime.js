/*

    @file mw_lib_datetime.js

    $Id: mw_lib_datetime.js,v 1.12 2006/07/01 08:06:57 james Exp $
          
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
 * $Log: mw_lib_datetime.js,v $
 * Revision 1.12  2006/07/01 08:06:57  james
 * Trying to fix Doxygen comments
 *
 * Revision 1.11  2006/05/06 09:33:02  james
 * More refactoring
 *
 * Revision 1.10  2006/05/06 08:28:27  james
 * More refactoring
 *
 * Revision 1.9  2006/02/05 13:18:53  james
 * This weekend I wrote this timeconverter application from scratch based on
 * the old IridiumTime conveter application that I wrote back in 1997.
 *
 * Revision 1.8  2006/01/29 09:12:39  james
 * Cosmetic tweak
 *
 * Revision 1.7  2005/11/09 05:04:39  james
 * Getting wirewrap libs in order.
 *
 * Revision 1.6  2005/10/30 11:20:12  james
 * Tidied up code - getting pipleine sorted out
 *
 * Revision 1.5  2005/09/09 02:32:17  james
 * More test cases for XML handling
 *
 * Revision 1.4  2005/08/29 08:06:25  james
 * *** empty log message ***
 *
 * Revision 1.3  2005/08/29 07:51:40  james
 * Latest wirewrap test
 *
 * Revision 1.2  2005/07/28 07:28:17  james
 * Standardised datetime names
 * Fixed broken unit tests
 *
 * Revision 1.1  2005/07/07 01:49:53  james
 * *** empty log message ***
 *
 * Revision 1.1  2005/06/10 13:02:43  james
 * Tidied up code.
 * Added ability to define xslt and css that gets combined with XML via datetimes.
 *
 */


/*! \page mw_javascript_lib_datetime MetaWrap - JavaScript - Datetime
 *
 * \subsection mw_javascript_lib_datetime Overview
 */
 
/*! \defgroup mw_javascript_lib_datetime  MetaWrap - JavaScript - Datetime
 *@{
 */ 


/*! @name  MetaWrap.Datetime */
//@{

//alert("$Id: mw_lib_datetime.js,v 1.12 2006/07/01 08:06:57 james Exp $");

// Ensure we have the namespaces we need
MwUse("MetaWrap","mw_lib.js");


/*!
    @namespace  MetaWrap.Datetime
    @fn         MetaWrap.Datetime = function()
    @brief      Declare the MetaWrap.Datetime namespace
    @author     James Mc Parlane
    @date       26 August 2008
    
*/
MetaWrap.Datetime = function(p_string)
{
	if (p_string == null)
	{
		// now
		this.m_date = new Date();
	}
	else
	{
		// this date
		this.m_date = new Date(p_string);
	}
}

// Return a nice descrption of how long ago this was done
MetaWrap.Datetime.pluralise = function(p_string,p_num)
{
	if (p_num <= 1)
	{
		return p_string;
	}
	else
	{
		return p_string + "s";
	}	
}


// Return a nice descrption of how long ago this was done
MetaWrap.Datetime.prototype.niceHowLongAgo = function()
{
	var l_now = new MetaWrap.Datetime();
	
	var l_diff_ms = l_now.m_date.getTime() - this.m_date.getTime();
	
	var l_diff_seconds = l_diff_ms/1000;
	
	if (l_diff_seconds < 1)
	{
		return "just now";	
	}
	
	var l_diff_minutes = l_diff_seconds/60;
	
	if (l_diff_minutes < 1)
	{
		var l_diff_seconds = Math.floor(l_diff_seconds);
		return l_diff_seconds + " " + MetaWrap.Datetime.pluralise("second",l_diff_seconds) + " ago";
	}
	
	var l_diff_hours = l_diff_minutes/60;
	
	if (l_diff_hours < 1)
	{
		var l_diff_minutes = Math.floor(l_diff_minutes);
		return l_diff_minutes + " " + MetaWrap.Datetime.pluralise("minute",l_diff_minutes) + " ago";
	}
	
	var l_diff_days = l_diff_hours/24;
	
	if (l_diff_days < 1)
	{
		var l_diff_hours = Math.floor(l_diff_hours);
		return l_diff_hours + " " + MetaWrap.Datetime.pluralise("hour",l_diff_hours) + " ago";
	}

	var l_diff_weeks = l_diff_days/7;
	
	if (l_diff_weeks < 1)
	{
		var l_diff_days = Math.floor(l_diff_days);
		
		if (l_diff_days == 1)
		{
			return "yesterday";
		}
		
		return l_diff_days + " " + MetaWrap.Datetime.pluralise("day",l_diff_days) + " ago";
	}
	
	
	
	return this.m_date.toString();
	
}

// Return a nice descrption of how long ago this was done
MetaWrap.Datetime.niceHowSoon = function(p_s)
{
	
	var l_diff_seconds = p_s;
	
	if (l_diff_seconds < 1)
	{
		return "no more";	
	}
	
	var l_diff_minutes = l_diff_seconds/60;
	
	if (l_diff_minutes < 1)
	{
		var l_diff_seconds = Math.floor(l_diff_seconds);
		return l_diff_seconds + " " + MetaWrap.Datetime.pluralise("second",l_diff_seconds);
	}
	
	var l_diff_hours = l_diff_minutes/60;
	
	if (l_diff_hours < 1)
	{
		var l_diff_minutes = Math.floor(l_diff_minutes);
		return l_diff_minutes + " " + MetaWrap.Datetime.pluralise("minute",l_diff_minutes);
	}
	
	var l_diff_days = l_diff_hours/24;
	
	if (l_diff_days < 1)
	{
		var l_diff_hours = Math.floor(l_diff_hours);
		return l_diff_hours + " " + MetaWrap.Datetime.pluralise("hour",l_diff_hours);
	}

	var l_diff_weeks = l_diff_days/7;
	
	if (l_diff_weeks < 1)
	{
		var l_diff_days = Math.floor(l_diff_days);
		
		if (l_diff_days == 1)
		{
			return "till tomorrow";
		}
		
		return l_diff_days + " " + MetaWrap.Datetime.pluralise("day",l_diff_days);
	}
	
	
	
	return this.m_date.toString();
	
}

/*!
    @fn         MetaWrap.Datetime.Set = function(p_name, p_value, p_expires, p_path, p_domain, p_secure)
    @param      p_name Name of the datetime
    @brief      Sets a Datetime with the given p_name and p_value.
    @author     James Mc Parlane
    @date       26 August 2008
*/
MetaWrap.Datetime.DateString2DateUTC  = function(p_time)
{
	
	//return Date.UTC(p_time.substr(0,4),p_time.substr(5,2)-1,p_time.substr(8,2));
		
	var l_date =new Date(null);
	l_date.setFullYear(p_time.substr(0,4),p_time.substr(5,2)-1,p_time.substr(8,2));
	return l_date;
}


/*!
    @fn         MetaWrap.Datetime.Set = function(p_name, p_value, p_expires, p_path, p_domain, p_secure)
    @param      p_name Name of the datetime
    @brief      Sets a Datetime with the given p_name and p_value.
    @author     James Mc Parlane
    @date       26 August 2008
*/
MetaWrap.Datetime.GetNextDayWithName  = function(p_date,p_day)
{
	for(var l_day_offset = 0;l_day_offset < 7; l_day_offset++)
	{
		var l_date = new Date(p_date);
				
		// Note: If adding five days to a date shifts the month or year, the changes are handled automatically by the Date object itself!
		// http://www.w3schools.com/JS/js_obj_date.asp

				
		l_date.setDate(l_date.getDate()+l_day_offset);
		
		if (l_date.getDay() == p_day)		
		{
			return l_date;
		}
	}
}


/*!
    @fn         MetaWrap.Massive.example.V8.DateTimeString2DateUTC = function(p_time)
    @brief      Convert time offset to MS since 1970
    @author     James Mc Parlane
    @date       6 December 2006
*/
MetaWrap.Datetime.DateTimeString2Date = function(p_time)
{
    // 0000000000111111111
    // 0123456789012345678
    // 2005-02-18 01:13:14

    return Date.UTC(p_time.substr(0,4),p_time.substr(5,2)-1,p_time.substr(8,2),p_time.substr(11,2),p_time.substr(14,2),p_time.substr(17,2),0);
}

/*!
    @fn         MetaWrap.Massive.example.V8.TimeOffsetString2Date = function(p_time)
    @brief      Convert time offset to MS since 1970
    @author     James Mc Parlane
    @date       6 December 2006
*/
MetaWrap.Datetime.TimeOffsetString2Date = function(p_time)
{
    //012345678
    //+11:00:00
    return Date.UTC(1970,0,1,p_time.substr(1,2),p_time.substr(4,2),p_time.substr(7,2),0);
}


//@}

/*! 
 *@} endgroup mw_javascript_lib_datetime MetaWrap - JavaScript - Datetime
 */ 

/*! 
 *@} end of MetaWrap.Datetime
 */ 
      