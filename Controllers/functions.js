var queries = require('../DB/Connections/user');

exports.findRegisteredUsername = function(email, callback){
	queries.existsUsername(email,function(err,data){
		callback(data[0].value);
	});
}
