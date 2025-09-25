// Form validation using just-validate
// Make sure JustValidate library is loaded before this script
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    // Initialize just-validate
    const validator = new JustValidate("#contact-form", {
      validateBeforeSubmitting: true,
    });

    // Add validation rules
    validator
      .addField('input[name="fullName"]', [
        {
          rule: "required",
          errorMessage: "نام و نام خانوادگی الزامی است",
        },
      ])
      .addField('input[name="mobile"]', [
        {
          rule: "required",
          errorMessage: "شماره تماس الزامی است",
        },
      ])
      .addField('textarea[name="description"]', [
        {
          rule: "required",
          errorMessage: "توضیحات الزامی است",
        },
      ])
      .onSuccess((event) => {
        // Form is valid, let the form-submission.js handle the submission
        console.log("Form validation passed");
      });
  }
});
