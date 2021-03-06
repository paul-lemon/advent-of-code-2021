const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (() => {

    class Puzzle9 {
        static doPuzzle() {
            let puzzle9 = new Puzzle9(false);
            puzzle9.drawAllVectors();
            return {
                totalOverlappintPoints: puzzle9.totalOverlappintPoints,
                puzzleName: "Puzzle 9",
                day: "Day 5"
            }
        }

        static parseVectorFromTextFile(textline) {
            //5,5 -> 8,2
            let regex = /^(\d+),(\d+)\s+->\s+(\d+),(\d+)$/;
            let regExResult = regex.exec(textline);
            return {
                x1: parseInt(regExResult[1]),
                y1: parseInt(regExResult[2]),
                x2: parseInt(regExResult[3]),
                y2: parseInt(regExResult[4])
            }
        }

        static readAndParseData(useTestData) {
            let textLines = readPuzzleInputData(5,false,useTestData);
            let vectors = [];
            textLines.forEach((textline)=>{
                let vector = Puzzle9.parseVectorFromTextFile(textline);
                vectors.push(vector);
            })
            return vectors;
        }

        static buildEmptyGrid(vectors) {
            // find maxium and minimum values for each vector
            let maxX = 0;
            let maxY = 0;
            vectors.forEach(
                (vector)=>{
                    maxX = Math.max(maxX,vector.x1,vector.x2);
                    maxY = Math.max(maxY,vector.y1,vector.y2);
                }
            )
            let grid = [];
            for (let i=0;i<=maxY;i++) {
                grid.push(Array(maxX+1).fill(0));
            }
            return grid;
        }

        constructor(useTestData) {
            this.totalOverlappintPoints =0;
            this.vectors = Puzzle9.readAndParseData(useTestData);
            this.grid = Puzzle9.buildEmptyGrid(this.vectors);
        }

        drawAllVectors(drawDiagonals) {
            if (drawDiagonals == null) {
                drawDiagonals = false;
            }
            this.vectors.forEach((vector)=>{this.drawVector(vector,drawDiagonals)});
        }

        drawVector(vector,drawDiagonals) {
            if (drawDiagonals == null) {
                drawDiagonals = false;
            }
            let startY = Math.min(vector.y1,vector.y2);
            let endY = Math.max(vector.y1,vector.y2);
            let startX = Math.min(vector.x1,vector.x2);
            let endX = Math.max(vector.x1,vector.x2);
            let xDiff = vector.x2 - vector.x1;
            let yDiff = vector.y2 - vector.y1;
            
            const setGridPoint = (x,y) =>{
                this.grid[y][x]++;
                if (this.grid[y][x]==2) {
                    this.totalOverlappintPoints++;
                }
            }
            if (xDiff==0) {
                for (let y=startY;y<=endY;y++) {
                    setGridPoint(startX,y);
                }
            } else  if (yDiff==0) {
                for (let x=startX;x<=endX;x++) {
                    setGridPoint(x,startY);
                }

            } else if (drawDiagonals) {
                let y = vector.y1;
                let x = vector.x1;
                let length = Math.abs(xDiff);
                for (let i=0;i<=length;i++) {
                    setGridPoint(x,y);
                    x += (xDiff>0)?1:-1;
                    y += (yDiff>0)?1:-1;
                }
            }
        }


    }
    return Puzzle9;
})();