//numbering board
class Cell {
    constructor(x, y, dist) {
        //vertcies
        this.x = x;
        this.y = y;
        //edges
        this.dist = dist;
    }
}

class Board {
    constructor() {
        this.board = this.generateoard()
    }

    generateoard(board = []) {
        for (let i = 0; i < 8; i++) {
            board[i] = []
            for (let j = 0; j < 8; j++) {
                board[i].push(j)
                board[i][j] = false
            }
        }
        return board
    }

}

function checkValidCell(x, y) {
    if (x >= 1 && x <= 8 && y >= 1 && y <= 8) return true;
    return false;
}

function knightMoves(currentPosition, targetPosition) {
    let board = new Board();
    const _KNIGHTOFFSET = [
        [1, 2],
        [-1, -2],
        [1, -2],
        [-1, 2],
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1]
    ];

    //queue
    const possibleMoves = [];
    possibleMoves.push(new Cell(currentPosition[0], currentPosition[1], 0));


    while (possibleMoves.length > 0) {

        let knightPosition = possibleMoves.shift();
        board.board[knightPosition.x][knightPosition.y] = true;

        if (knightPosition.x == targetPosition[0] && knightPosition.y == targetPosition[1]) return knightPosition.dist;

        for (let i = 0; i < 8; i++) {
            let x = knightPosition.x + _KNIGHTOFFSET[i][0]
            let y = knightPosition.y + _KNIGHTOFFSET[i][1];


            // console.log(board.board[x][y])
            if (checkValidCell(x, y) && !board.board[x][y]) {
                knightPosition.visit = true;
                possibleMoves.push(new Cell(x, y, knightPosition.dist + 1))
            }
        }
    }
    return Number.MAX_VALUE;
}

console.log(knightMoves([0, 0], [4, 1]))
