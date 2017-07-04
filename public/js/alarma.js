// var fs = require('fs');
var current = {};
var socket = io();

function buscar(fn){
	$('#error').hide();
	var numero = $('#searchValue').val();

	$.get('getUser/'+numero,function(current){
		if(current.id){
			$('#defaultMessage').hide();
			$('#detailsRow').show();
			$('#direccion').text(current.direccion);
			$('#nombre').text(current.nombre);
			$('#telefono').text(current.telefono);
			$('#mapa').attr("src", "data/"+current.id+"/map.jpg");
			if(typeof fn == "function"){
				fn();
			}
		}else{
			$('#error').text(current);
			$('#error').show();
		}

	});

}

function checkEnter(e){
	if (e.keyCode == 13) {
		buscar();
	}
}
socket.on('alarmaevent', function(msg){
	// blinkTitle()
	$('#searchValue').val(msg.from);
	buscar(blinkTitle);
	console.log('alarma!!!'+msg.from)
    // $('#messages').append($('<li>').text(msg));
  });
	socket.on('disconect', function(){
	 console.log('desconectado');
 });
 socket.io.on('connect_error', function(err) {
  // handle server error here
	$('.msgText').text('Desconectado del servidor').addClass('alert-danger');
	$('#scanningText').text('Reconectando').addClass('alert-danger');

	// $('#disconected').show();
	// $('#scanning').hide();

});
socket.on('ping', function(data){
	$('.msgText').text('Conectado del servidor').removeClass('alert-danger');
	$('#scanningText').text('Escaneando').removeClass('alert-danger');
		// $('#disconected').hide();
		// $('#scanning').show();
	});


function blinkTitle(){
	var ntimes = 0;
	var alertInterval = setInterval(function(){
		if(ntimes == 31){
		$('#alarmaTitle').removeClass('alert-danger');
			clearInterval(alertInterval);
		}
		if(ntimes%2 == 0){
			$('#alarmaTitle').addClass('alert-danger');
		}else{
			$('#alarmaTitle').removeClass('alert-danger');
		}
		ntimes++
	},500);
}

var opts = {
  lines: 13 // The number of lines to draw
, length: 17 // The length of each line
, width: 8 // The line thickness
, radius: 17 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
};
var spinner = new Spinner(opts).spin(document.getElementById('spinnerDiv'));
// $('#spinnerDiv').append(spinner.el)
