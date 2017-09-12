/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
      .controller('SensoryListCtrl', SensoryListCtrl);

  /** @ngInject */
  function SensoryListCtrl($scope, $http, samService) {
    var vm = this
    $scope.smartTablePageSize = 10;
    samService.setCurrentSamId(0)

    vm.guardarId = function(id) {
      samService.setCurrentSamId(id)
    }

    samService.getList(function(data){$scope.smartTableData = data}, function(data){console.log(data)})
  }

})();
