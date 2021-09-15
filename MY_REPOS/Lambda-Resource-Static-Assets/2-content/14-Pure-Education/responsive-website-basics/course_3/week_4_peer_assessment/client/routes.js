Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// the main route. showing the list of sites.
Router.route('/', function () {
  this.render('siteList');
});

// this route is for the discussion page for a site
Router.route('/discussSite/:_id', function () {
    var siteId = this.params._id;
    site = Websites.findOne({_id:siteId});
    this.render('discussSite', {data:site});
});
