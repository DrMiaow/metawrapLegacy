var g_cookie_name = "ThumbWhereUserAPIToken";

var g_rememberme_cookie_name = "ThumbWhereRememberMe"

var l_remember_me = true;

var l_api_key = "8e9ff318-3cd7-4593-99de-4c37c0fb335a";

// This is the member token for our fake login.
var l_api_member_token = "";

var l_mms_number = "61-447-100-293";

//alert(document.domain);

var l_domain = document.domain.toLowerCase();


if (l_domain.indexOf("dev.thumbwhere.com"))
{
	l_mms_number = "00-000-000-000";
}
else
if (l_domain.indexOf("test.thumbwhere.com"))
{
	MetaWrap.StateViewMap.g_validated
}
else
if (l_domain.indexOf("staging.thumbwhere.com"))
{
	l_mms_number = "61-447-100-294";
}



/*
// Uncomment this to fake teh login
var l_cookie_expiry =null;	
	
if (l_remember_me)
{
	l_cookie_expiry = new Date();	
	l_cookie_expiry.setTime(l_cookie_expiry.getTime()+(1000*24*60*60*1000));
}

l_api_member_token =  "blah";
MetaWrap.Cookie.Set(g_cookie_name,l_api_member_token,l_cookie_expiry);
*/

var l_api_server = "/api";
//var l_api_server = "http://api.staging.thumbwhere.com";
//var l_api_server = "http://api.thumbwhere.com";
//var l_api_server = "http://localhost.thumbwhere.com/thumbwhere/websites/services";

// Regex for testing for a valid email addresss
var l_email_regex = new RegExp("^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$");

// The members usernamee
var l_member_username = "";

// The code we need to SMS
var l_login_code = "";

// the number we need to SMS to
var l_login_number = "";

//MetaWrap.View.m_page_open_effects[MetaWrap.View.m_page_open_effects.length] = pageOpen;

// Flags used to test the interface

var l_test_expired = false;
var l_test_ready = false;
var l_test_error = false;

// The list of applications available for this campaign
var g_applications = [];

// The application we are focused on
var g_application = null;

// List of all the member applications
var g_member_applications = [];

// Our current  application 
var g_member_application = null;

var l_waiting_for_sms_request_query_timer = null;

var l_loaded = false;

var l_loading = false;


var l_magic = "IS MAGIC!";

var l_unique = "<b>We are all individuals</b>";



function noSpace(p_event)
{
	var l_key;
	var l_keychar;


	// Get the event
	if (window.event)
	{
	   l_key = window.event.keyCode;
	}
	else 
	if (p_event)
	{
	   l_key = p_event.which;
	}
	else
	{
	   return true;
	}

	// Get the key char
	l_keychar = String.fromCharCode(l_key);

	// Allos control keys
	if ((l_key==null) || (l_key==0) || (l_key==8) || (l_key==9) || (l_key==13) || (l_key==27) )
	{
	   return true;
	}

	// numbers + alphabetic chars
	return ((" \n\r\t\g").indexOf(l_keychar) == -1);
}



var g_count = 1;

function TestBinding()
{	
	//l_magic = "This is very magic";
	l_member_username = "James";
	l_unique = "<u>Number " + (g_count++) + "</u>";
	
	/*
	if (g_application == null)
	{
		g_application = {};
	}
	*/
	//g_application.m_description = "Application #" + g_count;
	//g_application.m_name = "Application #" + g_count;
	
	MetaWrap.View.renderBindings();	
}


		function InputValue(p_id)
		{
			var l_input = MetaWrap.$(p_id);			
			// If its invalid - then its invalid
			if (l_input == null)
			{
				return "";
			}			
			return l_input.value;
		}


		function pageOpen(p_document)
		{
			alert("pageOpen effect");
		}


		function start()
		{
			// Should we remember our login status?
			l_remember_me = (MetaWrap.Cookie.Get(g_rememberme_cookie_name) == "true");
			
			//alert("l_remember_me = " + l_remember_me);
		
			// register a listener for onstatechange
			MetaWrap.State.onstatechange = MetaWrap.View.OnStateChange;

			// Work out our initial state
			MetaWrap.State.determineState();

			// Add a special effect on transition
			MetaWrap.View.m_aspect_show_effects[MetaWrap.View.m_aspect_show_effects.length] = yellowFade;
			
			
		}

		///////////////////////////////
		//var g_loggedin = false;

		var g_invite_sent = false;

		// return true if we are logged in
		function isLoggedIn()
		{
			// get the cookie
			var l_cookie_value =  MetaWrap.Cookie.Get(g_cookie_name);

			// empty cookie is the same as no cookie.
			if (l_cookie_value == "")
			{
				l_cookie_value = null;
			}

			// no cookie, no love
			return (l_cookie_value != null);
		}




function getMembersApplicationInstance(p_appname)
{
	//alert("hasMemberGotApplication " + p_appname + " g_member_applications.length = " + g_member_applications.length);

	for(var i = 0;i< g_member_applications.length;i++)
	{
		//alert("a_name = " + g_member_applications[i].a_name);
		
		if (g_member_applications[i].a_name == p_appname)
		{
			return g_member_applications[i];			
		}
	}
	
	return null;
}


