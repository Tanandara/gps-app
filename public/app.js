$(function() {
	var gpslist=[];
	var socket = io.connect();
  //var socket = io.connect('http://localhost:3000');

	socket.on('greet', function(data) {
		toastr.info(data.message);
	});

	socket.on('room', function(data) {
		if(gpslist.filter(x=>x.client==data.client).length == 0){
			 		data.marker = new google.maps.Marker({
					position:new google.maps.LatLng(data.lat,data.long),
					animation:google.maps.Animation.BOUNCE
				});
				data.marker.setMap(map);
				gpslist.push(data);
		}else{
			gpslist.forEach( user => {
				if(user.client == data.client){
					user.id = data.id;
					user.lat = data.lat;
					user.long = data.long;
					user.marker.position = new google.maps.LatLng(data.lat,data.long);
					user.marker.setMap(map);
				}
			});
			addclient(gpslist);
		}
		console.log(gpslist);
		//toastr.success(data.message);
	});

	socket.on("disconnect_room",function(data){
		gpslist.forEach(function(x,index){
			if(x.client == data){
				gpslist[index].marker.setMap(null);
				gpslist.splice(index,1);
			}
		});
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
			});
		} else {
				alert("ไม่สามารถดึงค่า GPS ได้");
				window.close();
		}
		//console.log(gpslist);
	},2000);

});


var map= new google.maps.Map(document.getElementById("map"),{
		center:new google.maps.LatLng(1,1),
		zoom:10,
		mapTypeId:google.maps.MapTypeId.ROADMAP
});

map.setCenter({
	lat: 13.736717, lng: 100.523186
});


function addclient(data){
	$("#userlist").html("");
	data.forEach(function(user,index){
		$("#userlist").append(
			"<tr><td>"+user.id+"</td><td>"+user.lat.toFixed(6)+"</td><td>"+user.long.toFixed(6)+"</td></tr>"
		);
	});
}
