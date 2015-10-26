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

/*
 注册IM用户[批量]
 params:
    user_data:用户数据（如：[{"username":"u1", "password":"p1"}, {"username":"u2", "password":"p2"}]）
    callback:callback函数
 */
exports.create_batch = function( user_data ,callback){
  var headers = {};
  data = user_data;
  easemobrequest.request_token(data, '/users', 'POST',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

/*
 获取IM用户[批量]
 params:
    username:用户名
    callback:callback函数
 */
exports.get = function( username ,callback){
  var headers = {};
  easemobrequest.request_token(data, '/users/' + username, 'GET',headers, function ( err,res, body ) {
    return callback( err,res, body );
  })
}

