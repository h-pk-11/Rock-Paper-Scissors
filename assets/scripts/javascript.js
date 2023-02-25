"use strict";

function getComputerChoice(){
   let index = Math.floor(Math.random()*3)+1;
    if(index == 1){
        return 'rock';
    }else if(index == 2){
        return 'paper';
    }else{
        return 'scissors';
    }
}

function play(ps, cs){
    if(ps == 'rock'){
        if(cs == 'rock'){
            return 'You draw!';
        }else if(cs == 'paper'){
            return 'You lose!';
        }else {
            return 'You win!';
        }
    }else if(ps == 'paper'){
        if(cs == 'rock'){
            return 'You win!';
        }else if(cs == 'paper'){
            return 'You draw!';
        }else {
            return 'You lose!';
        }
    }else{
        if(cs == 'rock'){
            return 'You lose!';
        }else if(cs == 'paper'){
            return 'You win!';
        }else {
            return 'You draw!';
        }
    }
}

function explain(ps, cs){
    if(ps == 'rock'){
        if(cs == 'rock'){
            return 'Computer chose Rock.';
        }else if(cs == 'paper'){
            return 'Computer chose Paper. Paper covers Rock.';
        }else {
            return 'Computer chose Scissors. Rock crushes Scissors.';
        }
    }else if(ps == 'paper'){
        if(cs == 'rock'){
            return 'Computer chose Rock. Paper covers Rock.';
        }else if(cs == 'paper'){
            return 'Computer chose Paper.';
        }else {
            return 'Computer chose Scissors. Scissors cuts Paper.';
        }
    }else{
        if(cs == 'rock'){
            return 'Computer chose Rock. Rock crushes Scissors.';
        }else if(cs == 'paper'){
            return 'Computer chose Paper. Scissors cuts Paper.';
        }else {
            return 'Computer chose Scissors.';
        }
    }
}

function getPath(element){
    if(element==='rock'){
        return './assets/img/rock.png';
    }else if(element==='paper'){
        return './assets/img/paper.png';
    }else{
        return './assets/img/scissors.png';
    }
}

let playerScore = 0;
let computerScore = 0;

const pl = document.querySelector('.play .notification');
const ex = document.querySelector('.explain');

const playerResult = document.querySelector('#player .result .score');
const computerResult = document.querySelector('#computer .result .score');

const playerImg = document.querySelector('#player img');
const computerImg = document.querySelector('#computer img');

function playRound(){
    const ps = this.getAttribute('id');
    const cs = getComputerChoice();

    this.classList.add('activating');

    const playerPath = getPath(ps);
    const computerPath = getPath(cs);

    playerImg.setAttribute('src', playerPath);
    computerImg.setAttribute('src', computerPath);

    if(playerScore < 5 && computerScore < 5){
        pl.textContent = play(ps, cs);
        ex.textContent = explain(ps, cs);
    }

    let result = play(ps, cs);
    
    if(playerScore < 5 && computerScore < 5){
        if(result.indexOf('win') >= 0){
            playerScore += 1;
            playerResult.textContent = `${playerScore}`;
            if(playerScore == 5){
                // pl.textContent = 'You win the game';
                // ex.textContent = 'Congratulations!';
                
                setGameOver();
            }
        }else if(result.indexOf('lose') >= 0){
            computerScore += 1;
            computerResult.textContent = `${computerScore}`;
            if(computerScore == 5){
                // pl.textContent = 'You lose the game';
                // ex.textContent = 'Sorry';
                
                setGameOver();
            }
        }
    }
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('activating');
}

function setGameOver(){
  
    bts.forEach(bt=>{
        bt.disabled = true;
    });

    const divBtn = document.createElement('div');
    divBtn.classList.add('divButton');

    const smDivBtn = document.createElement('div');
    smDivBtn.classList.add('smDivButton');

    const outcome = document.createElement('div');
    outcome.classList.add('outcome');
    if(playerScore == 5){
        outcome.textContent = 'You win the game';
    }else{
        outcome.textContent = 'You lose the game';
    }

    const newBtn = document.createElement('button');
    newBtn.textContent = 'RESET GAME';
    newBtn.classList.add('newButton');

    smDivBtn.appendChild(outcome);
    smDivBtn.appendChild(newBtn);
    divBtn.appendChild(smDivBtn);
    
    document.querySelector('#content').appendChild(divBtn);

    newBtn.addEventListener('click',resetGame);
}

function resetGame(){
    bts.forEach(bt=>{
        bt.disabled = false;
    });

    playerScore = 0;
    computerScore = 0;

    pl.textContent = 'Choose your element';
    ex.textContent = 'One reaching 5 points first wins the game';

    playerResult.textContent = '0';
    computerResult.textContent = `0`;

    playerImg.setAttribute('src', './assets/img/questionmark.png');
    computerImg.setAttribute('src', './assets/img/questionmark.png');

    const divBtn = document.querySelector('.divButton');

    document.querySelector('#content').removeChild(divBtn);

}

const bts = document.querySelectorAll('.btn');
bts.forEach(
    (bt)=>{
        bt.addEventListener('mousedown', playRound);
    }
);

bts.forEach(
    (bt)=>{
        bt.addEventListener('transitionend',removeTransition);
    }
)
