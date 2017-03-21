module.exports = function(io) {
	// var gpslist = [
	// 	{ id: 'marker2', lat: 14.7510555, long: 100.65721090000001 },
	// 	{ id: 'marker5', lat: 12.7510555, long: 100.65721090000001 }
	//
	// ];
	var gpslist = [];
	io.on('connect', function(client) {
		console.log('Connected : (' + client.id + ')');
		client.emit('greet', { message: 'Welcome to socket.io' });
		client.on('room', function(data) {
			if(gpslist.length == 0) {
				gpslist = [data];
			}else if(gpslist.filter((x)=>x.id==data.id).length == 0){
				gpslist = [...gpslist,data];
				console.log(gpslist);
			}else{
				gpslist.forEach((value,index)=>{
					if(value.id==data.id) {
						value.lat = data.lat;
						value.long = data.long;
					}
				})
				console.log(gpslist);
			}
			io.emit('room',  gpslist );
		});
		client.on('disconnect', function() {
			 console.log('Disconnected : (' + client.id +')');
		});
	});

	// setTimeout(function() {
	// 	io.emit('greet', { message: 'Hello World' });
	// }, 2000);
}
