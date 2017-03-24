// Functions required by the host project to support live editing of components for Angular
// This file should be imported by the host project's <framework>.bootstrap file

import angular from 'angular';
import debounce from 'javascript-debounce';

const ROOT_MOD_NAME = 'swanky$$ModuleRoot';

export default function(dependentModulesArr) {

  angular.module(ROOT_MOD_NAME, dependentModulesArr);

  angular.element(document).ready(() => {             // eslint-disable-line
    angular.bootstrap(document, [ROOT_MOD_NAME]);     // eslint-disable-line
  });


  // Support Live-edit behaviour:
  function angularCompile(rawElem, newContent) {
    let $injector = angular.injector(['ng', ROOT_MOD_NAME]);

    // use the injector to kick off your application
    $injector.invoke(['$rootScope', '$compile', function($rootScope, $compile) {
      let elem = angular.element(rawElem);

      elem.empty();
      elem.append(newContent);
      $compile(elem)($rootScope);
      $rootScope.$digest();
    }]);
  }

  function onChangeLiveEditAngular(event, targetCSSClassName, doc) {
    let elem = doc.querySelector(targetCSSClassName);

    angularCompile(elem, event.srcElement.value);
  }

  window.onChangeLiveEditAngular = onChangeLiveEditAngular;  // eslint-disable-line
  // debounce(onChangeLiveEditAngular, 200);

  return {
    onChangeLiveEditAngular,
    debounce
  };
};
