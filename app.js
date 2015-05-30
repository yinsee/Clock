var App = App || {

	defaultPhotos: [ 
		{ user: "avatar", avatar: "images/avatar.png", photo:"images/background.jpg" }
	],
	
	defaultCheckins: [ 
		{ user: "avatar", avatar: "images/avatar.png", location: "Penang Science Cluster" }, 
	],

	defaultStatus: [
		{ user: "avatar", avatar: "images/avatar.png", source:"facebook", message: "Aenean lacinia bibendum nulla sed consectetur." }, 
	],

	photoQueue: [],
	photoQueueCurrentIndex: 0,

	statusQueue: [],
	statusQueueCurrentIndex: 0,

	checkinQueue: [],
	checkinQueueCurrentIndex: 0,

	maxQueueSize: 25,

	init: function() {
		App.startClock();
		App.startPhoto();
		App.startCheckin();
		App.startStatus();
	},

	startClock: function() {
		App.updateClock();
		window.setInterval(App.updateClock, 500);
	}, 

	startPhoto: function() {
		$(App.defaultPhotos).each(function(i,p) {
			App.addPhoto(p.user, p.avatar, p.photo);
		});
		App.updatePhoto();
		window.setInterval(App.updatePhoto, 5000);
	}, 

	startStatus: function() {
		$(App.defaultStatus).each(function(i,p) {
			App.addStatus(p.user, p.avatar, p.source, p.message);
		});
		App.updateStatus();
		window.setInterval(App.updateStatus, 5000);

	}, 

	startCheckin: function() {
		$(App.defaultCheckins).each(function(i,p) {
			App.addCheckin(p.user, p.avatar, p.location);
		});
		App.updateCheckin();
		window.setInterval(App.updateCheckin, 5000);

	},

	updateClock: function() {
		var dt = new Date();
		$('#clock .time').text(date('g:ia'), dt);
		$('#clock .date').text(date('j M Y, l'), dt);
	},

	updatePhoto: function() {
		var photo = App.photoQueue[App.photoQueueCurrentIndex];
		$('#photo').css('background-image', "url('"+photo.photo+"')");
		$('#photo .username').text(photo.user);
		$('#photo .useravatar').attr('src', photo.avatar);
		
		App.photoQueueCurrentIndex++;
		if (App.photoQueueCurrentIndex >= App.photoQueue.length) App.photoQueueCurrentIndex = 0;
	},

	updateCheckin: function() {
		var checkin = App.checkinQueue[App.checkinQueueCurrentIndex];
		$('#checkin .location').text(checkin.location);
		$('#checkin .username').text(checkin.user);
		$('#checkin .useravatar').attr('src', checkin.avatar);
		
		App.checkinQueueCurrentIndex++;
		if (App.checkinQueueCurrentIndex >= App.checkinQueue.length) App.checkinQueueCurrentIndex = 0;

	},

	updateStatus: function() {
		var status = App.statusQueue[App.statusQueueCurrentIndex];
		$('#status .message').text(status.message);
		$('#status .username').text(status.user);
		$('#status .useravatar').attr('src', status.avatar);
		
		App.statusQueueCurrentIndex++;
		if (App.statusQueueCurrentIndex >= App.statusQueue.length) App.statusQueueCurrentIndex = 0;

	},

	// user = string
	// avatar = url string
	// source = facebook | twitter
	// message = string
	addStatus: function(user, avatar, source, message) {
		App.statusQueue.push({user:user, avatar:avatar, source:source, message:message});
		while (App.statusQueue.length > App.maxQueueSize) 
		{
			App.statusQueue.shift();
		}
	},

	// user = string
	// avatar = url string
	// photo = url string
	addPhoto: function(user, avatar, photo) {
		App.photoQueue.push({user:user, avatar:avatar, photo:photo});
		while (App.photoQueue.length > App.maxQueueSize) 
		{
			App.photoQueue.shift();
		}
	},
	
	// user = string
	// avatar = url string
	// locatin = string
	addCheckin: function(user, avatar, location) {
		App.checkinQueue.push({user:user, avatar:avatar, location:location});
		while (App.checkinQueue.length > App.maxQueueSize) 
		{
			App.checkinQueue.shift();
		}
	},
	

}
