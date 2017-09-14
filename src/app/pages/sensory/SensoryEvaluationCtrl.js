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
    vm.samResult = {};

    vm.getSamDetail = function() {
      samService.getDetail(vm.samDetail.samId, 
        function(data){vm.samDetail=data})
    }

    vm.samDetailSave = function() {
      samService.saveDetail(vm.samDetail, 
        function(data) {vm.samDetail.samId = data.data}, 
        function(data) {console.log("fallo vm.samDetailSave")})
    }

    vm.getSamDesign = function() {
      samService.getDesign(vm.samDetail.samId, 
        function(data){vm.samDesign=data})
    }

    vm.samDesignSave = function() {
      samService.saveDesign(vm.samDetail.samId, vm.samDesign, 
        function(data) {console.log(data)}, 
        function(data) {console.log('Error:' + data.notification.message)})
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

    vm.getAttributesTemplate = function() {

    }


    vm.attributesUpload = function() {
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/sam/evaluation/'+vm.samDetail.samId+'/attributes/fileupload',
        headers: {
          'Content-Type': undefined
        },
        data: { test: 'test' }
      }

      $http(req).then(console.log('success'), console.log('error'));
    }

    // initialize
    if (0 < samService.getCurrentSamId()) {
      vm.samDetail = { samId : samService.getCurrentSamId() }
      vm.getSamDetail()
      vm.getSamDesign()
      samService.getResult(samService.getCurrentSamId(), function(data){vm.samResult=data})
    }

  }

})();
