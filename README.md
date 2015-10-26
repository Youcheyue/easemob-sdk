# easemob-sdk
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
var easemob_sdk = require('easemob_sdk');
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
