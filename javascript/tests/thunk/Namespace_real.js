NameSpace.f = function(x,y,z)
{		
	alert(x + " " + y + " " + z);
}

NameSpace.MyObject = function(a,b,c)
{		
	this.A = a;
	this.B = b;
	this.C = c;
}

NameSpace.MyObject.prototype.f = function(x,y,z)
{	
	return(x + " " + y + " " + z + "-" + this.A + " " + this.B + " " + this.C );
}
