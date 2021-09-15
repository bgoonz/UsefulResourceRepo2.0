Meteor.startup(function(){
	if (!Websites.findOne()){// nothing in the database yet
		var site = {"url":"http://www.google.com",
					"createdOn":new Date(),
					"createdBy":"Michael"};// create a simple object to insert to the collectoin
		Websites.insert(site);
		site = {"url":"http://www.yeeking.net",
					"createdOn":new Date(),
					"createdBy":"Janet"};// create a simple object to insert to the collectoin
		Websites.insert(site);
		site = {"url":"http://www.coursera.org",
					"createdOn":new Date(),
					"createdBy":"Jose"};// create a simple object to insert to the collectoin
		Websites.insert(site);
	}
});
