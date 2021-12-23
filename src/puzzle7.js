
const readPuzzleInputData = require('./lib/read-puzzle-input-data');

module.exports = (()=>{
    class Puzzle7 {

        static readAndParseData(useTestData) {
            let textLines = readPuzzleInputData(4,false,useTestData);
            return Puzzle7.parseData(textLines);
        }
        static parseData(textLines) {
            let sequence = textLines[0].split(/,/).map((text)=>parseInt(text));
            let boards = [];
            let boardcount = (textLines.length -1)/6;
            for (let i=0;i<boardcount;i++) {
                let startline = 1+(i*6)+1;
                let board =[];
                for (let j=0;j<5;j++) {
                    let boardNumbersText = textLines[startline+j].trim().split(/\s+/);
                    board.push(boardNumbersText.map((numberText)=>parseInt(numberText)));
                }
                boards.push(board);
            }
            return {
                sequence: sequence,
                boards: boards
            };
        }

        static doPuzzle() {
            const puzzle = new Puzzle7(false);
            let gameResult = puzzle.playGame();

            return {
                result:gameResult.winningBoardSum*gameResult.lastNumber,
                winningBoardSum: gameResult.winningBoardSum,
                lastNumber: gameResult.lastNumber,
                winningBoard: gameResult.winningBoard,
                puzzleName: "Puzzle 7",
                day: "Day 4"
            }
        }

        constructor(useTestData) {
            const parsedData = Puzzle7.readAndParseData(useTestData);
            this.sequence = parsedData.sequence;
            this.initiateState(parsedData.boards);
        }

        initiateState(boardsData) {
            this.boardsState = [];
            boardsData.forEach(boardData => {
                let boardState = [];
                boardData.forEach((horizontalLine)=>{
                    boardState.push([...horizontalLine]);
                })
                // vertical lines
                for (let i=0;i<5;i++) {
                    let line = [];
                    for (let j=0;j<5;j++) {
                        line.push(boardData[j][i]);
                    }
                    boardState.push(line)
                }
                this.boardsState.push(boardState);
            });
        }
        
        hasLineFilled() {
            let hasLine = false;
            this.boardsState.forEach((boardState)=>{
                boardState.forEach((line)=>{
                    if (line.length==0) {
                        hasLine = true;
                    }
                })
            });
            return hasLine;
        }

        whichBoardHasLineFilled() {
            let hasLine = false;
            let winningBoard = null;
            let boardNumber = 0;
            this.boardsState.forEach((boardState)=>{
                boardState.forEach((line)=>{
                    if (!hasLine && line.length==0) {
                        hasLine = true;
                        winningBoard = boardNumber;
                    }
                });
                boardNumber++;
            });
            return winningBoard;
        }

        getBoardRemainingTotal(boardNumber) {
            let board = this.boardsState[boardNumber];
            let sum = 0;
            for(let i=0;i<5;i++) {
                sum += board[i].reduce((previous,current)=> {return previous+current},0);
            }
            return sum;
        }

        playNumber(number) {
            this.boardsState.forEach((boardState)=>{
                boardState.forEach((line)=>{
                    let positionOfNumber = line.indexOf(number);
                    if (positionOfNumber>=0) {
                        line.splice(positionOfNumber,1);
                    }
                })
            });

        }

        playGame() {
            let result = {
                winningBoard:0,
                lastNumber:0,
                winningBoardSum:0
            }
            let gameFinished = false;
            while(!gameFinished) {
                let nextNumber = this.sequence.shift();
                this.playNumber(nextNumber);
                if (this.hasLineFilled()) {
                    gameFinished = true;
                    result.lastNumber = nextNumber;
                    result.winningBoard = this.whichBoardHasLineFilled();
                    result.winningBoardSum = this.getBoardRemainingTotal(result.winningBoard);
                }
            }
            return result;
        }

        playGameToLastBoard() {
            while(this.boardsState.length>1) {
                this.playGame();
                while(this.hasLineFilled()) {
                    this.deleteBoard(this.whichBoardHasLineFilled());
                }
            }
            let result = this.playGame();
            return result;
        }

        deleteBoard(boardNumber) {
            this.boardsState.splice(boardNumber,1);
        }

    }
    return Puzzle7;
})();