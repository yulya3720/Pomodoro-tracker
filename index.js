function el(evt) {
    document.querySelector('.timer span').textContent = evt.replace(/[^0-9]/g, '') + ":00";
}