function hasMemberGotApplication(p_appname)
{
	//alert("hasMemberGotApplication " + p_appname + " g_member_applications.length = " + g_member_applications.length);

	for(var i = 0;i< g_member_applications.length;i++)
	{
		//alert("a_name = " + g_member_applications[i].a_name);
		
		if (g_member_applications[i].a_name == p_appname)
		{
			
			return true;
		}
	}
	
	return false;
}


function canAddApplication()
{

	if (InputValue("APPUSERNAME") == "") return false;
	
	if (InputValue("APPPASSWORD") == "") return false;
		

	return true;
}

function hasApplications()
{
	if (g_member_applications == null)
	{
		return false;
	}
	
	if (g_member_applications.length == 0)
	{
		return false;
	}
	
	return true;
}

function onHide_renderApplications()
{
	//alert("onHide_renderApplications");
}

function onShow_renderApplications()
{
	//alert("onShow_renderApplications");
	
	var l_apps_container_div = MetaWrap.$("apps_container");
	
	if (l_apps_container_div != null)
	{	
		//alert("onShow_renderApplicaions " + g_applications.length);
		var l_login_code_out = MetaWrap.Page.Output(l_apps_container_div);
		
		if (l_login_code_out != null)
		{	
			l_login_code_out.clear();
			
			for(var i = 0;i<g_applications.length;i++)
			{		
				var l_app_html = "<div class='small_app apps_app'><strong><div id='app_name" + i + "'>" + g_applications[i].m_name + "</strong></div><div id='app_description" + i + "'>" + g_applications[i].m_description + "</div>";
				
				var l_member_app = getMembersApplicationInstance(g_applications[i].m_name);
				
				if (l_member_app != null)
				{
					l_app_html += "<b>Subscribed as " + l_member_app.m_username + "</b>";
					l_app_html += "<input type=\"BUTTON\" value=\"Remove\" id=\"app_join" + i + "\" name=\"app_join" + i + "\" onclick=\"return doJoinApplication(" + i+ ");\" />"		
					
					
				}		
				else
				{
					l_app_html += "<input type=\"BUTTON\" value=\"Add\" id=\"app_join" + i + "\" name=\"app_join" + i + "\" onclick=\"return doJoinApplication(" + i+ ");\" />"		
				}		
				l_app_html += "</div>";
				
				l_login_code_out.write(l_app_html);
			}
			
			l_login_code_out.flush();
		}
	}
}







function isLoading()
{
	if (l_loaded)
	{
		//alert("NOT LOADING");
		return false;
	}

	if (!l_loading)
	{
		l_loading = true;
		
		//alert("getting ready");
		
		l_campaign_get_summary = new MetaWrap.XML.Action.WS.campaign_get_summary
		(											
			l_api_key
		);
	
		l_campaign_get_summary_action = new MetaWrap.XML.Action(l_campaign_get_summary,l_api_server + "/campaign_get_summary.aspx");

		// Call the action
		if (!l_campaign_get_summary_action.run(oncomplete_campaign_get_summary,true))
		{
			fatal("There was an error calling 'campaign_get_summary'");
			alert("There was an error calling 'campaign_get_summary'");
		}							
	}
	
	//alert("LOADING");
	
	return true;
}

function isLoaded()
{
	return l_loaded;
}


function WaitingForSMSRequestTimer()
{
	//alert("WaitingForSMSRequestTimer");
	
	l_waiting_for_sms_request_query_timer = null;
	
	//
	// Lets work out what
	//

	// Create the request
	l_api_member_token_request_query = new MetaWrap.XML.Action.WS.api_member_token_request_query
	(
		l_api_key,
		l_login_code
	);

	// Create action
	l_api_member_token_request_query_action = new MetaWrap.XML.Action(l_api_member_token_request_query,l_api_server + "/api_member_token_request_query.aspx");
	

	//alert("About to run!");

	// Call the action
	if (!l_api_member_token_request_query_action.run(oncomplete_api_member_token_request_query,true))
	{
		MetaWrap.State.affirmState("/main/loaded/loggedOut/mobileLogin/waitingForSMSError");
	}

}


function onShow_waitingForSMS()
{
	//alert("l_login_code = " + l_login_code);

	var l_login_code_out = MetaWrap.Page.Output("waiting_for_sms_code");
	l_login_code_out.clear();
	l_login_code_out.write(l_login_code);
	l_login_code_out.flush();

	var l_login_number_out = MetaWrap.Page.Output("waiting_for_sms_number");
	l_login_number_out.clear();
	l_login_number_out.write(l_login_number);
	l_login_number_out.flush();

	// start waiting for the SMS to be sent
	l_waiting_for_sms_request_query_timer = window.setTimeout(WaitingForSMSRequestTimer, 10000);
}





// This is called on completion of a call to api_member_token_request
function oncomplete_api_member_token_request_application()
{

	// Get response as object
	var l_obj = l_api_member_token_request.m_response.m_api_member_token_request;

	if (l_obj.m_status == "success")
	{
		// Get response as object
		var l_response = l_api_member_token_request.m_response.m_api_member_token_request;
		l_login_code = l_response.m_code;
		l_login_number = l_response.m_number;

		// now lets show the waiting aspect
		MetaWrap.State.affirmState("/application/loaded/registerOrLogin/mobileRegistration/waitingForSMS");
	}			
	else
	{
		debug("l_obj.m_status = " + l_obj.m_status);
		// start waiting for the SMS to be sent
		//l_waiting_for_sms_request_query_timer = window.setTimeout(WaitingForSMSRequestTimer, 10000);
	}					
}

