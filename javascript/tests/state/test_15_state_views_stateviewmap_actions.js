MetaWrap.XML.Action.WS = {};


///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_test_application
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_test_application = function(
	p_api_key,
	p_api_member_token,
	p_application_key)
{
    this.m_action = {};
    this.m_action.m_member_test_application =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token,
        m_application_key:p_application_key
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_test_application.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_test_application =
        {

        };
    return this;
}

// Reference to the request
var l_member_test_application = null;

// Reference to the action
var l_member_test_application_action = null;

// This is called on completion of a call to member_test_application
function oncomplete_member_test_application()
{
    //alert("oncomplete_member_test_application");


    // Get response as object
    var l_obj = l_member_test_application.m_response.m_member_test_application;
    //alert("'status' = " + l_obj.m_status);

    // Get response as XML
    //var l_xml = l_member_test_application_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_test_application/loaded/status").text);

    // Get response as a single string
    //alert(l_member_test_application_action.m_response_string);

	if (l_obj.m_status == "success")
	{		
		MetaWrap.State.affirmState("application/loaded/loggedIn/applicationAccountValid");
	}
	else
	{		
		MetaWrap.State.affirmState("application/loaded/loggedIn/applicationAccountInvalid");
	}

}

// This is called on completion of a call to member_test_application
function oncomplete_member_test_application_onadd()
{
    //alert("oncomplete_member_test_application_onadd");


    // Get response as object
    var l_obj = l_member_test_application.m_response.m_member_test_application;
    //alert("'status' = " + l_obj.m_status);

    // Get response as XML
    //var l_xml = l_member_test_application_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_test_application/loaded/status").text);

    // Get response as a single string
    //alert(l_member_test_application_action.m_response_string);
	
	loadMemberDetails();

	//MetaWrap.State.determineState();

	if (l_obj.m_status == "success")
	{		
		MetaWrap.State.affirmState("application/loaded/loggedIn/applicationAccountValid");
	}
	else
	{	
		MetaWrap.State.affirmState("application/loaded/loggedIn/applicationAccountInvalid");
	}

}

/*
// Create the request
l_member_test_application = new MetaWrap.XML.Action.WS.member_test_application
(

    'api_key',
    'api_member_token',
    'application_key'
);

// Create action
l_member_test_application_action = new MetaWrap.XML.Action(l_member_test_application,l_api_server + "/member_test_application.aspx");

// Call the action
if (!l_member_test_application_action.run(oncomplete_member_test_application))
{
    alert("There was an error calling 'member_test_application'");
}
*/

//
//
//
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_set_application_values
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_set_application_values = function(
	p_api_key,
	p_api_member_token)
{
    this.m_action = {};
    this.m_action.m_member_set_application_values =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_set_application_values.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_set_application_values =
        {

            m_encrypted:""
        };
    return this;
}

// Reference to the request
var l_member_set_application_values = null;

// Reference to the action
var l_member_set_application_values_action = null;

// This is called on completion of a call to member_set_application_values
function oncomplete_member_set_application_values()
{
    //alert("oncomplete_member_set_application_values");


    // Get response as object
    var l_obj = l_member_set_application_values.m_response.m_member_set_application_values;
    //alert("'status' = " + l_obj.m_status);

	if (l_obj.m_status == "success")
	{

		MetaWrap.State.affirmState("application/loaded/loggedIn/updateApplication/applicationUpdateTesting");

	    //alert("'encrypted' = " + l_obj.m_encrypted);

	    // Get response as XML
	    //var l_xml = l_member_set_application_values_action.m_response_xml;
	    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_set_application_values/status").text);
	    //alert("'encrypted' (from xml) = " +l_xml.selectSingleNode("response/member_set_application_values/encrypted").text);

	    // Get response as a single string
	    //alert(l_member_set_application_values_action.m_response_string);

		debug(l_member_set_application_values.m_action.m_member_set_application_values.m_username);
		debug(l_member_set_application_values.m_action.m_member_set_application_values.m_password);

		g_member_application.m_username = l_member_set_application_values.m_action.m_member_set_application_values.m_username;
		g_member_application.m_password = "itsasecret";
		g_app_password_changed = false;

		//MetaWrap.State.affirmState("application/loaded/loggedIn/updateApplication/applicationUpdated");

		// Create the request
		l_member_test_application = new MetaWrap.XML.Action.WS.member_test_application
		(
		    l_api_key,
		    g_member_application.m_api_member_token,
			g_member_application.m_application_key
		    //'api_key',
		    //'api_member_token',
		    //'application_key'
		);

		// Create action
		l_member_test_application_action = new MetaWrap.XML.Action(l_member_test_application,l_api_server + "/member_test_application.aspx");

		// Call the action
		if (!l_member_test_application_action.run(oncomplete_member_test_application,true))
		{
		    alert("There was an error calling 'member_test_application'");
		}

	}
	else
	{
		MetaWrap.State.affirmState("application/loaded/loggedIn/updateApplication/applicationUpdateError");
	}

	//loadMemberDetails();

	//MetaWrap.State.determineState();

}

