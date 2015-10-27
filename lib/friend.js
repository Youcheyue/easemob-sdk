var easemobrequest = require( './easemob_request' );

/**给IM用户的添加好友
 * add friend for easemob platform
 * @param username
 * @param friend
 * @param callback
 */
exports.add_friend = function( username, friend, callback){
  var data = {username: username, friend: friend};
  var headers = {};
  var requrl="/users/"+username+"/contacts/users/"+friend;
  easemobrequest.request_token(data,requrl, 'POST',headers, function ( err,res, body ) {
    console.log('===========');
    console.log(err);
    //console.log(res);
    console.log(body);
    callback( err,res, body );
  })
};

/**解除IM用户的好友关系
 * delete friend for easemob platform
 * @param username
 * @param friend
 * @param callback
 */
exports.delete_friend = function( username, friend, callback){
  var data = {username: username, friend: friend};
  var headers = {};
  var requrl="/users/"+username+"/contacts/users/"+friend;
  easemobrequest.request_token(data,requrl, 'DELETE',headers, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**查看好友
 * display friend for easemob platform
 * @param username
 * @param callback
 */
exports.show_friend = function( username, callback){
  var data = {username: username};
  var headers = {};
  var requrl="/users/"+username+"/contacts/users/";
  easemobrequest.request_token(data,requrl, 'GET',headers, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**获取IM用户的黑名单
 * display backlist for easemob platform
 * @param username
 * @param callback
 */
 exports.show_blacklist = function( username, callback){
  var data = {username: username};
  var headers = {};
  var requrl="/users/"+username+"/blocks/users/";
  easemobrequest.request_token(data,requrl, 'GET',headers, function ( err,res, body ) {
    callback( err,res, body );
  })
};

