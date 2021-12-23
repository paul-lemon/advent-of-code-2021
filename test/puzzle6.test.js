
const BinaryDataHelper = require('lib/binary-data-helper');
const Puzzle6 = require('puzzle6');

const exampleTestDataSetText = [
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
];
const exampleTestDataSet = exampleTestDataSetText.map(text=>BinaryDataHelper.createBitArray(text));

test("criteria step for oxygen rating",()=>{
    let result = Puzzle6.doOxygenCalculationStep(exampleTestDataSet,0);

    expect(result).toEqual(
        [[1,1,1,1,0], [1,0,1,1,0], [1,0,1,1,1], [1,0,1,0,1], [1,1,1,0,0], [1,0,0,0,0], [1,1,0,0,1]]
    );
    result = Puzzle6.doOxygenCalculationStep(result,1);
    expect(result.length).toBe(4);
    expect(result[0]).toEqual([1,0,1,1,0]);
    expect(result[3]).toEqual([1,0,0,0,0]);
    expect(result).toEqual(
        [[1,0,1,1,0], [1,0,1,1,1], [1,0,1,0,1],[1,0,0,0,0]]
    );
    result = Puzzle6.doOxygenCalculationStep(result,2);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual([1,0,1,1,0]);
    expect(result[2]).toEqual([1,0,1,0,1]);

    result = Puzzle6.doOxygenCalculationStep(result,3);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual([1,0,1,1,0]);
    expect(result[1]).toEqual([1,0,1,1,1]);

    result = Puzzle6.doOxygenCalculationStep(result,4);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual([1,0,1,1,1]);
});

test("criteria step for co2 rating",()=>{
    let result = Puzzle6.doCo2CalculationStep(exampleTestDataSet,0);
    expect(result.length).toBe(5);
    expect(result[0]).toEqual([0,0,1,0,0]);
    expect(result[4]).toEqual([0,1,0,1,0]);

    result = Puzzle6.doCo2CalculationStep(result,1);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual([0,1,1,1,1]);
    expect(result[1]).toEqual([0,1,0,1,0]);

    result = Puzzle6.doCo2CalculationStep(result,2);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual([0,1,0,1,0]);


});




test("calculate oxygen rating",()=>{
    let result = Puzzle6.doOxygenCalculation(exampleTestDataSet);
    expect(result).toBe(23);
});

test("calculate c02 rating",()=>{
    let result = Puzzle6.doCo2Calculation(exampleTestDataSet);
    expect(result).toBe(10);
});

test("result",()=>{
    let result = Puzzle6.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 6");
    expect(result.day).toBe("Day 3");
    expect(isNaN(result.co2rating)).toBe(false);
    expect(isNaN(result.oxygenrating)).toBe(false);
    expect(result.co2rating).toBeLessThan(4096);
    expect(result.oxygenrating).toBeLessThan(4096);
    expect(result.result).toBeLessThan(4096*4096);
    expect(result.result).toBe(result.co2rating * result.oxygenrating);
    expect(result.result).toBe(1032597);
    expect(result.oxygenrating).toBe(3573);
    expect(result.co2rating).toBe(289);
});