function onShow_waitingForSMSApplication()
{
	//alert("l_login_code = " + l_loginlogin_code);

	var l_login_code_out = MetaWrap.Page.Output("waiting_for_sms_code");
	l_login_code_out.clear();
	l_login_code_out.write(l_login_code);
	l_login_code_out.flush();

	var l_login_number_out = MetaWrap.Page.Output("waiting_for_sms_number");
	l_login_number_out.clear();
	l_login_number_out.write(l_login_number);
	l_login_number_out.flush();

	// start waiting for the SMS to be sent
	l_waiting_for_sms_request_query_timer = window.setTimeout(WaitingForSMSRequestApplicationTimer, 10000);
}
		
		

function WaitingForSMSRequestApplicationTimer()
{
	//alert("WaitingForSMSRequestApplicationTimer");

	
	l_waiting_for_sms_request_query_timer = null;
	
	//
	// Lets work out what
	//

	// Create the request
	l_api_member_token_request_query = new MetaWrap.XML.Action.WS.api_member_token_request_query
	(
		l_api_key,
		l_login_code
	);

	// Create action
	l_api_member_token_request_query_action = new MetaWrap.XML.Action(l_api_member_token_request_query,l_api_server + "/api_member_token_request_query.aspx");
	

	//alert("About to run!");

	// Call the action
	if (!l_api_member_token_request_query_action.run(oncomplete_api_member_token_request_query_application,true))
	{
		MetaWrap.State.affirmState("/application/loaded/registerOrLogin/mobileRegistration/waitingForSMSError");
	}

}		



// return true if our member account is complete
function isMemberAccountComplete()
{	
	return (l_member_username != "");
}

function loadMemberDetails()
{
	//alert("loadMemberDetails " + MetaWrap.Cookie.Get(g_cookie_name));

	LoginMemberAndGetMemberInfo(MetaWrap.Cookie.Get(g_cookie_name));	
	
	return true;
}

function LoginMemberAndGetMemberInfo(p_api_member_token)
{
	debug("LoginMemberAndGetInfo " + p_api_member_token);
	
	// Log the member is
	l_api_member_token = p_api_member_token;
	
	debug("l_api_member_token = " + l_api_member_token);
	
	var l_cookie_expiry =null;	
	
	if (l_remember_me)
	{
		l_cookie_expiry = new Date();	
		l_cookie_expiry.setTime(l_cookie_expiry.getTime()+(1000*24*60*60*1000));
	}
	
	MetaWrap.Cookie.Set(g_cookie_name,p_api_member_token,l_cookie_expiry);

	l_member_get_campaign_summary = new MetaWrap.XML.Action.WS.member_get_campaign_summary
	(								
	    l_api_key,
	    p_api_member_token
	);

	// Create action
	l_member_get_campaign_summary_action = new MetaWrap.XML.Action(l_member_get_campaign_summary,l_api_server + "/member_get_campaign_summary.aspx");

	// Call the action
	if (!l_member_get_campaign_summary_action.run(oncomplete_member_get_campaign_summary,true))
	{
	    alert("There was an error calling 'member_get_campaign_summary'");
	}
}


var g_app_password_changed = false;

function appPasswordChanged()
{
	g_app_password_changed = true;
}	


function hasApplicationChanged()
{
	if (g_member_application != null)
	{
	
		var l_appusername_input = MetaWrap.$("APPUSERNAMEUPDATE");
		
		// If its invalid - then its invalid
		if (l_appusername_input == null)
		{
			//debug("not showing - which means this is our current username");
			
		
			// -1 = username is invalid
			return false;
		}
		

		if (l_appusername_input.value != g_member_application.m_username)
		{
			// yes we have chnaged
			return true;
		}

		// If the password has changed then we should update
		return g_app_password_changed;
	}
	else
	{
		return false;
	}
}

function hasMemberAddedApplication()
{
	//debug("hasMemberAddedApp");

	if (g_member_application == null)
	{
		if (g_application != null)
		{
			//  get each of the member applications
			for(var i = 0;i< g_member_applications.length;i++)
			{						
				//g_member_applications[i] = MetaWrap.XML.Deserialise(l_member_applications[i].xml,{});
				
				//alert("a_name = " + g_member_applications[i].a_name);
			
				if (g_member_applications[i].a_name == g_application.m_name)
				{
					//alert("member has " + g_application.m_name);
					
					g_member_application = g_member_applications[i];					
				}			
			
			}
		}
		else
		{
			// No application then member can't be a member
			g_member_application = null;
			return false;
		}
	}
	
	
	return (g_member_application != null);
	
}

function doCreateRegistration()
{
	//alert("doUpdateRegistration " + l_api_member_token + " change username from " + l_member_username + " to " + MetaWrap.$("UPDATEUSERNAME").value + " and change password from '" + MetaWrap.$("UPDATEPASSWORDCURRENT").value + "' to '" + MetaWrap.$("UPDATEPASSWORD").value + "'");
	
	
	// Update both username and password
	
	//alert("doCreateRegistration l_member_username = " + l_member_username);

	// Create the request
	l_member_update_credentials = new MetaWrap.XML.Action.WS.member_update_credentials
	(
									
		l_api_key,
		l_api_member_token,
		"",
		"",
		MetaWrap.$("CREATEUSERNAME").value,
		MetaWrap.$("CREATEPASSWORD").value
	);

	// Create action
	l_member_update_credentials_action = new MetaWrap.XML.Action(l_member_update_credentials,l_api_server + "/member_update_credentials.aspx");

	// Call the action
	if (!l_member_update_credentials_action.run(oncomplete_member_update_credentials_create,true))
	{
		alert("There was an error calling 'member_update_credentials'");
	}
}


