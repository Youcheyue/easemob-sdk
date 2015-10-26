var easemobrequest = require( './easemob_request' );

/**
 * create user for easemob platform
 * @param username
 * @param password
 * @param callback
 */
exports.create = function( username, password, callback){
  var data = {username: username, password: password};
  var headers = {};
  easemobrequest.request_token(data, '/users', 'POST',headers, function ( err,res, body ) {
    callback( err,res, body );
  })
}
