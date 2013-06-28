myrules = {
    '#example li' : function(el){
        //el.onclick = function(){alert("X");this.parentNode.removeChild(this);return false;}
        MWPEaEL(el,"click",function(){this.parentNode.removeChild(this);},false);
    },
    '#fading-list li' : function(el){
        //el.onclick = function(){alert("Y"); new Effect2.Fade(this);return false;}
        MWPEaEL(el,"click",function(){new Effect2.Fade(this);},false);
    },
    'ul#sortable-list' : function(el){
            Sortable.create(el);            
    },
    '#shaky li' : function(el){
        //el.onclick = function(){new Effect2.Shake(this)}
        MWPEaEL(el,"click",function(){new Effect2.Shake(this)},false);
    },
    '.dropout li' : function(el){
        //el.onclick = function(){new Effect2.DropOut(this)};
        MWPEaEL(el,"click",function(){new Effect2.DropOut(this)},false);
        //el.onmouseover = function(){this.className = "hover";};
        MWPEaEL(el,"mouseover",function(){this.className = "hover";},false);
        //el.onmouseout = function(){this.className = "";}
        MWPEaEL(el,"mouseout",function(){this.className = "";},false);
    }
    
};

MetaWrap.Wirewrap.register(myrules);
myrules = null;

