'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkboxes = checkboxes;
exports.confirm = confirm;
exports.password = password;
exports.select = select;
exports.text = text;

var _processDoubleArgs = require('./processDoubleArgs');

var _processDoubleArgs2 = _interopRequireDefault(_processDoubleArgs);

var _processTripleArgs = require('./processTripleArgs');

var _processTripleArgs2 = _interopRequireDefault(_processTripleArgs);

var _Prompt = require('./Prompt');

var _Prompt2 = _interopRequireDefault(_Prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkboxes() {
  var options = (0, _processTripleArgs2.default)(arguments, 'Choose some options', 'checkbox');
  return new _Prompt2.default(options).execute();
}

function confirm() {
  var options = (0, _processDoubleArgs2.default)(arguments, 'Confirm?', 'confirm');
  return new _Prompt2.default(options).execute();
}

function password() {
  var options = (0, _processDoubleArgs2.default)(arguments, 'Enter password', 'password');
  return new _Prompt2.default(options).execute();
}

function select() {
  var options = (0, _processTripleArgs2.default)(arguments, 'Choose an option', 'list');
  return new _Prompt2.default(options).execute();
}

function text() {
  var options = (0, _processDoubleArgs2.default)(arguments, 'Enter text', 'input');
  return new _Prompt2.default(options).execute();
}

exports.default = { checkboxes: checkboxes, confirm: confirm, password: password, select: select, text: text };
//# sourceMappingURL=index.js.map