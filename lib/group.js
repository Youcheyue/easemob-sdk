var easemobrequest = require( './easemob_request' );

/**创建一个群组
 * add group for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.add_group = function(groupinfo,token, callback){
  //var data = {username: username, friend: friend};
  var data={"groupinfo":groupinfo};
  var headers = {};
  var requrl="/chatgroups";
  easemobrequest.request_token(data.groupinfo,requrl,'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/**删除一个群组
 * delete group for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.delete_group = function(groupid,token, callback){
  //var data = {username: username, friend: friend};
  var data={"groupinfo":groupid};
  var headers = {};
  var requrl="/chatgroups/"+groupid;
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};
