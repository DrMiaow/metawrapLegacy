
com.massive.Foo = function(a,b,c)
{		
	this.A = a;
	this.B = b;
	this.C = c;	
	
	this.stack = [];
}

com.massive.Foo.prototype.Bar = function(x,y,z)
{	
	return(x + " " + y + " " + z + "-" + this.A + " " + this.B + " " + this.C );
}
