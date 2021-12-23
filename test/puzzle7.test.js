
const Puzzle7 = require('puzzle7');

test("read sequence from file",()=>{
    const result = Puzzle7.readAndParseData(true);

    expect(Array.isArray(result.sequence));
    expect(result.sequence).toEqual(
        [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]
    );
    expect(result.sequence.length).toBe(27);
});


test("read boards from file",()=>{
    const result = Puzzle7.readAndParseData(true);
    expect(Array.isArray(result.boards)).toBe(true);
    expect(result.boards.length).toBe(3);
    expect(Array.isArray(result.boards[0])).toBe(true);
    expect(result.boards[0].length).toBe(5);
    expect(Array.isArray(result.boards[0][0])).toBe(true);
    expect(result.boards[0][0].length).toBe(5);
    expect(Array.isArray(result.boards[0][4])).toBe(true);
    expect(result.boards[0][4].length).toBe(5);
    expect(result.boards[0][0][0]).toBe(22);
    expect(result.boards[0][4][4]).toBe(19);
    expect(result.boards[2].length).toBe(5);
    expect(result.boards[2][0].length).toBe(5);
    expect(result.boards[2][4].length).toBe(5);
});

test("initial state",()=>{
    const puzzle7 = new Puzzle7(true);
    expect(Array.isArray(puzzle7.boardsState)).toBe(true);
    expect(puzzle7.boardsState.length).toBe(3);
    expect(Array.isArray(puzzle7.boardsState[0])).toBe(true);
    expect(puzzle7.boardsState[0].length).toBe(10);
    expect(puzzle7.boardsState[1].length).toBe(10);
    expect(puzzle7.boardsState[2].length).toBe(10);
    expect(puzzle7.boardsState[0][0]).toEqual([22,13,17,11,0]);
    expect(puzzle7.boardsState[0][5]).toEqual([22,8,21,6,1]);
    expect(puzzle7.boardsState[0][9]).toEqual([0,24,7,5,19]);
    expect(puzzle7.boardsState[0][9]).toEqual([0,24,7,5,19]);

   puzzle7.playNumber(5);
   expect(puzzle7.boardsState[0][9]).toEqual([0,24,7,19]);
})


test("has a line",()=>{
    const puzzle7 = new Puzzle7(true);
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.boardsState[2][1]=[1];
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.boardsState[1][5]=[];
    expect(puzzle7.hasLineFilled()).toBe(true);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(1);

});

test('play numbers',()=>{
    const puzzle7 = new Puzzle7(true);
    puzzle7.playNumber(22);
    expect(puzzle7.boardsState[0][0]).toEqual([13,17,11,0]);
    expect(puzzle7.boardsState[1][0]).toEqual([3,15,0,2]);
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.playNumber(15);
    expect(puzzle7.boardsState[0][0]).toEqual([13,17,11,0]);
    expect(puzzle7.boardsState[1][0]).toEqual([3,0,2]);
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.playNumber(13);
    expect(puzzle7.boardsState[0][0]).toEqual([17,11,0]);
    expect(puzzle7.boardsState[1][0]).toEqual([3,0,2]);
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.playNumber(3);
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.playNumber(0);
    expect(puzzle7.hasLineFilled()).toBe(false);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(null);
    puzzle7.playNumber(2);
    expect(puzzle7.hasLineFilled()).toBe(true);
    expect(puzzle7.whichBoardHasLineFilled()).toBe(1);
    
});

test('sum remaining board total',()=>{
    const puzzle7 = new Puzzle7(true);
    /*
    14 21 17 24  4
    10 16 15  9 19
    18  8 23 26 20
    22 11 13  6  5
    2  0 12  3  7
    */
    let expectedSum = 14+21+17+24+4+10+16+15+9+19+18+8+23+26+20+22+11+13+6+5+2+0+12+3+7;
    let initialSum = puzzle7.getBoardRemainingTotal(2);

    expect(initialSum).toBe(expectedSum);

    puzzle7.playNumber(7);
   expect(puzzle7.getBoardRemainingTotal(2)).toBe(initialSum-7);
   puzzle7.playNumber(5);
   expect(puzzle7.getBoardRemainingTotal(2)).toBe(initialSum-12);
   puzzle7.playNumber(1);
   expect(puzzle7.getBoardRemainingTotal(2)).toBe(initialSum-12);
   puzzle7.playNumber(19);
   expect(puzzle7.getBoardRemainingTotal(2)).toBe(initialSum-31);

});

test('play game',()=>{
    const puzzle7 = new Puzzle7(true);
    expect(puzzle7.hasLineFilled()).toBe(false);
    let result = puzzle7.playGame();
    expect(puzzle7.hasLineFilled()).toBe(true);
    expect(result.winningBoard).toBe(2);
    expect(result.lastNumber).toBe(24);
    expect(result.winningBoardSum).toBe(188);
});

test("deleting boards from game state",()=>{
    const puzzle7 = new Puzzle7(true);
    expect(puzzle7.boardsState[2][0]).toEqual([14,21,17,24,4]);

    puzzle7.deleteBoard(1);
    expect(puzzle7.boardsState.length).toBe(2);
    expect(puzzle7.boardsState[1][0]).toEqual([14,21,17,24,4]);

    puzzle7.deleteBoard(0);
    expect(puzzle7.boardsState.length).toBe(1);
    expect(puzzle7.boardsState[0][0]).toEqual([14,21,17,24,4]);


    puzzle7.deleteBoard(0);
    expect(puzzle7.boardsState.length).toBe(0);
})

test('play game to last board',()=>{
    const puzzle7 = new Puzzle7(true);
    expect(puzzle7.hasLineFilled()).toBe(false);
    let result = puzzle7.playGameToLastBoard();

    expect(puzzle7.hasLineFilled()).toBe(true);
    expect(puzzle7.boardsState.length).toBe(1);
    expect(result.winningBoard).toBe(0);
    expect(result.lastNumber).toBe(13);
    expect(result.winningBoardSum).toBe(148);
    
});

test('doPuzzle',()=>{
    const result = Puzzle7.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 7");
    expect(result.day).toBe("Day 4");
    expect(isNaN(result.winningBoard)).toBe(false);
    expect(isNaN(result.lastNumber)).toBe(false);
    expect(isNaN(result.winningBoardSum)).toBe(false);
    expect(result.winningBoard).toBe(49);
    expect(result.lastNumber).toBe(41);
    expect(result.winningBoardSum).toBe(871);
    expect(result.result).toBe(result.lastNumber*result.winningBoardSum);
    expect(result.result).toBe(35711);
})