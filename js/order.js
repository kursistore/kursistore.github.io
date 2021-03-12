//service pincodes
var pins = ["251001","201204"];

//to get order details
var modelNo = "";
var price = "";
var quantity = "";

function parseData() {
  var url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  modelNo = data.m;
  price = decodeURIComponent(data.p);
  quantity = data.q;

  // console.log(data.f);
  // console.log(data.m);
  // console.log(decodeURIComponent(data.p));
  // console.log(data.q);
  setOdetails();
}

//to format mutiplied price into inr format
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
});

//to set Order Details
function setOdetails() {
  document.getElementById("ODimg").src =
    "./img/products/" + modelNo + "/00.png";
  document.getElementById("ODmodel").innerHTML = modelNo;
  document.getElementById("ODquantity").innerHTML = quantity;
  document.getElementById("ODprice").innerHTML =
    '<font face="Courier" style="font-size: 17px;">₹</font> ' + price.slice(2);
  document.getElementById("ODtotal").innerHTML =
    '<font face="Courier" style="font-size: 24px;">₹</font> ' +
    formatter
      .format((price.match(/\d+/g)[0] + price.match(/\d+/g)[1]) * quantity)
      .slice(1);
}


//-----------------------------------------------------//
//                   Form Handling                     //
//-----------------------------------------------------//

// to check numeric input
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

//to validate shipping form
function validateShipping() {
  var fname = document.getElementsByName("fname")[0];
  var lname = document.getElementsByName("lname")[0];
  var email = document.getElementsByName("email")[0];
  var mnum = document.getElementsByName("mnum")[0];
  var adline = document.getElementsByName("adLine1")[0];
  var pincode = document.getElementsByName("pincode")[0];
  var city = document.getElementsByName("city")[0];
  var state = document.getElementsByName("states")[0];

  var inputs = [fname, lname, email, mnum, adline, pincode, city];
  var eMessage = "";
  

  var error = [];
  const emailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (state.options[state.selectedIndex].innerText == "--Select State--") {
    error.push(state);
    eMessage = "Please choose State";
  }
  if (city.value == "") {
    error.push(city);
    eMessage = "Please enter City";
  }
  if (isNumeric(pincode.value)) {
    if (pincode.value.length < 6) {
      error.push(pincode);
      eMessage = "Please enter a valid Pincode";
    } else if (!pins.includes(pincode.value)) {
      error.push(pincode);
      eMessage = "Currently Not Available at " + pincode.value;
    }
  } else {
    error.push(pincode);
    eMessage = "Please enter a valid Pincode";
  }
  if (adline.value == "") {
    error.push(adline);
    eMessage = "Please enter Address";
  }
  if (mnum.value == "" || mnum.value.length < 10) {
    error.push(mnum);
    eMessage = "Please enter valid Mobile Number";
  }
  if (
    email.value == "" ||
    !emailformat.test(String(email.value).toLowerCase())
  ) {
    error.push(email);
    eMessage = "Please enter valid Email";
  }
  if (lname.value == "") {
    error.push(lname);
    eMessage = "Please enter Last Name";
  }
  if (fname.value == "") {
    error.push(fname);
    eMessage = "Please enter First Name";
  }
  if (error.length > 0) {
    error[error.length - 1].focus();
    document.getElementById("errorTag").innerHTML = eMessage;

    for (i = 0; i < error.length; i++) {
      error[i].classList.add("error");
    }
    error.splice(0, error.length);
  } else {
    document.getElementById("errorTag").innerHTML = "";
    for (i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("error")) {
        inputs[i].classList.remove("error");
      }
    }
    document.getElementById("billingButton").disabled = false;
    conBilling();
  }
}

