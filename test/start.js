const {
  existsSync,
  readdirSync,
} = require('fs');

const {
  join,
  extname,
} = require('path');

/**
 * Import specs
 */

const dirs = ['', 'Paypal', 'utils'];
dirs.forEach((dir) => {
  let where = './test/specs/' + dir;
  if (existsSync(where)) {
    readdirSync(where).forEach((file) => {
      if (extname(file) === '.js') {
        require(join('.' + where, file));
      }
    });
  }
});
