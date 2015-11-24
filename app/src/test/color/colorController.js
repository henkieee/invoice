(function ()
{
  angular
    .module('test')
    .controller('colorController', [
      'testService',
      '$scope',
      '$mdDialog',
      colorPicker
    ]);

  function colorPicker(testService, $scope, $mdDialog)
  {
    $scope.test = 'It works!!!';

    $scope.showTabDialog = function(ev)
    {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: './src/test/color/partials/color-picker.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog)
    {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  }

})();



