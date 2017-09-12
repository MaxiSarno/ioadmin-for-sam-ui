/**
 * @author msarno
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
    .service('samService', samService);

  /** @ngInject */
  function samService($sce) {
    var currentSamId = 0;

    return {
      getCurrentSamId: function () {
        return currentSamId;
      },
      setCurrentSamId: function(value) {
        currentSamId = value;
      }
    }

  }

})();