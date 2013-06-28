
	    // Create a new array of states
		MetaWrap.StateViewMap.m_state_view_maps = [];
		var l_stateviewmap = null;
	        		    
		// state... main/loggedIn	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedIn"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedIn");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedIn"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedIn"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["loggedin"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("loggedin");

		    		    
		// state... main/loggedOut	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["loggedout"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("loggedout");

		    		    
		// state... main/loggedOut	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["applications"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("applications");

					
			//alert("event = main/loggedOut.onshow");				
			MetaWrap.View.addAspectEvent("main/loggedOut.onstate","applications",function() 
				{ 
					onShow_renderApplications()
				});
				
   		    		    
		// state... main/loggedIn	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedIn"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedIn");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedIn"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedIn"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["applications"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("applications");

					
			//alert("event = main/loggedIn.onshow");				
			MetaWrap.View.addAspectEvent("main/loggedIn.onstate","applications",function() 
				{ 
					onShow_renderApplications()
				});
				
   		    		    
		// state... main/loggedOut/joining	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/joining"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/joining");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/joining"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/joining"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["joining"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("joining");

		    		    
		// state... main/loggedOut/inviteReady	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteReady"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/inviteReady");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteReady"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteReady"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["invite_ready"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("invite_ready");

		    		    
		// state... main/loggedOut/inviteSent	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteSent"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/inviteSent");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteSent"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteSent"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["invite_sent"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("invite_sent");

		    		    
		// state... main/loggedOut/inviteError	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteError"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/inviteError");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteError"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/inviteError"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["invite_error"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("invite_error");

		    		    
		// state... main/loggedOut/readyToLogin	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/readyToLogin"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/readyToLogin");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/readyToLogin"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/readyToLogin"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["loginbutton"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("loginbutton");

		    		    
		// state... main/loggedOut/normalLogin	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/normalLogin"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/normalLogin");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/normalLogin"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/normalLogin"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["normal_login"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("normal_login");

		    		    
		// state... main/loggedOut/mobileLogin	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/mobileLogin");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["mobile_login"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("mobile_login");

		    		    
		// state... main/loggedOut/mobileLogin/generatingCode	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/generatingCode"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/mobileLogin/generatingCode");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/generatingCode"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/generatingCode"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["generating_code"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("generating_code");

		    		    
		// state... main/loggedOut/mobileLogin/generatingCodeError	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/generatingCodeError"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/mobileLogin/generatingCodeError");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/generatingCodeError"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/generatingCodeError"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["generating_code_error"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("generating_code_error");

		    		    
		// state... main/loggedOut/mobileLogin/waitingForSMS	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMS"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/mobileLogin/waitingForSMS");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMS"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMS"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["waiting_for_sms"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("waiting_for_sms");

					
			//alert("event = main/loggedOut/mobileLogin/waitingForSMS.onshow");				
			MetaWrap.View.addAspectEvent("main/loggedOut/mobileLogin/waitingForSMS.onshow","waiting_for_sms",function() 
				{ 
					onShow_waitingForSMS()
				});
				
   		    		    
		// state... main/loggedOut/mobileLogin/waitingForSMSError	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMSError"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/mobileLogin/waitingForSMSError");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMSError"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMSError"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["waiting_for_sms_error"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("waiting_for_sms_error");

		    		    
		// state... main/loggedOut/mobileLogin/waitingForSMSExpired	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMSExpired"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main/loggedOut/mobileLogin/waitingForSMSExpired");
		
			MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMSExpired"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main/loggedOut/mobileLogin/waitingForSMSExpired"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["waiting_for_sms_expired"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("waiting_for_sms_expired");

		    		    
		// state... application	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application");
		
			MetaWrap.StateViewMap.m_state_view_maps["application"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application"];
		}

		// do all the states that this state implies
		    
		l_stateviewmap.m_page = new MetaWrap.StateViewMap.StateViewMap.Page("application");
	

		// do all the aspects that this state implies
		    		    
		// state... application/registerOrLogin	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["registerOrLogin"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("registerOrLogin");

		    		    
		// state... application/loggedInApp	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/loggedInApp");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["logged_in"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("logged_in");

		    		    
		// state... application/loggedInApp/completeRegistration	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/completeRegistration"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/loggedInApp/completeRegistration");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/completeRegistration"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/completeRegistration"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["complete_registration"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("complete_registration");

		    		    
		// state... application/loggedInApp/updateRegistration	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/updateRegistration"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/loggedInApp/updateRegistration");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/updateRegistration"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/updateRegistration"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["update_registration"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("update_registration");

		    		    
		// state... application/loggedInApp/subscribeToApplication	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/subscribeToApplication"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/loggedInApp/subscribeToApplication");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/subscribeToApplication"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/subscribeToApplication"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["subscribe_to_application"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("subscribe_to_application");

		    		    
		// state... application/loggedInApp/updateApplicationSubscription	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/updateApplicationSubscription"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/loggedInApp/updateApplicationSubscription");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/updateApplicationSubscription"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/loggedInApp/updateApplicationSubscription"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["update_application_subscription"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("update_application_subscription");

		    		    
		// state... application/registerOrLogin/loggingIn	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/loggingIn"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/loggingIn");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/loggingIn"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/loggingIn"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["normal_login"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("normal_login");

		    		    
		// state... application/registerOrLogin/readyToLogin	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/readyToLogin"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/readyToLogin");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/readyToLogin"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/readyToLogin"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["login_button"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("login_button");

		    		    
		// state... application/subscribeToApplication	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/subscribeToApplication"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/subscribeToApplication");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/subscribeToApplication"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/subscribeToApplication"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["subscribeToApplication"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("subscribeToApplication");

		    		    
		// state... application/registerOrLogin/mobileRegistration	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/mobileRegistration");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["mobile_login"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("mobile_login");

		    		    
		// state... application/registerOrLogin/mobileRegistration/generatingCode	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/generatingCode"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/mobileRegistration/generatingCode");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/generatingCode"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/generatingCode"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["generating_code"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("generating_code");

		    		    
		// state... application/registerOrLogin/mobileRegistration/generatingCodeError	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/generatingCodeError"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/mobileRegistration/generatingCodeError");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/generatingCodeError"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/generatingCodeError"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["generating_code_error"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("generating_code_error");

		    		    
		// state... application/registerOrLogin/mobileRegistration/waitingForSMS	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMS"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/mobileRegistration/waitingForSMS");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMS"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMS"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["waiting_for_sms"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("waiting_for_sms");

					
			//alert("event = application/registerOrLogin/mobileRegistration/waitingForSMS.onshow");				
			MetaWrap.View.addAspectEvent("application/registerOrLogin/mobileRegistration/waitingForSMS.onshow","waiting_for_sms",function() 
				{ 
					onShow_waitingForSMSApplication()
				});
				
   		    		    
		// state... application/registerOrLogin/mobileRegistration/waitingForSMSError	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMSError"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/mobileRegistration/waitingForSMSError");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMSError"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMSError"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["waiting_for_sms_error"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("waiting_for_sms_error");

		    		    
		// state... application/registerOrLogin/mobileRegistration/waitingForSMSExpired	    


		if (MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMSExpired"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("application/registerOrLogin/mobileRegistration/waitingForSMSExpired");
		
			MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMSExpired"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["application/registerOrLogin/mobileRegistration/waitingForSMSExpired"];
		}

		// do all the states that this state implies
		

		// do all the aspects that this state implies
		    
		l_stateviewmap.m_aspects["waiting_for_sms_expired"] = new MetaWrap.StateViewMap.StateViewMap.Aspect("waiting_for_sms_expired");

		    		    
		// state... main	    


		if (MetaWrap.StateViewMap.m_state_view_maps["main"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("main");
		
			MetaWrap.StateViewMap.m_state_view_maps["main"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["main"];
		}

		// do all the states that this state implies
		    
		l_stateviewmap.m_page = new MetaWrap.StateViewMap.StateViewMap.Page("twitter");
	

		// do all the aspects that this state implies
		    		    
		// state... api	    


		if (MetaWrap.StateViewMap.m_state_view_maps["api"] == null)
		{
			// Create the StateViewMap for this state
			l_stateviewmap = new MetaWrap.StateViewMap.StateViewMap("api");
		
			MetaWrap.StateViewMap.m_state_view_maps["api"] = l_stateviewmap;
		}
		else
		{
			l_stateviewmap = MetaWrap.StateViewMap.m_state_view_maps["api"];
		}

		// do all the states that this state implies
		    
		l_stateviewmap.m_page = new MetaWrap.StateViewMap.StateViewMap.Page("api");
	

		// do all the aspects that this state implies
				
		//debugger;   	    
	