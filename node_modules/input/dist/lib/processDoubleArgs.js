'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = processDoubleArgs;

var _lodash = require('lodash');

var _finaliseOptions = require('./finaliseOptions');

var _finaliseOptions2 = _interopRequireDefault(_finaliseOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Processes any arguments object that fulfills the double-argument signature
 * used by `text()`, `password()`, `confirm()`, etc:
 *
 * `([String: label], [PlainObject: options])`
 *
 * (NB. that is the expected signature of the passed-in `args` object,
 * not of this function itself.)
 */

function processDoubleArgs(args, defaultLabel, type) {
  var options = void 0;
  var label = defaultLabel;

  // extract and validate args
  switch (args.length) {
    case 0:
      break;

    case 1:
      {
        var arg = args[0];

        if ((0, _lodash.isString)(arg)) {
          label = arg;
          options = {};
        } else if ((0, _lodash.isPlainObject)(arg)) options = arg;else {
          throw new TypeError('input: Expected single argument to be a label or options object, but got: ' + (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) + '\n        ');
        }

        break;
      }

    case 2:
      {
        label = args[0];
        options = args[1];

        if (!(0, _lodash.isPlainObject)(options)) {
          throw new TypeError('input: Expected second argument to be an options object, but got: ' + (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)));
        }

        break;
      }

    default:
      throw new TypeError('input: Expected 0-2 arguments, but got ' + args.length);
  }

  // ensure options.default is valid if set
  if (options.default !== undefined) {
    if ((0, _lodash.isNumber)(options.default)) options.default = String(options.default);else if ((0, _lodash.isString)(options.default && !/[^\n\r]*/.test(options.default))) {
      throw new Error('input: options.default contained invalid characters');
    }
  }

  return (0, _finaliseOptions2.default)({
    label: label, type: type,
    validate: options.validate,
    inquirerDefault: options.default
  });
}
//# sourceMappingURL=processDoubleArgs.js.map