const Puzzle5 = require('puzzle5.js');



test("result",()=>{
    let result = Puzzle5.doPuzzle();

    expect(result.puzzleName).toBe("Puzzle 5");
    expect(result.day).toBe("Day 3");
    expect(result.linesProcessed).toBe(1000);
    expect(isNaN(result.epsilon)).toBe(false);
    expect(isNaN(result.gamma)).toBe(false);
    expect(result.epsilon).toBeLessThan(4096);
    expect(result.gamma).toBeLessThan(4096);
    expect(result.result).toBeLessThan(4096*4096);
    expect(result.epsilon).toBe(3529);
    expect(result.gamma).toBe(566);
    expect(result.result).toBe(result.epsilon * result.gamma);
    expect(result.result).toBe(1997414);
});


test('load data',()=>{
    let puzzle = new Puzzle5();
});