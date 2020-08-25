var auth 		= require('../Middleware/auth');
var controller 	= require('../Controllers/user');

module.exports = function(app) {	
	app.route('/user')
	  	.get(auth.check, controller.get)
		.put(auth.check, controller.edit)
		.delete(auth.check, controller.delete);
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/register')
	  	.post(controller.create);
	app.route('/login')
	  	.post(controller.login); 
};