/*
// Create the request
l_member_set_application_values = new MetaWrap.XML.Action.WS.member_set_application_values
(

    'api_key',
    'api_member_token'
);

// Create action
l_member_set_application_values_action = new MetaWrap.XML.Action(l_member_set_application_values,l_api_server + "/member_set_application_values.aspx");

// Call the action
if (!l_member_set_application_values_action.run(oncomplete_member_set_application_values))
{
    alert("There was an error calling 'member_set_application_values'");
}
*/

//
//
//
///////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_remove_application
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_remove_application = function(
	p_api_key,
	p_api_member_token,
	p_application_key)
{
    this.m_action = {};
    this.m_action.m_member_remove_application =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token,
        m_application_key:p_application_key
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_remove_application.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_remove_application =
        {

        };
    return this;
}

// Reference to the request
var l_member_remove_application = null;

// Reference to the action
var l_member_remove_application_action = null;

// This is called on completion of a call to member_remove_application
function oncomplete_member_remove_application()
{
    //alert("oncomplete_member_remove_application");


    // Get response as object
    var l_obj = l_member_remove_application.m_response.m_member_remove_application;
    //alert("'status' = " + l_obj.m_status);

    // Get response as XML
    //var l_xml = l_member_remove_application_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_remove_application/loaded/status").text);

    // Get response as a single string
    //alert(l_member_remove_application_action.m_response_string);

	//  get each of the member applications
	for(var i = 0;i< g_member_applications.length;i++)
	{
		//g_member_applications[i] = MetaWrap.XML.Deserialise(l_member_applications[i].xml,{});

		//alert("a_name = " + g_member_applications[i].a_name);

		if (g_member_applications[i].a_name == g_application.m_name)
		{
			//alert("member has " + g_application.m_name);

			//g_member_application = g_member_applications[i];

			g_member_applications = g_member_applications.slice(i+1);
			break;
		}

	}

	// clear out our application
	g_member_application = null;


	loadMemberDetails();

	MetaWrap.State.determineState();
}


/*
// Create the request
l_member_remove_application = new MetaWrap.XML.Action.WS.member_remove_application
(

    'api_key',
    'api_member_token',
    'application_key'
);

// Create action
l_member_remove_application_action = new MetaWrap.XML.Action(l_member_remove_application,l_api_server + "/member_remove_application.aspx");

// Call the action
if (!l_member_remove_application_action.run(oncomplete_member_remove_application))
{
    alert("There was an error calling 'member_remove_application'");
}
*/

//
//
//
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_add_application
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_add_application = function(
	p_api_key,
	p_api_member_token,
	p_application_key)
{
    this.m_action = {};
    this.m_action.m_member_add_application =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token,
        m_application_key:p_application_key
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_add_application.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_add_application =
        {

            m_api_member_token:""
        };
    return this;
}

// Reference to the request
var l_member_add_application = null;

// Reference to the action
var l_member_add_application_action = null;

// This is called on completion of a call to member_add_application
function oncomplete_member_add_application()
{
    //alert("oncomplete_member_add_application");


    // Get response as object
    var l_obj = l_member_add_application.m_response.m_member_add_application;
    //alert("'status' = " + l_obj.m_status);
    //alert("'api_member_token' = " + l_obj.m_api_member_token);

    // Get response as XML
    //var l_xml = l_member_add_application_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_add_application/loaded/status").text);
    //alert("'api_member_token' (from xml) = " +l_xml.selectSingleNode("response/member_add_application/loaded/api_member_token").text);

    // Get response as a single string
    //alert(l_member_add_application_action.m_response_string);

    if (l_obj.m_status == "success")
    {

		// Load the member details
		//loadMemberDetails();

		// MetaWrap.State.determineState();
		
		MetaWrap.State.affirmState("application/loaded/loggedIn/addApplication/applicationAddTesting");		


		// Create the request
		l_member_test_application = new MetaWrap.XML.Action.WS.member_test_application
		(
			l_api_key,
			l_api_member_token,
			g_application.m_application_key
		);

		// Create action
		l_member_test_application_action = new MetaWrap.XML.Action(l_member_test_application,l_api_server + "/member_test_application.aspx");

		// Call the action
		if (!l_member_test_application_action.run(oncomplete_member_test_application_onadd,true))
		{
			alert("There was an error calling 'member_test_application'");
		}

	}
	else
	{
			MetaWrap.State.affirmState("application/loaded/loggedIn/addApplication/applicationAddError");		
	}

}

