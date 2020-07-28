function hasNumber(myString) {
  return /\d/.test(myString);
}

function inputToTimer(input_value) {

//format and send input value to timer field

    if(hasNumber(input_value)){
      if(input_value.replace(/[^0-9]/g, '') < 10 && input_value.replace(/[^0-9]/g, '') > 0) {
        document.querySelector('.timer span').textContent = "0" + input_value.replace(/[^0-9]/g, '') + ":00";
      } else if(input_value.replace(/[^0-9]/g, '') == 0) {
        document.querySelector('.timer span').textContent = "00:00";
      } else {
        document.querySelector('.timer span').textContent = input_value.replace(/[^0-9]/g, '') + ":00";
      }
    } else {
      document.querySelector('.timer span').textContent = "00:00";
    }
}

function setInputFilter(textboxes, inputFilter) {

//input fields validation

  textboxes.forEach(function(textbox){
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
        // console.log("timer value" + this.value);
      });
    });
  });
}

setInputFilter(document.querySelectorAll(".inputs input"), function(value) {
  return /^[0-9]{0,2}$/.test(value); // Allow digits only, using a RegExp
});

