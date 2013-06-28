
com.massive.Ni = function()
{
	Thunk("com.massive.Ni");		
	com.massive.Ni.apply(this,[]);

	// So we need to add it in to make 'this' look like it was constructed by calling the 'new' com.massive.Foo
	MixinPrototype(com.massive.Ni,this);
	
}

com.massive.Ni.prototype.say = function()
{	
	Thunk("com.massive.Ni", "say");		
	return com.massive.Ni.prototype.say.apply(this,[]);
}

com.massive.Ni.staticField = "Message for your sir";

com.massive.Ni.staticObject = { peril:"extreeme"};

com.massive.Ni.staticFoo = new com.massive.Foo("One","Two","Three");
