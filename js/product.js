var pins = ["251001", "201204"];

// Product Slides ---------------------------------------------------------

var activeSlide = 0;
var slideIndex = 0;
showSlide(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  hideSlide(activeSlide);
  showSlide((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("main-image");
  var dots = document.getElementsByClassName("thumbnail");
  //var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].toggleClass("active");
  }
  slides[slideIndex - 1].style.display = "block";
  //dots[slideIndex-1].className += " active";
  //captionText.innerHTML = dots[slideIndex-1].alt;
}

function showSlide(n) {
  var slides = document.getElementsByClassName("main-image");
  var dots = document.getElementsByClassName("thumbnail");
  //console.log(slides.length)
  slides[n].style.display = "block";
  dots[n].classList.add("active");
  activeSlide = n;
}

function hideSlide(n) {
  var slides = document.getElementsByClassName("main-image");
  var dots = document.getElementsByClassName("thumbnail");
  //console.log(slides.length)
  slides[n].style.display = "none";
  dots[n].classList.remove("active");
}

var form = document.getElementById("pincodeForm");
function handleForm(event) {
  event.preventDefault();
  checkPincode();
}
form.addEventListener("submit", handleForm);

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

//To validate Pincode
function checkPincode() {
  var pincode = document.getElementById("pincodeForm").elements[0].value;
  if (isNumeric(pincode)) {
    if (pincode.length < 6) {
      document.getElementById("pincodeResult").innerHTML =
        "<font color=#d7003f>Invalid Pincode</font>";
    } else if (pins.includes(pincode)) {
      document.getElementById("pincodeResult").innerHTML =
        "<font color=darkgreen>Available</font>";
    } else {
      document.getElementById("pincodeResult").innerHTML =
        "<font color=#d7003f>Currently Not Available at "+pincode+".</font>"+
        "<div class='requestbutton' onclick=scrolltoFooter()>Request Services</div>";
    }
  } else {
    document.getElementById("pincodeResult").innerHTML =
      "<font color=#d7003f>Invalid Pincode</font>";
  }
}

//to pass the data to order page
function passData() {
  checkPincode();
  if (document.getElementById("pincodeResult").innerText == "Available") {
    window.open(
      "./order.html?f=ttyshHUIhskjzhg566eyk8kgfdAAWfs5sn23iddbdcUUIok838hschb2osmnfy39SHiJBkjOOk8923982&m=" +
        encodeURIComponent(document.getElementById("model").innerText) +
        "&p=" +
        document.getElementById("price").innerText +
        "&q=" +
        document.getElementById("quantity").value,
      "_self"
    );
  } else {
    document.getElementById("pincodeinput").focus();
    setTimeout(function () {
      var rect = document.getElementById("scrolto");
      rect.scrollIntoView();
    }, 200);
  }
}

var modelName = "";
var modelPrice = "";

//to parse the data from product page
function parseData() {
  // var url = document.location.href,
  //   params = url.split("?")[1].split("&"),
  //   data = {},
  //   tmp;
  // for (var i = 0, l = params.length; i < l; i++) {
  //   tmp = params[i].split("=");
  //   data[tmp[0]] = tmp[1];
  // }
  // modelName = data.m;
  // modelPrice = decodeURIComponent(data.p);

  // console.log(data.f);
  // console.log(data.m);
  // console.log(decodeURIComponent(data.p));
  // console.log(data.q);

  setOdetails();
}

//to set Order Details
function setOdetails() {
  document.title=document.getElementById("modelName").innerText;
}

//scroll to footer
function scrolltoFooter(){
  document.getElementById("request-container").scrollIntoView;
  document.getElementsByName("EMAIL")[0].focus();
}