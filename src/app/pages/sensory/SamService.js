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

    var getList = function(success, error) {
      $http.get(url)
        .success(function(data) {
          console.log("samService.getList:")
          console.log(data)
          success(data)
        })
        .error(function(data) {
          console.log('samService.getList Error:')
          console.log(data)
          error(data)
        });
    }

    var getDetail = function(samId, success, error) {
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
      $http.get(url+'/'+samId+'/design')
        .success(function(data) {
          success(data)
        })
        .error(function(data) {
          console.log('Error:' + data)
          error(data)
        });
    }

    var getResult = function(samId, success, error) {
      $http.get(url+'/'+samId+'/results')
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
        console.log('seteando el csid en:'+value)
        currentSamId = value
      },
      getList : getList,
      getDetail : getDetail,
      getDesign  : getDesign,
      getResult : getResult
    }

  }

})();