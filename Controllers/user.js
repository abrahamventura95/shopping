require('dotenv').config();
var bcrypt		= require('bcrypt');
var validator	= require('validator');
var functions	= require('./functions');
var queries		= require('../DB/Connections/user');

function validateRegister(body, callback) {
	//Empty validation
	if(validator.isEmpty(body.email))
		 callback('Email is required');
	if(validator.isEmpty(body.password))
		 callback('Password is required');
	if(validator.isEmpty(body.password_confirm))
		 callback('Password confirm is required');
	if(validator.isEmpty(body.username))
		 callback('Username is required');

	//Conditional validations
	if(!validator.isEmail(body.email) )
		 callback('Invalid email');
	if(!validator.isLength(body.password, 
						  {min: process.env.MIN_PASSWORD}))
		 callback('The password must be at least 6 characters');
	if(!validator.matches(body.password, body.password_confirm) ||
						  validator.isEmpty(body.password_confirm))
		 callback('The passwords do not match');
	if(validator.isEmpty(body.type) || !validator.isIn(body.type,['user',
									   							'shop'])){
		callback('Type out of range');
	}
	//Existing validations	
	functions.findRegisteredUsername(body.username, function(value){
		if(value == process.env.TRUE){
			callback('Registered username');
		}else{
			callback('pass');
		}
	});
};

function validateUpdate(body, callback) {
	if(body.password != undefined){
		if(!validator.isLength(body.password, 
							  {min: process.env.MIN_PASSWORD})){
 			callback('The password must be at least 6 characters');
		}else{
			callback('pass');
		}
	}else{
		callback('pass');
	}
};

exports.getUsers= function(req, res) {
	queries.getUsers(function(err, data){
		res.json(data);
	});
};

exports.create = function(req, res) {
	validateRegister(req.body, function(value){
		try{
			if (value == 'pass') {
				var hash = 
							bcrypt.hashSync(req.body.password, 
										   parseInt(process.env.HASH_ROUNDS));
				var user = {
					email: 	   	req.body.email,
				    username:  	req.body.username,
				    name: 		req.body.name,
				    type: 		req.body.type,
					password:  	hash
				};				
				queries.create(user, function(err, data){
					res.json(data);
				});
			}
			else 
				throw Error(value);
		}catch(err){
			obj = {
				error: 	process.env.BAD_REQUEST,
				msg: 	err.message
			};
			res.json(obj);
		}
	});
};

exports.login = function(req, res){
	var obj = {
		email: 		req.body.email,
		password: 	req.body.password
	}	
	queries.login(obj, function(err, data){
		res.json(data);
	});
};

exports.get = function(req, res) {
	queries.get(req.user.sub, function(err, data){
		res.json(data);
	});
}

exports.edit = function(req, res){
	var hash = null;

	if(req.body.password != undefined){
		hash = bcrypt.hashSync(req.body.password, 
								parseInt(process.env.HASH_ROUNDS));
	}

	validateUpdate(req.body, function(value){
		try{
			if(value == 'pass'){
				if(hash != null){
					var user = {
						id: 		req.user.sub,
						password: 	hash,
				    	name: 		req.body.name,
				    	rif: 		req.body.rif
					};					
					queries.edit(user, function(err, data){
						res.json(data);
					});
				}else{
					var user = {
						id: 		req.user.sub,
				    	name: 		req.body.name,
				    	rif: 		req.body.rif
					};					
					queries.edit(user, function(err, data){
						res.json(data);
					});
				}
			}else{
				throw Error(value);
			}
		}catch(err){
			obj = {
				error: 	process.env.BAD_REQUEST,
				msg: 	err.message
			};
			res.json(obj);
		}
	});
}

exports.delete = function(req, res){
	queries.delete(req.user.sub, function(err, data){
		res.json(data);
	});
}
