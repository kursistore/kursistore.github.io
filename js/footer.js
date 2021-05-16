//load footer
var submitted = false;
fetch("./views/footer.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("footer").innerHTML = data;
    doAfterFooterLoad();
  });

function doAfterFooterLoad() {
  // to disable right click on all pages that has contact.js included
  // document.addEventListener("contextmenu", function(e){
  //   e.preventDefault();
  // }, false);

  // to disable right click on all images
  $("img").on("contextmenu", function (e) {
    return false;
  });

  $("video").on("contextmenu", function (e) {
    return false;
  });

  if (window.screen.width < 800) {
    console.log(window.screen.width);
    document.getElementById("footer-note").innerText = "Contact Us";
  }
  document.getElementById("copywriteText").innerHTML =
    "Copyright &copy " + new Date().getFullYear();
}

const emailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateConnectForm() {
  var email = document.getElementsByClassName("form-control")[0].value;
  // if (email == "" || !emailformat.test(String(email).toLowerCase())) {
  //   document.getElementById("submitsucess").innerText =
  //     "Please enter a valid email.";
  // } else {
  //   submitContactForm();
  // }

  if (email == "") {
    document.getElementById("submitsucess").innerText =
      "Please enter an Email or Phone Number.";
  } else {
    submitConnectForm();
  }
}

function submitConnectForm() {
  document.getElementById("CEmail").value = document.getElementsByClassName(
    "form-control"
  )[0].value;
  document.getElementsByName("ConnectForm")[0].submit();
  document.getElementById("request-container").style.display = "none";
  document.getElementById("submitsucess").innerText =
    "Thankyou, we will contact you shortly.";
}


