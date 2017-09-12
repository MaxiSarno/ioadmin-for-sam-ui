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

    var getDetail = function(samId, success, error) {
      /*return {
        name : "asd",
        samId : 1
      }*/
      $http.get(url+'/'+samId)
        .success(function(data) {
          success(data)
        })
        .error(function(data) {
          console.log('Error:' + data)
          error(data)
        });
    }

    var getDesign = function(samId, success, error) {
      /*return {
        name : "asd",
        samId : 1
      }*/
      $http.get(url+'/'+samId)
        .success(function(data) {
          success(data)
        })
        .error(function(data) {
          console.log('Error:' + data)
          error(data)
        });
    }

    return {
      getCurrentSamId: function () {
        return currentSamId
      },
      setCurrentSamId: function(value) {
        currentSamId = value
      },
      getDetail : getDetail,
      getDesign  : getDesign
    }

  }

})();