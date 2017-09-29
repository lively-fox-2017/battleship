/*
ship
Air craft carrier = 5
Battleship = 4
Cruisier = 3
Destroyer = 2
*/
let board=[],
    enemyLen=[6,5,4,3,2],
    // maxHit=0;
    hitCount=0,
    hitTargetCount=0,
    level=[90,60,30],
    // level=[10,60,30],
    gameBoardContainer = document.getElementById("gameboard"),
    gameLevel = document.getElementById("level"),
    torpedos = document.getElementById('torpedos'),
    enemy = document.getElementById('enemy');

//create max target hit
for (var i = 0; i < enemyLen.length; i++) {
  hitTargetCount+=enemyLen[i];
}

//create board
function createBoard(){
  for (var i = 0; i < 10; i++) {
    board.push([]);
    for (var j = 0; j < 10; j++) {
      board[i][j]='';
    }
  }
  // console.log(board);
  createEnemy();
  // return board;
}
//cek last enemy position
function cekPosition(HV,row,col,width){
  // console.log('hv:'+HV+' c:'+col+' r:'+row+' w:'+width);
  if (HV==0) {
    for (var i = 0; i < width; i++) {//console.log('val h:'+(row)+' v:'+(col+i)+' v:'+board[row][col+i]);
    // console.log('val r:'+(row+i)+' vc:'+(col));
      if (board[row][col+i]!='') {
        return false;
      }
    }
  } else {
    for (var i = 0; i < width; i++) {//console.log('val h:'+(row+i)+' v:'+(col)+' v:'+board[row+i][col]);
    //console.log('val r:'+(row+i)+' c:'+(col));
      if (board[row+i][col]!='') {
        return false;
      }
    }
  }
  return true;
}
//create enemy
function createEnemy(){//console.log('stesss');
  for (var i = 0; i < enemyLen.length; i++) {
    let set=false;
    while (!set) {
      let HV=Math.round(Math.random());
      if (HV==0) {
        let row=Math.round(Math.random()*9),col=Math.round(Math.random()*(9-enemyLen[i])); //console.log('-'+row+' '+col);
        // if (col==0) {col=1}
        // if (row==0) {row=1}//console.log('elh:'+(enemyLen[i]));
        if (cekPosition(HV,row,col,enemyLen[i])) {
          for (var j = 0; j < enemyLen[i]; j++) {//console.log('- '+row+' '+col+j);
            board[row][col+j]='e';
          }
          set=true;
        }
      } else {
        let row=Math.round(Math.random()*(9-enemyLen[i])),col=Math.round(Math.random()*9); //console.log('--'+row+' '+col);
        // if (col==0) {col=1}
        // if (row==0) {row=1} //console.log('elv:'+(enemyLen[i]));
        if (cekPosition(HV,row,col,enemyLen[i])) {
          for (var j = 0; j < enemyLen[i]; j++) {//console.log('-- '+row+j+' '+col);
            board[row+j][col]='e';
          }
          set=true;
        }
      }
    }
  }
}
//render board
function renderBoard(){
  let squareSize=50;
  for (var i = 0; i < 10; i++) {
    // gameBoardContainer.innerHTML+='<br>';
    for (var j = 0; j < 10; j++) {
      let square = document.createElement("div");
      // gameBoardContainer.attribute=board[i][j];
      gameBoardContainer.appendChild(square);
      // square.innerHTML=board[j][i];
      // square.innerHTML='<br>';
      square.id = 's' + j + i;
      square.onclick = 'battleShip.fireTorpedo()';
      var topPosition = j * squareSize;
  		var leftPosition = i * squareSize;

  		// use CSS absolute positioning to place each grid square on the page
  		square.style.top = topPosition + 'px';
  		square.style.left = leftPosition + 'px';
    }
  }
  document.getElementById("showEnemy").disabled=false;
  // alert(document.getElementById("showEnemy").disabled)//=true;
}
//fire enemy
function fireTorpedo(element) {
	if (element.target !== element.currentTarget) {
    // console.log(element.target.id);
		var row = Number(element.target.id.substring(1,2));
		var col = Number(element.target.id.substring(2,3));
    // let maxHitLevel=level[gameLevel.options[gameLevel.selectedIndex].value];
    hitCount--;
    torpedos.value=hitCount;

		if (board[row][col] == '') {
			element.target.style.background = '#bbb';
      // console.log(board);

		} else if (board[row][col] == 'e') {
			element.target.style.background = 'red';

			hitTargetCount--;
      enemy.value=hitTargetCount;
			if (hitTargetCount == 0) {
				alert("You win! All enemy have been defeated!");
        location.reload();
			}
		} else if (board[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
		}
    // console.log(hitCount);
    if (hitCount==0) {
      alert("You loose! no more torpedos do you have!");
      location.reload();
    }
  }
  element.stopPropagation();
}
function setColorEnemy(id,color){
  let gameEnemy=document.getElementById(id);
  gameEnemy.style.background=color;
}
function showEnemy(){
  let color='';
  if (document.getElementById("showEnemy").checked) {
    color='green';
  } else {
    color='#f6f8f9';
  }

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j]=='e') {
        setColorEnemy('s'+i+j,color);
      }
    }
  }
}
//to set max torpedos/hit selected by user
function setTorpedos(){
  hitCount=level[gameLevel.options[gameLevel.selectedIndex].value];
  // alert(hitCount);
  torpedos.value=hitCount;
}
//cek even click listener
gameBoardContainer.addEventListener("click", fireTorpedo, false);
createBoard();
renderBoard();
setTorpedos();
enemy.value=hitTargetCount;
// console.log(createBoard());
