var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

const redis = require('redis');
const client = redis.createClient();

app.listen(3000,'10.0.2.153');

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on
	(
		'connection', 
		function (socket) 
		{
 			console.log("connection");

 			const subscribe = redis.createClient();
        		subscribe.subscribe('pubsub');

  			subscribe.on
				(
					"message", 
					function(channel, message) 
					{
						 socket.emit
        				         	(
	                                			'news',
                                				{ hello: message }
                        				);
        				}	
				);


  			socket.emit
			(
				'news', 
				{ hello: 'world' }
			);

  			socket.on
			(
				'my other event', 
	 			function (data) 
				{
    					console.log(data);
  				}
			);

		}				
	);
