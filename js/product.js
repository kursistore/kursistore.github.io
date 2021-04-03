
var pins = ["110001","110002","110003","110004","110005","110006","110007","110008","110009","110010","110011","110012","110013","110014","110015","110016",
            "110017","110018","110019","110020","110021","110022","110023","110024","110025","110026","110027","110028","110029","110030","110031","110032",
            "110033","110034","110035","110036","110037","110038","110039","110040","110041","110042","110043","110044","110045","110046","110047","110048",
            "110049","110051","110052","110053","110054","110055","110056","110057","110058","110059","110060","110061","110062","110063","110064","110065",
            "110066","110067","110068","110069","110070","110071","110072","110073","110074","110075","110076","110077","110078","110080","110081","110082",
            "110083","110084","110085","110086","110087","110088","110089","110090","110091","110092","110093","110094","110095","110096","110097","121001",
            "121002","121003","121004","121005","121006","121007","121008","121009","121010","121012","121013","121101","121102","121103","121105","121106",
            "121107","122001","122002","122003","122004","122005","122006","122007","122008","122009","122010","122011","122015","122016","122017","122018",
            "122051","122052","122101","122102","122103","122104","122105","122107","122108","122413","122414","122502","122503","122504","122505","122506",
            "122508","123106","123401","201001","201002","201003","201004","201005","201006","201007","201008","201009","201010","201011","201012","201013",
            "201014","201015","201016","201017","201019","201102","201103","201201","201204","201206","201301","201303","201304","201305","201306","201307",
            "201309","201310","201311","201312","201313","201314","203135","203141","203155","203201","203202","203203","203207","203209","245101","245201",
            "245205","245206","245207","245208","245301","245304","250001","250002","250003","250004","250005","250103","250104","250106","250110","250205",
            "250221","250222","250223","250341","250342","250344","250401","250402","250404","250406","250501","250502"];

// Product Slides ---------------------------------------------------------

var activeSlide = 0;
var slideIndex = 0;
showSlide(slideIndex);

// Next/previous controls
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// Thumbnail image controls
function currentSlide(n) {
  hideSlide(activeSlide);
  showSlide((slideIndex = n));
}

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("main-image");
//   var dots = document.getElementsByClassName("thumbnail");
//   //var captionText = document.getElementById("caption");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].toggleClass("active");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   //dots[slideIndex-1].className += " active";
//   //captionText.innerHTML = dots[slideIndex-1].alt;
// }

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
      "./order.html?f=tse2rtyshHUIhskjzhg566eyk8kgfdAAWfs5sn23iddbdcUUIok838hschb2osmnfy39SHiJBkjOOk8923982"
      + "&n=" + modelName
      + "&m=" + encodeURIComponent(document.getElementById("modelNo").innerText)
      + "&p=" + document.getElementById("price").innerText
      + "&q=" + document.getElementById("quantity").value,
      "_self"
    );
  } else {
    //document.getElementById("pincodeinput").scrollIntoView();
    document.getElementById("pincodeinput").focus();
    // setTimeout(function () {
    //   var rect = document.getElementById("scrolto");
    //   rect.scrollIntoView();
    // }, 200);
  }
}

var modelName = "";
var modelPrice = "";



//to parse the data from product page
function parseData() {
  var url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  modelName = decodeURIComponent(data.m);
  modelPrice = decodeURIComponent(data.p);

  // console.log(data.f);
  // console.log(data.m);
  // console.log(decodeURIComponent(data.p));

  setOdetails();
}

// Model Name   = [<ModelName>, <Model No>, <Tag1>, <Short Description>, <Description Line1>, 
//                 <Description Line2>, <Finish Type>, <Suitable For>, <Length(cm)>,
//                 <Breadth(cm)>, <Height(cm)>, <Weight(kg)>,<Primary Color>, 
//                 <Finish Color>] 

var aero =  ["Aero","MSTBM01VRT01","NEW","Foldable Study Table"
            ,"Aero is designed to be affordable and aesthetic at the same time. A must have product."
            ,"Very space effiecient, can turn any place into spotlight of the room. Sturdy enoungh to sync with your daily needs."
            ,"Matte","Study & Home Office","64 cm","60 cm","160 cm","31 kg","White","Frosty White"];

