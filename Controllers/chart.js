var queries	= require('../DB/Connections/chart');

exports.get = function(req, res) {
	queries.get(req.user.sub, function(err, data){
		res.json(data);
	});
};

exports.getPurchs = function(req, res) {
	queries.getPurchs(req.user.sub, function(err, data){
		res.json(data);
	});
};

exports.getChartItems = function(req, res) {
	queries.getChartItems(req.param('id'), function(err, data){
		res.json(data);
	});
};

exports.getPurchItems = function(req, res) {
	queries.getPurchItems(req.param('id'), function(err, data){
		res.json(data);
	});
};

exports.addItem = function(req, res) {
	var item = {
		id: 	req.user.sub,
	    prd:  	req.body.prd,
	    amount: req.body.amount
	};				
	queries.addItem(item, function(err, data){
		res.json(data);
	});
};

exports.addOffer = function(req, res) {
	var offer = {
		id: 	req.user.sub,
	    offer:  req.body.offer,
	    amount: req.body.amount
	};				
	queries.addOffer(offer, function(err, data){
		res.json(data);
	});
};

exports.editItem = function(req, res) {
	var item = {
		id: 	req.param('id'),
	    amount: req.body.amount
	};				
	queries.editItem(item, function(err, data){
		res.json(data);
	});
};

exports.editOffer = function(req, res) {
	var offer = {
		id: 	req.param('id'),
	    amount: req.body.amount
	};				
	queries.editOffer(offer, function(err, data){
		res.json(data);
	});
};

exports.removeItem = function(req, res){
	queries.deleteItem(req.param('id'), function(err, data){
		res.json(data);
	});
}

exports.removeOffer = function(req, res){
	queries.deleteOffer(req.param('id'), function(err, data){
		res.json(data);
	});
}

exports.buyChart = function(req, res) {
	queries.buy(req.user.sub, function(err, data){
			res.json(data);
	});
};
