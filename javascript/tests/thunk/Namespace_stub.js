
//Declare namespace
var NameSpace = {};
		
// Static function
NameSpace.f = function(x,y,z)
{		
	Thunk("NameSpace");		
	return NameSpace.f.apply(this,[x,y,z]);
}

// Object constructor with properties
NameSpace.MyObject = function(a,b,c)
{		
	Thunk("NameSpace");		
	return NameSpace.MyObject.apply(this,[a,b,c]);
}

// Object method
NameSpace.MyObject.prototype.f = function(a,b,c)
{			
	Thunk("NameSpace");		
	return NameSpace.MyObject.prototype.f.apply(this,[a,b,c]);
}