function doUpdateRegistration()
{
	//alert("doUpdateRegistration " + l_api_member_token + " change username from " + l_member_username + " to " + MetaWrap.$("UPDATEUSERNAME").value + " and change password from '" + MetaWrap.$("UPDATEPASSWORDCURRENT").value + "' to '" + MetaWrap.$("UPDATEPASSWORD").value + "'");
	
	
	if ((MetaWrap.$("UPDATEPASSWORD").value != "") && (MetaWrap.$("UPDATEUSERNAME").value != l_member_username))
	{
		// Update both username and password
		
		alert("Update both username and password");
	
		// Create the request
		l_member_update_credentials = new MetaWrap.XML.Action.WS.member_update_credentials
		(
										
		    l_api_key,
		    l_api_member_token,
		    l_member_username,
		    MetaWrap.$("UPDATEPASSWORDCURRENT").value,
		    MetaWrap.$("UPDATEUSERNAME").value,
		    MetaWrap.$("UPDATEPASSWORD").value
		);

		// Create action
		l_member_update_credentials_action = new MetaWrap.XML.Action(l_member_update_credentials,l_api_server + "/member_update_credentials.aspx");

		// Call the action
		if (!l_member_update_credentials_action.run(oncomplete_member_update_credentials,true))
		{
		    alert("There was an error calling 'member_update_credentials'");
		}
	}
	else
	if ((MetaWrap.$("UPDATEPASSWORD").value == "") && (MetaWrap.$("UPDATEUSERNAME").value != ""))
	{
	
		alert("update just username");
	
		//////////////////////////////////
		
		// Create the request
		l_member_update_username = new MetaWrap.XML.Action.WS.member_update_username
		(
										
		    l_api_key,
		    l_api_member_token,
		    l_member_username,
		    MetaWrap.$("UPDATEPASSWORDCURRENT").value,
		    MetaWrap.$("UPDATEUSERNAME").value
		);

		// Create action
		l_member_update_username_action = new MetaWrap.XML.Action(l_member_update_username,l_api_server + "/member_update_username.aspx");

		// Call the action
		if (!l_member_update_username_action.run(oncomplete_member_update_username,true))
		{
		    alert("There was an error calling 'member_update_username'");
		}
	}
	else
	{
		//alert("update just password");
		
		// Create the request
		l_member_update_password = new MetaWrap.XML.Action.WS.member_update_password
		(
		    l_api_key,
		    l_api_member_token,
		    l_member_username,
		    MetaWrap.$("UPDATEPASSWORDCURRENT").value,
		    MetaWrap.$("UPDATEPASSWORD").value
		);

		// Create action
		l_member_update_password_action = new MetaWrap.XML.Action(l_member_update_password,l_api_server + "/member_update_password.aspx");

		// Call the action
		if (!l_member_update_password_action.run(oncomplete_member_update_password,true))
		{
		    alert("There was an error calling 'member_update_password'");
		}
		
	}
	
	
	
}

function doDeleteRegistration()
{
	var l_answer = confirm("Delete your ThumbWhere account? There is NO undo.");
	
	if (l_answer)
	{
		//alert("doDeleteRegistration");		
		
		// Create the request
		l_member_delete = new MetaWrap.XML.Action.WS.member_delete
		(									
		    l_api_key,
		    l_api_member_token
		);

		// Create action
		l_member_delete_action = new MetaWrap.XML.Action(l_member_delete,l_api_server + "/member_delete.aspx");

		// Call the action
		if (!l_member_delete_action.run(oncomplete_member_delete,true))
		{
		    alert("There was an error calling 'member_delete'");
		}

		
		//doLogout();
	}
	else
	{
		alert("Phew, Thanks for sticking around!\nYou had me worried there for a moment.")
	}
}

function doRememberMe(p_name)
{	
	//alert("doRememberMe " + MetaWrap.$("REMEMBERME").checked);
	
	l_remember_me = MetaWrap.$("REMEMBERME").checked;	
	var l_cookie_expiry = new Date();		
	l_cookie_expiry.setTime(l_cookie_expiry.getTime()+(1000*24*60*60*1000));	
	MetaWrap.Cookie.Set(g_rememberme_cookie_name,"" + l_remember_me,l_cookie_expiry);
}

