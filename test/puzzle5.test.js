const Puzzle5 = require('puzzle5.js');

test("calculate Gamma",()=>{
    expect(Puzzle5.calculateGamma([0,0,1,1,0])).toEqual([1,1,0,0,1]); 
    expect(
        Puzzle5.calculateGamma(
            [0,0,1,1,0,1,1,1,1,1,0,0])
        ).toEqual(
            [1,1,0,0,1,0,0,0,0,0,1,1]
        ); 
});
test("convert string to binary bit array",()=>{
    expect(()=>{
        Puzzle5.createBitArray("501001")
    }).toThrow();
    expect(()=>{
        Puzzle5.createBitArray("")
    }).toThrow();
    expect(()=>{
        Puzzle5.createBitArray("a1111")
    }).toThrow();
    expect(Puzzle5.createBitArray("11001")).toEqual([1,1,0,0,1]); 
    expect(Puzzle5.createBitArray("001001")).toEqual([0,0,1,0,0,1]);
    expect(Puzzle5.createBitArray("011001")).toEqual([0,1,1,0,0,1]); 
    expect(Puzzle5.createBitArray("011001010110")).toEqual([0,1,1,0,0,1,0,1,0,1,1,0]); 

})
test("find most popular bits",()=>{

    expect(
        Puzzle5.findMostPopularBits([
            "00000",
            "11111",
            "00000"
        ])
    ).toEqual([0,0,0,0,0]); 

    expect(
        Puzzle5.findMostPopularBits([
            "000000",
            "111110",
            "000000"
        ])
    ).toEqual([0,0,0,0,0,0]); 


    expect(
        Puzzle5.findMostPopularBits([
            "000000111111",
            "111110000000",
            "000000111111"
        ])
    ).toEqual([0,0,0,0,0,0,1,1,1,1,1,1]); 
    expect(
        Puzzle5.findMostPopularBits([
            "11111010101",
            "11111000000",
            "00000101111"
        ])
    ).toEqual([1,1,1,1,1,0,0,0,1,0,1]); 
    expect(
        Puzzle5.findMostPopularBits([
            "10101",
            "01010",
            "10001"
        ])
    ).toEqual([1,0,0,0,1]); 
    let lines = [
        "00100",
        "11110",

        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
    ]
    expect(Puzzle5.findMostPopularBits(lines)).toEqual([1,0,1,1,0]); 
     
});

test('bitArrayToDecimal',()=>{
    expect(Puzzle5.bitArrayToDecimal([0])).toBe(0);
    expect(Puzzle5.bitArrayToDecimal([1])).toBe(1);
    expect(Puzzle5.bitArrayToDecimal([1,0])).toBe(2);
    expect(Puzzle5.bitArrayToDecimal([1,1])).toBe(3);
    expect(Puzzle5.bitArrayToDecimal([1,0,0])).toBe(4);
    expect(Puzzle5.bitArrayToDecimal([1,0,0,1,1])).toBe(19);
    expect(Puzzle5.bitArrayToDecimal([1,1,1,1,1,1,1,1,1,1,1,1])).toBe(4095);
});

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