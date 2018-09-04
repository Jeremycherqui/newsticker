require('./css/settings.scss');
var app = angular.module('StarterApp', ['WixControls']);

app.controller('AppCtrl', ['$scope', function($scope) {
  console.log('setup');

  $scope.defaultTabIndex = 0;
  $scope.msgIsValid = false;
  $scope.emailIsValid = false;
  $scope.buttonDisabled = true;

  $scope.onUpdate = function (key) { //setup a callback function for components to use when changed
    return function (value) {
      const data = {key: key, value: value};
      Wix.Settings.triggerSettingsUpdatedEvent(data);
    }
  };

  $scope.onRateUs = function() {
      console.log('Thanks for rating us, you rock!');
      Wix.Settings.openReviewInfo();
  }

  $scope.clickUpgrade = function () {
    Wix.Settings.openBillingPage();
  }

}]);
