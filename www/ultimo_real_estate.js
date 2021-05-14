
/*ACCORDION SCRIPTING*/

const accordionBtns = document.querySelectorAll(".accordion");
accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    
    this.classList.toggle("is-open");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };
});


/*END OF ACCORDION SCRIPTING*/




/*FORM HANDLING SCRIPT*/

function validation()
{
  let x = document.getElementById("name");
  if ( x == "")
  {
    document.getElementById("error-1").innerHTML = "please give name";
  }
}

/*END OF FORM HANDLING SCRIPT*/




/*SLIDESHOW GALLERY SCRIPTING SECTION*/

/*Code is based on w3schools slideshow gallery demo*/

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("smol");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