/*
// Create the request
l_member_add_application = new MetaWrap.XML.Action.WS.member_add_application
(

    'api_key',
    'api_member_token',
    'application_key'
);

// Create action
l_member_add_application_action = new MetaWrap.XML.Action(l_member_add_application,l_api_server + "/member_add_application.aspx");

// Call the action
if (!l_member_add_application_action.run(oncomplete_member_add_application))
{
    alert("There was an error calling 'member_add_application'");
}
*/

//
//
//
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_update_password
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_update_password = function(
	p_api_key,
	p_api_member_token,
	p_username,
	p_password,
	p_new_password)
{
    this.m_action = {};
    this.m_action.m_member_update_password =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token,
        m_username:p_username,
        m_password:p_password,
        m_new_password:p_new_password
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_update_password.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_update_password =
        {

        };
    return this;
}

// Reference to the request
var l_member_update_password = null;

// Reference to the action
var l_member_update_password_action = null;

// This is called on completion of a call to member_update_password
function oncomplete_member_update_password()
{
    //alert("oncomplete_member_update_password");
    // Get response as object
    var l_obj = l_member_update_password.m_response.m_member_update_password;

    //alert("'status' = " + l_obj.m_status);
    // Get response as XML
    //var l_xml = l_member_update_password_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_update_password/status").text);
    // Get response as a single string
    //alert(l_member_update_password_action.m_response_string);

	AccountUpdate(l_obj.m_status);
}

/*
// Create the request
l_member_update_password = new MetaWrap.XML.Action.WS.member_update_password
(

    'api_key',
    'api_member_token',
    'username',
    'password',
    'new_password'
);

// Create action
l_member_update_password_action = new MetaWrap.XML.Action(l_member_update_password,l_api_server + "/member_update_password.aspx");

// Call the action
if (!l_member_update_password_action.run(oncomplete_member_update_password))
{
    alert("There was an error calling 'member_update_password'");
}
*/

//
//
//
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_update_username
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_update_username = function(
	p_api_key,
	p_api_member_token,
	p_username,
	p_password,
	p_new_username)
{
    this.m_action = {};
    this.m_action.m_member_update_username =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token,
        m_username:p_username,
        m_password:p_password,
        m_new_username:p_new_username
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_update_username.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_update_username =
        {

        };
    return this;
}

// Reference to the request
var l_member_update_username = null;

// Reference to the action
var l_member_update_username_action = null;

// This is called on completion of a call to member_update_username
function oncomplete_member_update_username()
{
    //alert("oncomplete_member_update_username");


    // Get response as object
    var l_obj = l_member_update_username.m_response.m_member_update_username;
    //alert("'status' = " + l_obj.m_status);

	AccountUpdate(l_obj.m_status);

	//alert("done");

    // Get response as XML
    //var l_xml = l_member_update_username_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_update_username/status").text);

    // Get response as a single string
    //alert(l_member_update_username_action.m_response_string);
}



//
//
//
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_delete
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_delete = function(
	p_api_key,
	p_api_member_token)
{
    this.m_action = {};
    this.m_action.m_member_delete =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_delete.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_delete =
        {

        };
    return this;
}

// Reference to the request
var l_member_delete = null;

// Reference to the action
var l_member_delete_action = null;

// This is called on completion of a call to member_delete
function oncomplete_member_delete()
{
    //alert("oncomplete_member_delete");

    // Get response as object
    var l_obj = l_member_delete.m_response.m_member_delete;
    //alert("'status' = " + l_obj.m_status);

    // Get response as XML
    //var l_xml = l_member_delete_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_delete/status").text);

    // Get response as a single string
    //alert(l_member_delete_action.m_response_string);

	if (l_obj.m_status != "success")
	{
		alert("Something went wrong, we were unable to delete your account. Please try again later.");
	}
	else
	{
		doLogout();
	}
}

