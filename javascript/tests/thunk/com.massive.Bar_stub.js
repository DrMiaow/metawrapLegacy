


com.massive.Bar = function()
{		
	Thunk("com.massive.Bar");		
	com.massive.Bar.apply(this,[]);
	MixinPrototype(com.massive.Bar,this);
}

com.massive.Bar.prototype.createProperty = function()
{	
	Thunk("com.massive.Bar", "com.massive.Bar.prototype.createProperty");		
	return com.massive.Bar.prototype.createProperty.apply(this,[]);
}
