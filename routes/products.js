var auth 		= require('../Middleware/auth');
var controller 	= require('../Controllers/product');

module.exports = function(app) {	
	app.route('/product')
		.post(auth.check, auth.isShop, controller.create)
		.put(auth.check, auth.isShop, controller.edit)
		.delete(auth.check, auth.isShop, controller.delete);
	app.route('/products')
		.get(controller.getAll);
	app.route('/products/shop')
	  	.get(controller.getByShop);
};
