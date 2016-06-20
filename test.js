window.addEventListener("load", function() {

var tableau;

var cellule = document.getElementsByClassName('cellule');
var score;
var button = document.getElementsByClassName('button')[0];


function randomCell() {
 return Math.floor(Math.random() * 4);
}

function randomNumber() {
 if(Math.random() < 0.9) {
   return 2;
 } else {
   return 4;
 }
}

function addCell(array) {
 var colonne = randomCell();
 var ligne = randomCell();

 if (array[ligne][colonne] === 0) {
   array[ligne][colonne] = randomNumber();
 } else {
   addCell(array);
 }
}

function resetGrid() {
  for (var i = 0; i < 4; i += 1) {
    for (var j = 0; j < 4; j += 1) {
      cellule[i*4 + j].innerHTML = '';
      cellule[i*4 + j].className = 'cellule';
    }
  }
}

function affichageGrid(array) {
  resetGrid();
  for (var i = 0; i < array.length; i += 1) {
    for (var j = 0; j < array[i].length; j += 1) {
      if (array[i][j] > 0) {
        cellule[i*4 + j].innerHTML = array[i][j];
      }
    }
  }
  addColor(array);
}

function affichageScore(score) {
  var div_score = document.getElementsByClassName('text_score')[0];

  div_score.innerHTML = score;
}

function addColor(array) {
  for (var i = 0; i < array.length; i += 1) {
    for (var j = 0; j < array[i].length; j += 1) {
      if (array[i][j] == 2) {
        cellule[i*4+j].className = "cellule color_2";
      }
      else if (array[i][j] == 4) {
        cellule[i*4+j].className = "cellule color_4";
      }
      else if (array[i][j] == 8) {
        cellule[i*4+j].className = "cellule color_8";
      }
      else if (array[i][j] == 16) {
        cellule[i*4+j].className = "cellule color_16";
      }
      else if (array[i][j] == 32) {
        cellule[i*4+j].className = "cellule color_32";
      }
      else if (array[i][j] == 64) {
        cellule[i*4+j].className = "cellule color_64";
      }
      else if (array[i][j] >= 128) {
        cellule[i*4+j].className = "cellule color_128";
      }
    }
  }
}

function moveLeft(array) {
  var match = false;

  for (var i = 0; i < 3; i += 1) {
    for (var j = 0; j < 4; j += 1) {
      for (var k = 0; k < 3; k += 1) {
        if (array[j][k] === 0 && array[j][k + 1] !== 0) {
          array[j][k] = array[j][k + 1];
          array[j][k + 1] = 0;
          if (array[j][k] !== 0) {
            match = true;
          }
        }
      }
    }
  }
  return match;
}

function moveRight(array) {
  var match = false;

  for (var i = 0; i < 3; i += 1) {
    for (var j = 3; j >= 0; j -= 1) {
      for (var k = 3; k > 0; k -= 1) {
        if (array[j][k] === 0 && array[j][k - 1] !== 0) {
          array[j][k] = array[j][k - 1];
          array[j][k - 1] = 0;
          if (array[j][k] !== 0) {
            match = true;
          }
        }
      }
    }
  }
  return match;
}

function moveUp(array) {
  var match = false;

  for (var i = 0; i < 3; i += 1) {
    for (var j = 0; j < 3; j += 1) {
      for (var k = 0; k < 4; k += 1) {
        if (array[j][k] === 0 && array[j + 1][k] !== 0) {
          array[j][k] = array[j + 1][k];
          array[j + 1][k] = 0;
          if (array[j][k] !== 0) {
            match = true;
          }
        }
      }
    }
  }
  return match;
}

function moveDown(array) {
  var match = false;

  for (var i = 0; i < 3; i += 1) {
    for (var j = 3; j > 0; j -= 1) {
      for (var k = 3; k >= 0; k -= 1) {
        if (array[j][k] === 0 && array[j - 1][k] !== 0) {
          array[j][k] = array[j - 1][k];
          array[j - 1][k] = 0;
          if (array[j][k] !== 0) {
            match = true;
          }
        }
      }
    }
  }
  return match;
}

function leftMatch(array) {
  var match = false;

  for (var j = 0; j < 4; j += 1) {
    for (var k = 0; k < 3; k += 1) {
      if (array[j][k] !== 0 && array[j][k] == array[j][k + 1]) {
        array[j][k] = array[j][k] + array[j][k + 1];
        array[j][k + 1] = 0;
        match = true;
        score += array[j][k];
      }
    }
  }
  moveLeft(tableau);
  return match;
}

function rightMatch(array) {
  var match = false;

  for (var j = 0; j < 4; j += 1) {
    for (var k = 3; k > 0; k -= 1) {
      if (array[j][k] !== 0 && array[j][k] == array[j][k - 1]) {
        array[j][k] = array[j][k] + array[j][k - 1];
        array[j][k - 1] = 0;
        match = true;
        score += array[j][k];
      }
    }
  }
  moveRight(tableau);
  return match;
}

function upMatch(array) {
  var match = false;

  for (var j = 0; j < 3; j += 1) {
    for (var k = 0; k < 4; k += 1) {
      if (array[j][k] !== 0 && array[j][k] == array[j + 1][k]) {
        array[j][k] = array[j][k] + array[j + 1][k];
        array[j + 1][k] = 0;
        match = true;
        score += array[j][k];
      }
    }
  }
  moveUp(tableau);
  return match;
}

function downMatch(array) {
  var match = false;

  for (var j = 3; j > 0; j -= 1) {
    for (var k = 0; k < 4; k += 1) {
      if (array[j][k] !== 0 && array[j][k] == array[j - 1][k]) {
        array[j][k] = array[j][k] + array[j - 1][k];
        array[j - 1][k] = 0;
        match = true;
        score += array[j][k];
      }
    }
  }
  moveDown(tableau);
  return match;
}

document.addEventListener("keydown", function moveGeneral(e) {
  var key = e.keyCode || e.which;
  var move;
  var match;

  if (key == '38') {
    move = moveUp(tableau);
    match = upMatch(tableau);
    if (move || match) {
      addCell(tableau);
      affichageGrid(tableau);
      affichageScore(score);
      winner = win(tableau);
      loser = lose(tableau);
      if (loser || winner) {
        document.removeEventListener("keydown", moveGeneral);
      }
    }
  }
  else if (key == '40') {
    move = moveDown(tableau);
    match = downMatch(tableau);
    if (move || match) {
      addCell(tableau);
      affichageGrid(tableau);
      affichageScore(score);
      winner = win(tableau);
      loser = lose(tableau);
      if (loser || winner) {
        document.removeEventListener("keydown", moveGeneral);
      }
    }
  }
  else if (key == '37') {
    move = moveLeft(tableau);
    match = leftMatch(tableau);
    if (move || match) {
      addCell(tableau);
      affichageGrid(tableau);
      affichageScore(score);
      winner = win(tableau);
      loser = lose(tableau);
      if (loser || winner) {
        document.removeEventListener("keydown", moveGeneral);
      }
    }
  }
  else if (key == '39') {
    move = moveRight(tableau);
    match = rightMatch(tableau);
    if (move || match) {
      addCell(tableau);
      affichageGrid(tableau);
      affichageScore(score);
      winner = win(tableau);
      loser = lose(tableau);
      if (loser || winner) {
        document.removeEventListener("keydown", moveGeneral);
      }
    }
  }
});

function lose(array) {
      if (moveOk(tableau) === false) {
        winDiv = document.createElement('div');
        winDiv.id = 'lose';
        document.getElementById('grid_container').appendChild(winDiv);
        winDiv.innerHTML = "YOU LOSE !";
      }
}

function moveOk(array) {
  var moveOk = false;

  for (var i = 0; i < array.length - 1; i += 1) {
    for (var j = 0; j < array[i].length; j += 1) {
      if (array[i][j] === 0 || array[i + 1][j] === array[i][j] || array[i + 1][j] === 0) {
        moveOk = true;
      }
    }
  }

  for (var i = 0; i < array.length; i += 1) {
    for (var j = 0; j < array[i].length - 1; j += 1) {
      if (array[i][j] === 0 || array[i][j + 1] == array[i][j] || array[i][j + 1] === 0) {
        moveOk = true;
      }
    }
  }
  return moveOk;
}

function win(array) {
  for (var i = 0; i < array.length; i += 1) {
    for (var j = 0; j < 4; j += 1) {
      if(array[i][j] === 2048) {
        winDiv = document.createElement('div');
        winDiv.id = 'win';
        document.getElementById('grid_container').appendChild(winDiv);
        winDiv.innerHTML = "YOU WIN !";
        return true;
      }
    }
  }
}


function newGame() {
  tableau = [[0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0]];
  score = 0;
  addCell(tableau);
  addCell(tableau);
  affichageGrid(tableau);
  affichageScore(score);

  var div = document.getElementById('win');
  if (div != null){
    div.parentElement.removeChild(div);
  }

  var ldiv = document.getElementById('lose');
  if (ldiv != null) {
    ldiv.parentElement.removeChild(ldiv);
  }
}

button.addEventListener('click', newGame);

newGame();


});
