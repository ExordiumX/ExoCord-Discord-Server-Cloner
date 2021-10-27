import inquirer from 'inquirer';
import chalk from 'chalk';
import { isString, isPlainObject, isArray, isNil, isBoolean, isNumber } from 'lodash';
import finaliseOptions from './finaliseOptions';

/**
 * Processes any arguments object that fulfills the triple-argument signature
 * used by `select()` and `checkboxes()`:
 *
 * `([String: label], Array: choices, [PlainObject: options])`
 *
 * (NB. that is the expected signature of the passed-in `args` object,
 * not of this function itself.)
 */

export default function argsTriple(args, defaultLabel, type) {
  let label = defaultLabel;
  let choices;
  let options;

  // extract args
  switch (args.length) {
    case 0: throw new TypeError('input: Expected at least one argument (an array of choices)');

    case 1: {
      choices = args[0];
      options = {};
      break;
    }

    case 2: {
      const first = args[0];
      const second = args[1];

      if (isString(first)) {
        label = first;
        choices = second;
        options = {};
      }
      else {
        choices = first;
        options = second;
      }

      break;
    }

    case 3: {
      label = args[0];
      choices = args[1];
      options = args[2];
      break;
    }

    default: throw new TypeError(`input: Expected 0-3 arguments, got ${arguments.length}`);
  }

  // validate basic types
  if (!isPlainObject(options)) {
    throw new TypeError(`input: Expected options to be an object, but got: ${typeof options}`);
  }

  if (!isArray(choices)) {
    throw new TypeError(`input: Expected choices to be an array, but got: ${typeof options}`);
  }

  // validate/normalise choices
  let firstEnabledChoiceIndex;
  let defaultAnswerIndex;
  {
    let enabledChoicesCount = 0;

    choices = choices.map((choice, i) => {
      let realChoice;

      if (choice === null) return new inquirer.Separator(' ');

      if (isString(choice)) realChoice = { name: choice, value: choice };
      else if (isPlainObject(choice)) {
        // quick return for disabled choice
        if (choice.disabled === true) {
          return new inquirer.Separator(
            choice.name ? chalk.grey(choice.name) : ' '
          );
        }

        if (choice.disabled !== undefined && !isBoolean(choice.disabled)) {
          throw new TypeError(
            `input: Expected choice ${i}'s 'disabled' property to be boolean if defined, ` +
            `but got ${typeof choice.disabled}`
          );
        }

        if (!isString(choice.name)) {
          throw new TypeError(
            `input: Expected choice ${i}'s 'name' property to be a string, ` +
            `but it is ${typeof choice.name}`
          );
        }

        if (type !== 'checkbox' && !isNil(choice.checked)) {
          throw new Error(
            `input: Choice #${i} had a 'checked' property, but this only applies to the ` +
            "checkboxes() question type. For select(), please use the 'default' option instead."
          );
        }

        realChoice = choice;
      }
      else {
        throw new TypeError(
          "input: Expected each item in 'choices' to be a string or plain object, " +
          `but item #${i} was: ${typeof choice}`
        );
      }

      // work around inquirer interpreting empty string as falsey
      if (realChoice.name === '') realChoice.name = ' ';

      // use 'name' as the value if undefined
      if (realChoice.value === undefined) realChoice.value = realChoice.name;

      // note if this is the first enabled choice we've encountered
      if (enabledChoicesCount === 0) firstEnabledChoiceIndex = i;

      // note if this choice should be the default answer (if no default was set)
      if (
        options.default !== undefined &&
        defaultAnswerIndex === undefined &&
        realChoice.value === options.default
      ) defaultAnswerIndex = enabledChoicesCount;

      // note how many enabled choices there are
      enabledChoicesCount++;

      return realChoice;
    });

    // force minimum 2 enabled choices
    if (enabledChoicesCount < 2) {
      throw new Error(
        'input: Expected choices array to have 2 or more items (not including disabled items) ' +
        `but found ${enabledChoicesCount}`
      );
    }
  }

  // process 'default' option (we want this to be the actual value, but inquirer
  // wants it to be supplied as an array index, not counting separators)
  let inquirerDefault;
  if (options.default === undefined) inquirerDefault = firstEnabledChoiceIndex;
  else if (type === 'checkbox') {
    throw new TypeError(
      "input: The 'default' option doesn't work for checkboxes() - use { checked: true } instead."
    );
  }
  else if (isNumber(defaultAnswerIndex)) inquirerDefault = defaultAnswerIndex;
  else {
    throw new Error(
      "input: You set a 'default' answer, but none of the enabled choices had" +
      'this answer as its value'
    );
  }

  return finaliseOptions({
    choices, label, type, inquirerDefault,
    validate: options.validate,
  });
}
