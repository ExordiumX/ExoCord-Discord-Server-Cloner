import { isString, isPlainObject, isNumber } from 'lodash';
import finaliseOptions from './finaliseOptions';

/**
 * Processes any arguments object that fulfills the double-argument signature
 * used by `text()`, `password()`, `confirm()`, etc:
 *
 * `([String: label], [PlainObject: options])`
 *
 * (NB. that is the expected signature of the passed-in `args` object,
 * not of this function itself.)
 */

export default function processDoubleArgs(args, defaultLabel, type) {
  let options;
  let label = defaultLabel;

  // extract and validate args
  switch (args.length) {
    case 0: break;

    case 1: {
      const arg = args[0];

      if (isString(arg)) {
        label = arg;
        options = {};
      }
      else if (isPlainObject(arg)) options = arg;
      else {
        throw new TypeError(
          `input: Expected single argument to be a label or options object, but got: ${typeof arg}
        `);
      }

      break;
    }

    case 2: {
      label = args[0];
      options = args[1];

      if (!isPlainObject(options)) {
        throw new TypeError(
          `input: Expected second argument to be an options object, but got: ${typeof options}`
        );
      }

      break;
    }

    default: throw new TypeError(`input: Expected 0-2 arguments, but got ${args.length}`);
  }

  // ensure options.default is valid if set
  if (options.default !== undefined) {
    if (isNumber(options.default)) options.default = String(options.default);
    else if (isString(options.default && !/[^\n\r]*/.test(options.default))) {
      throw new Error('input: options.default contained invalid characters');
    }
  }

  return finaliseOptions({
    label, type,
    validate: options.validate,
    inquirerDefault: options.default,
  });
}
