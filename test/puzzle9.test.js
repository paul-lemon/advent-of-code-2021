const Puzzle9 = require('puzzle9');

test('doPuzzle', () => {
    const result = Puzzle9.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 9");
    expect(result.day).toBe("Day 5");
    expect(isNaN(result.totalOverlappintPoints)).toBe(false);
    expect(result.totalOverlappintPoints>0).toBe(true);
    expect(result.totalOverlappintPoints).toBe(7318);
})

test("parseVectorFromTextFile", () => {
    /**
     * 7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
     */
    let result = Puzzle9.parseVectorFromTextFile("7,0 -> 7,4");
    expect(result).toEqual({
        x1: 7,
        y1: 0,
        x2: 7,
        y2: 4
    });
    result = Puzzle9.parseVectorFromTextFile("6,4 -> 2,0");
    expect(result).toEqual({
        x1: 6,
        y1: 4,
        x2: 2,
        y2: 0
    });

})

test("readAndParseData", () => {
    let vectors = Puzzle9.readAndParseData(true);
    expect(vectors.length).toBe(10);
    expect(vectors[5]).toEqual({
        x1: 6,
        y1: 4,
        x2: 2,
        y2: 0
    });
    expect(vectors[9]).toEqual({
        x1: 5,
        y1: 5,
        x2: 8,
        y2: 2
    });
    expect(vectors[0]).toEqual({
        x1: 0,
        y1: 9,
        x2: 5,
        y2: 9
    });
    vectors = Puzzle9.readAndParseData(false);
    expect(vectors.length).toBe(500);

    expect(vectors[0]).toEqual({
        x1: 959,
        y1: 103,
        x2: 139,
        y2: 923
    });
    expect(vectors[499]).toEqual({
        x1: 872,
        y1: 63,
        x2: 233,
        y2: 63
    });
});

const sumGrid = (grid)=>{
    return grid.reduce(
        (sum, row) => {
            return sum + row.reduce((previous, current) => previous + current, 0)
        },
        0
    )
};
test('build grid', () => {
    let vectors = Puzzle9.readAndParseData(true);
    let grid = Puzzle9.buildEmptyGrid(vectors);
    expect(Array.isArray(grid));
    expect(Array.isArray(grid[0]));
    expect(grid.length).toBe(10);
    expect(grid[0].length).toBe(10);
    // check all values are zero
    let sum = sumGrid(grid);
    expect(sum).toBe(0);
    expect(grid[9].length).toBe(10);
    // check each row is independent
    grid[0][0]=1;
    expect(grid[1][0]).toBe(0);
});

test('draw line',()=>{
    let puzzle9 = new Puzzle9(true);
    let grid = puzzle9.grid;
    expect(puzzle9.vectors.length).toBe(10);
    expect(puzzle9.grid.length).toBe(10);
    puzzle9.drawVector({x1:0,y1:0,x2:0,y2:9});
    expect(puzzle9.totalOverlappintPoints).toBe(0);
    puzzle9.drawVector({x1:0,y1:0,x2:0,y2:9});
    expect(puzzle9.totalOverlappintPoints).toBe(10);
    puzzle9.drawVector({x1:0,y1:0,x2:0,y2:9});
    expect(puzzle9.totalOverlappintPoints).toBe(10);

    // check all values are zero
    let sum = sumGrid(grid);
    expect(sum).toBe(30);
    for (let i=0;i<grid.length;i++) {
        expect(grid[i][0]).toBe(3);
    }
    puzzle9.drawVector({x1:0,y1:2,x2:9,y2:2});
    sum = sumGrid(grid);
    expect(sum).toBe(40);
    expect(grid[2][0]).toBe(4);
    for (let i=1;i<grid[2].length;i++) {
        expect(grid[2][i]).toBe(1);
    };
    expect(puzzle9.totalOverlappintPoints).toBe(10);
    puzzle9.drawVector({x1:4,y1:3,x2:0,y2:3});
    sum = sumGrid(grid);
    expect(sum).toBe(45);
    expect(grid[3][0]).toBe(4);
    expect(grid[3][4]).toBe(1);
    expect(grid[3][5]).toBe(0);


    puzzle9.drawVector({x1:2,y1:4,x2:2,y2:0});
    sum = sumGrid(grid);
    expect(sum).toBe(50);


    puzzle9.drawVector({x1:0,y1:0,x2:9,y2:9},true);
    sum = sumGrid(grid);
    expect(sum).toBe(60);


    expect(grid[2][7]).toBe(1);
    puzzle9.drawVector({x1:9,y1:0,x2:7,y2:2},true);
    expect(grid[0][9]).toBe(1);
    expect(grid[1][8]).toBe(1);
    expect(grid[2][7]).toBe(2);
    
});
test('execute Puzzle and check result',()=>{
    let puzzle9 = new Puzzle9(true);
    puzzle9.drawAllVectors();
    expect(puzzle9.totalOverlappintPoints).toBe(5);
    // now do it with diagonal line drawing for the second half of the puzzle
    puzzle9 = new Puzzle9(true);
    puzzle9.drawAllVectors(true);
    expect(puzzle9.totalOverlappintPoints).toBe(12);

});
