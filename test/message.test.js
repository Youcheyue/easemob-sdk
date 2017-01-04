/**
 * Created by wayne on 15-10-28.
 */
var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');
var fs = require('fs');
var path = require("path");

describe( 'Message Test', function(){
  var token;
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(!err){
        token = result.access_token;
        done();
      }
    });
  });



  describe( 'Send txt message', function() {
    var text_message_user =[{
      username        : 'text_message_wayne1',
      password        : '123456'
    },{
      username        : 'text_message_wayne2',
      password        : '123456'
    },{
      username        : 'text_message_wayne3',
      password        : '123456'
    }];
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },function(cb){
          easemobSDK.user.create_batch(text_message_user,token,function(err, res, body){
            if(!err && res.statusCode==200){
              cb(err);
            }else{
              cb(err || 'request error!')
            }
          });
        }
      ],function(err,result){
        done(err);
      });
    });
    after(function(done){
      async.eachSeries(text_message_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });
    it( 'Should return OK', function( done ) {
      var data = {
        "target_type" : "users", // users 给用户发消息, chatgroups 给群发消息
        "target" : [text_message_user[1].username], // 注意这里需要用数组,数组长度建议不大于20, 即使只有一个用户,
        // 也要用数组 ['u1'], 给用户发送时数组元素是用户名,给群组发送时
        // 数组元素是groupid
        "msg" : {
          "type" : "txt",
          "msg" : "hello from rest" //消息内容，参考[[start:100serverintegration:30chatlog|聊天记录]]里的bodies内容
        },
        "from" : text_message_user[0].username, //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
        //"ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
        //  "attr1" : "v1",
        //  "attr2" : "v2"
        //}
      };
      easemobSDK.message.send_txt(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[data.target].should.equal('success');
        done();
      });
    });
  });

  describe( 'Send img message', function() {
    var img_message_user =[{
      username        : 'img_message_wayne1',
      password        : '123456'
    },{
      username        : 'img_message_wayne2',
      password        : '123456'
    },{
      username        : 'img_message_wayne3',
      password        : '123456'
    }];
    var uuid;
    var secret;
    var file = fs.createReadStream(path.join(__dirname + '/raindrop.jpg'));
    var data = {file : file};
    var filename = __dirname + '/raindrop-thumbnail.jpg' ;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(img_message_user,token,function(err, res, body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err);
            }
          });
        },
        function(cb){
          easemobSDK.file.upload(data,true,token ,function( err, res,body ){
            if(!err ){
              var body = JSON.parse(body);
              uuid = body.entities[0].uuid;
              secret = body.entities[0]['share-secret'];
              cb(null);
            }else{
              cb(err);
            }
          });
        }],function(err,result){
        done(err);
      })

    });
    after(function(done){
      async.eachSeries(img_message_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });
    it( 'Should return OK', function( done ) {
      var data = {
        "target_type" : "users",   //users 给用户发消息, chatgroups 给群发消息
        "target" : [img_message_user[1].username],// 注意这里需要用数组,数组长度建议不大于20, 即使只有一个用户,
                                      // 也要用数组 ['u1'], 给用户发送时数组元素是用户名,给群组发送时
                                      // 数组元素是groupid
        "msg" : {  //消息内容
          "type" : "img",   // 消息类型
          "url": "https://a1.easemob.com/" + testConfig.org_name +"/"+ testConfig.app_name +  "/chatfiles/" + uuid,  //成功上传文件返回的uuid
          "filename": "text.jpg", // 指定一个文件名
          "secret": secret, // 成功上传文件后返回的secret
          //"size" : {
          //  "width" : 480,
          //  "height" : 720
          //}
        },
        "from" : img_message_user[0].username, //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
        //"ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
        //  "attr1" : "v1",
        //  "attr2" : "v2"
        //}
      };
      easemobSDK.message.send_img(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[data.target].should.equal('success');
        done();
      });
    });
  });


  describe( 'Send audio message', function() {
    var audio_message_user =[{
      username        : 'audio_message_wayne1',
      password        : '123456'
    },{
      username        : 'audio_message_wayne2',
      password        : '123456'
    },{
      username        : 'audio_message_wayne3',
      password        : '123456'
    }];
    var uuid;
    var secret;
    var file = fs.createReadStream(path.join(__dirname + '/testvoice.amr'));
    var data = {file : file};
    var filename = __dirname + '/raindrop-thumbnail.jpg' ;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function(cb){
          easemobSDK.user.create_batch(audio_message_user,token,function(err, res, body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err);
            }
          });
        },
        function(cb){
          easemobSDK.file.upload(data,true,token ,function( err, res,body ){
            if(!err ){
              var body = JSON.parse(body);
              uuid = body.entities[0].uuid;
              secret = body.entities[0]['share-secret'];
              cb(null);
            }else{
              cb(err);
            }
          });
        }],function(err,result){
        done(err);
      })

    });
    after(function(done){
      async.eachSeries(audio_message_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });
    it( 'Should return OK', function( done ) {
      var data = {
        "target_type" : "users",  //users 给用户发消息, chatgroups 给群发消息
        "target" : [audio_message_user[1].username],// 注意这里需要用数组,数组长度建议不大于20, 即使只有一个
                                               // 用户或者群组, 也要用数组形式 ['u1'], 给用户发送
                                               // 此数组元素是用户名,给群组发送时数组元素是groupid
        "msg" : {   //消息内容
          "type": "audio",  // 消息类型
          "url": "https://a1.easemob.com/" + testConfig.org_name +"/"+ testConfig.app_name +  "/chatfiles/" + uuid,   //成功上传文件返回的uuid
          "filename": "messages.amr", // 指定一个文件名
          "length": 4,
          "secret": secret// 成功上传文件后返回的secret
        },
        "from" : audio_message_user[0].username,  //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
        //"ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
        //  "attr1" : "v1",
        //  "attr2" : "v2"
        //}
      }
      easemobSDK.message.send_audio(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[data.target].should.equal('success');
        done();
      });
    });
  });

  describe( 'Send video message', function() {
    var vedio_message_user =[{
      username        : 'vedio_message_wayne1',
      password        : '123456'
    },{
      username        : 'vedio_message_wayne2',
      password        : '123456'
    },{
      username        : 'vedio_message_wayne3',
      password        : '123456'
    }];
    var uuid;
    var secret;
    var file = fs.createReadStream(path.join(__dirname + '/test.mp4'));
    var data = {file : file};
    var filename = __dirname + '/raindrop-thumbnail.jpg' ;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(vedio_message_user,token,function(err, res, body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err);
            }
          });
        },
        function(cb){
          easemobSDK.file.upload(data,true,token ,function( err, res,body ){
            if(!err ){
              var body = JSON.parse(body);
              uuid = body.entities[0].uuid;
              secret = body.entities[0]['share-secret'];
              cb(null);
            }else{
              cb(err);
            }
          });
        }],function(err,result){
        done(err);
      })

    });
    after(function(done){
      async.eachSeries(vedio_message_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });
    it( 'Should return OK', function( done ) {
      var data = {
        "target_type" : "users",  //users 给用户发消息, chatgroups 给群发消息
        "target" : [vedio_message_user[1].username],// 注意这里需要用数组,数组长度建议不大于20, 即使只有一个
        // 用户或者群组, 也要用数组形式 ['u1'], 给用户发送
        // 此数组元素是用户名,给群组发送时数组元素是groupid
        "msg" : {   //消息内容
          "type": "video",  // 消息类型
          "url": "https://a1.easemob.com/" + testConfig.org_name +"/"+ testConfig.app_name +  "/chatfiles/" + uuid,   //成功上传文件返回的uuid
          "filename": "test.mp4", // 指定一个文件名
          "file_length": 2688934,  //视频文件大小
          "length": 10,//视频播放长度
          "secret": secret ,// 成功上传文件后返回的secret
          //"thumb": "https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/67279b20-7f69-11e4-8eee-21d3334b3a97",//成功上传视频缩略图返回的uuid
          //"thumb_secret": "ZyebKn9pEeSSfY03ROk7ND24zUf74s7HpPN1oMV-1JxN2O2I",// 成功上传视频缩略图后返回的secret
        },
        "from" : vedio_message_user[0].username,  //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
        //"ext" : { //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
        //  "attr1" : "v1",
        //  "attr2" : "v2"
        //}
      };
      easemobSDK.message.send_video(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[data.target].should.equal('success');
        done();
      });
    });
  });

  describe( 'Send through message', function() {
    var through_message_user =[{
      username        : 'through_message_wayne1',
      password        : '123456'
    },{
      username        : 'through_message_wayne2',
      password        : '123456'
    },{
      username        : 'through_message_wayne3',
      password        : '123456'
    }];
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function(cb){
          easemobSDK.user.create_batch(through_message_user,token,function(err, res, body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'request error!');
            }
          });
        }
      ],function(err,result){
        done(err);
      });
    });
    after(function(done){
      async.eachSeries(through_message_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });
    it( 'Should return OK', function( done ) {
      var data = {
        "target_type":"users",     // users 给用户发消息,  chatgroups 给群发消息
        "target" : [through_message_user[1].username], // 注意这里需要用数组,数组长度建议不大于20, 即使只有
                                    // 一个用户u1或者群组, 也要用数组形式 ['u1'], 给用户发
                                    // 送时数组元素是用户名,给群组发送时数组元素是groupid
        "msg":{  //消息内容
          "type":"txt",  // 消息类型
          "action":"action1"
        },
        "from":[through_message_user[0].username], //表示这个消息是谁发出来的, 可以没有这个属性, 那么就会显示是admin, 如果有的话, 则会显示是这个用户发出的
        //"ext":{   //扩展属性, 由app自己定义.可以没有这个字段，但是如果有，值不能是“ext:null“这种形式，否则出错
        //  "attr1":"v1",
        //  "attr2":"v2"
        //}
      };
      easemobSDK.message.send_through(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[data.target].should.equal('success');
        done(err);
      });
    });
  });



});
