$(document).ready(function(){
    $("body").css("width", "50%");
    $("body").css("height", "50%");
    $("body").css("margin", "0 auto");
    $("body").css("background", "red");
    $(document).on("keydown", function(e){
      $snake.current_direction = e.which;
      console.log($snake.opposite_direction[$snake.current_direction]);
      if ($snake.current_direction != $snake.opposite_direction[$snake.direction]){
        $snake.direction = $snake.current_direction;
      };

      console.log($snake.direction);
      switch($snake.direction) {
        case 38:
        case 87:
        $snake.direction = 'up';
        console.log($snake.direction);
        break;
        case 37:
        case 65:
        $snake.direction = 'left';
        console.log($snake.direction);
        break;
        case 40:
        case 83:
        $snake.direction = 'down';
        console.log($snake.direction);
        break;
        case 39:
        case 68:
        $snake.direction = 'right';
        console.log($snake.direction);
        break;
      }
    });

    var $snake = {
      value: 'O',
      init_position: function(){
        // $("#9.9").html($snake.value).css("background", "blue");
        $("#grid div:nth-child(190)").html($snake.value).addClass("snake");
      },
      current_direction: 'right',
      direction: '',
      opposite_direction: {
        'up':'down',
        'left':'right',
        'right':'left',
        'down':'up'
      },
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

    var $gridBorder = {

    }

    var $food = {
      refill: function(){
        var result = Math.floor(Math.random() * $('.this').length);
        $food.total[0] = (result);
        $('#grid div:nth-child(' + $food.total[0] + ')').addClass("green");
        console.log($food.total[0]);
        console.log($snake.position);
      },
      total: [193],
      init: function(){
        $('#grid div:nth-child(' + 193 + ')').addClass("green");
      }
    }

    var move = function(){
      var si = $snake.size;
      if(($snake.direction == 'right') && ($snake.position[$snake.size[0]] ===  $food.total[0])) {
          $('#grid div:nth-child(' + $food.total[0] + ')').removeClass("green");

          $snake.position.push($snake.position[$snake.size[0]]);
          console.log("Snake array: " + $snake.position);
          $snake.body();
          // $('#grid div:nth-child(' + $food.total[0] + ')').addClass("purple");
          $snake.size[0] = $snake.size[0] + 1;
          console.log("Size of snake: " + $snake.size);

          $food.total[0] = [0];
          $food.refill();
        } else if($snake.direction == 'right'){
          $snake.position.push($snake.position[$snake.size[0]] + 1);
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
            $food.refill();

        } else if($snake.direction == 'left'){
            $snake.position.push($snake.position[$snake.size[0]] - 1);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            console.log($snake.position);
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
            $food.refill();

       } else if($snake.direction == 'down'){
            $snake.position.push($snake.position[$snake.size[0]] + 20);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            console.log($snake.position);
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
            $food.refill();

       } else if($snake.direction == 'up'){
            $snake.position.push($snake.position[$snake.size[0]] - 20);
            for (var k = $snake.size; k > 0; k--){
            $('#grid div:nth-child(' + $snake.position[k] + ')').html($snake.value).addClass("snake");
            }
            $('#grid div:nth-child(' + $snake.position[0] + ')').html("").removeClass("snake");
            console.log($snake.position);
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
      $snake.init_position()};
    render();
    $food.init();
    setInterval(function(){
      move();
    }, 150);
  });
