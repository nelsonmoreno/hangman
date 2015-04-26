'use strict';

/**
 * @ngdoc function
 * @name warApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the warApp
 */
angular.module('warApp')
  .controller('MainCtrl', function ($scope) {

	var wordArray;
	var wordArrayLength;
    
    $scope.word="";
    $scope.chars=[];
    $scope.hangmanWord="";
    $scope.user={'name':'', 'attempts':0, 'games':{'won':0,'lose':0, 'round':0}, 'score':0};
    $scope.maxAttempts = 10;
    $scope.categorias = {};
    $scope.categoriasKeys = ['numero', 'color', 'fruta', 'figura', 'animal'];
    $scope.words=[];
 
    $scope.setup=function(){
    	
    	$scope.categorias["numero"] = ['uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince'];
    	$scope.categorias["color"] = ['rojo','verde','amarillo','azul','anaranjado','cafe','morado','magenta','rosado','plateado','gris','negro','trece','blanco','abano'];
    	$scope.categorias["fruta"] = ['mora','fresa','mango','naranja','papaya','limon','aguacate','pera','manzana','mandarina','coco','uva','tomate','ciruela','durazno'];
    	$scope.categorias["figura"] = ['circulo','cuadrado','triangulo','rectangulo','rombo','ovalo','trapecio','pentagono'];
    	$scope.categorias["animal"] = ['oso','perro','gato','canario','loro','serpiente','nutria','cocodrilo','raton','caballo','burro','foca','leon','tigre','vaca'];
    	
    	$scope.words=$scope.categorias.numero;
    	$scope.selectedCategory = "numero";
    }
    $scope.changeCategory = function(){
    	if(null!=$scope.selectedCategory&&$scope.selectedCategory.trim().length>0){
	    	$scope.words=$scope.categorias[$scope.selectedCategory];
	    	$scope.reset();
    	}
    }
    $scope.setup();
    
    $scope.randWords = function (){
    	return $scope.words[Math.floor(Math.random() * $scope.words.length)];
    }
    
    $scope.reset = function (){
    	if(!($scope.maxAttempts <= $scope.user.attempts||$scope.word.length==0)){
    		$scope.user.score = $scope.user.score -10;
    		$scope.gamemessage = 'Iniciaste un nuevo juego sin terminar el anterior, te penalizamos con -10 puntos. Tienes ' + ($scope.maxAttempts - $scope.user.attempts) + ' intentos, concentrate y mucha suerte!';
    	}else{
    		$scope.gamemessage = 'Iniciaste un nuevo juego, tienes ' + ($scope.maxAttempts - $scope.user.attempts) + ' intentos, concentrate y mucha suerte!';
    	}    	
    	$scope.hangmanWord ="";
    	$scope.user.games.round = $scope.user.games.round +1; 
    	$scope.word = $scope.randWords();    	
    	wordArray = $scope.word.split('');
    	wordArrayLength = wordArray.length;
    	$scope.chars=[];
    	for (var i = 0; i < wordArrayLength; i++) {
    		$scope.chars.push ({'char':wordArray[i], 'visible':false});
    	}
    	$scope.user.attempts = 0;
    	$scope.inputChar="";
    }
    
    $scope.tryhang = function(char){
    	if(!($scope.maxAttempts <= $scope.user.attempts||$scope.word.length==0)){
	    	if(null==$scope.word||$scope.word.trim().length<1){
	    		$scope.reset();
	    	}
	    	if($scope.hangmanWord.indexOf(char)>-1){
	    		$scope.user.attempts = $scope.user.attempts + 1;
	    		$scope.gamemessage = "Oops! la letra "+ char +" ya ha sido usada, pierdes -5 puntos, ";
	    		$scope.user.score = $scope.user.score - 1;
	    	}else{
	    		if($scope.word.indexOf(char)>-1){
	    			$scope.word = $scope.word.replace(eval('/'+char+'/gi'), '');
	    			
	    			for(var i = 0; i < $scope.chars.length; i++){
	    				if($scope.chars[i].char.toUpperCase()===char.toUpperCase()){
	    					$scope.chars[i].visible = true;
	    				}
	    			}
	    			$scope.gamemessage = "Adivinaste la letra " + char + ", te abonamos +1 punto, ";
	    			$scope.user.score = $scope.user.score + 1;
	    		}else{
	        		$scope.user.attempts = $scope.user.attempts + 1;
	        		$scope.user.score = $scope.user.score - 1; 
	        		$scope.gamemessage = "Oops! " + char + " no es una letra de la palabra, pierdes -1 punto, ";
	    		}
	    		$scope.hangmanWord = $scope.hangmanWord  + char;
	    	}
	    	
	    	if($scope.maxAttempts <= $scope.user.attempts){
	    		$scope.gamemessage = "LO SENTIMOS HAS PERDIDO, SIGUE INTENTANDO, pierdes -10 puntos."
	    		$scope.user.score = $scope.user.score - 10;	
	    	}else if($scope.word.length===0){
	    		$scope.gamemessage = "FELICITACIONES HAS GANADO!!!! te abonamos +10 puntos."
				$scope.user.score = $scope.user.score + 10; 	
	    	}else{
	    		$scope.gamemessage = $scope.gamemessage + ' aun tienes ' + ($scope.maxAttempts - $scope.user.attempts) + ' intentos mas!';    		
	    	}
    	}
    	$scope.inputChar="";
    }
    
    $scope.keypress = function(keyEvent) {
    	var char = String.fromCharCode(keyEvent.keyCode)
    	$scope.tryhang(char);
    };

    
	var coin,
	coinImage,
	canvas;					

	$scope.gameLoop = function () {

		window.requestAnimationFrame($scope.gameLoop);

		switch($scope.user.attempts) {
		    case 0:
		    	coin.clear();
		        break;		
		    case 1:
		    	coin.draw(5, 5, 256, 145, 0, 220, 256, 145);
		        break;
		    case 2:
		        coin.draw( 90, 52, 100, 305, 0, 0, 100, 310);
		        break;
		    case 3:
		        coin.draw(5, 52, 75, 71, 97, 1, 75, 71);
		        break;
		    case 4:
		        coin.draw(266, 5, 84, 88, 165, 0, 84, 88);
		        break;
		    case 5:
		        coin.draw( 197, 238, 63, 66, 130, 61, 63, 66);
		        break;
		    case 6:
		        coin.draw(266, 103, 79, 55, 119, 116, 79, 55);
		        break;
		    case 7:
		        coin.draw(5, 168, 39, 70, 173, 80, 39, 70);
		        break;
		    case 8:
		        coin.draw(261, 168, 40, 60, 105, 82, 40, 60);
		        break;
		    case 9:
		        coin.draw(197, 52, 59, 68, 160, 150, 59, 68);
		        break;
		    case 10:
		        coin.draw(197, 130, 54, 64, 104, 150, 54, 64);
		        break;		        
		    default:
		       ;
		}		
	}

	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.draw = function (sx, sy, swidth, sheight, x, y, width, height) {
			
			// Clear the canvas
			//that.context.clearRect(0, 0, that.width, that.height);
		  
			// Draw the animation
			that.context.drawImage(
			   that.image,
			   sx,
			   sy,
			   swidth,
			   sheight,
			   x,
			   y,
			   width,
			   height);
		};
		
		that.clear = function(){
			that.context.clearRect(0, 0, canvas.width, canvas.height);		
		}
		
		return that;
	}

	canvas = document.getElementById("coinAnimation");
	canvas.width = 260;
	canvas.height = 260;
	
	coinImage = new Image();	
	
	coin = sprite({
		context: canvas.getContext("2d"),
		width: 346,
		height: 320,
		image: coinImage,
		numberOfFrames: 10,
		ticksPerFrame: 4
	});
	
	// Load sprite sheet
	coinImage.addEventListener("load", $scope.gameLoop);
	coinImage.src = "images/spritesheetww.png";    
	    
	$scope.$watch('user.name', function() {
		if($scope.user.name.trim().length>0){
		    $scope.startDisabled=false;
		    $scope.reset();
		}else{
			$scope.startDisabled=true;
		}
	
	});
    
});
