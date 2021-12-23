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

        static findMostPopularBitsFromBitArrays(bitArrays) {
            const initialArray = Array(bitArrays[0].length).fill(0);
            const bitTotals = bitArrays.reduce((previous, current)=>{
                return previous.map(function (num, idx) {
                    return num + current[idx];
                }); 
            },initialArray);
            const arraylength = bitArrays.length;
            const threshold = Math.floor(arraylength/2);
            let result = [];
            bitTotals.forEach((count)=>{
                result.push((count>threshold)?1:0);
            });
            return result;
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
}
    return BinaryDataHelper;
})();