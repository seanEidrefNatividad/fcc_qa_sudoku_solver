const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const result = solver.validate(puzzleString)
    assert.propertyVal(result, 'status', true)
  })
  test('Logic handles a puzzle string with invalid characters', () => {
    const puzzleString ='@.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const result = solver.validate(puzzleString)
    assert.propertyVal(result, 'status', false)
    assert.propertyVal(result, 'error', 'Invalid characters in puzzle')
  })
  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const puzzleString ='.16....926914.37.'
    const result = solver.validate(puzzleString)
    assert.propertyVal(result, 'status', false)
    assert.propertyVal(result, 'error', 'Expected puzzle to be 81 characters long')
  })
  test('Logic handles a valid row placement', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const row = "A"
    const column = "2"
    const value = "3"
    const result = solver.checkRowPlacement(puzzleString, row, column, value)
    assert.isNull(result, 'there was no error');
  })
  test('Logic handles an invalid row placement', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const row = "A"
    const column = "2"
    const value = "5"
    const result = solver.checkRowPlacement(puzzleString, row, column, value)
    assert.equal(result, 'row');
  })
  test('Logic handles a valid column placement', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const row = "A"
    const column = "2"
    const value = "3"
    const result = solver.checkColPlacement(puzzleString, row, column, value)
    assert.isNull(result, 'there was no error');
  })
  test('Logic handles an invalid column placement', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const row = "A"
    const column = "2"
    const value = "2"
    const result = solver.checkColPlacement(puzzleString, row, column, value)
    assert.equal(result, 'column');
  })
  test('Logic handles a valid region (3x3 grid) placement', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const row = "A"
    const column = "2"
    const value = "3"
    const result = solver.checkRegionPlacement(puzzleString, row, column, value)
    assert.isNull(result, 'there was no error');
  })
  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const row = "A"
    const column = "2"
    const value = "1"
    const result = solver.checkRegionPlacement(puzzleString, row, column, value)
    assert.equal(result, 'region');
  })
  test('Valid puzzle strings pass the solver', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const result = solver.solve(puzzleString)
    assert.equal(result, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  })
  test('Invalid puzzle strings fail the solver', () => {
    const puzzleString ='115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const result = solver.solve(puzzleString)
    assert.isFalse(result);
  })
  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const puzzleString ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    const result = solver.solve(puzzleString)
    assert.equal(result, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  })
});
