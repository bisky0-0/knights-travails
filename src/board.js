//numbering board
class Cell {
    constructor(x, y, dist, parent) {
        //vertcies
        this.x = x;
        this.y = y;
        //edges
        this.dist = dist;
        //I need this parent to build get the shortest path
        this.parent = parent;
    }
}


function checkValidCell(x, y) {
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return true;
    return false;
}

// build path by parent proerity
function buildPath(cell, path = []) {
    path.unshift([cell.x, cell.y])
    if (cell.parent == undefined) return path;
    return buildPath(cell.parent, path)
}


export function knightMoves(currentPosition, targetPosition) {
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

    //prevent self loops by visiting the same place again and again
    const path = []
    const set = new Set()

    while (possibleMoves.length > 0) {


        let knightPosition = possibleMoves.shift();

        set.add([knightPosition.x, knightPosition.y].toString())

        path.push([knightPosition.x, knightPosition.y])

        if (knightPosition.x == targetPosition[0] && knightPosition.y == targetPosition[1]) {
            let path = buildPath(knightPosition);
            return path;
        }

        for (let i = 0; i < 8; i++) {
            let x = knightPosition.x + _KNIGHTOFFSET[i][0]
            let y = knightPosition.y + _KNIGHTOFFSET[i][1]

            if (checkValidCell(x, y) && !set.has([x, y].toString())) {
                set.add([x, y].toString())
                possibleMoves.push(new Cell(x, y, knightPosition.dist + 1, knightPosition))
            }
        }
    }
    return Number.MAX_VALUE;
}
