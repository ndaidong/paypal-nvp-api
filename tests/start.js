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
  const where = './tests/specs/' + dir;
  if (existsSync(where)) {
    readdirSync(where).forEach((file) => {
      if (extname(file) === '.js') {
        require(join('.' + where, file));
      }
    });
  }
});
