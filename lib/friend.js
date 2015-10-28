var easemobrequest = require( './easemob_request' );

/**给IM用户的添加好友
 * add friend for easemob platform
 * @param username
 * @param friend
 * @param callback
 */
exports.add_friend = function( username, friend,token, callback){
  var data = {username: username, friend: friend};
  var headers = {};
  var requrl="/users/"+username+"/contacts/users/"+friend;
  easemobrequest.request_token(data,requrl, 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**解除IM用户的好友关系
 * delete friend for easemob platform
 * @param username
 * @param friend
 * @param callback
 */
exports.delete_friend = function( username, friend,token, callback){
  var data = {username: username, friend: friend};
  var headers = {};
  var requrl="/users/"+username+"/contacts/users/"+friend;
  easemobrequest.request_token(data,requrl, 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**查看好友
 * display friend for easemob platform
 * @param username
 * @param callback
 */
exports.show_friend = function( username,token, callback){
  var data = {username: username};
  var headers = {};
  var requrl="/users/"+username+"/contacts/users/";
  easemobrequest.request_token(data,requrl, 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**获取IM用户的黑名单
 * display backlist for easemob platform
 * @param username
 * @param callback
 */
 exports.show_blacklist = function( username, token, callback){
  var data = {username: username};
  var headers = {};
  var requrl="/users/"+username+"/blocks/users/";
  easemobrequest.request_token(data,requrl, 'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/**往IM用户的黑名单中加人
 * add backlist for easemob platform
 * @param username
 * @param callback
 */
 exports.add_blacklist = function( username,blocklist,token, callback){
  var data = {usernames:[blocklist] };
  var headers = {};
  var requrl="/users/"+username+"/blocks/users/";
  easemobrequest.request_token(data,requrl, 'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**往IM用户的黑名单中减人
 * remove backlist for easemob platform
 * @param username
 * @param callback
 */
 exports.delete_blacklist = function( username,blocklist,token, callback){
  var data = {usernames:blocklist };
  var headers = {};
  var requrl="/users/"+username+"/blocks/users/"+blocklist;
  easemobrequest.request_token(data,requrl, 'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};
