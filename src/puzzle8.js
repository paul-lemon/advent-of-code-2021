const Puzzle7 = require('./puzzle7');

module.exports = (()=>{
    class Puzzle8 {
        static doPuzzle() {
            const puzzle = new Puzzle7();
            let gameResult = puzzle.playGameToLastBoard();
            return {
                result:gameResult.winningBoardSum*gameResult.lastNumber,
                winningBoardSum: gameResult.winningBoardSum,
                lastNumber: gameResult.lastNumber,
                winningBoard: gameResult.winningBoard,
                puzzleName: "Puzzle 8",
                day: "Day 4"
            }
        }
    }
    return Puzzle8;
})();