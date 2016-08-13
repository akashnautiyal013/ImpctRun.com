
angular.module('Impactrun', []).controller('AppDownloadController',AppDownloadController);

function AppDownloadController($scope,$location){

	var Redirect= function() {
	 window.location="https://play.google.com/store/apps/details?id=com.sharesmile.share";
	}
    
    $(document).ready(function() {
      Redirect();
     });
} 
