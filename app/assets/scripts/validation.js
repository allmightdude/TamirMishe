// Form validation using just-validate
// Wait for JustValidate to be available from CDN
function waitForJustValidate() {
  return new Promise((resolve) => {
    if (typeof JustValidate !== 'undefined') {
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (typeof JustValidate !== 'undefined') {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    }
  });
}

// Initialize validation after everything is loaded
function initializeFormValidation() {
  const contactForm = document.querySelector("#contact-form");

  if (contactForm && typeof JustValidate !== 'undefined') {
    try {
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
      
      console.log("✅ Form validation initialized successfully");
    } catch (error) {
      console.error("Error initializing form validation:", error);
    }
  } else {
    console.warn("JustValidate not available or contact form not found");
  }
}

// Wait for DOM and JustValidate to be ready
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Wait for JustValidate to be available (with longer timeout for CDN loading)
    await Promise.race([
      waitForJustValidate(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('JustValidate timeout')), 10000))
    ]);
    
    // Initialize validation
    initializeFormValidation();
    
  } catch (error) {
    console.error("Error initializing form validation:", error);
    console.warn("Form validation disabled - form will submit without validation");
    
    // Try to initialize again after a longer delay (in case CDN is slow)
    setTimeout(() => {
      if (typeof JustValidate !== 'undefined') {
        console.log("Retrying form validation initialization...");
        initializeFormValidation();
      }
    }, 3000);
  }
});
