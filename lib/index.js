/**
 * Created by leo on 15-10-22.
 */

var easemob_request = require( './easemob_request' );
var app_const       = require( './const');



exports.init 			  = easemob_request.init;
exports.get_token	  = easemob_request.get_token;
exports.get_token_object	  = easemob_request.get_token_object;
exports.token       = app_const.TOKEN;

exports.user      = require('./user');
exports.friend    = require('./friend');
exports.group = require('./group');
exports.file      = require('./file');
exports.message   = require('./message');
exports.chatroom   = require('./chatroom');
exports.log   = require('./log');
