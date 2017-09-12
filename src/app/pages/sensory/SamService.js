/**
 * @author msarno
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
    .service('samService', samService);

  /** @ngInject */
  function samService($sce) {

    var property = 'First';

    return {
      getProperty: function () {
        return property;
      },
      setProperty: function(value) {
        property = value;
      }
    }

  }

})();