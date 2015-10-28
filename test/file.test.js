/**
 * Created by wayne on 15-10-28.
 */

//var should 		= require( 'should' );
//var testConfig  = require( './config' );
//var easemobSDK 	= require( '../index' );
//var async = require('async');
//
//describe( 'File Test', function(){
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
//
//  describe( 'Upload file', function() {
//    it( 'Should return OK', function( done ) {
//      var file = {file : 'http://img2.comprame.com/cache//catalog/product//0/6/0601-selfie-3-2_1-74x74.jpg'};
//      console.log(token);
//      easemobSDK.file.upload(file,true,token ,function( err, res,body ){
//        console.log(body);
//        should.not.exists( err );
//        res.statusCode.should.equal( 200 );
//        done();
//      });
//    });
//  });
//
//
//});
