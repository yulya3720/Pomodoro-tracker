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



