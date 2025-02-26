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
    // const col = column % 9 == 0 ? 8 : (column % 9) - 1;
    // let colGroupArray = [[1,2,3],[4,5,6],[7,8,9]]
    // let colGroup = colGroupArray[Math.floor(col / 3)]
    // console.log(col)

    const rowArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const start = rowArray.indexOf(row.toUpperCase());
    let rowGroupArray = [['A','B','C'],['D','E','F'],['G','H','I']]
    let rowGroup = rowGroupArray[Math.floor(start / 3)]
    const colRegion = column%3 == 0 ? 3 : column%3
    const multiplier = start%3
    const inputIndex =  ((multiplier*3) + colRegion) - 1;
    //console.log("("+multiplier + " * " + 3+") + "+ colRegion+" = "+inputIndex)

    let puzzleRegion = '';
    rowGroup.forEach(rowReg => {
      const startIndex = rowArray.indexOf(rowReg) * 9;
      const puzzleRow = puzzleString.substring(startIndex, startIndex+3)
      puzzleRegion += puzzleRow
    })

    return puzzleRegion.indexOf(value) > -1 && puzzleRegion[inputIndex] != value ? "region" : null;
  }
}

module.exports = SudokuSolver;

