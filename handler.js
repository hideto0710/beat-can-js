const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

function runCasper(scriptName, event, callback) {
  const casperPath = path.join(__dirname, 'node_modules', 'casperjs', 'bin', 'casperjs');
  const childArgs = [
    path.join(__dirname, scriptName)
  ];
  const childOptions = {
    'PHANTOMJS_EXECUTABLE':
      path.join(__dirname, 'libs', 'phantomjs'),
      // MARK: phantomjs: cannot execute binary file
      // path.join(__dirname, 'node_modules', 'phantomjs', 'bin', 'phantomjs')
    CLIENT: event.client,
    USER: event.user,
    PASSWORD: event.password,
    STATUS: event.status,
  };
  process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
  const ps = childProcess.execFile(casperPath, childArgs, { env: childOptions });

  ps.stdout.on('data', function (data) {
    console.log(data);
  });

  ps.stderr.on('data', function (data) {
    console.error(data);
    callback(data);
  });

  ps.on('exit', function(code) {
    console.log('child process exited with code ' + code);
    callback(null, { statusCode: code });
  });
}

module.exports.beat = (event, context, callback) => {
  runCasper('index.js', event, callback);
};
