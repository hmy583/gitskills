var board = new Array();
var score=0;
var hasConflicted = new Array();
$(document).ready(function(){
	newgame();
});

function newgame() {
	// 初始化棋盘格
	init();
	//随机的在两个棋盘格里面生成两个数字
  generateOneNumber();
  generateOneNumber();


}

function init(){
	for (var i = 0;i < 4; i++){
		for(var j=0 ;j<4 ;j++){
          var gridCell =$('#grid-cell-'+i+'-'+j);
          gridCell.css('top',getPosTop(i,j));
          gridCell.css('left',getPosLeft(i,j));

		}
	}


	for (var i = 0; i < 4; i++) {
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for (var j = 0; j < 4; j++){
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    } 

  }
		
	updateBoradView();
  score = 0;
}
function updateBoradView(){
    $(".number-cell").remove();

    for(var i=0;i<4;i++){
          for(var j=0;j<4;j++){
     // $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      var theNumberCell = $("#number-cell-"+i+'-'+j);
   if(board[i][j]==0){
           theNumberCell.css('width','0px');
           theNumberCell.css('height','0px');
           theNumberCell.css('top',getPosTop(i,j)+50);
           theNumberCell.css('left',getPosLeft(i,j)+50);


      }else{
         theNumberCell.css('width','100px');
           theNumberCell.css('height','100px');
           theNumberCell.css('top',getPosTop(i,j));
           theNumberCell.css('left',getPosLeft(i,j));
           theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
           theNumberCell.css('color',getNumberColor(board[i][j]));

       theNumberCell.text( board[i][j] );

      }
       hasConflicted[i][j] = false;
    }
     
    }
}

function generateOneNumber(){
  //shengchengyigesuijide weizhi
  // if(true){
  //   return space(board);
  // }
  if( nospace( board ) )
        return false;
  // if(nospace(board))
  //   return false;

  var randX =parseInt(Math.floor(Math.random()*4));
  var randY = parseInt(Math.floor(Math.random()*4));
  var time = 0;
  while(time < 50){
    if(board[randX][randY] == 0){
      break;
    }
   var randX =parseInt(Math.floor(Math.random()*4));
   var randY = parseInt(Math.floor(Math.random()*4));

  }
  if(time == 50){
    for(var i=0;i<4;i++)
          for(var j=0;j<4;j++){
            if(board[i][j] == 0){
              randX = i;
              randY = j;
            }
          }

  }

  //shengchengyigesuijide shuzi
  var randNumber =  Math.random() > 0.5 ? 2:4;

  board[randX][randY] =randNumber;

  showNumberWithAnimation(randX,randY,randNumber);
 return true;
}

// function isgameOver(){
//    if(nospace(board) && noMove(board))
//      gameover();
// }

// function gameover(){
//   alert('gameover!');
// }
$(document).keydown(function(event){

  switch(event.keyCode){
    case 37 ://zuo
       if(moveLeft()){
          setTimeout("generateOneNumber()",210);
        isgameover();
       }
       break;

    case 38://shang
    if(moveUp()){
         setTimeout("generateOneNumber()",210);
         setTimeout("isgameover()",300);
       }
        break;
    case 39://you
        if(moveRight()){
         setTimeout("generateOneNumber()",210);
         setTimeout("isgameover()",300);
       }
        break;
    case 40://xia
        if(moveDown()){
         setTimeout("generateOneNumber()",210);
         setTimeout("isgameover()",300);
       }
        break;
    default: //default
        break;
  }
});
function isgameover(){
    if( nospace() &&nomove( board )){
        gameover();
    }
}

function gameover(){
    alert('gameover!');
}

function moveLeft(){
  if(!canMoveLeft(board)){
    return false;
  }
  for (var i = 0; i < 4; i++) {
         for (var j = 1; j < 4; j++) {
          if(board[i][j]!= 0){
              for (var k = 0; k < j; k++) {
            if(board[i][k] == 0 && noBlockNumber(i,k,j,board)){
              // move
              showAnimation(i,j,i,k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            }else if(board[i][k] == board[i][j] &&noBlockNumber(i,k,j,board) && !hasConflicted[i][k]){
              //move
              showAnimation(i,j,i,k);
              //add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              //jiafen

              score += board[i][k];
              updateScore(score);
              hasConflicted[i][k] =true;
              continue;

            }  
          }
        }
     }
  }

  setTimeout( "updateBoradView()" ,200);
  return true;
}
function moveUp(){
  if(!canMoveUp(board)){
    return false;
  }
  for (var i = 1; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
          if(board[i][j]!= 0){
              for (var k = 0; k < i; k++) {
            if(board[k][j] == 0 && noBlockNumber2(k,i,j,board)){
              // move
              showAnimation(i,j,k,j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            }else if(board[k][j] == board[i][j] &&noBlockNumber2(k,i,j,board)&& !hasConflicted[k][j]){
              //move
              showAnimation(i,j,k,j);
              //add
              board[k][j] += board[i][j];
              board[i][j] = 0;
              score += board[k][j];
              updateScore(score);
              hasConflicted[k][j] =true;
              continue;

            }  
          }
        }
     }
  }

  setTimeout( "updateBoradView()" ,200);
  return true;
}

function moveRight(){
  if(!canMoveRight(board)){
    return false;
  }
  for (var i = 0; i < 4; i++) {
         for (var j = 2; j >=0; j--) {
          if(board[i][j]!= 0){
              for( var k = 3 ; k > j ; k -- ) {
            if(board[i][k] == 0 && noBlockNumber(i,j,k,board)){
              // move
              showAnimation(i,j,i,k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            }else if(board[i][k] == board[i][j] &&noBlockNumber(i,j,k,board) && !hasConflicted[i][k]){
              //move
              showAnimation(i,j,i,k);
              //add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              score += board[i][k];
              updateScore(score);
              hasConflicted[i][k] = true;
              continue;

            }  
          }
        }
     }
  }

  setTimeout( "updateBoradView()" ,200);
  return true;
}
function moveDown(){
  if(!canMoveDown(board)){
    return false;
  }
  for (var i = 2; i >= 0; i--) {
         for (var j = 0; j <4; j++) {
          if(board[i][j]!= 0){
              for( var k = 3 ; k > i ; k -- ) {
            if(board[k][j] == 0 && noBlockNumber2(i,k,j,board)){
              // move
              showAnimation(i,j,k,j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            }else if(board[k][j] == board[i][j] &&noBlockNumber2(i,k,j,board) &&!hasConflicted[k][j]){
              //move
              showAnimation(i,j,k,j);
              //add
              board[k][j] += board[i][j];
              board[i][j] = 0;
              score += board[k][j];
              updateScore(score);
              hasConflicted[k][j] = true;
              continue;

            }  
          }
        }
     }
  }

  setTimeout( "updateBoradView()" ,200);
  return true;
}
