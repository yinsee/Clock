var Instagram = {

	configure: function() {
		Instagram.run(prompt("Enter your Instagram username", "yinsee"));

	},

   	run: function(username) {
   		
		var jsonUrl = "https://api.instagram.com/v1/users/search?q=" + username + "&client_id=b32c1d48245141378a1ed544cef9a449";

		$.ajax({
		    dataType: 'jsonp',
		    url: jsonUrl,
		    success: function(result) {              

			    $.ajax({
			    	dataType: 'jsonp',
			    	url: 'https://api.instagram.com/v1/users/'+result.data[0].id+'/media/recent?access_token=33111511.1677ed0.afcecaf54e6444f486255de7dc4d1637',
			    	success: function(result) {
			    		$(result.data).each(function(idx, obj) {
				    		App.addPhoto(obj.user.full_name, obj.user.profile_picture, obj.images.standard_resolution.url);
			    		});
			    	}
			    });

			}
		});
	}
};