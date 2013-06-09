// turns a timestamp interval into the future into something like "x days from now"
Handlebars.registerHelper('nextContactString', function(nextContact) {
	// var nextContactDate = Date.create(nextContact);

	// TODO: Date.create('9 days from now').relatve() returns '1 week from now'
	// pass callback that properly formats the stuff

	// DO MATH WHEN INTERVAL HAS EXPIRED, OR HAVE A CRON
	// if interval is over, next contact date has passed
	// if nextContactDate.isBefore(Date.create('now')) {
	// 	nextContactDate = Date.create(Date.create('now').getTime() + person.interval);
	// }
	// strip out from now
	return Date.create(nextContact).relative().replace(' from now', '');
});

Handlebars.registerHelper('debugger', function(param) {
       debugger;
 });