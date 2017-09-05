/**
 * @author msarno
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sensory', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('sensoryList', {
          url: '/sensoryList',
          templateUrl: 'app/pages/sensory/sensoryList.html',
          title: 'Sensory',
          controller: 'TablesPageCtrl',
          sidebarMeta: {
            order: 100,
          },
        }).state('sensory', {
          url: '/sensory',
          templateUrl: 'app/pages/sensory/sensory.html',
          title: 'Sensory',
          sidebarMeta: {
            order: 100,
          },
        });
    $urlRouterProvider.when('/sensoryList','/sensory');
  }

})();
