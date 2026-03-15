document.addEventListener("DOMContentLoaded", function () {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBtDqq7sZS_JZTqTc0FxB8zFbeCbOrdw6Hw-61tXKBUq-sXyVymc7KaripqFv9h3Qk/exec";

  const form = document.getElementById("order");
  const nameInput = document.getElementById("lead_name") || document.querySelector('input[name="name"]');
  const phoneInput = document.getElementById("lead_phone") || document.querySelector('input[name="phone"]');
  const submitBtn = document.getElementById("submitBtn") || (form ? form.querySelector('button[type="submit"]') : null);
  const messageBox = document.getElementById("form-message");

  if (!form || !nameInput || !phoneInput) {
    console.log("Lead form elements not found");
    return;
  }

  function setMessage(text, type) {
    if (!messageBox) return;
    messageBox.textContent = text || "";
    messageBox.className = "formFb__msg" + (type ? " " + type : "");
  }

  function getPhoneValue() {
    try {
      if (typeof window.getLeadPhoneValue === "function") {
        return window.getLeadPhoneValue();
      }
      if (window.leadPhoneInstance && typeof window.leadPhoneInstance.getNumber === "function") {
        const number = window.leadPhoneInstance.getNumber();
        if (number) return number;
      }
    } catch (e) {
      console.log("Phone read fallback used:", e);
    }
    return phoneInput.value.trim();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    setMessage("", "");

    const name = nameInput.value.trim();
    const phone = getPhoneValue();

    if (name.length < 3) {
      setMessage("कृपया सही नाम दर्ज करें।", "error");
      nameInput.focus();
      return;
    }

    if (!phone || phone.replace(/\D/g, "").length < 6) {
      setMessage("कृपया सही फोन नंबर दर्ज करें।", "error");
      phoneInput.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    const body = new URLSearchParams();
    body.append("lead_status", "submitted");
    body.append("name", name);
    body.append("phone", phone);
    body.append("page_url", window.location.href);
    body.append("page_title", document.title);
    body.append("user_agent", navigator.userAgent);
    body.append("submitted_at", new Date().toISOString());

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: body,
        redirect: "follow"
      });

      const text = await response.text();
      console.log("Apps Script response:", text);

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      setMessage("धन्यवाद! आपकी जानकारी सफलतापूर्वक भेज दी गई है।", "success");
      form.reset();
      phoneInput.value = "";
    } catch (err) {
      console.error("Submit failed:", err);
      setMessage("डेटा भेजने में समस्या हुई।", "error");
      alert("Submission failed");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "ऑर्डर भेजें";
      }
    }
  });
});