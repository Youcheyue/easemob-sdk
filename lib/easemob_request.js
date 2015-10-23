
var request         = require( 'request' );
var app_const       = require( './const');


exports.init = function( org_name, app_name, client_id, client_secret){
  app_const.org_name      = org_name;
  app_const.app_name      = app_name;
  app_const.client_id     = client_id;
  app_const.client_secret = client_secret;
}




//通用http请求函数
var request_json = function (data, path, method, callback) {
    var options = {
        url: app_const.base_url + app_const.org_name + '/' + app_const.app_name + path,
        method : method ,
        json: data
    };
    request(options,callback);
};

//获取token
exports.get_token = function (client_id, client_secret, callback) {
  var data = {grant_type: 'client_credentials', client_id: client_id, client_secret: client_secret};
  request_json(data, '/token', 'POST', function (err,res,body) {
    app_const.token = body.access_token;
    console.log(app_const.token);
    if (!err & body && body.access_token){
      callback(null,body.access_token);
    }else{
      callback(err,res.statusCode);
    }
  });
};


//通用http请求函数
exports.request_token = function (data, path, method, callback, headers) {
  get_token(app_const.client_id, app_const.client_secret);
  if(!headers){
    headers = {};
  }
  headers.Authorization = 'Bearer ' + app_const.token;
  var options = {
    url     : app_const.base_url + path,
    method  : method ,
    headers : headers ,
    json    : data
  };
  console.log(app_const.token);
  console.log(headers);
  request(options,callback);
};


