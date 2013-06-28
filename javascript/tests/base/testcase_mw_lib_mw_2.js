





	var Animal = MetaWrap.Class.extend
    (
        {
            constructor: function(p_name)
            {
                this.m_name = p_name;
            },

            m_name: "Animal",

            eat: function()
            {
                this.say("Yummy!");
            },

            say: function(p_message)
            {
                document.write("<p><b>" + this.m_name + "</b>: " + p_message + "</p>");
            },

          	escape: function()
          	{
          		document.write("<p><b>" + this.m_name + "</b>: runs away </p>");
          	}
	    }
    );





	var Cat = Animal.extend
    (
        {
            eat: function(p_food)
            {
                if (p_food instanceof Mouse)
                {
	                this.base();
	            }
                else
                {
                	this.say("Yuk! I only eat mice.");
                }
            }
	    }
    );


	// Make a mouse an un modified animal
	var Mouse = Animal.extend(
		{
            eat: function(p_food)
            {
                if (p_food instanceof Mouse)
                {
	                this.say("Yuk! I am not a cannibal.");
	            }
                else
                {
                	this.base();
                }
            }
		}
	);

	var l_tom = new Cat("Tom");

	var l_jerry = new Mouse("Jerry");

	var l_mickey = new Mouse("Mickey");

	l_jerry.eat("cheese");

	l_tom.eat("cheese");

	l_tom.eat(l_jerry);

	l_mickey.eat(l_jerry);

	//
	//
	//

	document.write("<hr/>");

/*
    var object1 = new MetaWrap.Class;
    object1.extend(
        {
                m_value: "some data",

                method: function()
                    {
                        document.write("Hello World!<br/>");
                    }
        }
    );

    object1.method();

    var object2 = new MetaWrap.Class;

    object2.method = function()
    {
        document.write("Hello World!<br/>");
    };

    object2.extend(
        {
			method: function()
            {        // call the "super" method
                    this.base();
                    // add some code
                    document.write("Hello again!<br/>");
            }
        }
    );


    object2.method();
*/

var Point = MetaWrap.Class.extend
(
    {
    	m_x:0.0,
    	m_y:0.0,

        constructor: function(p_x, p_y)
        {
            this.m_x = p_x;
            this.m_y = p_y;
        },

        describe: function()
        {
        	document.write("Point at " + this.m_x + "," + this.m_y);
        }
	}
);

var Line = Point.extend
(
    {
    	m_xe:0.0,
    	m_ye:0.0,

        constructor: function(p_x,p_y,p_xe,p_ye)
        {
        	this.base(p_x,p_y);

            this.m_xe = p_xe;
            this.m_ye = p_ye;
        },

        describe: function()
        {
        	document.write("Line - starting at ");
        	this.base();
        	document.write(" and ending at Point " + this.m_xe + "," + this.m_ye);
        }

	}
);


var Circle = Point.extend
(
	{
		// instance interface
		constructor: function(p_x, p_y, p_radius)
		{
			this.base(p_x, p_y);
			this.m_radius = p_radius;
		},

		m_radius: 0,

		getCircumference: function()
		{
			return 2 * Circle.PI * this.m_radius;
		},

        describe: function()
        {
        	document.write("Circle of radius " + this.m_radius + " with center at ");
        	this.base();
        }

	},
	{
			// class interface
			PI: Math.PI
	}
);


var l_point = new Point(100,101);

l_point.describe();

document.write("<br/>");

var l_line = new Line(10,10,20,20);

l_line.describe();

document.write("<br/>");

var l_circle = new Circle(25,25,1);


document.write("l_circle.getCircumference() = " + l_circle.getCircumference());

document.write("<br/>");


/*
var Circle2 = Shape.extend
(
	{
		constructor: function(radius)
		{
			this.extend(
				{
					getCircumference: function()
					{
						return 2 * Math.PI * radius;
					}
				}
			);
		}
	}
);
*/

function Constructor ()
{
	var foo = [];

/*
	this.length getter = function ()
	{
		return foo.length
	}
*/
}

Constructor.prototype =
{
	publicList: []

/*
	,
	get publicLength ()
	{
		return this.publicList.length
	}
*/
}