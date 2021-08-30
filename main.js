const row_0 = document.querySelectorAll('.row-0')
const row_1 = document.querySelectorAll('.row-1')
const row_2 = document.querySelectorAll('.row-2')
const row_3 = document.querySelectorAll('.row-3')
const row_4 = document.querySelectorAll('.row-4')
const row_5 = document.querySelectorAll('.row-5')

let col_0 = document.querySelectorAll('.col-0')
let col_1 = document.querySelectorAll('.col-1')
let col_2 = document.querySelectorAll('.col-2')
let col_3 = document.querySelectorAll('.col-3')
let col_4 = document.querySelectorAll('.col-4')
let col_5 = document.querySelectorAll('.col-5')
let col_6 = document.querySelectorAll('.col-6')

const pucksOnTop = document.querySelectorAll('.puck')
const startRestartBtn = document.querySelector('.start-restart')

col_0 = [...col_0].reverse()
col_1 = [...col_1].reverse()
col_2 = [...col_2].reverse()
col_3 = [...col_3].reverse()
col_4 = [...col_4].reverse()
col_5 = [...col_5].reverse()
col_6 = [...col_6].reverse()

const rows = [row_0, row_1, row_2, row_3, row_4, row_5]
const cols = [col_0, col_1, col_2, col_3, col_4, col_5, col_6]

const result = document.getElementById('result')
const currentPlayer = document.getElementById('current-player')

let isYellow
let isGameLive
let play



//FUNCTIONS

//RESTART FUNCTION 

const startRestartGame = () =>{
  //Making all cells empty
  for (row of rows) {
    for (cell of row) {
      cell.classList.remove('yellow')
      cell.classList.remove('red')
      cell.classList.remove('win')
    }
  }
  //Setting/Resetting the global variables
  isYellow = true
  isGameLive = true
  play = 0
  currentPlayer.classList.remove('hide')
  currentPlayer.innerHTML = "The Current Player is: PLAYER-1"
  currentPlayer.style.color = "darkgoldenrod"
  startRestartBtn.innerHTML = "Restart"
  result.classList.add('hide')
}



//CONVERTING ClassList OF EACH CELL INTO ARRAY

const getClassListArray = cell =>{
  const classes = cell.classList
  return [...classes]
}


//GETTING POSITION OF EACH CELL IN THE 6*7 GRID

const getRowAndColIndex = cell =>{
  const classesArr = getClassListArray(cell)
  const rowIndex = classesArr.find(elem => elem.includes('row'))
  const colIndex = classesArr.find(elem => elem.includes('col'))
  return [+rowIndex[4], +colIndex[4]]
}


//GETTING FIRST EMPTY CELL IN COLUMN TO INSERT COIN

const getFirstEmptyCellInCol = colIndex =>{
  for (cell of cols[colIndex]) {
    const classesArr = getClassListArray(cell)
    if (!classesArr.includes('yellow') && !classesArr.includes('red')) {
      return cell
    } 
  }
    return null
}


//FINDING IF CELL IS OCCUPIED BY PLAYER1 OR PLAYER2

const getCellClass = cell =>{
  const classesArr = getClassListArray(cell)
  if (classesArr.includes('yellow')) {
    return 'yellow'
  }else if (classesArr.includes('red')) {
    return 'red'
  }else {
    return null
  }
}


//CHECKING HORIZONTALLY ACROSS THE ROW TO SEE IF GAME IS FINISHED

const horizontalCheck = (cell, color) =>{
  const index = getRowAndColIndex(cell)
  const rowIndex = index[0]
  let colIndex = index[1] - 1
  const winningArr = [cell]
  
  while (colIndex >= 0) {
    if (getCellClass(rows[rowIndex][colIndex]) === color) {
        winningArr.unshift(rows[rowIndex][colIndex])
        colIndex--
      } else {
        colIndex = -1
      }
    }
  
  colIndex = index[1] + 1
  while (colIndex <= 6) {
     if (getCellClass(rows[rowIndex][colIndex]) === color) {
        winningArr.push(rows[rowIndex][colIndex])
        colIndex++
      } else {
        colIndex = 7
      }
    }
   
  if (winningArr.length >= 4) {
    for(let i=0; i<winningArr.length; i++) {
      winningArr[i].classList.add('win')
    }
    return true
  }
}


//CHECKING VERTICALLY ACROSS THE COLUMN TO SEE IF GAME IS FINISHED

const verticalCheck = (cell, color) =>{
  const index = getRowAndColIndex(cell)
  let rowIndex = index[0] - 1
  const colIndex = index[1] 
  const winningArr = [cell]
  while (rowIndex >= 0) {
    if (getCellClass(cols[colIndex][rowIndex]) === color) {
        winningArr.unshift(cols[colIndex][rowIndex])
        rowIndex--
      } else {
        rowIndex = -1
      }
    }
  
  rowIndex = index[0] + 1
  while (rowIndex <= 5){
     if (getCellClass(cols[colIndex][rowIndex]) === color) {
        winningArr.push(cols[colIndex][rowIndex])
        rowIndex++
      } else {
        rowIndex = 6
      }
    }
  
  if (winningArr.length >= 4) {
    for (let i=0; i<winningArr.length; i++) {
      winningArr[i].classList.add('win')
    }
    return true
  }
}


