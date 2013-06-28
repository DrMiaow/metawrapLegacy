//
// Declare the 'Social' service
//

MetaWrap.API.Services.prototype.Social = function() 
{	
	// Need this for closure
	var module = this;
	
	// Record the name and version number
	this.Service = "Admin";
	this.Version = "V1.1";
	
	// Create our actions
	var actions = 
	{	
			// Declare the action method
			invite : function()
			{								
				// Construct the action
				var l_action = new MetaWrap.API.Services.Action(module,"invite",["key","email"]);
				
				// Add the 'key' parameter handler
				l_action.key = function(p_value) { return this.processParameter("key",p_value,true);}
				
				// Add the 'email' parameter handler
				l_action.email = function(p_value) { return this.processParameter("email",p_value,true);  }

				// Return an object
				return l_action;
			}
	};
	
	// Return our actions
	return actions;
};	