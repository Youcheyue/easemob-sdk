var easemobrequest = require( './easemob_request' );


/**
 * create user for easemob platform 注册IM用户[单个]
 * @param username 用户名
 * @param password 用户密码
 * @param callback callback函数
 */

exports.create = function( username, password, callback){
  var data = {username: username, password: password};
  var headers = {};
  easemobrequest.request_token(data, '/users', 'POST',headers, function ( err,res, body ) {
    callback( err,res, body );
  })
}

/**
 * 注册IM用户[批量]
 * @param user_data 用户数据（如：[{"username":"u1", "password":"p1"}, {"username":"u2", "password":"p2"}]）
 * @param callback  callback函数
 */
exports.create_batch = function( user_data ,callback){
  var headers = {};
  data = user_data;
  easemobrequest.request_token(data, '/users', 'POST',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 获取IM用户[单个]
 * @param username 用户名
 * @param callback
 */
exports.get = function( username ,callback){
  var headers = {};
  easemobrequest.request_token(data, '/users/' + username, 'GET',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 获取IM用户[批量][不分页]
 * @param limit
 * @param callback
 */
exports.get_batch = function( limit ,callback){
  var headers = {};
  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit, 'GET',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 获取IM用户[批量][分页]
 * @param limit
 * @param cursor
 * @param callback
 */
exports.get_batch_page = function( limit ,cursor ,callback){
  var headers = {};
  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit + '&cursor=' + cursor, 'GET',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 删除IM用户[单个]
 * @param username
 * @param callback
 */
exports.remote = function( username ,callback){
  var headers = {};
  var data = {};
  easemobrequest.request_token(data, '/users/' + username, 'DELETE',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 删除IM用户[批量]
 * @param limit
 * @param callback
 */
exports.remote_batch = function( limit ,callback){
  var headers = {};
  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit, 'DELETE',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

exports.reset_password = function( username ,newpassword ,callback){
  var headers = {};
  var data = {newpassword: newpassword};
  easemobrequest.request_token(data, '/users/' + username + '/password', 'PUT',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

exports.set_nickname = function( username ,nickname ,callback){
  var headers = {};
  var data = {nickname: nickname};
  easemobrequest.request_token(data, '/users/' + username , 'PUT',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}



