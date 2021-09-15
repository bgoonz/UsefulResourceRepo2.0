Dexter = function () {
	'use strict';

	this.Cheerio = Npm.require('cheerio');
	this.Request = Npm.require('request');
	this.Future = Npm.require('fibers/future');
	this.service = 'dexter';
	this.jar;
	this.url;

};


Dexter.prototype.login = function (loginData) {
	var that = this;
	var user,
		cookie,
		expires;
	var loginAttempt = {};

	// If login by userId
	user = Meteor.users.findOne(loginData.userId);
	if (!loginData.username &&
		loginData.userId &&
		user.services &&
		user.services[this.service] &&
		user.profile
	) {
		cookie = user.services[this.service].cookie.cookieStr;
		expires = new Date(user.services[this.service].cookie.expires);
		var now = new Date();

		// Already logged in
		if (cookie && expires > now) {
			loginAttempt.success = true;
			return loginAttempt;
		};

		loginData.username = user.services[this.service].username;
		loginData.password = new Buffer(user.services[this.service].password, 'base64').toString('utf8');
		loginData.school = user.profile.school;
	};

	// Check that all necessary data exists
	if (!loginData.username || !loginData.password || !loginData.school) {
		loginAttempt.error = new Meteor.Error(500, 'Missing login data');
		return loginAttempt;
	};


	// Find the school in ServiceConfiguration
	var config = ServiceConfiguration.configurations.findOne({
		school: loginData.school
	}, {
		services: {
			$elemMatch: {
				service: this.service
			}
		}
	});

	// Get the schools url for this service
	this.url = config.services.filter(function (chain) {
		return chain.service === that.service;
	})[0];
	if (this.url)
		this.url = this.url.url;

	// Check that the url is found
	if (!this.url) {
		loginAttempt.error = new Meteor.Error(500, 'Service not configured');
		return loginAttempt;
	};

	// Start of login
	// --------------
	var form = {
		loginMethod: 'Dexter',
		username: loginData.username,
		password: loginData.password
	};
	this.jar = this.Request.jar();
	this.jar.setCookie(this.Request.cookie('JSESSIONID=nyancat.jolasveinn; Path=/; Secure'), this.url); // Magic. Do not touch
	var fut = new this.Future();

	this.Request({
			url: this.url + '/login.asp',
			form: form,
			method: 'POST',
			jar: this.jar,
			followAllRedirects: true
		},
		Meteor.bindEnvironment(function (e, r, body) {
			// Check if successful. No better way exists
			if (r.request.redirects[1] && r.request.redirects[1].redirectUri === that.url + 'default.asp?page=auth/common/startpage') {
				var id = that.id();
				if (!id) {
					loginAttempt.error = new Meteor.Error(500, 'Failed to fetch id');
					return loginAttempt;
				};

				var expires = new Date();
				loginAttempt.serviceData = {
					id: id,
					cookie: {
						cookieStr: that.jar.getCookieString(that.url),
						expires: expires
					},
					username: loginData.username,
					password: new Buffer(loginData.password).toString('base64')
				}
				loginAttempt.success = true;
				fut['return'](loginAttempt);
			} else {
				loginAttempt.error = new Meteor.Error(403, 'Error 403: Unauthorized');
				fut['return'](loginAttempt);
			}
		}));

	return fut.wait();
};

Dexter.prototype.id = function () {
	var that = this;
	var fut = new this.Future();
	this.Request({
		url: this.url + '/Default.asp?page=gy/bas/schedule_3step$student.xml',
		method: 'GET',
		jar: this.jar,
		followAllRedirects: true
	}, function (e, r, body) {
		var $ = that.Cheerio.load(body);
		var id = $('.clsMainContent a').attr('href').split('StudentId=')[1];
		fut['return'](id);
	});

	return fut.wait();
};

Dexter.prototype.userInfo = function () {
	var that = this;
	var fut = new this.Future();
	this.Request({
		url: this.url + '/Default.asp?page=gy/bas/studentcard',
		method: 'GET',
		jar: this.jar,
		followAllRedirects: true
	}, function (e, r, body) {
		var $ = that.Cheerio.load(body);
		var p = $('td[width=200]');
		var info = {
			fullName: p.eq(0).text(),
			birthDate: p.eq(1).text(),
			address: p.eq(2).text(),
			className: p.eq(3).text(),
			zipCode: p.eq(4).text(),
			classId: p.eq(5).text(),
			phone: p.eq(6).text(),
			email: p.eq(7).text()
		};

		fut['return'](info);
	});

	return fut.wait();
};

