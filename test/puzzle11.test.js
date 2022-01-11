
const Puzzle11 = require('puzzle11');
test('doPuzzle', () => {
    const result = Puzzle11.doPuzzle();
    expect(result.puzzleName).toBe("Puzzle 11");
    expect(result.day).toBe("Day 6");
    expect(isNaN(result.totalFish)).toBe(false);
    expect(result.totalFish).toBe(351092);
})

test('load and parse data',()=>{
    const fishPopulation = Puzzle11.readAndParseData(true);
    expect(fishPopulation).toStrictEqual([0,1,1,2,1]);

});


test('addFishToPopulation',()=>{
    let fishPopulation = [];
    Puzzle11.addFishToPopulation(fishPopulation,0);
    expect(fishPopulation).toStrictEqual([1]);
    Puzzle11.addFishToPopulation(fishPopulation,3);
    expect(fishPopulation).toStrictEqual([1,0,0,1]);
    Puzzle11.addFishToPopulation(fishPopulation,2);
    expect(fishPopulation).toStrictEqual([1,0,1,1]);
    Puzzle11.addFishToPopulation(fishPopulation,3);
    expect(fishPopulation).toStrictEqual([1,0,1,2]);
    Puzzle11.addFishToPopulation(fishPopulation,8);
    expect(fishPopulation).toStrictEqual([1,0,1,2,0,0,0,0,1]);
    Puzzle11.addFishToPopulation(fishPopulation,7);
    expect(fishPopulation).toStrictEqual([1,0,1,2,0,0,0,1,1]);
    Puzzle11.addFishToPopulation(fishPopulation,7,5);
    expect(fishPopulation).toStrictEqual([1,0,1,2,0,0,0,6,1]);
});

test('breed fish',()=>{
    let puzzle11 = new Puzzle11(true);
    puzzle11.fishPopulation = [0,1,2];
    puzzle11.doBreedCycle();
    expect(puzzle11.totalFish).toBe(3);
    expect(puzzle11.fishPopulation).toStrictEqual([1,2]);
    puzzle11.doBreedCycle();
    expect(puzzle11.fishPopulation).toStrictEqual([2,0,0,0,0,0,1,0,1]);
    expect(puzzle11.totalFish).toBe(4);
    puzzle11.doBreedCycle();
    expect(puzzle11.totalFish).toBe(6);
    expect(puzzle11.fishPopulation).toStrictEqual([0,0,0,0,0,1,2,1,2]);

    puzzle11.fishPopulation = [0,1,2];
    expect(puzzle11.totalFish).toBe(3);
    puzzle11.doBreedCycle(3);
    expect(puzzle11.totalFish).toBe(6);
    expect(puzzle11.fishPopulation).toStrictEqual([0,0,0,0,0,1,2,1,2]);
})
test('test data',()=>{
    let puzzle11 = new Puzzle11(true);
    /**
     * In this example, after 18 days, there are a total of 26 fish. 
     * After 80 days, there would be a total of 5934.
     */
    // timers 3,4,3,1,2
    expect(puzzle11.totalFish).toBe(5);
    expect(puzzle11.fishPopulation).toStrictEqual([0,1,1,2,1]);
    puzzle11.doBreedCycle(1);
    expect(puzzle11.totalFish).toBe(5);
    expect(puzzle11.fishPopulation).toStrictEqual([1,1,2,1]);
    puzzle11.doBreedCycle(1);
    expect(puzzle11.fishPopulation).toStrictEqual([1,2,1,0,0,0,1,0,1]);
    expect(puzzle11.totalFish).toBe(6);
    puzzle11.doBreedCycle(1);
    expect(puzzle11.fishPopulation).toStrictEqual([2,1,0,0,0,1,1,1,1]);
    expect(puzzle11.totalFish).toBe(7);
    puzzle11.doBreedCycle(1);
    expect(puzzle11.fishPopulation).toStrictEqual([1,0,0,0,1,1,3,1,2]);
    expect(puzzle11.totalFish).toBe(9);
    puzzle11.doBreedCycle(1);
    expect(puzzle11.fishPopulation).toStrictEqual([0,0,0,1,1,3,2,2,1]);
    expect(puzzle11.totalFish).toBe(10);

    puzzle11 = new Puzzle11(true);
    puzzle11.doBreedCycle(18);
    expect(puzzle11.totalFish).toBe(26);


    puzzle11 = new Puzzle11(true);
    puzzle11.doBreedCycle(80);
    expect(puzzle11.totalFish).toBe(5934);

});
