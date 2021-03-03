 
 
 
 // Mobile Navigation ---------------------------------------------------------
 if ($('#p-nav-menu-container').length) {
  var $mobile_nav = $('#p-nav-menu-container').clone().prop({
    id: 'mobile-nav'
  });
  $mobile_nav.find('> ul').attr({
    'class': '',
    'id': ''
  });
  $('body').append($mobile_nav);
  $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
  $('body').append('<div id="mobile-body-overly"></div>');
  $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#mobile-nav-toggle').addClass('nav-scrolled');
    } else {
      $('#mobile-nav-toggle').removeClass('nav-scrolled');
    }
  })
  $(document).on('click', '.menu-has-children i', function(e) {
    $(this).next().toggleClass('menu-item-active');
    $(this).nextAll('ul').eq(0).slideToggle();
    $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
  });

  $(document).on('click', '#mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
    $('#mobile-body-overly').toggle();
  });

  $(document).click(function(e) {
    var container = $("#mobile-nav, #mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
        $('#mobile-body-overly').fadeOut();
      }
    }
  });
}
else if ($("#mobile-nav, #mobile-nav-toggle").length) {
  $("#mobile-nav, #mobile-nav-toggle").hide();
}



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


function checkPincode(){

  var pins = ['251001']
  var pincode = document.getElementById("pincodeForm").elements[0].value;
  if(pins.includes(pincode)){
    document.getElementById("pincodeResult").innerHTML = "<font color=darkgreen>Available</font>";
  }
  else{
    document.getElementById("pincodeResult").innerHTML = "<font color=#d7003f>Currently Not Available at "+pincode+"</font>";
  }
}
