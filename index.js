/*

This file contains the main logging logic.

API logging structure :
trace : 1,
error : 2,
query : 3
req   : 4,
res   : 5

The desired logging level is called from within the function which get logged onto the console if its
logging is enabled.

 */

var fs              = require('fs');

_path               = "";

exports.trace       = trace;

exports.error       = error;

exports.request     = request;

exports.response    = response;

exports.query       = query;

exports.setPath     = setPath;


function log(level, parameters){

    var _loggerObject    =  parameters[0];

    var _moduleName      =  _loggerObject.moduleInfo;

    var _apiName         =  _loggerObject.apiInfo;


    delete require.cache[require.resolve(_path)];

    var _logFile         =  require(_path);

    var _logParams       =  parameters;

    var _logObject       = _logFile[_moduleName][_apiName];

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

function setPath(root, path){

    /*
        SET GLOBAL PATH VARIABLE
    */
    _path = root + '/' + path;

    _createOutputFile();

}

function printer(stream, _moduleName, _apiName, _logParams){

    for(var i = 0; i < _logParams.length; i++){

        stream.write(_moduleName + ' | ' + _apiName + ' | ' + JSON.stringify(_logParams[i]) + '\n');

    }

}

function createFile(){
    var _counter = 0;

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