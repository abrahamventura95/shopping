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
	app.route('/category')
		.post(auth.check, auth.isAdmin, controller.createCtgr)
		.delete(auth.check, auth.isAdmin, controller.deleteCtgr); 
	app.route('/categories')
		.get(controller.getCtgrs);
	app.route('/product/category')
		.post(auth.check, auth.isShop, controller.giveCtgr)	
		.delete(auth.check, auth.isShop, controller.removeCtgr);
	app.route('/products/category')
		.get(controller.getProductsByCtgr);
	app.route('/product/categories')
		.get(controller.getCtgrsProduct);
	app.route('/offer')
		.post(auth.check, auth.isShop, controller.createOffer)
		.put(auth.check, auth.isShop, controller.editOffer)
		.delete(auth.check, auth.isShop, controller.deleteOffer); 
	app.route('/offers')
		.get(controller.getOffers);
	app.route('/offer/product')
		.post(auth.check, auth.isShop, controller.addProductOffer)
		.delete(auth.check, auth.isShop, controller.rmvProductOffer);
	app.route('/offer/products')
		.get(controller.getOfferProducts);
};
