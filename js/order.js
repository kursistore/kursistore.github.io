
var currentDate = new Date();
var year = currentDate.getFullYear() -2000;
var month = currentDate.getMonth() + 1;
var date = currentDate.getDate();

if(month<10){
  month = "0"+month;
}
if(date<10){
  date="0"+date;
}

order()

function order(){
  var orderdate = date+"/"+month+"/"+(year+2000)
  var ordernumber = year+""+month+""+date;
  ordernumber= ordernumber+""+currentDate.getHours() + "" + currentDate.getMinutes() + "" + currentDate.getSeconds();

  var uri =  " Order No.: "+ordernumber
          +"\n OrderDate: "+orderdate
          +"\n Model: "+document.getElementById("model").innerText 
          +"\n Order Total: "+document.getElementById("price").innerText ;
  var url = href='https://api.whatsapp.com/send?phone=+918755837310&text='+encodeURI(uri);
  
  window.open(url, '_blank');
  console.log(uri);
}