//to validate billing form
function validateBilling() {
  if (document.getElementsByName("same-as")[0].checked) {
    //console.log("Checked");
    order();
  } else {
    var fname = document.getElementsByName("bfname")[0];
    var lname = document.getElementsByName("blname")[0];
    var email = document.getElementsByName("bemail")[0];
    var mnum = document.getElementsByName("bmnum")[0];
    var adline = document.getElementsByName("badLine1")[0];
    var pincode = document.getElementsByName("bpincode")[0];
    var city = document.getElementsByName("bcity")[0];
    var state = document.getElementsByName("bstates")[0];

    var inputs = [fname, lname, email, mnum, adline, pincode, city];
    var eMessage = "";

    var error = [];
    const emailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (state.options[state.selectedIndex].innerText == "--Select State--") {
      error.push(state);
      eMessage = "Please choose State";
    }
    if (city.value == "") {
      error.push(city);
      eMessage = "Please enter City";
    }
    if (isNumeric(pincode.value)) {
      if (pincode.value.length < 6) {
        error.push(pincode);
        eMessage = "Please enter a valid Pincode";
      } else if (!pins.includes(pincode.value)) {
        error.push(pincode);
        eMessage = "Currently Not Available at " + pincode.value;
      }
    } else {
      error.push(pincode);
      eMessage = "Please enter a valid Pincode";
    }
    if (adline.value == "") {
      error.push(adline);
      eMessage = "Please enter Address";
    }
    if (mnum.value == "" || mnum.value.length < 10) {
      error.push(mnum);
      eMessage = "Please enter valid Mobile Number";
    }
    if (
      email.value == "" ||
      !emailformat.test(String(email.value).toLowerCase())
    ) {
      error.push(email);
      eMessage = "Please enter valid Email";
    }
    if (lname.value == "") {
      error.push(lname);
      eMessage = "Please enter Last Name";
    }
    if (fname.value == "") {
      error.push(fname);
      eMessage = "Please enter First Name";
    }
    if (error.length > 0) {
      error[error.length - 1].focus();
      document.getElementById("berrorTag").innerHTML = eMessage;

      for (i = 0; i < error.length; i++) {
        error[i].classList.add("error");
      }
      error.splice(0, error.length);
    } else {
      document.getElementById("berrorTag").innerHTML = "";
      for (i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains("error")) {
          inputs[i].classList.remove("error");
        }
      }
      order();
    }
  }
}

//to continue to billing section
function conBilling() {
  document.getElementById("billingButton").click();
  
  setTimeout(function (){
    var rect = document.getElementById("checkoutbutton").getBoundingClientRect();
    window.scrollTo(rect.left,rect.top);
  },400);
  
}

//to hide billing form on same address as shipping
function sameAddr() {
  var hidden = document.getElementsByClassName("billingHidden");
  var checkbox = document.getElementsByName("same-as")[0];
  if (checkbox.checked) {
    hidden[0].classList.add("display-none");
    hidden[1].classList.add("display-none");
  } else {
    hidden[0].classList.remove("display-none");
    hidden[1].classList.remove("display-none");
  }
}

//to generate a ordernumber
function orderNumber() {
  var currentDate = new Date();
  var year = currentDate.getFullYear() - 2000;
  var month = currentDate.getMonth() + 1;
  var date = currentDate.getDate();
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  //var orderdate = date + "/" + month + "/" + (year + 2000);

  //var ordernumber = year + "" + month + "" + date + "" + hour + "" + minute + "" + second;

  // var uri ="\n Order No.: " + ordernumber
  //         +"\n OrderDate: " + orderdate
  //         +"\n Model: " + document.getElementById("model").innerText
  //         +"\n Order Total: " + document.getElementById("price").innerText ;
  //var url = href="https://api.whatsapp.com/send?phone=+918755837310&text=" + encodeURI(uri);

  //window.open(url, '_blank');

  return year + "" + month + "" + date + "" + hour + "" + minute + "" + second;
}

//to pass data to confirm page
function passData(odNum) {
  window.open(
    "./confirm.html?f=ttyshHUIhsksn23iddbdcUUIok838hschb2osmnfy39SHiJBkjOOk8923982" +
      "&o=" +
      odNum +
      "&c=0",
    "_self"
  );
  // window.open("./confirm.html","_self");
  //open in same tab
}

