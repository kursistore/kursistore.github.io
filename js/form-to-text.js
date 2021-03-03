
 function WriteToFile(passForm) {

    var fso = CreateObject("Scripting.FileSystemObject");  
    var s = fso.CreateTextFile("C:\test.txt", True);
    s.writeline(document.passForm.input1.value);
    s.writeline(document.passForm.input2.value);
    s.writeline(document.passForm.input3.value);
    s.Close();
 }




// Name and Email validation Function.
function validation() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
  if (name === '' || email === '') {
    alert("Please fill all fields...!!!!!!");
    return false;
  } else if (!(email).match(emailReg)) {
    alert("Invalid Email...!!!!!!");
    return false;
  } else {
    return true;
  }
}