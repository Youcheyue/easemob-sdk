//var should              = require( 'should' );
//var testConfig  = require( './config_friend' );
//var easemobSDK  = require( '../index' );
//var async = require('async');
//
//describe( 'friend test', function(){
//  var token;
//  before( function( done ){
//    // Init the SDK before testing.
//    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
//    easemobSDK.get_token(function(err,result){
//      if(err){
//        console.log(err);
//        console.log(result);
//      }else{
//        token = result;
//        done();
//      }
//    });
//  });
//  //增加群组
//  /*describe( 'add a grouplist for chat\n', function() {
//  	var groupinfo={
//    "groupname":"testrestgrp12", //群组名称, 此属性为必须的
//    "desc":"server create group", //群组描述, 此属性为必须的
//    "public":true, //是否是公开群, 此属性为必须的
//    "maxusers":300, //群组成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
//    "approval":true, //加入公开群是否需要批准, 默认值是true（加群需要群主批准）, 此属性为可选的
//    "owner":"limintest1", //群组的管理员, 此属性为必须的
//    "members":["limintest2"] //群组成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
//};
//   it('add group Should return OK\n', function( done ) {
//        easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
//        should.not.exists( err );
//        res.statusCode.should.equal(200);
//        console.log(res.body);
//        done();
//      });
//    });
//  });*/
//   //删除一个群组
//  describe( 'delete a  for chat\n', function() {
//  	/*var groupinfo={
//    "groupname":"testrestgrp12", //群组名称, 此属性为必须的
//    "desc":"server create group", //群组描述, 此属性为必须的
//    "public":true, //是否是公开群, 此属性为必须的
//    "maxusers":300, //群组成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
//    "approval":true, //加入公开群是否需要批准, 默认值是true（加群需要群主批准）, 此属性为可选的
//    "owner":"limintest1", //群组的管理员, 此属性为必须的
//    "members":["limintest2"] //群组成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
//}; */
//   /* before(function(done){
//      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
//        if(!err && res.statusCode==200) {
//                done();
//      }
//      });
//    });
//    after(function(done){
//      async.eachSeries(batch_user, function iterator(user, callback){
//        easemobSDK.user.remove(user.username,token,function(err, res, body){
//          if(!err && res.statusCode==200){
//            callback(null);
//          }else {
//            callback(err || 'can not delte !');
//          }
//        });
//      },function(err){
//        done();
//      });
//    });*/
//   it('delete group should return OK\n', function( done ) {
//        easemobSDK.group.add_group('121870883051536936',token,function( err, res,body ){
//        should.not.exists( err );
//        res.statusCode.should.equal(200);
//        console.log(res.body);
//        done();
//      });
//    });
//  });
//
//
//
//
//
//
//});
