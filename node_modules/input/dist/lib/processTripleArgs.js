'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = argsTriple;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _finaliseOptions = require('./finaliseOptions');

var _finaliseOptions2 = _interopRequireDefault(_finaliseOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Processes any arguments object that fulfills the triple-argument signature
 * used by `select()` and `checkboxes()`:
 *
 * `([String: label], Array: choices, [PlainObject: options])`
 *
 * (NB. that is the expected signature of the passed-in `args` object,
 * not of this function itself.)
 */

function argsTriple(args, defaultLabel, type) {
  var label = defaultLabel;
  var choices = void 0;
  var options = void 0;

  // extract args
  switch (args.length) {
    case 0:
      throw new TypeError('input: Expected at least one argument (an array of choices)');

    case 1:
      {
        choices = args[0];
        options = {};
        break;
      }

    case 2:
      {
        var first = args[0];
        var second = args[1];

        if ((0, _lodash.isString)(first)) {
          label = first;
          choices = second;
          options = {};
        } else {
          choices = first;
          options = second;
        }

        break;
      }

    case 3:
      {
        label = args[0];
        choices = args[1];
        options = args[2];
        break;
      }

    default:
      throw new TypeError('input: Expected 0-3 arguments, got ' + arguments.length);
  }

  // validate basic types
  if (!(0, _lodash.isPlainObject)(options)) {
    throw new TypeError('input: Expected options to be an object, but got: ' + (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)));
  }

  if (!(0, _lodash.isArray)(choices)) {
    throw new TypeError('input: Expected choices to be an array, but got: ' + (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)));
  }

  // validate/normalise choices
  var firstEnabledChoiceIndex = void 0;
  var defaultAnswerIndex = void 0;
  {
    (function () {
      var enabledChoicesCount = 0;

      choices = choices.map(function (choice, i) {
        var realChoice = void 0;

        if (choice === null) return new _inquirer2.default.Separator(' ');

        if ((0, _lodash.isString)(choice)) realChoice = { name: choice, value: choice };else if ((0, _lodash.isPlainObject)(choice)) {
          // quick return for disabled choice
          if (choice.disabled === true) {
            return new _inquirer2.default.Separator(choice.name ? _chalk2.default.grey(choice.name) : ' ');
          }

          if (choice.disabled !== undefined && !(0, _lodash.isBoolean)(choice.disabled)) {
            throw new TypeError('input: Expected choice ' + i + '\'s \'disabled\' property to be boolean if defined, ' + ('but got ' + (0, _typeof3.default)(choice.disabled)));
          }

          if (!(0, _lodash.isString)(choice.name)) {
            throw new TypeError('input: Expected choice ' + i + '\'s \'name\' property to be a string, ' + ('but it is ' + (0, _typeof3.default)(choice.name)));
          }

          if (type !== 'checkbox' && !(0, _lodash.isNil)(choice.checked)) {
            throw new Error('input: Choice #' + i + ' had a \'checked\' property, but this only applies to the ' + "checkboxes() question type. For select(), please use the 'default' option instead.");
          }

          realChoice = choice;
        } else {
          throw new TypeError("input: Expected each item in 'choices' to be a string or plain object, " + ('but item #' + i + ' was: ' + (typeof choice === 'undefined' ? 'undefined' : (0, _typeof3.default)(choice))));
        }

        // work around inquirer interpreting empty string as falsey
        if (realChoice.name === '') realChoice.name = ' ';

        // use 'name' as the value if undefined
        if (realChoice.value === undefined) realChoice.value = realChoice.name;

        // note if this is the first enabled choice we've encountered
        if (enabledChoicesCount === 0) firstEnabledChoiceIndex = i;

        // note if this choice should be the default answer (if no default was set)
        if (options.default !== undefined && defaultAnswerIndex === undefined && realChoice.value === options.default) defaultAnswerIndex = enabledChoicesCount;

        // note how many enabled choices there are
        enabledChoicesCount++;

        return realChoice;
      });

      // force minimum 2 enabled choices
      if (enabledChoicesCount < 2) {
        throw new Error('input: Expected choices array to have 2 or more items (not including disabled items) ' + ('but found ' + enabledChoicesCount));
      }
    })();
  }

  // process 'default' option (we want this to be the actual value, but inquirer
  // wants it to be supplied as an array index, not counting separators)
  var inquirerDefault = void 0;
  if (options.default === undefined) inquirerDefault = firstEnabledChoiceIndex;else if (type === 'checkbox') {
    throw new TypeError("input: The 'default' option doesn't work for checkboxes() - use { checked: true } instead.");
  } else if ((0, _lodash.isNumber)(defaultAnswerIndex)) inquirerDefault = defaultAnswerIndex;else {
    throw new Error("input: You set a 'default' answer, but none of the enabled choices had" + 'this answer as its value');
  }

  return (0, _finaliseOptions2.default)({
    choices: choices, label: label, type: type, inquirerDefault: inquirerDefault,
    validate: options.validate
  });
}
//# sourceMappingURL=processTripleArgs.js.map