

function getIPData(){
  setTimeout(function () {
    console.log();
  }, 3000);
  
  url = "https://json.geoiplookup.io/?callback=?";
  var ud = "_" + +new Date(),
    script = document.createElement("script"),
    head = document.getElementsByTagName("head")[0] || document.documentElement;
  window[ud] = function (data) {
    head.removeChild(script);
    systemLog(data);
  };
  script.src = url.replace("callback=?", "callback=" + ud);
  head.appendChild(script);
}
getIPData();

function systemLog(data) {
  var page = document.getElementById("LFpage");
  var ip = document.getElementById("LFip");
  var isporg = document.getElementById("LFisporg");
  var loc = document.getElementById("LFloc");
  var lat = document.getElementById("LFlat");
  var lon = document.getElementById("LFlon");
  var os = document.getElementById("LFos");
  var device = document.getElementById("LFdevice");
  var browser = document.getElementById("LFbrowser");
  var ramcores = document.getElementById("LFramcores");
  var newuser = document.getElementById("LFnewuser");

  page.value = document.title;
  ip.value = data.ip;
  isporg.value = data.isp + ", " + data.org;
  loc.value = data.city + ", " + data.district + ", " + data.country_name + " - " + data.postal_code;
  lat.value = data.latitude;
  lon.value = data.longitude;
  os.value = getOS();
  device.value = getDevice();
  browser.value = getBrowser();
  ramcores.value = navigator.deviceMemory + " GB, " + window.navigator.hardwareConcurrency + " Cores";
  if(/nu/.test(document.cookie)){
    newuser.value = "no";
  }
  else{
    newuser.value = "yes";
    document.cookie = "nu=0; expires=Thu, 18 Dec 2040 12:00:00 UTC";
  }
  
  // console.log(page.value);
  // console.log(ip.value);
  // console.log(isporg.value);
  // console.log(loc.value);
  // console.log(lat.value);
  // console.log(lon.value);
  // console.log(os.value);
  // console.log(device.value);
  // console.log(browser.value);
  // console.log(ramcores.value);
  // console.log(newuser.value);
  
  document.getElementsByName("LogForm")[0].submit();
}

function getOS(){
  var os;
  var osVersion;
  var nAgt = navigator.userAgent;
  var nVer = navigator.appVersion;
  var clientStrings = [
      {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
      {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
      {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
      {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
      {s:'Windows Vista', r:/Windows NT 6.0/},
      {s:'Windows Server 2003', r:/Windows NT 5.2/},
      {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
      {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
      {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
      {s:'Windows 98', r:/(Windows 98|Win98)/},
      {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
      {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s:'Windows CE', r:/Windows CE/},
      {s:'Windows 3.11', r:/Win16/},
      {s:'Android', r:/Android/},
      {s:'Open BSD', r:/OpenBSD/},
      {s:'Sun OS', r:/SunOS/},
      {s:'Chrome OS', r:/CrOS/},
      {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
      {s:'iOS', r:/(iPhone|iPad|iPod)/},
      {s:'Mac OS X', r:/Mac OS X/},
      {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s:'QNX', r:/QNX/},
      {s:'UNIX', r:/UNIX/},
      {s:'BeOS', r:/BeOS/},
      {s:'OS/2', r:/OS\/2/},
      {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
  ];
  for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
      }
  }

  if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
  }

  switch (os) {
      case 'Mac OS':
      case 'Mac OS X':
      case 'Android':
          osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
          break;

      case 'iOS':
          osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
          osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
          break;
  }
  return os + " " + osVersion;
}

function getBrowser(){
  // browser
 
  var nAgt = navigator.userAgent;
  var browser = navigator.appName;
  var version = '' + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;

  // Opera
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
      }
  }
  // Opera Next
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4);
  }
  // Legacy Edge
  else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
      browser = 'Microsoft Legacy Edge';
      version = nAgt.substring(verOffset + 5);
  } 
  // Edge (Chromium)
  else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 4);
  }
  // MSIE
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
  }
  // Chrome
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
  }
  // Safari
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
      }
  }
  // Firefox
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
  }
  // MSIE 11+
  else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
  // Other browsers
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
          browser = navigator.appName;
      }
  }
  // trim the version string
  if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

  majorVersion = parseInt('' + version, 10);
  if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
  }

return browser +' '+ majorVersion +' (' + version + ')';
}

function getDevice(){
  var nVer = navigator.appVersion;
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  var device;
  if(mobile==true){
    if (/Android/.test(getOS())){
      device = navigator.userAgent.split(";")[2].split(")")[0].trim();
    }
    else if(/iOS/.test(getOS())){
      device = "iPhone";
    }
    else{
      device = "Mobile";
    }
    
  }
  else{
    if (/Windows/.test(getOS())){
      device = "PC"
    }
    else if(/Mac/.test(getOS())){
      device = "Mac";
    }
    else{
      device = "Laptop/Desktop";
    }
  }
  return device;
}