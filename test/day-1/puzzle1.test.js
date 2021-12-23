
const Puzzle1 = require('day-1/puzzle1.js');

test("result is non zero",()=>{
    let result = Puzzle1.doPuzzle();
    expect(result.result).not.toBe(0);
    expect(result.linesProcessed).not.toBe(1999);
    console.table(result);
});

test('load data',()=>{
    let puzzle = new Puzzle1();
    expect(puzzle.data.length).toBe(2000);
    expect(puzzle.data[0]).toBe(173);
    expect(puzzle.data[1999]).toBe(7121);
})