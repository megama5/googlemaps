var maps = [];
var markers = [];


function calculateAndDisplayRoute(directionsService,directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


function initMap() {
	const directionsService = new google.maps.DirectionsService; 
	const directionsDisplay = new google.maps.DirectionsRenderer;
  
  var point = {lat: 46.4676234, lng: 30.6613515};

  var map = new google.maps.Map(document.getElementById('travel-map'), {
    zoom: 10,
    center: point,
  });
  
  directionsDisplay.setMap(map);
  
  document.getElementById('calc').addEventListener('click', (e)=>{
			calculateAndDisplayRoute(directionsService,directionsDisplay);
	});
}



function initMaps(){
	
	let arr = document.getElementsByClassName('styled-map__list-item');
		
	for(let index = 0; index < arr.length; index++){

		try{

			let map = new google.maps.Map(arr[index], {
				zoom:9,
				center: mapPoints[index].latLng,
				styles: mapStyles[index],
			});

			let marker = new google.maps.Marker({
				position: mapPoints[index].latLng,
				map: map,
				title: mapPoints[index].text,
			});

			google.maps.event.addListener(marker, "click", (evt) => {  
				let infowindow = new google.maps.InfoWindow();
	    	infowindow.setContent( mapPoints[index].text );
	    	infowindow.open( marker.getMap(), marker );
			});  

			maps.push(map);
			markers.push(marker);
		}catch(e){
			console.log(e);
		}

	}
}

/*
* Slow mode function :) 
* up to 30 iterations
* @deprecated
*/
function getRandomIndexesArray(count){
	let arr = [];
	let iterations = 0;
	while( arr.length < count){
		let val = (Math.floor( Math.random() * count));
		if(arr.indexOf(val) == -1){
			arr.push(val);
		}
		iterations++;
	}
	console.log('Shuflle indexes costs ', iterations, ' iterations');
	return arr;
}



(function($){
	
	$(window).on('load', (e)=>{
		
		initMap();
		
		initMaps();

		$('#shuflle').on('click', (e)=>{
			try{
				
				let mapsBuff = maps.slice();

				for(let i of markers){

					let index = (Math.floor( Math.random() * mapsBuff.length));

					let map = mapsBuff[ index ];
					
					i.setMap(map);

					map.panTo(i.getPosition()); 

					mapsBuff.splice(index, 1);
				}

			}catch(exception){
				// possible array out of bound exception
				console.log(exception);
			}

		});

	})

})(jQuery);