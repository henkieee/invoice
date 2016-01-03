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
    var self = this;
    init();

    function init()
    {
      self.currentCategorie = null;
      testService.fetchColorCategories()
          .then(function (categories) {
            self.categories = categories;
          });
      var item = testService.getItem();
      self.categorie = item.categorie;
      self.current = item.color;
    }

    self.pickCategorie = function(ev, categorie)
    {
      self.categorie = categorie;
      self.categorie.header = "\n" + self.categorie.id + "\n";
      self.modalPickColor(ev);
    };

    self.modalPickColor = function(ev)
    {
      modal(
          ev,
          ModalColorController,
          './src/test/color/partials/color-picker.html'
      );
    };

    self.modalPickCategorie = function (ev)
    {
      modal(
          ev,
          ModalCategorieController,
          './src/test/color/partials/categorie-picker.html'
      );
    };

    function modal(ev, controller, templateUrl)
    {
      $mdDialog.show({
        controller: controller,
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    }

    function ModalCategorieController($scope, $mdDialog)
    {
      console.log('current categorie', self.categorie);
      $scope.categories = _.indexBy(self.categories, "id");
      console.log($scope.categories);
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      $scope.pickCategorie = function(categorie)
      {
        self.categorie = categorie;
        self.categorie.header = "\n" + self.categorie.id + "\n";
        testService.setCategorie(self.categorie);
        $mdDialog.hide();
        self.modalPickColor();
      };
    }

    function ModalColorController($scope, $mdDialog)
    {
      var categorie = self.categorie;
      $scope.categorie = categorie.id;
      testService.setCategorie(categorie);

      $scope.categories = _.indexBy(self.categories, "id");
      console.log($scope.categories);
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      $scope.pickColor = function(color)
      {
        color.header = color.code + " " + color.name;
        self.current = color;
        testService.setColor(color);
        $mdDialog.hide();
      };
    }
  }

})();



