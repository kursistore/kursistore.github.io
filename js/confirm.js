//to prevent multiple order submission by going back
(function (global) {
  if (typeof global === "undefined") {
    console.log("Error");
    throw new Error("window is undefined");
  }

  var _hash = "!";
  var noBackPlease = function () {
    global.location.href += "#";

    // Making sure we have the fruit available for juice (^__^)
    global.setTimeout(function () {
      global.location.href += "!";
    }, 50);
  };

  global.onhashchange = function () {
    if (global.location.hash !== _hash) {
      global.location.hash = _hash;
    }
  };

  global.onload = function () {
    noBackPlease();
    //parseData();
    // Disables backspace on page except on input fields and textarea..
    document.body.onkeydown = function (e) {
      var elm = e.target.nodeName.toLowerCase();
      if (e.which === 8 && elm !== "input" && elm !== "textarea") {
        e.preventDefault();
      }
      // Stopping the event bubbling up the DOM tree...
      e.stopPropagation();
    };
  };
})(window);

var url = document.location.href,
  params = url.split("?")[1].split("&"),
  data = {},
  tmp;
for (var i = 0, l = params.length; i < l; i++) {
  tmp = params[i].split("=");
  data[tmp[0]] = tmp[1];
}
document.getElementById("orderNo").innerHTML = "Order No. " + data.o;
