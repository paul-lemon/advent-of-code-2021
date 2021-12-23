
module.exports = (()=>{

    const readPuzzleInputData = (dayNumber, isInteger) => {
        let data = [];
        var fs = require('fs');
        let textLineArray = fs.readFileSync(`puzzle-input-data/day-${dayNumber}.txt`).toString().split("\n");
        if (isInteger) {
            textLineArray.forEach((textLine)=>{
                data.push(parseInt(textLine));
            }
            );
        } else {
            data = textLineArray;
        }
        return data;
    }
    return readPuzzleInputData;
})();