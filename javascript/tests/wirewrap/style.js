var myrules = {
	'#example li' : function(el){
		el.onclick = function(){
			this.parentNode.removeChild(this);
			return false;
		}
	},
	'#fading-list li' : function(el){
		el.onclick = function(){
			new Effect2.Fade(this);
			return false;
		}
	},
	'ul#sortable-list' : function(el){
		Sortable.create(el);
	},
	'#shaky li' : function(el){
		el.onclick = function(){
			new Effect2.Shake(this)
		}
	},
	'.dropout li' : function(el){
		el.onclick = function(){
			new Effect2.DropOut(this)
		};
		el.onmouseover = function(){
			this.className = "hover";
		};
		el.onmouseout = function(){
			this.className = "";
		}
	}
	
};

Behaviour.register(myrules);

