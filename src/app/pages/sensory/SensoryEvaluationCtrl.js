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
    vm.samGraphic = {}

    vm.graphicMock = {
      labels : ["May", "Jun", "Jul", "Aug", "Sep"],
      data :  [
        [65, 59, 90, 81, 56],
        [28, 48, 40, 19, 88]
        ],
      series : ['Product A', 'Product B']
    }

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

    vm.buildGraphicData = function(data) {
      var gLabels = new Array()
      var gSeries = new Array()
      var gData = new Array()

      for (var i = 0; i < data.length; i++) {
        var partialResult = data[i]
        gLabels.push(partialResult.attributeName)

        for (var j = 0; j < partialResult.summaries.length; j++) {
          var summary = partialResult.summaries[j]

          if (gData.length <= j) {
            gData.push(new Array())
            gSeries.push(summary.sampleName)
          }

          gData[j].push(summary.average)
        }
      }

      return {
        labels : gLabels,
        series : gSeries,
        data : gData
      }
      
    }

    vm.processResult = function(data) {
      vm.samResult=data
      vm.samGraphic = vm.buildGraphicData(vm.samResult.partialResults)
      console.log(vm.samGraphic)
    }

    vm.getSamResult = function() {
      return samService.getResult(vm.samDetail.samId,
        vm.processResult,
        function(data){console.log(data)})
    }

    vm.calcSamResult = function() {
      return samService.calcResult(vm.samDetail.samId, vm.samResult.alpha, 
        vm.processResult,
        function(data){console.log(data)})
    }

    // initialize
    if (0 < samService.getCurrentSamId()) {
      vm.samDetail = { samId : samService.getCurrentSamId() }
      vm.getSamDetail()
      vm.getSamDesign()
      vm.getSamResult()
    }

    $scope.smartTableData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18'
      },
      {
        id: 4,
        firstName: 'John',
        lastName: 'Snow',
        username: '@snow',
        email: 'snow@gmail.com',
        age: '20'
      },
      {
        id: 5,
        firstName: 'Jack',
        lastName: 'Sparrow',
        username: '@jack',
        email: 'jack@yandex.ru',
        age: '30'
      }
    ]

  }

})();
