/**
 * @author msarno
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory')
      .controller('SensoryEvaluationCtrl', SensoryEvaluationCtrl);

  /** @ngInject */
  function SensoryEvaluationCtrl($scope, $http, samService) {
    var vm = this;

    vm.samDetail = {};
    vm.samDesign = {};
    vm.shipment = {};

    vm.preload = function(id) {
      console.log(id)
      samService.getDetail(id, function(data){vm.samDetail=data})
      samService.getDesign(id, function(data){vm.samDesign=data})
    }

    if (0 < samService.getCurrentSamId()) {
      vm.preload(samService.getCurrentSamId())
    }

    vm.samDetailSave = function() {
      var url = 'http://localhost:8080/sam/evaluation?name='+vm.samDetail.name+'&type='+vm.samDetail.type+'&scale='+vm.samDetail.scale
      console.log(url)

      $http.post(url)
        .success(function(data) {
          console.log(data)
          vm.samDetail.samId = data.data;
        })
        .error(function(data) {
          console.log('Error:' + data);
          console.log('Error:' + data.notification.message);
        });
    }

    vm.samDesignSave = function() {
      var url = 'http://localhost:8080/sam/evaluation/'+vm.samDetail.samId+'/design?judges='+vm.samDesign.judges+'&samples='+vm.samDesign.samples
      console.log(url)

      $http.post(url)
        .success(function(data) {
          console.log(data)
          vm.samDetail.samId = data.data;
        })
        .error(function(data) {
          console.log('Error:' + data);
          console.log('Error:' + data.notification.message);
        });
    }

    vm.designCsvDownload = function() {
      var url = 'http://localhost:8080/sam/evaluation/'+vm.samDetail.samId+'/design/export?type=csv'
      console.log(url)

      $http.get(url)
        .success(function(data) {
          console.log(data)
          vm.samDetail.samId = data.data;
        })
        .error(function(data) {
          console.log('Error:' + data);
          console.log('Error:' + data.notification.message);
        });
    }

    vm.designCsvDownloadUrl = function() {
      //return 'http://localhost:8080/sam/evaluation/'+vm.samDetail.samId+'/design/export?type=csv'
      return 'http://localhost:8080/sam/evaluation/1/design/export?type=csv'
    }
  }

})();
