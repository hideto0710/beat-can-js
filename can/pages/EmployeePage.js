const BeatResult = require('../BeatResult');

function EmployeePage(casper) {
  this.casper = casper;

  const NotYet = 'having_breakfast';
  const Working = 'working';
  const Already = 'resting';

  const Attend = 1;
  const Leave = -1;
  const Toggle = 0;

  this.checkPage = function() {
    this.casper.then(function() {
      if (/^JOBCAN MyPage:.+?/.test(this.getTitle())) {
        // nop
      } else {
        throw new BeatResult(401,
          'Could not login.');
      }
    });
    return this;
  };

  this.waitForLoading = function() {
    this.casper.then(function() {
      const self = this;
      self.echo('start loading...');
      this.waitFor(function() {
        return self.fetchText('#top_newest_informations_div') !== '情報の更新中です...';
      }, function () {
        self.echo('complete.');
      });
    });
    return this;
  };

  this.changeStatus = function(status) {
    this.casper.then(function() {
      const currentStatus = this.evaluate(function() {
        return window.current_status;
      });
      if (compareStatus(currentStatus, status)) {
        this.click("#adit-button-push");
      } else {
        throw new BeatResult(400,
          'Try changing to ' + status + ', but status_id is ' + currentStatus + '.');
      }
    });
    return this;
  };

  function compareStatus(currentStatus, requestStatus) {
    if (requestStatus === Toggle) return true;
    switch (currentStatus) {
      case NotYet:
        return requestStatus === Attend;
        break;
      case Working:
        return requestStatus === Leave;
        break;
      case Already:
        return false;
        break;
    }
  }
}

module.exports = EmployeePage;