//CHECKING DIAGONALLY ACROSS ROW & COLUMN TO SEE IF GAME IS FINISHED

const diagonal1Check =(cell, color) =>{
  const index = getRowAndColIndex(cell)
  let rowIndex = index[0] - 1
  let colIndex = index[1] - 1
  const winningArr = [cell]
  while (colIndex >= 0 && rowIndex >= 0){
    if (getCellClass(rows[rowIndex][colIndex]) === color) {
        winningArr.unshift(rows[rowIndex][colIndex])
        rowIndex--
        colIndex--
      } else {
        rowIndex = -1
        colIndex = -1
      }
    }
  
  rowIndex = index[0] + 1  
  colIndex = index[1] + 1
  while (colIndex <= 6 && rowIndex <= 5) {
     if(getCellClass(rows[rowIndex][colIndex]) === color){
        winningArr.push(rows[rowIndex][colIndex])
        rowIndex++
        colIndex++
      }else {
        rowIndex = 6
        colIndex = 7
      }
    }
  
  if (winningArr.length >= 4) {
    for (let i=0; i<winningArr.length; i++) {
      winningArr[i].classList.add('win')
    }
    return true
  }
}


//CHECKING DIAGONAL2 ACROSS ROW & COLUMN TO SEE IF GAME IS FINISHED

const diagonal2Check = (cell, color) =>{
  const index = getRowAndColIndex(cell)
  let rowIndex = index[0] + 1
  let colIndex = index[1] - 1
  const winningArr = [cell]
  while (colIndex >= 0 && rowIndex <= 5){
    if (getCellClass(rows[rowIndex][colIndex]) === color) {
        winningArr.push(rows[rowIndex][colIndex])
        rowIndex++
        colIndex--
      } else {
        rowIndex = 6
        colIndex = -1
      }
    }
  
  rowIndex = index[0] - 1 
  colIndex = index[1] + 1
  while (colIndex <= 6 && rowIndex >= 0){
     if (getCellClass(rows[rowIndex][colIndex]) === color) {
        winningArr.unshift(rows[rowIndex][colIndex])
        rowIndex--
        colIndex++
      } else {
        rowIndex = -1
        colIndex = 7
      }
    }
  
  if (winningArr.length >= 4) {
    for (let i=0; i<winningArr.length; i++) {
      winningArr[i].classList.add('win')
    }
    return true;
  }
}
  

//CHECKING STATUS OF GAME AFTER EVERY CELL CLICK

const checkStatusOfGame = cell =>{
  const color = isYellow ? "red" : "yellow"
  const player = isYellow? "PLAYER 2" : "PLAYER 1"
  if (play < 42) {
    if (horizontalCheck(cell,color) || verticalCheck(cell,color) ||diagonal1Check(cell,color) || diagonal2Check(cell,color)) {
      isGameLive = false
      currentPlayer.classList.add('hide')
      result.classList.remove('hide')
      result.innerHTML = `${player} wins!`
      startRestartBtn.innerHTML = "Restart"
      }
  } else {
      isGameLive = false
      currentPlayer.classList.add('hide')
      result.classList.remove('hide')
      result.innerHTML = "It's a TIE!"
      startRestartBtn.innerHTML = "Restart"
      }
}


//HANDLING MOUSE OUT

const handleCellMouseOut = () =>{
  pucksOnTop.forEach(puck => {
    puck.classList.remove('yellow')
    puck.classList.remove('red')
  })
}


//HANDLING CELL CLICK

const handleCellClick = event =>{
  if (isGameLive) {
    //Remove the puck on top of the grid column
    handleCellMouseOut()
    const index = getRowAndColIndex(event.target)
    const cell = getFirstEmptyCellInCol(index[1])
    if (cell) {
      if (isYellow) {
        cell.classList.add('yellow')
        isYellow = false
        currentPlayer.innerHTML = "The Current Player is: PLAYER-2"
        currentPlayer.style.color = "tomato"
        } else {
        cell.classList.add('red')
        isYellow = true
        currentPlayer.innerHTML = "The Current Player is: PLAYER-1"
        currentPlayer.style.color = "darkgoldenrod" 
        }
      play++
      if (play >= 7){
        checkStatusOfGame(cell)
      }
    } else {
      return
    }
}
}


//HANDLING CELL MOUSE OVER

const handleCellMouseOver = event =>{
  if (isGameLive) {
    const index = getRowAndColIndex(event.target)
    if (isYellow) {
      pucksOnTop[index[1]].classList.add('yellow')
    }else{
      pucksOnTop[index[1]].classList.add('red')
    }
  }
}



//EVENT LISTENERS

//CELL EVENT LISTENERS FOR MOUSE-OVER, CLICK, MOUSE-OUT

for (row of rows) {
  for (cell of row) {
  cell.addEventListener('mouseover', handleCellMouseOver)
  cell.addEventListener('click', handleCellClick)
  cell.addEventListener('mouseout', handleCellMouseOut)
}}


//EVENT LISTENER FOR RESTART BUTTON

startRestartBtn.addEventListener('click', startRestartGame)