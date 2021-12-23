
const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (()=>{
    class Puzzle4 {
        static doPuzzle() {
            let puzzle = new Puzzle4();
            return puzzle.getResult();
        }

        constructor() {
            this.data = readPuzzleInputData(2,false);
            this.x = 0;
            this.z = 0;
            this.aim = 0;
        }

        processCommand(command) {
            let valueStr = command.substring(command.length-1,command.length);
            let value = parseInt(valueStr);
            if (isNaN(value)) {
                throw `non integer value ${valueStr}`;
            }
            let commandPart = command.substring(0,command.length-2);
            if (commandPart == 'forward') {
                this.x+=value;
                this.z+=this.aim * value;
            } else if (commandPart == 'down') {
                this.aim+=value;
            } else  if (commandPart == 'up'){
                this.aim-=value;
            } else {
                throw `invalid command found ${commandPart}`
            }
        }

        getResult() {
            let commandsProcessed = 0;
            this.data.forEach((command)=>{
                commandsProcessed++;
                this.processCommand(command);
            })
            return {
                result:this.x * this.z,
                x: this.x,
                z: this.z,
                aim: this.aim,
                commandsProcessed: commandsProcessed,
                puzzleName: "Puzzle 4",
                day: "Day 2"
            }
        }

    }
    return Puzzle4;

})();