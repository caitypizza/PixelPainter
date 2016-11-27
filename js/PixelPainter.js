var mainBody = document.getElementById('pixelPainter');
var colorArray = ['#7F7F7F', '#000', '#4990E2', '#9012FE', '#417505', '#7ED321', '#F8E81C', '#F6A623', '#D0011B'];
var colorChoice = 'black';
var colorButtons = [];
var currentColorOfLoop;
var savedGrid = [];
var testGrid = [];
var rowArray = [];
var loadedGrid = '';

function createColorGrid(){




  function miscButtons(){
    var miscButtons = document.createElement('div');
    miscButtons.className = "miscButtons";
    mainBody.appendChild(miscButtons);

    var clearButton = document.createElement('button');
    miscButtons.appendChild(clearButton);
    clearButton.innerHTML = 'Clear';

    clearButton.addEventListener('click', function(){
      for(var i = 0; i < document.querySelectorAll('.pixels').length; i++){
      document.querySelectorAll('.pixels')[i].style.backgroundColor = 'white';
    }
    });

    var saveButton = document.createElement('button');
    miscButtons.appendChild(saveButton);
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', function(){
      for(var z = 0; z < document.querySelectorAll('.pixels').length; z++){
        savedGrid[z] = '"' + document.querySelectorAll('.pixels')[z].style.backgroundColor + '"';
      }
      loadedGrid = '[' + savedGrid + ']';
      localStorage.setItem('saveFile', loadedGrid);
    });

    var loadButton = document.createElement('button');
    miscButtons.appendChild(loadButton);
    loadButton.innerHTML = 'Load';
    loadButton.addEventListener('click', function(){
      loadedGrid = JSON.parse(localStorage.getItem('saveFile'));
      for(var y = 0; y < document.querySelectorAll('.pixels').length; y++){
        document.querySelectorAll('.pixels')[y].style.backgroundColor = loadedGrid[y];
      }
    });
  }

  function makePallete(){
    var pallete = document.createElement('div');
    pallete.className = "pallete";
    mainBody.appendChild(pallete);
    for(var j = 0; j < colorArray.length; j++){
    currentColorOfLoop = colorArray[j];
    colorButtons[j] = document.createElement('div');
    colorButtons[j].className = "palleteButton";
    pallete.appendChild(colorButtons[j]);
    colorButtons[j].style.backgroundColor = currentColorOfLoop;
    colorButtons[j].addEventListener('click', function(n){
      colorChoice = this.style.backgroundColor;
    });
  }
  }

  function makeGrid(rows, cols){
    var grid = document.createElement('table');
    grid.className = "grid";
    mainBody.appendChild(grid);

    for(var i = 0; i<rows; i++){
      var tr = grid.appendChild(document.createElement('tr'));

      for(var j = 0; j<cols; j++){
        var cell = tr.appendChild(document.createElement('td'));
        cell.className = "pixels";
        cell.style.backgroundColor = 'white';
        cell.addEventListener('mouseover', function(event){
          if (event.buttons === 1) {
            if (event.shiftKey) {
              event.target.style.backgroundColor = 'white';
            } else {
              event.target.style.backgroundColor = colorChoice;
            }
          }
        });
        cell.addEventListener('click', function(event){

          event.target.style.backgroundColor = colorChoice;
          console.log(document.querySelectorAll('.rowz'));
        });
      }
    }
  }

  // return makeGrid(40,40);
  return {
    makeGrid: makeGrid,
    makePallete: makePallete,
    miscButtons: miscButtons
  };
}

var pp = createColorGrid();
pp.makeGrid(40, 40);
pp.makePallete();
pp.miscButtons();