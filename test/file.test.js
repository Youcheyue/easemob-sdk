/**
 * Created by wayne on 15-10-28.
 */

var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');
var fs = require('fs');
var path = require("path");

describe.only( 'File Test', function(){
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

  describe( 'Upload file', function() {
    it( 'Should return OK', function( done ) {
      //var file = fs.readFileSync(path.join(__dirname,'raindrop.jpg'),{encoding:'utf8',flag:'r'});
      var file = fs.createReadStream(path.join(__dirname + '/raindrop.jpg'));
      var data = {file : file};
      easemobSDK.file.upload(data,true,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        console.log(token);
        console.log(body);
        done(err);
      });
    });
  });


});
