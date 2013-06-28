
// Object constructor with properties
com.massive.Foo = function(a,b,c)
{		
	// We load in the new class
	Thunk("com.massive.Foo","STUB com.massive.Foo");		

	//return com.massive.Foo.apply(this,[a,b,c]);
	//return com.massive.Foo(a,b,c);	
	
	// But that does not fix this object....
	//alert("this = " + this);
	
	// We can set the fields..
	com.massive.Foo.apply(this,[a,b,c]);
	
	// But the prototype component is wrong for 'this'.
	
	// So we need to add it in to make 'this' look like it was constructed by calling the 'new' com.massive.Foo
	MixinPrototype(com.massive.Foo,this);
	
	alert("this.A = " + this.A);
}

// Object method
com.massive.Foo.prototype.Bar = function(a,b,c)
{				
	Thunk("com.massive.Foo", "STUB com.massive.Foo.prototype.Bar");		
	return com.massive.Foo.prototype.Bar.apply(this,[a,b,c]);
}







