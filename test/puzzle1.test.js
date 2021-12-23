
const Puzzle1 = require('puzzle1.js');

test("result",()=>{
    let result = Puzzle1.doPuzzle();
    expect(result.result).toBe(1521);
    expect(result.linesCompared).toBe(1999);
    expect(result.puzzleName).toBe("Puzzle 1");
});


test('load data',()=>{
    let puzzle = new Puzzle1();
    expect(puzzle.data.length).toBe(2000);
    expect(puzzle.data[0]).toBe(173);
    expect(puzzle.data[1999]).toBe(7121);
})