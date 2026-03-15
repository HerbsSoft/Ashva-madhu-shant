document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("lead_phone") || document.querySelector('input[name="phone"]');
  const nameInput = document.getElementById("lead_name") || document.querySelector('input[name="name"]');
  const form = document.getElementById("order");

  if (nameInput) {
    nameInput.setAttribute("autocomplete", "name");
    nameInput.setAttribute("required", "required");
    nameInput.setAttribute("minlength", "3");
  }

  if (!phoneInput) return;

  phoneInput.setAttribute("autocomplete", "tel");
  phoneInput.setAttribute("required", "required");
  phoneInput.setAttribute("type", "tel");
  phoneInput.setAttribute("inputmode", "numeric");
  phoneInput.setAttribute("maxlength", "10");
  phoneInput.setAttribute("placeholder", "9876543210");

  let iti = null;

  if (window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "in",
      onlyCountries: ["in"],
      allowDropdown: false,
      nationalMode: true,
      separateDialCode: true,
      autoPlaceholder: "off",
      formatOnDisplay: false
    });
  }

  window.leadPhoneInstance = iti;

  function digitsOnly(value) {
    return (value || "").replace(/\D/g, "");
  }

  function normalizeIndianNumber() {
    let digits = digitsOnly(phoneInput.value);

    // keep only first 10 digits
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    phoneInput.value = digits;
    return digits;
  }

  function validatePhone(showMessage) {
    const digits = normalizeIndianNumber();

    phoneInput.setCustomValidity("");

    // Indian mobile: exactly 10 digits, starts with 6/7/8/9
    const valid = /^[6-9]\d{9}$/.test(digits);

    if (!valid && showMessage) {
      phoneInput.setCustomValidity("कृपया सही 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें");
    }

    return valid;
  }

  phoneInput.addEventListener("input", function () {
    validatePhone(false);
  });

  phoneInput.addEventListener("paste", function () {
    setTimeout(function () {
      validatePhone(false);
    }, 0);
  });

  phoneInput.addEventListener("blur", function () {
    validatePhone(true);
    if (!phoneInput.checkValidity()) {
      phoneInput.reportValidity();
    }
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      if (!validatePhone(true)) {
        e.preventDefault();
        phoneInput.focus();
        phoneInput.reportValidity();
      }
    });
  }

  window.getLeadPhoneValue = function () {
    const digits = normalizeIndianNumber();
    return digits ? "+91" + digits : "";
  };
}); 