function doRegisterForApplication()
{
	//alert("doRegisterForApplication " + MetaWrap.$("APPUSERNAME").value + "/" + MetaWrap.$("APPPASSWORD").value);	
	//alert("g_application.m_application_key = " + g_application.m_application_key);
	//alert("l_api_member_token= " + l_api_member_token);
	
	MetaWrap.State.affirmState("application/loaded/loggedIn/addApplication/applicationAdding");				
	
	
	/*
	g_member_applications.push({
								a_name:g_application.m_name,
								m_username:MetaWrap.$("APPUSERNAME").value	
								});
	*/
	
	//MetaWrap.State.determineState();
	
	// Create the request
	l_member_add_application = new MetaWrap.XML.Action.WS.member_add_application
	(								
		l_api_key,
		l_api_member_token,
	    g_application.m_application_key
	);
	
	
	//
	// Add extra username pairs
	//	
	l_member_add_application.m_action.m_member_add_application.m_username = MetaWrap.$("APPUSERNAME").value;
	l_member_add_application.m_action.m_member_add_application.m_password = MetaWrap.$("APPPASSWORD").value;

	// Create action
	l_member_add_application_action = new MetaWrap.XML.Action(l_member_add_application,l_api_server + "/member_add_application.aspx");

	// Call the action
	if (!l_member_add_application_action.run(oncomplete_member_add_application,true))
	{
	    alert("There was an error calling 'member_add_application'");
	}
	
	
}

function doApplicationSubscriptionUpdate()
{
	//alert("doApplicationSubscriptionUpdate " + g_application.m_name + " " + MetaWrap.$("APPUSERNAMEUPDATE").value + "/" + MetaWrap.$("APPPASSWORDUPDATE").value);
	
	MetaWrap.State.affirmState("application/loaded/loggedIn/updateApplication/applicationUpdating");				
	

	// Create the request
	l_member_set_application_values = new MetaWrap.XML.Action.WS.member_set_application_values
	(								
	    l_api_key,
	    g_member_application.m_api_member_token
	);
	
	l_member_set_application_values.m_action.m_member_set_application_values.m_username = MetaWrap.$("APPUSERNAMEUPDATE").value;
	l_member_set_application_values.m_action.m_member_set_application_values.m_password = MetaWrap.$("APPPASSWORDUPDATE").value;

	// Create action
	l_member_set_application_values_action = new MetaWrap.XML.Action(l_member_set_application_values,l_api_server + "/member_set_application_values.aspx");

	// Call the action
	if (!l_member_set_application_values_action.run(oncomplete_member_set_application_values,true))
	{
	    alert("There was an error calling 'member_set_application_values'");
	}
	
	
}

function doRemoveApplication()
{
	//alert("doRemoveApplication");
	
	var l_answer = confirm("Delete your linkage to " + g_application.m_name + " ? You can always re-link later on?");
	
	if (l_answer)
	{
		
		
		// Call unsubscribe	
		
		
		
		
		// re-determine state
		//MetaWrap.State.determineState();
		
		
		
		// Create the request
		l_member_remove_application = new MetaWrap.XML.Action.WS.member_remove_application
		(
										
			l_api_key,
			l_api_member_token,
		    g_application.m_application_key
		);

		// Create action
		l_member_remove_application_action = new MetaWrap.XML.Action(l_member_remove_application,l_api_server + "/member_remove_application.aspx");

		// Call the action
		if (!l_member_remove_application_action.run(oncomplete_member_remove_application,true))
		{
		    alert("There was an error calling 'member_remove_application'");
		}
		
		
	}
}


function doGenerateCode()
{
	//alert("Generate code!");

	// Create the request
	l_api_member_token_request = new MetaWrap.XML.Action.WS.api_member_token_request
	(
		l_api_key
	);

	// Create action
	l_api_member_token_request_action = new MetaWrap.XML.Action(l_api_member_token_request,l_api_server + "/api_member_token_request.aspx");

	// Call the action
	if (!l_api_member_token_request_action.run(oncomplete_api_member_token_request,true))
	{
		MetaWrap.State.affirmState("/main/loaded/loggedOut/mobileLogin/generatingCodeError");
	}


	return true;
}


function doRegistrationGenerateCode()
{
	//alert("doRegistrationGenerateCode");

	// Create the request
	l_api_member_token_request = new MetaWrap.XML.Action.WS.api_member_token_request
	(
		l_api_key
	);

	// Create action
	l_api_member_token_request_action = new MetaWrap.XML.Action(l_api_member_token_request,l_api_server + "/api_member_token_request.aspx");

	// Call the action
	if (!l_api_member_token_request_action.run(oncomplete_api_member_token_request_application,true))
	{
		MetaWrap.State.affirmState("/application/loaded/registerOrLogin/mobileRegistration/generatingCodeError");
	}


	return true;
}	

function doLogin()
{
	//alert("doLogin " + MetaWrap.$("LOGINUSERNAME").value + "/" + MetaWrap.$("LOGINPASSWORD").value);
	//g_loggedin = true;
	
	
	// Create the request
	l_member_login = new MetaWrap.XML.Action.WS.member_login
	(								
	    l_api_key,
	    MetaWrap.$("LOGINUSERNAME").value,
	    MetaWrap.$("LOGINPASSWORD").value
	);

	// Create action
	l_member_login_action = new MetaWrap.XML.Action(l_member_login,l_api_server + "/member_login.aspx");

	// Call the action
	if (!l_member_login_action.run(oncomplete_member_login,true))
	{
	    alert("There was an error calling 'member_login'");
	}
	

//	MetaWrap.Cookie.Set(g_cookie_name,l_api_member_token)
//	MetaWrap.State.determineState();
}

