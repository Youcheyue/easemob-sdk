var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );

describe( 'User Test', function(){
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(err){
//        console.log(err);
      }else{
        easemobSDK.token = result;
      }
    });

    done();
  });

  after( function( done ) {
    done();
  });

  describe( 'Create user', function() {
    it( 'Should return OK', function( done ) {
      console.log('-------------++++++++++++++++');
      easemobSDK.user.create(testConfig.user.username,testConfig.user.password,function( err, res,body ){
        console.log('-------------');
        should.not.exists( err );

        console.log(res.statusCode);
        res.statusCode.should.equal( 200 );

//        console.log(body.entities[0].username);
        body.entities[0].username.should.equal(testConfig.user.username);

        done();


      });

      //done();
    } );

  } );
});
