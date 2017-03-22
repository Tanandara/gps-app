module.exports = function(io) {
	io.on('connect', function(client) {
		console.log('Connected : (' + client.id + ')');
		client.emit('greet', { message: 'Welcome to socket.io' });
		client.on('room', function(data) {
			data.client = client.id;
			console.log(data);
			io.emit('room',  data );
		});
		client.on('disconnect', function() {
			 console.log('Disconnected : (' + client.id +')');
			 io.emit('disconnect_room',client.id);
		});
	});
}
