const Puzzle2 = require('puzzle2.js');

test("result",()=>{
    let result = Puzzle2.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 2");
    expect(result.result).not.toBe(1521);
    expect(result.windowsCompared).toBe(1998);
});


test('load data',()=>{
    let puzzle = new Puzzle2();
    expect(puzzle.data.length).toBe(2000);
    expect(puzzle.data[0]).toBe(173);
    expect(puzzle.data[1999]).toBe(7121);

    expect(puzzle.windows.length).toBe(1998);
    expect(puzzle.windows[0]).toBe(173+175+171);
    expect(puzzle.windows[1997]).toBe(7118+7115+7121);


})