/**
 * Created by wayne on 15-10-28.
 */
var easemobrequest = require( './easemob_request' );

exports.create = function( data,token, callback){
  easemobrequest.request_token(data, '/chatrooms', 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.modify = function( data,chatroom_id ,token, callback){
  easemobrequest.request_token(data, '/chatrooms/' + chatroom_id, 'PUT',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.get_all = function(token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms' , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};
