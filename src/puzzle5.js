
const readPuzzleInputData = require('./lib/read-puzzle-input-data');
const BinaryDataHelper = require('./lib/binary-data-helper');

module.exports = (()=>{
    class Puzzle5 {
        static doPuzzle() {
            let puzzle = new Puzzle5();
            return puzzle.getResult();
        }


        constructor() {
            this.data = readPuzzleInputData(3);
            this.gamma = 0;
            this.epsilon = 0;
        }


        getResult() {
            let linesProcessed = this.data.length;
            let epsilonBitArray = BinaryDataHelper.findMostPopularBitsFromText(this.data);
            let gammaBitArray = BinaryDataHelper.invertBitArray(epsilonBitArray);
            this.epsilon = BinaryDataHelper.bitArrayToDecimal(epsilonBitArray);
            this.gamma = BinaryDataHelper.bitArrayToDecimal(gammaBitArray);
            return {
                result:this.gamma * this.epsilon,
                gamma: this.gamma,
                epsilon: this.epsilon,
                linesProcessed: linesProcessed,
                puzzleName: "Puzzle 5",
                day: "Day 3"
            }
        }

    }
    return Puzzle5;

})();