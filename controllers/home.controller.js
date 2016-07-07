angular.module('Impactrun', []).controller('HomeController', HomeController);

function HomeController($scope, $location, anchorSmoothScroll) {
 $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);

    };
    var loader = function() {
        $("#loader").delay(4000).fadeOut(400, function() {
            $("body").fadeIn(400);
        });
    };
 
    
     
var s = skrollr.init({
  render: function(data){
    document.querySelector(".whereami").innerHTML = data.curTop;
  }
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



    $('#Causecontainer p:gt(0)').hide();
setInterval(function(){
    $('#Causecontainer p:first-child').fadeOut('slow')
     .next('p').fadeIn('slow')
     .end().appendTo('#Causecontainer');}, 
     2000);

    $('#Causeimg div:gt(0)').hide();
setInterval(function(){
    $('#Causeimg div:first-child').fadeOut('slow')
     .next('div').fadeIn('slow')
     .end().appendTo('#Causeimg');}, 
     2000);

    

    $(document).ready(function() {
        loader();
    });

}