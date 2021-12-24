const Puzzle10 = require('puzzle10');

test('doPuzzle', () => {
    const result = Puzzle10.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 10");
    expect(result.day).toBe("Day 5");
    expect(isNaN(result.totalOverlappintPoints)).toBe(false);
    expect(result.totalOverlappintPoints>0).toBe(true);
    expect(result.totalOverlappintPoints).toBe(19939);

});
