var easemobrequest = require( './easemob_request' );


/**
 * create user for easemob platform 注册IM用户[单个]
 * @param username 用户名
 * @param password 用户密码
 * @param callback callback函数
 */

exports.create = function( username, password,token, callback){
  var data = {username: username, password: password};

  easemobrequest.request_token(data, '/users', 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
}

/**
 * 注册IM用户[批量]
 * @param user_data 用户数据（如：[{"username":"u1", "password":"p1"}, {"username":"u2", "password":"p2"}]）
 * @param callback  callback函数
 */
exports.create_batch = function( user_data ,token ,callback){

  data = user_data;
  easemobrequest.request_token(data, '/users', 'POST',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 获取IM用户[单个]
 * @param username 用户名
 * @param callback
 */
exports.get = function( username ,token ,callback){

  easemobrequest.request_token(data, '/users/' + username, 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 获取IM用户[批量][不分页]
 * @param limit
 * @param callback
 */
exports.get_batch = function( limit ,token ,callback){

  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit, 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 获取IM用户[批量][分页]
 * @param limit
 * @param cursor
 * @param callback
 */
exports.get_batch_page = function( limit ,cursor ,token ,callback){

  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit + '&cursor=' + cursor, 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 删除IM用户[单个]
 * @param username
 * @param callback
 */
exports.remote = function( username ,token ,callback){

  var data = {};
  easemobrequest.request_token(data, '/users/' + username, 'DELETE',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/**
 * 删除IM用户[批量]
 * @param limit
 * @param callback
 */
exports.remote_batch = function( limit ,token ,callback){

  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit, 'DELETE',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

exports.reset_password = function( username ,newpassword ,token ,callback){

  var data = {newpassword: newpassword};
  easemobrequest.request_token(data, '/users/' + username + '/password', 'PUT',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

exports.set_nickname = function( username ,nickname ,token ,callback){

  var data = {nickname: nickname};
  easemobrequest.request_token(data, '/users/' + username , 'PUT',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
}



