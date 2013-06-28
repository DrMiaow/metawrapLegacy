
	    // Now add this to the global object model, and we are clear to go
   	    // The current state
   	    var l_state = MetaWrap.State.m_state;  
		
	    // Create a new array of states

		
		    // All the immediate substates are mutually exclusive
		    l_state.m_substates_mutex = true;
   		    		    
	    // state... loading
	    l_state = new MetaWrap.State.State("loading",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		
  		    //alert("JS transition enter S'" + l_state.m_name + " = isLoading()");	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return isLoading();
		    }	
		    // 'enter' transition code end	    
		    );
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... application
	    l_state = new MetaWrap.State.State("application",l_state,"false")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // actives a set of conditions to be true	    
		l_state.m_inclusions[l_state.m_inclusions.length] = function()
		{
			var l_s = this.m_parent.findState("");			
			if (l_s == null)
			{
				alert("'include' could not find state " + "");
				return false;
			}			
			return (l_s.m_activated == true);
		}
	
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		    		    
	    // state... registerOrLogin
	    l_state = new MetaWrap.State.State("registerOrLogin",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return !isLoggedIn();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		    		    
	    // state... loggingIn
	    l_state = new MetaWrap.State.State("loggingIn",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... readyToLogin
	    l_state = new MetaWrap.State.State("readyToLogin",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return isReadyToLogin();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... mobileRegistration
	    l_state = new MetaWrap.State.State("mobileRegistration",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // We want to activate a state when we enter a state
		
			l_state.m_activations["generatingCode"] = true;
   		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "loggingIn";
	
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		
		    // All the immediate substates are mutually exclusive
		    l_state.m_substates_mutex = true;
   		    		    
	    // state... generatingCode
	    l_state = new MetaWrap.State.State("generatingCode",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		
  		    //alert("JS transition enter S'" + l_state.m_name + " = doRegistrationGenerateCode()");	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return doRegistrationGenerateCode();
		    }	
		    // 'enter' transition code end	    
		    );
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... generatingCodeError
	    l_state = new MetaWrap.State.State("generatingCodeError",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... waitingForSMS
	    l_state = new MetaWrap.State.State("waitingForSMS",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... waitingForSMSExpired
	    l_state = new MetaWrap.State.State("waitingForSMSExpired",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... waitingForSMSError
	    l_state = new MetaWrap.State.State("waitingForSMSError",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... loggedInApp
	    l_state = new MetaWrap.State.State("loggedInApp",l_state,"false")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return isLoggedIn();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		
  		    //alert("JS transition enter S'" + l_state.m_name + " = loadMemberDetails()");	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return loadMemberDetails();
		    }	
		    // 'enter' transition code end	    
		    );
   		
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		    		    
	    // state... completeRegistration
	    l_state = new MetaWrap.State.State("completeRegistration",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return !isMemberAccountComplete();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... updateRegistration
	    l_state = new MetaWrap.State.State("updateRegistration",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return isMemberAccountComplete();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... subscribeToApplication
	    l_state = new MetaWrap.State.State("subscribeToApplication",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return !hasMemberSubscribedToApp();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... updateApplicationSubscription
	    l_state = new MetaWrap.State.State("updateApplicationSubscription",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return hasMemberSubscribedToApp();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... main
	    l_state = new MetaWrap.State.State("main",l_state,"false")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		    		    
	    // state... loggedOut
	    l_state = new MetaWrap.State.State("loggedOut",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return !isLoggedIn();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		    
	    // We want to activate a state when we enter a state
		
			l_state.m_activations["normalLogin"] = true;
   		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "loggedIn";
	
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		    		    
	    // state... waiting
	    l_state = new MetaWrap.State.State("waiting",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "joining";
	
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... joining
	    l_state = new MetaWrap.State.State("joining",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "waiting";
	
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... inviteReady
	    l_state = new MetaWrap.State.State("inviteReady",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return isInviteReady();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... readyToLogin
	    l_state = new MetaWrap.State.State("readyToLogin",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	
		// Look for optional attribute with JavaScript Code
		
		    // condition start
		    l_state.m_active[l_state.m_active.length] = function()
		    {
		    	return isReadyToLogin();
		    }
		    // condition end
   		

		// if there is a condition attribute then execute the code
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... inviteSent
	    l_state = new MetaWrap.State.State("inviteSent",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... inviteError
	    l_state = new MetaWrap.State.State("inviteError",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... normalLogin
	    l_state = new MetaWrap.State.State("normalLogin",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "mobileLogin";
	
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... mobileLogin
	    l_state = new MetaWrap.State.State("mobileLogin",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // We want to activate a state when we enter a state
		
			l_state.m_activations["generatingCode"] = true;
   		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "normalLogin";
	
   	    
   	    // do all the states that this state contains
   	    
	    // Create a new array of states

		
		    // All the immediate substates are mutually exclusive
		    l_state.m_substates_mutex = true;
   		    		    
	    // state... generatingCode
	    l_state = new MetaWrap.State.State("generatingCode",l_state,"true")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		
  		    //alert("JS transition enter S'" + l_state.m_name + " = doGenerateCode()");	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return doGenerateCode();
		    }	
		    // 'enter' transition code end	    
		    );
   		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... generatingCodeError
	    l_state = new MetaWrap.State.State("generatingCodeError",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... waitingForSMS
	    l_state = new MetaWrap.State.State("waitingForSMS",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... waitingForSMSExpired
	    l_state = new MetaWrap.State.State("waitingForSMSExpired",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... waitingForSMSError
	    l_state = new MetaWrap.State.State("waitingForSMSError",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... loggedIn
	    l_state = new MetaWrap.State.State("loggedIn",l_state,"")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		    
	    // This is the code to be executed when we transition entering a state

		// Look for optional 'call' attribute with JavaScript Code
		
  		    //alert("JS transition enter S'" + l_state.m_name + " = loadMemberDetails()");	    
			l_state.m_transitions.add_enter(l_state.m_name,
		    // 'enter' transition code start
			function()
		    {
		    	return loadMemberDetails();
		    }	
		    // 'enter' transition code end	    
		    );
   		    
	    // actives a set of conditions to be true	    
		l_state.m_negations[l_state.m_negations.length] = "loggedOut";
	    
	    // actives a set of conditions to be true	    
		l_state.m_exclusions[l_state.m_exclusions.length] = function()
		{
			var l_s = this.m_parent.findState("loggedOut");			
			if (l_s == null)
			{
				alert("'exclude' could not find state " + "loggedOut");
				return false;
			}			
			return (l_s.m_activated == false);
		}
	
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	    		    
	    // state... api
	    l_state = new MetaWrap.State.State("api",l_state,"false")

		// Add the state to its parents collection
	    l_state.m_parent.m_states[l_state.m_name] = l_state;

		
   	    
   	    // do all the states that this state contains
   	    

		// foro convenience - allow the state to be not in states element - its easy to forget
		
   	    
   	    // Restore to our original parent.
   	    l_state = l_state.m_parent;
	