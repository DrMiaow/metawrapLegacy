var Navigation = (function(){

	var apiNav;

	function setSubNavigation(){
		var subNavs = $('[data-role="sub-nav"]');

		subNavs.each(function(){
			var pos = $(this).attr("data-position");

			var listItem = apiNav.find('> li:not(.nav-header)').eq(pos-1);

			$(this).appendTo(listItem);
		});

	}

	function setNavPosition(){
		var nav = $('[data-role="api-navigation"]');
		var navHeight = nav.height();
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var headerHeight = 173;
		var footerHeight = 100;

		if (((windowHeight-navHeight-headerHeight-footerHeight)>0 && windowWidth > 767) && ($(document).scrollTop() > 193) ) {
			nav.css({'position':'fixed','top':'20px'});
		} else {
			nav.css({'position':'static'});
		}

	}

	$(function(){
		apiNav = $('[data-role="api-nav"]')

		setSubNavigation();
		setNavPosition();

		$(window).scroll(function(){
			setNavPosition();
		})

		$(window).resize(function() {
			setNavPosition();
		});

	});

	return {

	}

})();

var Global = (function(){

	function setInlineScroll(){
		var hash = window.location.hash;
		var topMarge = -20;

		if(hash){
			var $targetAnchor = $('[id=' + hash.slice(1) +']');
      var targetOffset = $targetAnchor.offset().top-topMarge;

      $('html, body').animate({ scrollTop: targetOffset}, 1);

		}

		$('a[href*=#]').live("click", function(){

        var $targetId = $(this.hash), $targetAnchor = $('[id=' + this.hash.slice(1) +']');
        var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

        // if anchor exists, scroll to anchor
        if ($target) {
            var targetOffset = $target.offset().top-topMarge;

            $('html, body').animate( {scrollTop: targetOffset}, 300);
        }
    });
	}

	function replaceTabs() {
		// replace tabs with 4 spaces (instead of 8)
		$('pre').html(function() {
		    return this.innerHTML.replace(/\t/g, '    ');
		});
	}

	function setExternalLinks(){
		$("a[href^=http]").each(function(){
			if(this.href.indexOf(location.hostname) == -1) {
				$(this).attr({target: "_blank"});
			}
		});
	}

	$(function(){
		setInlineScroll();
		replaceTabs();
		setExternalLinks();
	});

	$(window).load(function(){
		setInlineScroll(); /* do function again, because of issues with images not loaded */
	});

	return {

	}

})();


var checkConditionsOfUse = (function(){

	function checkIsAccepted(){
		var cookies = $.cookie('conditionsOfUse');

		// if you are on conditions of use  page
		if((window.location.href.indexOf('conditions') > -1) ){

			// if there is no cookie yet, add an accept-conditions form
			if (cookies == null){
				$('[data-role="main-content"]')
					.append('<form data-role="form-accept"><div class="well well-large"><p class="validation-error" data-role="validation-error"></p><label class="checkbox"><input type="checkbox" id="AcceptConditions">I accept and understand the conditions of use for the api API.</label></div><button class="btn btn-primary" data-role="accept-terms">Continue</button></form>')
					.prepend('<div class="alert alert-block" data-role="conditions-alert"><h4 style="padding-top: 0">Almost ready to start</h4>Please make sure you are aware of the conditions of use for the api API.</div>');
			}

		// else if you are on every page, except the index page AND no cookie yet
		} else if (cookies == null && !(window.location.pathname.indexOf("index") > -1 ) && !(window.location.pathname == '/')  ){

			// create cookie with the current path
			$.cookie('originPath', window.location.href, { expires: 1, path: '/' });

			// redirect to conditions of use page
			//window.location.replace("http://" + window.location.host + "/conditionsofuse.html");
			window.location.replace("./conditionsofuse.html");
		}
	}

	function sendForm(){
		$('[data-role="accept-terms"]').live("click",function(ev){
			ev.preventDefault();

			var originPath = $.cookie('originPath');

			// if conditions are accepted, set cookie and go to originpath (if available)
			if($('#AcceptConditions').is(':checked') ){
				$.cookie('conditionsOfUse', 'accepted', { expires: 365, path: '/' });

				// if the user came from another page, continue to that page
				if(originPath != null ) {
					$.removeCookie('originPath');
					window.location.replace(originPath)
				} else {
					$('[data-role="form-accept"]').remove();
					$('[data-role="conditions-alert"]').remove();
				}

			} else {
				$('[data-role="validation-error"]').text('Please accept the conditions of use before you can make use of the api API');
			}
		});
	}

	$(function(){

		var isGoogle = navigator.userAgent.toLowerCase().indexOf('googlebot') > 0;

		if (!isGoogle){
			checkIsAccepted();
			sendForm();
		}

	});

})();
