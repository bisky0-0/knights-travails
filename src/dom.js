import { knightMoves } from "./board";

//put data to squeres;
export function setDataSqre() {
    let squares = document.getElementsByClassName('square');
    let arr = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            arr.push([i, j])
        }
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].dataset.x = arr[i][0]
        squares[i].dataset.y = arr[i][1]
    }

    knightPlace(7, 1)
}

function knightPlace(x, y) {
    let Oldknight;
    document.getElementById('knight') ? Oldknight = document.getElementById('knight') : false;
    let newknight = document.createElement('img');
    let squares = document.getElementsByClassName('square');
    newknight.src = './icons/159367.svg';
    newknight.dataset.posX = x;
    newknight.dataset.posY = y;

    Oldknight ? Oldknight.remove() : false

    for (let i = 0; i < squares.length; i++) {
        if (squares[i].dataset.x == x && squares[i].dataset.y == y) squares[i].appendChild(newknight).setAttribute('id', 'knight')
    }

}


export function squareListener() {
    let knight = document.getElementById('knight')
    let knightSound = document.getElementById('hit-sound')
    let squares = document.getElementsByClassName('square');
    for (const square of squares) {
        square.addEventListener('click', async (e) => {
            const path = knightMoves([+(knight.dataset.posX), +(knight.dataset.posY)], [+(e.target.dataset.x), +(e.target.dataset.y)])

            for (let i = 1; i < path.length; i++) {
                (function (i) {
                    setTimeout(() => {
                        knightSound.play()
                        knight.dataset.posX = path[i][0];
                        knight.dataset.posY = path[i][1];
                        knightPlace(+path[i][0], +path[i][1])
                    }, 900 * i);

                }(i))
            }
        })
    }
}