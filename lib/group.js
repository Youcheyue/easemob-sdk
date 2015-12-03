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
 * @param groupid
 * @param callback
 */
exports.delete_group = function(groupid,token, callback){
  var data={"groupinfo":groupid};
  var requrl="/chatgroups/"+groupid;
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*查询群组 获取app中所有的群组
 * display group for easemob platform
 * @param callback
 */
exports.display_group = function(token, callback){
  var data={"groupinfo":""};
  var requrl="/chatgroups/";
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*获取一个或者多个群组的详情
 * display groupinfo for easemob platform
 * @param groups is a array
 * @param callback
 */
exports.display_group_detail = function(groups,token, callback){
  var data={"groupinfo":""};
  var requrl="/chatgroups/"+groups;
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*分页获取app下的群组
 * display group for easemob platform
 * @param limit cursor
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

/*群组加人
 * add user into group easemob platform
 * @param groupid username
 * @param callback
 */
exports.add_user_into_group = function(groupid,username,token, callback){
  var data={"groupinfo":""};
  var requrl="/chatgroups/"+groupid+"/users/"+username;
  easemobrequest.request_token(data,requrl,'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*群组加人[批量]
 * add user into group easemob platform
 * @param groupid
 * @param users is a array
 * @param callback
 */
exports.add_manyuser_into_group = function(groupid,users,token, callback){
  var data={"usernames": users };
  var requrl="/chatgroups/"+groupid+"/users/";
  easemobrequest.request_token(data,requrl,'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*群组减人[单个]
 * delete user into group easemob platform
 * @param groupid username
 * @param callback
 */
exports.delete_user_from_group = function(groupid,username,token, callback){
  var data={"groupinfo":""};
  var requrl="/chatgroups/"+groupid+"/users/"+username;
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*群组减人[批量]
 * delete many users from group easemob platform
 * @param groupid
 * @param users is a array
 * @param callback
 */
 exports.delete_manyuser_from_group = function(groupid,users,token, callback){
  var requrl="/chatgroups/"+groupid+"/users/"+users;
   var data = {};
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*获取一个用户参与的所有群组
 * get users belong group easemob platform
 * @param username
 * @param callback
 */
 exports.get_user_of_group = function(username,token, callback){
 	var data={"groupinfo":""};
  var requrl="/users/"+username+"/joined_chatgroups";
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*群组转让
 * modify new owner of a group easemob platform
 * @param groupid
 * @param username is newowner
 * @param callback
 */
 exports.modify_owner_of_group = function(groupid,username,token, callback){
 	var data={"newowner": username };
  var requrl="/chatgroups/"+groupid;
  easemobrequest.request_token(data,requrl,'PUT',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*群组黑名单添加
 * add a blacklist of group easemob platform
 * @param groupid
 * @param username is blacklist
 * @param callback
 */
 exports.add_blacklist_of_group = function(groupid,username,token, callback){
 	var data={"newowner": "" };
  var requrl="/chatgroups/"+groupid+"/blocks/users/"+username;
  easemobrequest.request_token(data,requrl,'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*群组黑名单个删除
 * delete a blacklist of group easemob platform
 * @param groupid
 * @param username is blacklist
 * @param callback
 */
 exports.delete_blacklist_of_group = function(groupid,username,token, callback){
 	var data={"newowner": "" };
  var requrl="/chatgroups/"+groupid+"/blocks/users/"+username;
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*群组黑名单批量添加
 * add many blacklist of group easemob platform
 * @param groupid
 * @param username is a array
 * @param callback
 */
 exports.add_many_blacklist_of_group = function(groupid,username,token, callback){
 	var data={"usernames": username };
  var requrl="/chatgroups/"+groupid+"/blocks/users/";
  easemobrequest.request_token(data,requrl,'POST',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};


/*群组黑名单批量删除
 * delete many blacklist of group easemob platform
 * @param groupid
 * @param username is a array
 * @param callback
 */
 exports.delete_many_blacklist_of_group = function(groupid,username,token, callback){
 	var data={"usernames": "" };
  var requrl="/chatgroups/"+groupid+"/blocks/users/"+username;
  easemobrequest.request_token(data,requrl,'DELETE',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

/*群组黑名单查询
 * add many blacklist of group easemob platform
 * @param groupid
 * @param callback
 */
 exports.display_blacklist_of_group = function(groupid,token, callback){
 	var data={"newowner": "" };
  var requrl="/chatgroups/"+groupid+"/blocks/users/";
  easemobrequest.request_token(data,requrl,'GET',token, function ( err,res, body ) {
    callback( err,res, body );
  })
};



