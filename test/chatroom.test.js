/**
 * Created by wayne on 15-10-28.
 */
var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');

describe.only( 'Chatroom Test', function(){
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

  describe( 'Create chatroom', function() {
    create_chatroom_user =[{
      username        : 'create_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'create_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'create_chatroom_wayne3',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(create_chatroom_user,token,function(err, res, body){
        if(!err && res.statusCode==200){
          done();
        }
      });
    });
    after(function(done){
      async.eachSeries(create_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done();
      });
    });

    it( 'Should return OK', function( done ) {
      var data = {
        "name":"testchatroom", //聊天室名称, 此属性为必须的
        "description":"server create chatroom", //聊天室描述, 此属性为必须的
        "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
        "owner":"create_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
        "members":["create_chatroom_wayne2","create_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
      };
      easemobSDK.chatroom.create(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });

  describe( 'Modify chatroom', function() {
    modify_chatroom_user =[{
      username        : 'modify_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'modify_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'modify_chatroom_wayne3',
      password        : '123456'
    }];
    var chatroom_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"modify_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["modify_chatroom_wayne2","modify_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      console.log('-------------');
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(modify_chatroom_user,token,function(err,res,body){
            cb(err);
          })
        },
        function(cb){
          easemobSDK.chatroom.create(chatroom_data,token ,function(err,res,body){
            chatroom_id  = body['data']['id'];
            cb(err);
          })
        }
      ],function(err,result){
        if(!err){
          done();
        }else{
          console.log(err);
          console.log(result);
        }
      });

    });
    //after(function(done){
    //  async.eachSeries(create_chatroom_user, function iterator(user, callback){
    //    easemobSDK.user.remove(user.username,token,function(err, res, body){
    //      if(!err && res.statusCode==200){
    //        callback(null);
    //      }else {
    //        callback(err || 'can not delete !');
    //      }
    //    });
    //  },function(err){
    //    done();
    //  });
    //});

    it( 'Should return OK', function( done ) {
      var modify_chatroom_data = {
        "name":"test wayne chatroom", //聊天室名称
        "description":"update chatroominfo", //聊天室描述
        "maxusers":200, //聊天室成员最大数(包括群主), 值为数值类型
      }
      easemobSDK.chatroom.modify(modify_chatroom_data,chatroom_id ,token ,function( err, res,body ){
        console.log(body);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });


});
