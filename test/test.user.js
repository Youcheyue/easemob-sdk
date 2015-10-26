var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var app_const       = require( '../lib/const');

describe( 'User Test', function(){
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(err){
        console.log(err);
        console.log(result);
      }else{
        app_const.TOKEN = result;
      }
    });

    done();
  });

  after( function( done ) {
    done();
  });

  describe( 'Create user', function() {
    it( 'Should return OK', function( done ) {

      easemobSDK.user.create(testConfig.user.username,testConfig.user.password,function( err, res,body ){

        should.not.exists( err );


        res.statusCode.should.equal( 200 );


        body.entities[0].username.should.equal(testConfig.user.username);

        done();


      });

    } );

  } );

  describe( 'Batch create user', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.create_batch(testConfig.batch_user ,function( err, res,body ){

        should.not.exists( err );

        res.statusCode.should.equal( 200 );

        body.entities[0].username.should.equal(testConfig.batch_user[0].username);
        body.entities[1].username.should.equal(testConfig.batch_user[1].username);

        done();

      });

    } );

  } );

  describe( 'Get user', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.get(testConfig.user.username ,function( err, res,body ){

        should.not.exists( err );

        res.statusCode.should.equal( 200 );

        body.entities[0].username.should.equal(testConfig.user.username);

        done();

      });

    } );

  } );


  describe( 'Batch Get user', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.get_batch(testConfig.user_limit ,function( err, res,body ){

        should.not.exists( err );
        res.statusCode.should.equal( 200 );

        done();

      });

    } );

  } );

  describe( 'Remote user', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.remote(testConfig.user.username ,function( err, res,body ){

        should.not.exists( err );

        res.statusCode.should.equal( 200 );
        body.action.should.equal("delete");
        body.entities[0].username.should.equal(testConfig.user.username);

        done();

      });

    } );

  } );
/*
  describe( 'Batch remote user', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.user.create_batch(testConfig.user_limit ,function( err, res,body ){

        should.not.exists( err );

        res.statusCode.should.equal( 200 );

        body.entities[0].username.should.equal(testConfig.batch_user[0].username);
        body.entities[1].username.should.equal(testConfig.batch_user[1].username);

        done();

      });

    } );

  } );
*/
});
