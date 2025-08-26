export const truncate = (str, maxLength = 50) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
};

// Utility functions for preloader management

/**
 * Show preloader
 */
function showLoader() {
  if (window.preloaderManager) {
    window.preloaderManager.show();
  }
}

/**
 * Hide preloader
 */
function hideLoader() {
  if (window.preloaderManager) {
    window.preloaderManager.hide();
  }
}

/**
 * Set loading state
 * @param {boolean} loading - Loading state
 */
function setLoading(loading) {
  if (window.preloaderManager) {
    window.preloaderManager.setLoading(loading);
  }
}

/**
 * Wrap async function with preloader
 * @param {Function} asyncFunction - Async function to wrap
 * @returns {Function} Wrapped function
 */
function withLoader(asyncFunction) {
  return async function (...args) {
    try {
      showLoader();
      const result = await asyncFunction(...args);
      return result;
    } finally {
      hideLoader();
    }
  };
}

/**
 * Load data with preloader
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} Fetch promise
 */
async function loadDataWithLoader(url, options = {}) {
  try {
    showLoader();
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } finally {
    hideLoader();
  }
}

/**
 * Submit form with preloader
 * @param {HTMLFormElement} form - Form element
 * @param {Object} options - Fetch options
 * @returns {Promise} Submit promise
 */
async function submitFormWithLoader(form, options = {}) {
  try {
    showLoader();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method || "POST",
      body: formData,
      ...options,
    });
    return response;
  } finally {
    hideLoader();
  }

  /**
   * Load images with preloader
   * @param {string[]} imageUrls - Array of image URLs
   * @returns {Promise} Promise that resolves when all images are loaded
   */
  function loadImagesWithLoader(imageUrls) {
    return new Promise((resolve, reject) => {
      showLoader();

      const promises = imageUrls.map((url) => {
        return new Promise((resolveImg, rejectImg) => {
          const img = new Image();
          img.onload = () => resolveImg(img);
          img.onerror = () =>
            rejectImg(new Error(`Failed to load image: ${url}`));
          img.src = url;
        });
      });

      Promise.all(promises)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          hideLoader();
        });
    });
  }

  /**
   * Navigate to page with preloader
   * @param {string} url - URL to navigate to
   * @param {Object} options - Navigation options
   */
  function navigateWithLoader(url, options = {}) {
    showLoader();

    if (options.replace) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  }

  // Export functions for global use
  window.loaderUtils = {
    show: showLoader,
    hide: hideLoader,
    setLoading: setLoading,
    withLoader: withLoader,
    loadData: loadDataWithLoader,
    submitForm: submitFormWithLoader,
    loadImages: loadImagesWithLoader,
    navigate: navigateWithLoader,
  };
}
