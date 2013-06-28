
//
//  File:       application.js
//
//  Synopsis:   Main entry point for application
//
//----------------------------------------------------------------------------

// Set up our namespace
var iLike = new Object();

// Global app object
theApp = null;


//
// Cross-browser solution for triggering init after the page loads but before
// external resources (e.g. images) are loaded.  From http://dean.edwards.name/weblog/2006/06/again/.
//
function init() {
  // Quit if this function has already been called
  if (arguments.callee.done)
    return;
  
  // Flag this function so we don't do the same thing twice
  arguments.callee.done = true;
  
  // kill the timer
  if (_timer)
  {
    clearInterval(_timer);
    _timer = null;
  }

  // Create the app and get things rolling
  theApp = new iLike.App();
};

/* For Mozilla */
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", init, false);
}

/* For Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
  document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
  var script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      init(); // call the onload handler
    }
  };
/*@end @*/

/* For Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      init(); // call the onload handler
    }
  }, 10);
}

function window_onload()
{
  if (theApp)
    theApp.debugTimer.log("window.onload");
    
  init();
}

/* For other browsers */
window.onload = window_onload;


//----------------------------------------------------------------------------
//
// iLike.App class
//
//----------------------------------------------------------------------------

iLike.App = Class.create();

iLike.App.prototype = {

  // Initialize  
  initialize: function() {
    // Member variables
    this.debugTimer = new iLike.DebugTimer();
    this.lastOpenSongExpando = null;
    this.lastOpenCalendarDay = null;
    this.lastOpenContactImporterExpando = null;
    this.lastOpenFeedExpando = null;
    this.lastOpenMessageReplyExpando = null;
    this.nameThatTune = null;
    this.artistOnTour = null;
    this.data = (typeof(g_data) != "undefined") ? g_data : null;
    this.baseUrl = (typeof(g_baseUrl) != "undefined") ? g_baseUrl : "/";
    this.facebookBaseUrl = (typeof(g_facebookBaseUrl) != "undefined") ? g_facebookBaseUrl : "/";

    // Set up the theApp global so that it's available to any classes that get
    // created in the initialize
    theApp = this;

    this.debugTimer.log("initialize javascript app");

    // Hook up debug DIV when ctrl-clicking anywhere on the page
    if ($('debug'))
    {
      this.debugTimer.log("-- create DebugDiv class");
      new iLike.DebugDiv();
      this.debugTimer.end("-- create DebugDiv class");

      if (typeof(is_Flash) != "undefined")
      {
        $("debug_flash_detection").innerHTML = "flash? <b>" + is_Flash + "</b><br/>";
        $("debug_flash_detection").innerHTML += "version: <b>" + is_FlashVersion['major'] + "." + is_FlashVersion['minor'] + "." + is_FlashVersion['rev'] + "</b>";
      }
    }
    if ($('network_overlay'))
    {
      this.debugTimer.log("-- create NetworkOverlay class");
      new iLike.NetworkOverlay();
      this.debugTimer.end("-- create NetworkOverlay class");
    }

    // Hook up login link to open the login dialog
    if ($('login_link'))
    {
      this.debugTimer.log("-- create LoginDialog class");
      new iLike.LoginDialog();
      this.debugTimer.end("-- create LoginDialog class");
    }
    
    if ($('toggle_bio_link'))
    {
      this.debugTimer.log("-- create ArtistBio class");
      new iLike.ArtistBio();      
      this.debugTimer.end("-- create ArtistBio class");
    }   

    if ($('about_me_more'))
    {
      new iLike.MoreAboutMe();
    }

    // Hook up song expandos and inline players
    if (this.data && this.data.songs)
      this.createObjectsFromData(iLike.SongExpando, this.data.songs, "iLike.SongExpando");

    // Hook up feed expandos
    if (this.data && this.data.feed)
      this.createObjectsFromData(iLike.FeedExpando, this.data.feed, "iLike.FeedExpando");

    // Hook calendar events
    if (this.data && this.data.gigs)
      this.createObjectsFromData(iLike.CalendarEvent, this.data.gigs, "iLike.CalendarEvent");

    if (this.data && this.data.async_feed_view)
      new iLike.AsyncFeed(this.data);     

    this.debugTimer.log("-- create Quiz class");
    if ($('quiz'))
    {
      new iLike.Quiz();
    }
    this.debugTimer.end("-- create Quiz class");

    // Set focus on account page (login dialog handles focus itself)
    if ($('login_password') && !$('login_dialog'))
    {
      this.debugTimer.log("-- create SetLoginFocus");
      function setFocus()
      {
        if ($('login_email').value == "")
          $('login_email').focus();
        else
          $('login_password').focus();
      }
      setTimeout(setFocus, 1);
      this.debugTimer.end("-- create SetLoginFocus");
    }

    // Hook up contact importer buttons
    if (this.data && this.data.contact_importers)
    {
      this.debugTimer.log("-- create ContactImporter class");
      for (var i = 0; i < this.data.contact_importers.length; i++)
        new iLike.ContactImporter(this.data.contact_importers[i].id, this.data.contact_importers[i].p);

      // Hook up manual email box and invite link
      if ($("invite_manually"))
        new iLike.InviteManually();

      if ($("invite_via_link"))
        new iLike.InviteViaLink();
      this.debugTimer.end("-- create ContactImporter class");
    }

    if ($('play_all'))
    {
  new iLike.Playall('play_all');
    }

    // Hook up results page of contact importer for async lookup
    this.debugTimer.log("-- create a bunch of other classes");
    if ($('choose_contact_list'))
      new iLike.ContactImporterResults();

    // Hook up download button
    if ($('download_now_form_1') || $('download_now_form_2'))
      new iLike.DownloadNow();

    // Hook up music profile spinner
    if ($('creating_profile_spinner'))
      new iLike.CreatingProfile();    

    // Hook up invite contact list
    if ($('choose_contacts'))
      new iLike.ChooseContacts('choose_contact_list');

    // Hook up choose friends list for recommendations
    if ($('choose_friends'))
      new iLike.ChooseContacts('choose_friends_list');

    // Hook up edit photo button
    if ($('edit_photo'))
      new iLike.EditPhoto();

    // Hook up edit profile
    if ($('edit_profile'))
      new iLike.EditProfile();
      
    // Hook up user location form fields
    if ($('user_location_fields'))
      new iLike.UserLocationFields();

    // Hook up user menu
    if ($('user_menu'))
      new iLike.UserMenu();

    // Hook up tour pages
    if ($('tour'))
      new iLike.Tour();

    // Hook up add comment edit box
    if ($('add_comment'))
      new iLike.AddComment();

    // Hook up send user message
    if ($('send_user_message'))
      new iLike.SendUserMessage();
      
    if ($('special_sortable'))
      new iLike.SortableManager(this.data.special_count, this.data.max_special_count, this.data.special_order, this.data.special_items, this.data.special_type);

    // Hook up iLike artist buttons
    if ($('artist_add') && $('artist_remove'))
      new iLike.ArtistFanButton();    
    this.debugTimer.end("-- create a bunch of other classes");
    
    // Hook up inbox messages (reply, delete, etc)
    if (this.data && this.data.inbox_messages)
      this.createObjectsFromData(iLike.InboxMessage, this.data.inbox_messages, "iLike.InboxMessage");

    if (this.data && this.data.playlist_nav)
      this.createObjectsFromData(iLike.PlaylistNav, this.data.playlist_nav, "iLike.PlaylistNav");

    if (this.data && this.data.paginator)
      this.createObjectsFromData(iLike.Paginator, this.data.paginator, "iLike.Paginator");   

    // hook up "MyPicks" delete
    if (this.data && this.data.my_picks)
    {
      this.debugTimer.log("-- create MyPick class");
      for(var i = 0; i < this.data.my_picks.length; i++)
        new iLike.MyPick(this.data.my_picks[i]);
      this.debugTimer.end("-- create MyPick class");
    }

    // Hook up hide_artist tabs
    if ($('hide_artists'))
      new iLike.HideArtists();

    // Hook up artist song upload
    if ($('artist_song_upload'))
      new iLike.ArtistSongUpload();

    if ($('artist_concert_upload'))
      this.artistConcertUpload = new iLike.ArtistConcertUpload();

    if ($('fb_invite_replace'))
      new iLike.FacebookInviter();

    // Hook up hide all playlists checkbox
    if ($('hide_all_playlists'))
      new iLike.HideAllPlaylists();

    if ($('new_features_banner'))
      new iLike.NewFeaturesBanner();

    // Hook up user compat
    if (this.data && this.data.compat)
    {
      new iLike.UserCompat(this.data.compat)
    }

    if (this.data && this.data.playlists)
    {
      this.createObjectsFromData(iLike.PlaylistExpando, this.data.playlists, "iLike.PlaylistExpando");   
    }
    
    // Hook up auto-embed to myspace button
    if ($('add_to_myspace_btn'))
      new iLike.AddToMySpace();
      
    // Hook up delete account page
    if ($('delete_account'))
      new iLike.DeleteAccount();
      
     // Hook up account settings page
    if ($('profile_visibility'))
      new iLike.ProfileVisibility();

    // Hook up artist On Tour page
    if ($('artist_events'))
     this.artistOnTour =  new iLike.AristOnTour();

    // Hook up people search default text
    if ($('people_search_form'))
      new iLike.TextboxDefaultText('people_qp', 'Enter a name or email address here', true, 'people_search_form', 'Please enter a name or email address.');

    // Hook up artist search default text
    if ($('artist_search_form'))    
      new iLike.TextboxDefaultText('artist_qp', 'Enter an artist or song name here', true, 'artist_search_form', 'Please enter an artist or song name.');
      
    // Hook up Name that tune
    if ($('name_that_tune') && this.data && this.data.quiz_track)
      this.nameThatTune = new iLike.NameThatTune();

    // Hook up icast
    if (this.data && this.data.icast_posts_inline)
      this.createObjectsFromData(iLike.iCastPostInline, this.data.icast_posts_inline, "iLike.iCastPostInline");

    this.debugTimer.end("initialize javascript app");
  },

  createObjectsFromData: function(c, list, name) {
    this.debugTimer.log("-- create " + list.length + " instances of " + name);

    // Create a simulated hash table of instances for fast lookups
    if (!c.hash)
      c.hash = new Array;

    if (!c.arr)
      c.arr = new Array;

    // Create instances of the specified class for each item in the list.  Items must have an id.
    for (var i = 0; i < list.length; i++)
    {
      var o = new c(list[i].id, list[i].tag);
      c.arr.push(o);
      c.hash[list[i].id] = o;
    }

    // Add a helper function "byId" for use when wiring up onclick event handlers
    if (!c.byId)
      c.byId = function(id) { return c.hash[id]; }

    this.debugTimer.end("-- create " + list.length + " instances of " + name);
  },

  trackEvent: function(path) {
    //alert(path);  // Uncomment for dev/test purposes
    if (g_urchinAvailable)
      urchinTracker(path);
  }
};

iLike.FacebookInviter = Class.create();

