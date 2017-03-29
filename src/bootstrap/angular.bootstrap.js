'use strict';

// Functions required by the host project to support live editing of components for Angular
// This file should be imported by the host project's <framework>.bootstrap file

const angular = require('angular');
const debounce = require('javascript-debounce');

const ROOT_MOD_NAME = 'swanky$$ModuleRoot';

/*
 * @param dependentModulesArr   Format: {'com.feature.moduleName': moduleObj, ...}
 */
module.exports = function(dependentModulesMap) {

  var dependentModulesArr = Object.keys(dependentModulesMap);

  angular.module(ROOT_MOD_NAME, dependentModulesArr);

  angular.element(document).ready(function() {
    angular.bootstrap(document, [ROOT_MOD_NAME]);
  });


  // Support Live-edit behaviour:
  function angularCompile(rawElem, newContent) {
    var $injector = angular.injector(['ng', ROOT_MOD_NAME]);

    // use the injector to kick off your application
    $injector.invoke(['$rootScope', '$compile', function($rootScope, $compile) {
      var elem = angular.element(rawElem);

      elem.empty();
      elem.append(newContent);
      $compile(elem)($rootScope);
      $rootScope.$digest();
    }]);
  }

  function onChangeLiveEditAngular(event, targetCSSClassName, doc) {
    var elem = doc.querySelector(targetCSSClassName);

    angularCompile(elem, event.srcElement.value);
  }

  window.onChangeLiveEditAngular = onChangeLiveEditAngular;
  // debounce(onChangeLiveEditAngular, 200);

  return {
    onChangeLiveEditAngular: onChangeLiveEditAngular,
    debounce: debounce
  };
};