//to submit order form with values taken from shipping and billing forms
function order() {
  var orderNum = document.getElementById("OrderNum");
  var model = document.getElementById("model");
  var Quantity = document.getElementById("Quantity");
  var SFName = document.getElementById("SFName");
  var SLName = document.getElementById("SLName");
  var SEmail = document.getElementById("SEmail");
  var SMobileNum = document.getElementById("SMobileNum");
  var SAdLineOne = document.getElementById("SAdLineOne");
  var SAdLineTwo = document.getElementById("SAdLineTwo");
  var SLandmark = document.getElementById("SLandmark");
  var SPincode = document.getElementById("SPincode");
  var SCity = document.getElementById("SCity");
  var SState = document.getElementById("SState");
  var BFName = document.getElementById("BFName");
  var BLName = document.getElementById("BLName");
  var BEmail = document.getElementById("BEmail");
  var BMobileNum = document.getElementById("BMobileNum");
  var BAdLineOne = document.getElementById("BAdLineOne");
  var BAdLineTwo = document.getElementById("BAdLineTwo");
  var BLandmark = document.getElementById("BLandmark");
  var BPincode = document.getElementById("BPincode");
  var BCity = document.getElementById("BCity");
  var BState = document.getElementById("BState");

  orderNum.value = orderNumber();
  model.value = modelNo;
  Quantity.value = quantity;
  SFName.value = document.getElementsByName("fname")[0].value;
  SLName.value = document.getElementsByName("lname")[0].value;
  SEmail.value = document.getElementsByName("email")[0].value;
  SMobileNum.value = document.getElementsByName("mnum")[0].value;
  SAdLineOne.value = document.getElementsByName("adLine1")[0].value;
  SAdLineTwo.value = document.getElementsByName("adLine2")[0].value;
  SLandmark.value = document.getElementsByName("landmark")[0].value;
  SPincode.value = document.getElementsByName("pincode")[0].value;
  SCity.value = document.getElementsByName("city")[0].value;
  SState.value = document.getElementsByName("states")[0].options[
    document.getElementsByName("states")[0].selectedIndex
  ].innerText;

  if (document.getElementsByName("same-as")[0].checked) {
    BFName.value = document.getElementsByName("fname")[0].value;
    BLName.value = document.getElementsByName("lname")[0].value;
    BEmail.value = document.getElementsByName("email")[0].value;
    BMobileNum.value = document.getElementsByName("mnum")[0].value;
    BAdLineOne.value = document.getElementsByName("adLine1")[0].value;
    BAdLineTwo.value = document.getElementsByName("adLine2")[0].value;
    BLandmark.value = document.getElementsByName("landmark")[0].value;
    BPincode.value = document.getElementsByName("pincode")[0].value;
    BCity.value = document.getElementsByName("city")[0].value;
    BState.value = document.getElementsByName("states")[0].options[
      document.getElementsByName("states")[0].selectedIndex
    ].innerText;
  } else {
    BFName.value = document.getElementsByName("bfname")[0].value;
    BLName.value = document.getElementsByName("blname")[0].value;
    BEmail.value = document.getElementsByName("bemail")[0].value;
    BMobileNum.value = document.getElementsByName("bmnum")[0].value;
    BAdLineOne.value = document.getElementsByName("badLine1")[0].value;
    BAdLineTwo.value = document.getElementsByName("badLine2")[0].value;
    BLandmark.value = document.getElementsByName("blandmark")[0].value;
    BPincode.value = document.getElementsByName("bpincode")[0].value;
    BCity.value = document.getElementsByName("bcity")[0].value;
    BState.value = document.getElementsByName("bstates")[0].options[
      document.getElementsByName("bstates")[0].selectedIndex
    ].innerText;
  }
  document.getElementById("checkoutbutton").disabled=true;
  //console.log("Clicked");
  document.getElementsByName("OrderForm")[0].submit();
  setTimeout(function (){passData(orderNum.value)}, 1500);
  
  //window.open("confirmation.html", "_self");
  // console.log(OrderNum.value);
  // console.log(model.value);
  // console.log(Quantity.value);
  // console.log(SFName.value);
  // console.log(SLName.value);
  // console.log(SEmail.value);
  // console.log(SMobileNum.value);
  // console.log(SAdLineOne.value);
  // console.log(SAdLineTwo.value);
  // console.log(SLandmark.value);
  // console.log(SPincode.value);
  // console.log(SCity.value);
  // console.log(SState.value);
  // console.log(BFName.value);
  // console.log(BLName.value);
  // console.log(BEmail.value);
  // console.log(BMobileNum.value);
  // console.log(BAdLineOne.value);
  // console.log(BAdLineTwo.value);
  // console.log(BLandmark.value);
  // console.log(BPincode.value);
  // console.log(BCity.value);
  // console.log(BState.value);
}



function testbutton() {
  console.log(orderNumber());
}
