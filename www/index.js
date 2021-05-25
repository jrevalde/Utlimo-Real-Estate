//JQUERY CODE STARTS HERE

$(document).ready(function() {

    
    //JQUERY FORM VALIDATION STARTS HERE
    //initialises error messages to be hidden
    $("fname_error_message").hide();
    $("fmobile_error_message").hide();
    $("email_error_message").hide();
    $("radio_error_message").hide();
    $("checkbox_error_message").hide();
    $("dropdown_error_message").hide();
    $("comments_error_message").hide();

    
    var error_fname = false;
    var error_email = false;
    var error_mobile = false;
    var error_radio = false;
    var error_checkbox = false;
    var error_dropdown = false;
    var error_comments = false;
    
    //when the user clicks away it activates the corresponding function
    //so like, say if someone makes an error and theh correct it. the error will go away,
    //no need to refresh teh page.
    $("#form_fname").focusout(function() {
        check_fname();
    });


    $("#form_email").focusout(function() {
        check_email();
    });

    $("#form_mobile").focusout(function() {
        check_mobile();
    });

    $("#radio").focusout(function() {
        check_radio();
    });

    $("#checkbox").focusout(function() {
        check_checkbox();
    });

    $("#bedrooms").focusout(function() {
        check_dropdown();
    });

    $("#bedrooms").focusout(function() {
        check_comments();
    });

    /* So basically all these functions work the same way.
        1. they check the input via copy-pasted regex snippets and also if inputs are empty or not.
        2. either show or not show the errors.

        All the regex snippets are from stack overflow
        https://stackoverflow.com/ 
    */
    function check_fname() {
        //var pattern = /^[a-z A-Z]*$/ doesn't account for spaces;
        var pattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
        var fname = $("#form_fname").val();
        if( pattern.test(fname) && fname !== "")
        {
            $("#fname_error_message").hide();
            $("#form_fname").css("border-bottom", "2px solid #34F458");
        }
        else 
        {
            $("#fname_error_message").html("invalid name");
            $("#fname_error_message").show();
            $("#form_fname").css("border-bottom", "2px solid #F90A0A");
            error_fname = true;
        }
    }

    function check_mobile() {

        //makes sure only 10 digits allowed and no special characters.
        var pattern = /^\d{10}$/;
        var mobile = $("#form_mobile").val();
        if( pattern.test(mobile) && mobile !== "")
        {
            $("#mobile_error_message").hide();
            $("#form_mobile").css("border-bottom", "2px solid #34F458");
        }
        else 
        {
            $("#mobile_error_message").html("need 10 digits for mobile");
            $("#mobile_error_message").show();
            $("#form_mobile").css("border-bottom", "2px solid #F90A0A");
            error_mobile = true;
        }
    }
    

    function check_email() 
    {
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $("#form_email").val();
        if (pattern.test(email) && email !== '')
        {
           $("#email_error_message").hide();
           $("#form_email").css("border-bottom","2px solid #34F458");
        } 
        else 
        {
           $("#email_error_message").html("Invalid Email");
           $("#email_error_message").show();
           $("#form_email").css("border-bottom","2px solid #F90A0A");
           error_email = true;
        }
     }

    function check_radio() 
    {

        if($('input[type=radio][name=buy-sell-rent]:checked').length == 0)
        {
            $("#radio_error_message").html("Select at least one");
            $("#radio_error_message").show();
            error_radio = true;
        }
        else
        {
            $("#radio_error_message").hide();
        }      
    }    

    function check_checkbox()
    {
        if($("input:checkbox").filter(":checked").length < 1)
        {
            $("#checkbox_error_message").html("Select at least one");
            $("#checkbox_error_message").show();
            error_checkbox = true;
        }
        else
        {
            $("#checkbox_error_message").hide();
        }
    }
        
    function check_dropdown()
    {
        var bedrooms = $("#bedrooms");
       if (bedrooms.val() === "")
       {
            $("#dropdown_error_message").html("Select at least one");
            $("#dropdown_error_message").show();
            error_dropdown = true;
       }
       else
        {
            $("#dropdown_error_message").hide();
        }
    }
    
    function check_comments()
    {
        var comment = $("#comments").val();
        if (comment !== "")
        {
           
                $("#comments_error_message").hide();
        }
        else 
        {
            $("#comments_error_message").html("please leave a comments");
            $("#comments_error_message").show();
            error_mobile = true;
        }
        
    }

    

    //the actual function that does all the work. honestly it's pretty straightforward to look at.
     $("#registration_form").submit(function(e) {

        //Assumes no errors until the functions are called
        error_fname = false;
        error_email = false;
        error_mobile = false;
        error_radio = false;
        error_checkbox = false;
        error_dropdown = false;
        error_comments = false;

        //each function is called for its corresponding input returning either true or false error
        check_fname();
        check_mobile();
        check_email();
        check_radio();
        check_checkbox();
        check_dropdown();
        check_comments();
        
        //this bit is just to extract checkbox values to print out. Yes there's prolly a better way but you'll have to pay me >:)
        var checkbox_array = new Array();
        $('input[name="checka"]:checked').each(function(){
            checkbox_array.push(this.value);
        })

        //basically what is says
        if (error_fname === false && error_email === false && error_mobile === false && error_radio === false && error_checkbox === false && error_dropdown === false && error_comments === false) {
            //alert("Registration Successfull")
            
            var answer = confirm(
                "your name is " + $("#form_fname").val() + "\n" 
                + "your mobile is " + $("#form_mobile").val() + "\n" 
                + "your email is " + $("#form_email").val() + "\n" 
                + "you want to " + $('input[type=radio][name=buy-sell-rent]:checked').val() + " property" + "\n"
                + "your are interested in " + checkbox_array + "\n" 
                + "your prefer " + $("#bedrooms option:selected").text() + "\n" 
                + "you said " + $("#comments").val() + "\n"
                );
            
            
            if (answer)
            {
                //if the user is ok with form details do this stuff.
                alert("Enquiry sent!");
                return true;
            }
            else{
                //this part is just so the confirm box wont Post and refresh after clicking cancel.
                e.preventDefault();
            }
        } 
        else 
        {
           alert("Please Fill the form Correctly");
           return false;
        }


    });

    //END OF JQUERY FORM VALIDATION


    //JQUERY ACCORDION SCRIPTING

    $('.accordion-list > li > .answer').hide();
    
    /* basically just selects the div element and switches
    the classes between active and answer. I dunno what else
    to say, jquery does make life very easy. */
    $('.accordion-list > li').click(function() {
        if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
        } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
        }
        return false;
    });

    //END OF ACCORDION SCRIPTING

});

//END OF JQUERY SECTION


/*SLIDESHOW GALLERY SCRIPTING SECTION*/

/*Code is based on w3schools slideshow gallery demo*/


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    //the value of n here is always either 1 or -1
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides"); //so this creates an array 0 1 2
  var dots = document.getElementsByClassName("smol"); //another array for the cute little thumbnails
  var captionText = document.getElementById("caption");//we're gonna add some html here later.
  if (n > slides.length) {slideIndex = 1}// wraps the set of pics
  if (n < 1) {slideIndex = slides.length}//ditto
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
//END OF SLIDESHOW GALLERY SCRIPTING