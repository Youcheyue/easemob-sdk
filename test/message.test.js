/**
 * Created by wayne on 15-10-28.
 */
var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');

describe( 'Message Test', function(){
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

  describe( 'Send txt message', function() {
    var data = {
      "target_type" : "users", // users 给用户发消息, chatgroups 给群发消息
      "target" : ["wayne"], // 注意这里需要用数组,数组长度建议不大于20, 即使只有一个用户,
                                     // 也要用数组 ['u1'], 给用户发送时数组元素是用户名,给群组发送时
                                     // 数组元素是groupid
      "msg" : {
        "type" : "txt",
        "msg" : "hello from rest" //消息内容，参考[[start:100serverintegration:30chatlog|聊天记录]]里的bodies内容
      },
      //"from" : "jma2", //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
      //"ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
      //  "attr1" : "v1",
      //  "attr2" : "v2"
      //}
    };
    it( 'Should return OK', function( done ) {
      easemobSDK.message.send_txt(data,token ,function( err, res,body ){
        console.log(body);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });

  describe( 'Send img message', function() {
    var data = {
      "target_type" : "users",   //users 给用户发消息, chatgroups 给群发消息
      "target" : ["u1", "u2", "u3"],// 注意这里需要用数组,数组长度建议不大于20, 即使只有一个用户,
                                    // 也要用数组 ['u1'], 给用户发送时数组元素是用户名,给群组发送时
                                    // 数组元素是groupid
      "msg" : {  //消息内容
        "type" : "img",   // 消息类型
        "url": "https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/55f12940-64af-11e4-8a5b-ff2336f03252",  //成功上传文件返回的uuid
        "filename": "24849.jpg", // 指定一个文件名
        "secret": "VfEpSmSvEeS7yU8dwa9rAQc-DIL2HhmpujTNfSTsrDt6eNb_", // 成功上传文件后返回的secret
        "size" : {
          "width" : 480,
          "height" : 720
        }
      },
      //"from" : "jma2", //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
      //"ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
      //  "attr1" : "v1",
      //  "attr2" : "v2"
      //}
    };
    it( 'Should return OK', function( done ) {
      easemobSDK.message.send_txt(data,token ,function( err, res,body ){
        console.log(body);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });

  describe( 'Send audio message', function() {
    var data = {
      "target_type" : "users",  //users 给用户发消息, chatgroups 给群发消息
      "target" : ["testd", "testb", "testc"],// 注意这里需要用数组,数组长度建议不大于20, 即使只有一个
                                             // 用户或者群组, 也要用数组形式 ['u1'], 给用户发送
                                             // 此数组元素是用户名,给群组发送时数组元素是groupid
      "msg" : {   //消息内容
        "type": "audio",  // 消息类型
        "url": "https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/1dfc7f50-55c6-11e4-8a07-7d75b8fb3d42",  //成功上传文件返回的uuid
        "filename": "messages.amr", // 指定一个文件名
        "length": 10,
        "secret": "Hfx_WlXGEeSdDW-SuX2EaZcXDC7ZEig3OgKZye9IzKOwoCjM" // 成功上传文件后返回的secret
      },
      "from" : "testa" ,  //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
      "ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
        "attr1" : "v1",
        "attr2" : "v2"
      }
    };
    it( 'Should return OK', function( done ) {
      easemobSDK.message.send_txt(data,token ,function( err, res,body ){
        console.log(body);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });

  describe( 'Send audio message', function() {
    var data = {
      "target_type": "users", //users 给用户发消息, chatgroups 给群发消息
      "target": [
        "ceshib"// 注意这里需要用数组,数组长度建议不大于20, 即使只有一个，// 用户或者群组, 也要用数组形式 ['u1'], 给用户发送
      ], // 此数组元素是用户名,给群组发送时数组元素是groupid
      "from": "ceshia",
      "msg": { //消息内容
        "type": "video",// 消息类型
        "filename": "1418105136313.mp4",// 视频文件名称
        "thumb": "https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/67279b20-7f69-11e4-8eee-21d3334b3a97",//成功上传视频缩略图返回的uuid
        "length": 10,//视频播放长度
        "secret": "VfEpSmSvEeS7yU8dwa9rAQc-DIL2HhmpujTNfSTsrDt6eNb_",// 成功上传视频文件后返回的secret
        "file_length": 58103,//视频文件大小
        "thumb_secret": "ZyebKn9pEeSSfY03ROk7ND24zUf74s7HpPN1oMV-1JxN2O2I",// 成功上传视频缩略图后返回的secret
        "url": "https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/671dfe30-7f69-11e4-ba67-8fef0d502f46"//成功上传视频文件返回的uuid
      }
    };
    it( 'Should return OK', function( done ) {
      easemobSDK.message.send_txt(data,token ,function( err, res,body ){
        console.log(body);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });


});
