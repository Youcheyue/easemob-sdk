var easemobrequest = require( './easemob_request' );

exports.create = function( username, password, callback){
  var data = {username: username, password: password};
  easemobrequest.request_token(data, '/users', 'POST', function ( err,res, body ) {
    return callback( err,res, body );
  })
}
