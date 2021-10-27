# input

[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url]

Prompt for user input through the terminal.

> This is built on top of the excellent [Inquirer](https://github.com/SBoudrias/Inquirer.js) library, so credit mostly goes to [@SBoudrias](https://github.com/SBoudrias).
>
> This module hides away most of Inquirer's API, wrapping it with a smaller, stricter, promise-based API for asking one question at a time.


## Installation

```sh
> npm install input
```


## Usage

Input's functions all return promises, so they work well with `await`.

```js
import input from 'input';

async function askStuff() {
  const name = await input.text('What is your name?', { default: 'Fred' });

  const colors = await input.checkboxes(`OK ${name}, choose some colors`, [
    'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'rebeccapurple'
  ]);

  console.log('You chose:\n  ' + colors.join('\n  '));
}

askStuff();
```

You can also import named functions individually (`import { checkboxes, select } from 'input'`) if you prefer.


## API

The function names are based roughly on HTML equivalents.

Every function returns a promise that resolves with the user's answer.

##### text([label], [options])

Accepts a single line of plain text input from the user.

The default label is `"Enter text"`. The default answer is an empty string.

##### password([label], [options])

Same as `text()`, except the user's typing is presented as asterisks.

The default label is `"Enter password"`. The default answer is an empty string.

##### select([label], choices, [options])

Shows the user a list of [choices](#Choices). The user can move up and down with arrow keys, then press return to select the highlighted choice.

The default label is `"Choose an option"`.

##### checkboxes([label], choices, [options])

Similar to `select()`, except the user may select multiple [choices](#Choices) (or none at all).

The user moves a cursor up and down with the arrow keys, then selects/deselects the highlighted option by pressing space. (It might be a good idea to explain these controls in your label text, depending how technical your users are.)

The default label is `"Choose some options"`.

The answer returned will be an **array** of all the values of the choices the user checked.

##### confirm([label], [options])

A classic `Y/n` confirmation dialogue. The user may type `y` or `n` (case-insensitive) then press return to answer `true` or `false`. The user may alternatively just press return to choose the capitalised answer.

The default label is `"Confirm?"`.

The default answer is `true` (i.e. `Y` is capitalised) unless you override this by setting the [default](#default) option to `false`.

### Choices

> ℹ️ &nbsp; This section applies only to the `select()` and `checkboxes()` functions.

Your `choices` array must contain two or more non-disabled choice objects.

A choice object has these properties:

- `name` (string, required) – what to show the user
- `value` (any) – what to return as the users answer, if chosen. (If not provided, this property is set to the `name` string.)
- `checked` (boolean, default: `false`) – whether this item should be preselected. This only works for `checkboxes()` – if you're using `select()`, you should use the [default](#default) option instead.
- `disabled` (boolean, default: `false`) – makes this a non-selectable item in the list. The arrow keys will skip over this item and it's rendered in grey text. Useful for heading a sub-section of the list.

Alternatively, you may define a choice as as simple string – for example, the string `"foo"` will be expanded to `{ name: "foo", value: "foo" }`.

You may include the value `null` to break up a long list of choices – this is rendered as a non-selectable blank line. (In effect, `null` is the same as `{ name: "", disabled: true }`.)

### Options

Every question function accepts an options object as its final argument, with properties as follows:

##### default

Sets a default answer for the question – used if the user simply presses return with no other interaction.

This option cannot be used for `checkboxes()` – instead, use `checked: true` to preselect individual choices.

For `select()`, your default should correspond with the *value* of the choice you want to preselect (not its array index).

##### validate

A function that will be called to validate the user's answer. If validation doesn't pass, a red message will be shown until the user corrects their answer.

Here's an example validator that ensures a minimum of two checkboxes are selected:

```js
const choices = [ 'cat', 'dog', 'mouse' ];

input.checkboxes('Choose two or more animals', choices, {
  validate(answer) {
    if (answer.length >= 2) return true;

    return `You have chosen only ${answer.length} animals! Keep trying!`;
  }
});
```

Your validation result must be a boolean or a string:

- If it's a boolean, `true` indicates the user's answer is valid, while `false` causes the string `'Invalid answer'` to be displayed in red text until the user corrects their answer.
- If it's a string, this works the same as `false`, except your string will be used as the red text.

If you need to validate asynchronously, return your validation result as a promise. (Or simply define your validator as an async function.)

If your validation function throws an exception (or returns a promise that gets rejected), this will cause the whole question to fail, i.e. the promise returned by the question function will be rejected.

## License

[MIT](https://opensource.org/licenses/MIT)

<!-- badge URLs -->
[npm-url]: https://npmjs.org/package/input
[npm-image]: https://img.shields.io/npm/v/input.svg?style=flat-square

[depstat-url]: https://david-dm.org/callumlocke/input
[depstat-image]: https://img.shields.io/david/callumlocke/input.svg?style=flat-square

[devdepstat-url]: https://david-dm.org/callumlocke/input#info=devDependencies
[devdepstat-image]: https://img.shields.io/david/dev/callumlocke/input.svg?style=flat-square&label=devDeps
