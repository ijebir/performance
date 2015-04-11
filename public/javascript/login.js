$(document).ready(function(){
	$('#loginbutton').hover(
		function(){
			$('#lock').attr("src", "images/unlock.png");
		},
		function(){
			$('#lock').attr("src", "images/lock.png");
		}
	);
});