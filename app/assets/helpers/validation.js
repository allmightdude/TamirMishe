// Validation helper using JustValidate
// Make sure to include JustValidate library before this script

const createValidator = (formSelector, rules) => {
  if (typeof JustValidate === 'undefined') {
    console.error('JustValidate is not available');
    return null;
  }
  
  const validator = new JustValidate(formSelector);

  rules.forEach(({ field, validations }) => {
    validator.addField(field, validations);
  });

  return validator;
};

// Make function available globally
window.createValidator = createValidator;