function doLogout()
{
	//debug("doLogin CLICK");
	//g_loggedin = false;
	
	// The members version of the application
	g_member_application = null;
	
	// The application we are focusing on
	g_application = null;
	
	// We have no member applications loaded
	g_member_applications = [];
	
	// Forget about the member's username
	l_member_username = "";
	
	// Clear the cookie
	MetaWrap.Cookie.Delete(g_cookie_name)

	MetaWrap.State.determineState();
}

function doJoin()
{
	MetaWrap.State.affirmState("loggedOut/joining");
}

function doCancelJoin()
{
	MetaWrap.State.affirmState("loggedOut/waiting");
}

function doJoinApplication(p_application_offset)
{
	//alert("join application " + p_application_offset);
	
	// We are going to choose a new member application
	g_member_application = null;
	
	g_application = g_applications[p_application_offset];
	
	//alert("g_application.m_name " + g_application.m_name);
	
	MetaWrap.State.affirmState("application");
	
	return false
}

var l_strong_password_regex = new RegExp("(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$");

var l_alphanum_regex = new RegExp("[a-z0-9A-Z]+"); 

var l_numerical_regex = new RegExp("[0-9]+"); 

var l_password_score_hash = {}; 


function rateMyPassword(p_password)
{
	if (l_password_score_hash[p_password] != null)
	{
		return l_password_score_hash[p_password];
	}
	
	var l_len =  p_password.length;
	
	if (l_len == 0)
	{
		return 0;
	}

	var LENGTH_MUL = 0.13;
	
	var UNIQUE_ALNUM_SCORE = 0.4;
	
	var UNIQUE_NUMERICAL_SCORE = 0.6;
	
	var UNIQUE_NONALNUM_SCORE = 0.8;
	
	var COMPLEX_MUL = 1.1;
	
	var l_score = 0;

	// We get points for the number of characters
	l_score += (l_len - 5) * LENGTH_MUL;

	var l_unique_hash = {};
	
	// score for each unqiue letter
	for(var i = 0;i < l_len;i++)
	{
		var l_char = p_password.charAt(i);
		
		//debug(l_char);
		
		if (l_unique_hash[l_char] == null)
		{
			l_score += UNIQUE_ALNUM_SCORE;
			l_unique_hash[l_char] = true;
			
			//debug(l_alphanum_regex.test(l_char));
			
			if (!l_alphanum_regex.test(l_char))
			{
				//debug(l_char + " is not alnum");
				l_score += UNIQUE_NONALNUM_SCORE;
			}
			
			if (l_numerical_regex.test(l_char))
			{
				l_score += UNIQUE_NUMERICAL_SCORE;
			}
		}
	}

	// Passes strong password regex?
	if (l_strong_password_regex.test(p_password))
	{
		l_score *= COMPLEX_MUL;
	}
	
	if (l_score < 1)
	{
		l_score = 1;
	}
	
	l_score = Math.floor(l_score);
	
	l_password_score_hash[p_password] = l_score;
	
	//debug(p_password + " score = " + l_score);
	
	return l_score;
}

function getPasswordComplexity(p_password_input_id)
{

	//var l_password_input = MetaWrap.$("UPDATEPASSWORD");
	var l_password_input = MetaWrap.$(p_password_input_id);

	if (l_password_input == null)
	{
		return 0;
	}
	
	var l_score = rateMyPassword(l_password_input.value);
	
	if (l_score > 4)
	{
		l_score = 4;
	}
	
	
	return l_score;
}



function getPasswordVerifyMatch(p_password_input_id,p_password_verify_input_id)
{
	//debug("getPasswordVerifyMatch");

	// get the update
	//var l_passwordverify_input = MetaWrap.$("UPDATEPASSWORDVERIFY");
	var l_passwordverify_input = MetaWrap.$(p_password_verify_input_id);
	
	// if widget exists
	if (l_passwordverify_input != null)
	{
		// and its blank
		if (l_passwordverify_input.value == "")
		{
			// then return 0 which is blank
			return 0;
		}
	}
	else
	{
		// if its not shown - then 
		return 0;
	}

	// get out current password
	//var l_password_input = MetaWrap.$("UPDATEPASSWORD");
	var l_password_input = MetaWrap.$(p_password_input_id);

	// if widget exists
	if (l_password_input != null)
	{
		// if its blank
		if (l_password_input.value == l_passwordverify_input.value)
		{
			// then we match
			return 2;
		}	
		else
		{
			//debug("DOES NOT MATCH");
			// then we don't match
			return 1;
		}		
	}
	
	return 0;
}

function canUpdateAccount()
{
	return true;
}

function isReadyToAcceptSMSorMMS()
{	
	
	if (g_member_application == null)
	{
		return false;
	}
	
		
	if (g_member_applications != null)
	{
		return (g_member_applications.length > 0);
	}
	
	return false;
}

function isChangingCurrentPassword()
{
	// If we are trying to change the current password - then we need the old password

	var l_password_input = MetaWrap.$("UPDATEPASSWORD");

	if (l_password_input != null)
	{
		if (l_password_input.value != "")
		{
			return true;
		}
	}
	
	return false;
}


function isRegistrationDetailsChanged()
{
	var l_password_input = MetaWrap.$("UPDATEPASSWORD");

	if (l_password_input != null)
	{
		if (l_password_input.value != "")
		{
			return true;
		}
	}

	// If the member username has changed - then we need the old password	
	var l_username_input = MetaWrap.$("UPDATEUSERNAME");
		
	if (l_username_input != null)
	{		
		if (l_username_input.value != l_member_username)
		{
			return true;
		}
	}
	
	return false;	
}


