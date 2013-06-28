l_rules = {'#example li' : function(p_e){MWPEaEL(p_e,"click",function(){ 
this.parentNode.removeChild(this); return false; },false);},'#fading-list li' : 
function(p_e){MWPEaEL(p_e,"click",function(){ new Effect2.Fade(this); return 
false; },false);},'ul#sortable-list' : function(p_e){ Sortable.create(p_e); 
},'#shaky li' : function(p_e){MWPEaEL(p_e,"click",function(){ new 
Effect2.Shake(this) },false);},'.dropout li' : 
function(p_e){MWPEaEL(p_e,"click",function(){ new Effect2.DropOut(this) 
},false);MWPEaEL(p_e,"mouseout",function(){ this.className = ""; 
},false);MWPEaEL(p_e,"mouseover",function(){ this.className = "hover"; 
},false);}};MetaWrap.Wirewrap.register(l_rules);l_rules = null;
