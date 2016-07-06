
angular.module('Impactrun', []).controller('BlogController',BlogController);

function BlogController($scope,$location, anchorSmoothScroll){

var s = skrollr.init({
  render: function(data){
    document.querySelector(".whereami").innerHTML = data.curTop;
  }
});

 var loader = function() {
        $("#loader").delay(4000).fadeOut(4000, function() {
            $("body").fadeIn(4000);
        });
    };
 
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
 $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('bottom');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);

    };



    $('#Causecontainer p:gt(0)').hide();
setInterval(function(){
    $('#Causecontainer p:first-child').fadeOut('slow')
     .next('p').fadeIn('slow')
     .end().appendTo('#Causecontainer');}, 
     2000);

    $('#Causeimg img:gt(0)').hide();
setInterval(function(){
    $('#Causeimg img:first-child').fadeOut('slow')
     .next('img').fadeIn('slow')
     .end().appendTo('#Causeimg');}, 
     2000);

} 