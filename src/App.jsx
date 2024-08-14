import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let board;
let playero = 'o';
let playerx = 'x';
let currPlayer = playero
let gameOver = false;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        ['','',''],
        ['','',''],
        ['','','']
    ]

    for(let r = 0; r<3; r++){
        for(let c = 0; c<3;c++){
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString()
            tile.classList.add('tile')
            if (r == 0 || r == 1) {
                tile.classList.add('horizontal-line')
            }
            if (c == 0 || c == 1) {
                tile.classList.add('vertical-line')
            }
            tile.addEventListener('click',setTile)
            document.getElementById('board').appendChild(tile)
        }
    }
}

function setTile(){
    if(gameOver){
        return;
    }

    let coords = this.id.split('-')
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (board[r][c] != '') {
        return
    }
    board[r][c] = currPlayer
    this.innerText = currPlayer

    if (currPlayer == playero) {
            currPlayer = playerx
    }
    else{
        currPlayer = playero
    }

    checkWinner();
}

function checkWinner(){
// horizontally
for( let r = 0;r<3 ; r++){
    if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ''){
        for(let i = 0; i<3 ; i++){
            let tile = document.getElementById(r.toString()+"-"+ i.toString())
            tile.classList.add('winner')
        }
        gameOver = true
        return
    }
}

// vertical
for( let r = 0;r<3 ; r++){
    if(board[0][r] == board[1][r] && board[1][r] == board[2][r] && board[0][r] != ''){
        for(let i = 0; i<3 ; i++){
            let tile = document.getElementById(i.toString()+"-"+ r.toString())
            tile.classList.add('winner')
        }
        gameOver = true
        return
    }
}

// diagonally
if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
    for(let i=0;i<3;i++){
        let tile = document.getElementById(i.toString()+'-'+i.toString())
        tile.classList.add('winner')

    }
    gameOver = true
    return
}

// other-diagonal
if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '') {
    
        let tile = document.getElementById('0-2')
        tile.classList.add('winner')

        let secondtile = document.getElementById('1-1')
        secondtile.classList.add('winner')
        
        let thirdtile = document.getElementById('2-0')
        thirdtile.classList.add('winner')
    
    gameOver = true
    return
}

}

  return (
    <>
    <h1>Tic Tac Toe</h1>
    <hr/>
    <br/>
    <div id="board">
        
    </div>
    </>
  )
}

export default App
