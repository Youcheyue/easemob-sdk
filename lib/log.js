/**
 * Created by wayne on 15-10-30.
 */
var easemobrequest = require( './easemob_request' );
var _ = require('underscore');

/**
 * 导出聊天记录
 * @param data : {timestamp:timestamp ,limit:limit, cursor:cursor}
 * @param token
 * @param callback
 */
exports.export = function(data ,token, callback){
  var params ;
  var isData = _.toArray(data).length;
  if(isData){
    if(data.limit != undefined ){
      params = '?limit=' + data.limit;
    }else{
      params = '?limit=10';
    }
    if(data.cursor != undefined){
      params += '&cursor=' + cursor;
    }
    if(data.timestamp != undefined){
      params += '&ql=select+*+where+timestamp' + data.timestamp;
    }
  }else{
    params = '?limit=10';
  }
  var sendData = {};
  easemobrequest.request_token(sendData, '/chatmessages' + params, 'GET',token,function ( err,res, body ) {
    return callback( err,res, body );
  });
};
