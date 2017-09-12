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

    vm.guardarId = function(id) {
      console.log(id)
    }

    $scope.smartTablePageSize = 10;


    var url = 'http://localhost:8080/sam/evaluation'

    $http.get(url)
        .success(function(data) {
          console.log(data)
          $scope.smartTableData = data;
        })
        .error(function(data) {
          console.log('Error:' + data)
        });
  }

})();
