
var request         = require( 'request' );

var BASEURL	        = 'https://a1.easemob.com/';
var CLIENTID        = undefined;
var CLIENTSECRET 	= undefined;
var ORGNAME         = undefined;
var APPNAME         = undefined;

var token = '';

exports.init = function( org_name, app_name, client_id, client_secret){
  ORGNAME = org_name;
  APPNAME = app_name;
  CLIENTID = client_id;
  CLIENTSECRET = client_secret;
}




//通用http请求函数
exports.request_json = function (data, path, method, callback) {
    var options = {
        url: BASEURL + ORGNAME + '/' + APPNAME + '/' + path,
      //url: "https://a1.easemob.com/wayneliang/test/users",
        method : method ,
        json: data
    };
    request(options,callback);
};

//获取token
var get_token = function (callback) {
    var data = {grant_type: 'client_credentials', client_id: client_id, client_secret: client_secret};
    http_request(data, '/token', 'POST', function (data) {
        token = data.access_token;
        console.log(data);
        if (callback)
            callback();
    });
};
