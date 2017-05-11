/*
 * GET home page.
 */
 
exports.init = function(req, res){
		var slack = req.app.get('slack');
		var message = "Name: " + req.param("first") + " " + req.param("last") + " || Appointment Time: "+ req.param("appointment_time");
		if(req.param("first") !== undefined)
		{
			slack.send({
 				channel: '#checkin',
  				text: message,
  				username: 'CheckInBot'
			});
		}
		res.render('checkin');
};
exports.view = function(req, res){
		var slack = req.app.get('slack');
		
		res.render('checkin');
};