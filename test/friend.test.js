var should              = require( 'should' );
var testConfig  = require( './config' );
var easemobSDK  = require( '../index' );
var async = require('async');

describe( 'friend test', function(){
  var token;
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(!err){
        token = result;
        done();
      }
    });
  });
  //增加好友
  describe( 'add user for friend', function() {
    batch_user =[{
      username        : 'liman',
      password        : '123456'
    },{
      username        : 'limantest651',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
                done();
      }
      });
    });
    after(function(done){
      async.eachSeries(batch_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delte !');
          }
        });
      },function(err){
        done();
      });
    });
   it('add friend Should return OK', function( done ) {
         easemobSDK.friend.add_friend(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

 //查询好友
  describe( "display user of friend", function() {
    batch_user =[{
      username        : 'liman1',
      password        : '123456'
    },{
      username        : 'limantest1',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
       easemobSDK.friend.add_friend(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
       if(!err && res.statusCode==200) {
                done();
      }
      });
      }
      });
    });
    after(function(done){
      async.eachSeries(batch_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delte !');
          }
        });
      },function(err){
        done();
      });
    });
    it('display friend Should return OK', function( done ) {
         easemobSDK.friend.show_friend(batch_user[0].username,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
});

 //解除好友
  describe( "delete user of friend", function() {
    batch_user =[{
      username        : 'liman111',
      password        : '123456'
    },{
      username        : 'limantest1',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
       easemobSDK.friend.add_friend(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
       if(!err && res.statusCode==200) {
                done();
      }
      });
      }
      });
    });
    after(function(done){
      async.eachSeries(batch_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delte !');
          }
        });
      },function(err){
        done();
      });
    });
    it('delete friend Should return OK', function( done ) {
        easemobSDK.friend.delete_friend(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
});

   //增加好友黑名单
  describe( 'add user for blocklist', function() {
    batch_user =[{
      username        : 'limantest101',
      password        : '123456'
    },{
      username        : 'limantest211',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
                done();
      }
      });
    });
    after(function(done){
      async.eachSeries(batch_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delte !');
          }
        });
      },function(err){
        done();
      });
    });
    it('add blocklist should return OK', function( done ) {
         easemobSDK.friend.add_blacklist(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
});

  //查询黑名单
  describe( 'display user of blocklist', function() {
    batch_user =[{
      username        : 'limantest1',
      password        : '123456'
    },{
      username        : 'limantest232',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
        	     easemobSDK.friend.add_blacklist(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
       if(!err && res.statusCode==200) {
                done();
      }
      });
      }
      });
    });
    after(function(done){
      async.eachSeries(batch_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delte !');
          }
        });
      },function(err){
        done();
      });
    });
    it('display blocklist should return OK', function( done ) {
   	 easemobSDK.friend.show_blacklist(batch_user[0].username,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
});

   //移除黑名单
  describe( 'delete user of blocklist', function() {
    batch_user =[{
      username        : 'limantest11',
      password        : '123456'
    },{
      username        : 'limantest2222',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        if(!err && res.statusCode==200) {
        	     easemobSDK.friend.add_blacklist(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
       if(!err && res.statusCode==200) {
                done();
      }
      });
      }
      });
    });
    after(function(done){
      async.eachSeries(batch_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delte !');
          }
        });
      },function(err){
        done();
      });
    });
    it('delete blocklist should return OK', function( done ) {
   	 easemobSDK.friend.delete_blacklist(batch_user[0].username,batch_user[1].username,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
});







});
