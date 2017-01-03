const URL = 'https://ssl.jobcan.jp/login/pc-employee/';

function LoginPage(casper) {
  this.casper = casper;

  this.start = function() {
    this.casper.start(URL);
    return this;
  };

  this.login = function(client, user, password) {
    this.casper.then(function() {
      this.fill("form[name='form']", {
        client_id: client,
        email: user,
        password: password
      }, true);
    });
    return this;
  };

  this.capture = function(name) {
    this.casper.then(function() {
      this.capture(name);
    });
    return this;
  };
}

module.exports = LoginPage;
