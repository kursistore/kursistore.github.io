footerPhone;

const emailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateForm() {
  var email = document.getElementsByClassName("form-control")[0].value;
  // if (email == "" || !emailformat.test(String(email).toLowerCase())) {
  //   document.getElementById("submitsucess").innerText =
  //     "Please enter a valid email.";
  // } else {
  //   submitContactForm();
  // }
  submitContactForm();
}

function submitContactForm() {
  document.getElementById("CEmail").value = document.getElementsByClassName(
    "form-control"
  )[0].value;
  document.getElementsByName("ContactForm")[0].submit();
  document.getElementById("request-container").style.display = "none";
  document.getElementById("submitsucess").innerText =
    "Thankyou, we will contact you shortly.";
}

if (window.screen.width > 800) {
  document.getElementById("footerPhone").style.display = "none";
  document.getElementById("footerEmail").style.display = "none";
} else {
  document.getElementById("footer-note").innerText = "Contact Us";
}
