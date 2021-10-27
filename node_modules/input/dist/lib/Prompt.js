'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Prompt = function () {
  function Prompt(_ref) {
    var label = _ref.label;
    var type = _ref.type;
    var inquirerDefault = _ref.inquirerDefault;
    var choices = _ref.choices;
    var validate = _ref.validate;
    (0, _classCallCheck3.default)(this, Prompt);

    this.label = label;
    this.type = type;
    this.inquirerDefault = inquirerDefault;
    this.choices = choices;
    this.validate = validate;
  }

  (0, _createClass3.default)(Prompt, [{
    key: 'execute',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var label, type, inquirerDefault, choices, validate, inquirerOptions, validationErrored, validationRejectionReason;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                label = this.label;
                type = this.type;
                inquirerDefault = this.inquirerDefault;
                choices = this.choices;
                validate = this.validate;
                inquirerOptions = {
                  choices: choices, type: type,
                  name: 'answer',
                  message: label,
                  default: inquirerDefault
                };
                validationErrored = false;
                validationRejectionReason = void 0;


                if (validate) {
                  inquirerOptions.validate = function (answer) {
                    var done = this.async();

                    _promise2.default.resolve(validate(answer))
                    // manually 'remember' rejection and swallow it
                    .catch(function (error) {
                      validationErrored = true;
                      validationRejectionReason = error;
                      return true;
                    }).then(function (result) {
                      done(result === false ? 'Invalid answer' : result);
                    });
                  };
                }

                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _inquirer2.default.prompt([inquirerOptions], function (_ref2) {
                    var answer = _ref2.answer;

                    if (validationErrored) {
                      reject(validationRejectionReason);
                      return;
                    }

                    resolve(answer);
                  });
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute() {
        return ref.apply(this, arguments);
      }

      return execute;
    }()
  }]);
  return Prompt;
}();

exports.default = Prompt;
//# sourceMappingURL=Prompt.js.map