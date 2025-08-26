import JustValidate from "just-validate";

export const createValidator = (formSelector, rules) => {
  const validator = new JustValidate(formSelector);

  rules.forEach(({ field, validations }) => {
    validator.addField(field, validations);
  });

  return validator;
};
