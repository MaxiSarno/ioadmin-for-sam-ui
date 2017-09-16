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

    vm.samDetail = {}
    vm.samDesign = {}
    vm.samResult = {}
    vm.samAttributes = {}

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

    vm.getSamDesignCsv = function() {
      return samService.getDesignCsvUrl(vm.samDetail.samId)
    }

    vm.getSamAttributesTemplate = function() {
      return samService.getAttributesCsvUrl(vm.samDetail.samId, vm.samAttributes.names)
    }


    vm.attributesUpload = function() {
      var req = {
        method: 'POST',
        url: 'http://localhost:8180/sam/evaluation/'+vm.samDetail.samId+'/attributes/fileupload',
        headers: {
          'Content-Type': multipart/form-data
        },
        data: { test: 'test' }
      }

      $http(req).then(console.log('success'), console.log('error'));
    }

    vm.attributesUploadB = function() {
      console.log('upload')

      var uploadUrl = "http://localhost:8180/sam/evaluation/" + vm.samDetail.samId + "/attributes/fileupload"
      var myForm = document.getElementById('attributesUploadForm')
      myForm.action = uploadUrl
    }

    vm.getSamResult = function() {
      return samService.getResult(vm.samDetail.samId, 
        function(data){vm.samResult=data},
        function(data){console.log(data)})
    }

    vm.calcSamResult = function() {
      return samService.calcResult(vm.samDetail.samId, vm.samResult.alpha, 
        function(data){vm.samResult=data},
        function(data){console.log(data)})
    }

    // initialize
    if (0 < samService.getCurrentSamId()) {
      vm.samDetail = { samId : samService.getCurrentSamId() }
      vm.getSamDetail()
      vm.getSamDesign()
      vm.getSamResult()
    }

  }

})();
