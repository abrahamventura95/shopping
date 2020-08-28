require('dotenv').config();
var DBHelper 	= require('../helper');

exports.getAll = function(callback){
	var sqlQuery = "SELECT product.id, user.name, product.name,		\
						   product.description, product.image, 		\
						   product.price, product.amount			\
					FROM product, user								\
					WHERE product.shop = user.id";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

exports.getByShop = function(id, callback) {
	var sqlQuery = "SELECT product.id, user.name, product.name,		\
						   product.description, product.image, 		\
						   product.price, product.amount			\
					FROM product, user								\
					WHERE user.id = '" + id + "' AND				\
						  product.shop = user.id";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
  	var sqlQuery = "INSERT INTO product (shop, name, description, 		\
  									  		amount, price, image)		\
							VALUES ('" + obj.shop			+ "',		\
									'" + obj.name			+ "',		\
									'" + obj.desc			+ "',		\
									'" + obj.amount			+ "',		\
									'" + obj.price			+ "',		\
									'" + obj.image 			+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.edit = function(obj, callback) {
	var sqlQuery = 
				"UPDATE `product` SET  										\
				 	    `product`.`name`		='" + obj.name 	 + "',		\
				 	    `product`.`description`	='" + obj.desc 	 + "',		\
				 	    `product`.`amount`		='" + obj.amount + "',		\
				 	    `product`.`price`		='" + obj.price  + "',		\
				 	    `product`.`image`		='" + obj.image  + "'		\
				WHERE `product`.`id`			='" + obj.id 	 + "' AND	\
					  `product`.`shop` 			='" + obj.shop + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (obj, callback){
	var sqlQuery = "DELETE FROM `product`   					\
					WHERE `id`		= '" + obj.id 	+ "' AND	\
						  `shop` 	= '" + obj.user + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

/*	-- -----------------------------------------------------
	-- 						CATEGORY
	-- -----------------------------------------------------*/
exports.createCtgr = function(obj, callback) {
  	var sqlQuery = "INSERT INTO category (name, description)		\
							VALUES ('" + obj.name			+ "',	\
									'" + obj.desc 			+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.deleteCtgr = function (id, callback){
	var sqlQuery = "DELETE FROM `category`   	\
					WHERE `id` 	= '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.getCtgr = function(callback){
	var sqlQuery = "SELECT id, name, description	\
					FROM category					\
					ORDER BY name DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

exports.giveCtgr = function(obj, callback) {
  	var sqlQuery = "INSERT INTO prdtByCtg (product_id, category_id)		\
							VALUES ('" + obj.product			+ "',	\
									'" + obj.category 			+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.removeCtgr = function (obj, callback){
	var sqlQuery = "DELETE FROM `prdtByCtg`   	\
					WHERE `product_id` 	= '" + obj.product  + "' AND	\
						  `category_id` = '" + obj.category + "' ";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.getProductsByCtgr = function(id, callback){
	var sqlQuery = "SELECT product.id, user.name, product.name,		\
						   product.description, product.image, 		\
						   product.price, product.amount			\
					FROM product, user, category, prdtByCtg			\
					WHERE category.id = '" + id + "' 			AND	\
						  product.shop = user.id				AND	\
						  category.id  = prdtByCtg.category_id  AND \
						  prdtByCtg.product_id = product.id";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

exports.getCtgrsProduct = function(id, callback){
	var sqlQuery = "SELECT category.name, category.description		\
					FROM product, category, prdtByCtg				\
					WHERE product.id = '" + id + "' 			AND	\
						  category.id  = prdtByCtg.category_id  AND \
						  prdtByCtg.product_id = product.id";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

/*	-- -----------------------------------------------------
	-- Table `shopping`.`offer`
	-- -----------------------------------------------------	*/
exports.createOffer = function(obj, callback) {
  	var sqlQuery = "INSERT INTO offer (price, until)		\
							VALUES ('" + obj.price	+ "',	\
									'" + obj.until 	+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.deleteOffer = function (id, callback){
	var sqlQuery = "DELETE FROM `offer`   		\
					WHERE `id` 	= '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.editOffer = function(obj, callback) {
	var status = (obj.status == "TRUE");

	var sqlQuery = 
				"UPDATE `offer` SET  								\
				 	    `offer`.`price`		='" + obj.price + "',	\
				 	    `offer`.`until`		='" + obj.until + "',	\
				 	    `offer`.`status`	="  + status	+ "		\
				WHERE `offer`.`id`			='" + obj.id 	+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.getOffers = function(callback){
	var offerQuery = "SELECT id, status, price, until	\
					FROM offer							\
					ORDER BY until DESC";
	var prdtQuery = "SELECT prdtByoffer.offer_id as offer,			\
						   product.id, user.name, product.name,		\
						   product.description, product.image, 		\
						   product.price, prdtByoffer.amount		\
					FROM product, user, prdtByoffer					\
					WHERE product.shop = user.id 				AND	\
						  product.id   = prdtByoffer.product_id		\
					ORDER BY offer_id DESC";
	DBHelper.doQuery(offerQuery, function(err, offers) {
		DBHelper.doQuery(prdtQuery, function(err, products) {
			var data = {offers, products};
			callback(err, data);
		});	
	});
}

exports.addProductOffer = function(obj, callback) {
  	var sqlQuery = "INSERT INTO prdtByoffer (product_id, offer_id, amount)	\
							VALUES ('" + obj.product	+ "',				\
									'" + obj.offer 		+ "', 				\
									'" + obj.amount 	+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.rmvProductOffer = function (obj, callback){
	var sqlQuery = "DELETE FROM `prdtByoffer`   						\
					WHERE `product_id` 	= '" + obj.product 	+ "' AND	\
						  `offer_id` 	= '" + obj.offer 	+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.getOfferProducts = function(id, callback){
	var sqlQuery = "SELECT product.id, user.name, product.name,		\
						   product.description, product.image, 		\
						   product.price, prdtByoffer.amount		\
					FROM product, user, prdtByoffer					\
					WHERE product.shop = user.id 				AND	\
						  product.id   = prdtByoffer.product_id	AND	\
						  prdtByoffer.offer_id = '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}
