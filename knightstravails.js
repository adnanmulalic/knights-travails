let chessBoard = [];
for (let y = 0; y < 8; y++) { // create board and push all positions in array chessBoard
    for (let x = 0; x < 8; x++) {
        chessBoard.push([x, y]);
    };
};

function checkMove(x, y) {
    const moves = [[x + 2, y + 1], [x + 2, y - 1], [x + 1, y - 2], [x - 1, y - 2], // all possible moves for knight
    [x - 2, y + 1], [x - 2, y - 1], [x + 1, y + 2], [x - 1, y + 2]];
    let viableMoves = [];
    moves.forEach((move) => {
        if ((move[0] >= 0 && move[0] < 8) && (move[1] >= 0 && move[1] < 8)) { // check if move doesnt go off board
            viableMoves.push([move[0], move[1]]);
        };
    });
    return viableMoves;
};

let movesList = [];
chessBoard.forEach((position) => { // create adjacency list with all possible moves from given board position
    movesList.push(checkMove(position[0], position[1]));
});

function findPositionIndex(position) { // helper function to find index of position on chessboard
    return chessBoard.findIndex((boardPosition) => boardPosition[0] === position[0] && boardPosition[1] === position[1]);
};


function knightMoves(start, end) {
    let bfsInfo = []; // lesson 11: Breadth-first search from Khan Academy
    for (let i = 0; i < movesList.length; i++) { // for each move we create object which contains two properties
        bfsInfo[i] = { // object is created at the same index as moves from movesList
            distance: null, // distance from start position
            previousPosition: null
        };
    };

    let arrOfPositions = [];
    arrOfPositions.push(start);
    let currentPosition = start;
    let indexOfCurrentPosition = findPositionIndex(start);
    bfsInfo[indexOfCurrentPosition].distance = 0;

    while (currentPosition.toString() !== end.toString()) { // run loop untill we reach end position
        currentPosition = arrOfPositions.shift(); // remove first position in queue
        indexOfCurrentPosition = findPositionIndex(currentPosition);
        let nextMoves = movesList[indexOfCurrentPosition]; // all moves from current position

        nextMoves.forEach((nextMove) => {
            let nextMoveIndex = findPositionIndex(nextMove);
            if (bfsInfo[nextMoveIndex].distance === null) { // if distance is null, then position hasnt been visited yet
                bfsInfo[nextMoveIndex].distance = bfsInfo[indexOfCurrentPosition].distance + 1; // increase distance by 1 from previous position
                bfsInfo[nextMoveIndex].previousPosition = currentPosition;
                arrOfPositions.push(nextMove); // add position to the end of queue
            }
        })
    };

    let path = [];
    function route(position) { // recursively build path going from end back to start
        if (position[0] === start[0] && position[1] === start[1]) {
            path.unshift(position);
            return;
        }
        path.unshift(position);
        let index = findPositionIndex(position);
        position = bfsInfo[index].previousPosition;
        route(position);
    };
    route(currentPosition);

    console.log(`You made it in ${bfsInfo[indexOfCurrentPosition].distance} moves!. Here is your path:`, path);
};

knightMoves([0,0], [7,7]);