function isChangingCurrentUserName()
{
	// If the member username has changed - then we need the old password	
	var l_username_input = MetaWrap.$("UPDATEUSERNAME");
		
	if (l_username_input != null)
	{		
		if (l_username_input.value != l_member_username)
		{
			return true;
		}
	}
	
	return false;
}


function isCurrentPasswordReady()
{
	var l_password_input = MetaWrap.$("UPDATEPASSWORDCURRENT");

	if (l_password_input == null)
	{
		return false;
	}	
	
	return (l_password_input.value != "");
}

// if this is true we are are going to send of request to server soon - unless we type some more and change our mind
var l_check_for_username_scheduled = false;

// The user name we are scheduled to check for
var l_scheduled_username = "";

// The user name we send off to the server
var l_servercheck_username = "";

// The user name we just checked
var l_checked_username = "";

// the result of the username we checked
var l_user_name_available = false;

// If this is true then the request to the server has been sent
var l_check_for_username_underway = false;

// The timer for the scheduling
var l_user_name_check_scheduled_timer = null;

function stopUserNameCheckScheduled()
{
	if (l_user_name_check_scheduled_timer != null)
	{
		//debug("clear the last check");
		window.clearTimeout(l_user_name_check_scheduled_timer);	
		l_user_name_check_scheduled_timer = null;		
	}
	
	l_check_for_username_scheduled = false;
}


var l_user_name_check_cache = {};

// Find out if a user name is available - answer can be that the check is in progress
function getUserNameAvailability(p_username_input_id)
{
	//var l_username_input = MetaWrap.$("UPDATEUSERNAME");
	
	var l_username_input = MetaWrap.$(p_username_input_id);
		
	// If its invalid - then its invalid
	if (l_username_input == null)
	{
		//debug("not showing - which means this is our current username");
		
		
		// -1 = username is invalid
		return 0;
	}
	
	var l_username = l_username_input.value;
	
	//l_username = l_username.
	
	//debug("l_username = " + l_username);
	//debug("l_checked_username = " + l_checked_username);

	// If its empty then its invalid
	if (l_username == "")
	{
		//debug("empty");
		// -1 = username is invalid
		
		stopUserNameCheckScheduled();
				
		return -1;
	}
		
	// Its ours  - there is no contention...
	if (l_username == l_member_username)
	{
		//debug("already ours");
		
		stopUserNameCheckScheduled();
		
		// 0 = username is yours already
		return 0;	
	}	
	else
	// if we have made the request to the server already
	if (l_check_for_username_underway)
	{
		//debug("check underway for " + l_servercheck_username);
				
	    // 1 = we are currently checking
		return 1;
	}
	else
	// If we have a check pending...
	if ((l_check_for_username_scheduled) && (l_scheduled_username == l_username))
	{
		//debug("check pending " + l_scheduled_username);
		
	    // 1 = we are currently checking
		return 1;
	}	
	else
	// if we just checked the username and we have a match...
	if (l_checked_username == l_username)
	{
		if (l_user_name_available)
		{
			//debug(l_checked_username + " is available ");
			// 2 = user name is available
			return 2;
		}
		else
		{
			//debug(l_checked_username + " is already taken");
			// 2 = user name is not available
			return 3;		
		}
	}
	else
	{
		// In that case - we schedule a check or interrupt one if its already pending
		
		// if its in the cache
		if (l_user_name_check_cache[l_username] != null)
		{
			//debug("getting from cache");
			
			// If its available
			if (l_user_name_check_cache[l_username])
			{
				//debug(l_checked_username + " is available (cache)");					
			
				// return 2
				return 2;
			}
			else
			{
				//debug(l_checked_username + " is already taken (cache)");
			
				// return unavailabe
				return 3;
			}
		}
	
		//debug("schedule check");
		
		stopUserNameCheckScheduled();
			
		// Lets check the username!
		
		l_check_for_username_scheduled = true;
		
		l_scheduled_username = l_username;
				
		l_user_name_check_scheduled_timer = window.setTimeout(CheckUsernameDelay, 3000);
	}
	
}

// Once our grace perioid is up
function CheckUsernameDelay()
{
	stopUserNameCheckScheduled();

	//debug("CheckUsernameDelay " + l_scheduled_username);

	//l_checked_username = l_scheduled_username;
	
	//l_user_name_available =  (l_checked_username == "DrMiaow");

	//l_check_for_username_scheduled = false;
	
	
	// we are checking for this
	l_servercheck_username = l_scheduled_username;
	
	// lets mark it as underwat
	l_check_for_username_underway = true;
	l_check_for_username_scheduled = false;
	
	//MetaWrap.State.determineState();
	
	l_user_name_check_scheduled_timer = window.setTimeout(CheckUsername, 500);	
}

var l_user_name_check_timer = null;



