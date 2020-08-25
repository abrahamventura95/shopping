var queries		= require('../DB/Connections/product');

exports.getAll= function(req, res) {
	queries.getAll(function(err, data){
		res.json(data);
	});
};

exports.getByShop= function(req, res) {
	queries.getByShop(req.param('id'), function(err, data){
		res.json(data);
	});
};

exports.create = function(req, res) {
	var product = {
		shop: 	req.user.sub,
		name: 	req.body.name,
		desc: 	req.body.desc,
		image: 	req.body.image,
		amount: req.body.amount,
		price: 	req.body.price
	};				
	queries.create(product, function(err, data){
		res.json(data);
	});
};

exports.edit = function(req, res){
	var product = {
		id: 	req.param('id'),
		shop: 	req.user.sub,
		name: 	req.body.name,
		desc: 	req.body.desc,
		image: 	req.body.image,
		price: 	req.body.price,
		amount: req.body.amount
	};					
	queries.edit(product, function(err, data){
		res.json(data);
	});
}

exports.delete = function(req, res){
	var product = {
		id: req.param('id'),
		shop: req.user.sub
	};
	queries.delete(product, function(err, data){
		res.json(data);
	});
}

/*	-- -----------------------------------------------------
	-- 						CATEGORY
	-- -----------------------------------------------------*/

exports.createCtgr = function(req, res) {
	var category = {
		name: 	req.body.name,
		desc: 	req.body.desc
	};				
	queries.createCtgr(category, function(err, data){
		res.json(data);
	});
};

exports.deleteCtgr = function(req, res){
	queries.deleteCtgr(req.param('id'), function(err, data){
		res.json(data);
	});
}

exports.getCtgrs= function(req, res) {
	queries.getCtgr(function(err, data){
		res.json(data);
	});
};

exports.giveCtgr = function(req, res) {
	var prod_ctgr = {
		product: 	req.body.product,
		category: 	req.body.category
	};				
	queries.giveCtgr(prod_ctgr, function(err, data){
		res.json(data);
	});
};

exports.removeCtgr = function(req, res){
	var prod_ctgr = {
		product: 	req.body.product,
		category: 	req.body.category
	};		
	queries.removeCtgr(prod_ctgr, function(err, data){
		res.json(data);
	});
}

exports.getProductsByCtgr= function(req, res) {
	queries.getProductsByCtgr(req.param('id'), function(err, data){
		res.json(data);
	});
};

exports.getCtgrsProduct= function(req, res) {
	queries.getCtgrsProduct(req.param('id'), function(err, data){
		res.json(data);
	});
};