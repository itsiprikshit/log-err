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

exports.trace       = trace;

exports.error       = error;

exports.request     = request;

exports.response    = response;

exports.query       = query;

function log(level, parameters){

    var _apiName    =  parameters[0];

    parameters.splice(0,1);

    var _logParams  =  parameters;

    var _logObject = _logFile[_apiName];

    var stream = process.stdout;

    if(parseInt(_logObject[level])){

        printer(stream, _apiName, _logParams);

    }

    /*

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

    */
}

function trace(/* arguments */){

    log('trace', arguments);

}

function error(/* arguments */){

    log('error', arguments);

}

function request(/* arguments */){

    log('request', arguments);

}

function response(/* arguments */){

    log('response', arguments);

}

function query(/* arguments */){

    log('query', arguments);

}

function printer(stream, _apiName , _logParams){

    for(var i = 0; i < _logParams.length; i++){

        stream.write(_apiName + ' - ' + JSON.stringify(_logParams[i]) + '\n');

        }

}