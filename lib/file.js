/**
 * Created by wayne on 15-10-28.
 */

var easemobrequest = require( './easemob_request' );

/**
 * 上传语音图片
 * @param data  ( {file:@/Users/stliu/a.jpg} )
 * @param restrict (true or false)
 * @param token
 * @param callback
 */
exports.upload = function( data,restrict ,token, callback){
  easemobrequest.request_restrict_form(data, '/chatfiles', 'POST',restrict ,token, function ( err,res, body ) {
    callback( err,res, body );
  })
};

exports.download = function( file,secret ,uuid,token, callback){
  var headers = {};
  headers.Authorization = 'Bearer ' + token;
  headers.Accept = 'application/octet-stream';
  headers['share-secret'] = secret;
  easemobrequest.request_accept(file,headers, '/chatfiles/'+ uuid,callback);
};

exports.download_thumbnail = function( file,secret ,uuid,token, callback){
  var headers = {};
  headers.Authorization = 'Bearer ' + token;
  headers.Accept = 'application/octet-stream';
  headers.thumbnail = true;
  headers['share-secret'] = secret;
  easemobrequest.request_accept(file,headers, '/chatfiles/'+ uuid,callback);
};
