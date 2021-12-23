
const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (()=>{
    class Puzzle2 {
        static doPuzzle() {
            let puzzle2 = new Puzzle2();
            return puzzle2.getResult();
        }

        constructor() {
            this.data = readPuzzleInputData(1,true);
            this.buildWindows();
        }

        buildWindows() {
            this.windows = [];
            for (let i=2;i<this.data.length;i++) {
                let windowValue = this.data[i-2]+this.data[i-1]+this.data[i];
                this.windows.push(windowValue);
            }
        }

        getResult() {
            let previous = this.windows[0];
            let result = 0;
            let linesCompared = 0;
            for (let i=0;i<this.windows.length;i++) {
                const current = this.windows[i];
                if (current>previous) {
                    result++;
                }
                previous = current;
                linesCompared++;
            }
            return {
                result:result,
                windowsCompared: linesCompared,
                puzzleName: "Puzzle 2",
                day: "Day 1"
            }
        }

    }
    return Puzzle2;

})();