$(document).ready(function(){
    $("body").css("width", "50%");
    $("body").css("height", "50%");
    $("body").css("margin", "0 auto");

    function gameOver() {
      $('#message').text("GAME OVER");
      $('#grid').empty();
      gameStart();
      newGame();
    }

    var checkBorder = function(){
      var topArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      var rightArray = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400];
      var leftArray = [1, 21, 41, 61, 81, 101, 121, 141, 161, 181, 201, 221, 241, 261, 281, 301, 321, 341, 361, 381];
      var bottomArray = [381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400];
      if (topArray.indexOf($snake.position[$snake.size - 1]) > -1 && $snake.direction == 'up') {
        gameOver();
      }
      if (rightArray.indexOf($snake.position[$snake.size - 1]) > -1 && $snake.direction == 'right') {
        gameOver();
      }
      if (leftArray.indexOf($snake.position[$snake.size - 1]) > -1 && $snake.direction == 'left') {
        gameOver();
      }
      if (bottomArray.indexOf($snake.position[$snake.size - 1]) > -1 && $snake.direction == 'down') {
        gameOver();
      }
      if (rightArray.indexOf($snake.position[$snake.size - 1]) > -1 && leftArray.indexOf($snake.position[$snake.size - 2]) > -1) {
        gameOver();
      }
      if (leftArray.indexOf($snake.position[$snake.size - 1]) > -1 && rightArray.indexOf($snake.position[$snake.size - 2]) > -1) {
        gameOver();
      }
      for (var i = 0; i < $snake.position.length - 1; i++) {
        if ($snake.position[i] < 1 || $snake.position[i] > 400) {
          gameOver();
        }
      }
      checkDuplicate($snake.position);
    }
    var checkDuplicate = function(arr) {
      if (arr.length < 4) {
        for (var i = 0; i < arr.length - 1; i++){
          if (arr[arr.length - 1] == arr[i]){
            gameOver();
          }
        }
      } else if (arr.length >= 4) {
            for (var i = 0; i < arr.length - 2; i++){
              if (arr[arr.length - 1] == arr[i]){
                gameOver();
              }
            }
        }
    }

    $(document).on("keydown", function(e){
      $snake.current_direction = e.which;
      if ($snake.opposite_direction != $snake.direction){
        $snake.direction = $snake.current_direction;
      }

      switch($snake.direction) {
        case 38:
        case 87:
        $snake.direction = 'up';
        break;
        case 37:
        case 65:
        $snake.direction = 'left';
        break;
        case 40:
        case 83:
        $snake.direction = 'down';
        break;
        case 39:
        case 68:
        $snake.direction = 'right';
        break;
      }
    });


    var $snake = {
      value: '',
      init_position: function(){
        $("#grid div:nth-child(189)").html($snake.value).addClass("snake");
        $("#grid div:nth-child(190)").html($snake.value).addClass("snake");
      },
      current_direction: 'right',
      direction: '',
      head: function(){$snake.position.shift(0)},
      position: [189, 190, 191],
      size: [2],
      body: function(){
        for (var k = $snake.size[0]; k > 0; k--){
        $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
        }
      },
    }

    var Grid = function(){
    var $rows = 20;
    var $columns = 20;
  		for(var i = 0; i < $rows; i++){
  			for(var j = 0; j < $columns; j++){
  				$('<div id=' + i + '.' + j + ' class="this">' + " " + '</div>').appendTo("#grid");
  				$('#grid div:nth-child(' + ($columns * j) + ') + ').css("clear", "left");
  			}
  	  }
  	};

    var $food = {
      refill: function(arr){
        var result = Math.floor(Math.random() * $('.this').length);
        for (var i = 0; i < arr.length - 1; i++) {
          if (result != i) {
            $food.total[0] = result;
            $('#grid div:nth-child(' + $food.total[0] + ')').addClass("green");
          } else {
            $food.refill(arr);
          }
        }
      },
      total: [193],
      init: function(){
        $('#grid div:nth-child(' + 193 + ')').addClass("green");
      }
    }

    var move = function(){
      if(($snake.direction == 'right') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
          $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
          $snake.position.push($snake.position[$snake.size[0]]);
          $snake.body();
          $snake.size[0] = $snake.size[0] + 1;
          $food.total[0] = [0];
          $food.refill($snake.position);
        } else if($snake.direction == 'right'){
          $snake.position.push($snake.position[$snake.size[0]] + 1);
          $snake.body();
          $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
          $snake.position.shift(0);
        } else if(($snake.direction == 'left') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
            $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
            $snake.position.push($snake.position[$snake.size[0]]);
            $snake.body();
            $snake.size[0] = $snake.size[0] + 1;
            $food.total[0] = [0];
            $food.refill($snake.position);
        } else if($snake.direction == 'left'){
            $snake.position.push($snake.position[$snake.size[0]] - 1);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            $snake.position.shift(0);
        } else if(($snake.direction == 'down') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
            $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
            $snake.position.push($snake.position[$snake.size[0]]);
            $snake.body();
            $snake.size[0] = $snake.size[0] + 1;
            $food.total[0] = [0];
            $food.refill($snake.position);
       } else if($snake.direction == 'down'){
            $snake.position.push($snake.position[$snake.size[0]] + 20);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            $snake.position.shift(0);
       } else if(($snake.direction == 'up') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
            $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
            $snake.position.push($snake.position[$snake.size[0]]);
            $snake.body();
            $snake.size[0] = $snake.size[0] + 1;
            $food.total[0] = [0];
            $food.refill($snake.position);
       } else if($snake.direction == 'up'){
            $snake.position.push($snake.position[$snake.size[0]] - 20);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            $snake.position.shift(0);
      }
    }
    $("#grid").css("width", "400");
    $("#grid").css("height", "400");
    $("#grid").addClass("purple");

    function render(e){
      Grid();
      $snake.init_position()
      $('#message').text("Snake size = " + $snake.size);
    };

    var newGame = function(){
        $snake.current_direction = 'right';
        $snake.direction = '';
        $snake.position = [189, 190, 191];
        $snake.size = [2]
    }

    function gameStart() {
      render();
      $food.init();
      $food.total = [193];
    }
    
    gameStart();
      setInterval(function(){
        checkBorder();
        move();
        $('#message').text("Snake size = " + $snake.size);
      }, 150);
  });
