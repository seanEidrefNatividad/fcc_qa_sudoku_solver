'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      // const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I'];
      // const column = ['1', '2', '3', '4', '5', '6', '7','8', '9'];
      const {puzzle, coordinate, value} = req.body

      if (!puzzle || !coordinate || !value) {
        res.send({error: 'Required field(s) missing' })
        return
      }

      if (!/^[1-9]$/.test(value)) {
        res.send({error: 'Invalid value' })
        return
      }

      if (!/^[a-iA-I][1-9]$/.test(coordinate)) {
        res.send({error: 'Invalid coordinate' })
        return
      }

      const {status, error} = solver.validate(puzzle)

      if(status) {
        const conflict = ['checkRowPlacement', 'checkColPlacement', 'checkRegionPlacement']
        .map(method => solver[method](puzzle, coordinate[0], coordinate[1], value))
        .filter(Boolean);

        if (conflict.length == 0) {
          res.send({valid: true})
        } else {
          res.send({valid: false, conflict})
        }
      } else {
        res.send({error})
        return;
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const {puzzle} = req.body

      if (!puzzle) {
        res.send({error: 'Required field missing' })
        return
      }

      const {status, error} = solver.validate(puzzle)

      if(status) {
        res.send({solution:""})
        return
      } else {
        res.send({error})
        return;
      }
    });
};
