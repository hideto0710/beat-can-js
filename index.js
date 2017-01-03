const system = require('system');
const casper = require('casper').create();
const setUp = require('./can/casper');

setUp(casper)(
  system.env.CLIENT,
  system.env.USER,
  system.env.PASSWORD,
  parseInt(system.env.STATUS, 10)
);

casper.on('error', function(msg) {
  system.stderr.write(msg);
});

casper.then(function() {
  system.stdout.write('done.');
});

casper.run();