//
//
//
///////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_update_credentials
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_update_credentials = function(
	p_api_key,
	p_api_member_token,
	p_username,
	p_password,
	p_new_username,
	p_new_password)
{
    this.m_action = {};
    this.m_action.m_member_update_credentials =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token,
        m_username:p_username,
        m_password:p_password,
        m_new_username:p_new_username,
        m_new_password:p_new_password
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_update_credentials.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_update_credentials =
        {

        };
    return this;
}

// Reference to the request
var l_member_update_credentials = null;

// Reference to the action
var l_member_update_credentials_action = null;

// This is called on completion of a call to member_update_credentials
function oncomplete_member_update_credentials()
{
    //alert("oncomplete_member_update_credentials");


    // Get response as object
    var l_obj = l_member_update_credentials.m_response.m_member_update_credentials;
    //alert("'status' = " + l_obj.m_status);

    // Get response as XML
    //var l_xml = l_member_update_credentials_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_update_credentials/status").text);

    // Get response as a single string
    //alert(l_member_update_credentials_action.m_response_string);

	AccountUpdate(l_obj.m_status);



}


// This is called on completion of a call to member_update_credentials
function oncomplete_member_update_credentials_create()
{
    //alert("oncomplete_member_update_credentials");


    // Get response as object
    var l_obj = l_member_update_credentials.m_response.m_member_update_credentials;
    //alert("'status' = " + l_obj.m_status);

    // Get response as XML
    //var l_xml = l_member_update_credentials_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_update_credentials/status").text);

    // Get response as a single string
    //alert(l_member_update_credentials_action.m_response_string);

	//AccountUpdate(l_obj.m_status);

	
	if (l_obj.m_status == "success")
	{
		
		l_member_username = l_member_update_credentials.m_action.m_member_update_credentials.m_new_username;		
		
		//alert("l_member_username = " + l_member_username);
	
	
		MetaWrap.State.affirmState("application/loaded/loggedIn/accountCreated");
	}

}

//
//
//
///////////////////////////////////////////////////////////


function AccountUpdate(p_status)
{
	if (p_status != "success")
	{
		// the server has rejected our update
		MetaWrap.State.affirmState("application/loaded/loggedIn/updateRegistration/needCurrentPassword/currentPasswordRejected");
		//MetaWrap.State.negateState("application/loaded/loggedIn/updateRegistration/accountUpdated");
	}
	else
	{
		// the server has not rejected our update
		//MetaWrap.State.negateState("application/loaded/loggedIn/updateRegistration/needCurrentPassword/currentPasswordRejected");
		MetaWrap.State.affirmState("application/loaded/loggedIn/updateRegistration/accountUpdated");

		if (MetaWrap.$("UPDATEPASSWORDCURRENT") != null)
		{
			MetaWrap.$("UPDATEPASSWORDCURRENT").value = "";
		}

		if (MetaWrap.$("UPDATEPASSWORD") != null)
		{
			MetaWrap.$("UPDATEPASSWORD").value = "";
		}

		if (MetaWrap.$("UPDATEPASSWORDVERIFY") != null)
		{
			MetaWrap.$("UPDATEPASSWORDVERIFY").value = "";
		}

		// Our username is now what we sent to the server
		l_member_username = MetaWrap.$("UPDATEUSERNAME").value;

		// Failed experiment - can not work if we can't regenerate all the visible sub-views.
		//warn("before renderAspect");
		//MetaWrap.StateViewMap.m_page.teardownAspect("update_registration");
		//MetaWrap.StateViewMap.m_page.renderAspect("update_registration");
		//warn("after renderAspect");

	}

	//warn("before determineState ");
	MetaWrap.State.determineState();
	//warn("after determineState ");
}




