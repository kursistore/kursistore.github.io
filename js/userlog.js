

var a;

// $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
//   a=JSON.stringify(data);
//   console.log("a: \n"+a);
// });

url='https://json.geoiplookup.io/?callback=?'
var ud = '_' + +new Date, script = document.createElement('script'), 
head = document.getElementsByTagName('head')[0] || document.documentElement; 
window[ud] = function(data) {
  head.removeChild(script);
  document.getElementById("ipinfo").innerText=JSON.stringify(data,null," ");
};
script.src = url.replace('callback=?', 'callback=' + ud);
head.appendChild(script);

var b;
b = navigator.deviceMemory+"\n"+
    // navigator.connection.effectiveType+"\n"+
    // navigator.connection.rrt+"\n"+
    // navigator.connection.downlink+"\n"+
    // navigator.connection.saveData+"\n"+
    window.navigator.hardwareConcurrency+"\n"+
    navigator.userAgent;

document.getElementById("useragent").innerText=b;


