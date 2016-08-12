angular.module('Impactrun', []).controller('HomeController', HomeController);

function HomeController($scope) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
 
    // $scope.Googleanal = function() {
    //  console.log('mycheck');
    //       // ga('send', 'event', "play_store", "download", "homepage");

    // };
     

    $scope.Googleanal = function() {
      ga('send', 'event', "play_store", "download", "homepage");
      console.log('mycheck');
    };
    var loader = function() {
      $("#loader").delay(4000).fadeOut(400, function() {
      $("body").fadeIn(400);
      });
     };
 
    
     

$(function () {
  // initialize skrollr if the window width is large enough
  if ($(window).width() > 480) {
    skrollr.init({
    render: function(data){
    document.querySelector(".whereami").innerHTML = data.curTop;
  }});
  }

  // disable skrollr if the window is resized below 768px wide
  $(window).on('resize', function () {
    if ($(window).width() <= 480) {
      skrollr.init().destroy(); // skrollr.init() returns the singleton created above
    }
  });
});

// window.onscroll = function(){
//   var frame4 = document.querySelector(".frame4");
//   console.log(frame4.classList.contains("skrollable-between"));
// if(frame4.classList.contains("skrollable-between")){
//   document.body.style.cursor = 'auto';
// }
// }
$('#changingcontainer h1:gt(0)').hide();
setInterval(function(){
    $('#changingcontainer h1:first-child').fadeOut('slow')
     .next('h1').fadeIn('slow')
     .end().appendTo('#changingcontainer');}, 
     2000);

$('#changingcontainersec h1:gt(0)').hide();
setInterval(function(){
    $('#changingcontainersec h1:first-child').fadeOut('slow')
     .next('h1').fadeIn('slow')
     .end().appendTo('#changingcontainersec');}, 
     2000);



    $('#Causecontainer p:gt(0)').hide();
setInterval(function(){
    $('#Causecontainer p:first-child').fadeOut('slow')
     .next('p').fadeIn('slow')
     .end().appendTo('#Causecontainer');}, 
     2000);

    $('#Causecontainersec p:gt(0)').hide();
setInterval(function(){
    $('#Causecontainersec p:first-child').fadeOut('slow')
     .next('p').fadeIn('slow')
     .end().appendTo('#Causecontainersec');}, 
     2000);

    $('#Causeimg div:gt(0)').hide();
setInterval(function(){
    $('#Causeimg div:first-child').fadeOut('slow')
     .next('div').fadeIn('slow')
     .end().appendTo('#Causeimg');}, 
     2000);

    $('#Causeimgsec div:gt(0)').hide();
setInterval(function(){
    $('#Causeimgsec div:first-child').fadeOut('slow')
     .next('div').fadeIn('slow')
     .end().appendTo('#Causeimgsec');}, 
     2000);

    

    $(document).ready(function() {
        loader();
    });

}