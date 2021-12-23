const Puzzle3 = require('puzzle3.js');

test("result",()=>{
    let result = Puzzle3.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 3");
    expect(result.day).toBe("Day 2");
    expect(result.commandsProcessed).toBe(1000);
    expect(result.x).toBe(2085);
    expect(result.z).toBe(785);
    expect(result.result).toBe(1636725);
});


test('load data',()=>{
    let puzzle = new Puzzle3();
    expect(puzzle.data.length).toBe(1000);
    expect(puzzle.data[0]).toBe("forward 5");
    expect(puzzle.data[999]).toBe("forward 6");
    expect(puzzle.x).toBe(0);
    expect(puzzle.z).toBe(0);
    puzzle.processCommand("forward 5");
    expect(puzzle.x).toBe(5);
    expect(puzzle.z).toBe(0);
    puzzle.processCommand("down 2");
    expect(puzzle.x).toBe(5);
    expect(puzzle.z).toBe(2);
    puzzle.processCommand("forward 9");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(2);
    puzzle.processCommand("down 9");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(11);
    puzzle.processCommand("down 1");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(12);
    puzzle.processCommand("up 2");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(10);
    puzzle.processCommand("up 9");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(1);
    puzzle.processCommand("up 9");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(-8);
    puzzle.processCommand("down 9");
    expect(puzzle.x).toBe(14);
    expect(puzzle.z).toBe(1);

    expect(() => {
        puzzle.processCommand("down 19");
      }).toThrow();

    expect(() => {
        puzzle.processCommand("back 9");
    }).toThrow();

    expect(() => {
        puzzle.processCommand("up A");
    }).toThrow();
})