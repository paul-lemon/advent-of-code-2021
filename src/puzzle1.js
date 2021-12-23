
const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (()=>{
    class Puzzle1 {
        static doPuzzle() {
            let puzzle1 = new Puzzle1();
            return puzzle1.getResult();
        }

        constructor() {
            this.loadData();
        }

        loadData() {
            this.data = readPuzzleInputData(1,true);
        }

        getResult() {
            let previous = this.data[0];
            let result = 0;
            let linesCompared = 0;
            for (let i=1;i<this.data.length;i++) {
                const current = this.data[i];
                if (current>previous) {
                    result++;
                }
                previous = current;
                linesCompared++;
            }
            return {
                result:result,
                linesCompared: linesCompared,
                puzzleName: "Puzzle 1",
                day: "Day 1"
            }
        }

    }
    return Puzzle1;

})();