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
};

/**
 * create user for easemob platform 注册IM用户 [单个，包含昵称]
 * @param username 用户名
 * @param password 用户密码
 * @param nickname 昵称
 * @param token
 * @param callback callback函数
 */

exports.create_with_nickname = function( username, password, nickname, token, callback){
  var data = {username: username, password: password, nickname: nickname};
  easemobrequest.request_token(data, '/users', 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

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
};

/**
 * 获取IM用户[单个]
 * @param username 用户名
 * @param callback
 */
exports.get = function( username ,token ,callback){
  easemobrequest.request_token(data, '/users/' + username, 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

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
};

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
};

/**
 * 删除IM用户[单个]
 * @param username
 * @param callback
 */
exports.remove = function( username ,token ,callback){

  var data = {};
  easemobrequest.request_token(data, '/users/' + username, 'DELETE',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 删除IM用户[批量]
 * @param limit
 * @param callback
 */
exports.remove_batch = function( limit ,token ,callback){

  var data = {};
  easemobrequest.request_token(data, '/users?limit=' + limit, 'DELETE',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 重置IM用户密码
 * @param username
 * @param newpassword
 * @param token
 * @param callback
 */
exports.reset_password = function( username ,newpassword ,token ,callback){

  var data = {newpassword: newpassword};
  easemobrequest.request_token(data, '/users/' + username + '/password', 'PUT',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 修改用户昵称
 * @param username
 * @param nickname
 * @param token
 * @param callback
 */
exports.set_nickname = function( username ,nickname ,token ,callback){

  var data = {nickname: nickname};
  easemobrequest.request_token(data, '/users/' + username , 'PUT',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 查看用户在线状态
 * @param username
 * @param token
 * @param callback
 */
exports.get_status = function( username ,token ,callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' + username + '/status', 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 查询离线消息数
 * @param username
 * @param token
 * @param callback
 */
exports.get_offline_msg_count = function( username ,token ,callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' + username + '/offline_msg_count', 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 查询某条离线消息状态
 * @param username
 * @param msg_id
 * @param token
 * @param callback
 */
exports.get_offline_msg_status = function( username , msg_id , token ,callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' + username + '/offline_msg_status/' + msg_id, 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 用户账号禁用
 * @param username
 * @param token
 * @param callback
 */
exports.deactivate = function( username , token ,callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' + username + '/deactivate' , 'POST',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 用户账号解禁
 * @param username
 * @param token
 * @param callback
 */
exports.activate = function( username , token ,callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' + username + '/activate' , 'POST',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};

/**
 * 强制用户下线
 * @param username
 * @param token
 * @param callback
 */
exports.disconnect = function( username , token ,callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' + username + '/disconnect' , 'GET',token, function ( err,res, body ) {
    return callback( err,res, body );
  })
};


