if (window.screen.width > 800) {
  document.getElementById("buttonCallNow").innerText = "Request Callback";
}

function validateContactForm() {
  var name = document.getElementsByName("CFname")[0];
  var email = document.getElementsByName("CFemail")[0];
  var message = document.getElementsByName("CFmessage")[0];

  const emailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (name.value == "") {
    name.classList.add("error");
    name.value = "";
    name.placeholder = "Please enter your Name*";
    name.focus();
  } else if (
    email.value == "" ||
    !emailformat.test(String(email.value).toLowerCase())
  ) {
    email.classList.add("error");
    email.value = "";
    email.placeholder = "Please enter a valid Email*";
    email.focus();
  } else if (message.value == "") {
    message.classList.add("error");
    message.value = "";
    message.placeholder = "Please enter your Message*";
    message.focus();
  } else {
    submitContactForm();
  }
}

function submitContactForm() {
  document.getElementById("CFname").value =
    document.getElementsByName("CFname")[0].value;
  document.getElementById("CFemail").value =
    document.getElementsByName("CFemail")[0].value;
  document.getElementById("CFsubject").value =
    document.getElementsByName("CFsubject")[0].value;
  document.getElementById("CFmessage").value =
    document.getElementsByName("CFmessage")[0].value;

  document.getElementsByName("ContactForm")[0].submit();
  document.getElementsByClassName("contact-section")[0].style.display = "none";
  // document.getElementById("submitsucess").innerText =
  //   "Thankyou, we will contact you shortly.";
}
function scrolltoFooter() {
  if (window.screen.width > 800) {
    document.getElementsByName("EMAIL")[0].focus();
  } else {
    window.open('tel:+917669542408');
  }
}
