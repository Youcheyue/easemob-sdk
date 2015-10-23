var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );

describe( 'User Test', function(){
    before( function( done ){
        // Init the SDK before testing.
        easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
        done();
    });

    after( function( done ) {
        done();
    } );

    describe( 'Create user', function() {
        it( 'Should return OK', function( done ) {
            easemobSDK.user.create(testConfig.user.username,testConfig.user.password,function( err, res,body ){

                should.not.exists( err );

                console.log(res.statusCode);
                res.statusCode.should.equal( 200 );

                console.log(body.entities[0].username);
                body.entities[0].username.should.equal(testConfig.user.username);

                done();
            });

        } );

    } );
});