# easemob-sdk

[![build status][travis-image]][travis-url]
[![Coverage Status](https://coveralls.io/repos/leoliew/easemob-sdk/badge.svg?branch=master&service=github)](https://coveralls.io/github/leoliew/easemob-sdk?branch=master)
[![gitter][gitter-image]][gitter-url]
[![Dependency Status][DependencyStatus-image]][DependencyStatus-url]



[travis-image]: https://travis-ci.org/leoliew/easemob-sdk.svg?branch=master
[travis-url]: https://travis-ci.org/leoliew/easemob-sdk
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/leoliew/easemob-sdk
[DependencyStatus-image]: https://gemnasium.com/leoliew/easemob-sdk.svg
[DependencyStatus-url]:https://gemnasium.com/leoliew/easemob-sdk


easemob nodejs sdk


[![npm status](https://nodei.co/npm/easemob-sdk.svg?downloads=true&stars=true&downloadRank=true)](https://www.npmjs.com/package/easemob-sdk)


## Installation

node:

```
$ npm install easemob-sdk
```

## Running node tests

Install dependencies:

```shell
$ npm install
```
Run em!

```shell
$ npm test
```

## Usage


```js
var easemob_sdk = require('easemob-sdk');
easemob_sdk.init(org_name,app_name,client_id,client_secret);
easemob_sdk.user.create( 'leo', 'leo_password', function(err, res, body) {
  if(err || (res.statusCode != 200)) {
    // Handle the error
  }
  else {
    //Handle the result
    var result = body;
  }
});

```
