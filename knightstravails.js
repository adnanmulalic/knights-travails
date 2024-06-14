let chessBoard = [];
for (let y = 7; y >= 0; y--) { // create board and push all positions in array chessBoard
    for (let x = 0; x < 8; x++) {
        chessBoard.push([x, y]);
    }
}

let movesList = {};
chessBoard.forEach((position) => { // create adjacency list with all possible moves from given position
    //console.log(position[0], position[1]);
    let tile = position[0].toString().concat("", position[1]);
    movesList[tile] = checkMove(position[0], position[1]);
    //movesList.push({ [tile] : checkMove(position[0], position[1])});
})
//console.log(movesList)

function checkMove(x, y) {
    const moves = [[x + 2, y + 1], [x + 2, y - 1], [x + 1, y - 2], [x - 1, y - 2], // all possible moves for knight
    [x - 2, y + 1], [x - 2, y - 1], [x + 1, y + 2], [x - 1, y + 2]];
    let viableMoves = [];
    moves.forEach((move) => {
        if ((move[0] > 0 && move[0] < 8) && (move[1] > 0 && move[1] < 8)) { // check if move doesnt go off board
            viableMoves.push(move);
        }
    });
    return viableMoves;
}

function knightMoves(start, end) {
    let path = [];
    function move(currentPosition, arrOfMoves = [], counter = 0) {
        console.log(currentPosition, arrOfMoves)
        if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
            return counter;
        }
        arrOfMoves.shift();
        //console.log(...movesList[currentPosition]);
        arrOfMoves.push(...movesList[currentPosition]);
        move(arrOfMoves[0], arrOfMoves, counter + 1);
        return;
    }

    return move(start[0].toString().concat("", start[1]));
    
    console.log(move(start[0].toString().concat("", start[1])));
};

knightMoves([0,7], [4,5]);
//console.log(knightMoves([0,7], [4,5]));

// 0,7 --> 2,6 --> 4,5



let adjList = {
    "07" : {
        position: [0,7],
        moves: [[2,6], [1,5]]
    },
    "26" : {
        position: [2,6],
        moves: [[4,7], [4,5], [3,4], [1,4], [0,7], [0,5]]
    },
    1 : {
        position: [1,7],
        moves: [[3,6], [2,5], [0,5]] 
    }
}

function traverseChessboard(node, arrOfNodes = []) { // recursive
    if (!node) {
        return;
    }
    callback && callback(node);
    arrOfNodes.shift();
    arrayOfValues.push(node.data);
    node.left && arrOfNodes.push(node.left);
    node.right && arrOfNodes.push(node.right);
    travelDown(arrOfNodes[0], arrOfNodes);
    return;
}
//travelDown(this.root);
