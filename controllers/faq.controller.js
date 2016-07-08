
angular.module('Impactrun', []).controller('FaqController',FaqController);

function FaqController($scope){
$(function(){
  var _collapseList = $('ul.collapsible-doodads');
  $("ul.collapsible-doodads li div.gui-button").on('click', function(e) {
    $(_collapseList).children('li.active').removeClass('active');
    $(this).parent('li').addClass('active');    
  });
});
var loader = function() {
        $("#loader").delay(2000).fadeOut(400, function() {
            $("body").fadeIn(400);
        });
    };
} 