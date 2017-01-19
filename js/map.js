function initMap() {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.978912, lng: -96.619038},
        zoom: 3,
        disableDefaultUI: true,
        styles:     
            [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a0d6d1"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#dedede"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#dedede"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f1f1f1"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    });
    
    // Start
    var marker1 = new google.maps.Marker({
        map: null,
        position: {lat: 0,lng:  0},
        zIndex: 2,
        icon: {
            url: 'img/map/marker1.png',
            scaledSize: new google.maps.Size(40, 40)
        },
    });
    // End
    var marker2 = new google.maps.Marker({
        map: null,
        position: {lat: 0,lng:  0},
        zIndex: 2,
        icon: {
            url: 'img/map/marker2.png',
            scaledSize: new google.maps.Size(40, 40)
        },
        
    });
    // Package
    var marker3 = new google.maps.Marker({
        map: null,
        position: {lat: 0,lng:  0},
        zIndex: 3,
        icon: {
            url: 'img/map/marker3.png',
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
        },
        
    });
    
    $('#tracking_scroll .shipment_card').click(function() {
        
        var origin = null;
        var destination = null;
        var progress = $(this).find('progress').val();
        
        calculateAndDisplayRoute(directionsService, directionsDisplay, $(this).attr('start'), $(this).attr('end'));
        
        geocoder.geocode( { 'address': $(this).attr('start')}, function(results, status) {
            if (status == 'OK') {
                origin = results[0].geometry.location;
                
                marker1.setPosition(origin);
                marker1.setMap(map);
                
                if ( progress == 0 ) {
                    marker3.setPosition(marker1.getPosition());
                    marker3.setMap(map);
                };
                
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        
        geocoder.geocode( { 'address': $(this).attr('end')}, function(results, status) {
            if (status == 'OK') {
                destination = results[0].geometry.location;
                
                marker2.setPosition(destination);
                marker2.setMap(map);
                
                if ( progress == 100 ) {
                    marker3.setPosition(marker2.getPosition());
                    marker3.setMap(map);
                };
                
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        
        if ( progress != 0 && progress != 100 ) {
            var packPos = new google.maps.LatLng($(this).attr('lat'), $(this).attr('lng'));
            marker3.setPosition( packPos );
            marker3.setMap(map);
        };
        
    });
    
    geocoder = new google.maps.Geocoder();
    
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: "#1ABC9C",
            strokeOpacity: '0.5',
            strokeWeight: '4'
        },
        markerOptions: {
            suppressMarkers: 'true',
        },
    });
    
    directionsDisplay.setOptions( { suppressMarkers: true } );
    directionsDisplay.setMap(map);
    
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


    
