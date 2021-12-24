const Puzzle9 = require('./puzzle9');
module.exports = (() => {

    class Puzzle10 {
        static doPuzzle() {
            let puzzle9 = new Puzzle9(false);
            puzzle9.drawAllVectors(true);
            return {
                totalOverlappintPoints: puzzle9.totalOverlappintPoints,
                puzzleName: "Puzzle 10",
                day: "Day 5"
            }
        }
    }
    return Puzzle10;
})();