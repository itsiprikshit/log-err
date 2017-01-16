/*

This file contains the main logging logic.
Upon installation of this module, a file named _logging.js is created in the root directory.
API entry points listed there are logged depending upon their enabled logging level.

API logging structure :
trace : 1,
error : 2,
query : 3
req   : 4,
res   : 5

The required method calls the log function with the arguments which get logged onto the console according to the
enabled logging level.

 */

var _logFile = require('../log-err.js');

// JUST READING THE FILE FOR NOW

exports.log = log;

function log(/* arguments */){

    var _apiName    =  arguments[0];

    arguments.splice(0,1);

    var _logParams  =  arguments;

    var _logObject = _logFile[_apiName];

    var stream = process.stdout;

    if(_logObject.trace){

        printer(stream, _apiName, _logParams);

    }else if(_logObject.error){

        //LOG ERROR HERE

    }else if(_logObject.query){

        //LOG QUERY HERE

    }else if(_logObject.req){

        //LOG REQUESTS HERE

    }else if(_logObject.res){

        //LOG RESPONSE HERE

    }
}

function printer(stream, _apiName , _logParams){

    for(var i = 0; i < _logParams.length; i++){

        stream.write(_apiName + ' - ' + JSON.stringify(_logParams[i]) + '\n');

        }
}