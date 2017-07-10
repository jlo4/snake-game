$(document).ready(function(){
    $("body").css("width", "50%");
    $("body").css("height", "50%");
    $("body").css("margin", "0 auto");
    $("body").css("background", "red");
    $(document).on("keydown", function(e){
      $snake.direction = e.key;
      // console.log($snake.direction);
      switch($snake.direction) {
        case 'w':
        console.log("Snake moved up!");
        break;
        case 'a':
        console.log("Snake moved left!");
        break;
        case 's':
        console.log("Snake moved down!");
        break;
        case 'd':
        console.log("Snake moved right!");
        break;
      }
    });
  //   $(document).keydown(function(event) {
	//   if (event.which === 'ArrowRight') {
	//     // currentMove = 'r';
  //     console.log('snake moved right');
	//   // } else if (e.which === LEFT) {
	//   //   currentMove = 'l';
	//   // } else if (e.which === UP) {
	//   //   currentMove = 'u';
	//   // } else if (ev.which === DOWN) {
	//   //   currentMove = 'd';
	//   }
	// });

    var $snake = {
      value: 'O',
      init_position: function(){
        $("#grid div:nth-child(190)").html($snake.value).css("background", "blue");
      },
      direction: 'r'
    }

    var Grid = function(){
    var $rows = 20;
    var $columns = 20;
  		for(var i = 0; i < $rows; i++){
  			for(var j = 0; j < $columns; j++){
  				$('<div class="this">' + " " + '</div>').appendTo("#grid");
  				$('#grid div:nth-child(' + ($columns * j) + ') + ').css("clear", "left");
  			}
  	  }
  	};

    $("#grid").css("width", "400");
    $("#grid").css("height", "400");
    $("#grid").css("background", "purple");
    function render(e){
      Grid();
      $snake.init_position()};
    render();
  });
