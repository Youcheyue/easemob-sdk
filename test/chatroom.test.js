/**
 * Created by wayne on 15-10-28.
 */
var should 		= require( 'should' );
var testConfig  = require( './config' );
var easemobSDK 	= require( '../index' );
var async = require('async');
var _ = require('underscore');

describe( 'Chatroom Test', function(){
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
        done(err);
      }
    });
  });
  //创建聊天室
  describe( 'Create chatroom', function() {
    var create_chatroom_user =[{
      username        : 'create_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'create_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'create_chatroom_wayne3',
      password        : '123456'
    }];
    before(function(done){
      easemobSDK.user.create_batch(create_chatroom_user,token,function(err, res, body){
        if(!err && res.statusCode==200){
          done(err);
        }
      });
    });
    after(function(done){
      async.eachSeries(create_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      var data = {
        "name":"testchatroom", //聊天室名称, 此属性为必须的
        "description":"server create chatroom", //聊天室描述, 此属性为必须的
        "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
        "owner":"create_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
        "members":["create_chatroom_wayne2","create_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
      };
      easemobSDK.chatroom.create(data,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        done(err);
      });
    });
  });

//修改聊天室信息
  describe( 'Modify chatroom', function() {
    var modify_chatroom_user =[{
      username        : 'modify_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'modify_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'modify_chatroom_wayne3',
      password        : '123456'
    }];
    var chatroom_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"modify_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["modify_chatroom_wayne2","modify_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(modify_chatroom_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(chatroom_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.eachSeries(modify_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      var modify_chatroom_data = {
        "name":"test wayne chatroom", //聊天室名称
        "description":"update chatroominfo", //聊天室描述
        "maxusers":200, //聊天室成员最大数(包括群主), 值为数值类型
      }
      easemobSDK.chatroom.modify(modify_chatroom_data,chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        _.each(body.data,function(data){
          data.should.be.be.true;
        });
        done(err);
      });
    });
  });

  //删除聊天室
  describe( 'Remove chatroom', function() {
    var remove_chatroom_user =[{
      username        : 'remove_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'remove_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'remove_chatroom_wayne3',
      password        : '123456'
    }];
    var remove_chatroom_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"remove_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["remove_chatroom_wayne2","remove_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(remove_chatroom_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(remove_chatroom_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.eachSeries(remove_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      easemobSDK.chatroom.remove(chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data.id.should.equal( chatroom_id );
        body.data.success.should.be.true;
        done(err);
      });
    });
  });


  //获取app中所有的聊天室
  describe( 'Get all chatroom', function() {
    var get_all_chatroom_user =[{
      username        : 'get_all_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'get_all_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'get_all_chatroom_wayne3',
      password        : '123456'
    }];
    var get_all_chatroom_data = {
      "name":"waynechatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"get_all_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["get_all_chatroom_wayne2","get_all_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(get_all_chatroom_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            }
          })
        },
        function(cb){
          easemobSDK.chatroom.create(get_all_chatroom_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            }
          })
        }
      ],function(err,result){
          done(err);
      });
    });
    after(function(done){
      async.eachSeries(get_all_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      easemobSDK.chatroom.get_all(token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[0].id.should.equal(chatroom_id);
        body.data[0].name.should.equal(get_all_chatroom_data.name);
        body.data[0].owner.should.equal(get_all_chatroom_data.owner);
        done(err);
      });
    });
  });

  //获取一个聊天室详情
  describe( 'Get chatroom', function() {
    var get_chatroom_user =[{
      username        : 'get_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'get_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'get_chatroom_wayne3',
      password        : '123456'
    }];
    var get_chatroom_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"get_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["get_chatroom_wayne2","get_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(get_chatroom_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(get_chatroom_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.eachSeries(get_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      easemobSDK.chatroom.get(chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[0].affiliations[0].owner.should.equal(get_chatroom_data.owner);
        console.log(body);
        done(err);
      });
    });
  });

  //获取用户加入的聊天室
  describe( 'Get user chatroom', function() {
    var get_user_chatroom_user =[{
      username        : 'get_user_chatroom_wayne1',
      password        : '123456'
    },{
      username        : 'get_user_chatroom_wayne2',
      password        : '123456'
    },{
      username        : 'get_user_chatroom_wayne3',
      password        : '123456'
    }];
    var get_user_chatroom_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"get_user_chatroom_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["get_user_chatroom_wayne2","get_user_chatroom_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(get_user_chatroom_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(get_user_chatroom_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.eachSeries(get_user_chatroom_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      easemobSDK.chatroom.get_user_chatroom(get_user_chatroom_user[0].username ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data[0].name.should.equal(get_user_chatroom_data.name);
        done(err);
      });
    });
  });

  //聊天室成员添加[单个]
  describe( 'Add member', function() {
    var add_chatroom_member_user =[{
      username        : 'add_chatroom_member_wayne1',
      password        : '123456'
    },{
      username        : 'add_chatroom_member_wayne2',
      password        : '123456'
    },{
      username        : 'add_chatroom_member_wayne3',
      password        : '123456'
    },{
      username        : 'add_chatroom_member_wayne4',
      password        : '123456'
    }];
    var add_chatroom_user_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"add_chatroom_member_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["add_chatroom_member_wayne2","add_chatroom_member_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(add_chatroom_member_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(add_chatroom_user_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.eachSeries(add_chatroom_member_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      easemobSDK.chatroom.add_member(add_chatroom_member_user[3].username,chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data.user.should.equal(add_chatroom_member_user[3].username);
        body.data.id.should.equal(chatroom_id);
        done(err);
      });
    });
  });


  //聊天室成员添加[批量]
  describe( 'Add member batch', function() {
    var add_chatroom_members_user =[{
      username        : 'add_chatroom_members_wayne1',
      password        : '123456'
    },{
      username        : 'add_chatroom_members_wayne2',
      password        : '123456'
    },{
      username        : 'add_chatroom_members_wayne3',
      password        : '123456'
    }];
    var add_user =[{
      username        : 'add_chatroom_members_wayne4',
      password        : '123456'
    },{
      username        : 'add_chatroom_members_wayne5',
      password        : '123456'
    },{
      username        : 'add_chatroom_members_wayne6',
      password        : '123456'
    }];
    var add_chatroom_users_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"add_chatroom_members_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["add_chatroom_members_wayne2","add_chatroom_members_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(add_chatroom_members_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.user.create_batch(add_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(add_chatroom_users_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.waterfall([
        function(cb){
          async.eachSeries(add_chatroom_members_user, function iterator(user, callback){
            easemobSDK.user.remove(user.username,token,function(err, res, body){
              if(!err && res.statusCode==200){
                callback(null);
              }else {
                callback(err || 'can not delete !');
              }
            });
          },function(err){
            cb(err);
          });
        },function(cb){
          async.eachSeries(add_user, function iterator(user, callback){
            easemobSDK.user.remove(user.username,token,function(err, res, body){
              if(!err && res.statusCode==200){
                callback(null);
              }else {
                callback(err || 'can not delete !');
              }
            });
          },function(err){
            cb(err);
          });
        }
      ],function(err,result){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      var add_usernames = {};
      add_usernames.usernames = new Array();
      _.each(add_user,function(user){
        add_usernames.usernames.push(user.username);
      });
      easemobSDK.chatroom.add_member_batch(add_usernames,chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data.newmembers.should.match(add_usernames.usernames);
        body.data.id.should.equal(chatroom_id);
        done(err);
      });
    });
  });

  //聊天室成员删除[单个]
  describe.only( 'Remove member', function() {
    var remove_chatroom_member_user =[{
      username        : 'remove_chatroom_member_wayne1',
      password        : '123456'
    },{
      username        : 'remove_chatroom_member_wayne2',
      password        : '123456'
    },{
      username        : 'remove_chatroom_member_wayne3',
      password        : '123456'
    },{
      username        : 'remove_chatroom_member_wayne4',
      password        : '123456'
    }];
    var remove_chatroom_user_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"remove_chatroom_member_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["remove_chatroom_member_wayne2","remove_chatroom_member_wayne3","remove_chatroom_member_wayne4"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(remove_chatroom_member_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(remove_chatroom_user_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }
      ],function(err,result){
          done(err);
      });

    });
    after(function(done){
      async.eachSeries(remove_chatroom_member_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            callback(err || 'can not delete !');
          }
        });
      },function(err){
        done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      easemobSDK.chatroom.remove_member(remove_chatroom_member_user[3].username,chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        body.data.user.should.equal(remove_chatroom_member_user[3].username);
        body.data.id.should.equal(chatroom_id);
        done(err);
      });
    });
  });


  //聊天室成员删除[批量]
  describe( 'Remove member batch', function() {
    var remove_chatroom_members_user =[{
      username        : 'remove_chatroom_members_wayne1',
      password        : '123456'
    },{
      username        : 'remove_chatroom_members_wayne2',
      password        : '123456'
    },{
      username        : 'remove_chatroom_members_wayne3',
      password        : '123456'
    },{
      username        : 'remove_chatroom_members_wayne4',
      password        : '123456'
    },{
      username        : 'remove_chatroom_members_wayne5',
      password        : '123456'
    },{
      username        : 'remove_chatroom_members_wayne6',
      password        : '123456'
    }];
    var remove_chatroom_users_data = {
      "name":"testchatroom", //聊天室名称, 此属性为必须的
      "description":"server create chatroom", //聊天室描述, 此属性为必须的
      "maxusers":300, //聊天室成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "owner":"remove_chatroom_members_wayne1", //聊天室的管理员, 此属性为必须的
      "members":["remove_chatroom_members_wayne2","remove_chatroom_members_wayne3"] //聊天室成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var chatroom_id;
    before(function(done){
      async.waterfall([
        function(cb){
          easemobSDK.user.create_batch(remove_chatroom_members_user,token,function(err,res,body){
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(body);
            };
          })
        },
        function(cb){
          easemobSDK.chatroom.create(remove_chatroom_users_data,token ,function(err,res,body){
            if(!err && res.statusCode==200){
              chatroom_id  = body['data']['id'];
              cb(null);
            }else{
              cb(body);
            };
          })
        }],
        function(err,result){
            done(err);
        });
    });
    after(function(done){
      async.eachSeries(remove_chatroom_members_user, function iterator(user, callback){
        easemobSDK.user.remove(user.username,token,function(err, res, body){
          if(!err && res.statusCode==200){
            callback(null);
          }else {
            console.log(body);
            callback(err || 'can not delete !');
          }
        });
      },function(err){
          done(err);
      });
    });

    it( 'Should return OK', function( done ) {
      var usernames =  'remove_chatroom_members_wayne5,remove_chatroom_members_wayne6'
      easemobSDK.chatroom.remove_member_batch(usernames,chatroom_id ,token ,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal( 200 );
        _.each(body.data,function(data){
          data.result.should.be.true;
        });
        done(err);
      });
    });
  });


});
