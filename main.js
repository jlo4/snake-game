$(document).ready(function(){
    $("body").css("width", "50%");
    $("body").css("height", "50%");
    $("body").css("margin", "0 auto");
    $("body").css("background", "red");

    function gameOver() {
      $('#message').text("GAME OVER");
      $('#grid').empty();
      gameStart();
      newGame();
    }

    var checkBorder = function(arr){
      var topArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      var rightArray = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400]
      var leftArray = [1, 21, 41, 61, 81, 101, 121, 141, 161, 181, 201, 221, 241, 261, 281, 301, 321, 341, 361, 381]
      var bottomArray = [381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400]
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
      for (var i = 0; i < $snake.position.length - 1; i++) {
        if ($snake.position[i] < 1 || $snake.position[i] > 400) {
          gameOver();
        }
      }
      checkDuplicate($snake.position);
    }
    var checkDuplicate = function(arr) {
      if (arr.length < 4) {
        for (var i = 0; i < arr.length - 2; i++){
          if (arr[arr.length - 2] == arr[i]){
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
    // var checkDuplicate = function(arr){
    //   // arr.slice().sort();
    //   for (var i = 0; i < arr.length - 2; i++){
    //     if (arr[arr.length - 1] == arr[i]){
    //       gameOver();
    //     // } else {
    //     //   $snake.body();
    //     }
    //   }
    // }
    $(document).on("keydown", function(e){
      $snake.current_direction = e.which;
      // function oppdir() {
      //   if ($snake.current_direction == 38 || 87) {
      //
      //     $snake.opposite_direction = 'down';
      //   }
      //   if ($snake.current_direction == 37 || 65) {
      //
      //     $snake.opposite_direction = 'right';
      //   }
      //   if ($snake.current_direction == 40 || 83) {
      //
      //     $snake.opposite_direction = 'up';
      //   }
      //   if ($snake.current_direction == 39 || 68) {
      //
      //     $snake.opposite_direction = 'left';
      //   }
      // }
      // oppdir();
      if ($snake.opposite_direction != $snake.direction){
        $snake.direction = $snake.current_direction;
        console.log($snake.direction);
        console.log($snake.opposite_direction);
      }
      // else {
      //   console.log($snake.direction);
      //   console.log($snake.current_direction);
      //   console.log($snake.opposite_direction);
      //   gameOver();
      // };

      switch($snake.direction) {
        case 38:
        case 87:
        $snake.direction = 'up';
        // console.log($snake.direction);
        break;
        case 37:
        case 65:
        $snake.direction = 'left';
        // console.log($snake.direction);
        break;
        case 40:
        case 83:
        $snake.direction = 'down';
        // console.log($snake.direction);
        break;
        case 39:
        case 68:
        $snake.direction = 'right';
        // console.log($snake.direction);
        break;
      }
    });

    var $snake = {
      value: '',
      init_position: function(){
        // $("#9.9").html($snake.value).css("background", "blue");
        $("#grid div:nth-child(189)").html($snake.value).addClass("snake");
        $("#grid div:nth-child(190)").html($snake.value).addClass("snake");
      },
      current_direction: 'right',
      direction: '',
      // opposite_direction: 'left',
      // opposite_direction: {
      //   'up':'down',
      //   'left':'right',
      //   'right':'left',
      //   'down':'up'
      // },
      head: function(){$snake.position.shift(0)},
      position: [189, 190, 191],
      size: [2],
      body: function(){
        for (var k = $snake.size[0]; k > 0; k--){
        $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
        }
      },
      // $('#grid div:nth-child(' + $snake.position[2] + ')').html($snake.value).addClass("snake");
      // $('#grid div:nth-child(' + $snake.position[2] + ')').html($snake.value).css("background", "blue");
    // body: [position[0] - size]
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
        for (var i = 0; i < $snake.position.length - 1; i++) {
          if (result != i) {
            $food.total[0] = (result);
            $('#grid div:nth-child(' + $food.total[0] + ')').addClass("green");
          } else {
            $food.refill($snake.position);
          }
        }

        console.log($food.total[0]);
        console.log($snake.position);
      },
      total: [193],
      init: function(){
        $('#grid div:nth-child(' + 193 + ')').addClass("green");
      }
    }

    var move = function(){
      // var si = $snake.size;
      if(($snake.direction == 'right') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
          $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");

          $snake.position.push($snake.position[$snake.size[0]]);
          console.log("Snake array: " + $snake.position);
          $snake.body();
          // $('#grid div:nth-child(' + $food.total[0] + ')').addClass("purple");
          $snake.size[0] = $snake.size[0] + 1;
          console.log("Size of snake: " + $snake.size);

          $food.total[0] = [0];
          $food.refill($snake.position);
        } else if($snake.direction == 'right'){
          $snake.position.push($snake.position[$snake.size[0]] + 1);
          // checkDuplicate($snake.position);
          $snake.body();
          $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
        // }
          $snake.position.shift(0);

            // $snake.position.shift(0);


          // console.log($snake.position);
          // $snake.head();
        } else if(($snake.direction == 'left') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
            $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
            $snake.position.push($snake.position[$snake.size[0]]);
            console.log("Snake array: " + $snake.position);
            $snake.body();
            // $('#grid div:nth-child(' + $food.total[0] + ')').addClass("purple");
            $snake.size[0] = $snake.size[0] + 1;
            console.log("Size of snake: " + $snake.size);

            $food.total[0] = [0];
            $food.refill($snake.position);

        } else if($snake.direction == 'left'){
            $snake.position.push($snake.position[$snake.size[0]] - 1);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            console.log($snake.position);
            // checkDuplicate($snake.position);
            $snake.position.shift(0);
        } else if(($snake.direction == 'down') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
            $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
            $snake.position.push($snake.position[$snake.size[0]]);
            console.log("Snake array: " + $snake.position);
            $snake.body();
            // $('#grid div:nth-child(' + $food.total[0] + ')').addClass("purple");
            $snake.size[0] = $snake.size[0] + 1;
            console.log("Size of snake: " + $snake.size);

            $food.total[0] = [0];
            $food.refill($snake.position);

       } else if($snake.direction == 'down'){
            $snake.position.push($snake.position[$snake.size[0]] + 20);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            console.log($snake.position);
            // checkDuplicate($snake.position);
            $snake.position.shift(0);
       } else if(($snake.direction == 'up') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
            $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");
            $snake.position.push($snake.position[$snake.size[0]]);
            console.log("Snake array: " + $snake.position);
            $snake.body();
            // $('#grid div:nth-child(' + $food.total[0] + ')').addClass("purple");
            $snake.size[0] = $snake.size[0] + 1;
            console.log("Size of snake: " + $snake.size);

            $food.total[0] = [0];
            $food.refill($snake.position);

       } else if($snake.direction == 'up'){
            $snake.position.push($snake.position[$snake.size[0]] - 20);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            console.log($snake.position);
            // checkDuplicate($snake.position);
            $snake.position.shift(0);
      }
    }
    $("#grid").css("width", "400");
    $("#grid").css("height", "400");
    $("#grid").css("background", "purple");
    // var updateSize = function(){
    //   return $snake.size;
    // }


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
      // checkDuplicate($snake.position);
      move();
      $('#message').text("Snake size = " + $snake.size);
    }, 150);
  });
