class SudokuSolver {

  validate(puzzleString) {
    if (!/^[1-9.]+$/.test(puzzleString)) {return {status:false, error: 'Invalid characters in puzzle'}}
    if (puzzleString.length != 81) {return {status:false, error:'Expected puzzle to be 81 characters long'}}
    return {status: true}
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    //const column = ['1', '2', '3', '4', '5', '6', '7','8', '9'];

    // let grid = {}
    // let currPuzzle = 0
    // row.forEach(letter => {
    //   column.forEach(num => {
    //     grid[letter][num] = puzzleString[currPuzzle]
    //     currPuzzle++;
    //   })
    // })

    const start = rowArray.indexOf(row.toUpperCase()) * 9 ;
    const puzzleRow = puzzleString.substring(start, start+9)
    return puzzleRow.indexOf(value) > -1 && puzzleRow[column-1] != value ? "row" : null;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    const startIndex = column % 9 == 0 ? 8 : (column % 9) - 1;

    let puzzleRow = '';

    for (let i = 0; i < 8; i++) {
      if (i == 0) {
        puzzleRow += puzzleString[startIndex]
      } else {
        puzzleRow += puzzleString[startIndex + (9*i)]
      }
    }
    //console.log(puzzleRow)
    //console.log(puzzleRow[rowArray.indexOf(row.toUpperCase())])

    return puzzleRow.indexOf(value) > -1 && puzzleRow[rowArray.indexOf(row.toUpperCase())] != value ? "column" : null;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

