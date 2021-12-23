const BinaryDataHelper = require('lib/binary-data-helper');


test('bitArrayToDecimal',()=>{
    expect(BinaryDataHelper.bitArrayToDecimal([0])).toBe(0);
    expect(BinaryDataHelper.bitArrayToDecimal([1])).toBe(1);
    expect(BinaryDataHelper.bitArrayToDecimal([1,0])).toBe(2);
    expect(BinaryDataHelper.bitArrayToDecimal([1,1])).toBe(3);
    expect(BinaryDataHelper.bitArrayToDecimal([1,0,0])).toBe(4);
    expect(BinaryDataHelper.bitArrayToDecimal([1,0,0,1,1])).toBe(19);
    expect(BinaryDataHelper.bitArrayToDecimal([1,1,1,1,1,1,1,1,1,1,1,1])).toBe(4095);
});

test("find most popular bits from an array",()=>{
    expect(
        BinaryDataHelper.findMostPopularBitsFromBitArrays([
            [0,0,0,0,0],
            [1,1,1,1,1],
            [0,0,0,0,0]
        ])
    ).toEqual([0,0,0,0,0]); 

    // by default if the number of 1s and 0s are equal favour the 1s
    expect(
        BinaryDataHelper.findMostPopularBitsFromBitArrays([
            [0,0,0,0,0],
            [1,1,1,1,1],
            [0,0,0,0,0],
            [1,1,1,1,1]
        ])
    ).toEqual([1,1,1,1,1]); 
    // if the number of 1s and 0s are equal favour the 1s by setting the flag
    expect(
        BinaryDataHelper.findMostPopularBitsFromBitArrays([
            [0,0,0,0,0],
            [1,1,1,1,1],
            [0,0,0,0,0],
            [1,1,1,1,1]
        ], true)
    ).toEqual([1,1,1,1,1]); 

    // if the number of 1s and 0s are equal favour the 0s by setting the flag
    expect(
        BinaryDataHelper.findMostPopularBitsFromBitArrays([
            [0,0,0,0,0],
            [1,1,1,1,1],
            [0,0,0,0,0],
            [1,1,1,1,1]
        ], false)
    ).toEqual([0,0,0,0,0]); 
    expect(
        BinaryDataHelper.findMostPopularBitsFromBitArrays([
            [0,1,0,1,0],
            [1,1,0,1,1],
            [0,0,0,0,1],
            [1,1,1,1,1]
        ], false)
    ).toEqual([0,1,0,1,1]); 
})

test("find most popular bits",()=>{

    expect(
        BinaryDataHelper.findMostPopularBitsFromText([
            "00000",
            "11111",
            "00000"
        ])
    ).toEqual([0,0,0,0,0]); 

    expect(
        BinaryDataHelper.findMostPopularBitsFromText([
            "000000",
            "111110",
            "000000"
        ])
    ).toEqual([0,0,0,0,0,0]); 


    expect(
        BinaryDataHelper.findMostPopularBitsFromText([
            "000000111111",
            "111110000000",
            "000000111111"
        ])
    ).toEqual([0,0,0,0,0,0,1,1,1,1,1,1]); 
    expect(
        BinaryDataHelper.findMostPopularBitsFromText([
            "11111010101",
            "11111000000",
            "00000101111"
        ])
    ).toEqual([1,1,1,1,1,0,0,0,1,0,1]); 
    expect(
        BinaryDataHelper.findMostPopularBitsFromText([
            "10101",
            "01010",
            "10001"
        ])
    ).toEqual([1,0,0,0,1]); 
    let lines = [
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
    ]
    expect(BinaryDataHelper.findMostPopularBitsFromText(lines)).toEqual([1,0,1,1,0]); 
     
});

test("convert string to binary bit array",()=>{
    expect(()=>{
        BinaryDataHelper.createBitArray("501001")
    }).toThrow();
    expect(()=>{
        BinaryDataHelper.createBitArray("")
    }).toThrow();
    expect(()=>{
        BinaryDataHelper.createBitArray("a1111")
    }).toThrow();
    expect(BinaryDataHelper.createBitArray("11001")).toEqual([1,1,0,0,1]); 
    expect(BinaryDataHelper.createBitArray("001001")).toEqual([0,0,1,0,0,1]);
    expect(BinaryDataHelper.createBitArray("011001")).toEqual([0,1,1,0,0,1]); 
    expect(BinaryDataHelper.createBitArray("011001010110")).toEqual([0,1,1,0,0,1,0,1,0,1,1,0]); 

});

test("Invert BitArray",()=>{
    expect(BinaryDataHelper.invertBitArray([0,0,1,1,0])).toEqual([1,1,0,0,1]); 
    expect(
        BinaryDataHelper.invertBitArray(
            [0,0,1,1,0,1,1,1,1,1,0,0])
        ).toEqual(
            [1,1,0,0,1,0,0,0,0,0,1,1]
        ); 
});

test("Filter bit array by value of bit at in the specified point in the array exceptions",()=>{
    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            "a1111", // this is not an array of bitArrays
            1,
            1
        )
    }).toThrow('invalid array');
    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            [], // this is not an array of bitArrays
            1,
            1
        )
    }).toThrow('invalid array');
    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            [0,1,0], // this is not an array of bitArrays
            1,
            1
        )
    }).toThrow('invalid array');
    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            [
                [0,1,0],
                [0,1,0]
            ],
            1,
            3 // index of 3 is not valid in the supplied arrays
        )
    }).toThrow('invalid index');

    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            [
                [0,1,0],
                [0,1,0]
            ],
            2, // this value should be one or zero
            1
        )
    }).toThrow('value must be one or zero');

    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            [
                [0,1,0],
                [0,1,0]
            ],
            0, // this value should be one or zero
            1
        )
    }).not.toThrow('value must be one or zero');

    expect(()=>{
        BinaryDataHelper.filterBitArrayByPosition(
            [
                [0,1,0],
                [0,1,0]
            ],
            1, // this value should be one or zero
            1
        )
    }).not.toThrow('value must be one or zero');

});

test("Filter bit array by value of bit at in the specified point in the array exceptions",()=>{
    const simpleTestArray =  [[0,0], [1,0], [0,1],[1,1]];

    let result = BinaryDataHelper.filterBitArrayByPosition(simpleTestArray,1,0);
    expect(result).toEqual([[1,0],[1,1]]);
    
    result = BinaryDataHelper.filterBitArrayByPosition(simpleTestArray,0,0);
    expect(result).toEqual([[0,0],[0,1]]);
    result = BinaryDataHelper.filterBitArrayByPosition(simpleTestArray,1,1);
    expect(result).toEqual([[0,1],[1,1]])
    result = BinaryDataHelper.filterBitArrayByPosition(simpleTestArray,0,1);
    expect(result).toEqual([[0,0], [1,0]]);


    //[[0,0], [1,0], [0,1],[1,1]]
});
