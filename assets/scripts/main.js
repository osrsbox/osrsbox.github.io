// Set height for home page header overlay
$(document).ready(function(){
    $('.header').height($(window).height() - $('.navbar').height());
   })

// Randomize header background image for home and 404 pages
var upperLimit = 3;
var randomNum = Math.floor((Math.random() * upperLimit) + 1);    
$("header").css("background-image","url('/assets/img/header/" + randomNum + ".png')");

// Scroll animation for home page chevron-down icon
$(".header a").click(function(){
    $("body,html").animate({
        scrollTop:$("#" + $(this).data('value')).offset().top
    },1000)
})

// Lightbox plugin listener
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});