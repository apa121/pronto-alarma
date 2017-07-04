var fs = require('fs');
var current = {};

function buscar(){
	$('#error').text('');
	var numero = $('#searchValue').val();
	//console.log(numero);
	var result = _.find(numeros, function(num){ return num.n == (numero+"")});
	if(typeof result != "undefined"){
		//El numero esta registrado.
		console.log(result);
		
		fs.readFile('data/'+result.id+'/info.json', 'utf8', function(err, data){
			if(err){
				console.log('does not exist');
			}else{
				// console.log(data);
				current = JSON.parse(data);
				$('#direccion').text(current.direccion);
				$('#nombre').text(current.nombre);
				$('#mapa').attr("src", "data/"+result.id+"/map.jpg");
			}

		});

	}else{
		$('#error').text('El numero no existe en la base de datos');
	}
}

function checkEnter(e){
	if (e.keyCode == 13) {
		buscar();
	}
}