var Facebook = {

	configure: function() {
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				Facebook.run();
			}
			else {
				FB.login(function(response) {
					if(response.status === 'connected') {
						Facebook.run();
					}
				}, {scope: 'user_posts'});
			}
		});
	},

   	run: function() {
   		FB.api('/me/posts?limit=15', function(response) {
				$(response.data).each(function(idx, obj) {
					if (obj.type=="status") {
					//n(user, avatar, source, message) {
						if (obj.message!=undefined) {
							App.addStatus(obj.from.name, "http://graph.facebook.com/"+obj.from.id+"/picture", "facebook", obj.message);
						}
						if (obj.place!=undefined) {
							//user, avatar, location
							App.addCheckin(obj.from.name, "http://graph.facebook.com/"+obj.from.id+"/picture", obj.place.name);
						}
					}
					else if (obj.type=="photo") {
					// user, avatar, photo
						App.addPhoto(obj.from.name, "http://graph.facebook.com/"+obj.from.id+"/picture", obj.picture);
					}
				});
			});
	}
};