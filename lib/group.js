var easemobrequest = require( './easemob_request' );

/**创建一个群组
 * add group for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.add_group = function(groupinfo,token, callback){
  var data={"groupinfo":groupinfo};
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
  var data={"groupinfo":groupid};
  var requrl="/chatgroups/"+groupid;
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*查询群组
 * display group for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.display_group = function(token, callback){
  var data={"groupinfo":""};
  var requrl="/chatgroups/";
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*分页获取app下的群组
 * display group for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.display_page_group = function(limit,cursor,token, callback){
  var data={"groupinfo":""};
  if (cursor) {
  requrl="/chatgroups?limit="+limit+"&cursor="+cursor;
}
else {
	requrl="/chatgroups?limit="+limit;
}
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*修改群组信息
 * display one or more group info for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.modify_groupinfo = function(groupid,groupinfo,token, callback){
  var data={
  	"groupinfo":groupinfo
    }
  var requrl="/chatgroups/"+groupid;
  easemobrequest.request_token(data.groupinfo,requrl,'PUT',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*获取群组中的所有成员
 * display all member group info for easemob platform
 * @param groupinfo
 * @param callback
 */
exports.get_member_group = function(groupid,token, callback){
  var data={"groupinfo":""};
  var requrl="/chatgroups/"+groupid+"/users";
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};