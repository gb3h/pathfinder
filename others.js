/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.profile')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var slideIndex = 1;
var slides = document.getElementsByClassName("mySlides");
showSlides(slideIndex);

function plusSlides(n) {
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  showSlides(slideIndex += n);

}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  slides[slideIndex - 1].style.display = "block";
}
