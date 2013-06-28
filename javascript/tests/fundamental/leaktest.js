function createLinks()
{
	var x = document.getElementById('writeroot');
	var y = document.createElement('a');
	y.appendChild(document.createTextNode('A link - '));
	y.href = '#';
	for (var i=0;i<10000;i++)
		x.appendChild(y.cloneNode(true));
}