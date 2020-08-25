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