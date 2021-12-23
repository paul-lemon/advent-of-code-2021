const Puzzle8 = require('puzzle8');

test('doPuzzle',()=>{
    const result = Puzzle8.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 8");
    expect(result.day).toBe("Day 4");
    expect(isNaN(result.winningBoard)).toBe(false);
    expect(isNaN(result.lastNumber)).toBe(false);
    expect(isNaN(result.winningBoardSum)).toBe(false);
    expect(result.winningBoard).toBe(0);
    expect(result.lastNumber).toBe(21);
    expect(result.winningBoardSum).toBe(266);
    expect(result.result).toBe(result.lastNumber*result.winningBoardSum);
    expect(result.result).toBe(5586);
})