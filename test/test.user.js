var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');

describe( 'User Test', function(){
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

  //after( function( done ) {
  //  easemobSDK.user.remote(testConfig.batch_user[0].username ,testConfig.TOKEN,function( err, res,body ){
  //    if(!err && res.statusCode == 200){
  //      easemobSDK.user.remote(testConfig.batch_user[1].username ,testConfig.TOKEN,function( err, res,body ){
  //        if(!err && res.statusCode == 200){
  //          done();
  //        }
  //      });
  //    }
  //  });
  //});



  describe( 'Create user', function() {
    var username = 'create_wayne';
    var password = '123456';
    after(function(done){
      easemobSDK.user.remove(username,token,function(err, res, body){
        if(!err && res.statusCode==200){
          done();
        }
      });
    });
    it( 'Should return OK', function( done ) {
      easemobSDK.user.create(username,password,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.entities[0].username.should.equal(username);
        done();
      });
    });
  });


  describe( 'Batch create user', function() {
    batch_user =[{
      username        : 'create_wayne1',
      password        : '123456'
    },{
      username        : 'create_wayne2',
      password        : '123456'
    }];
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
    it( 'Should return OK', function( done ) {
      easemobSDK.user.create_batch(batch_user,token, function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.entities[0].username.should.equal(batch_user[0].username);
        body.entities[1].username.should.equal(batch_user[1].username);
        done();
      });
    });
  });
  //
  //describe( 'Get user', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.get(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //
  //      res.statusCode.should.equal( 200 );
  //
  //      body.entities[0].username.should.equal(testConfig.user.username);
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //
  //describe( 'Batch Get user', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.get_batch(testConfig.user_limit ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //      res.statusCode.should.equal( 200 );
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Reset user password', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.reset_password(testConfig.user.username ,testConfig.user_newpassword ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //
  //      res.statusCode.should.equal( 200 );
  //      body.action.should.equal('set user password');
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Set user nickname', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.set_nickname(testConfig.user.username ,testConfig.user_nickname ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //
  //      res.statusCode.should.equal( 200 );
  //      body.entities[0].username.should.equal(testConfig.user.username);
  //      body.entities[0].nickname.should.equal(testConfig.user_nickname);
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Get user status', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.get_status(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //      res.statusCode.should.equal( 200 );
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Get user offline msg count', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.get_offline_msg_count(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //      res.statusCode.should.equal( 200 );
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
/*
  describe( 'Get user offline msg status', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.get_offline_msg_status(testConfig.user.username,msg_id ,testConfig.TOKEN ,function( err, res,body ){

        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        console.log(body);
        done();

      });

    } );

  } );
  */

  //describe( 'Deactivate user', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.deactivate(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //      res.statusCode.should.equal( 200 );
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Activate user', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.activate(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //      res.statusCode.should.equal( 200 );
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Disconnect user', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.disconnect(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //      res.statusCode.should.equal( 200 );
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
  //
  //describe( 'Remote user', function() {
  //  it( 'Should return OK', function( done ) {
  //    easemobSDK.user.remote(testConfig.user.username ,testConfig.TOKEN ,function( err, res,body ){
  //
  //      should.not.exists( err );
  //
  //      res.statusCode.should.equal( 200 );
  //      body.action.should.equal("delete");
  //      body.entities[0].username.should.equal(testConfig.user.username);
  //
  //      done();
  //
  //    });
  //
  //  } );
  //
  //} );
/*
  describe( 'Batch remote user', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.remote_batch(testConfig.user_limit ,testConfig.TOKEN ,function( err, res,body ){

        should.not.exists( err );

        res.statusCode.should.equal( 200 );


        done();

      });

    } );

  } );

*/

});
