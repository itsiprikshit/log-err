/*

This file contains the main logging logic.
Upon installation of this module, a file named log-err.js is created in the root directory.
API entry points listed there are logged depending upon their enabled logging level.

API logging structure :
trace : 1,
error : 2,
query : 3
req   : 4,
res   : 5

The desired logging level is called from within the function which get logged onto the console if its
logging is enabled.

 */

var fs       = require('fs');

exports.trace       = trace;

exports.error       = error;

exports.request     = request;

exports.response    = response;

exports.query       = query;

function log(level, parameters){

    var _loggerObject    =  parameters[0];

    var _moduleName      =  _loggerObject.moduleInfo;

    var _apiName         =  _loggerObject.apiInfo;

    var _logFile = require('./log-err.js');

    var _logParams  =  parameters;

    var _logObject = _logFile[_moduleName][_apiName];

    var stream = process.stdout;

    if(parseInt(_logObject[level])){

        printer(stream, _moduleName, _apiName, _logParams);

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

function printer(stream, _moduleName, _apiName, _logParams){

    for(var i = 0; i < _logParams.length; i++){

        stream.write(_moduleName + ' | ' + _apiName + ' | ' + JSON.stringify(_logParams[i]) + '\n');

    }

}

function createFile(){
    var _counter = 0;
    var _path    = './log-err.js';

    return function(){
        if(_counter <= 1){
            _counter++;
            fs.open(_path, 'wx', (err, fd) => {
                if(err){
                    if(err.code == "EEXIST"){
                        return;
                    }
                    console.log(err.message);
                }

                fs.close(fd, (err) => {
                    if(err){
                        console.log(err.message);
                    }
                });
            });
        }
    }
}

var _createOutputFile = createFile();

_createOutputFile();