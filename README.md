# easemob-sdk

[![Join the chat at https://gitter.im/leoliew/easemob-sdk](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/leoliew/easemob-sdk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
easemob nodejs sdk


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
$ make test
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
