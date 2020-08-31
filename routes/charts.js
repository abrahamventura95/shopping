var auth 		= require('../Middleware/auth');
var controller 	= require('../Controllers/chart');

module.exports = function(app) {	
	app.route('/chart')
	  	.get(auth.check, controller.get);
	app.route('/chart/items')
		.get(auth.check, controller.getChartItems);		
	app.route('/chart/item')
		.post(auth.check, controller.addItem)
		.put(auth.check, controller.editItem)
		.delete(auth.check, controller.removeItem);  
	app.route('/chart/offer')
		.post(auth.check, controller.addOffer)
		.put(auth.check, controller.editOffer)
		.delete(auth.check, controller.removeOffer);  	
	app.route('/purchs')
		.get(auth.check, controller.getPurchs);
	app.route('/purchs/items')
		.get(auth.check, controller.getPurchItems);		
	app.route('/buy')
		.post(auth.check, controller.buyChart);	
};
