let gameturn = new Audio('turn_sound.mp3');

console.log("Tic Tac Toe");

let turn = "X";
let gameover = false;
let isComputerTurn = false; 

/*change to X and O respectively after each click*/
const ChangeTurn = () => {
    turn = turn === "X" ? "O" : "X";
    if (turn === "O") {
        document.querySelector(".bg").style.left = "calc(46% + 4vw)";
        document.querySelector(".turnbox2").style.color = "#0f1b21";
        document.querySelector(".turnbox1").style.color = "white";
    } else if (turn === "X") {
        if (window.innerWidth > 768) {
            document.querySelector(".bg").style.left = "calc(50% - 4vw)";
        }  else {
            document.querySelector(".bg").style.left = "36vw";
        }
        document.querySelector(".turnbox1").style.color = "#0f1b21";
        document.querySelector(".turnbox2").style.color = "white";
    }
}

/*check if win condition is met*/
const CheckIfWin = () => {
    let txt = document.getElementsByClassName('boxtxt');
    let win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let winner = null;
    let isDraw = true;

    win.forEach(e => {
        if (txt[e[0]].innerText === txt[e[1]].innerText && 
            txt[e[1]].innerText === txt[e[2]].innerText && 
            txt[e[0]].innerText !== "") {
                winner = txt[e[0]].innerText;
                gameover = true; 
                e.forEach(index => {
                    document.getElementsByClassName('box')[index].classList.add('winning-box');
                });
                isDraw = false;
            } else if (txt[e[0]].innerText === "" || txt[e[1]].innerText === "" || txt[e[2]].innerText === "") {
                isDraw = false;
            }   
    });

    if (winner === "X") {
        document.querySelector('.result').innerText = "You win :)";
    } else if (winner === "O") {
        document.querySelector('.result').innerText = "Bot win :(";
    } else if (isDraw) {
        document.querySelector('.result').innerText = "It's a draw!";
        gameover = true;
    }

    let resetButton = document.getElementById("reset");
    if (gameover) {
        resetButton.innerText = "New Game";
    } else {
        resetButton.innerText = "Reset";
    }
}

/*get empty boxes in game for computer play*/
const getRandomEmptyBox = () => {
    let emptyBoxes = [];
    let txt = document.getElementsByClassName('boxtxt');
    for (let i = 0; i < txt.length; i++) {
        if (txt[i].innerText === '') {
            emptyBoxes.push(i);
        }
    }
    if (emptyBoxes.length === 0) return null;
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[randomIndex];
}

/*computer move O*/
const computerMove = () => {
    isComputerTurn = true; 
    setTimeout(() => {
        let index = getWinningMove() ?? getBlockingMove() ?? getRandomEmptyBox();
        if (index !== null) {
            let box = document.getElementsByClassName('box')[index];
            let boxtext = box.querySelector('.boxtxt');
            boxtext.innerText = 'O';
            boxtext.style.color = '#ff5f1f';
            ChangeTurn();
            CheckIfWin();
            isComputerTurn = false;
            gameturn.play();
        }
    }, 1500);
}

/*Winning possibility for computer*/
const getWinningMove = () => {
    let txt = document.getElementsByClassName('boxtxt');
    let win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < win.length; i++) {
        let [a, b, c] = win[i];
        if (txt[a].innerText === 'O' && txt[b].innerText === 'O' && txt[c].innerText === '') {
            return c; 
        }
        if (txt[a].innerText === 'O' && txt[c].innerText === 'O' && txt[b].innerText === '') {
            return b;
        }
        if (txt[b].innerText === 'O' && txt[c].innerText === 'O' && txt[a].innerText === '') {
            return a;
        }
    }
    return null;
}

/*blocking possibility for computer*/
const getBlockingMove = () => {
    let txt = document.getElementsByClassName('boxtxt');
    let win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < win.length; i++) {
        let [a, b, c] = win[i];
        if (txt[a].innerText === 'X' && txt[b].innerText === 'X' && txt[c].innerText === '') {
            return c; 
        }
        if (txt[a].innerText === 'X' && txt[c].innerText === 'X' && txt[b].innerText === '') {
            return b;
        }
        if (txt[b].innerText === 'X' && txt[c].innerText === 'X' && txt[a].innerText === '') {
            return a;
        }
    }
    return null;
}

/*box inputs*/
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtxt');
    element.addEventListener("click", () => {
        if (!isComputerTurn && boxtext.innerText === '' && !gameover) { 
            boxtext.innerText = turn;
            boxtext.style.color = turn === 'X' ? '#26ffcb' : '#ff5f1f';
            ChangeTurn();
            CheckIfWin();
            if (!gameover && turn === 'O') {
                computerMove();
            }
            gameturn.play();
        }
    });
});

/*reset button working*/
const resetGame = () => {
    let boxes = document.getElementsByClassName("boxtxt");
    Array.from(boxes).forEach(box => {
        box.innerText = "";
    });
    turn = "X";
    gameover = false;
    document.querySelector('.result').innerText = "";
    if (window.innerWidth > 768) {
        document.querySelector(".bg").style.left = "calc(50% - 4vw)"; 
    } else {
        document.querySelector(".bg").style.left = "36vw"; 
    }
    document.querySelector(".turnbox1").style.color = "#0f1b21";
    document.querySelector(".turnbox2").style.color = "white";
    let resetButton = document.getElementById("reset");
    resetButton.innerText = "Reset";
    let winningBoxes = document.querySelectorAll('.box');
    winningBoxes.forEach(box => {
        box.classList.remove('winning-box');
    });
}

document.getElementById("reset").addEventListener("click", resetGame);