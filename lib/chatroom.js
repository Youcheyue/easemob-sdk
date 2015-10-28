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

exports.remove = function(chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id , 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.get_all = function(token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms' , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.get = function(chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.get_user_chatroom = function(username, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' +username + '/joined_chatrooms' , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.add_member = function(username, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id + '/users/' +username, 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.add_member_batch = function(usernames, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(usernames, '/chatrooms/' +chatroom_id + '/users', 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.remove_member = function(username, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id + '/users/' +username, 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.remove_member_batch = function(usernames, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id + '/users/' +usernames, 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};