iLike.FacebookInviter.prototype = {

  initialize: function()  {
    this.in_progress = false;  

    this.chooserEl = $('fb_invite_replace');

    function onFailure(request)
    {
       top.location = theApp.facebookBaseUrl;
    }

    function onSuccess(request)
    {
      if (this.chooserEl) {
  this.chooserEl.innerHTML = request.responseText;
        this.hookupChooser();
      }
    }

    var s = Form.serialize('fb_user');

    new Ajax.Request(
            theApp.baseUrl + "facebook/friend_choose_frame?" + s,
            {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
  },

  anyChecked: function() {

    var inputs = Form.getInputs(this.formEl, 'checkbox');
    var i = 0;

    var c = false;
    
    for (i = 0; i < inputs.length; i++)
    {
       if (inputs[i].checked) {
         c = true;
         break;
       }
    }

    return c;

  },

  hookupChooser: function() {

    this.submitBottomEl = $('fb_submit_bottom');
    this.submitTopEl = $('fb_submit_top');
    this.overlayEl = $('invite_overlay');
    this.selectAll = $('fb_invite_all');
    this.formEl = $('fb_invite_form');

    if (this.submitBottomEl != null || this.submitTopEl != null)
    {
      function submit(ev) {

        if(!this.in_progress) {

         var s = Form.serialize(this.formEl);

          function onFailure(request)
          {
            this.in_progress = false;
            
            top.location = theApp.facebookBaseUrl;
            
          }

          function onSuccess(request, json)
          {
            this.in_progress = false;
            top.location = request.responseText;            
          }
        
          this.in_progress = true;

          if (this.overlayEl != null) {
            this.overlayEl.show();
          }          

          if (this.submitTopEl)
          {
              this.submitTopEl.value = "Processing ...";
              this.submitTopEl.addClassName("idis");
          }
            
          if (this.submitBottomEl)
          {
              this.submitBottomEl.value = "Processing ...";
              this.submitBottomEl.addClassName("idis");
          }

    if (this.anyChecked()) {
            new Ajax.Request(
              theApp.baseUrl + "facebook/send_invites_async?" + s,
              {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
          }
          else {
            top.location = theApp.facebookBaseUrl;
          }          

        }         

  Event.stop(ev);
        return false;
      }

      if (this.submitBottomEl) {
        Event.observe(this.submitBottomEl, "click", submit.bind(this), false);
      }
      
      if (this.submitTopEl) {
        Event.observe(this.submitTopEl, "click", submit.bind(this), false);
      }

      if (this.selectAll) {
  function onSelectAll(ev) 
        {
      var checked = this.selectAll.checked;

     var inputs = Form.getInputs(this.formEl, 'checkbox');
     var i = 0;
           for (i = 0; i < inputs.length; i++)
           {
        inputs[i].checked = checked;
           }

           return true;
        }

        Event.observe(this.selectAll, "click", onSelectAll.bind(this), false);
       
      }
    }
  }

};

//----------------------------------------------------------------------------
//
// iLike.Playall class
//
//----------------------------------------------------------------------------

iLike.Playall = Class.create();

iLike.Playall.prototype = {

  initialize: function(id)  {
    this.id = id;

    this.playEl = $(id);

    if (this.playEl != null)
    {
      function play(ev) {

        if (iLike.SongExpando && iLike.SongExpando.arr)  
        {
    var expandoToPlay = null;
    for (var i = 0; i < iLike.SongExpando.arr.length; i++) {
      if (iLike.SongExpando.arr[i].song.clipurl != null)
      {
        expandoToPlay = iLike.SongExpando.arr[i];
        break;
      }
    }

          if (expandoToPlay != null)
    {
      expandoToPlay.playSong();
    }
  }

  Event.stop(ev);
        return false;
      }

      Event.observe(this.playEl, "click", play.bind(this), false);
    }

  }


};



//----------------------------------------------------------------------------
//
// iLike.PlaylistNav class
//
//----------------------------------------------------------------------------

iLike.PlaylistNav = Class.create();

iLike.PlaylistNav.prototype = {

  initialize: function(id,tag)  {
    this.id = id;
    this.checkedToggle = false;
    if (tag != null)
    {
      this.url = tag.url;
    }
  },


  show: function() {
    if (iLike.PlaylistNav.preserve_current)
      return;
    
    if (this.nav_item == null)
    {     
      this.nav_item = $('pl_nav_item_' + this.id);

      // safari has trouble hooking up events on inner divs when they're sent
      // down async -- we'll do it here instead of using onMouseDown directly.
      var nav = $('pl_nav_go_' + this.id);
      if (nav != null)
      {
    function navigate(ev) {
      iLike.PlaylistNav.preserve_current = true;
      window.location = this.url;
    }

        Event.observe(nav, "mousedown", navigate.bind(this), false);
      }
    }

    if (this.nav_item != null)
    {
      this.nav_item.className = 'playlist_nav_item_hover';
    }

    if (this.nav_hide_toggle == null && !this.checkedToggle)
    {
      this.nav_hide_toggle = $('pl_nav_toggle_' + this.id);
      this.checkedToggle = true;
    }

    if (this.nav_hide_toggle != null)
    {
      this.nav_hide_toggle.show();
    }

  },
  

  hide: function() {
    if (iLike.PlaylistNav.preserve_current)
      return;

    if (this.nav_item != null)
      this.nav_item.className = 'playlist_nav_item';    

    if (this.nav_hide_toggle != null)
      this.nav_hide_toggle.hide();

  }


};

iLike.PlaylistNav.preserve_current = false;

//----------------------------------------------------------------------------
//
// iLike.Paginator class
//
//----------------------------------------------------------------------------

iLike.Paginator = Class.create();

iLike.Paginator.prototype = {
  initialize: function(id, tag) {
    this.url = tag.url;
    this.elementName = tag.element;
    this.page = tag.page;
    this.current = tag.current;
    this.inProgress = false;

    if (tag.overlay)
    {
      this.overlayEl = $(tag.overlay);
    }
  },

  fetch: function(forward) {
    function onFailure()
    {
      var el = $(this.elementName);
      
      if (el != null)
      {
        el.innerHTML = "<br/>Error occured.  Please <a href='http://faq.ilike.com/index.php?action=contact'>contact iLike support</a>.";
      }

      this.inProgress = false;
    }
    
    function onSuccess(response, json)
    {
      var div = document.createElement("div");
      div.innerHTML = response.responseText;

        
      for (var i = 0; i < div.childNodes.length; i++)
      {
        switch (div.childNodes[i].id)
        {
          case "paginator_response":        
            var el = $(this.elementName);
            
            if (el != null)
              el.innerHTML = div.childNodes[i].innerHTML;

            break;
             
          case "json":
           var json = eval('(' + div.childNodes[i].innerHTML + ')');
            if (json != null && json.paginator != null)
            {
              theApp.createObjectsFromData(iLike.Paginator, json.paginator, "iLike.Paginator");
            }

            if (json != null && json.playlist_nav != null)
      {
              theApp.createObjectsFromData(iLike.PlaylistNav, json.playlist_nav, "iLike.PlaylistNav");
      }

            break;
          }
       }
       
       if (this.overlayEl != null)
       {
    this.overlayEl.hide();
       }
       
       this.inProgress = false;
    }
    
    if (!this.inProgress)
    {

      this.inProgress = true;
      var q = {};
      q.page = forward ? this.page + 1 : this.page - 1;
    
      if (this.current != null) {
        q.current = this.current;
      }
      q.time = (new Date()).getTime();

      var h = $H(q);

      if (this.overlayEl != null)
      {
        this.overlayEl.show();
      }

      new Ajax.Request(
    this.url + "?" +  h.toQueryString(),
          {method: "post", evalScripts:true, onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
    }
  
  },
  
  next: function() {
  this.fetch(true);
  },

  previous: function() {
  this.fetch(false);
  }
    
};



//----------------------------------------------------------------------------
//
// iLike.SortableObserver class
//
//----------------------------------------------------------------------------

iLike.SortableObserver = Class.create();

iLike.SortableObserver.prototype = {
  initialize: function(element, manager) {
    this.parent = null;
    this.manager = manager;
    this.squirt = $('squirt');
  },
  
  onStart: function(eventName, draggable, event) {    
    this.elementInDrag = draggable.element;
    this.startParent = draggable.element.parentNode;
    this.manager.resetPushCandidates();   
  },
  
  onDrag: function(eventName, draggable, event) {
    this.squirt.innerHTML = "iLike!<br/>";
  },
  
  
  onEnd: function(eventName, draggable, event) {
    draggable.element.style.left = 0;
    draggable.element.style.top = 0;           
    this.manager.storeState();
  }
};


//----------------------------------------------------------------------------
//
// iLike.SortableManager class
//
//----------------------------------------------------------------------------

iLike.SortableManager = Class.create();

iLike.SortableManager.prototype = {

  initialize: function(specialCount, maxSpecialCount, orderMap, items, specialType)
  {
    this.maxTopCount = maxSpecialCount;
    this.topCount = specialCount;   
    this.orderMap = orderMap;
    this.items = items;
    this.hiddenClass = 'hidden_dragdrop';
    this.specialType = specialType;

    this.maxOrder = 65535;
    this.minOrder = 0;
           
    this.topStart = $('top_items_start');
    this.topEnd = $('top_items_end');    
    this.topItemsEl = $('top_items_target'); 

    // if < 12 items, insert some placeholders so the other spots are still draggable
    // only fill up a row, don't start another.
    if (this.topCount < this.maxTopCount)
    {
      var toAdd = this.topCount < 6 ? 6 - this.topCount : this.maxTopCount - this.topCount;
            
      for (var i =0; i < toAdd; i++)
      {
        var b = Builder.node('div', {className:this.hiddenClass, id: 'placeholder'+i});
        this.topItemsEl.insertBefore(b, this.topEnd);
      }
      
    }

    this.allEnd = $('all_items_end');
    this.allItemsEl = $('all_items_target');     
    
    this.specialEl = $('special_sortable')
    this.observer = new iLike.SortableObserver(this.specialEl, this);                         
    this.initializeSortable();
    this.bottomedOut = false;   
    
    this.initEmptySpecial();
  },

  initializeSortable: function()
  {
    if (this.topItemsEl) 
    {
     Sortable.create("top_items_target",
                     {tag:'div', 
                      ghosting:false,
                      starteffect: Prototype.emptyFunction,                      
                      endeffect: Prototype.emptyFunction,
                      overlap:'horizontal',
                      undraggable: this.hiddenClass,
                      containment: ['top_items_target', 'all_items_target'], 
                      onChange: this.onTopChange.bind(this),
                      constraint:false,
                      dropOnEmpty:false});
     }
     
     if (this.allItemsEl)
     {                 
       Sortable.create("all_items_target", 
                      {tag:'div', 
                      ghosting:false, 
                      starteffect: Prototype.emptyFunction,
                      endeffect: Prototype.emptyFunction,
                      overlap:'horizontal', 
                      containment: ['top_items_target', 'all_items_target'], 
                      onChange: this.onAllChange.bind(this),
                      constraint:false, 
                      dropOnEmpty:false});
     }
     
     // ensure our observer gets called after the sortable observer.                      
     Draggables.removeObserver(this.specialEl);
     Draggables.addObserver(this.observer);                                  
  },
  
  initEmptySpecial: function()
  {
    var allEmpty = true;
    for (var i in this.orderMap)
    {
        if (this.orderMap[i] > 0)
        {
          allEmpty = false;
        }
    }
         
    if (allEmpty)
    {
      this.rebalanceTopOrder();
    }
      
    this.storeState();            
  },

  serializeTopState: function()
  {
    //return this.serializeIds(this.topItemsEl.childNodes);
    
    var items = [];
    for (var i in this.orderMap)
    {
      if (this.orderMap[i] > 0)
      {           
        items.push(i + "=" + this.orderMap[i]);   
      }
    }
    
    return items.flatten().join(',');
  },

  storeState: function()
  {
    if (this.bottomedOut)
    {
      this.rebalanceTopOrder();
    }
        
    var poststr = this.serializeTopState();
    document.cookie = 'special_' + this.specialType + '=' + poststr + '; domain=ilike.com';
  },

  rebalanceTopOrder: function()
  {
    nodes = this.topItemsEl.childNodes;
    var newHash = {}
    
    var slice = Math.floor(this.maxOrder / (this.maxTopCount + 2));
    var cur = this.maxOrder - slice;
    for (var i = 0; i < nodes.length; i++)
    {
      if (nodes[i].id.search(this.specialType) != -1)
      {
        newHash[nodes[i].id] = cur;
        cur -= slice;
      }
    }
    this.orderMap = newHash;
    this.bottomedOut = false;
  },

  resetPushCandidates: function()
  {
    this.topPush = null;
    this.bottomPush = null;
   
  },

  setMovedOrder: function(el)
  {
    var prev = this.maxOrder;
    var next = 0;

    if (!this.bottomedOut)
    {
      if (el.previousSibling != this.topStart && el.previousSibling != null)
      {
        prev = this.orderMap[el.previousSibling.id];        
      }      
      if (el.nextSibling != this.topEnd && el.nextSibling.className != this.hiddenClass)
      {
        next = this.orderMap[el.nextSibling.id];
      }
      var newOrder = Math.floor((prev - next)/2) + next;
      
      if (newOrder == prev || newOrder == next)
      {
        this.bottomedOut = true;
      }
      else {
          //alert("set newOrder to " + newOrder + " on " + el.id);
          this.orderMap[el.id] = newOrder;
      }
    }  
  },

  onTopChange: function(el)
  {
    if (this.bottomPush)
    {
        this.allItemsEl.insertBefore(this.bottomPush, this.allItemsEl.firstChild);
        this.orderMap[this.bottomPush.id] = 0;
        this.bottomPush = null;
    }

    var movingToTop = el.parentNode == this.topItemsEl && this.observer.startParent != el.parentNode;   
    if (movingToTop && !this.topPush)
    {
        this.topPush = this.topEnd.previousSibling;
        
        // if the user is trying to move to the last position in the top items,
        // move the one that *used* to be last to the bottom.
        if (this.topPush == el)
        {
            this.topPush = el.previousSibling;        
        }
        
        if (this.topCount == this.maxTopCount)
        {
          var firstAllArtist = this.allItemsEl.firstChild;
          if (firstAllArtist != null)
          {
            this.allItemsEl.insertBefore(this.topPush, firstAllArtist);            
            this.orderMap[this.topPush.id] = 0;
          }  
        }
        this.setMovedOrder(el);
    }
    else if (el.parentNode == this.topItemsEl)
    {
      // if we have any hidden placeholders, make sure the
      // moved element gets pushed back
      if (this.topCount < this.maxTopCount)
      {
        var walk = el.previousSibling;
        if (walk != null && walk.className == this.hiddenClass)
        {
          while(walk != null && walk.previousSibling.className == this.hiddenClass)
          {
            walk = walk.previousSibling;
          }
          if (walk != null)
          {
            this.topItemsEl.insertBefore(el, walk);
          }
        }        
      }
      this.setMovedOrder(el);      
    }
  },

  onAllChange: function(el)
  {
    if (this.topPush)
    {
        this.topItemsEl.insertBefore(this.topPush, this.topEnd);
        this.setMovedOrder(this.topPush);
        this.topPush = null;
    }   
        
    var movingToBottom = el.parentNode == this.allItemsEl && this.observer.startParent != el.parentNode;               
    if (movingToBottom && !this.bottomPush)
    {
      if (this.allItemsEl.firstChild)
      {
        var walk = this.allItemsEl.firstChild;
        
        while (walk)
        {
          if (walk != el)
          {
            this.bottomPush = walk;
            break;
          }
          walk = walk.nextSibling;
        }
      }                

      if (this.bottomPush)
      {
        this.topItemsEl.insertBefore(this.bottomPush, this.topEnd);
        this.setMovedOrder(this.bottomPush);
      }
      this.orderMap[el.id] = 0;
    }
  }      
};


//----------------------------------------------------------------------------
//
// iLike.Toggle class
//
//----------------------------------------------------------------------------

iLike.Toggle = Class.create();
iLike.Toggle.prototype = {
  initialize: function(toggleList, link, active, url)
  {
    this.toggleList = toggleList;
    this.url = url;
    this.linkEl = link;
    this.activeEl = active;
    
    if (this.linkEl)
    {
        Event.observe(this.linkEl, 'click', this.onClickLink.bind(this), false);
        //Event.observe(this.linkEl, 'focus', function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
    }
  },
  
  onClickLink: function(ev)
  {
    el = Event.element(ev);
    onSuccess = function onSuccess(request)
    {
      this.toggleList.makeActive(this, request.responseText);                    
    }                
    
    onFailure = function onFailure(request)
    {
    }
    
    new Ajax.Request(this.url, {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});                          
    
    Event.stop(ev);
  }  
};


//----------------------------------------------------------------------------
//
// iLike.ToggleList class
//
//----------------------------------------------------------------------------

iLike.ToggleList = Class.create();

iLike.ToggleList.prototype = {   
  initialize: function(element, toggles)
  {
    this.friendsEl = element;
    this.toggles = new Array(toggles.length);
           
    for (var i = 0; i < toggles.length; i++)
    {
      var linkEl = $(toggles[i].link);
      var activeEl = $(toggles[i].active);
      
      if (linkEl && activeEl)         
      {
        this.toggles[i] = new iLike.Toggle(this, linkEl, activeEl, toggles[i].url);
        
        if (activeEl.visible())
        {
          this.activeToggle = this.toggles[i];
        }
      }
    }
  },
  
  makeActive: function(newActiveToggle, replace)
  {
    // disable previously active
    this.activeToggle.activeEl.hide();
    this.activeToggle.linkEl.show();
    
    // enable new toggle
    newActiveToggle.linkEl.hide();
    newActiveToggle.activeEl.show();
    
    this.activeToggle = newActiveToggle;
    
    this.friendsEl.innerHTML = replace;

  }  
};


//----------------------------------------------------------------------------
//
// iLike.MP3Expando class
//
//----------------------------------------------------------------------------

iLike.MP3Expando = Class.create();

iLike.MP3Expando.prototype = {

  initialize: function(id, artist_name, song_name) {
    this.id = id;
    this.artist_name = artist_name;
    this.song_name = song_name;
    this.inFocus = false;
    this.inQuery = false;
    this.songData = null;
  },

  onFocus: function() {
    this.inFocus = true;
    theApp.trackEvent("Ajax/FindMP3s");
    this.playMP3();
  },

  onBlur: function() {
    this.inFocus = false;
    this.stopMP3();
  },

  stopMP3: function() {
    if (player.playing || player.loading)
    {
      if (iLike.SongExpando.byId(player.id).song.seeqpod_view)
        StopPlayer();
    }
  },

  playMP3: function() {
    function onSuccess(request, json)
    {
      $(this.id + "_tabcontent_mp3s").innerHTML = request.responseText;

      if (json && json.songs)
      {
        this.songData = json.songs;
        theApp.createObjectsFromData(iLike.SongExpando, json.songs, "iLike.SongExpando");

        if (this.inFocus && this.songData.length > 0)
          iLike.SongExpando.byId(this.songData[0].id).playSong(true);
      }

      this.inQuery = false
    }

    function onFailure()
    {
      $(this.id + "_tabcontent_mp3s").innerHTML = "<div class='expando_tab_text'>Error. Please try again later.</div>";
      this.inQuery = false;
    }

    // Start playing song if we already have the data, else fetch it
    if (this.songData && this.songData.length > 0)
    {
      iLike.SongExpando.byId(this.songData[0].id).playSong(true);
    }
    else if (!this.inQuery)
    {
      var q = {};
      q.el_id = this.id;
      
      this.inQuery = true;
      new Ajax.Request(
        theApp.baseUrl + "artist/" + encodeURIComponent(this.artist_name.gsub('/','%2F')) + "/track/" + encodeURIComponent(this.song_name.gsub('/','%2F')) + "/seeq?" + $H(q).toQueryString(),
        {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
    }
  }
};


//----------------------------------------------------------------------------
//
// iLike.VideoExpando class
//
//----------------------------------------------------------------------------

iLike.VideoExpando = Class.create();

iLike.VideoExpando.prototype = {

  initialize: function(id, artist_name, song_name) {
    this.id = id;
    this.swfObject = null;
    this.artist_name = artist_name;
    this.song_name = song_name;
    this.videoData = null;
    this.curVideoEl = $(this.id + "_cur_video");
    this.viewAllEl = $(this.id + "_video_view_all");
    this.headerEl = $(this.id + "_video_header");
    this.lastActiveId = null;
    this.inFocus = false;
    this.inQuery = false;
    this.maxThumbnails = 4;
    this.thumbnailImages = [];
    this.thumbnailLinks = [];


    // Initialize thumbnail arrays
    for (var i = 0; i < this.maxThumbnails; i++)
    {
      var elImg = $(this.id + "_video_thumb" + (i+1));
      if (elImg)
      {
        this.thumbnailImages.push(elImg);
        this.thumbnailLinks.push($(this.id + "_video_link" + (i+1))); 
      }
    }
  },

  onFocus: function() {
    this.inFocus = true;
    theApp.trackEvent("Ajax/PlayVideo");
    this.playVideo();
  },

  onBlur: function() {
    this.inFocus = false;
    this.stopVideoPlayer(false, true);
  },

  onClickPlayThumbnail: function(ev) {
    // Start playing the clicked-on video
    var id = parseInt(Event.element(ev).id.substr(Event.element(ev).id.length - 1));
    this.startVideoPlayer(id);
    theApp.trackEvent("Ajax/PlayVideoFromThumbnail");
  },

  showNoClips: function() {
    this.curVideoEl.hide();
    $(this.id + "_no_videos").show();
    theApp.trackEvent("Ajax/NoVideosFound");
  },

  onMouseOver: function(ev) {
    Event.element(ev).addClassName("video_thumb_onhover");
  },

  onMouseOut: function(ev) {
    Event.element(ev).removeClassName("video_thumb_onhover");
  },

  playVideo: function() {
    function onSuccess(request)
    {
      // Eval the json response
      this.videoData = eval('(' + request.responseText + ')');

      if (request.status == 200 && this.videoData && this.videoData.videos && this.videoData.videos.length > 0)
      {
        // Set up the thumbnail images and start observing clicks
        for (var i = 0; i < this.videoData.videos.length && i < this.thumbnailLinks.length; i++)
        {
          this.thumbnailLinks[i].show();
          this.thumbnailImages[i].src = this.videoData.videos[i].thumb;
          this.thumbnailLinks[i].title = "Watch '" + this.videoData.videos[i].title + "'";
          Event.observe(this.thumbnailLinks[i], 'mousedown', this.onClickPlayThumbnail.bind(this), false);
          Event.observe(this.thumbnailLinks[i], 'click', function(ev){Event.stop(ev);}, false);
          Event.observe(this.thumbnailLinks[i], 'focus', function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
          Event.observe(this.thumbnailImages[i], 'mouseover', this.onMouseOver.bind(this), false);
          Event.observe(this.thumbnailImages[i], 'mouseout', this.onMouseOut.bind(this), false);
        }

        // Display view all link
        this.viewAllEl.show();
        this.headerEl.innerHTML = "Video" + (this.videoData.videos.length == 1 ? "" : "s") + " from <a href='http://www.youtube.com/'>YouTube</a>:";

        // Start playing the 1st video if we're still in focus
        if (this.inFocus)
          this.startVideoPlayer(1);
      }
      else
      {
        this.showNoClips();
      }

      this.inQuery = false
    }

    function onFailure()
    {
      this.showNoClips();
      this.inQuery = false;
    }

    // Start playing video if we already have the data, else fetch it
    if (this.videoData && this.videoData.videos && this.videoData.videos.length > 0)
    {
      this.startVideoPlayer(1);
    }
    else if (!this.inQuery)
    {
      var qp = null;
      var q = {};

      if (typeof(this.artist_name) == "undefined" || typeof(this.song_name) == "undefined")
      {
        // Hack to get around cases where artist data not getting returned in json object (TODO: this is expected for GB songs, but not in the inbox)
        var i = this.viewAllEl.href.indexOf("videosearch?q=");
        if (i != -1)
          qp = "query=" + this.viewAllEl.href.substr(i + 13);  // 13 = length of "search_query="
      }
      else
      {
        q.artist = this.artist_name;
        q.song = this.song_name;
      }

      this.curVideoEl.innerHTML = "<p>Searching YouTube...</p>";
      this.inQuery = true;
      new Ajax.Request(theApp.baseUrl + "track/related_videos?" + (qp ? qp : $H(q).toQueryString()), {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
    }
  },

  startVideoPlayer: function(id) {
    if (id >= 1 && id <= this.videoData.videos.length)
    {
      this.stopVideoPlayer(false);
      this.lastActiveId = id;

      // Update thumbnail class to reflect currently playing video
      this.thumbnailImages[this.lastActiveId-1].addClassName("video_thumb_active");

      // Embed player swf
      this.swfObject = new SWFObject("http://youtube.com/v/" + this.videoData.videos[id-1].id + "&autoplay=1", this.id + "_cur_video_swf", "140", "115", "7", "#ffffff");
      this.swfObject.write(this.id + "_cur_video");

      // Stop the (music) player if already playing
      if (player.playing || player.loading)
        StopPlayer();
    }
  },

  stopVideoPlayer: function(showStopMessage, skipClearIfNoVideos) {
    if (this.swfObject)
      this.swfObject = null;

    var fSkip = skipClearIfNoVideos && (!this.videoData || !this.videoData.videos || this.videoData.videos.length == 0);

    if (!fSkip)
      this.curVideoEl.innerHTML = showStopMessage ? "<p>Click a video on the right to start watching.</p>" : "";

    if (this.lastActiveId)
      this.thumbnailImages[this.lastActiveId-1].removeClassName("video_thumb_active");

    this.lastActiveId = null;
  }
};


//----------------------------------------------------------------------------
//
// iLike.AddPick class
//
//----------------------------------------------------------------------------

iLike.AddPick = Class.create();

iLike.AddPick.prototype = {

  initialize: function(id, tag) {
    this.id = id;
    this.item = tag;
    this.focused = false;

    if (this.item.type == null)
      this.shareType = 'song';
    else
      this.shareType = this.item.type;
  },

  onView: function() {
  },

  onFocusTextArea: function() {
    if (!this.focused)
    {
      this.focused = true;
      var body = $(this.id + "_pick_comment");
      if (body)
      {
        body.value = "";
        body.style.color = "#333333";
      }
    }
  },

  onClickAddPick: function(ev) {
    function onFailure()
    {
      pickArea.innerHTML = "Error. Please try again later.";
    }

    function onSuccess(request, json)
    {
      pickArea.hide();
      $(this.id + "_pick_added").show();
    }

    var pickArea = $(this.id + "_pick_btn_area");
    pickArea.innerHTML = "Adding...";


    function pickSong(pick) {
      var q = {};
      q.pick_comment = pick.focused ? $(pick.id + "_pick_comment").value : "";
      if (pick.item.emerging)
      {
        q.emerging = 1;
        // prefer interlinked song.id on songs, use non-interlinked id otherwise.
        q.trackid = pick.item.id != null ? pick.item.id : pick.item.song_id;
      }
      else
      {
        q.trackid = pick.item.id;
      }

      return q;
    }

    function pickPlaylist(pick) {         
      var q = {};
      q.pick_comment = pick.focused ? $(pick.id + "_pick_comment").value : "";
      q.id = pick.id;
      return q;
    }
    q = this.shareType == "song" ? pickSong(this) : pickPlaylist(this);
    
    new Ajax.Request(
      $(this.id + "_pick_form").action,
      {method: "post", postBody: $H(q).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    Event.stop(ev);
  }

};


//----------------------------------------------------------------------------
//
// iLike.AutoSuggest class
//
//----------------------------------------------------------------------------

iLike.AutoSuggest = Class.create();

iLike.AutoSuggest.prototype = {

  initialize: function(id, inputEl, dropdownEl, data, onMatchFn, onSelectFn, onSuffixFn, onSuffixDataFn) {
    this.id = id;
    this.inputEl = inputEl;
    this.dropdownEl = dropdownEl;
    this.data = data;
    this.onSelectFn = onSelectFn;
    this.onMatchFn = onMatchFn;
    this.onSuffixFn = onSuffixFn;
    this.onSuffixDataFn = onSuffixDataFn;
    this.suggestions = [];
    this.highlighted = 0;
    this.maxSuggestions = 10;

    // Code for preventing non-first item from being highlighted if mouse happens to be hovering over it
    this.mouseMoved = false;
    this.mouseMoveListener = this.onMouseMove.bindAsEventListener(this);

    Event.observe(this.inputEl, "keyup", this.onKeyUp.bindAsEventListener(this), false);
    Event.observe(this.inputEl, "keydown", this.onKeyDown.bindAsEventListener(this), false);
    Event.observe(this.inputEl, "blur", this.onBlur.bindAsEventListener(this), false);
    Event.observe(this.inputEl, "focus", this.onFocus.bindAsEventListener(this), false);

    if (this.inputEl.value != "")
      this.autoSuggest();
  },

  clear: function() {
    this.inputEl.value = "";
    this.suggestions.clear();
    this.hideDropdown();
  },

  onFocus: function(ev) {
    if (this.suggestions.length > 0)
    {
      this.highlighted = 0;
      this.updateHighlight();
      this.showDropdown();
    }
  },

  onBlur: function(ev) {
    this.hideDropdown();
  },

  onClickSuggestion: function(ev, index) {
    this.onSelectFn(this.suggestions[index]);
    this.clear();

    Event.stop(ev);
  },

  showDropdown: function() {
    this.dropdownEl.show();

    // start listening for mousemove events so that we know if the mouse moved before the mouseover
    // event was fired (else we get issues in Firefox when the non-first item automatically gets highlighted)
    this.mouseMoved = false;
    Event.observe(document, "mousemove", this.mouseMoveListener, false);
  },

  hideDropdown: function() {
    this.dropdownEl.hide();

    Event.stopObserving(document, "mousemove", this.mouseMoveListener, false);
  },

  onMouseMove: function(ev) {
    this.mouseMoved = true;
    Event.stopObserving(document, "mousemove", this.mouseMoveListener, false);
  },

  onMouseOverSuggestion: function(ev, index) {
    if (this.mouseMoved)
    {
      this.highlighted = index;
      this.updateHighlight();
    }
  },

  updateHighlight: function() {
    for (var i = 0; i < this.suggestions.length; i++)
    {
      if (i == this.highlighted)
        $(this.id + "_asitem_" + i).addClassName("autosuggest_item_hl");
      else
        $(this.id + "_asitem_" + i).removeClassName("autosuggest_item_hl");
    }
  },

  onKeyDown: function(ev) {
    var key = 0;

    if (ev.keyCode)
      key = ev.keyCode;
    else if (typeof(ev.which) != "undefined")
      key = ev.which;

    if (this.suggestions.length > 0 && this.dropdownEl.visible())
    {
      if (key == 9 || key == 188 || key == 13)
      {
        this.onSelectFn(this.suggestions[this.highlighted]);
        this.clear();

        Event.stop(ev);
      }
      else if (key == 40 || key == 38)
      {
        // up arrow
        if (key == 38 && this.highlighted > 0)
          this.highlighted--;

        // down arrow
        if (key == 40 && this.highlighted < this.suggestions.length-1)
          this.highlighted++;

        this.updateHighlight();

        Event.stop(ev);
      }
    }
  },

  onKeyUp: function(ev) {
    var key = 0;

    if (ev.keyCode)
      key = ev.keyCode;
    else if (typeof(ev.which) != "undefined")
      key = ev.which;

    if (key == 40 || key == 38)
      return;

    this.autoSuggest();
  },

  autoSuggest: function() {
    var htm = "";
    this.suggestions.clear();
    this.highlighted = 0;

    var val = this.inputEl.value;
    if (val != "")
    {
      for (var i = 0; i < this.data.length && this.suggestions.length < this.maxSuggestions; i++)
      {
        var result = this.onMatchFn(val, this.data[i], this.suggestions.length);
        if (result)
        {
          htm += result;
          this.suggestions.push(this.data[i]);
        }
      }
    }
    else
    {
      this.hideDropdown();
    }

    if (this.suggestions.length > 0)
    {
      if (!this.dropdownEl.visible())
        this.showDropdown();

      var suffix = this.onSuffixFn(this.suggestions.length);
      if (suffix != "")
        this.suggestions.push(this.onSuffixDataFn());
      this.dropdownEl.innerHTML = htm + suffix;
      this.updateHighlight();
    }
    else
    {
      this.hideDropdown();
    }
  }
};

//----------------------------------------------------------------------------
//
// iLike.ShareSong class
//
//----------------------------------------------------------------------------

iLike.ShareSong = Class.create();
iLike.ShareSong.prototype = {

  initialize: function(id, tag) {
    this.id = id;
    this.share_object = tag;
    this.friends = null;
    this.inQuery = false;
    this.toEl = $(this.id + "_share_users");
    this.toSuggestEl = $(this.id + "_autosuggest");
    this.rcptEl = $(this.id + "_recipients");
    this.hintEl = $(this.id + "_share_hint");
    this.freeFormEl = $(this.id + "_share_free_form");
    this.inputRouter = null;
    this.rcpts = [];
    this.autoSuggest = null;
    this.focused = false;

    if (this.share_object.type == null)
    {
      this.shareType = 'song';
      this.inputRouter = "iLike.SongExpando";
    }
    else
    {
      this.shareType = this.share_object.type;       
      this.inputRouter = "iLike.PlaylistExpando";
    } 
  },

  onFocusTextArea: function() {
    if (!this.focused)
    {
      this.focused = true;
      var body = $(this.id + "_share_comment");
      if (body)
      {
        body.value = "";
        body.style.color = "#333333";
      }
    }
  },

  onFocus: function() {
    // Fetch the list if we don't already have it
    if (!this.friends && !this.inQuery && this.toEl)
    {
      function onSuccess(request)
      {
        if (request.status == 200)
        {
          this.friends = eval('(' + request.responseText + ')');

          // Prep the data
          if (this.friends && this.friends.length > 0)
          {
            for (var i = 0; i < this.friends.length; i++)
            {
              var d = this.friends[i].d ? this.friends[i].d : "";
              var n = ((this.friends[i].f ? this.friends[i].f : "") + " " + (this.friends[i].l ? this.friends[i].l : "")).strip();
              n = (n == d ? "" : n);

              this.friends[i].d = d;
              this.friends[i].d_split = d.split(" ");

              this.friends[i].n = n;
              this.friends[i].n_split = n.split(" ");
            }
          }
          else
          {
            this.hintEl.hide();
            this.toEl.disabled = true;
            $(this.id + "_share_nofriends").show();
          }
        }

        this.autoSuggest = new iLike.AutoSuggest(this.id, this.toEl, this.toSuggestEl, this.friends,
                                                 this.onMatchSuggestion.bind(this),
                                                 this.onSelectSuggestion.bind(this),
                                                 this.onSuffix.bind(this),
                                                 this.onSuffixData.bind(this));
        this.inQuery = false;
      }

      function onFailure()
      {
        this.inQuery = false;
      }

      this.inQuery = true;
      new Ajax.Request(theApp.baseUrl + "account/get_friends_json", {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
    }

    // Set focus and observe key events
    if (this.toEl && this.toEl.value == "")
      this.toEl.focus();
  },

  onMatchSuggestion: function(val, item, index) {
    val = val.toLowerCase().strip();
    var len = val.length;
    var match_d = false;
    var match_n = false;
    var d = "";
    var n = "";
    var htm = "";

    // Check for matches at the start of each word in displayname
    for (var i = 0; i < item.d_split.length; i++)
    {
      if (item.d_split[i].toLowerCase().substr(0, len) == val && !match_d)
      {
        match_d = true;
        d += "<b>" + item.d_split[i].substr(0, len) + "</b>" + item.d_split[i].substr(len) + " ";
      }
      else
      {
        d += item.d_split[i] + " ";
      }
    }
    d = d.strip();
    
    // If none found, check for matches across space (" ") boundaries
    if (!match_d && item.d.toLowerCase().substr(0, len) == val)
    {
      match_d = true;
      d = "<b>" + item.d.substr(0, len) + "</b>" + item.d.substr(len);
    }

    // Check for matches at the start of each word in name
    for (var i = 0; i < item.n_split.length; i++)
    {
      if (item.n_split[i].toLowerCase().substr(0, len) == val && !match_n)
      {
        match_n = true;
        n += "<b>" + item.n_split[i].substr(0, len) + "</b>" + item.n_split[i].substr(len) + " ";
      }
      else
      {
        n += item.n_split[i] + " ";
      }
    }
    n = n.strip();

    // If none found, check for matches across space (" ") boundaries
    if (!match_n && item.n.toLowerCase().substr(0, len) == val)
    {
      n = "<b>" + item.n.substr(0, len) + "</b>" + item.n.substr(len);
      match_n = true;
    }

    if (match_d || match_n)
    {
      htm += "<div id='" + this.id + "_asitem_" + index + "'";
      htm += " onmousedown=\"" + this.inputRouter + ".byId('" + this.id + "').onClickSuggestion(event, " + index + ");\"";
      htm += " onmouseover=\"" + this.inputRouter + ".byId('" + this.id + "').onMouseOverSuggestion(event, " + index + ");\"";
      htm += " onclick='return false;' class='autosuggest_item'>";
      htm += d;
      if (n != "")
        htm += "&nbsp;\"" + n + "\"";
      if (item.c)
      {
        var cname = "compat_hdr_low";
        if (item.c == "High")
          cname = "compat_hdr_high";
        else if (item.c == "Medium")
          cname = "compat_hdr_medium";
        
        htm += "&nbsp;-&nbsp;<span class='" + cname + "'>" + item.c + "</span>";
      }
      
      htm += "</div>";
      return htm;
    }
    
    return null;
  },

  onSuffix: function(index) {
    var htm = "";

    htm += "<div id='" + this.id + "_asitem_" + index + "'";
    htm += " onmousedown=\"" + this.inputRouter + ".byId('" + this.id + "').onClickSuggestion(event, " + index + ");\"";
    htm += " onmouseover=\"" + this.inputRouter + ".byId('" + this.id + "').onMouseOverSuggestion(event, " + index + ");\"";
    htm += " onclick='return false;' class='autosuggest_item' style='border-top:solid 1px #caced1;'>Send to all friends</div>";
    index += 1;

    return htm;
  },

  onSuffixData: function() {
      return {"allFriends":true}
  },

  onSelectSuggestion: function(item) {
    this.rcpts.push(item);
    this.renderRecipients();
  },

  onClickSuggestion: function(ev, index) {
    if (this.autoSuggest && Event.isLeftClick(ev))
      this.autoSuggest.onClickSuggestion(ev, index);
  },

  onMouseOverSuggestion: function(ev, index) {
    if (this.autoSuggest)
      this.autoSuggest.onMouseOverSuggestion(ev, index);
  },

  onClickRemoveRcpt: function(ev, index) {
    if (index < this.rcpts.length)
    {
      this.rcpts.splice(index, 1);
      this.renderRecipients();
    }

    Event.stop(ev);
  },

  renderRecipients: function() {
    var htm = "";

    for (var i = 0; i < this.rcpts.length; i++)
    {
      var d = this.rcpts[i].allFriends ? "All friends" : this.rcpts[i].d;
      htm += "<div class='to_rcpt'>";
      htm += "<div class='to_rcpt_name' ";
      htm += "onmouseover=\"this.style.textDecoration='line-through';\" onmouseout=\"this.style.textDecoration='none';\" onclick=\"" + this.inputRouter + ".byId('" + this.id + "').onClickRemoveRcpt(event, " + i + ");\" title=\"Click to remove '" + d + "' from the recipient list\">" + d.gsub(/[ -]/, "&nbsp;") + "</div><div class='to_rcpt_cap'></div></div>";    }

    if (this.hintEl)
    {
      if (this.rcpts.length == 0)
        this.hintEl.show();
      else
        this.hintEl.hide();
    }

    this.rcptEl.innerHTML = htm;
  },

  resetForm: function() {
    function reset()
    {
      $(this.id + "_share_btn_area").show();
      $(this.id + "_share_status").hide();
      this.toEl.value = "";
      this.rcpts.clear();
      this.renderRecipients();

      if (this.freeFormEl != null)
      {
        this.freeFormEl.value = "";
      }
      
      if (this.autoSuggest)
        this.autoSuggest.clear();
    }
    
    setTimeout(reset.bind(this), 2500);
  },

  onClickSend: function(ev) {
    function onFailure()
    {
      statusEl.innerHTML = "Error. Please try again later.";
    }

    function onSuccess(request, json)
    {
      statusEl.innerHTML = "Sent!";
      this.resetForm();
    }

    if ((this.friends && this.friends.length > 0) || (this.freeFormEl != null && this.freeFormEl.value != ""))
    {
      if ((this.rcpts.length == 0 && this.freeFormEl == null) || (this.freeFormEl != null && this.freeFormEl.value == "" && this.rcpts.length == 0))
      {
        alert("No recipients specified. Please select a name from the list that appears once you start typing.");
        this.toEl.focus();
      }
      else
      {
        $(this.id + "_share_btn_area").hide();

        var statusEl = $(this.id + "_share_status");
        statusEl.show();
        statusEl.innerHTML = "Sending...";
        var song_submit = function(id, obj) {
          var q = {};
          q.trackid = obj.id;
          if (obj.emerging)
          {
            q.emerging = 1;
            q.trackid = obj.song_id;
          }

          return q;
        };

        var playlist_submit = function(id, obj) {
             
           var q = {};
          q.id = id;

          var freeForm = $(id + "_share_free_form");
          if (freeForm != null) 
          {
            q.free_form = freeForm.value;
          }

          return q;
        };

        var uris = [];
        for (var i = 0; i < this.rcpts.length; i++)
        {
          if (this.rcpts[i].allFriends)
          {
            for (var j = 0; j < this.friends.length; j++)
              uris.push(this.friends[j].u);
            theApp.trackEvent("Ajax/SendToAll");
          }
          else
          {
            uris.push(this.rcpts[i].u);
          }
        }

        var q = this.shareType == "song" ? song_submit(this.id, this.share_object) : playlist_submit(this.id, this.share_object);
        q.comment = this.focused ? $(this.id + "_share_comment").value : '';
        q.users = uris.join(",");

        new Ajax.Request(
          $(this.id + "_share_form").action,
          {method: "post", postBody: $H(q).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
      }
    }

    Event.stop(ev);
  }

};

///---------------------------------------------------------------------------
//
// iLike.PlaylistExpando
//
//----------------------------------------------------------------------------

iLike.PlaylistExpando = Class.create();

iLike.PlaylistExpando.prototype = {

  initialize: function(id, tag) {
    this.id = id;
    this.playlist = tag;
    this.pickEl = null;
    this.shareEl = null;
    this.selectedEl = null;
  },

  onShowAddPick: function (ev) {
    if (!this.pickEl)
      this.pickEl = $(this.id + '_pick');

    this.toggleView(this.pickEl);

    if (!this.addPick)
      this.addPick = new iLike.AddPick(this.id, this.playlist);
    this.addPick.onView();

    if (ev)
      Event.stop(ev);
    return false;
  },
  
  onShowShare: function (ev)   {

    if (!this.shareEl)
      this.shareEl = $(this.id + '_share');

    this.toggleView(this.shareEl);

    if (!this.share)
      this.share = new iLike.ShareSong(this.id, this.playlist);

    if (this.shareEl.visible())
      this.share.onFocus();

    if (ev)
      Event.stop(ev);

    return false;
  },

  onShowUploadPhoto: function(ev) {
    if (!this.photoEl)
  this.photoEl = $(this.id + '_edit_photo');
    
    this.toggleView(this.photoEl);

    if (ev)
      Event.stop(ev);
    return false;
  },

  toggleView: function(newActive) {
    
    if (newActive != this.selectedEl)
    {
      if (this.selectedEl != null)
        this.selectedEl.hide();

      newActive.show();
      this.selectedEl = newActive;
    }
    else
    {
      this.cancel(null);
    }
  },
 
  cancel: function(ev) {

    if (this.selectedEl != null)
      this.selectedEl.hide();

    this.selectedEl = null;

    if (ev)
      Event.stop(ev);

    return false;
  },


  onFocusAddPick: function(ev) {
    this.addPick.onFocusTextArea(ev);
  },

  onClickAddPick: function(ev) {
    this.addPick.onClickAddPick(ev);
  },

  onFocusSend: function(ev) {
    this.share.onFocusTextArea(ev);
  },

  onClickSend: function(ev) {
    this.share.onClickSend(ev);
  },

  onClickRemoveRcpt: function(ev, index) {
    this.share.onClickRemoveRcpt(ev, index);
  },

  onClickSuggestion: function(ev, index) {
    this.share.onClickSuggestion(ev, index);
  },

  onMouseOverSuggestion: function(ev, index) {
    this.share.onMouseOverSuggestion(ev, index);
  }

};

//----------------------------------------------------------------------------
//
// iLike.SongExpando class
//
//----------------------------------------------------------------------------

iLike.SongExpando = Class.create();

iLike.SongExpando.prototype = {

  initialize: function(id, tag) {
    // Member variables
    this.id = id;
    this.song = tag;
    this.pick_id = tag.pick_id;
    this.expandoEl = null;
    this.checked_recs = false;
    this.videoExpando = null;
    this.addPick = null;
    this.fetched = false;
    this.lastActiveTab = "info";

    if (this.song.autoplay)
      this.playSong(true);
  },

  onClickMoreInfo: function(ev) {
    this.ensureEls();

    if (this.expandoEl)
    {
      if (!this.expandoEl.visible())
      {
        this.showExpando();
        theApp.trackEvent("Ajax/SongMoreInfo");
      }
      else
      {
        this.hideExpando();
      }
    }
  },

  stopVideo: function(showStopMessage) {
    if (this.videoExpando)
      this.videoExpando.stopVideoPlayer(showStopMessage, true);
  },
  
  playSong: function(userInitiated) {
    PlaySong(this.id, this, userInitiated);
    this.stopVideo(true);
    if (this.song.quiz)
      theApp.nameThatTune.onClickPlay();
  },

  onClickPlay: function(ev) {
    this.playSong(true);
  },  

  showExpando: function() {
    this.ensureEls();

    // Hide previous expando if open
    if (theApp.lastOpenSongExpando && theApp.lastOpenSongExpando != this && !this.song.seeqpod_view)
      theApp.lastOpenSongExpando.hideExpando();

    // Ignore if we don't have an expando
    if (this.expandoEl && !this.expandoEl.visible())
    {
      // Update button text and show expando
      this.updateMoreInfoBtn("more_btn_collapse");

      this.expandoEl.show();

      // Fetch album info
      if (!this.fetched)
        this.fetchAlbumInfo();
      
      if (!this.checked_recs)
      {
        this.pickDataEl = $('pick_' + this.pick_id + '_body');
        this.pickDataElFull = $('pick_' + this.pick_id + '_body_full');
        this.checked_recs = true;
      }

      if (this.pickDataElFull)
      {
        this.pickDataElFull.show();
        this.pickDataEl.hide();
      }
    }

    // Set last open expando
    if (!this.song.seeqpod_view)
    theApp.lastOpenSongExpando = this;
  },

  updateMoreInfoBtn: function(name) {
    if ($(this.id + "_more_btn_img"))
      $(this.id + "_more_btn_img").className = name;
  },

  hideExpando: function() {
    this.ensureEls();

    if (this.expandoEl)
    {
      this.updateMoreInfoBtn("more_btn_expand");
    
      this.expandoEl.hide();
      
      if (this.pickDataElFull)
      {
        this.pickDataElFull.hide();
        this.pickDataEl.show();
      }

      this.showTab("info");
    }

    theApp.lastOpenSongExpando = null;
  },

  fetchAlbumInfo: function(ev) {
    function onSuccess(request, json)
    {
      this.fetched = true;

      // Load a dummy DOM with content extracted from the response
      var div = document.createElement("div");
      div.innerHTML = request.responseText;

      var haveContent = false;

      for (var i = 0; i < div.childNodes.length; i++)
      {
        switch (div.childNodes[i].id)
        {
          case this.id + "_expando_content":
            $(this.id + "_expando").innerHTML = div.childNodes[i].innerHTML;
            haveContent = true;
            break;

          case this.id + "_album_img_src":
            $(this.id + "_album_img").src = div.childNodes[i].innerHTML;
            break;
        }
      }

      if (!haveContent)
        this.showFailure();
    }
    
    function onFailure(request)
    {
      $(this.id + "_album_img").src = theApp.baseUrl + "images/no_photo_100x100.gif";
      this.showFailure();
    }

    var q = {};
    q.el_id = this.id;
    if (this.song.inbox)
      q.inbox = this.song.inbox;
    if (this.song.compact)
      q.compact = this.song.compact;
    if (this.song.wishlist)
      q.wishlist = true;            
    if (this.song.pick_view)
      q.pick_view = true;
    if (this.song.feed_view)
      q.feed_view = true;
    if (this.song.emerging)
      q.emerging = true;
    
    new Ajax.Request(
      theApp.baseUrl + "track/top_album_by_trackid/" + (this.song.emerging ? this.song.song_id : this.song.id) + "?" + $H(q).toQueryString(),
      {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    if (ev)
      Event.stop(ev);
  },

  showFailure: function() {
    $(this.id + "_status").innerHTML = "Unable to load album info. <a href='#' onclick=\"iLike.SongExpando.byId('" + this.id + "').fetchAlbumInfo(event);\">Please try again</a>.";
  },

  ensureEls: function() {
    if (!this.expandoEl)
      this.expandoEl = $(this.id + '_expando');
  },
  
  onFocusAddPick: function(ev) {
    this.addPick.onFocusTextArea(ev);
  },

  onClickAddPick: function(ev) {
    this.addPick.onClickAddPick(ev);
  },

  onFocusSend: function(ev) {
    this.shareSong.onFocusTextArea(ev);
  },

  onClickSend: function(ev) {
    this.shareSong.onClickSend(ev);
  },

  onClickRemoveRcpt: function(ev, index) {
    this.shareSong.onClickRemoveRcpt(ev, index);
  },

  onClickSuggestion: function(ev, index) {
    this.shareSong.onClickSuggestion(ev, index);
  },

  onMouseOverSuggestion: function(ev, index) {
    this.shareSong.onMouseOverSuggestion(ev, index);
  },

  onClickAddWishlist: function(ev) {
    function onFailure(request)
    {
      wishlistText.innerHTML = "Error. Please try again later.";
    }

    function onSuccess(request, json)
    {
      wishlistText.innerHTML = "Saved! <a href='" + theApp.baseUrl + "home/wishlist'>View wishlist</a>";
    }

    var wishlistText = $(this.id + '_wishlist');
    wishlistText.innerHTML = "Saving..."; 

    var q = {};
    if (this.song.emerging)
      q.emerging = true;
    
    new Ajax.Request(
      theApp.baseUrl + "account/wishlist_add_async/" + (this.song.emerging ? this.song.song_id : this.song.id) + "?" + $H(q).toQueryString(),
      {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    theApp.trackEvent("Ajax/AddToWishlist");

    Event.stop(ev);
  },

  onClickRemoveWishlist: function(ev, wishlist_id) {
    function onFailure(request)
    {
      wishlistText.innerHTML = "Error. Please try again later.";
    }

    function onSuccess(request, json)
    {
      wishlistText.innerHTML = "Removed. <a href='" + theApp.baseUrl + "home/wishlist'>View wishlist</a>";
    }

    var wishlistText = $(this.id + '_wishlist');
    wishlistText.innerHTML = "Removing...";

    var q = {};
    q.pickid = wishlist_id;
    
    new Ajax.Request(
      theApp.baseUrl + "account/delete_wishlist?" + $H(q).toQueryString(),
      {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    Event.stop(ev);
  },

  onClickTab: function(ev, tab) {
    this.showTab(tab);
    theApp.trackEvent("Ajax/SongExpando" + tab.substr(0,1).toUpperCase() + tab.substr(1));
    Event.stop(ev);
  },

  showTab: function(tab) {
    if ($(this.id + "_tab_" + tab))
    {
      $(this.id + "_tab_" + tab).addClassName("current");
      $(this.id + "_tab_" + tab).removeClassName("inactive");

      if (this.lastActiveTab && this.lastActiveTab != tab)
      {
        $(this.id + "_tabcontent_" + this.lastActiveTab).hide();
        $(this.id + "_tab_" + this.lastActiveTab).addClassName("inactive");
        $(this.id + "_tab_" + this.lastActiveTab).removeClassName("current");

        if (this.lastActiveTab == "videos" && this.videoExpando)
          this.videoExpando.onBlur();

        if (this.lastActiveTab == "mp3s" && this.mp3Expando)
          this.mp3Expando.onBlur();
      }

      $(this.id + "_tabcontent_" + tab).show();

      this.lastActiveTab = tab;
    }

    switch (tab) {
      case "pick":
        if (!this.addPick)
          this.addPick = new iLike.AddPick(this.id, this.song);
        this.addPick.onView();
        break;

      case "videos":
        if (!this.videoExpando)
          this.videoExpando = new iLike.VideoExpando(this.id, this.song.artist_name, this.song.name);
        this.videoExpando.onFocus();
        break;

      case "mp3s":
        if (!this.mp3Expando)
          this.mp3Expando = new iLike.MP3Expando(this.id, this.song.artist_name, this.song.name);
        this.mp3Expando.onFocus();
        break;

      case "share":
        if (!this.shareSong)
          this.shareSong = new iLike.ShareSong(this.id, this.song);
        this.shareSong.onFocus();
        break;
    }
  },

  getId: function() {
    return this.id;
  }
};


//----------------------------------------------------------------------------
//
// iLike.FeedExpando class
//
//----------------------------------------------------------------------------

iLike.FeedExpando = Class.create();

iLike.FeedExpando.prototype = {

  initialize: function(id, tag) {
    this.id = id;
    this.feed_item = tag;
    this.expandoEl = null;
    this.expandoHeaderEl = null;
    this.detailsLinkEl = null;
    this.fetched = false;
    this.active = false;
    this.mouseOver = false;

    this.keyDownListener = this.onKeyDown.bindAsEventListener(this);
    this.mouseDownListener = this.onMouseDown.bindAsEventListener(this);
  },
  
  onClickMoreInfo: function(ev) {
    this.ensureEls();
    if (this.expandoEl.visible())
    {
      this.hideExpando();
    }
    else
    {
      this.showExpando();
      if (this.feed_item && this.feed_item.persona) {
        theApp.trackEvent("Ajax/FeedMoreInfoGenre");
      }
      else {
        theApp.trackEvent("Ajax/FeedMoreInfo");
      }
    }
    
    Event.stop(ev);
  },

  updateBorderBelow: function(remove) {
    var items = $("feed_list").childNodes;

    for (var i = 0; i < items.length; i++)
    {
      if (items[i].id == this.id + "_li")
      {
        for (var j = i + 1; j < items.length - 1 && items[j].nodeType != 1; j++);
        
        if (j < items.length - 1)
        {
          for (var c = 0; c < items[j].childNodes.length && items[j].childNodes[c].nodeType != 1; c++);

          if (c < items[j].childNodes.length && Element.hasClassName(items[j].childNodes[c], (remove ? "feed_border" : "feed_noborder")))
          {
            var n = items[j].childNodes[c];
            Element.removeClassName(n, remove ? "feed_border" : "feed_noborder");
            Element.addClassName(n, remove ? "feed_noborder" : "feed_border");
          }
        }
        break;
      }
    }
  },

  onMouseOver: function(ev) {
    if (!this.active)
    {
      this.ensureEls();
      this.updateBorderBelow(true);
      if (this.expandoHeaderEl.tagName != "A")
        this.expandoHeaderEl.addClassName(this.feed_item.persona ? "feed_header_persona_hover" : "feed_header_hover");
    }

    this.mouseOver = true;
  },

  onMouseOut: function(ev) {
    if (!this.active)
    {
      this.ensureEls();
      this.updateBorderBelow(false);
      if (this.expandoHeaderEl.tagName != "A")
        this.expandoHeaderEl.removeClassName(this.feed_item.persona ? "feed_header_persona_hover" : "feed_header_hover");
    }

    this.mouseOver = false;
  },

  hideExpando: function() {
    this.ensureEls();

    if (this.expandoEl.visible())
    {
      Event.stopObserving(document, "keydown", this.keyDownListener, false);
      Event.stopObserving(document, "mousedown", this.mouseDownListener, false);

      this.expandoEl.hide();
      this.active = false;
      this.expandoHeaderEl.removeClassName((this.feed_item.persona ? "feed_header_persona_selected" : "feed_header_selected"));

      this.detailsLinkEl.innerHTML = "Show details";

      // Stop the (music) player if already playing
      if (player.playing || player.loading)
        StopPlayer();

      if (!this.mouseOver)
      {
        this.updateBorderBelow(false);
        if (this.expandoHeaderEl.tagName != "A")
          this.expandoHeaderEl.removeClassName(this.feed_item.persona ? "feed_header_persona_hover" : "feed_header_hover");
      }
    }

    theApp.lastOpenFeedExpando = null;
  },

  showExpando: function() {
    this.ensureEls();

    // Ignore if we don't have an expando
    if (this.expandoEl && !this.expandoEl.visible())
    {
      Event.observe(document, "keydown", this.keyDownListener, false);
      Event.observe(document, "mousedown", this.mouseDownListener, false);

      this.expandoHeaderEl.addClassName((this.feed_item.persona ? "feed_header_persona_selected" : "feed_header_selected"));

      if (!this.fetched)
        this.fetchExpando();

      this.expandoEl.show();
      this.active = true;

      this.detailsLinkEl.innerHTML = "Hide details";

      // Hide previous expando if open
      if (theApp.lastOpenFeedExpando && theApp.lastOpenFeedExpando != this)
        theApp.lastOpenFeedExpando.hideExpando();

      // Set last open expando
      theApp.lastOpenFeedExpando = this;

      if (!this.mouseOver)
        this.updateBorderBelow(true);
    }
  },

  setFocus: function() {
    this.ensureEls();
    this.expandoHeaderEl.focus();
  },

  onMouseDown: function(ev) {
    var target = ev.target || ev.srcElement;
    if (Event.isLeftClick(ev) && !targetContainedBy(target, "feed_list") && target.tagName != "HTML")
      this.hideExpando();
  },

  onKeyDown: function(ev) {
    var key = 0;

    if (ev.keyCode)
      key = ev.keyCode;
    else if (typeof(ev.which) != "undefined")
      key = ev.which;

    if (key == 27)
      this.hideExpando();
    
    if (key == 40 || key == 38)
    {
      // Find current expando in list
      for (var i = 0; i < iLike.FeedExpando.arr.length; i++)
      {
        if (iLike.FeedExpando.arr[i].id == this.id)
          break;
      }

      var item = -1;

      if (key == 38 && i > 0)
        item = i-1;

      if (key == 40 && i < iLike.FeedExpando.arr.length - 1)
        item = i+1;

      if (item >= 0)
      {
        iLike.FeedExpando.arr[item].showExpando();
        iLike.FeedExpando.arr[item].setFocus();
      }

      Event.stop(ev);
    }
  },

  fetchExpando: function(ev) {
    function onSuccess(request, json)
    {
      this.fetched = true;
      this.expandoEl.innerHTML = request.responseText;

      if (json && json.songs)
        theApp.createObjectsFromData(iLike.SongExpando, json.songs, "iLike.SongExpando");
    }
    
    function onFailure(request)
    {
      $(this.id + "_status").innerHTML = "Unable to load recent music activity. <a href='#' onclick=\"iLike.FeedExpando.byId('" + this.id + "').fetchExpando(event);\">Please try again</a>.";
    }

    var q = {};
    q.el_id = this.id;
    q.eventtype = this.feed_item.type;
    
    new Ajax.Request(theApp.baseUrl + "user/" + this.feed_item.useruri + "/feed_item_expando?" + $H(q).toQueryString(),
      {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
 
    if (ev)
      Event.stop(ev);
  },

  ensureEls: function() {
    if (!this.expandoEl)
      this.expandoEl = $(this.id + "_expando");
    if (!this.expandoHeaderEl)
      this.expandoHeaderEl = $(this.id + "_expando_header");
    if (!this.detailsLinkEl)
      this.detailsLinkEl = $(this.id + "_details_link");
  }
};


//----------------------------------------------------------------------------
//
// iLike.DebugDiv class
//
//----------------------------------------------------------------------------

iLike.DebugDiv = Class.create();

iLike.DebugDiv.prototype = {

  initialize: function() {
    if ($('banner'))
      Event.observe($('banner'), 'mousedown', this.onClick, false);
  },

  onClick: function(ev) {
    if (ev.ctrlKey)
    {
      theApp.debugTimer.reportCheckpoints();
      $('debug').toggle();
    }
  }
};


//----------------------------------------------------------------------------
//
// iLike.NetworkOverlay class
//
//----------------------------------------------------------------------------

iLike.NetworkOverlay = Class.create();

iLike.NetworkOverlay.prototype = {

  initialize: function() {
    if ($('network_overlay'))
      Event.observe($('network_overlay_toggle'), 'mousedown', this.onClick, false);
  },

  onClick: function(ev) {
     $('network_overlay').toggle();
     $('network_songs').toggle();
     document.cookie = "dismiss_overlay=1"
  }
};


//----------------------------------------------------------------------------
//
// iLike.InviteManually class
//
//----------------------------------------------------------------------------

iLike.InviteManually = Class.create();

iLike.InviteManually.prototype = {

  initialize: function() {
    this.expandoEl = $("invite_manually_expando");
    this.expandoSelectEl = $("invite_manually");

    Event.observe("invite_manually_select_btn", "click", this.onClick.bind(this), false);

    if (theApp.data.expand_invite_manually)
      this.showExpando();
  },

  onClick: function(ev) {
    if (!this.expandoEl.visible())
      this.showExpando();
    else
      this.hideExpando();

    Event.stop(ev);
  },

  showExpando: function() {
    // Hide previous expando if open
    if (theApp.lastOpenContactImporterExpando != null)
      theApp.lastOpenContactImporterExpando.hideExpando();

    this.expandoEl.show();
    this.expandoSelectEl.hide();

    // Set focus and scroll in view
    function setFocus()
    {
      $("send_and_continue_btn").focus();
      $("form_email_addresses").focus();
    }
    setTimeout(setFocus.bind(this), 1);

    // Set last open expando
    theApp.lastOpenContactImporterExpando = this;
  },

  hideExpando: function() {
    this.expandoEl.hide();
    this.expandoSelectEl.show();
  }

};


//----------------------------------------------------------------------------
//
// iLike.InviteViaLink class
//
//----------------------------------------------------------------------------

iLike.InviteViaLink = Class.create();

iLike.InviteViaLink.prototype = {

  initialize: function() {
    this.expandoEl = $("invite_via_link_expando");
    this.expandoSelectEl = $("invite_via_link");
    this.inviteUrl = null;

    Event.observe("invite_via_link_select_btn", "click", this.onClick.bind(this), false);
  },

  onClick: function(ev) {
    if (!this.expandoEl.visible())
    {
      this.showExpando();
      theApp.trackEvent("Ajax/ShowInviteViaLinkExpando");
    }
    else
    {
      this.hideExpando();
    }

    Event.stop(ev);
  },

  showExpando: function() {
    // Hide previous expando if open
    if (theApp.lastOpenContactImporterExpando != null)
      theApp.lastOpenContactImporterExpando.hideExpando();

    this.expandoEl.show();
    this.expandoSelectEl.hide();

    // Set focus
    function setFocus()
    {
      $("go_to_my_home_btn").focus();
    }
    setTimeout(setFocus.bind(this), 1);

    // Set last open expando
    theApp.lastOpenContactImporterExpando = this;

    // Fetch invite url
    if (!this.inviteUrl)
    {
      function onSuccess(request, json)
      {
        this.updateInviteUrl(request.responseText);
      }
      
      function onFailure(request)
      {
        this.updateInviteUrl();
      }
      
      new Ajax.Request(theApp.baseUrl + "account/generate_invite_link", {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
    }
  },

  updateInviteUrl: function(url) {
    if (!url || url == "")
    {
      $("invite_url").value = "Error generating invite url.  Try refreshing the page.";
    }
    else
    {
      $("invite_url").value = url;
      this.inviteUrl = url;
    }
  },

  hideExpando: function() {
    this.expandoEl.hide();
    this.expandoSelectEl.show();
  }

};


//----------------------------------------------------------------------------
//
// iLike.ContactImporter class
//
//----------------------------------------------------------------------------

iLike.ContactImporter = Class.create();

iLike.ContactImporter.prototype = {

  initialize: function(id, params) {
    // Member variables
    this.id = id;
    this.importer = params;
    this.expandoEl = $(id + "_expando");
    this.expandoSelectEl = $(id + "_expando_select");

    Event.observe(id + "_select_btn", 'click', this.onClickSelect.bind(this), false);
    Event.observe(id + "_select_btn_alt", 'click', this.onClickSelect.bind(this), false);

    if (this.importer.selected)
    {
      theApp.lastOpenContactImporterExpando = this;
      function setFocus()
      {
        $(this.id + "_password").focus();
      }
      setTimeout(setFocus.bind(this), 1);
    }
  },

  onClickSelect: function(ev) {
    if (!this.expandoEl.visible())
      this.showExpando();
    else
      this.hideExpando();

    Event.stop(ev);
  },

  showExpando: function() {
    // Hide previous expando if open
    if (theApp.lastOpenContactImporterExpando != null)
      theApp.lastOpenContactImporterExpando.hideExpando();

    this.expandoEl.show();
    this.expandoSelectEl.hide();

    // Set focus
    function setFocus()
    {
      if ($(this.id + "_username").value == "")
        $(this.id + "_username").focus();
      else
        $(this.id + "_password").focus();
    }
    setTimeout(setFocus.bind(this), 1);

    // If construction sign is showing (on find friends page), hide it
    if ($("construction_sign"))
      $("construction_sign").hide();

    // Set last open expando
    theApp.lastOpenContactImporterExpando = this;
  },

  hideExpando: function() {
    this.expandoEl.hide();
    this.expandoSelectEl.show();
  }

};


//----------------------------------------------------------------------------
//
// iLike.ContactImporterResults class
//
//----------------------------------------------------------------------------

iLike.ContactImporterResults = Class.create();

iLike.ContactImporterResults.prototype = {

  initialize: function() {
    this.service = theApp.data && theApp.data.service ? theApp.data.service : "";

    function onSuccess(request, json)
    {
      if (json && json.error)
      {
        this.showError(json.error_message);
        return;
      }

      $('import_contacts_loading').hide();
      $('choose_contact_list').innerHTML = request.responseText;

      if (json.num_contacts > 14)
        $("invite_select_all_checkbox").style.visibility = "visible";
    }
    
    function onFailure(request)
    {
      this.showError("HTTP " + request.status);
    }

    new Ajax.Request(theApp.baseUrl + "account/import_contacts_async", {onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    theApp.trackEvent("Ajax/Import" + this.service + "Contacts");
  },

  showError: function(errorMsg) {
    if (errorMsg)
      $('import_contacts_error_status').innerHTML = "(error: " + errorMsg + ")";

    $('import_contacts_loading').hide();
    $('import_contacts_error').show();

    if (errorMsg.indexOf("is empty") != -1)
      theApp.trackEvent("Ajax/Import" + this.service + "ContactsFailedEmptyPass");
    else if (errorMsg.indexOf("HTTP ") != -1)
      theApp.trackEvent("Ajax/Import" + this.service + "ContactsFailedHTTPError");
    else if (errorMsg.indexOf("invalid username") != -1)
      theApp.trackEvent("Ajax/Import" + this.service + "ContactsFailedInvalidPass");
    else
      theApp.trackEvent("Ajax/Import" + this.service + "ContactsFailedUnknown");
  }
};


//----------------------------------------------------------------------------
//
// iLike.DebugTimer class
//
//----------------------------------------------------------------------------

iLike.DebugTimer = Class.create();

iLike.DebugTimer.prototype = {

  // Initialize
  initialize: function() {
    this.times = new Array;
    this.reported = false;
  },

  // Checkpoint an instance in time
  log: function(name, t) {
    if (t == null)
      t = (new Date()).getTime();
    this.times.push({name:name, startTime:t});
    this.times[name] = this.times[this.times.length-1];
  },

  // Stop timing a checkpoint to get a specific duration
  end: function(name, t) {
    if (t == null)
      t = (new Date()).getTime();
    if (this.times[name])
      this.times[name].elapsed = t - this.times[name].startTime;
  },
  
  // Write array of timestamps
  reportCheckpoints: function() {
    var listEl = $('debug_timing_list');
    if (listEl)
    {
      listEl.innerHTML = "";

      // Add HTML parsing times
      if (!this.reported)
      {
        if (typeof(g_debugTimeStart) != "undefined")
          this.log("start parse HTML", g_debugTimeStart);

        if (typeof(g_debugTimeEnd) != "undefined")
          this.log("end parse HTML", g_debugTimeEnd);

        if (typeof(g_debugBrowserSniffStart) != "undefined")
          this.log("start browser sniff", g_debugBrowserSniffStart);

        if (typeof(g_debugBrowserSniffEnd) != "undefined")
          this.log("end browser sniff", g_debugBrowserSniffEnd);
      }

      // Sort array of timestamps
      var times = this.times.sortBy(function(o, i) {return o.startTime + i;});  // add i to get items with the same time in the right order

      function writeRow(s, n, e)
      {
        var row = document.createElement("li");
        row.innerHTML = "<div style='float:left; width:80px;'>" + (s == 0 ? "-" : s) + "</div>";
        row.innerHTML += "<div style='float:left;'>" + n + ((e != null) ? " (" + e + " ms)" : "") + "</div>";
        listEl.appendChild(row);
      }

      // Write array of times
      writeRow("<u>Started</u>", "<u>Checkpoint</u>", null);

      for (var i = 0; i < times.length; i++)
        writeRow((times[i].startTime - times[0].startTime), times[i].name, times[i].elapsed);

      this.reported = true;
    }
  }
};


//----------------------------------------------------------------------------
//
// iLike.LoginDialog class
//
//----------------------------------------------------------------------------

iLike.LoginDialog = Class.create();

iLike.LoginDialog.prototype = {

  initialize: function() {
    // Observe events on the sign in link and overlay
    Event.observe('login_link', 'mousedown', this.onClickLogin.bind(this), false);
    Event.observe('login_dialog', 'keypress', this.onKeyPress.bind(this), false);
    Event.observe('login_overlay', 'mousedown', this.hideDialog.bind(this), false);
    Event.observe('login_close', 'click', this.onClickClose.bind(this), false);
  },

  onClickClose: function(ev) {
    this.hideDialog();
    Event.stop(ev);
  },

  onClickLogin: function(ev) {
    // Toggle display of sign-in form and overlay div
    $('login_dialog').show();
    $('login_overlay').show();

    // Set focus to email field
    function setFocus()
    {
      $('login_email').focus();
    }
    setTimeout(setFocus, 1);

    // Hide music tastes flash widget if it's on the page
    if ($('my_plays_summary'))
      $('my_plays_summary').style.visibility = "hidden";

    Event.stop(ev);
  },
  
  onKeyPress: function(ev) {
    var esc = window.event ? 27 : ev.DOM_VK_ESCAPE;
    var key = window.event ? event.keyCode : ev.keyCode;
    if (key == esc)
      this.hideDialog();
  },

  hideDialog: function() {
    $('login_dialog').hide();
    $('login_overlay').hide();

    // Show music tastes if it's on the page
    if ($('my_plays_summary'))
      $('my_plays_summary').style.visibility = "";
  }

};


//----------------------------------------------------------------------------
//
// iLike.QuizArtistTile class
//
//----------------------------------------------------------------------------

iLike.QuizArtistTile = Class.create();

iLike.QuizArtistTile.prototype = {

  // Initialize
  initialize: function(parent, id, params)  {
    // Member variables
    this.parent = parent;
    this.id = id;
    this.iLikeBtnEl = $(this.id + '_ilike_btn');
    this.artist = params;

    // Observe events on the iLike button
    Event.observe(this.iLikeBtnEl, "mousedown", this.onQuizClickILike.bind(this), false);
    Event.observe(this.iLikeBtnEl, "click", function(ev){Event.stop(ev);}, false);
    Event.observe(this.iLikeBtnEl, "focus", function(ev){Event.element(ev).blur()}, false);  // Prevent focus rectangle in Firefox
  },

  onQuizClickILike: function(ev)  {
    if (Event.element(ev).hasClassName("artist_tile_ilike_btn_quiz_clicked"))
    {
      this.recordVote(false);
      Event.element(ev).className = "artist_tile_ilike_btn";
      Event.element(ev).title = "I like this artist";
    }
    else
    {
      this.recordVote(true)
      Event.element(ev).className = "artist_tile_ilike_btn_quiz_clicked";
      Event.element(ev).title = "Remove iLike";
    }
  },
  
  recordVote:function(ilike) {
    var q = {};
    q.artistid = this.artist.id;
    q.ilike = ilike == true ? 1 : 0;
    
    var h = $H(q);
    
    new Ajax.Request(theApp.baseUrl + "account/quiz_vote?" + h.toQueryString());
    theApp.trackEvent("Ajax/Quiz" + (ilike ? "Add" : "Remove") + "iLike");
  }
};

//----------------------------------------------------------------------------
//
// iLike.Quiz class
//
// Adds hookups for artist iLikes on quiz page
//
//----------------------------------------------------------------------------

iLike.Quiz = Class.create();

iLike.Quiz.prototype = {

  // Initialize  
  initialize: function() {
  
    // Hook up artist tiles and iLike buttons
    if (theApp.data && theApp.data.artist_tiles)
    {
      for (var i = 0; i < theApp.data.artist_tiles.length; i++)
        new iLike.QuizArtistTile(this, theApp.data.artist_tiles[i].id, theApp.data.artist_tiles[i].p);
    }
  }

};


//----------------------------------------------------------------------------
//
// iLike.DownloadNow class
//
//----------------------------------------------------------------------------

iLike.DownloadNow = Class.create();

iLike.DownloadNow.prototype = {

  initialize: function() {
    this.observeAll('download_now_button_win32');
    this.observeAll('download_now_button_macos');
    this.observeAll('download_now_link_win32');
    this.observeAll('download_now_link_macos');
  },

  observeAll: function(id) {
    if ($(id + "_1"))
      Event.observe(id + "_1", "click", this.onClick.bind(this));
    if ($(id + "_2"))
      Event.observe(id + "_2", "click", this.onClick.bind(this));
  },

  onClick: function(ev) {
    var platform = Event.element(ev).id.split("_")[3];
    var instance = Event.element(ev).id.split("_")[4];

    if (!$("download_now_tou_" + instance).checked)
    {
      alert("You need to accept the terms and conditions.");
      Event.stop(ev);
      return false;
    }

    // Cheap os-detection on the mac by checking applewebkit version
    var applewebkit_major = null;
    var regex = new RegExp("\\(.*\\) AppleWebKit/(.*) \\((.*)");
    var matches = regex.exec(navigator.userAgent);
    if (matches && matches.length > 1)
      applewebkit_major = parseInt(matches[1].split(".")[0]);

    if (document.URL.indexOf("?pretiger=1") != -1 || (applewebkit_major && applewebkit_major < 412))
    {
      alert("The iLike Sidebar for iTunes requires Mac OS X 10.4 or higher");
      Event.stop(ev);
    }
    else
    {
      if (theApp.data.download_on_submit)
      {
        var filename = (platform == "win32") ? theApp.data.download_filename_win32 : theApp.data.download_filename_macos;
        window.open(filename, 'download_sidebar', 'toolbar=0,location=no,directories=0,status=0,scrollbars=no,resizable=0,width=1,height=1,top=0,left=0');
        window.focus();
      }

      var form = $('download_now_form_' + instance);
      if (form)
        form.submit();
    }
  }
};


//----------------------------------------------------------------------------
//
// iLike.CreatingProfile class
//
//----------------------------------------------------------------------------

iLike.CreatingProfile = Class.create();

iLike.CreatingProfile.prototype = {

  initialize: function() {
    // Check listener data every 5s
    this.timer = setInterval(this.checkListenerData.bind(this), 5000);
    this.cancelTimer = setTimeout(this.showViewProfileLink.bind(this), 30000);
  },

  checkListenerData: function() {
  
    function onSuccess(request)
    {
      if (request.responseText == "true")
        this.showViewProfileLink();
    }
    
    new Ajax.Request(theApp.baseUrl + "account/has_listener", {onSuccess: onSuccess.bind(this)});
  },

  cancelTimers: function() {
    clearInterval(this.timer);
    clearTimeout(this.cancelTimer);
  },

  showViewProfileLink: function() {
    this.cancelTimers();
    $('creating_profile_spinner').hide();
    $('creating_profile_view').show();
  }
};


//----------------------------------------------------------------------------
//
// iLike.ChooseContacts class
//
//----------------------------------------------------------------------------

iLike.ChooseContacts = Class.create();

iLike.ChooseContacts.prototype = {

  initialize: function(list) {
    this.selectBtnEl = $('form_select_all');
    this.listEl = $(list);
    
    Event.observe(this.selectBtnEl, "click", this.onClickSelectDeselect.bind(this), false);
  },

  onClickSelectDeselect: function() {
    var checked = this.selectBtnEl.checked;

    var list = this.listEl.getElementsByTagName("input");
    for (var i = 0; i < list.length; i++)
      list[i].checked = checked;
  }
};


//----------------------------------------------------------------------------
//
// iLike.EditPhoto class
//
//----------------------------------------------------------------------------

iLike.EditPhoto = Class.create();

iLike.EditPhoto.prototype = {

  initialize: function() {
    this.file = $('picture_file');
    this.btn = $('edit_photo_submit_btn');

    Event.observe('edit_photo', "click", this.showEdit.bind(this), false);
    Event.observe(this.file, "keyup", this.updateButton.bind(this), false);
    Event.observe(this.file, "change", this.updateButton.bind(this), false);
    Event.observe('cancel_edit_photo', "click", this.showPhoto.bind(this), false);
  },

  updateButton: function() {
    disabled = this.file.value == "" ? true : false;

    var classes = this.btn.classNames().toArray();

    // Create class name based on base class (e.g. 'std_btn_small' ==> 'std_btn_small_disabled')
    if (classes.length > 1)
      var disabledName = classes[1] + "_disabled";

    if (disabled)
    {
      this.btn.addClassName(disabledName);
      this.btn.disabled = true;
    }
    else
    {
      this.btn.removeClassName(disabledName);
      this.btn.disabled = false;
    }
  },

  showPhoto: function(ev) {
    $('show_photo_expando').show();
    $('edit_photo_expando').hide();
    Event.stop(ev);
  },

  showEdit: function(ev) {
    this.updateButton();
    $('show_photo_expando').hide();
    $('edit_photo_expando').show();
    Event.stop(ev);
  }
};

//----------------------------------------------------------------------------
//
// iLike.UserLocationFields class
//
//----------------------------------------------------------------------------

iLike.UserLocationFields = Class.create();

iLike.UserLocationFields.prototype = {
  
  initialize: function() {
    this.country_select = $('user_country');
    this.custom_field = null;
    this.currently_shown_field = null;
    Event.observe(this.country_select, "keyup", this.showCustomFields.bind(this), false);
    Event.observe(this.country_select, "change", this.showCustomFields.bind(this), false);
    
    this.showCustomFields(null);
  },
  
  showCustomFields: function(ev) {
    for(i = 0; i < theApp.data.custom_location_fields.length;i++)
    {
      if(theApp.data.custom_location_fields[i].id == this.country_select.value)
      {
        this.custom_field = theApp.data.custom_location_fields[i]        
        break;
      }      
    }
    
    if(this.custom_field)
    {
      this.currently_shown_field = $(this.custom_field.show_field + '_container')
      $(this.custom_field.show_field + "_label").innerHTML = this.custom_field.text_label;
      this.currently_shown_field.show();      
    } 
    else 
    {
      if(this.currently_shown_field)
      {
        this.currently_shown_field.hide();
        this.currently_shown_field = null;
      }
    }
    this.custom_field = null;
    if(ev)
      Event.stop(ev);
  }

};

//----------------------------------------------------------------------------
//
// iLike.EditProfile class
//
//----------------------------------------------------------------------------

iLike.EditProfile = Class.create();

iLike.EditProfile.prototype = {

  initialize: function() {
    if($('user_screenname'))
      this.screennameExists = true;
    else 
      this.screennameExists = false;

    this.more_about_me = $('user_more_about_me');
    this.more_about_me_counter = $('user_more_about_me_counter');
    this.more_about_me_counter.innerHTML = this.more_about_me.value.length;
    this.postalcode = $('user_postalcode');
    this.country_select = $('user_country');
    this.auto_location_cb = $('auto_location');
    this.user_location = $('user_location');
    this.custom_location_field = null;
    this.custom_location_regex = null;


    Event.observe('auto_favartist', "click", this.onClickCheckFavArtist.bind(this), false);

    Event.observe(this.more_about_me, "keydown", this.limitText.bind(this), false);
    Event.observe(this.more_about_me, "keyup", this.limitText.bind(this), false);

    Event.observe(this.country_select, "keyup", this.onCountryChange.bind(this), false);
    Event.observe(this.country_select, "change", this.onCountryChange.bind(this), false);
    new Form.Element.Observer(this.postalcode, 0.5, this.autofillLocation.bind(this));

    Event.observe('auto_location', "click", this.onClickCheckAutoLoc.bind(this), false);

    if(this.screennameExists)
    {
      // Checks screenname in form on page load, incase form is populated with invalid value
      if($('user_screenname').disabled == false)
      {
        this.checkScreenname($('user_screenname'), $('user_screenname').value);
        this.updateMyUrlExample();
      }

      new Form.Element.Observer('user_screenname', 1.0, this.checkScreenname.bind(this));
      Event.observe($('user_screenname'), "focus", this.showScreennameToolTip.bind(this), false);
      Event.observe($('user_screenname'), "keyup", this.updateMyUrlExample.bind(this), false);
      
      this.setupCustomFieldsData();
    }
  },
  
  setupCustomFieldsData: function() {
    this.custom_location_field = null;
    this.custom_location_regex = null;
        
    for(i = 0; i < theApp.data.custom_location_fields.length;i++)
    {
      if(theApp.data.custom_location_fields[i].id == this.country_select.value)
      {
        this.custom_location_field = theApp.data.custom_location_fields[i]        
        break;
      }      
    }
    
    if(this.custom_location_field)
    {
      if (this.custom_location_field.regex)
        this.custom_location_regex = new RegExp(this.custom_location_field.regex);
    }
  },
  
  onCountryChange: function() {
    this.setupCustomFieldsData();
    
    // this pause allows the code for custom location fields to process
    setTimeout(this.autofillLocation.bind(this), 1);
  },

  autofillLocation: function()
  {
    function onSuccess(request)
    {
      result = eval('(' + request.responseText + ')');
      if(result.success == true)
        this.user_location.value = result.location;
      else
        this.user_location.value = "";
    }

    if(!this.auto_location_cb.checked)
    {
      this.user_location.value = '';
      if(this.custom_location_field)
      {
        switch (this.custom_location_field.show_field)
        {
          case 'user_postalcode':
            var matches = this.custom_location_regex.exec(this.postalcode.value);              
            if (matches && matches.length > 1)
              new Ajax.Request(theApp.baseUrl + 'account/get_location_from_zip', { parameters:'z=' + encodeURIComponent(this.postalcode.value) + "&c=" + encodeURIComponent(this.country_select.value), onSuccess: onSuccess.bind(this) });          
            break;
        }
      }
      else
      {
        if(this.country_select.value > 1)
          this.user_location.value = this.country_select.options[this.country_select.selectedIndex].text;
        else
          this.user_location.value = '';
      }
    }
  },

  limitText: function(ev)
  {
    if (this.more_about_me.value.length > 1200)
      this.more_about_me.value = this.more_about_me.value.substring(0, 1200);

    this.more_about_me_counter.innerHTML = this.more_about_me.value.length;
  },

  updateMyUrlExample: function()
  {
    $('user_screenname_example').innerHTML = $('user_screenname').value;
  },

  showScreennameToolTip: function(ev)
  {
    this.updateMyUrlExample();
    $('user_screenname_tip').show();
  },

  checkScreenname: function (element, value)
  {
    function onSuccess(request)
    {
      this.result = eval('(' + request.responseText + ')');
      if(this.result.success == true)
      {
        $('my_url_status').className = 'my_url_valid';
        $('my_url_status_text').className = 'my_url_status_success';
      }
      else
      {
        $('my_url_status').className = 'my_url_invalid';
        $('my_url_status_text').className = 'my_url_status_error';
      }
      $('my_url_status').title = this.result.message;
      $('my_url_status_text').innerHTML = this.result.message;
    }

    function onFailure(request)
    {
      $('my_url_status').className = 'my_url_error';
      $('my_url_status').title = 'error validating url';
      $('my_url_status_text').innerHTML = 'error validating url';
    }

    if(element.disabled)
    {
      $('my_url_status').className = 'my_url_valid';
    }
    else
    {
      $('my_url_status').className = 'my_url_validating';
      $('my_url_status').title = 'validating...';
      $('my_url_status_text').innerHTML = 'validating...';
      $('my_url_status_text').className = 'my_url_status_validating';
      new Ajax.Request(theApp.baseUrl + 'account/validate_screenname', { parameters:'screenname=' + encodeURIComponent(value), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this) });
    }
  },

  onClickCheckAutoLoc: function() {
    if (!this.auto_location_cb.checked)
    {
      this.user_location.disabled = true;
      this.autofillLocation();
    }
    else
    {
      this.user_location.disabled = false;
    }
  },

  onClickCheckFavArtist: function() {
    if ($('auto_favartist').checked)
    {
      $('user_favartist').disabled = true;
      $('user_favartist').value = theApp.data.edit_profile.most_played_artist;
    }
    else
    {
      $('user_favartist').disabled = false;
      $('user_favartist').value = "";
    }
  }
};


//----------------------------------------------------------------------------
//
// iLike.AddComment class
//
//----------------------------------------------------------------------------

iLike.AddComment = Class.create();

iLike.AddComment.prototype = {

  initialize: function() {
    this.addBtn = $('add_comment');

    Event.observe(this.addBtn, "mousedown", this.onClickAdd.bind(this), false);
    Event.observe(this.addBtn, "click", function(ev){Event.stop(ev);}, false);
    Event.observe(this.addBtn, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox

    Event.observe("cancel_comment", "click", this.onClickCancel.bind(this), false);
  },

  onClickAdd: function(ev) {
    if (!$('add_comment_expando').visible())
    {
      $('add_comment_expando').show();

      function focus() { $('comment_body').focus(); }
      setTimeout(focus, 1);
    }
    else
    {
      $('add_comment_expando').hide();
    }
  },

  onClickCancel: function(ev) {
    $('add_comment_expando').hide();
    Event.stop(ev);
  }
};


//----------------------------------------------------------------------------
//
// iLike.SendUserMessage class
//
//----------------------------------------------------------------------------

iLike.SendUserMessage = Class.create();

iLike.SendUserMessage.prototype = {

  initialize: function() {
    this.addBtn = $('send_user_message');

    Event.observe(this.addBtn, "mousedown", this.onClickAdd.bind(this), false);
    Event.observe(this.addBtn, "click", function(ev){Event.stop(ev);}, false);
    Event.observe(this.addBtn, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox

    Event.observe("submit_user_message", "click", this.onClickSubmit.bind(this), false);
    Event.observe("cancel_user_message", "click", this.onClickCancel.bind(this), false);
  },

  onClickAdd: function(ev) {
    if (!$('send_user_message_expando').visible())
    {
      $('send_user_message_expando').show();

      function focus() { $('send_user_message_body').focus(); }
      setTimeout(focus, 1);
    }
    else
    {
      $('send_user_message_expando').hide();
    }
  },

  displayError: function() {
    $("send_user_message_status").innerHTML = "Unable to send message.&nbsp;";
    this.addBtn.innerHTML = "Try again?";
  },

  displaySuccess: function() {
    $("send_user_message_status").innerHTML = "Message sent!&nbsp;";
    this.addBtn.innerHTML = "Send another?";
  },

  displaySending: function() {
    $("send_user_message_status").innerHTML = "";
    this.addBtn.innerHTML = "Sending...";
  },

  onClickCancel: function(ev) {
    $('send_user_message_expando').hide();
    Event.stop(ev);
  },

  onClickSubmit: function(ev) {
    function onFailure()
    {
      this.displayError();
    }

    function onSuccess(request, json)
    {
      // TODO: find out why json is undefined in safari
      if (!json || json.sent_message)
      {
        this.displaySuccess();
        $("send_user_message_body").value = "";
      }
      else
      {
        this.displayError();
      }
    }

    var postBody = {};
    postBody.send_user_message_body = $("send_user_message_body").value;
    
    new Ajax.Request(
      $("submit_user_form").action,
      {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    $('send_user_message_expando').hide();
    this.displaySending();

    Event.stop(ev);
  }
};


//----------------------------------------------------------------------------
//
// iLike.ArtistFanButton class
//
//----------------------------------------------------------------------------

iLike.ArtistFanButton = Class.create();

iLike.ArtistFanButton.prototype = {

  initialize: function() {
    this.btnAdd = $('artist_add');
    this.btnRemove = $('artist_remove');
    this.commentAllow = $('comment_allow');
    this.commentDisallow = $('comment_disallow');
    this.commentiLike = $('comment_ilike');

    if (theApp.data && typeof(theApp.data.artist_is_fan) != "undefined")
    {
      this.uri = theApp.data.artist_uri;
      this.isFan = theApp.data.artist_is_fan;
      Event.observe(this.btnAdd, "click", this.onClick.bind(this), false);
      Event.observe(this.btnRemove, "click", this.onClick.bind(this), false);
      if (this.commentiLike) Event.observe(this.commentiLike, "click", this.onClick.bind(this), false);
    }
  },

  onClick: function(ev) {
    if (theApp.data && theApp.data.logged_in)
    {
      function onSuccess(request)
      {
        $('fans').innerHTML = request.responseText;
      }

      var postBody = {};
      postBody.cur_page = theApp.data.artist_action;
      postBody.ilike = this.isFan ? "false" : "true";
      
      new Ajax.Request(
        this.uri + "/addremove_async",
        {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this)});

      if (this.isFan)
      {
        this.isFan = false;
        this.btnAdd.show();
        this.btnRemove.hide();
        if (this.commentAllow) this.commentAllow.hide();
        if (this.commentDisallow) this.commentDisallow.show();
      }
      else
      {
        this.isFan = true;
        this.btnAdd.hide();
        this.btnRemove.show();
        if (this.commentAllow) this.commentAllow.show();
        if (this.commentDisallow) this.commentDisallow.hide();
      }
    }
    else
    {
      window.location = this.uri + "/add";
    }

    Event.stop(ev);
  }
};


//----------------------------------------------------------------------------
//
// iLike.UserMenu class
//
//----------------------------------------------------------------------------

iLike.UserMenu = Class.create();

iLike.UserMenu.prototype = {

  initialize: function() {
    this.timer = null;

    this.mouseMoveListener = this.onMouseMove.bindAsEventListener(this);
    Event.observe('user_home_link', "mouseover", this.showMenu.bind(this), false);
  },

  showMenu: function() {
    $('user_menu').show();
    Event.observe(document, "mousemove", this.mouseMoveListener, false);
  },
  
  onMouseMove: function(ev) {
    var target = ev.target || ev.srcElement;
    if (!targetContainedBy(target, "user_menu_list") && !targetContainedBy(target, "user_home_link"))
    {
      // Set a short timer before hiding the menu.  Cancel the timer if we mouse back over in the meantime
      if (!this.timer)
        this.timer = setTimeout(this.hideMenu.bind(this), 150);
    }
    else
    {
      if (this.timer)
      {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  },

  hideMenu: function() {
    $('user_menu').hide();
    Event.stopObserving(document, "mousemove", this.mouseMoveListener, false);
    this.timer = null;
  }
};


// True if a mouseout event resulted in actually leaving the specified container,
// versus mousing out into a tag contained by the container
function targetContainedBy(target, id)
{
  while (target && target.id != id && target.nodeName != 'BODY')
    target = target.parentNode;

  if (target && target.id == id)
    return true;

  return false;
}


function findParentByNodeName(id, nodeName, skipCurrent)
{
  var el = $(id);
  if (skipCurrent)
    el = el.parentNode;

  while (el.nodeName != nodeName && el.nodeName != "BODY")
    el = el.parentNode;

  return (el.nodeName == nodeName) ? el : null;
}


function findParentByClassName(id, className, skipCurrent)
{
  var el = $(id);
  if (skipCurrent)
    el = el.parentNode;

  while (!Element.hasClassName(el, className) && el.nodeName != "BODY")
    el = el.parentNode;

  return (Element.hasClassName(el, className)) ? el : null;
}


//----------------------------------------------------------------------------
//
// iLike.Tour class
//
//----------------------------------------------------------------------------

iLike.Tour = Class.create();

iLike.Tour.prototype = {

  initialize: function() {
    this.lastActiveId = null;

    // Can support up to 9 tabs
    for (var i = 1; i < 10; i++)
    {
      var a = $("tour_tab" + i);
      if (!a)
        break;

      var el = $("tour_page" + i);
      if (el.visible())
        this.lastActiveId = i;

      Event.observe(a, "mousedown", this.showTab.bind(this), false);
      Event.observe(a, "click", function(ev){Event.stop(ev);}, false);
      Event.observe(a, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
    }
  },

  showTab: function(ev) {
    var a = Event.element(ev);
    a.className = "current";
    var id = a.id.substr(a.id.length - 1);

    if (this.lastActiveId && this.lastActiveId != id)
    {
      $("tour_page" + this.lastActiveId).hide();
      $("tour_tab" + this.lastActiveId).className = "inactive";
    }

    this.lastActiveId = parseInt(id);
    $("tour_page" + this.lastActiveId).show();

    theApp.trackEvent("Ajax/Tour" + this.lastActiveId);
  }
};


//----------------------------------------------------------------------------  
//  
// iLike.NewFeaturesBanner class  
//  
//----------------------------------------------------------------------------  
  
iLike.NewFeaturesBanner = Class.create();  
  
iLike.NewFeaturesBanner.prototype = {  
  
  initialize: function() {  
    Event.observe("close_new_features_banner", "mousedown", this.onClick.bind(this), false);  
  },  
    
  onClick: function() {  
    $("new_features_banner").hide();  
    document.cookie = "hide_feature_banner_022707=1; domain=ilike.com; path=/; expires=Wed 28 Mar 2007 00:00:00 GMT";  
  }  
};  


//----------------------------------------------------------------------------
//
// iLike.HideAllPlaylists class
//
//----------------------------------------------------------------------------

iLike.HideAllPlaylists = Class.create();

iLike.HideAllPlaylists.prototype = {
  initialize: function() {
    this.savingText = "(saving...)";
    this.errorText = "(error saving)";
    this.savededText = "(saved)";
    
    Event.observe("hide_playlists", "click", this.onCheck.bind(this), false)
  },
  
  onCheck: function(ev) {
    var statusEl = $("hide_playlists_status");
    checked = Event.element(ev).checked
    
    if (checked)
      $("manage_playlist_data").hide();
    else
      $("manage_playlist_data").show();
    
    var postBody = {};
    postBody.hide = checked ? "1" : "0";
    
    function onFailure()
    {
      statusEl.innerHTML = this.errorText;
    }

    function onSuccess(request, json)
    {
      if (!json || !json.errors)
        statusEl.innerHTML = this.savededText;
      else
        statusEl.innerHTML = this.errorText;
    }
    
    new Ajax.Request(
      theApp.baseUrl + "account/submit_hide_all_playlists",
      {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
      
    // Update status    
    statusEl.innerHTML = this.savingText;
    
  }
};

//----------------------------------------------------------------------------
//
// iLike.HideArtists class
//
//----------------------------------------------------------------------------

iLike.HideArtists = Class.create();

iLike.HideArtists.prototype = {

  initialize: function() {
    this.blockingText = "(blocking...)";
    this.unblockingText = "(unblocking...)";
    this.errorText = "(error updating)";
    this.blockedText = "(blocked)";
    this.unblockedText = "";
    
    var items = $("hide_artists").getElementsByTagName("input");
    for (var i = 0; i < items.length; i++)
      Event.observe(items[i], "click", this.onCheck.bind(this), false);
  },

  onCheck: function(ev) {
    var id = parseInt(Event.element(ev).id.substr("artist_".length));
    var statusEl = $("artist_" + id + "_status");

    function onFailure()
    {
      statusEl.innerHTML = this.errorText;
    }

    function onSuccess(request, json)
    {
      if (!json || !json.errors)
      {
        if (statusEl.innerHTML == this.unblockingText)
          statusEl.innerHTML = this.unblockedText;
        else
          statusEl.innerHTML = this.blockedText;
      }
      else
      {
        statusEl.innerHTML = this.errorText;
      }
    }

    // Construct post parameters
    var postBody = {};
    postBody.artist_id = id;
    postBody.hide = Event.element(ev).checked ? "1" : "0";

    // Send request
    new Ajax.Request(
      theApp.baseUrl + "account/submit_hide_artist",
      {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    // Update status
    if (!Event.element(ev).checked)
      statusEl.innerHTML = this.unblockingText;
    else
      statusEl.innerHTML = this.blockingText;
  }
};

iLike.AsyncFeed = Class.create();

iLike.AsyncFeed.prototype = {

  initialize: function(params) {

    this.elName = params.async_feed_view;
    this.items_needed = params.async_feed_items_needed;

    function onFailure()
    {
      var feedEl = $(this.elName);
      
      if (feedEl != null)
      {
        feedEl.innerHTML = "<br/>Error occured.  Please <a href='http://faq.ilike.com/index.php?action=contact'>contact iLike support</a>.";
      }        
    }
    
    function onSuccess(response, json)
    {
      var div = document.createElement("div");
      div.innerHTML = response.responseText;
        
      for (var i = 0; i < div.childNodes.length; i++)
      {
        switch (div.childNodes[i].id)
        {
          case "feed_response":        
            var feedEl = $(this.elName);
            
            if (feedEl != null)
              feedEl.innerHTML = div.childNodes[i].innerHTML;
             break;
             
          case "json":
            var json = eval('(' + div.childNodes[i].innerHTML + ')');
            if (json != null && json.feed != null)
            {
              theApp.createObjectsFromData(iLike.FeedExpando, json.feed, "iLike.FeedExpando");
            }
            break;
          }
       }    
    }

    var q = {};
    q.items_needed = this.items_needed;
    if (iLike.FeedExpando && iLike.FeedExpando.arr)
      q.seed = iLike.FeedExpando.arr.length;

    var h = $H(q);

    new Ajax.Request(
  theApp.baseUrl + "home/twins_feed_async?" + h.toQueryString(),
        {method: "post", onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
  
  }

};


iLike.UserCompat = Class.create();

iLike.UserCompat.prototype = {

  initialize: function(params) {    
    
    function onFailure()
    {
      this.displayError(params.request_twins, params.request_score)             
    }
    
    function onSuccess(response, json)
    {
      var div = document.createElement("div");
      div.innerHTML = response.responseText;        
      
      var twinsDisplayed = false;
      for (var i =0; i < div.childNodes.length; i++)
      {
        switch (div.childNodes[i].id)
        {
          case "compat_score":
            var compatEl = $("compat_score");
            var compatContainerEl = $("compat_container");
     
            if (compatEl != null)
              compatEl.innerHTML = div.childNodes[i].innerHTML;
              
            if (compatContainerEl != null)
              compatContainerEl.className = json.compat_class; 
              
            break;
            
          case "twins":
            var twinsEl = $("twins");
            
            if (twinsEl != null)
            {
              twinsEl.innerHTML = div.childNodes[i].innerHTML;
            }
            twinsDisplayed = true;
             
            break;                       
        }
      }              

      if (!twinsDisplayed && params.request_twins)
      {
        this.displayError(true, true);
      }
    }
    
    var q = {};
    q.twins = params.request_twins == true ? 1 : 0;
    q.score = params.request_score == true ? 1 : 0;
    
    var h = $H(q);
    
    // Send request to calculate compat
    new Ajax.Request(
        theApp.baseUrl + "user/" + params.target_user + "/calc_compat_async?" + h.toQueryString(),
        {method: "post", onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});
  },
  
  displayError: function(requestTwins, requestScore) {
    // Hide twins module if any error occurs.
    if (requestTwins) 
    {
      var twinsEl = $("twins");
      
      if (twinsEl != null)
      {
        twinsEl.innerHTML= "";
      }    
    }
  }  
};

//----------------------------------------------------------------------------
//
// iLike.ArtistSongUpload class
//
//----------------------------------------------------------------------------

iLike.ArtistSongUpload = Class.create();

function uploadCompleteData(data) {
  window.location.reload();
}

function uploadError(error) {
  $('upload_progress_overlay').show();
    $('login_overlay').show();
    $('upload_error_overlay').show();
}

function uploadProgress(bytesLoaded, bytesTotal) {
  progress = $('upload_progress');
  if (progress) {
    percentage = bytesLoaded / bytesTotal * 100;
    if (0 < percentage) {
      progress.style.borderRight = "solid 2px #cccccc";
      progress.style.visibility = "visible";
      progress.style.width = percentage + "%";
    }
  }
}

iLike.ArtistSongUpload.prototype = {

  initialize: function() {
    this.songUploadLink = $('song_upload_link');
    this.closeSongUploadLink = $('close_song_upload_link');
    this.uploadFormContainer = $('song_upload_form_container');
    this.uploadForm = $('song_upload_form');
    this.uploadCancelButton = $('upload_cancel_button');

    var swf = new SWFObject(theApp.baseUrl + "swfs/uploader.swf", "upload_swf", "272", "24", "9", "#ffffff", true);
    swf.addParam("allowScriptAccess", "sameDomain");
    swf.addVariable("backgroundColor", "#e2e5e9");
    swf.addVariable("fileFieldName", "upload[song_file]");
    swf.addVariable("fileFilter", "MP3 (*.mp3):*.mp3");
    swf.write("upload_field");
    this.uploadSwf = $('upload_swf');
    window["upload_swf"] = this.uploadSwf;
    Event.observe(this.uploadCancelButton, "mousedown", this.onCancel.bind(this), false);
    Event.observe(this.uploadCancelButton, "click", function(ev){Event.stop(ev);}, false)
    
    Event.observe(this.songUploadLink, "mousedown", this.openUploadForm.bind(this), false);
    Event.observe(this.songUploadLink, "click", function(ev){Event.stop(ev);}, false);
    
    Event.observe(this.closeSongUploadLink, "mousedown", this.closeUploadForm.bind(this), false);
    Event.observe(this.closeSongUploadLink, "click", function(ev){Event.stop(ev);}, false);
    
    Event.observe(this.uploadForm, "submit", this.onUploadFormSubmit.bind(this), false);
  },
  
  openUploadForm: function(ev)
  {
    this.songUploadLink.hide();
    this.closeSongUploadLink.show();
    this.uploadFormContainer.show();
  },

  closeUploadForm: function(ev)
  {
    this.songUploadLink.show();
    this.closeSongUploadLink.hide();
    this.uploadFormContainer.hide();
  },
  
  onUploadFormSubmit: function(ev)
  {
    Event.stop(ev);
    if (this.uploadSwf.upload(this.uploadForm.action, Form.serialize(this.uploadForm), document.cookie)) {
      Form.disable(this.uploadForm);
      $('upload_field').style.visibility = 'hidden';
      $('login_overlay').show();
      $('upload_progress_overlay').show();
    }
  },

  onCancel: function(ev)
  {
    this.uploadSwf.cancel();
    window.location.reload();
  }
};

iLike.ArtistConcertUpload = Class.create();

iLike.ArtistConcertUpload.prototype = {

  initialize: function() {
    this.concertUploadLink = $('concert_upload_link');
    this.closeConcertUploadLink = $('close_concert_upload_link');
    this.uploadFormContainer = $('concert_upload_form_container');
    this.uploadForm = $('concert_upload_form');
    this.stateSelect = $('state_select');
    this.provSelect = $('province_select');
    this.countrySelect = $('country_select');
    this.streetInput = $("street");
    this.cityInput = $("city");
    this.postalCodeInput = $("postalcode");
    
    Event.observe(this.concertUploadLink, "mousedown", this.openUploadForm.bind(this), false);
    Event.observe(this.concertUploadLink, "click", function(ev){Event.stop(ev);}, false);
    
    Event.observe(this.closeConcertUploadLink, "mousedown", this.closeUploadForm.bind(this), false);
    Event.observe(this.closeConcertUploadLink, "click", function(ev){Event.stop(ev);}, false);
    
    Event.observe(this.uploadForm, "submit", this.onUploadFormSubmit.bind(this), false);
    Event.observe(this.countrySelect, "change", this.onCountryChange.bind(this), false);
  },
  
  openUploadForm: function(ev)
  {
    this.concertUploadLink.hide();
    this.closeConcertUploadLink.show();
    this.uploadFormContainer.show();
    this.onCountryChange();
  },

  closeUploadForm: function(ev)
  {
    this.concertUploadLink.show();
    this.closeConcertUploadLink.hide();
    this.uploadFormContainer.hide();
  },

  onCountryChange: function(ev)
  {
    if (this.countrySelect.value == "CA") {
      this.stateSelect.hide();
      this.provSelect.show();
    } else {
      this.stateSelect.show();
      this.provSelect.hide();
    }
  },
  
  onUploadFormSubmit: function(ev)
  {
    $('login_overlay').show();
    $('upload_overlay').show();
  },
  updateVenueName: function(element, selectedElement)
  {
    var street = Element.collectTextNodes(document.getElementsByClassName("street", selectedElement)[0], "street");
    var country = Element.collectTextNodes(document.getElementsByClassName("country", selectedElement)[0], "country");
    var state = Element.collectTextNodes(document.getElementsByClassName("state", selectedElement)[0], "state");
    var city = Element.collectTextNodes(document.getElementsByClassName("city", selectedElement)[0], "city");
    var zip = Element.collectTextNodes(document.getElementsByClassName("zip", selectedElement)[0], "zip");
    this.streetInput.value = street;
    this.cityInput.value = city;
    this.postalCodeInput.value = zip;
    if (country == "US") {
      $("state_select").value = state;
    } else {
      $("province_select").value = state;
    }
    this.countrySelect.value = country;
    this.onCountryChange();
  }

};

//----------------------------------------------------------------------------
//
// iLike.ArtistBio class
//
//----------------------------------------------------------------------------

iLike.ArtistBio = Class.create();

iLike.ArtistBio.prototype = {

  initialize: function() {
    this.bio = $('artist_bio');
    this.toggleLink = $('toggle_bio_link');
    
    if (this.toggleLink && this.bio)
    {
      this.showing = false;
      Event.observe(this.toggleLink, "mousedown", this.onToggle.bind(this), false);
      Event.observe(this.toggleLink, "click", function(ev){Event.stop(ev);}, false);
      Event.observe(this.toggleLink, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
    }
  },
  
  onToggle: function(ev)
  {
    if (this.showing)
    {
      this.bio.hide();
      this.toggleLink.innerHTML = "Show artist bio";
      this.showing = false;
    }
    else
    {
      this.bio.show();
      this.toggleLink.innerHTML = "Hide artist bio";
      this.showing = true;
    }
    
    Event.stop(ev);
  }
};

//----------------------------------------------------------------------------
//
// iLike.MoreAboutMe class
//
//----------------------------------------------------------------------------

iLike.MoreAboutMe = Class.create();

iLike.MoreAboutMe.prototype = {

  initialize: function() {
    this.aboutMe = $('about_me');
    this.toggleMoreLink = $('toggle_about_me_more');
    this.toggleLessLink = $('toggle_about_me_less');
    this.aboutMeMore = $('about_me_more');
    this.aboutMeLess = $('about_me_less');

    if (this.toggleMoreLink && this.aboutMe)
    {
      this.showing = false;
      Event.observe(this.toggleMoreLink, "mousedown", this.onClickShow.bind(this), false);
      Event.observe(this.toggleMoreLink, "click", function(ev){Event.stop(ev);}, false);
      Event.observe(this.toggleMoreLink, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
      Event.observe(this.toggleLessLink, "mousedown", this.onClickHide.bind(this), false);
      Event.observe(this.toggleLessLink, "click", function(ev){Event.stop(ev);}, false);
      Event.observe(this.toggleLessLink, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
    }
  },

  onClickShow: function(ev)
  {
    this.aboutMe.show();
    this.aboutMeLess.show();
    this.aboutMeMore.hide();
    this.showing = true;

    Event.stop(ev);
  },

  onClickHide: function(ev)
  {
    this.aboutMe.hide();
    this.aboutMeLess.hide();
    this.aboutMeMore.show();
    this.showing = false;

    Event.stop(ev);
  }
};


//----------------------------------------------------------------------------
//
// iLike.MyPick class
//
//----------------------------------------------------------------------------

iLike.MyPick = Class.create();

iLike.MyPick.prototype = {

  initialize: function(pick) {
    this.deleteBtn = $("delete_pick" + pick.id);
    this.id = pick.id;
    this.type = pick.type;
    
    if (this.deleteBtn)
    {
      Event.observe(this.deleteBtn, "click", this.onClickDelete.bind(this), false);
    }
  },
  
  onClickDelete: function(ev) {
    function onFailure()
    {
      $('delete_pick_status' + this.id).innerHTML = "(error deleting)";
    }

    function onSuccess(request, json)
    {
      if (json && json.error)
      {
        $('delete_pick_status' + this.id).innerHTML = "(error deleting)";
        return;
      }

      // Remove the node
      $('pick' + this.id).hide();
    }
    
    var postBody = {};
    postBody.pickid = this.id;
    
    new Ajax.Request(
      theApp.baseUrl + "account/delete_" + this.type,
      {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    this.deleteBtn.innerHTML = "";
    $('delete_pick_status' + this.id).show();

    Event.stop(ev);
  }
  
};

//----------------------------------------------------------------------------
//
// iLike.InboxMessage class
//
//----------------------------------------------------------------------------

iLike.InboxMessage = Class.create();

iLike.InboxMessage.prototype = {

  initialize: function(id, tag) {
    this.id = id;
    this.envelope_id = tag;
    this.expandoEl = null;
    this.replyBodyEl = null;
  },

  onClickReply: function(ev) {
    if (!this.expandoEl)
      this.expandoEl = $(this.id + "_reply_expando");

    if (!this.replyBodyEl)
      this.replyBodyEl = $(this.id + "_reply_body");

    if (!this.expandoEl.visible())
      this.showExpando();
    else
      this.hideExpando();

    Event.stop(ev);
  },

  showExpando: function() {
    // Hide previous expando if open
    if (theApp.lastOpenMessageReplyExpando != null)
      theApp.lastOpenMessageReplyExpando.hideExpando();

    function focus() { this.replyBodyEl.focus(); }
    setTimeout(focus.bind(this), 1);
    this.expandoEl.show();

    // Set last open expando
    theApp.lastOpenMessageReplyExpando = this;
  },

  hideExpando: function() {
    this.expandoEl.hide();
  },

  onClickCancel: function(ev) {
    this.hideExpando();
    Event.stop(ev);
  },

  onClickSubmit: function(ev) {
    function onFailure()
    {
      this.displayError();
    }

    function onSuccess(request, json)
    {
      // TODO: find out why json is undefined in safari
      if (!json || json.sent_message)
      {
        this.displaySuccess();
        this.replyBodyEl.value = "";
      }
      else
      {
        this.displayError();
      }
    }

    var postBody = {};
    postBody.send_user_message_body = this.replyBodyEl.value;
    postBody.replying_to_message = this.envelope_id;
    
    new Ajax.Request(
      $(this.id + "_reply_form").action,
      {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    this.hideExpando();
    this.displaySending();

    Event.stop(ev);
  },

  displayError: function() {
    $(this.id + "_send_status").innerHTML = "Unable to send message.&nbsp;";
    $(this.id + "_reply_btn").innerHTML = "Try again?";
  },

  displaySuccess: function() {
    $(this.id + "_send_status").innerHTML = "Message sent!&nbsp;";
    $(this.id + "_reply_btn").innerHTML = "Reply again?";
  },

  displaySending: function() {
    $(this.id + "_send_status").innerHTML = "";
    $(this.id + "_reply_btn").innerHTML = "Sending...";
  },

  onClickDelete: function(ev) {
    function onComplete(request)
    {
      animator.animateRemoveEnvelope();
    }

    // Setup the overlays for removing the message
    var animator = new iLike.InboxMessageAnimator(this.id);
    animator.setupRemoveEnvelope("Deleting...");

    // Stop the player if we're the parent of the currently playing clip
    if (player.playing || player.loading)
    {
      var curEnvelope = findParentByNodeName(player.id + "_li", "LI", true);
      if (curEnvelope && curEnvelope.id == (this.id + "_li"))
        StopPlayer();
    }

    // Stop the video if we're the parent of the currently playing video
    if (theApp.lastOpenSongExpando)
    {
      var curEnvelope = findParentByNodeName(theApp.lastOpenSongExpando.getId() + "_li", "LI", true);
      if (curEnvelope && curEnvelope.id == (this.id + "_li"))
        theApp.lastOpenSongExpando.stopVideo(false);
    }

    // Send the request    
    var postBody = {};
    postBody.usermsg = this.envelope_id;

    new Ajax.Request(
      theApp.baseUrl + "inbox/delete_async",
      {method: "post", postBody: $H(postBody).toQueryString(), onComplete: onComplete.bind(this)});

    Event.stop(ev);
  }
};


//----------------------------------------------------------------------------
//
// iLike.InboxMessageAnimator class
//
//----------------------------------------------------------------------------

iLike.InboxMessageAnimator = Class.create();

iLike.InboxMessageAnimator.prototype = {

  initialize: function(id, text) {
    this.id = id;
    this.envEl = $(id + "_li");
    this.first = false;
    this.width = 0;
    this.height = 0;
    this.overlayMaskEl = null;
    this.overlayStatusEl = null;
  },

  setupRemoveEnvelope: function(text) {
    // Get dimensions of envelope
    var d = this.envEl.getDimensions();
    this.width = d.width;
    this.height = d.height;

    // Adjust height by -1 (only for elements other than the 1st one) so that we don't cover up the borders on either side of us
    this.first = this.envEl.hasClassName("envelope_noborder");
    if (!this.first)
      this.height -= 1;

    // Setup overlay transparency mask
    new Insertion.Before(this.envEl, "<li id='" + this.id + "_delete_overlay' class='envelope_delete_overlay' style='width:" + this.width + "px; height:" + this.height + "px;'></li>");
    this.overlayMaskEl = $(this.id + "_delete_overlay");

    // Setup overlay for "deleting..." message
    new Insertion.Before(this.envEl, "<li id='" + this.id + "_delete_overlay_message' class='envelope_delete_overlay_message' style='width:" + this.width + "px; height:" + this.height + "px;'><p>" + text + "</p></li>");
    this.overlayStatusEl = $(this.id + "_delete_overlay_message");
  },

  animateRemoveEnvelope: function() {
    function onShrinkStep(t, val, isComplete)
    {
      dummyEl.style.height = Math.round(val) + "px";
      
      if (isComplete)
        dummyEl.remove();
    }

    function onFadeStep(t, val, isComplete)
    {
      applyOpacity(overlayFaderEl, val);

      if (isComplete)
      {
        // Hide original envelope and all overlays
        this.envEl.hide();
        this.overlayMaskEl.hide();
        this.overlayStatusEl.hide();
        overlayFaderEl.hide();

        // Create a dummy element to replace the one we just hid, and shrink it
        var className = this.first ? "" : "envelope_border";
        new Insertion.Before(this.envEl, "<li id='" + this.id + "_dummy' class='" + className + "' style='width:" + this.width + "px; height:" + this.height + "px; font-size:0;'></li>");
        dummyEl = $(this.id + "_dummy");

        // If removing the first entry, find next first visible and remove its border
        if (this.first)
        {
          var items = $("inbox_list").getElementsByTagName("li");
          for (var i = 0; i < items.length; i++)
          {
            if (items[i].parentNode.id == "inbox_list" && Element.visible(items[i]) && Element.hasClassName(items[i], "envelope") && Element.hasClassName(items[i], "envelope_border"))
            {
              items[i].className = "envelope envelope_noborder";
              break;
            }
          }
        }

        // Start shrinking the dummy item
        new iLike.Stepper(onShrinkStep.bind(this)).start(this.height, 0, 200);
      }
    }

    // Setup another transparency overlay that we'll use to fade out everything below it
    new Insertion.Before(this.envEl, "<li id='" + this.id + "_fade_overlay' class='envelope_fade_overlay' style='width:" + this.width + "px; height:" + this.height + "px;'></li>");
    var overlayFaderEl = $(this.id + "_fade_overlay");

    var dummyEl = null;

    // Start the fade
    new iLike.Stepper(onFadeStep.bind(this)).start(10, 99, 200);
  }
};


//----------------------------------------------------------------------------
//
// iLike.AddToMySpace class
//
//----------------------------------------------------------------------------

iLike.AddToMySpace = Class.create();

iLike.AddToMySpace.prototype = {

  initialize: function() {
    this.btnEl = $("add_to_myspace_btn");
    this.formEl = $("add_myspace_widget_form");
    this.addingEl = $("add_widget_adding");
    this.resultsEl = $("add_widget_results");
    this.emailEl = $("myspace_email");
    this.passwordEl = $("myspace_password");

    Event.observe(this.btnEl, "click", this.onClick.bind(this), false);

    this.setFocusEmail();
  },

  onClick: function(ev) {
    function onSuccess(request, json)
    {
      this.addingEl.hide();
      this.resultsEl.show();
      this.resultsEl.innerHTML = request.responseText;

      if (json && json.error)
      {
        this.setFocusEmail();
      }
      else
      {
        this.emailEl.value = "";
        this.passwordEl.value = "";
      }

      if (request.responseText.indexOf("add_widget_error") != -1)
      {
        if (request.responseText.indexOf("Invalid email") != -1)
          theApp.trackEvent("Ajax/MySpaceFailedInvalidPass");
        else if (request.responseText.indexOf("is empty") != -1)
          theApp.trackEvent("Ajax/MySpaceFailedEmptyPass");
        else if (request.responseText.indexOf("unable to connect") != -1)
          theApp.trackEvent("Ajax/MySpaceFailedCantConnect");
        else
          theApp.trackEvent("Ajax/MySpaceFailedUnknown");
      }
    }
    
    function onFailure(request)
    {
      theApp.trackEvent("Ajax/MySpaceFailedRails");
      this.addingEl.hide();
      this.resultsEl.show();
      this.resultsEl.innerHTML = "<h3 id='add_widget_error'>Sorry, we're unable to connect to MySpace right now. Please try again.</h3>";
    }

    var postBody = {};
    postBody.myspace_email = this.emailEl.value;
    postBody.myspace_password = this.passwordEl.value;
    
    new Ajax.Request(
      this.formEl.action + "?async=true",
      {method: "post", postBody: $H(postBody).toQueryString(), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this)});

    this.addingEl.show();
    this.resultsEl.hide();

    theApp.trackEvent("Ajax/AddToMySpace");

    Event.stop(ev);
  },

  setFocusEmail: function() {
    function focus() { this.emailEl.focus(); }
    setTimeout(focus.bind(this), 1);
  }
};

//----------------------------------------------------------------------------
//
// iLike.DeleteAccount class
//
//----------------------------------------------------------------------------

iLike.DeleteAccount = Class.create();

iLike.DeleteAccount.prototype = {

  initialize: function() {
    this.lastActiveId = null;

    // Can support up to 9 tabs
    for (var i = 1; i < 10; i++)
    {
    
      var a = $("delete_reason_" + i);
        if (!a)
          break;
    
      if (a.checked)
      {
        $("delete_reason_text_" + a.id.substr(a.id.length -1)).show();
      }
      
      var el = $("delete_reason_text_" + i);
      if (el.visible())
        this.lastActiveId = i;

      Event.observe(a, "click", this.showReason.bind(this), false);      
    }
  },

  showReason: function(ev) {
    var a = Event.element(ev);    
    var id = a.id.substr(a.id.length - 1);

    if (this.lastActiveId && this.lastActiveId != id)
    {
      $("delete_reason_text_" + this.lastActiveId).hide();
    }
    
    this.lastActiveId = parseInt(id);
    $("delete_reason_text_" + this.lastActiveId).show();        
    
  }
};

//----------------------------------------------------------------------------
//
// iLike.ProfileVisibility class
//
//----------------------------------------------------------------------------

iLike.ProfileVisibility = Class.create();

iLike.ProfileVisibility.prototype = {

  initialize: function() {  
    Event.observe($("view_profile_everyone"), "click", this.showNote.bind(this), false);
    Event.observe($("view_profile_friends"), "click", this.showNote.bind(this), false);
    Event.observe($("view_profile_friends_no_search"), "click", this.showNote.bind(this), false);
    Event.observe($("view_profile_nobody"), "click", this.showNote.bind(this), false);
  },

  showNote: function(ev) {
    this.hideAll();
    var element = Event.element(ev);
    switch(element.id)
    {
      case "view_profile_friends":
        $("privacy_note_friends").show();
        break;
      case "view_profile_friends_no_search":
        $("privacy_note_friends_no_search").show();
        break;
      case "view_profile_nobody":
        $("privacy_note_nobody").show();
        break;
    }
  },

  hideAll: function() {
    $("privacy_note_friends").hide();
    $("privacy_note_friends_no_search").hide();
    $("privacy_note_nobody").hide();
  }
};

//----------------------------------------------------------------------------
//
// iLike.TextboxDefaultText class
//
//----------------------------------------------------------------------------

iLike.TextboxDefaultText = Class.create()

iLike.TextboxDefaultText.prototype = {
  
  initialize: function(textbox, default_text, doValidation, form, alert_text) {
    this.default_text = default_text;
    this.alert_text = alert_text;
    this.search_box = $(textbox);
    this.search_form = $(form);
    if (this.search_box.value == '')
    {
      this.search_box.value = default_text;
    }
    
    Event.observe(this.search_box, "focus", this.textboxFocus.bind(this), false);
    Event.observe(this.search_box, "blur", this.textBoxBlur.bind(this), false);
    if(doValidation)
      Event.observe(this.search_form, "submit", this.validateSearchForm.bind(this), false);
  },
  
  textboxFocus: function(ev) {
    if (this.search_box.value == this.default_text)
    {
      this.search_box.s=this.search_box.className;
      this.search_box.value='';
      this.search_box.className='search_regular_text';
    }
  },
  
  textBoxBlur: function(ev) {
    if (this.search_box.value == '')
    {
      var c=this.search_box.className;    
      if (c != (this.search_box.s?this.search_box.s:"search_dimmed_text"))
      {
        this.search_box.className=this.search_box.s?this.search_box.s:"search_dimmed_text";
      }      
      this.search_box.value=this.default_text;
    }
  },
  
  validateSearchForm: function(ev) {
    if (this.search_box.value == this.default_text || this.search_box.value == '')
    {
      alert(this.alert_text);
      Event.stop(ev);
    }
  }
}


//----------------------------------------------------------------------------
//
// iLike.NameThatTune class
//
//----------------------------------------------------------------------------
iLike.NameThatTune = Class.create()

iLike.NameThatTune.prototype = {

  initialize: function() {
    this.quizGetReadyEl = $('quiz_get_ready');
    this.nameThatTuneQuizEl = $('name_that_tune_quiz');
    this.timesUpEl = $('quiz_times_up');
    this.quizErrorEl = $('quiz_error');
    this.quizSkippedEl = $('quiz_skipped');
    this.quizResultEl = $('quiz_result');

    this.timerEl = $('quiz_timer');
    this.quizChoicesEl = $('quiz_choices');
    this.selectedChoiceEl = $('selected_choice');
    this.quizTimeEl = $('quiz_time');
    this.quizForm = $('quiz_form');
    this.sourceUrl = this.quizForm.source.value;

    this.startTimerEl = $('start_timer');
    this.pointEl  = $('quiz_points');
    
    this.clickToPauseEl = $("click_to_pause");
    if($("challenge_main_page"))
      this.isChallengeMainPage = true
      
    this.inviteBtn = $('send_challenge_invite');
    
    if(this.sourceUrl == 'facebook')
      this.challenge_url = theApp.baseUrl + "facebook/challenge_frame?" + this.quizForm.qs.value;
    else
      this.challenge_url = theApp.baseUrl + "challenge";
    
    if (this.inviteBtn)
    {
      Event.observe(this.inviteBtn, "mousedown", this.onClickInvite.bind(this), false);
      Event.observe(this.inviteBtn, "click", function(ev){Event.stop(ev);}, false);
      Event.observe(this.inviteBtn, "focus", function(ev){Event.element(ev).blur();}, false);  // Prevent focus rectangle in Firefox
      $('challenge_invite_email').value = "";
      new iLike.TextboxDefaultText('challenge_invite_email', 'Enter an email address');
      Event.observe("challenge_invite_submit", "click", this.onClickSubmitInvite.bind(this), false);
      Event.observe("challenge_invite_form", "submit", this.onClickSubmitInvite.bind(this), false);
    }

    this.timer = null;
    this.timerInitiated = false;
    this.quizTime = 30;
    this.quizTimer = null;
    this.quizStartTime = null;
    this.maxWaitRetries = 40;
    this.currentWaitRetries = 0;

    this.choiceSubmitted = false;
    this.countdownTime = 3;
    this.countdownTimer = null;

    this.countdownStartTime = null;

    this.selectedChoiceEl.value = "";
    this.quizTimeEl.value = "30";

    this.quiz_track = theApp.data.quiz_track;

    for (var i = 1; i <= 4; i++)
    {
      var a = $("choice_" + i);
      Event.observe(a, "mousedown", this.submitChoice.bind(this), false);
      Event.observe(a, "click", function(ev){Event.stop(ev);}, false);
      Event.observe(a, 'focus', function(ev){Event.element(ev).blur();}, false);
    }

    clickToPlay = $("click_to_play");
    Event.observe(clickToPlay, "mousedown", this.startQuiz.bind(this), false);
    Event.observe(clickToPlay, 'click', function(ev){Event.stop(ev);}, false);
    quizSkipLink = $('quiz_skip_link');
    Event.observe(quizSkipLink, "mousedown", this.skipQuiz.bind(this), false);
    Event.observe(quizSkipLink, "click", function(ev){Event.stop(ev);}, false);
    Event.observe(quizSkipLink, 'focus', function(ev){Event.element(ev).blur();}, false);
        
    if(this.clickToPauseEl)
    {
      Event.observe(this.clickToPauseEl, "mousedown", this.pauseCountdown.bind(this), false);
      Event.observe(this.clickToPauseEl, 'click', function(ev){Event.stop(ev);}, false);
    }
    
    if($('click_to_signup'))
      Event.observe('click_to_signup', "mousedown", this.pauseCountdown.bind(this), false);
    
    if (this.isChallengeMainPage && $('song2_li'))
    {
      iLike.SongExpando.byId('song2').showExpando();
    }

    if (this.startTimerEl) {
      this.startTimerEl.innerHTML = ":0" + this.countdownTime;
      this.countdownStartTime = new Date();
      this.startCountdown();
    }
  },

  hideAll: function()
  {
    this.nameThatTuneQuizEl.hide();
    this.quizErrorEl.hide();
    this.quizSkippedEl.hide();
    this.quizGetReadyEl.hide();
    this.timesUpEl.hide();
    this.quizResultEl.hide();
  },

  showError: function(msg) {
    this.hideAll();
    this.quizErrorEl.show();
    if (msg)
    {
      $('quiz_error_text').innerHTML = msg;
    }
  },  

  startCountdown: function() {
    this.countdownTimer = setInterval(this.updateCountdown.bind(this), 100)
  },
  
  pauseCountdown: function() {
    if (this.clickToPauseEl)
    {
      this.clickToPauseEl.hide();
      $('click_to_play').show();
    }
    this.startTimerEl.addClassName("quiz_countdown_timer_stopped");
    this.stopCountdownTimer();
  },

  updateCountdown: function() {
    currentTime = new Date();
    secondsRemaining = this.countdownTime - Math.round((currentTime - this.countdownStartTime)/1000);
    this.startTimerEl.innerHTML = ":0" + secondsRemaining;
    if (secondsRemaining <= 0)
    {
      this.stopCountdownTimer();
      this.startQuiz();
    }
  },

  stopCountdownTimer: function() {
    if(this.countdownTimer)
      clearInterval(this.countdownTimer);
  },

  startQuiz: function() {
    this.stopCountdownTimer();
    this.hideAll();
    this.nameThatTuneQuizEl.show();
    iLike.SongExpando.byId(this.quiz_track).playSong(false);
    if (this.isChallengeMainPage && $('song2_li'))
    {
      iLike.SongExpando.byId('song2').showExpando();
    }
  },

  onClickPlay: function() {
    if (!this.timerInitiated) {
      this.timer = setInterval(this.checkPlayerStarted.bind(this), 500);
      this.timerInitiated = true;
    }
  },

  checkPlayerStarted: function() {
    if (this.currentWaitRetries < this.maxWaitRetries)
    {
      this.currentWaitRetries += 1;
      if (player.playing) {
       this.timerEl.innerHTML = ":" + (this.quizTime < 10 ? "0" + this.quizTime : this.quizTime);
       this.startQuizTimer();
       if (this.timer)
        clearInterval(this.timer);
      }
    }
    else
    {
      if (this.timer)
        clearInterval(this.timer);
      if (player.loading || player.playing)
        StopPlayer();
      this.showError("Sorry, the clip didn't load properly.");
    }
  },

  startQuizTimer: function() {
    this.quizStartTime = new Date();
    this.quizChoicesEl.show();
    this.timerEl.show();
    $('points_block').show();
    this.quizTimer = setInterval(this.updateQuizTimeRemaining.bind(this), 100)
  },

  stopQuizTimer: function() {
    if(this.quizTimer)
      clearInterval(this.quizTimer);
  },

  updateQuizTimeRemaining: function() {
    currentTime = new Date();
    this.secondsRemaining = this.quizTime - Math.round((currentTime - this.quizStartTime)/1000);
    this.timerEl.innerHTML = ":" + (this.secondsRemaining < 10 ? "0" + this.secondsRemaining : this.secondsRemaining);
    if (this.secondsRemaining >= 30)
      this.pointEl.innerHTML = 10;
    else
      this.pointEl.innerHTML = Math.ceil((this.secondsRemaining + 1)/3.0);
    currentTime = null;
    if (this.secondsRemaining <= 0)
    {      
      this.stopQuizTimer();
      this.submitTimesUp();
    }
  },

  redirectToNextQuiz: function() {
      window.location = this.challenge_url
  },

  clearChoiceClasses: function(selectedId) {
    for (var i = 1; i <= 4; i++)
    {
      if(i != selectedId)
        $("choice_" + i + "_div").className = "quiz_choice_default";
    }
    $('quiz_skip_link' + "_div").className = "quiz_choice_default";
  },

  submitChoice: function(ev) {
    function onSuccess(result) {
      try
      {
        this.result = eval('(' + result.responseText + ')');
      }
      catch(err)
      {
        this.showError('Sorry, there was an error submitting your answer.  :(');
        return;
      }
      if (this.id == this.result.correct_answer) {
        this.hideAll();
        $('quiz_result_points').innerHTML = this.result.points;
        $('quiz_correct').show();
      } else {
        this.hideAll();
        $('quiz_wrong').show();
      }
      $('quiz_answer').innerHTML = this.result.correct_answer_title;
      this.quizResultEl.show();
      setTimeout(this.redirectToNextQuiz.bind(this), 1500);
    }
    
    function onFailure() {
      this.showError('Sorry, there was an error submitting your answer.  :(');
    }    

    if (!this.choiceSubmitted)
    {      
      var choiceEl = Event.element(ev);
      this.id = choiceEl.id.substr(choiceEl.id.length - 1);
      
      this.stopQuizFunctions();
      choiceEl.className = 'quiz_choice quiz_choice_hover';
      this.selectedChoiceEl.value = this.id;
      this.timerEl.addClassName("quiz_timer_stopped");
      this.clearChoiceClasses(this.id);
      $('choice_' + this.id + "_div").className = "quiz_choice quiz_choice_selected";
      new Ajax.Request(this.quizForm.action, { method: 'post', parameters: Form.serialize(this.quizForm), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this) });
    }
  },

  submitTimesUp: function() {
    function onSuccess(result) {
      this.result = eval('(' + result.responseText + ')');
      $('quiz_answer_times_up').innerHTML = this.result.correct_answer_title;
      $('quiz_answer_times_up_submitting').hide();
      $('quiz_answer_times_up_block').show();
    }

    function onFailure() {
      this.showError('Sorry, there was an error submitting your answer.  :(');
    }

    if (!this.choiceSubmitted)
    {    
      this.hideAll();
      this.timesUpEl.show();
      this.stopQuizFunctions();
      this.selectedChoiceEl.value = -2;
      new Ajax.Request(this.quizForm.action, { method: 'post', parameters: Form.serialize(this.quizForm), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this) });
    }
  },

  skipQuiz: function() {
    function onSuccess(result) {
      this.result = eval('(' + result.responseText + ')');
      $('quiz_answer_skipped').innerHTML = this.result.correct_answer_title;
      $('quiz_answer_skipped_submitting').hide();
      $('quiz_answer_skipped_block').show();
      setTimeout(this.redirectToNextQuiz.bind(this), 1500);
    }

    function onFailure() {
      this.showError('Sorry, there was an error submitting your answer.  :(');
    }

    if (!this.choiceSubmitted)
    {    
      this.hideAll();
      this.quizSkippedEl.show();
      this.stopQuizFunctions();
      this.selectedChoiceEl.value = -1;
      new Ajax.Request(this.quizForm.action, { method: 'post', parameters: Form.serialize(this.quizForm), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this) });
    }
  },

  stopQuizFunctions: function() {
    this.choiceSubmitted = true;
    if (player.playing)
        StopPlayer();
    this.stopQuizTimer();
    this.quizTimeEl.value = this.quizTime - this.secondsRemaining;
  },
  
  onClickInvite: function(ev) {
    if (!$('send_challenge_invite_expando').visible())
    {
      $('send_challenge_invite_expando').show();

      // function focus() { $('challenge_invite_email').focus(); }
      // setTimeout(focus, 1);
    }
    else
    {
      $('send_challenge_invite_expando').hide();
    }
  },
  
  displayInviteError: function(message) {
    $("challenge_invite_status").className = "text_orange";
    $("challenge_invite_status").innerHTML = message + "&nbsp;";
    this.inviteBtn.innerHTML = "Try again?";
    this.inviteBtn.show();    
  },

  displayInviteSuccess: function() {
    $("challenge_invite_status").className = "text_orange";
    $("challenge_invite_status").innerHTML = "Invitation sent!&nbsp;";
    this.inviteBtn.innerHTML = "Send another?";
    this.inviteBtn.show();
  },

  displayInviteSending: function() {
    $("challenge_invite_status").className = "text_orange";
    $("challenge_invite_status").innerHTML = "";
    this.inviteBtn.innerHTML = "Sending...";
    this.inviteBtn.show();
  },
  
  onClickSubmitInvite: function(ev)
  {
    function onSuccess(result) {
      $('challenge_invite_email').value = "";
      try
      {      
        this.result = eval('(' + result.responseText + ')');
        if (this.result.success == true)
          this.displayInviteSuccess();
        else
          this.displayInviteError(this.result.message);
      }
      catch(err)
      {
        this.displayInviteError("Unable to send invitation.");
        return;
      }
    }
    
    function onFailure() {
      this.displayInviteError("Unable to send invitation.")
    }
    
    theApp.trackEvent("Ajax/SendChallengeInvite");        
    new Ajax.Request(theApp.baseUrl + 'challenge/invite_to_challenge', { method: 'post', parameters: Form.serialize("challenge_invite_form"), onSuccess: onSuccess.bind(this), onFailure: onFailure.bind(this) });
    $('send_challenge_invite_expando').hide();
    this.displayInviteSending();

    Event.stop(ev);
  }
}


//----------------------------------------------------------------------------
//
// iLike.Stepper class
//
// Generic class for applying smooth effects.  You specify a callback
// function which gets called at various times through the effect with
// a value that can be applied to a height, an opacity, a position, etc.
//
//----------------------------------------------------------------------------

iLike.Stepper = Class.create();

iLike.Stepper.prototype = {

  initialize: function(callbackFn) {
    this.from = 0;
    this.to = 0;
    this.duration = 0;
    this.callbackFn = callbackFn;

    this.now = 0;
    this.startTime = null;
    this.timer = null;

    this.transition = iLike.Stepper.sinoidal;
  },

  // Recalculates y based on time elapsed
  step: function() {
    var isComplete = false;
    var time = (new Date).getTime();
    var t = (time - this.startTime) / (this.duration);
    if (time >= this.duration + this.startTime)
    {
      this.now = this.to;
      this.clear();
      isComplete = true;
    }
    else
    {
      this.now = this.transition(t) * (this.to - this.from) + this.from;
    }

    // DEBUG
    if (false)
    {
      var div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = 200 + Math.round(t*300) + "px";
      div.style.top = 500 + Math.round(this.now - this.from) + "px";
      div.title = "(" + Math.round(t*100) + ", " + Math.round(this.now - this.from) + ")";
      div.innerHTML = "(" + Math.round(t*100) + ", " + Math.round(this.now - this.from) + ")";
      document.body.appendChild(div);
    }
    // END DEBUG
    
    this.callbackFn(t, this.now, isComplete);
  },

  // Starts the transition
  start: function(from, to, duration) {
    if (this.timer != null)
      return;

    this.from = from;
    this.to = to;
    this.duration = duration;
    this.now = this.from;
    this.startTime = (new Date).getTime();
    this.timer = setInterval(this.step.bind(this), 13);
  },

  // Updates the end target value and does some hacky recalculations to try and overlap
  // the new curve with the old one to avoid jumps
  // TODO: The loop below is a hacky way to calculate "x" from "y".  Need to add inverse
  //       methods for each of the algorithms.
  update: function(to) {
    if (this.timer == null)
      return;

    for (var i = 0; i < this.duration; i += (this.duration / 100))
    {
      var y = this.transition(i/this.duration) * (to - this.from) + this.from;

      if ((this.from < to && y >= this.now) || (this.from > to && y <= this.now))
      {
        this.startTime = (new Date).getTime() - i;
        break;
      }
    }      
    this.to = to;
  },

  // Resets the timer  
  clear: function() {
    if (this.timer != null)
    {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  // Returns true if currently in a transition effect
  inTransition: function() {
    return this.timer != null;
  }
};

// Transitions
iLike.Stepper.sinoidal = function(pos) {
  return ((-Math.cos(pos*Math.PI)/2) + 0.5);
  //this transition is from script.aculo.us
}

iLike.Stepper.linear = function(pos) {
  return pos;
}

iLike.Stepper.cubic = function(pos) {
  return Math.pow(pos, 3);
}

iLike.Stepper.circ = function(pos) {
  return Math.sqrt(pos);
}




// Player functions (TODO: Move these into a class)
var player = new Object;
player.swf = null;
player.playing = false;
player.loading = false;
player.curpos = 0;
player.duration = 30000;  // hard-coded for now
player.id = null;
player.timer_id = null;
player.refresh_interval = 150;
player.btnEl = null;
player.progressBarEl = null;
player.supportsPause = false;

function get_swf_id(swf_id)
{
  if (navigator.appName.indexOf("Microsoft") > -1)
  {
    return window[swf_id];
  }
  else
  {
    return document[swf_id];
  }
}

function ReportDuration(msecs)
{
//  UpdateDebug();
//  player.duration = msecs;
}

function ClipLoaded(msecs)
{
  UpdateDebug();
  player.duration = msecs;
}

function OnPlayStart()
{
  player.btnEl.className = "song_play_btn_playing";
  player.playing = true;
  if (!player.loading)
    StopPlayer();
  else
    player.loading = false;
}

function StopPlayer()
{
  function stop()
  {
    player.swf.StopClip();
  }
  setTimeout(stop, 1);  // BUGBUG: Not sure why the timeout is needed
  clearInterval(player.timer_id);
  player.timer_id = null;
  player.playing = false;
  player.loading = false;
  player.btnEl.className = "song_play_btn";

  // Fade out bar
  var bar = player.progressBarEl;

  function onFadeProgressBarStep(t, val, isComplete)
  {
    applyOpacity(bar, val);

    if (isComplete)
    {
      bar.style.borderRight = "none";
      bar.style.visibility = "hidden";
      bar.style.width = 0;
      applyOpacity(bar, 100);
      player.faderTimer = null;
    }
  }

  function fadeOutProgressBar()
  {
    new iLike.Stepper(onFadeProgressBarStep).start(99, 10, 500);
  }

  player.faderTimer = setTimeout(fadeOutProgressBar, 1500);
}

function ReportCurrPos(msecs)
{
  if (player.playing)
  {
    var percentage = player.duration > 0 ? (msecs / (player.duration - player.refresh_interval - 600)) *90.0 : 0;
    UpdatePlayDiv(percentage);

    player.curpos = msecs;
  }

  if ((msecs + player.refresh_interval + 600) >= player.duration && player.duration > 0)
  {
    // Stop player (remember last id)
    var id = player.id;
    StopPlayer();

    // Find current song
    for (var i = 0; i < iLike.SongExpando.arr.length; i++)
    {
      if (iLike.SongExpando.arr[i].id == id)
        break;
    }

    // Play next song, unless at the end, or if they're on any tab other than 'album', or if they're playing a seeqpod clip
    if (i < iLike.SongExpando.arr.length - 1 &&
        iLike.SongExpando.arr[i].lastActiveTab == 'info' &&
        !iLike.SongExpando.arr[i].song.seeqpod_view)
    {
      var next = i + 1;

      while (next < iLike.SongExpando.arr.length && ((!iLike.SongExpando.arr[next].song.clipurl && !iLike.SongExpando.arr[next].song.song_id) || findParentByClassName(iLike.SongExpando.arr[next].id + "_li", "song_group_dontplay")))
        next++;

      if (next < iLike.SongExpando.arr.length)
      {
        // Skip playing if next song isn't in the same list as the current song, unless they are in the same "song group"
        var curUl = findParentByNodeName(id + "_li", "UL");
        var nextUl = findParentByNodeName(iLike.SongExpando.arr[next].id + "_li", "UL");
        var sameSongGroup = (curUl && nextUl && curUl == nextUl);

        if (!sameSongGroup)
        {
          // If not in the same UL, check if the next song is in the same song grouping
          var curGroup = findParentByClassName(id + "_li", "song_group");
          var nextGroup = findParentByClassName(iLike.SongExpando.arr[next].id + "_li", "song_group");
          sameSongGroup = (curGroup && nextGroup && curGroup == nextGroup);
        }

        if (sameSongGroup)
        {
          function play()
          {
            PlaySong(iLike.SongExpando.arr[next].id, iLike.SongExpando.arr[next]);
            theApp.trackEvent("Ajax/PlaySongAuto");
          }
          setTimeout(play, 1);
        }
      }
    }
  }

  UpdateDebug();
}

function applyOpacity(el, val)
{
  val = Math.round(val);
  if (val < 100)
  {
    el.style.opacity = "." + val;
    el.style.filter = "alpha(opacity=" + val + ")";
    el.style.display = "";
  }
  else
  {
    el.style.opacity = ".99";
    el.style.filter = "";
    el.style.display = "";
  }
}

function Refresh()
{
  player.swf.GetCurrentPosition();
  UpdateDebug();
}

function UpdateDebug()
{
/*
  if (player.id)
  {
    $(player.id + "_player_msecs").innerHTML = player.curpos;
    $(player.id + "_player_duration").innerHTML = player.duration;
  }
*/
}

function UpdatePlayDiv(percentage)
{
  if (player.id)
  {
    var bar = player.progressBarEl;
    
    if (percentage > 0)
    {
      bar.style.borderRight = "solid 2px #cccccc";
      bar.style.visibility = "visible";
      bar.style.width = percentage + "%";
      if (percentage > 50 && (player.duration - player.curpos) < 6000)
      {
        var r = Math.floor((player.duration - player.curpos) / 1000);
        bar.innerHTML = ":" + (r > 9 ? "" : "0") + r;
      }
    else if ("&nbsp;" != bar.innerHTML)
    {
      bar.innerHTML = "&nbsp;";
    }
    }
    else
    {
      bar.style.borderRight = "none";
      bar.style.visibility = "hidden";
      bar.style.width = 0;
      bar.innerHTML = "&nbsp;";
    }
  }
}

function PlaySong(id, song_data, userInitiated)
{
  // Get id of swf file
  if (!player.swf)
  {
    var count = 0;

    function ensurePlayer()
    {
      count++;
      player.swf = get_swf_id('music_player');
      if (count < 100)
      {
        if (!player.swf || !player.swf.PlayClip)
          setTimeout(ensurePlayer, 100);
        else
          PlaySong(id, song_data, userInitiated);
      }
    }

    ensurePlayer();
    return;
  }

  // Clear the previous song display if about to play a different song
  if (player.id && player.id != id)
  {
    player.swf.StopClip();
    clearInterval(player.timer_id);
    player.timer_id = null;
    player.playing = false;
    player.loading = false;
    player.btnEl.className = "song_play_btn";
    UpdatePlayDiv(0);
    UpdateDebug();
  }

  // Reset fader timer
  if (player.faderTimer)
  {
    clearTimeout(player.faderTimer);
    player.faderTimer = null;
  }

  player.id = id;
  player.btnEl = $(id + "_play_btn");
  player.progressBarEl = $(id + "_progress_bar");

  if (!player.playing && !player.loading)
  {
    player.btnEl.className = "song_play_btn_loading";

    player.loading = true;

    if (song_data.song.time)
      player.duration = Math.round(song_data.song.time * 1000);
    else
      player.duration = (song_data.song.clipurl.indexOf("www.garageband.com") != -1 || song_data.song.seeqpod_view) ? 120000 : 30000; // Default to 30s (120s for full clips) until we get the correct duration

    player.swf.PlayClip(song_data.song.clipurl);
    player.timer_id = setInterval(Refresh, player.refresh_interval);

    song_data.showExpando();

    if (userInitiated)
      theApp.trackEvent("Ajax/PlaySong");
  }
  else
  {
    if (player.supportsPause)
    {
      player.playing = false;
      player.loading = false;
      player.swf.PauseClip();
      player.btnEl.className = "song_play_btn";
      clearInterval(player.timer_id);
    }
    else
    {
      StopPlayer();
    }

    if (userInitiated)
      theApp.trackEvent("Ajax/StopSong");
  }

  UpdateDebug();
}

