 
 

// Product Slides ---------------------------------------------------------

var activeSlide = 0;
var slideIndex = 0;
showSlide(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  hideSlide(activeSlide);
  showSlide(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("main-image");
  var dots = document.getElementsByClassName("thumbnail");
  //var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].toggleClass("active")
  }
  slides[slideIndex-1].style.display = "block";
  //dots[slideIndex-1].className += " active";
  //captionText.innerHTML = dots[slideIndex-1].alt;
}

function showSlide(n) {
  var slides = document.getElementsByClassName("main-image");
  var dots = document.getElementsByClassName("thumbnail");
  //console.log(slides.length)
  slides[n].style.display="block";
  dots[n].classList.add('active');
  activeSlide = n;
}

function hideSlide(n){
  var slides = document.getElementsByClassName("main-image");
  var dots = document.getElementsByClassName("thumbnail");
  //console.log(slides.length)
  slides[n].style.display="none";
  dots[n].classList.remove('active');
}


var form = document.getElementById("pincodeForm");
function handleForm(event) { 
  event.preventDefault(); 
  checkPincode()
} 
form.addEventListener('submit', handleForm);

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

//TO validate Pincode
function checkPincode(){

  var pins = ['251001']
  var pincode = document.getElementById("pincodeForm").elements[0].value;
  if(isNumeric(pincode)){
    if(pincode.length<6){
      document.getElementById("pincodeResult").innerHTML = "<font color=#d7003f>Invalid Pincode</font>";
    }
    else if(pins.includes(pincode)){
      document.getElementById("pincodeResult").innerHTML = "<font color=darkgreen>Available</font>";
    }
    else{
      document.getElementById("pincodeResult").innerHTML = "<font color=#d7003f>Currently Not Available at "+pincode+"</font>";
    }
  }
  else{
    document.getElementById("pincodeResult").innerHTML = "<font color=#d7003f>Invalid Pincode</font>";
  }

}

//to pass the data to order page
function passData() {
  checkPincode();
  if(document.getElementById("pincodeResult").innerText=="Available"){
    window.open('./order.html?f=ttyshHUIhsksn23iddbdcUUIok838hschb2osmnfy39SHiJBkjOOk8923982&m=' + 
                encodeURIComponent(document.getElementById("model").innerText)
                +'&p='+ document.getElementById("price").innerText
                +'&q='+ document.getElementById("quantity").value,"_self")   //open in same ta
    }
  else {
    document.getElementById("pincodeinput").focus();
  }
}