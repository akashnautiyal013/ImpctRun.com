angular.module('Impactrun', []).controller('HomeController', HomeController);

function HomeController($scope,$location) {
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
     var keywords = ["Family", "Friends", "Yourself","Society"];
      var colours = ["#1C3490", "#1C3490", "#1C3490", "#1C3490"];
      var count = 1;
      setInterval(function(){    
          $("h1#cycle-fade").fadeOut(400, function(){        
          $(this).html(keywords[count]).css("color", colours[count]);
          count++;        
            if(count == keywords.length)            
                count = 0;        
                $(this).fadeIn(400);    
            });
          }, 2000);

      var causekeywords = ["To help a poor kid go to school","To support a farmer through rough drought days","To help a cancer victim through their tough battle",];
      var causecount = 1;
      setInterval(function(){    
          $("h1#causes").fadeOut(400, function(){        
          $(this).html(causekeywords[causecount]).css("color", colours[causecount]);
          causecount++;        
            if(causecount == causekeywords.length)            
                causecount = 0;        
                $(this).fadeIn(400);    
            });
          }, 2000);
      var causekeywordimg = ["To help a poor kid go to school","To support a farmer through rough drought days","To help a cancer victim through their tough battle",];
      var causeimg = ["../ImpactRunSiteImages/ImpactRun_Img3.jpg",
                     "../ImpactRunSiteImages/26b.jpg",
                      "../ImpactRunSiteImages/ImpactRun_Img6.jpg"];
      var causecountimg = 1;
      setInterval(function(){    
          $("img#causesImg").fadeOut(400, function(){        
          $(this).html(causekeywordimg[causecountimg]).css("background-image", 'url(' +causeimg[causecountimg] +')');
          causecountimg++;        
            if(causecountimg == causekeywordimg.length)            
                causecountimg = 0;        
                $(this).fadeIn(400);    
            });
          }, 2000);
 





      var keywords2 = ["Family", "Friends", "Yourself","Society"];
      var colours2 = ["#1C3490", "#1C3490", "#1C3490", "#1C3490"];
      var count2 = 1;
      setInterval(function(){    
          $("h1#cycle-fade2").fadeOut(400, function(){        
          $(this).html(keywords2[count2]).css("color", colours2[count2]);
          count2++;        
            if(count2 == keywords2.length)            
                count2 = 0;        
                $(this).fadeIn(400);    
            });
          }, 2000);

      var causekeywords2 = ["To help a poor kid go to school","To support a farmer through rough drought days","To help a cancer victim through their tough battle",];
      var causecount2 = 1;
      setInterval(function(){    
          $("h1#causes2").fadeOut(400, function(){        
          $(this).html(causekeywords2[causecount]).css("color", colours2[causecount2]);
          causecount2++;        
            if(causecount2 == causekeywords2.length)            
                causecount2 = 0;        
                $(this).fadeIn(400);    
            });
          }, 2000);
      var causekeywordimg2 = ["To help a poor kid go to school","To support a farmer through rough drought days","To help a cancer victim through their tough battle",];
      var causeimg2 = ["../ImpactRunSiteImages/26b.jpg",
                       " ../ImpactRunSiteImages/ImpactRun_Img6.jpg ",
                       "../ImpactRunSiteImages/ImpactRun_Img3.jpg"];
      var causecountimg2 = 1;
      setInterval(function(){    
          $("img#causesImg2").fadeOut(400, function(){        
          $(this).html(causekeywordimg2[causecountimg2]).css("background-image", 'url(' +causeimg2[causecountimg2] +')');
          $(this).html(causekeywordimg2[causecountimg2[0]]).css("background-position", '40% 90%');
          causecountimg2++;        
            if(causecountimg2 == causekeywordimg2.length)            
                causecountimg2 = 0;        
                $(this).fadeIn(400);    
            });
          }, 2000);
// $('#changingcontainer h1:gt(0)').hide();
// setInterval(function(){
//     $('#changingcontainer h1:first-child').fadeOut('fast')
//      .next('h1').fadeIn('slow')
//      .end().appendTo('#changingcontainer');}, 
//      4000);

// $('#changingcontainersec h1:gt(0)').hide();
// setInterval(function(){
//     $('#changingcontainersec h1:first-child').fadeOut('fast')
//      .next('h1').fadeIn('fast')
//      .end().appendTo('#changingcontainersec');}, 
//      4000);



//     $('#Causecontainer p:gt(0)').hide();
// setInterval(function(){
//     $('#Causecontainer p:first-child').fadeOut('slow')
//      .next('p').fadeIn('slow')
//      .end().appendTo('#Causecontainer');}, 
//      3000);

//     $('#Causecontainersec p:gt(0)').hide();
// setInterval(function(){
//     $('#Causecontainersec p:first-child').fadeOut('slow')
//      .next('p').fadeIn('slow')
//      .end().appendTo('#Causecontainersec');}, 
//      3000);

    $('#Causeimg div:gt(0)').hide();
setInterval(function(){
    $('#Causeimg div:first-child').fadeOut('slow')
     .next('div').fadeIn('slow')
     .end().appendTo('#Causeimg');}, 
     4000);

    $('#Causeimgsec div:gt(0)').hide();
setInterval(function(){
    $('#Causeimgsec div:first-child').fadeOut('slow')
     .next('div').fadeIn('slow')
     .end().appendTo('#Causeimgsec');}, 
     4000);

    

    $(document).ready(function() {
        loader();
     });

}