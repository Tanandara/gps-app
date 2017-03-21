$(function() {
	var gpslist=[];
	var markerlist=[];
	var socket = io.connect();
    //var socket = io.connect('http://localhost:3000');

	socket.on('greet', function(data) {
		toastr.info(data.message);
	});

	socket.on('room', function(data) {
		gpslist = data;
		//toastr.success(data.message);
	});

	setInterval(function(){
		//ส่ง GPS
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
						socket.emit('room', {
							id: $("#user").val() ,
							lat: position.coords.latitude,
							long: position.coords.longitude
						});
						map.setCenter({
							lat: position.coords.latitude,
							lng: position.coords.longitude
						});
			});
		} else {
				alert("ไม่สามารถดึงค่า GPS ได้");
				window.close();
		}


		//marker
		console.log(gpslist);

		if(gpslist.length == markerlist.length){
			gpslist.forEach(function(x,index){
					markerlist[index].position = new google.maps.LatLng(x.lat,x.long);
					markerlist[index].setMap(map);
				});
		}else{
			markerlist.forEach(function(marker,index){
				marker.setMap(null);
				markerlist=[];
			})
			gpslist.forEach(function(x,index){
				var marker = new google.maps.Marker({
					position:new google.maps.LatLng(
						x.lat,x.long),
						animation:google.maps.Animation.BOUNCE
					});
					markerlist.push(marker);
					markerlist[index].setMap(map);
				});

		}


		// gpslist.forEach(function(x){
		// 	var marker = new google.maps.Marker({
		// 		position:new google.maps.LatLng(
		// 			x.lat,x.long),
		// 			animation:google.maps.Animation.BOUNCE
		// 		});
		// 		marker.setMap(map);
		// 	});



	},1000);

});


var map= new google.maps.Map(document.getElementById("map"),{
		center:new google.maps.LatLng(1,1),
		zoom:20,
		mapTypeId:google.maps.MapTypeId.ROADMAP
});







// var i=1;
// setInterval(function(){
// 	if(marker){
// 		marker.position = new google.maps.LatLng(i,i);
// 		i++;
// 		marker.setMap(map);
// 	}
// 	map.setCenter(marker.position);
// },2000);
