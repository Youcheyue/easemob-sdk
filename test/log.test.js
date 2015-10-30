/**
 * Created by wayne on 15-10-30.
 */
var _ = require('underscore');
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );

describe.only( 'log Test', function(){
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
        done(err);
      }
    });
  });
  describe.only( 'Export log', function() {
    it( 'Should return OK', function( done ) {
      var data = {
        limit : 5,
        timestamp : '<' + Date.now()
      };
      easemobSDK.log.export(data,token ,function( err, res,body ){
        console.log(body);
        console.log(err);
        console.log(res.statusCode);
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done();
      });
    });
  });
});
