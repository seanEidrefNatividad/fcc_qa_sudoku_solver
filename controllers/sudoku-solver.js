class SudokuSolver {

  hasDuplicateNum(str) {
    const seen = new Set();
    for (const char of str) {
      if (/\d/.test(char)) { // Only check number characters
        if (seen.has(char)) {
          return true; // Duplicate number found
        }
        seen.add(char);
      }
    }
    return false; // No duplicate numbers
  }

  validate(puzzleString) {
    if (!/^[1-9.]+$/.test(puzzleString)) {return {status:false, error: 'Invalid characters in puzzle'}}
    if (puzzleString.length != 81) {return {status:false, error:'Expected puzzle to be 81 characters long'}}
    return {status: true}
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const start = rowArray.indexOf(row.toUpperCase()) * 9 ;
    const puzzleRow = puzzleString.substring(start, start+9)
    if (this.hasDuplicateNum(puzzleRow)) return "duplicate"
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
    if (this.hasDuplicateNum(puzzleRow)) return "duplicate"
    return puzzleRow.indexOf(value) > -1 && puzzleRow[rowArray.indexOf(row.toUpperCase())] != value ? "column" : null;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const col = column % 9 == 0 ? 8 : (column % 9) - 1;
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
      puzzleRegion += puzzleRow
    })
    if (this.hasDuplicateNum(puzzleRegion)) return "duplicate"

    return puzzleRegion.indexOf(value) > -1 && puzzleRegion[inputIndex] != value ? "region" : null;
  }

  solve(puzzleString) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let result = puzzleString;

    do {
      for(let i = 0; i < puzzleString.length; i++) {
        if (puzzleString[i] != ".") continue; 
  
        let row = rowArray[Math.ceil((i + 1) / 9) - 1]
        let column = (i + 1) % 9 == 0 ? 9 : (i + 1) % 9;
        let validNum = null
        let validNumCount = 0;
        for(let x = 1; x < 10; x++) { 
          const conflict = ['checkRowPlacement', 'checkColPlacement', 'checkRegionPlacement']
            .map(method => this[method](result, row, column, x))
            .filter(Boolean);
  
          if (conflict.indexOf('duplicate') != -1) {
            return false
          }
          if (conflict.length == 0) {
            validNum = x
            validNumCount++;
          }
        }

        if (validNumCount == 1) {
          result = result.slice(0, i) + validNum + result.slice(i+1);
        } 

      }
    } while ( /[.]/.test(result));

    return result.indexOf('.') == -1 ? result : null

  }
}

module.exports = SudokuSolver;

