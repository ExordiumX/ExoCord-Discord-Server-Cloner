import inquirer from 'inquirer';

export default class Prompt {
  constructor({ label, type, inquirerDefault, choices, validate }) {
    this.label = label;
    this.type = type;
    this.inquirerDefault = inquirerDefault;
    this.choices = choices;
    this.validate = validate;
  }

  async execute() {
    const { label, type, inquirerDefault, choices, validate } = this;

    const inquirerOptions = {
      choices, type,
      name: 'answer',
      message: label,
      default: inquirerDefault,
    };

    let validationErrored = false;
    let validationRejectionReason;

    if (validate) {
      inquirerOptions.validate = function (answer) {
        const done = this.async();

        Promise.resolve(validate(answer))
          // manually 'remember' rejection and swallow it
          .catch(error => {
            validationErrored = true;
            validationRejectionReason = error;
            return true;
          })
          .then(result => {
            done(result === false ? 'Invalid answer' : result);
          });
      };
    }

    return new Promise((resolve, reject) => {
      inquirer.prompt([inquirerOptions], ({ answer }) => {
        if (validationErrored) {
          reject(validationRejectionReason);
          return;
        }

        resolve(answer);
      });
    });
  }
}