Dexter.prototype.userSchedule = function (time) {
	var that = this;
	var fut = new this.Future();
	var lessonTime = moment(time).startOf('week');
	var monday = lessonTime.format('L');
	var sunday = moment(time).endOf('week').format('L');
	var form = {
		dates$$: 'weekselection=yes&startdate=' + monday + '&enddate=' + sunday
	};

	this.Request({
		url: this.url + '/Default.asp?page=gy/bas/schedule_3step$student.xml',
		method: 'POST',
		form: form,
		jar: this.jar,
		followAllRedirects: true
	}, function (e, r, body) {
		var $ = that.Cheerio.load(body);

		var weekDay = 0;
		var day = 0;
		var scheduleArray = [];
		var dayArray = [];


		$('table.clsDayTable').each(function (i, e) { // Each day
			dayArray = [];
			$(e).find('td div.clsScheduleInfo nobr').each(function (i, e) { // Each lesson

				var lines = $(e).text().split('\n');

				var timeStart = lines[0].slice(0, 5).split(':');
				var timeEnd = lines[0].slice(8, 13).split(':');
				var courseInfo = lines[1].split(String.fromCharCode(160));

				var todayData = {
					start: lessonTime.hours(timeStart[0]).minutes(timeStart[1]).format(),
					end: lessonTime.hours(timeEnd[0]).minutes(timeEnd[1]).format(),
					title: courseInfo[1].slice(0, -1),
					teacher: {
						code: lines[3].split(String.fromCharCode(160))[1].trim(),
						name: lines[4].split(String.fromCharCode(160)).slice(1).join(' ').trim()
					},
					location: lines[2].split(String.fromCharCode(160))[1].trim(),
					code: courseInfo[2].trim(),
					group: lines[5].split(String.fromCharCode(160))[1].trim(),
					type: 'lesson'
				}
				dayArray.push(todayData);
			});
			scheduleArray.push(dayArray);
			day++;
			lessonTime.weekday(day);
		});

		fut['return'](scheduleArray);
	});

	return fut.wait();
};

Dexter.prototype.courses = function (time) {
	var that = this;
	var fut = new this.Future();
	var row, columns, courseInfo;
	var form = {
		ShowStudyplan: 2
	};

	this.Request({
		url: this.url + '/Default.asp?page=gy/bas/studyplan',
		method: 'POST',
		form: form,
		jar: this.jar,
		followAllRedirects: true
	}, function (e, r, body) {
		var $ = that.Cheerio.load(body);

		var courseArray = [];

		$('table.clsText[width=780]').each(function (i, e) {
			var tables = $(e).find('tr');
			tables.each(function (i, e) {
				row = $(e);

				if (!row.hasClass('clsListHead') &&
					!row.find('span').length &&
					i < tables.length - 2) {
					columns = row.find('td');

					courseInfo = {
						code: columns.eq(0).text().trim(),
						title: columns.eq(1).text().trim(),
						teacherCode: columns.eq(2).text().trim(),
						duration: columns.eq(3).text().trim(),
						points: columns.eq(4).text().trim(),
						hours: columns.eq(5).text().trim(),
						type: columns.eq(6).text().trim(),
						grade: columns.eq(7).text().trim()
					};

					courseArray.push(courseInfo);
				};
			});
		});

		form.ShowStudyplan = 4;
		that.Request({
			url: that.url + '/Default.asp?page=gy/bas/studyplan',
			method: 'POST',
			form: form,
			jar: that.jar,
			followAllRedirects: true
		}, function (e, r, body) {
			var $ = that.Cheerio.load(body);

			var index = 0;
			$('table.clsText[width=780]').each(function (i, e) {
				var tables = $(e).find('tr');
				tables.each(function (i, e) {
					row = $(e);

					if (!row.hasClass('clsListHead') &&
						!row.find('span').length &&
						i < tables.length - 2) {
						columns = row.find('td');

						courseArray[index].group = columns.eq(1).text().trim();
						index++;
					};
				});
			});

			fut['return'](courseArray);
		});
	});

	return fut.wait();
};