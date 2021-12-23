
const BinaryDataHelper = require('./lib/binary-data-helper');
const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (()=>{
    class Puzzle6 {
        static doOxygenCalculationStep(dataSet,index) {
            const mostPopularBits = BinaryDataHelper.findMostPopularBitsFromBitArrays(dataSet,true);
            const bitToFilterOn = mostPopularBits[index];
            const result =  BinaryDataHelper.filterBitArrayByPosition(dataSet,bitToFilterOn,index);
            return result;
        }
        static doOxygenCalculation(dataSet) {
            let results = dataSet;
            let index = 0;
            while (results.length>1) {
                results =  Puzzle6.doOxygenCalculationStep(results,index);
                index++;
            }
            return BinaryDataHelper.bitArrayToDecimal(results[0]);
        }
        static doCo2CalculationStep(dataSet,index) {
            const mostPopularBits = BinaryDataHelper.findMostPopularBitsFromBitArrays(dataSet,true);
            const bitToFilterOn = mostPopularBits[index]==1?0:1;
            const result =  BinaryDataHelper.filterBitArrayByPosition(dataSet,bitToFilterOn,index);
            return result;
        }

        static doCo2Calculation(dataSet)  {
            let results = dataSet;
            let index = 0;
            while (results.length>1) {
                results =  Puzzle6.doCo2CalculationStep(results,index);
                index++;
            }
            return BinaryDataHelper.bitArrayToDecimal(results[0]);

        }

        static doPuzzle() {
            let dataText = readPuzzleInputData(3);
            let data = dataText.map(text=>BinaryDataHelper.createBitArray(text));
            let co2rating = Puzzle6.doCo2Calculation(data);
            let oxygenRating = Puzzle6.doOxygenCalculation(data);
            return {
                result:co2rating * oxygenRating,
                co2rating: co2rating,
                oxygenrating: oxygenRating,
                puzzleName: "Puzzle 6",
                day: "Day 3"
            }
        }
    }

    return Puzzle6;

})();