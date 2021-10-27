import { isString, isFunction } from 'lodash';

/**
 * Performs final validation for prompt options, after they've been assembled by
 * either processDoubleArgs() or processTripleArgs().
 */

export default function finaliseOptions(options) {
  if (!isString(options.label)) {
    throw new TypeError(`input: Expected label to be a string, but got: ${typeof label}`);
  }

  if (options.validate !== undefined && !isFunction(options.validate)) {
    throw new TypeError(
      `input: Expected 'validate' option to be a function or undefined, got: ${typeof validate}`
    );
  }

  return options;
}
