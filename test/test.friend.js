var should              = require( 'should' );
var testConfig  = require( './config_friend' );
var easemobSDK  = require( '../index' );
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
        done();
      }
    });

  });

/*  describe( 'add friend', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.friend.add_friend(testConfig.user.username,testConfig.user.friend,function( err, res,body ){
	console.log(err);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
       // body.entities[0].username.should.equal(testConfig.user.username);
        done();

      });

    } );
}); 

  describe( 'delete friend', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.friend.delete_friend(testConfig.delete_user.username,testConfig.delete_user.friend,function( err, res,body ){
        console.log(err);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
       // body.entities[0].username.should.equal(testConfig.user.username);
        done();

      });

    } );
}); 

  describe( 'display friend', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.friend.show_friend(testConfig.add_user.username,function( err, res,body ){
        console.log(err);
        should.not.exists( err );
	console.log(res.body.data);
        res.statusCode.should.equal( 200 );
        done();

      });

    } ); */

  describe( 'display blacklist', function() {
    it( 'Should return OK', function( done ) {
      easemobSDK.friend.show_blacklist(testConfig.add_user.username,function( err, res,body ){
        console.log(err);
        should.not.exists( err );
	console.log(res.body.data);
        res.statusCode.should.equal( 200 );
        done();

      });

    });

});









});
