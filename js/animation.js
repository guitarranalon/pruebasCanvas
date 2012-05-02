var animationModule = (function(){
	var width = 500,
		height = 375,
		x = 0,
		dx = newSpeed(),
		redrawInterval = 10,
		intervalo,
		ctx;
		
	var $spanTotal,
		$botonDetener,
		$botonEmpezar,
		$listaResultados,
		$botonesJuego,
		$parrafoTotal,
		$resultadoJuego;

	function inicializarVariablesDOM(){
		$parrafoTotal = $('#total');	
		$spanTotal = $parrafoTotal.find('span');
		$botonDetener = $('#botonDetener');
		$botonEmpezar = $('#botonEmpezar');
		$listaResultados = $('#resultados').find('ol');
		$botonesJuego = $('#juego').find('input');
		$resultadoJuego = $('#gameResult');
	}
	
	function ocultarMostrarBotonesSiPartidaCompleta(){
		if (resultsModule.completed())
		{
			$botonesJuego.hide();
			mostrarResultado();
		}
		else
		{
			$botonDetener.fadeOut(200);
			$botonEmpezar.fadeIn(200);
		}	
	}
	
	function newSpeed(){
		return Math.floor(Math.random()*4)+1;
	}
	
	function clear() {
		ctx.clearRect(0, 0, width, height);
	}
	
	function evaluar(){
		var diferencia = Math.round((x-width)/dx*redrawInterval);
		alert("Te has equivocado por: " + diferencia + " ms");
		resultsModule.escribirResultado(diferencia);
		resultsModule.nuevoResult(diferencia);
		$spanTotal.html(resultsModule.globalResult() + " ms");
	}
	
	function reset(){
		x=0;
		dx = newSpeed();
		animationModule.draw();
	}

	function start(){
		intervalo = setInterval(animationModule.draw,redrawInterval);			
	}
	
	function parar(){
		window.clearInterval(intervalo);
		evaluar();
		reset();
	}
	
	function mostrarResultado(){
		if (resultsModule.globalResult()<=1000)
			$resultadoJuego.html('¡Enhorabuena! Lo has logrado');
		else
			$resultadoJuego.html('Game Over! ¡Has tardado m&aacute;s de 1 segundo entre los cuatro intentos!');
			
		$resultadoJuego.fadeIn(1000);
	}
	
	return{

		init: function(context){
			ctx = context;
			inicializarVariablesDOM();
			
			resultsModule.init();
			resultsModule.retomarPartida();
			
			ocultarMostrarBotonesSiPartidaCompleta()			
			
			$spanTotal.html(resultsModule.globalResult() + " ms");
		},	
	
		draw: function(){
			clear();
	
			/* road */
			ctx.fillStyle = "#292C37"; 
			ctx.fillRect(0, 170, 500, 34);			
	
			/* car */
			ctx.fillStyle = "#06ADEF"; 
			ctx.fillRect(x, 177, 20, 20);
			
			/* tunnel */
			ctx.fillStyle = "#C72546"; 
			ctx.fillRect(300, 165, 200, 44);			
			
			/* move */
			x += dx;
					
			/* if it goes so far away then stop */
			if (x>(3*width))
			{
				parar();
			}
		},

		empezarClickHandler: function(){
			start();
	
			$(this).fadeOut(200);
			$botonDetener.fadeIn(200);
		},

		detenerClickHandler: function(){
			parar();
	
			ocultarMostrarBotonesSiPartidaCompleta();
		},
		
		nuevaPartidaClickHandler: function(){
			$listaResultados.html('');
			$resultadoJuego.html('').hide();
			$botonEmpezar.show();
			resultsModule.clear();
			$spanTotal.html('0 ms');
		}
	};
}());