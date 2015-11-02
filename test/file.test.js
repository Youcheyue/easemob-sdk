/**
 * Created by wayne on 15-10-28.
 */

var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');
var fs = require('fs');
var path = require("path");

describe( 'File Test', function(){
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
      var file = fs.createReadStream(path.join(__dirname + '/raindrop.jpg'));
      var data = {file : file};
      easemobSDK.file.upload(data,true,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done(err);
      });
    });
  });

  describe( 'Download file', function() {
    var uuid,secret;
    var file = fs.createReadStream(path.join(__dirname + '/raindrop.jpg'));
    var data = {file : file};
    var filename = __dirname + '/raindrop-2.jpg' ;
    before(function(done){
      easemobSDK.file.upload(data,true,token ,function( err, res,body ){
        var body = JSON.parse(body);
        if(!err ){
          uuid = body.entities[0].uuid;
          secret = body.entities[0]['share-secret'];
        }
        done(err);
      });
    });
    //after(function(done){
    //  fs.unlink(filename,function(err){
    //    done(err);
    //  })
    //});
    it( 'Should return OK', function( done ) {
      easemobSDK.file.download(filename,secret,uuid,token,function(err){
        done(err);
      } );

    });
  });

  describe( 'Download thumbnail', function() {
    var uuid;
    var secret;
    var file = fs.createReadStream(path.join(__dirname + '/raindrop.jpg'));
    var data = {file : file};
    var filename = __dirname + '/raindrop-thumbnail.jpg' ;
    before(function(done){
      easemobSDK.file.upload(data,true,token ,function( err, res,body ){
        var body = JSON.parse(body);
        if(!err ){
          uuid = body.entities[0].uuid;
          secret = body.entities[0]['share-secret'];
        }
        done(err);
      });
    });
    //after(function(done){
    //  fs.unlink(filename,function(err){
    //    done(err);
    //  })
    //});
    it( 'Should return OK', function( done ) {
      easemobSDK.file.download_thumbnail(filename,secret,uuid,token,function(err){
        done(err);
      } );

    });
  });


});
