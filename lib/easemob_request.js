
var request         = require( 'request' );
var app_const       = require( './const');
var fs = require('fs');

exports.init = function( org_name, app_name, client_id, client_secret){
  app_const.ORG_NAME      = org_name;
  app_const.APP_NAME      = app_name;
  app_const.CLIENT_ID     = client_id;
  app_const.CLIENT_SECRET = client_secret;
};

exports.init_token = function( org_name, app_name, client_id, client_secret){
  app_const.ORG_NAME      = org_name;
  app_const.APP_NAME      = app_name;
  app_const.CLIENT_ID     = client_id;
  app_const.CLIENT_SECRET = client_secret;
};




//通用http请求函数
var request_json = function (data, path, method, callback) {
    var options = {
        url: app_const.BASE_URL + app_const.ORG_NAME + '/' + app_const.APP_NAME + path,
        method : method ,
        json: data
    };
    request(options,callback);
};

//获取token
exports.get_token = function (callback) {
  var data = {grant_type: 'client_credentials', client_id: app_const.CLIENT_ID , client_secret: app_const.CLIENT_SECRET};
  request_json(data, '/token', 'POST', function (err,res,body) {
    if (!err && body && body.access_token){
      callback(null,body.access_token);
    }else{
      if(!err){
        err = 'unauthorized';
      }
      callback(err,res.statusCode);
    }
  });
};


//通用htt带token请求函数
exports.request_token = function (data, path, method,token, callback) {

  var headers = {};
  headers.Authorization = 'Bearer ' + token;
  var options = {
    url     : app_const.BASE_URL + app_const.ORG_NAME + '/' + app_const.APP_NAME + path,
    method  : method ,
    headers : headers ,
    json    : data
  };

  request(options,callback);
};

//通用htt带token和restrict请求函数
exports.request_restrict_form = function (data, path, method,restrict,token, callback) {

  var headers = {
    "Authorization"   : 'Bearer ' + token,
    "restrict-access" : restrict
  };
  var options = {
    url     : app_const.BASE_URL + app_const.ORG_NAME + '/' + app_const.APP_NAME + path,
    method  : method ,
    headers : headers ,
    formData : data
  };
  request(options,callback);
};

//通用htt带token和headers请求函数
exports.request_accept = function ( file,secret,path,token) {
  var headers = {};
  headers.Authorization = 'Bearer ' + token;
  headers.Accept = 'application/octet-stream';
  headers['share-secret'] = secret;
  console.log(headers);
  var options = {
    url     : app_const.BASE_URL + app_const.ORG_NAME + '/' + app_const.APP_NAME + path,
    headers : headers ,
  };
  request(options).pipe(fs.createWriteStream(file));
};


