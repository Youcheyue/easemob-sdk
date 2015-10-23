var easemobrequest = require( './easemobrequest' );

exports.create = function( username, password, callback){
    var data = {username: username, password: password};
    easemobrequest.requestJson(data, 'users', 'POST', function ( err,res, body ) {
        return callback( err,res, body );
    })
}