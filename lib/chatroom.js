/**
 * Created by wayne on 15-10-28.
 */
var easemobrequest = require( './easemob_request' );

/**
 * 创建聊天室
 * @param data
 * {
 *   "name":"testchatroom", //聊天室名称, 此属性为必须的
 *   "description":"server create chatroom", //聊天室描述, 此属性为必须的
 *   "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
 *   "owner":"jma1", //聊天室的管理员, 此属性为必须的
 *   "members":["jma2","jma3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
 *   }
 * @param token
 * @param callback
 */
exports.create = function( data,token, callback){
  easemobrequest.request_token(data, '/chatrooms', 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 修改聊天室信息
 * @param data
 * {
 *  "name":"test chatroom", //聊天室名称
 *  "description":"update chatroominfo", //聊天室描述
 *  "maxusers":200, //聊天室成员最大数(包括群主), 值为数值类型
 * }
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.modify = function( data,chatroom_id ,token, callback){
  easemobrequest.request_token(data, '/chatrooms/' + chatroom_id, 'PUT',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 删除聊天室
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.remove = function(chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id , 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 获取app中所有的聊天室
 * @param token
 * @param callback
 */
exports.get_all = function(token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms' , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 获取一个聊天室详情
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.get = function(chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 获取用户加入的聊天室
 * @param username
 * @param token
 * @param callback
 */
exports.get_user_chatroom = function(username, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/users/' +username + '/joined_chatrooms' , 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 聊天室成员添加[单个]
 * @param username
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.add_member = function(username, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id + '/users/' +username, 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 聊天室成员添加[批量]
 * @param usernames  :  {“usernames”:[“username1”, “username2”]}  如:{"usernames":["jianxin1", "jianxin2"]}
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.add_member_batch = function(usernames, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(usernames, '/chatrooms/' +chatroom_id + '/users', 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 聊天室成员删除[单个]
 * @param username
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.remove_member = function(username, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id + '/users/' +username, 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**
 * 聊天室成员删除[批量]
 * @param usernames  : {username1},{username2} 如: jianxin1,jianxin2
 * @param chatroom_id
 * @param token
 * @param callback
 */
exports.remove_member_batch = function(usernames, chatroom_id, token, callback){
  var data = {};
  easemobrequest.request_token(data, '/chatrooms/' +chatroom_id + '/users/' +usernames, 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};
