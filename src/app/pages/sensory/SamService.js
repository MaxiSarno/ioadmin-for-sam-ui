/**
 * @author msarno
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
    .service('samService', samService);

  /** @ngInject */
  function samService($sce, $http) {
    var thiz = this
    var currentSamId = 0

    thiz.http = function(url, method, success, error) {
      var req = {
        method: method,
        url: url,
      }

      $http(req)
        .success(function(data) {
          success(data)
        })
        .error(function(data) {
          error(data)
        })
    }

    var evaluationUrl = 'http://localhost:8180/sam/evaluation'

    var getList = function(success, error) {
      thiz.http(evaluationUrl, 'GET', success, error)
    }

    var getDetail = function(samId, success, error) {
      var getDetailUrl = evaluationUrl+'/'+samId
      thiz.http(getDetailUrl, 'GET', success, error)
    }

    var saveDetail = function(samDetail, success, error) {
      var saveDetailUrl = evaluationUrl+'?name='+samDetail.name+'&type='+samDetail.type+'&scale='+samDetail.scale
      thiz.http(saveDetailUrl, 'POST', success, error)
    }

    var getDesign = function(samId, success, error) {
      var getDesignUrl = evaluationUrl+'/'+samId+'/design'
      thiz.http(getDesignUrl, 'GET', success, error)
    }

    var getDesignCsvUrl = function(samId) {
      return evaluationUrl+'/'+samId+'/design/export?type=csv'
    }

    var saveDesign = function(samId, samDesign, success, error) {
      var saveDesignUrl = evaluationUrl+'/'+samId+'/design?judges='+samDesign.judges+'&samples='+samDesign.samples
      thiz.http(saveDesignUrl, 'POST', success, error)
    }

    var getResult = function(samId, success, error) {
      var getResultUrl = evaluationUrl+'/'+samId+'/results'
      thiz.http(getResultUrl, 'GET', success, error)
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
      saveDetail : saveDetail,
      getDesignCsvUrl: getDesignCsvUrl,
      getDesign  : getDesign,
      saveDesign  : saveDesign,
      getResult : getResult
    }

  }

})();