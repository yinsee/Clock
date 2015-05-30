var Twitter = {

	configure: function() {
		///... do whatever you to do 
		window.open('http://www.splory.my/Clock/twitter/process.php');
	},

   	run: function(username) {
		alert(username);
   		console.log('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+username+'&count=5');
	}
};