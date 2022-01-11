const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (() => {

    class Puzzle11 {
        static doPuzzle() {
            let puzzle11 = new Puzzle11(false);
            puzzle11.doBreedCycle(80);
            return {
                totalFish: puzzle11.totalFish,
                puzzleName: "Puzzle 11",
                day: "Day 6"
            }
        }
        

        constructor(useTestData) {
            this.fishPopulation = Puzzle11.readAndParseData(useTestData);
        }

        get totalFish() {
            return this.fishPopulation.reduce((a,b)=>a+b, 0); 
        }

        doBreedCycle(numCycles) {
            if (numCycles == undefined) {
                numCycles = 1
            }
            for (let i=0;i<numCycles;i++) {
            let readyToBreedFish = this.fishPopulation.shift();
                if(readyToBreedFish>0) {
                    Puzzle11.addFishToPopulation(this.fishPopulation,6,readyToBreedFish);
                    Puzzle11.addFishToPopulation(this.fishPopulation,8,readyToBreedFish);
                }
            }
        }

        static addFishToPopulation(fishPopulation,daysLeftTillBreed,number) {
            if (number == undefined) {
                number = 1;
            }
            while (fishPopulation.length<daysLeftTillBreed+1) {
                fishPopulation.push(0);
            }
            let numberOfFishAtAge = fishPopulation[daysLeftTillBreed]+number;
            fishPopulation[daysLeftTillBreed] = numberOfFishAtAge;
        }

        static readAndParseData(useTestData) {
            let textLine = readPuzzleInputData(6,false,useTestData)[0];
            let ageslist = textLine.split(/,/);
            let fishPopulation = [];
            ageslist.forEach(ageStr=>{
                let daysLeftTillBreed = parseInt(ageStr);
                Puzzle11.addFishToPopulation(fishPopulation,daysLeftTillBreed);
            })
            return fishPopulation;
        }

    }
    return Puzzle11;
})();