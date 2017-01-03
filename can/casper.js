const LoginPage = require('./pages/LoginPage');
const EmployeePage = require('./pages/EmployeePage');
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X)'
  + ' AppleWebKit/537.51.1 (KHTML, like Gecko)'
  + ' Version/7.0 Mobile/11A465 Safari/9537.53';

const setUp = function(casper) {
  casper.userAgent(UA);

  const loginPage = new LoginPage(casper);
  const employeePage = new EmployeePage(casper);

  return function(client, user, password, status) {
    loginPage.start()
      .login(client, user, password);
    employeePage
      .checkPage()
      .waitForLoading()
      .changeStatus(status);
  };
};

module.exports = setUp;
