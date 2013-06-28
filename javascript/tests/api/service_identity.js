//
// Declare the Identity service
//

			
MetaWrap.API.Services.prototype.Identity = function() 
{	
	// Need this for closure
	var module = this;
	
	// Record the name and version number
	this.Service = "Identity";
	this.Version = "V1.1";
	
	// Create our actions
	var actions = 
	{	
			// Declare the action method
			identity_request : function()
			{								
				// Construct the action
				var l_action = new MetaWrap.API.Services.Action(module,"identity_request",["key","identity_type"]);
				
				// Add the 'key' parameter handler
				l_action.key = function(p_value) { return this.processParameter("key",p_value,true);  }
				
				// Add the 'identity_type' parameter handler
				l_action.identity_type = function(p_value) { return this.processParameter("identity_type",p_value,true); }

				return l_action;
			}
	};
	
	// Return our actions
	return actions;
};

