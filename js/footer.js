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
