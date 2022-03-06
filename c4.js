//Get player's names:
var player1=prompt("To play connect four, please insert the name of player 1 (red color):");
var player2=prompt("To play connect four, please insert the name of player 2 (blue color):");

//Set player1 to be the first player to play:
var player_number=0;

//Set colors:
var red="rgb(255, 0, 0)"; 
var blue="rgb(0, 0, 255)";

//Get number of rows and columns:
var len_row = $("tr").length;
var len_col = $("td").length/len_row;
//var rows=Array.from(Array(len_row).keys(),x=>(len_row-1)*len_col-x*len_col);

//Since we are going to use 'td' to get the table cells later, all the rows are going to be displayed as a single row.
//The following function is used to access it as a table with columns and rows:
function table_idx(row,col){
  return len_col*row+col
}

//Function to define the name of the player linked to the variable 'player_number':
function setPlayer(player_number){if (player_number%2==0) {return player1} else {return player2}};

//Function to define the name of the color linked to the variable 'player_number' :
function setColor(player_number){if (player_number%2==0) {return red} else {return blue}};
function getColorName(player_number){if (player_number%2==0) {return "Red"} else {return "Blue"}};

//Function to set the background color of a 'td' element on the table:
function stackColor(player_number,idx){
  $('td').eq(idx).css('background-color',setColor(player_number));
  $('td').eq(idx).text("")
}

//Function to get the background color of a 'td' element on the table:
function getColor(idx){return $('td').eq(idx).css('background-color')}

//Function that increments the 'player_number' variable and displays the name of the next player on the screen:
function nextPlayer(player_number){
  player_number++;
  $("#player").text(setPlayer(player_number));
  return player_number
}

//Function that checks if 4 elements of the table the same color :
function checkColor(idx,color,factor_row,factor_col) {return getColor(idx)===color &&  getColor(idx+1*factor_row+1*factor_col)===color &&  getColor(idx+2*factor_row+2*factor_col)===color &&  getColor(idx+3*factor_row+3*factor_col)===color;}

//Function that checks if there is a vertical match on the table:
function horizontalCheck(color) {
  for (let row = 0; row < len_row; row++) {
    for (let col = 0; col+3 < len_col; col++) {
      var check=checkColor(table_idx(row,col),color,1,0);
      if (check === true){return check;} 
    }
  }
  return false;
}

//Function that checks if there is a horizontal match on the table:
function verticalCheck(color) {
  for (let row = 0; row+3 < len_row; row++) {
    for (let col = 0; col < len_col; col++) {
      var check=checkColor(table_idx(row,col),color,0,len_col);
      if (check === true){return check;} 
    }
  }
  return false;
}

//Functions that check if there is a diagonal match on the table:
function diagonalCheck1(color) {
  for (let row = 0; row+3 < len_row; row++) {
    for (let col = 0; col+3 < len_col; col++) {
      var check=checkColor(table_idx(row,col),color,1,len_col);
      if (check === true){return check;} 
    }
  }
  return false;
}

function diagonalCheck2(color) {
  for (let row = 0; row+3 < len_row; row++) {
    for (let col = len_col-1; col-3 > 0; col--) {
      var check=checkColor(table_idx(row,col),color,-1,len_col);
      if (check === true){return check;} 
    }
  }
  return false;
}

//Function to check all matches:
function winCondition(player_number){
  var color=setColor(player_number)
  if(horizontalCheck(color) || verticalCheck(color) || diagonalCheck1(color) || diagonalCheck2(color)){return true;}
  else{return false;}
}

//Function to display the winner's name:
function Winner(player_number){
  var color_name=getColorName(player_number);
  var color = setColor(player_number)
  var player_name=setPlayer(player_number);

  $("#text-display").css('color', color );
  $("#text-display").text(color_name+" wins!");
  $("#player").text("Congratulations "+player_name+", you won! Press RESET button to play again");
}

//Set player name on screen:
$("#player").text(setPlayer(player_number));

//Set reset button to reload the page when clicked:
$('button').click(function(){location.reload()});

//Set actions on 'td' elements when clicked:
$('td').click(function(){ 
  idx=$(this).index();
  for (let row = len_row-1; row >= 0; row--) {
    next_idx=idx+table_idx(row,0);
    
      if ($('td').eq(next_idx).text()!=="") {
        stackColor(player_number,next_idx);
        if (winCondition(player_number)) {
          Winner(player_number);
        }
        else{player_number=nextPlayer(player_number)}
        break
    }
  }
})


