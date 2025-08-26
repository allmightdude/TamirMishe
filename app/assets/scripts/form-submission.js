// EmailJS configuration and form submission
(function () {
  // Initialize EmailJS
  emailjs.init("NsYFd1p1GDKaFVSGm"); // Replace with your actual User ID

  // Function to send form data via EmailJS
  function sendDirectToEmail(formData) {
    const templateParams = {
      from_name: formData.get("fullName") || "Unknown",
      from_phone: formData.get("mobile") || "Unknown",
      message: formData.get("description") || "No message provided",
    };

    return emailjs
      .send("service_2qbusbr", "template_p5i4wfr", templateParams)
      .then(function (response) {
        return { success: true, message: "پیام با موفقیت ارسال شد!" };
      })
      .catch(function (error) {
        return {
          success: false,
          message: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
        };
      });
  }

  // Handle form submission
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const contactFormAlt = document.getElementById("contactForm");

    const forms = [contactForm, contactFormAlt].filter(Boolean);

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission (URL query parameters)

        const formData = new FormData(this);

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = "در حال ارسال...";
        submitButton.disabled = true;

        // Send via EmailJS
        sendDirectToEmail(formData)
          .then((result) => {
            if (result.success) {
              alert(result.message);
              this.reset(); // Clear the form
            } else {
              alert(result.message);
            }
          })
          .finally(() => {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          });
      });
    });
  });

  // Make function globally available for testing
  window.sendDirectToEmail = sendDirectToEmail;
})();
