'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = finaliseOptions;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Performs final validation for prompt options, after they've been assembled by
 * either processDoubleArgs() or processTripleArgs().
 */

function finaliseOptions(options) {
  if (!(0, _lodash.isString)(options.label)) {
    throw new TypeError('input: Expected label to be a string, but got: ' + (typeof label === 'undefined' ? 'undefined' : (0, _typeof3.default)(label)));
  }

  if (options.validate !== undefined && !(0, _lodash.isFunction)(options.validate)) {
    throw new TypeError('input: Expected \'validate\' option to be a function or undefined, got: ' + (typeof validate === 'undefined' ? 'undefined' : (0, _typeof3.default)(validate)));
  }

  return options;
}
//# sourceMappingURL=finaliseOptions.js.map