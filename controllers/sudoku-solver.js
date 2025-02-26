class SudokuSolver {

  validate(puzzleString) {
    if (!/^[1-9.]+$/.test(puzzleString)) {return {status:false, error: 'Invalid characters in puzzle'}}
    if (puzzleString.length != 81) {return {status:false, error:'Expected puzzle to be 81 characters long'}}
    return {status: true}
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const start = rowArray.indexOf(row.toUpperCase()) * 9 ;
    const puzzleRow = puzzleString.substring(start, start+9)
    return puzzleRow.indexOf(value) > -1 && puzzleRow[column-1] != value ? "row" : null;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const startIndex = column % 9 == 0 ? 8 : (column % 9) - 1;
    let puzzleRow = '';
    for (let i = 0; i < 9; i++) {
      if (i == 0) {
        puzzleRow += puzzleString[startIndex]
      } else {
        puzzleRow += puzzleString[startIndex + (9*i)]
      }
    }
    return puzzleRow.indexOf(value) > -1 && puzzleRow[rowArray.indexOf(row.toUpperCase())] != value ? "column" : null;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const col = column % 9 == 0 ? 8 : (column % 9) - 1;
    // let colGroupArray = [[1,2,3],[4,5,6],[7,8,9]]
    // let colGroup = colGroupArray[Math.floor(col / 3)]
    //console.log(col)

    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const start = rowArray.indexOf(row.toUpperCase());
    let rowGroupArray = [['A','B','C'],['D','E','F'],['G','H','I']]
    let rowGroup = rowGroupArray[Math.floor(start / 3)]
    const colRegion = column%3 == 0 ? 3 : column%3
    const multiplier = start%3
    const inputIndex =  ((multiplier*3) + colRegion) - 1;
    let puzzleRegion = '';
    rowGroup.forEach((rowReg,i) => {
      const startIndex = rowArray.indexOf(rowReg) * 9;
      const colMultiplier = Math.floor(col / 3) * 3
      const puzzleRow = puzzleString.substring(startIndex+ colMultiplier, startIndex+colMultiplier+3)

      //console.log(":",rowReg,startIndex, puzzleRow, Math.floor(col / 3) * 3)
      puzzleRegion += puzzleRow
    })
    //console.log(puzzleRegion)
    //return puzzleRegion.indexOf(value) > -1 ? "region" : null;

    return puzzleRegion.indexOf(value) > -1 && puzzleRegion[inputIndex] != value ? "region" : null;
  }

  solve(puzzleString) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let result = puzzleString;


    for(let i = 0; i < puzzleString.length; i++) {
      if (puzzleString[i] != ".") continue; 

      let row = rowArray[Math.ceil((i + 1) / 9) - 1]
      let column = (i + 1) % 9 == 0 ? 9 : (i + 1) % 9;
      let validNum = null
      let validNumCount = 0;
      for(let x = 1; x < 10; x++) { 
        //console.log(x, row, column)
        const conflict = ['checkRowPlacement', 'checkColPlacement', 'checkRegionPlacement']
          .map(method => this[method](result, row, column, x))
          .filter(Boolean);

        if (conflict.length == 0) {
          //console.log(x, row, column)
          // break;
          //validNum = x;
          //break;
          //result = result.slice(0, i) + x + result.slice(i+1,i+2);

          // result = result.slice(0, i) + x + result.slice(i+1);
          //console.log(result)

          validNum = x
          validNumCount++;

          //break;
        } 
      }

      if (validNumCount == 1) {
        result = result.slice(0, i) + validNum + result.slice(i+1);
      } 

      //console.log(validNum, row, column)

      // if (validNum) {
        // result.slice(0, i) + validNum + result.slice(i+1,i+2);
      // } else {
      //   result = null
      //   return;
      // }
    }



    console.log(result)
    return result.indexOf('.') == -1 ? result : null

  }
}

module.exports = SudokuSolver;

