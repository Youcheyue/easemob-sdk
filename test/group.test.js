var should              = require( 'should' );
var testConfig  = require( './config_friend' );
var easemobSDK  = require( '../index' );
var async = require('async');

describe( 'group test', function(){
  var token;
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(err){
        console.log(err);
        console.log(result);
      }else{
        token = result;
        done();
      }
    });
  });
  //增加群组
  describe( 'add a grouplist for chat', function() {
  	var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
  	var groupinfo={
    "groupname":"testrestgrp12", //群组名称, 此属性为必须的
    "desc":"server create group", //群组描述, 此属性为必须的
    "public":true, //是否是公开群, 此属性为必须的
    "maxusers":300, //群组成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
    "approval":true, //加入公开群是否需要批准, 默认值是true（加群需要群主批准）, 此属性为可选的
    "owner":"limintest111", //群组的管理员, 此属性为必须的
    "members":["limintest2"] //群组成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
};
	before(function(done){
		easemobSDK.user.remove_batch(10,token,function( err, res,body ) { 
			if(!err && res.statusCode==200)  {
					easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
     easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        if(!err && res.statusCode==200) {
        		//console.log(res.body.data);
        		done();
      }else {
      	console.log(err);
      	console.log(body);
      }
      });
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
			}
			});
    });
  /*after(function(done){
  	 easemobSDK.group.display_group(token,function( err, res,body ) {
  	 	if(!err && res.statusCode==200) {
  	 		for(var i=0;i<res.body.data.length;i++){  
         easemobSDK.group.delete_group(res.body.data[i].groupid,token,function( err, res,body ) {
         	 if(!err && res.statusCode==200) {
          				//console.log(res.body.data);
          				easemobSDK.user.remove_batch(10,token,function( err, res,body ){
                        if(!err && res.statusCode==200) { 
        										done();
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
         }
               else {
      	console.log(err);
      	console.log(body);
      }
         
         
             });
             } 
             }
             });
}); */
   it('add group should return OK', function( done ) {
        easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        //console.log(res.body.data.groupid);
        done();
      });
    });    
  });  
  
   //删除一个群组
   describe( 'delete a group  for chat', function() {
   	var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    	var groupinfo={
    "groupname":"testrestgrp22", 
    "desc":"server create group", 
    "public":true, 
    "maxusers":300,
    "approval":true, 
    "owner":"limintest111", 
    "members":["limintest2"] 
}; 
	before(function(done){
		easemobSDK.user.remove_batch(10,token,function( err, res,body ) { 
			if(!err && res.statusCode==200)  {
					easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
     easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        if(!err && res.statusCode==200) {
        		console.log(res.body.data);
        		groupid=res.body.data.groupid;
        		done();
      }else {
      	console.log(err);
      	console.log(body);
      }
      });
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
			}
			});
    });
   it('delete group should return OK', function( done ) {
        easemobSDK.group.delete_group(groupid,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        //console.log(res.body);
        done();
      });
    });    
  });
 
 //查询群组
  describe('display a grouplist for chat', function() {
  		var batch_user =[{
      username        : 'limintest211',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
  	var groupinfo={
    "groupname":"testrestgrp12",
    "desc":"server create group", 
    "public":true, 
    "maxusers":300, 
    "approval":true, 
    "owner":"limintest211", 
    "members":["limintest2"] 
}; 
	before(function(done){
		easemobSDK.user.remove_batch(10,token,function( err, res,body ) { 
			if(!err && res.statusCode==200)  {
					easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
     easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        if(!err && res.statusCode==200) {
        		done();
      }else {
      	console.log(err);
      	console.log(body);
      }
      });
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
			}
			});
    });
  it('display group should return OK', function( done ) {
         easemobSDK.group.display_group(token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        //console.log(res.body.data);
        done();
      });
    });    
  }); 
  
  
  //分页查询群组
  describe('display a grouplist for many pages', function() {
  	var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    var groupinfo={
    "groupname":"testrestgrp112",
    "desc":"server create group", 
    "public":true, 
    "maxusers":300, 
    "approval":true, 
    "owner":"limintest111", 
    "members":["limintest2"] 
}; 
	before(function(done){
		easemobSDK.user.remove_batch(10,token,function( err, res,body ) { 
			if(!err && res.statusCode==200)  {
					easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) { 
        		   easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        if(!err && res.statusCode==200) {
        		done();
      }else {
      	console.log(err);
      	console.log(body);
      } 
      });
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
			}
			});
    });
  after(function(done){
  	 easemobSDK.group.display_group(token,function( err, res,body ) {
  	 	if(!err && res.statusCode==200) {
  	 		for(var i=0;i<res.body.data.length;i++){  
         easemobSDK.group.delete_group(res.body.data[i].groupid,token,function( err, res,body ) {
         	 if(!err && res.statusCode==200) {
          				easemobSDK.user.remove_batch(10,token,function( err, res,body ){
                        if(!err && res.statusCode==200) { 
        done();
      }
      });
         }
             });
             } 
             }
             });
}); 
  it('display group many pages should return OK', function( done ) {
  			var limit=2;
  			var cursor=null
        easemobSDK.group.display_page_group(limit,cursor,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        //console.log(res.body.data);
        done();
      });
    });    
  }); 
  
  //修改群组信息
  describe('modify a groupinfo of group', function() {
  	var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    var groupinfo={
    "groupname":"testrestgrp112",
    "desc":"server create group", 
    "public":true, 
    "maxusers":300, 
    "approval":true, 
    "owner":"limintest111", 
    "members":["limintest2"] 
}; 
	before(function(done){
		easemobSDK.user.remove_batch(10,token,function( err, res,body ) { 
			if(!err && res.statusCode==200)  {
					easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) { 
        		   easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        if(!err && res.statusCode==200) {
        	groupid=res.body.data.groupid;
        		done();
      }else {
      	console.log(err);
      	console.log(body);
      } 
      });
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
			}
			});
    });
  /*after(function(done){
  	 easemobSDK.group.display_group(token,function( err, res,body ) {
  	 	if(!err && res.statusCode==200) {
  	 		for(var i=0;i<res.body.data.length;i++){  
         easemobSDK.group.delete_group(res.body.data[i].groupid,token,function( err, res,body ) {
         	 if(!err && res.statusCode==200) {
          				easemobSDK.user.remove_batch(10,token,function( err, res,body ){
                        if(!err && res.statusCode==200) { 
        done();
      }
      });
         }
             });
             } 
             }
             });
}); */
  it('modify groupinfo should return OK', function( done ) {
  			var newgroupinfo={
  				"groupname":"liman",
  				"description":"update groupinfo",
  				"maxusers":400};
        easemobSDK.group.modify_groupinfo(groupid,newgroupinfo,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        console.log(res.body.data);
        done();
      });
    });    
  }); 
  
  //获取群组成员信息
  describe('get a member of group', function() {
  	var batch_user =[{
      username        : 'limintest011',
      password        : '123456'
    },{
      username        : 'limintest22',
      password        : '123456'
    }];
    var groupinfo={
    "groupname":"testrestgrp1212",
    "desc":"server create group", 
    "public":true, 
    "maxusers":300, 
    "approval":true, 
    "owner":"limintest011", 
    "members":["limintest22"] 
}; 
	before(function(done){
		easemobSDK.user.remove_batch(10,token,function( err, res,body ) { 
			if(!err && res.statusCode==200)  {
					easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) { 
        		   easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        if(!err && res.statusCode==200) {
        	groupid=res.body.data.groupid;
        		done();
      }else {
      	console.log(err);
      	console.log(body);
      } 
      });
      }
      else {
      	console.log(err);
      	console.log(body);
      }
      });
			}
			});
    });
  after(function(done){
  	 easemobSDK.group.display_group(token,function( err, res,body ) {
  	 	if(!err && res.statusCode==200) {
  	 		for(var i=0;i<res.body.data.length;i++){  
         easemobSDK.group.delete_group(res.body.data[i].groupid,token,function( err, res,body ) {
         	 if(!err && res.statusCode==200) {
          				easemobSDK.user.remove_batch(10,token,function( err, res,body ){
                        if(!err && res.statusCode==200) { 
        done();
      }
      });
         }
             });
             } 
             }
             });
}); 
  it('get member of group should return OK', function( done ) {
  			console.log(groupid);
        easemobSDK.group.get_member_group(groupid,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        console.log(res.body.data);
        done();
      });
    });    
  }); 
  
  
  
 
  
});  