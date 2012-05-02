var resultsModule = (function(){
	var lastResults = new Array();
	
	var $listaResultados;
	
	return{
		
		init: function (){
			$listaResultados = $('#resultados').find('ol');
		},
		
		escribirResultado: function (diferencia){
			$listaResultados.append('<li>Diferencia: ' + diferencia + ' ms</li>');
		},
		
		completed: function(){
			return lastResults.length >= 4;
		},
		
		nuevoResult: function(result){
			lastResults.push(result);
			localStorage["resultadosAnteriores"] = JSON.stringify(lastResults);
		},
		
		clear: function(){
			lastResults = new Array();
			localStorage.clear();
		},
		
		getResults: function(){
			return lastResults;
		},
		
		globalResult: function(){
			var total = 0,
				length = lastResults.length;
				
			for (i=0;i<length;i++)
				total += Math.abs(lastResults[i]);
				
			return total;
		},
		
		retomarPartida: function(){
			var hayPartidaParaRetomar = localStorage["resultadosAnteriores"]!=null;
			if (hayPartidaParaRetomar)
				lastResults = JSON.parse(localStorage["resultadosAnteriores"]);
			
			$.each(lastResults, function(){
				resultsModule.escribirResultado(this);
			});
			
			return hayPartidaParaRetomar;
		}
	};
}());