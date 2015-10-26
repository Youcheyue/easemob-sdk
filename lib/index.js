/**
 * Created by leo on 15-10-22.
 */

var easemob_request = require( './easemob_request' );
var app_const       = require( './const');



exports.init 			  = easemob_request.init;
exports.get_token	  = easemob_request.get_token;
exports.token       = app_const.TOKEN;
