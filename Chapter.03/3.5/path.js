const path = require('Chapter.03/3.5/path');
const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter', path.delimiter);
console.log('----------------------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname(): %o', path.extname(string));
console.log('path.basename(): %o', path.basename(string));
console.log('path.basename - extname: %o', path.basename(string, path.extname(string)));
console.log('----------------------------------------------');
console.log('path.parse(): %o', path.parse(string));
console.log('path.format(): %o', path.format({
  dir: 'C:\\users\\zerocho',
  name: 'path',
  ext: '.js',
}));
console.log('path.normalize(): %o', path.normalize('//Users\\\\ksh\\\\git\\\Node.js-textbook\\Chapter.03\\path.js'));
console.log('----------------------------------------------');
console.log('path.isAbsolute(): %o', path.isAbsolute('\\'));
console.log('path.isAbsolute(./home): %o', path.isAbsolute('./home'));
console.log('----------------------------------------------');

console.log('path.relative(): %o', path.relative('//Users//ksh//git//Node.js-textbook//Chapter.03//path.js', '//'));
console.log('path.join(): %o', path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));
console.log('path.resolve(): %o', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));
