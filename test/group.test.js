var should              = require( 'should' );
var testConfig  = require( './config_friend' );
var easemobSDK  = require( '../index' );
var async = require('async');

describe( 'Group test', function(){
  var token;
  before( function( done ){
    // Init the SDK before testing.
    easemobSDK.init(testConfig.org_name,testConfig.app_name,testConfig.client_id,testConfig.client_secret);
    easemobSDK.get_token(function(err,result){
      if(!err){
        token = result;
        done();
      }
    });
  });
  //增加群组
  describe( 'add a grouplist for chat', function() {
    var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    var groupinfo={
      "groupname":"testrestgrp12", //群组名称, 此属性为必须的
      "desc":"server create group", //群组描述, 此属性为必须的
      "public":true, //是否是公开群, 此属性为必须的
      "maxusers":300, //群组成员最大数(包括群主), 值为数值类型,默认值200,此属性为可选的
      "approval":true, //加入公开群是否需要批准, 默认值是true（加群需要群主批准）, 此属性为可选的
      "owner":"limintest111", //群组的管理员, 此属性为必须的
      "members":["limintest2"] //群组成员,此属性为可选的,但是如果加了此项,数组元素至少一个（注：群主jma1不需要写入到members里面）
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1,2], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('add group should return OK', function( done ) {
      easemobSDK.group.add_group(groupinfo,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  //删除一个群组
  describe( 'delete a group  for chat', function() {
    var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    var groupinfo={
      "groupname":"testrestgrp22",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":"limintest111",
      "members":["limintest2"]
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('delete group should return OK', function( done ) {
      easemobSDK.group.delete_group(groupids.pop(),token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  //查询群组
  describe('display a grouplist for chat', function() {
    var batch_user =[{
      username        : 'limintest211',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    var groupinfo= {
      "groupname":"testrestgrp12",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":"limintest211",
      "members":["limintest2"]
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1, 2, 3 ,4, 5, 6], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('display group should return OK', function( done ) {
      async.eachSeries(groupids,function iterator(group_id, callback) {
        easemobSDK.group.display_group(token,function( err, res,body ){
          should.not.exists( err );
          res.statusCode.should.equal(200);
          done();
        });
      });
    });
  });


  //分页查询群组
  describe('display a grouplist for many pages', function() {
    var batch_user = [{
      username: 'limintest111',
      password: '123456'
    }, {
      username: 'limintest2',
      password: '123456'
    }];
    var groupinfo = {
      "groupname": "testrestgrp112",
      "desc": "server create group",
      "public": true,
      "maxusers": 300,
      "approval": true,
      "owner": "limintest111",
      "members": ["limintest2"]
    };
    var groupids = [];

    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1, 2, 3 ,4, 5, 6], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });

    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('display group many pages should return OK', function (done) {
      var limit = 2;
      var cursor;
      var newids=[];
      for (var i=0;i<groupids.length/limit;i++) {
        newids.push(groupids[i]);
      }
      async.eachSeries(newids, function iterator(group_id, callback) {
        easemobSDK.group.display_page_group(limit, cursor, token, function (err, res, body) {
          should.not.exists(err);
          res.statusCode.should.equal(200);
          cursor = res.body.cursor;
          callback(err);
        });
      },function(err){
        done(err);
      });
    });
  });

  //修改群组信息
  describe('modify a groupinfo of group', function() {
    var batch_user =[{
      username        : 'limintest111',
      password        : '123456'
    },{
      username        : 'limintest2',
      password        : '123456'
    }];
    var groupinfo={
      "groupname":"testrestgrp112",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":"limintest111",
      "members":["limintest2"]
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('modify groupinfo should return OK', function( done ) {
      var newgroupinfo={
        "groupname":"liman",
        "description":"update groupinfo",
        "maxusers":400};
      easemobSDK.group.modify_groupinfo(groupids[0],newgroupinfo,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  //获取群组成员信息
  describe('get a member of group', function() {
    var batch_user =[{
      username        : 'nnlimintest011',
      password        : '123456'
    },{
      username        : 'limintest22',
      password        : '123456'
    }];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username]
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              if(!err && res.statusCode==200){
                cb(null);
              }else{
                cb(err || 'can not create batch !');
              }
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              //if(!err && res.statusCode==200){
                groupids.push(res.body.data.groupid);
              //}
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('get member of group should return OK', function( done ) {
      async.eachSeries(groupids,function iterator(group_id, callback) {
        easemobSDK.group.get_member_group(groupids[0],token,function( err, res,body ){
          should.not.exists( err );
          res.statusCode.should.equal(200);
          done();
        });
      });
    });
  });

  //群组成员加人
  describe('add a user into group', function() {
    var batch_user =[{
      username        : 'yylimintest011',
      password        : '123456'
    },{
      username        : 'yylimintest22',
      password        : '123456'
    },{
      username        : 'yylimintest333',
      password        : '123456'
    }
    ];
    var groupinfo={
      "groupname":"testrestgrp12xx",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username]
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('add a user into group should return OK', function( done ) {
      async.eachSeries(groupids,function iterator(group_id, callback) {
        easemobSDK.group.add_user_into_group(groupids[0], batch_user[2].username ,token,function( err, res,body ){
          should.not.exists( err );
          res.statusCode.should.equal(200);
          done();
        });
      });


    });

  });

  //群组成员减人
  describe('delete a user from group', function() {
    var batch_user =[{
      username        : 'ttlimintest011',
      password        : '123456'
    },{
      username        : 'limintesttt22',
      password        : '123456'
    },{
      username        : 'limintest333',
      password        : '123456'
    }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username]
    };
    var groupids = [];
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('delete a user from group should return OK', function( done ) {
      async.eachSeries(groupids,function iterator(group_id, callback) {
        easemobSDK.group.delete_user_from_group(groupids[0], batch_user[1].username ,token,function( err, res,body ){
          should.not.exists( err );
          res.statusCode.should.equal(200);
          done();
        });
      });
    });

  });


  //群组增加多个用户
  describe('add many users into group', function() {
    var batch_user =[{
      username        : 'vvlimintest011',
      password        : '123456'
    },{
      username        : 'vvlimintest22',
      password        : '123456'
    },{
      username        : 'vvlimintest333',
      password        : '123456'
    },
      {
        username        : 'vvlimintest444',
        password        : '123456'
      },
      {
        username        : 'vvlimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username]
    };
    var groupids = [];
    var users=[];
    for (var i=3;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('add many users into group should return OK', function( done ) {
      async.eachSeries(groupids,function iterator(group_id, callback) {
        easemobSDK.group.add_manyuser_into_group(groupids[0], users ,token,function( err, res,body ){
          should.not.exists( err );
          res.statusCode.should.equal(200);
          done();
        });
      });


    });

  });

  //群组删除多个用户
  describe('delete many users from group', function() {
    var batch_user =[{
      username        : 'sslimintest011',
      password        : '123456'
    },{
      username        : 'sslimintest22',
      password        : '123456'
    },{
      username        : 'sslimintest333',
      password        : '123456'
    },
      {
        username        : 'sslimintest444',
        password        : '123456'
      },
      {
        username        : 'sslimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username,batch_user[3].username,batch_user[4].username]
    };
    var groupids = [];
    var users=[];
    for (var i=2;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('delete many users from group should return OK', function( done ) {
      easemobSDK.group.delete_manyuser_from_group(groupids[0], users ,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });

  });

  //获取一个用户参与的所有群组
  describe('get user of group', function() {
    var batch_user =[{
      username        : 'rrlimintest011',
      password        : '123456'
    },{
      username        : 'rrlimintest22',
      password        : '123456'
    },{
      username        : 'rrlimintest333',
      password        : '123456'
    },
      {
        username        : 'rrlimintest444',
        password        : '123456'
      },
      {
        username        : 'rrlimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username,batch_user[3].username,batch_user[4].username]
    };
    var groupids = [];
    var users=[];
    for (var i=2;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1,2], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('get user of group should return OK', function( done ) {
      async.eachSeries(users,function iterator(group_id, callback) {
        easemobSDK.group.get_user_of_group(users.pop() ,token,function( err, res,body ){
          should.not.exists( err );
          res.statusCode.should.equal(200);
          done();
        });
      });


    });

  });


  //群组转让
  describe('modify owner of group', function() {
    var batch_user =[{
      username        : 'pplimintest011',
      password        : '123456'
    },{
      username        : 'pplimintest22',
      password        : '123456'
    },{
      username        : 'pplimintest333',
      password        : '123456'
    },
      {
        username        : 'pplimintest444',
        password        : '123456'
      },
      {
        username        : 'pplimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username,batch_user[3].username,batch_user[4].username]
    };
    var groupids = [];
    var users=[];
    for (var i=0;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('modify owner of group should return OK', function( done ) {
      //async.eachSeries([1],function iterator(group_id, callback) {
      easemobSDK.group.modify_owner_of_group(groupids[0],users[2],token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  //群组黑名单个添加
  describe('add blacklist info group', function() {
    var batch_user =[{
      username        : 'gglimintest011',
      password        : '123456'
    },{
      username        : 'gglimintest22',
      password        : '123456'
    },{
      username        : 'gglimintest333',
      password        : '123456'
    },
      {
        username        : 'gglimintest444',
        password        : '123456'
      },
      {
        username        : 'gglimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username]
    };
    var groupids = [];
    var users=[];
    for (var i=0;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('add blacklist info group should return OK', function( done ) {
      //async.eachSeries([1],function iterator(group_id, callback) {
      easemobSDK.group.add_blacklist_of_group(groupids[0],users[3],token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });

  //群组黑名批量添加
  describe('add many blacklist info group', function() {
    var batch_user =[{
      username        : 'bblimintest011',
      password        : '123456'
    },{
      username        : 'bblimintest22',
      password        : '123456'
    },{
      username        : 'bblimintest333',
      password        : '123456'
    },
      {
        username        : 'bblimintest444',
        password        : '123456'
      },
      {
        username        : 'bblimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[0].username,batch_user[1].username]
    };
    var groupids = [];
    var users=[];
    for (var i=3;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('add many blacklist info group should return OK', function( done ) {
      //async.eachSeries([1],function iterator(group_id, callback) {
      easemobSDK.group.add_many_blacklist_of_group(groupids[0],users,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });

  });

//查询群的黑名单
  describe('display a blacklist of group', function() {
    var batch_user =[{
      username        : 'ddlimintest011',
      password        : '123456'
    },{
      username        : 'ddlimintest22',
      password        : '123456'
    },{
      username        : 'ddlimintest333',
      password        : '123456'
    },
      {
        username        : 'ddlimintest444',
        password        : '123456'
      },
      {
        username        : 'ddlimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username]
    };
    var groupids = [];
    var users=[];
    for (var i=3;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        },
        function (cb) {
          easemobSDK.group.add_many_blacklist_of_group(groupids[0],users,token,function( err, res,body ) {
            cb(err);
          })
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('display a blacklist of group should return OK', function( done ) {
      //async.eachSeries([1],function iterator(group_id, callback) {
      easemobSDK.group.display_blacklist_of_group(groupids[0],token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
      //});
    });

  });

  //黑名单单个删除
  describe('delete a blacklist of group', function() {
    var batch_user =[{
      username        : 'cclimintest011',
      password        : '123456'
    },{
      username        : 'cclimintest22',
      password        : '123456'
    },{
      username        : 'cclimintest333',
      password        : '123456'
    },
      {
        username        : 'cclimintest444',
        password        : '123456'
      },
      {
        username        : 'cclimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username]
    };
    var groupids = [];
    var users=[];
    for (var i=3;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        },
        function (cb) {
          easemobSDK.group.add_many_blacklist_of_group(groupids[0],users,token,function( err, res,body ) {
            cb(err);
          })
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('delete a blacklist of group should return OK', function( done ) {
      //async.eachSeries([1],function iterator(group_id, callback) {
      easemobSDK.group.delete_blacklist_of_group(groupids[0],users[0],token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
      //});
    });

  });

  //黑名单批量删除
  describe('delete many blacklists of group', function() {
    var batch_user =[{
      username        : 'gglimintest011',
      password        : '123456'
    },{
      username        : 'gglimintest22',
      password        : '123456'
    },{
      username        : 'gglimintest333',
      password        : '123456'
    },
      {
        username        : 'gglimintest444',
        password        : '123456'
      },
      {
        username        : 'gglimintest555',
        password        : '123456'
      }
    ];
    var groupinfo={
      "groupname":"testrestgrp1212",
      "desc":"server create group",
      "public":true,
      "maxusers":300,
      "approval":true,
      "owner":batch_user[0].username,
      "members":[batch_user[1].username,batch_user[2].username]
    };
    var groupids = [];
    var users=[];
    for (var i=3;i<batch_user.length;i++) {
      users.push(batch_user[i].username);
    }
    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        },
        function (cb) {
          easemobSDK.group.add_many_blacklist_of_group(groupids[0],users,token,function( err, res,body ) {
            cb(err);
          })
        }
      ], function (err, result) {
        done(err);
      });
    });
    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            cb(err);
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('delete many blacklists of group should return OK', function( done ) {
      //async.eachSeries([1],function iterator(group_id, callback) {
      easemobSDK.group.delete_many_blacklist_of_group(groupids[0],users,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });

  });





//获取一个或者多个群组的详情
  describe('display a group detail', function() {
    var batch_user = [{
      username: 'limintest111',
      password: '123456'
    }, {
      username: 'limintest2',
      password: '123456'
    }];
    var groupinfo = {
      "groupname": "testrestgrp112",
      "desc": "server create group",
      "public": true,
      "maxusers": 300,
      "approval": true,
      "owner": "limintest111",
      "members": ["limintest2"]
    };
    var groupids = [];

    before(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          easemobSDK.user.create_batch(batch_user, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not create batch !');
            }
          })
        },
        function (cb) {
          async.eachSeries([1, 2], function iterator(item, callback) {
            easemobSDK.group.add_group(groupinfo, token, function (err, res, body) {
              groupids.push(res.body.data.groupid);
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });

    after(function (done) {
      async.waterfall([
        function (cb) {
          easemobSDK.user.remove_batch(10, token, function (err, res, body) {
            if(!err && res.statusCode==200){
              cb(null);
            }else{
              cb(err || 'can not delete !');
            }
          })
        },
        function (cb) {
          async.eachSeries(groupids, function iterator(item, callback) {
            easemobSDK.group.delete_group(groupids.pop(), token, function (err, res, body) {
              callback(err);
            })
          }, function (err) {
            cb(err);
          });
        }
      ], function (err, result) {
        done(err);
      });
    });
    it('display group detail should return OK', function (done) {
      easemobSDK.group.display_group_detail(groupids,token,function( err, res,body ){
        should.not.exists( err );
        res.statusCode.should.equal(200);
        done();
      });
    });
  });



});
