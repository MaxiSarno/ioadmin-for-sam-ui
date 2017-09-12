/**
 * @author msarno
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
    .service('samService', samService);

  /** @ngInject */
  function samService($sce, $http) {
    var currentSamId = 0;

    var url = 'http://localhost:8080/sam/evaluation'

    var getSamDetail = function(samId) {
      $http.get(url+'/'+samId)
        .success(function(data) {
          console.log(data)
          return data
        })
        .error(function(data) {
          console.log('Error:' + data)
          console.log('Error:' + data.notification.message)
        });
    }

    return {
      getCurrentSamId: function () {
        return currentSamId
      },
      setCurrentSamId: function(value) {
        currentSamId = value
      },

      getSamDetail : getSamDetail
    }

  }

})();