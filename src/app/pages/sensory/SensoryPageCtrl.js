/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
      .controller('SensoryListPageCtrl', SensoryListPageCtrl)
      .controller('SensoryEvaluationCtrl', SensoryEvaluationCtrl);

  /** @ngInject */
  function SensoryListPageCtrl($scope, $filter, $http, editableOptions, editableThemes) {

    $scope.smartTablePageSize = 10;

    var url = 'http://localhost:8080/sam/evaluation'

    $http.get(url)
        .success(function(data) {
          console.log(data)
          $scope.smartTableData = data;
        })
        .error(function(data) {
          console.log('Error:' + data);
        });

    console.log("controller")
  }

  function SensoryEvaluationCtrl($scope) {
    var vm = this;

    vm.samDetailForm = {};
    vm.productInfo = {};
    vm.shipment = {};

    vm.aresamDetailFormPasswordsEqual = function () {
      return vm.samDetailForm.confirmPassword && vm.samDetailForm.password == vm.samDetailForm.confirmPassword;
    };
  }

})();