var evolve =  ["Evolve","MSTBM01VRT02","NEW","Foldable Study Table"
              ,"The all new WorkStation is perfect for your Study or Home Office."
              ,"Kursi Store Products are carefully designed and tested towards the customer satisfaction end goal."
              ,"Matte","Study & Home Office","64 cm","60 cm","160 cm","31 kg","White","Frosty White"];

var workStation = ["WorkStation","MSTBM01VRT03","NEW","Foldable Study Table"
                  ,"The all new WorkStation is perfect for your Study or Home Office."
                  ,"Kursi Store Products are carefully designed and tested towards the customer satisfaction end goal."
                  ,"Matte","Study & Home Office","64 cm","60 cm","160 cm","31 kg","White","Frosty White"];

var dineFold =  ["Dine Fold","MDTBM01VRT01","NEW","Foldable Dining Table"
              ,"The all new WorkStation is perfect for your Study or Home Office."
              ,"Kursi Store Products are carefully designed and tested towards the customer satisfaction end goal."
              ,"Matte","Study & Home Office","64 cm","60 cm","160 cm","31 kg","White","Frosty White"];


var details=[aero,evolve,workStation,dineFold];
parseData();

//to set Order Details
function setOdetails() {
  document.title=modelName;
  document.getElementById("modelName").innerText=modelName;

  var mainimages=document.getElementsByClassName("main-image");
  var thumbnails=document.getElementsByClassName("thumbnail");
  console.log();

  var video = mainimages[0];
  var source = document.createElement('source');

  for(i=0;i<details.length;i++){
    if(details[i][0]==modelName){
      mainimages[0].poster="img/products/"+details[i][1]+"/poster.jpg";
      source.setAttribute('src', 'img/products/'+details[i][1]+'/fold.mp4');
      video.appendChild(source);    

      mainimages[1].src="img/products/"+details[i][1]+"/2.jpg";
      mainimages[2].src="img/products/"+details[i][1]+"/3.jpg";
      mainimages[3].src="img/products/"+details[i][1]+"/4.jpg";
      mainimages[4].src="img/products/"+details[i][1]+"/5.jpg";
      mainimages[5].src="img/products/"+details[i][1]+"/6.jpg";
      mainimages[6].src="img/products/"+details[i][1]+"/7.jpg";
      mainimages[7].src="img/products/"+details[i][1]+"/8.jpg";

      document.getElementById("price").innerHTML='<font face="Courier" ,size="5">₹</font> '+ modelPrice;
      document.getElementById("modelNo").innerText=details[i][1];
      document.getElementById("tag1").innerText=details[i][2];
      document.getElementById("shortDescrip").innerText=details[i][3];
      document.getElementById("descriptionLine1").innerText=details[i][4];
      document.getElementById("descriptionLine2").innerText=details[i][5];
      document.getElementById("finishType").innerText=details[i][6];
      document.getElementById("suitableFor").innerText=details[i][7];
      document.getElementById("length").innerText=details[i][8];
      document.getElementById("breadth").innerText=details[i][9];
      document.getElementById("height").innerText=details[i][10];
      document.getElementById("weight").innerText=details[i][11];
      document.getElementById("primaryColor").innerText=details[i][12];
      document.getElementById("finishColor").innerText=details[i][13];

      thumbnails[0].src="img/products/"+details[i][1]+"/Thumbnails/1.jpg";
      thumbnails[1].src="img/products/"+details[i][1]+"/Thumbnails/2.jpg";
      thumbnails[2].src="img/products/"+details[i][1]+"/Thumbnails/3.jpg";
      thumbnails[3].src="img/products/"+details[i][1]+"/Thumbnails/4.jpg";
      thumbnails[4].src="img/products/"+details[i][1]+"/Thumbnails/5.jpg";
      thumbnails[5].src="img/products/"+details[i][1]+"/Thumbnails/6.jpg";
      thumbnails[6].src="img/products/"+details[i][1]+"/Thumbnails/7.jpg";
      thumbnails[7].src="img/products/"+details[i][1]+"/Thumbnails/8.jpg";
    }
  }
}

//scroll to footer
function scrolltoFooter(){
  //document.getElementById("request-container").scrollIntoView();
  document.getElementsByName("EMAIL")[0].focus();
}