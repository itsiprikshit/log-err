# log-err
> Light weight logging module for nodejs

## Installation
```shell
$ npm install log-err
```
## Usage

### Load the module
```shell
var logerr = require('log-err');
```
After the module has been loaded, next step is to set the `path` of the logger file that will contain `api` and `module` info for logging.

### Set the path
```shell
logerr.setPath(path);
```

### Logging levels

Open your logger file after it has been created. This file will export an object which has the following structure.

```shell
module.exports = {
    moduleInfo : {
        apiInfo : {
            trace     : 0,
            error     : 0,
            request   : 0,
            response  : 0,
            query     : 0
        }
    }
};
```
`moduleInfo` is the file/module where your api function is residing.
`apiInfo` is the name of the api function.

### For example:
If you have an api to send a post request to any server.

Lets say we have an end point           : `/send_post_request`
So, we create a `file/module`          : `externalRequests.js`
Now this file has our api function as below  :
```shell
exports.sendPostRequest = sendPostRequest

function sendPostRequest{

}
```
Here, `moduleInfo` = `externalRequests` and `apiInfo` = `sendPostRequest`

### Lets start logging

First of all, you need to create an object in each api function and pass it to the logger functions.

Lets say the we declare an object named `loggingInfo`.

```shell
exports.sendPostRequest = sendPostRequest
function sendPostRequest{
  var loggingInfo = {
    moduleInfo : "externalRequests",
    apiInfo    : "sendPostRequest"
  }
}
```

Accordingly, your logger file will have following object details,
```shell
module.exports = {
    externalRequests : {
        sendPostRequest : {
            trace     : 0,
            error     : 0,
            request   : 0,
            response  : 0,
            query     : 0
        }
    }
};
```

To start logging, call any of the following functions depending upon their trace level,

```shell
logger.trace(loggingInfo, object, object, object);
```

```shell
logger.error(loggingInfo, object, object, object);
```

```shell
logger.request(loggingInfo, object, object, object);
```

```shell
logger.response(loggingInfo, object, object, object);
```

```shell
logger.query(loggingInfo, object, object, object);
```

`Note` : The number of arguments that you are passing to the logging functions may vary.

### Enable/Disable logging

To enable or disable logging just `toggle` the logging level flag according to your need in the logger file for any `module` and `api` info you like.

### Author
Built with love and passion by - 
* [Prikshit Tekta](https://github.com/prikshittekta)
* [Vijay Kumar Attri](https://github.com/decrypto27)
* [Kanwar Ujjaval Singh](https://github.com/kanwarujjaval)
### LICENSE
Released under [MIT](https://github.com/prikshittekta/log-err/blob/master/LICENSE).