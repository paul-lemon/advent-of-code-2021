
const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (()=>{
    class Puzzle5 {
        static doPuzzle() {
            let puzzle = new Puzzle5();
            return puzzle.getResult();
        }

        static calculateGamma(epsilon) {
            let result = [];
            epsilon.forEach((bit)=> {
                result.push(bit==1?0:1);
            })
            // since the epsilon is the least popular bit value it is a NOT of the gamme
            return result;
        }

        static findMostPopularBits(textArray) {
            const bitArrays = textArray.map(text=>Puzzle5.createBitArray(text));
            const initialArray = Array(bitArrays[0].length).fill(0);
            const bitTotals = bitArrays.reduce((previous, current)=>{
                return previous.map(function (num, idx) {
                    return num + current[idx];
                }); 
            },initialArray);
            const arraylength = textArray.length;
            const threshold = Math.floor(arraylength/2);
            let result = [];
            bitTotals.forEach((count)=>{
                result.push((count>threshold)?1:0);
            });
            return result;
        }

        static createBitArray(bitString) {
            if (bitString == "" || bitString == null) {
                throw "invalid bitstring - empty or null"
            }
            if (!bitString.match(/^[01]+$/)) {
                throw "invalid bitstring - 1 and 0 characters only";
            }
            let result = [];
            for (let i=0;i<bitString.length;i++) {
                if (bitString.substring(i,i+1)=="0") {
                    result.push(0);
                } else {
                    result.push(1);
                }
            }
            return result;
        }

        static  bitArrayToDecimal(bitArray) {
            let result = 0;
            let power = 1;
            for (let i=bitArray.length-1;i>=0;i--) {
                result += bitArray[i]*power;
                power = power *2;
            }
            return result;
        }

        constructor() {
            this.data = readPuzzleInputData(3);
            this.gamma = 0;
            this.epsilon = 0;
        }


        getResult() {
            let linesProcessed = this.data.length;
            let epsilonBitArray = Puzzle5.findMostPopularBits(this.data);
            let gammaBitArray = Puzzle5.calculateGamma(epsilonBitArray);
            this.epsilon = Puzzle5.bitArrayToDecimal(epsilonBitArray);
            this.gamma = Puzzle5.bitArrayToDecimal(gammaBitArray);
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