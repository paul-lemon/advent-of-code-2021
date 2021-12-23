
module.exports = (()=>{

    const readPuzzleInputData = (dayNumber, isInteger, isTestData) => {
        if (isTestData == null) {
            isTestData = false;
        }
        let data = [];
        var fs = require('fs');
        let textLineArray = fs.readFileSync(`puzzle-input-data/day-${dayNumber}${isTestData?"-test":""}.txt`).toString().split("\n");
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