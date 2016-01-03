(function ()
{
  angular
    .module('test')
    .controller('TestController', [
      'testService',
      '$mdBottomSheet',
      '$log',
      '$scope',
      '$location',
      '$q',
      TestController
    ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function TestController(testService,
                          $mdBottomSheet,
                          $log,
                          $scope,
                          $location,
                          $q)
  {
    var self = this;
    self.selected = null;
    self.users = [];
    self.onSwipeRight = onSwipeRight;
    self.onSwipeLeft = onSwipeLeft;
    self.showContactOptions = showContactOptions;
    self.item = testService.getItem();


    // Load all registered users

    testService
      .loadAllUsers()
      .then(function (users)
      {
        self.users = [].concat(users);
        self.selected = users[0];
      });

    function onSwipeRight()
    {
      if ($scope.selectedIndex < 2) {
        $scope.selectedIndex = $scope.selectedIndex + 1;
      }
      // if you want to make all the tour
      else {
        $scope.selectedIndex = 0;
      }
    }

    function onSwipeLeft() {

      if ($scope.selectedIndex > 0) {
        $scope.selectedIndex = $scope.selectedIndex - 1;
      }
      // if you want to make all the tour
      else {
        $scope.selectedIndex = 2;
      }
    }

    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old) {
      switch (current) {
        case 0:
          $location.url("/view1");
          break;
        case 1:
          $location.url("/view2");
          break;
        case 2:
          $location.url("/view3");
          break;
      }
    });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Show the bottom sheet
     */
    function showContactOptions($event)
    {
      var user = self.selected;

      return $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: './src/users/view/contactSheet.html',
        controller: ['$mdBottomSheet', ContactPanelController],
        controllerAs: "cp",
        bindToController: true,
        targetEvent: $event
      }).then(function (clickedItem)
      {
        clickedItem && $log.debug(clickedItem.name + ' clicked!');
      });

      /**
       * Bottom Sheet controller for the Avatar Actions
       */
      function ContactPanelController($mdBottomSheet)
      {
        this.user = user;
        this.actions = [
          {name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg'},
          {name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg'},
          {name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg'},
          {name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.submitContact = function (action)
        {
          $mdBottomSheet.hide(action);
        };
      }
    }

  }

})();