function CheckUsername()
{
	window.clearTimeout(l_user_name_check_timer);	

	//debug("CheckUsername " + l_servercheck_username);

	//l_checked_username = l_servercheck_username;	
	//l_user_name_available =  (l_servercheck_username == "DrMiaow");
	
	//l_user_name_check_cache[l_servercheck_username] = l_user_name_available;

	//l_check_for_username_underway = false;
	
	//MetaWrap.State.determineState();
	
	
	// Create the request
	l_member_username_available = new MetaWrap.XML.Action.WS.member_username_available
	(
									
	    l_api_key,
	    l_servercheck_username
	);

	// Create action
	l_member_username_available_action = new MetaWrap.XML.Action(l_member_username_available,l_api_server + "/member_username_available.aspx");

	// Call the action
	if (!l_member_username_available_action.run(oncomplete_member_username_available))
	{
	    alert("There was an error calling 'member_username_available'");
	}	
	
	
}


/*
// Create the request
l_member_get_campaign_summary = new MetaWrap.XML.Action.WS.member_get_campaign_summary
(
						
'api_key',
'api_member_token'
);

// Create action
l_member_get_campaign_summary_action = new MetaWrap.XML.Action(l_member_get_campaign_summary,l_api_server + "/member_get_campaign_summary.aspx");

// Call the action
if (!l_member_get_campaign_summary_action.run(oncomplete_member_get_campaign_summary))
{
alert("There was an error calling 'member_get_campaign_summary'");
}
*/


//
//
//
///////////////////////////////////////////////////////////




/*
function onLOGINUSERNAMEKeyDown()
{
	debug(MetaWrap.$("LOGINUSERNAME").value);
}

function onLOGINPASSWORDKeyDown()
{
	debug(MetaWrap.$("LOGINPASSWORD").value);
}

function onINVITEEMAILKeyDown()
{
	MetaWrap.State.determineState();
}
*/

function onInviteReady()
{
	//alert("onInviteReady");

	MetaWrap.State.negateState("/main/loaded/loggedOut/inviteSent");

	return true;
}

// return true if the regex for an email matches
function isInviteReady()
{
	try
	{
		return l_email_regex.test((MetaWrap.$("INVITEEMAIL").value));
	}
	catch(l_e)
	{
		return false;
	}
}

function isReadyToLogin()
{
	try
	{
		return (
					//(l_email_regex.test(MetaWrap.$("LOGINUSERNAME").value))
					(MetaWrap.$("LOGINUSERNAME").value.length > 0)
					&&
					(MetaWrap.$("LOGINPASSWORD").value.length > 0)
					);
	}
	catch(l_e)
	{
		return false;
	}
}

// This is called on completion of a call to invite
function oncomplete_invite()
{
		//alert("oncomplete_invite");
		//alert(l_invite_action.m_response_string);
		//alert(l_invite.m_response.m_invite.m_status);

		if (l_invite.m_response.m_invite.m_status == "success")
		{
			// clear the email address
			MetaWrap.$("INVITEEMAIL").value = "";

			// send the invite
			MetaWrap.State.affirmState("/main/loaded/loggedOut/inviteSent");
		}
		else
		{
			// send the invite
			MetaWrap.State.affirmState("/main/loaded/loggedOut/inviteError");
		}
}

function doInvite()
{

	//alert("http://localhost.thumbwhere.com/thumbwhere/websites/services/" + p_form_element.action);

	// Create the request
	l_invite = new MetaWrap.XML.Action.WS.invite
	(
			l_api_key,
			MetaWrap.$("INVITEEMAIL").value
	);

	// Create action
	l_invite_action = new MetaWrap.XML.Action(l_invite,l_api_server + "/invite.aspx");

	// Call the action
	l_invite_action.run(oncomplete_invite,true);


}


var l_original_backgrounds = {};

// Simple closure based yellow fade
function yellowFade(p_element)
{

   var l_r_yellow = 255;
   var l_g_yellow = 255;
   var l_b_yellow = 0;

   var l_r = l_r_yellow;
   var l_g = l_g_yellow;
   var l_b = l_b_yellow;

   var l_r_target = 211;
   var l_g_target = 211;
   var l_b_target = 211;

   var l_r_d = l_r_yellow - l_r_target;
   var l_g_d = l_g_yellow - l_g_target;
   var l_b_d = l_b_yellow - l_b_target;

   var l_dx = 0.02;
   var l_dx2 = 0.005;


   var l_unit = 0;

   var l_timeout = null;

   if (l_original_backgrounds[p_element.id] == null)
   {
		l_original_backgrounds[p_element.id] = p_element.style.background;
   }

   var l_old_background = l_original_backgrounds[p_element.id];

   //debug(p_element.style.background);


  function _f()
  {

	var l_done = false;

	if (l_timeout != null)
	{
		window.clearTimeout(l_timeout);
		l_timeout = null;
	}


	if (l_unit > 1.0)
	{
		l_unit = 1.0;
		l_done = true;
	}

	l_r = Math.floor(l_r_target + (l_r_d * (1.0-l_unit)));
	l_g = Math.floor(l_g_target + (l_g_d * (1.0-l_unit)));
	l_b = Math.floor(l_b_target + (l_b_d * (1.0-l_unit)));

	var l_rgb = 'rgb(' + l_r + ',' + l_g + ','+ l_b +')';

	//debug(l_rgb);

	//if (l_rgb != p_element.style.background)
	{
		p_element.style.background = l_rgb;
	}

	// increase by l_dx
	l_unit += l_dx;

	// increase l_dx
	l_dx += l_dx2;

	if (!l_done)
	{
		l_timeout = window.setTimeout(_f, 40);
	}
	else
	{
		p_element.style.background = l_old_background;
	}

  };

  _f();
}
