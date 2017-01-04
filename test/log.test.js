/**
 * Created by wayne on 15-10-30.
 */
var _ = require('underscore');
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var should 		= require( 'should' );

describe( 'log Test', function(){
  var token;
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(!err){
        token = result.access_token;
        done(err);
      }
    });
  });
  describe( 'Export log', function() {
    it( 'Should return OK', function( done ) {
      var data = {
        limit : 5,
        timestamp : '<' + Date.now()
      };
      easemobSDK.log.export(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });
});
