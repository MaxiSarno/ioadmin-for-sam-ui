/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
      .controller('SensoryListPageCtrl', SensoryListPageCtrl);

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

})();