///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_username_available
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_username_available = function(
	p_api_key,
	p_username)
{
    this.m_action = {};
    this.m_action.m_member_username_available =
    {
        m_api_key:p_api_key,
        m_username:p_username
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_username_available.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_username_available =
        {

            m_available:""
        };
    return this;
}

// Reference to the request
var l_member_username_available = null;

// Reference to the action
var l_member_username_available_action = null;

// This is called on completion of a call to member_username_available
function oncomplete_member_username_available()
{
    //alert("oncomplete_member_username_available");


    // Get response as object
    var l_obj = l_member_username_available.m_response.m_member_username_available;
    //alert("'status' = " + l_obj.m_status);
    //alert("'available' = " + l_obj.m_available);

    // Get response as XML
    var l_xml = l_member_username_available_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_username_available/status").text);
    //alert("'available' (from xml) = " +l_xml.selectSingleNode("response/member_username_available/available").text);

    // Get response as a single string
    //alert(l_member_username_available_action.m_response_string);

	l_checked_username = l_servercheck_username;
	l_user_name_available =  (l_obj.m_available == "true");
	l_user_name_check_cache[l_servercheck_username] = l_user_name_available;

	l_check_for_username_underway = false;

	MetaWrap.State.determineState();

}




//
//
//
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_login
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_login = function(
	p_api_key,
	p_username,
	p_password)
{
    this.m_action = {};
    this.m_action.m_member_login =
    {
        m_api_key:p_api_key,
        m_username:p_username,
        m_password:p_password
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_login.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_login =
        {

            m_username:"",
            m_api_member_token:"",
            m_url:""
        };
    return this;
}

// Reference to the request
var l_member_login = null;

// Reference to the action
var l_member_login_action = null;

// This is called on completion of a call to member_login
function oncomplete_member_login()
{
    //alert("oncomplete_member_login");


    // Get response as object
    var l_obj = l_member_login.m_response.m_member_login;
    //alert("'status' = " + l_obj.m_status);
    //alert("'username' = " + l_obj.m_username);
    //alert("'api_member_token' = " + l_obj.m_api_member_token);
    //alert("'url' = " + l_obj.m_url);

    // Get response as XML
    //var l_xml = l_member_login_action.m_response_xml;
    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_login/status").text);
    //alert("'username' (from xml) = " +l_xml.selectSingleNode("response/member_login/username").text);
    //alert("'api_member_token' (from xml) = " +l_xml.selectSingleNode("response/member_login/api_member_token").text);
    //alert("'url' (from xml) = " +l_xml.selectSingleNode("response/member_login/url").text);

    // Get response as a single string
    //alert(l_member_login_action.m_response_string);

	if (l_obj.m_status != "success")
	{
		
		//alert("failed to login");
		MetaWrap.State.affirmState("/application/loaded/registerOrLogin/loginFailed");
		
	}
	else
	{
	
		l_member_username = l_obj.m_username;
		MetaWrap.State.negateState("/application/loaded/registerOrLogin/loginFailed");
		MetaWrap.Cookie.Set(g_cookie_name,l_obj.m_api_member_token)
	}

	MetaWrap.State.determineState();

}


//
//
//
///////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////
//
// XML Action Interface Created for invite
//

MetaWrap.XML.Action.WS.invite = function(p_api_key,p_email)
{
		this.m_action = {};
		this.m_action.m_invite =
		{
			m_api_key:p_api_key,
			m_email:p_email
		};
}


MetaWrap.XML.Action.WS.invite.prototype.response = function()
{
		this.m_response = {};
		this.m_response.m_invite =
			{

			};
		return this;
}

var l_invite = null;
var l_invite_action = null;

//
//
//
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//
// XML Action Interface Created for api_member_token_request_query
//

// Create the webservice action request
MetaWrap.XML.Action.WS.api_member_token_request_query = function(
	p_api_key,
	p_code)
{
	this.m_action = {};
	this.m_action.m_api_member_token_request_query =
	{
		m_api_key:p_api_key,
		m_code:p_code
	};
}

// Create the webservice action response
MetaWrap.XML.Action.WS.api_member_token_request_query.prototype.response = function()
{
	this.m_response = {};
	this.m_response.m_api_member_token_request_query =
		{

			m_request:"",
			m_expiry_seconds:"",
			m_token:""
		};
	return this;
}

// Reference to the request
var l_api_member_token_request_query = null;

// Reference to the action
var l_api_member_token_request_query_action = null;

// This is called on completion of a call to api_member_token_request_query
function oncomplete_api_member_token_request_query()
{
	//alert("oncomplete_api_member_token_request_query");

	// Get response as object
	var l_obj = l_api_member_token_request_query.m_response.m_api_member_token_request_query;
	//alert("'status' = " + l_obj.m_status);
	//alert("'request' = " + l_obj.m_request);
	//alert("'expiry_seconds' = " + l_obj.m_expiry_seconds);
	//alert("'token' = " + l_obj.m_token);

	// Get response as XML
	//var l_xml = l_api_member_token_request_query_action.m_response_xml;
	//alert("'status' (from xml) = " + l_xml.selectSingleNode("response/api_member_token_request_query/status").text);
	//alert("'request' (from xml) = " +l_xml.selectSingleNode("response/api_member_token_request_query/request").text);
	//alert("'expiry_seconds' (from xml) = " +l_xml.selectSingleNode("response/api_member_token_request_query/expiry_seconds").text);
	//alert("'token' (from xml) = " +l_xml.selectSingleNode("response/api_member_token_request_query/token").text);

	// Get response as a single string
	//alert(l_api_member_token_request_query_action.m_response_string);


	// Has the request expired?
	if ((l_test_expired) || (l_obj.m_request == "expired"))
	{
		l_test_expired = false;

		//MetaWrap.State.negateState("waitingForSMS");
		MetaWrap.State.affirmState("/main/loaded/loggedOut/mobileLogin/waitingForSMSExpired");
	}
	else
	// If the request ready?
	if ((l_test_ready) || (l_obj.m_request == "ready"))
	{
		if (l_test_ready)
		{
			//alert("READY!");
			l_test_ready = false;
			//LoginMemberAndGetMemberInfo(l_api_member_token);
			MetaWrap.Cookie.Set(g_cookie_name,l_api_member_token);
			MetaWrap.State.determineState();
			return;
		}

		// Clear the test flag
		l_test_ready = false;

		// this is our token
		debug("token = " +  l_obj.m_token);

		// Get member details..


		MetaWrap.Cookie.Set(g_cookie_name,l_obj.m_token);
		MetaWrap.State.determineState();
	}
	//  Has there been an error?
	else
	if ((l_test_error) || (l_obj.m_status == "error") || (l_obj.m_request == "error") )
	{
		// Clear the test flag
		l_test_error = false;

		MetaWrap.State.affirmState("/main/loaded/loggedOut/mobileLogin/waitingForSMSError");
	}
	else
	// Are we still waiting?
	if (l_obj.m_request == "waiting")
	{
		// Try again in 10 seconds
		l_waiting_for_sms_request_query_timer = window.setTimeout(WaitingForSMSRequestTimer, 10000);
	}
	else
	{
		// Some state we were not expecting
		debug("status? = " +  l_obj.m_status);
		debug("token? = " +  l_obj.m_request);
	}


}

// Create the request
//l_api_member_token_request_query = new MetaWrap.XML.Action.WS.api_member_token_request_query
//(
//
//	'api_key',
//	'code'
//);

// Create action
//l_api_member_token_request_query_action = new MetaWrap.XML.Action(l_api_member_token_request_query,l_api_server + "/api_member_token_request_query.aspx");

// Call the action
//if (!l_api_member_token_request_query_action.run(oncomplete_api_member_token_request_query))
//{
//	alert("There was an error calling 'api_member_token_request_query'");
//}

//
//
//
///////////////////////////////////////////////////////////


	// This is called on completion of a call to api_member_token_request
	function oncomplete_api_member_token_request()
	{
		//alert("oncomplete_api_member_token_request 1");

		// Get response as object
		var l_obj = l_api_member_token_request.m_response.m_api_member_token_request;

		//alert("'status' = " + l_obj.m_status);
		//alert("'request' = " + l_obj.m_request);
		//debug("'expiry_seconds' = " + l_obj.m_expiry_seconds);
		//alert("'token' = " + l_obj.m_token);


		if (l_obj.m_status == "success")
		{
			// Get response as object
			var l_response = l_api_member_token_request.m_response.m_api_member_token_request;
			l_login_code = l_response.m_code;
			l_login_number = l_response.m_number;

			// now lets show the waiting aspect
			MetaWrap.State.affirmState("/main/loaded/loggedOut/mobileLogin/waitingForSMS");
		}
		else
		{
			debug("l_obj.m_status = " + l_obj.m_status);
			// start waiting for the SMS to be sent
			//l_waiting_for_sms_request_query_timer = window.setTimeout(WaitingForSMSRequestTimer, 10000);
		}
	}

//
//
//
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
//
// XML Action Interface Created for api_member_token_request
//

// Create the webservice action request
MetaWrap.XML.Action.WS.api_member_token_request = function(
	p_api_key)
{
	this.m_action = {};
	this.m_action.m_api_member_token_request =
	{
		m_api_key:p_api_key
	};
}

// Create the webservice action response
MetaWrap.XML.Action.WS.api_member_token_request.prototype.response = function()
{
	this.m_response = {};
	this.m_response.m_api_member_token_request =
		{

			m_code:"",
			m_number:""
		};
	return this;
}

// Reference to the request
var l_api_member_token_request = null;

// Reference to the action
var l_api_member_token_request_action = null;

//
//
//
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//
// XML Action Interface Created for campaign_get_summary
//

// Create the webservice action request
MetaWrap.XML.Action.WS.campaign_get_summary = function(
	p_api_key)
{
    this.m_action = {};
    this.m_action.m_campaign_get_summary =
    {
        m_api_key:p_api_key
    };
}


/*
MetaWrap.MediaStore.Campaign.Manufacturer.prototype.m_phones_create = function()
{
    var l_object = new MetaWrap.MediaStore.Campaign.Manufacturer.Phone();
    this.m_phones[this.m_phones.length] = l_object;
    return l_object;
}
*/


// Create the webservice action response
MetaWrap.XML.Action.WS.campaign_get_summary.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_campaign_get_summary =
        {

            m_name:"",
            m_description:"",
            m_apps:[],
			m_apps_create:function() {var l_obj = {} ; this.m_apps.push(l_obj); return l_obj;}
        };
    return this;
}

// Reference to the request
var l_campaign_get_summary = null;

// Reference to the action
var l_campaign_get_summary_action = null;

// This is called on completion of a call to campaign_get_summary
function oncomplete_campaign_get_summary()
{
    //alert("oncomplete_campaign_get_summary");

    // Get response as object
    //var l_obj = l_campaign_get_summary.m_response.m_campaign_get_summary;
    //alert("'status' = " + l_obj.m_status);
    //alert("'name' = " + l_obj.m_name);
    //alert("'description' = " + l_obj.m_description);
    //alert("'apps' = " + l_obj.m_apps);

    // Get response as XML
    //var l_xml = l_campaign_get_summary_action.m_response_xml;
	//alert("p_client.responseXML = " +l_xml.firstChild.nodeName);

	//alert(l_xml.firstChild.nodeName);

	//alert(MetaWrap.XML.Serialise(l_obj));

    //alert("'status' (from xml) = " + l_xml.selectSingleNode("response/campaign_get_summary/status").text);
    //alert("'name' (from xml) = " +l_xml.selectSingleNode("response/campaign_get_summary/name").text);
    //alert("'description' (from xml) = " +l_xml.selectSingleNode("response/campaign_get_summary/description").text);
    //alert("'apps' (from xml) = " +l_xml.selectSingleNode("response/campaign_get_summary/apps").text);

	//var l_applications = l_xml.selectNodes("response/campaign_get_summary/apps/app")

	//alert(l_campaign_get_summary_action.m_response_string);

	g_applications = l_campaign_get_summary.m_response.m_campaign_get_summary.m_apps;

	//for(var i = 0;i< l_applications.length;i++)
	//{
	//	g_applications[g_applications.length] = MetaWrap.XML.Deserialise(l_applications[i].xml,{});
	//}

	// If we no not of any application	
	if (g_application == null)
	{
		//alert("choose default application on load");
	
		// Choose the first
		g_application = g_applications[0];
	}	
	

	//alert("completed");

	l_loaded = true;
	l_loading = false;

	//MetaWrap.State.transitionStates("loading","main");
	MetaWrap.State.determineState();

	//MetaWrap.State.affirmState("main");
	//MetaWrap.State.negateState("loading");
}

//
//
//
///////////////////////////////////////////////////////////




// This is called on completion of a call to api_member_token_request_query
function oncomplete_api_member_token_request_query_application()
{
	//alert("oncomplete_api_member_token_request_query");

	// Get response as object
	var l_obj = l_api_member_token_request_query.m_response.m_api_member_token_request_query;
	//alert("'status' = " + l_obj.m_status);
	//alert("'request' = " + l_obj.m_request);
	//alert("'expiry_seconds' = " + l_obj.m_expiry_seconds);
	//alert("'token' = " + l_obj.m_token);

	// Get response as XML
	//var l_xml = l_api_member_token_request_query_action.m_response_xml;
	//alert("'status' (from xml) = " + l_xml.selectSingleNode("response/api_member_token_request_query/status").text);
	//alert("'request' (from xml) = " +l_xml.selectSingleNode("response/api_member_token_request_query/request").text);
	//alert("'expiry_seconds' (from xml) = " +l_xml.selectSingleNode("response/api_member_token_request_query/expiry_seconds").text);
	//alert("'token' (from xml) = " +l_xml.selectSingleNode("response/api_member_token_request_query/token").text);

	// Get response as a single string
	//alert(l_api_member_token_request_query_action.m_response_string);


	// Has the request expired?
	if ((l_test_expired) || (l_obj.m_request == "expired"))
	{
		l_test_expired = false;

		//MetaWrap.State.negateState("waitingForSMS");
		MetaWrap.State.affirmState("/application/loaded/registerOrLogin/mobileRegistration/waitingForSMSExpired");
	}
	else
	// If the request ready?
	if ((l_test_ready) || (l_obj.m_request == "ready"))
	{

		if (l_test_ready)
		{
			//alert("READY!");
			l_test_ready = false;
			//LoginMemberAndGetMemberInfo(l_api_member_token);
			MetaWrap.Cookie.Set(g_cookie_name,l_api_member_token);
			MetaWrap.State.determineState();
			return;
		}


		// Clear the test flag

		// this is our token
		debug("token = " +  l_obj.m_token);

		// Get member details..

		MetaWrap.Cookie.Set(g_cookie_name,l_obj.m_token);
		//LoginMemberAndGetMemberInfo(l_obj.m_token);
		MetaWrap.State.determineState();
	}
	//  Has there been an error?
	else
	if ((l_test_error) || (l_obj.m_status == "error") || (l_obj.m_request == "error") )
	{
		// Clear the test flag
		l_test_error = false;

		MetaWrap.State.affirmState("/application/loaded/registerOrLogin/mobileRegistration/waitingForSMSError");
	}
	else
	// Are we still waiting?
	if (l_obj.m_request == "waiting")
	{
		// Try again in 10 seconds
		l_waiting_for_sms_request_query_timer = window.setTimeout(WaitingForSMSRequestApplicationTimer, 10000);
	}
	else
	{
		// Some state we were not expecting
		debug("status? = " +  l_obj.m_status);
		debug("token? = " +  l_obj.m_request);
	}


}




///////////////////////////////////////////////////////////
//
// XML Action Interface Created for member_get_campaign_summary
//

// Create the webservice action request
MetaWrap.XML.Action.WS.member_get_campaign_summary = function(
	p_api_key,
	p_api_member_token)
{
    this.m_action = {};
    this.m_action.m_member_get_campaign_summary =
    {
        m_api_key:p_api_key,
        m_api_member_token:p_api_member_token
    };
}

// Create the webservice action response
MetaWrap.XML.Action.WS.member_get_campaign_summary.prototype.response = function()
{
    this.m_response = {};
    this.m_response.m_member_get_campaign_summary =
        {
            m_username:"",
            m_apps:[],
			m_apps_create:function() {var l_obj = {} ; this.m_apps.push(l_obj); return l_obj;}
        };
    return this;
}

// Reference to the request
var l_member_get_campaign_summary = null;

// Reference to the action
var l_member_get_campaign_summary_action = null;

// This is called on completion of a call to member_get_campaign_summary
function oncomplete_member_get_campaign_summary()
{
    //alert("oncomplete_member_get_campaign_summary");

    // Get response as object
    var l_obj = l_member_get_campaign_summary.m_response.m_member_get_campaign_summary;
    //alert("'status' = " + l_obj.m_status);
    //alert("'username' = " + l_obj.m_username);
	
	if (l_obj.m_status == 'success')
	{
		l_member_username = l_obj.m_username;

		//fatal("oncomplete_member_get_campaign_summary " + l_member_username);

		// Get response as XML
		//var l_xml = l_member_get_campaign_summary_action.m_response_xml;
		//alert("'status' (from xml) = " + l_xml.selectSingleNode("response/member_get_campaign_summary/status").text);
		//alert("'encrypted' (from xml) = " +l_xml.selectSingleNode("response/member_get_campaign_summary/encrypted").text);

		// Get response as a single string
		//alert("hello? "  + l_member_get_campaign_summary_action.m_response_string);

		//var l_member_applications = l_xml.selectNodes("response/member_get_campaign_summary/apps/app")

		//alert("OI!" + l_member_get_campaign_summary_action.m_response_string);

		//g_member_applications = [];

		//alert(MetaWrap.XML.Serialise(l_obj));

		g_member_applications = l_obj.m_apps;

		//alert(" g_member_applications.length = " + g_member_applications.length);

		// If we no not of any application	
		if (g_application == null)
		{
			//trace("choose default application");
		
			// Choose the first
			g_application = g_applications[0];
		}
		
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
		
		


		// Whatever state made this view possible, affirm the named state
		MetaWrap.StateViewMap.affirmActiveViewState("loaded/loggedIn/memberSummaryLoaded");

		//debugger;

		// work out what state we are in now..
		MetaWrap.State.determineState();
	}
	else
	{
		//alert("OI!" + l_member_get_campaign_summary_action.m_response_string);
		//alert("OI!" + l_obj.m_errorMessage);
		
		if (l_obj.m_errorMessage != null)
		{
			if (l_obj.m_errorMessage.indexOf("Invalid API MemberToken") == 0);
			{
				//alert("FAIL!");
				doLogout();
			}
		}
	}
}

