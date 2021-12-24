module.exports = (()=>{

    class BinaryDataHelper {
        

        static  bitArrayToDecimal(bitArray) {
            let result = 0;
            let power = 1;
            for (let i=bitArray.length-1;i>=0;i--) {
                result += bitArray[i]*power;
                power = power *2;
            }
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

        static filterArrayByThresholdToBitArray(bitTotals,threshold) {
            let result = [];
            bitTotals.forEach((count)=>{
                result.push((count>threshold)?1:0);
            });
            return result;
        }

        static findMostPopularBitsFromBitArrays(bitArrays,defaultToOne) {
            if (defaultToOne == undefined) {
                defaultToOne = true;
            }
            let bitTotals = BinaryDataHelper.totaliseBitArrays(bitArrays);
            let result = [];
            let threshold = Math.floor(bitArrays.length/2);
            if (defaultToOne && threshold == bitArrays.length/2) {
                threshold = threshold-1;
            }
            return BinaryDataHelper.filterArrayByThresholdToBitArray(bitTotals,threshold);
        }

        static totaliseBitArrays(bitArrays) {
            const initialArray = Array(bitArrays[0].length).fill(0);
           return bitArrays.reduce((previous, current)=>{
                return previous.map(function (num, idx) {
                    return num + current[idx];
                }); 
            },initialArray);
        }

        static findLeastPopularBitsFromBitArrays(bitArrays) {
            
        }


    static findMostPopularBitsFromText(textArrays) {
        const bitArrays = textArrays.map(text=>BinaryDataHelper.createBitArray(text));
        return BinaryDataHelper.findMostPopularBitsFromBitArrays(bitArrays);
    }

    static invertBitArray(bitArray) {
            let result = [];
            bitArray.forEach((bit)=> {
                result.push(bit==1?0:1);
            })
        return result;
    }

    static filterBitArrayByPosition(arrayOfBitArrays, filterValue, indexToFilter) {
        if (!Array.isArray(arrayOfBitArrays)) {
            throw "invalid array";
        }
        if (arrayOfBitArrays.length == 0) {
            throw "invalid array";
        }
        if (!Array.isArray(arrayOfBitArrays[0])) {
            throw "invalid array";
        }
        let bitArrayLength = arrayOfBitArrays[0].length;
        if (indexToFilter<0 || indexToFilter>=bitArrayLength) {
            throw "invalid index";
        }

        if (Number.isNaN(filterValue) || filterValue < 0 || filterValue > 1) {
            throw "value must be one or zero";
        }
        const result =  arrayOfBitArrays.filter((bitArray)=>{
            return bitArray[indexToFilter] == filterValue;
        });
        return result;

    }
}
    return BinaryDataHelper;
})();