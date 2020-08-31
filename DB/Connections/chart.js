require('dotenv').config();
var DBHelper 	= require('../helper');

exports.get = function(id, callback){
	var sqlQuery = "SELECT id, user				\
					FROM shoppingChart 			\
					WHERE status = FALSE AND	\
						  user   = '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

exports.getPurchs = function(id, callback) {
	var sqlQuery = "SELECT id, user, created_at as date		\
					FROM purchcart 							\
					WHERE user = '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getChartItems = function(id, callback){
	var sqlProdcts = "SELECT cartproduct.id, p.id as product, 				\
						   p.shop, p.name, p.description, 					\
						   p.image, cartproduct.amount, p.price				\
					  FROM cartproduct, product as p						\
					  WHERE cartproduct.product = p.id 	AND					\
						  cartproduct.cart   = '" + id + "'";
	var sqlOffersP = "SELECT cartOffer.id, offer.id as offer, 				\
							 p.id as product, p.shop, p.name, 				\
							 p.description, p.image							\
					  FROM cartOffer, offer, prdtByoffer, product as p		\
					  WHERE cartOffer.offer = offer.id 	AND					\
					  		prdtByoffer.offer_id = offer.id AND				\
					  		prdtByoffer.product_id = p.id 	AND				\
						    cartOffer.cart   = '" + id + "'					\
					  ORDER BY offer.id";
	var offerValue = "SELECT SUM(`offer`.`price`) as val					\
      				  FROM `cartOffer`, `offer`								\
            		  WHERE  `offer`.`id` = `cartOffer`.`offer` AND 		\
          					 `cartOffer`.`cart` = '" + id + "'";
    var productsV  = "SELECT 												\
    					SUM(`cartproduct`.`amount`*`product`.`price`) as val\
      				  FROM `cartproduct`, `product`							\
            		  WHERE `cartproduct`.`product` = `product`.`id` AND	\
          					`cartproduct`.`cart` = '" + id + "'";     					 
	DBHelper.doQuery(sqlProdcts, function(err, products) {
		DBHelper.doQuery(sqlOffersP, function(err, offers) {
			DBHelper.doQuery(offerValue, function(err, subT1) {
				DBHelper.doQuery(productsV, function(err, subT2) {
					var data = {
						products: products,
						productsOffer: offers,
						total: subT1[0].val + subT2[0].val
					};
					callback(err, data);
				});
			});
		});
	});
}

exports.getPurchItems = function(id, callback){
	var sqlProdcts = "SELECT p.id, p.shop, p.name, p.description, p.amount, \
							 p.price, shop.name								\
					  FROM prdctpurch as p, user as shop					\
					  WHERE p.shop = shop.id 	AND							\
						    p.purchcart   = '" + id + "'";
	var sqlOffersP = "SELECT p.id, p.name, p.description, shop.name,		\
							 p.offerpurch as offer 							\
					  FROM offerpdctpurch as p, offerpurch, user as shop	\
					  WHERE p.offerpurch = offerpurch.id 	AND				\
					  		p.shop = shop.id 				AND				\
					  		offerpurch.purchcart = '" + id + "'				\
					  ORDER BY offerpdctpurch";
	var offerValue = "SELECT SUM(`offerpurch`.`price`) as val				\
      				  FROM  `offerpurch`									\
            		  WHERE  `offerpurch`.`purchcart` = '" + id + "'";
    var productsV  = "SELECT SUM(`amount` * `price`) as val 				\
      				  FROM `prdctpurch`										\
            		  WHERE `prdctpurch`.`purchcart` = '" + id + "'";     					 
	DBHelper.doQuery(sqlProdcts, function(err, products) {
		DBHelper.doQuery(sqlOffersP, function(err, offers) {
			DBHelper.doQuery(offerValue, function(err, subT1) {
				DBHelper.doQuery(productsV, function(err, subT2) {
					var data = {
						products: products,
						productsOffer: offers,
						total: subT1[0].val + subT2[0].val
					};
					callback(err, data);
				});
			});
		});
	});
}

exports.addItem = function(obj, callback) {
	var status = false;

	var isOneChart = "SELECT COUNT(*) as val		\
					  FROM shoppingChart 			\
					  WHERE status = FALSE AND 		\
					  		user = '" + obj.id + "'";
    var getChart = "SELECT id 						\
					FROM shoppingChart 				\
					WHERE status = FALSE AND		\
						  user = '" + obj.id + "'";
	DBHelper.doQuery(isOneChart, function(err, data) {
		if(data[0].val == 0){
			var createChart = "INSERT INTO shoppingChart (user, status) \
									  VALUES ('" + obj.id	+ "',		\
											   " + status   + ")";
			DBHelper.doQuery(createChart, function(err, create) {
				DBHelper.doQuery(getChart, function(err, data) {
					var sqlQuery = "INSERT INTO cartproduct 			  	\
								   				(cart, product, amount)		\
						    				VALUES ('" + data[0].id	+ "',	\
													'" + obj.prd	+ "',	\
												    '" + obj.amount + "')";	
					DBHelper.doQuery(sqlQuery, function(err, data) {
						callback(err, data);
					});							    
				});
			});
		}else{
			DBHelper.doQuery(getChart, function(err, data) {
				var sqlQuery = "INSERT INTO cartproduct 			  	\
							   				(cart, product, amount)		\
					    				VALUES ('" + data[0].id	+ "',	\
												'" + obj.prd	+ "',	\
											    '" + obj.amount + "')";	
				DBHelper.doQuery(sqlQuery, function(err, data) {
					callback(err, data);
				});							    
			});
		}
	});
};

exports.addOffer = function(obj, callback) {
	var status = false;

	var isOneChart = "SELECT COUNT(*) as val		\
					  FROM shoppingChart 			\
					  WHERE status = FALSE AND 		\
					  		user = '" + obj.id + "'";
    var getChart = "SELECT id 						\
					FROM shoppingChart 				\
					WHERE status = FALSE AND		\
						  user = '" + obj.id + "'";
	DBHelper.doQuery(isOneChart, function(err, data) {
		if(data[0].val == 0){
			var createChart = "INSERT INTO shoppingChart (user, status) \
									  VALUES ('" + obj.id	+ "',		\
											   " + status   + ")";
			DBHelper.doQuery(createChart, function(err, create) {
				DBHelper.doQuery(getChart, function(err, data) {
					var sqlQuery = "INSERT INTO cartOffer 			  	\
								   				(cart, offer, amount)		\
						    				VALUES ('" + data[0].id	+ "',	\
													'" + obj.offer	+ "',	\
												    '" + obj.amount + "')";	
					DBHelper.doQuery(sqlQuery, function(err, data) {
						callback(err, data);
					});							    
				});
			});
		}else{
			DBHelper.doQuery(getChart, function(err, data) {
				var sqlQuery = "INSERT INTO cartOffer 			  	\
							   				(cart, offer, amount)		\
					    				VALUES ('" + data[0].id	+ "',	\
												'" + obj.offer	+ "',	\
											    '" + obj.amount + "')";	
				DBHelper.doQuery(sqlQuery, function(err, data) {
					callback(err, data);
				});							    
			});
		}
	});
};

exports.editItem = function(obj, callback) {
	var sqlQuery = 
				"UPDATE `cartproduct` SET  								\
				 	    `cartproduct`.`amount`	='" + obj.amount + "'	\
				WHERE `cartproduct`.`id`		='" + obj.id 	 + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.editOffer = function(obj, callback) {
	var sqlQuery = 
				"UPDATE `cartOffer` SET  								\
				 	    `cartOffer`.`amount`	='" + obj.amount + "'	\
				WHERE `cartOffer`.`id`			='" + obj.id 	 + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.deleteItem = function (id, callback){
	var sqlQuery = "DELETE FROM `cartproduct`   		\
					WHERE `id`		= '" + id 	+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.deleteOffer = function (id, callback){
	var sqlQuery = "DELETE FROM `cartOffer`   			\
					WHERE `id`		= '" + id 	+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.buy = function (user, callback){
	var sqlQuery = "CALL buy('" + user + "')";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err, data);
	});
};