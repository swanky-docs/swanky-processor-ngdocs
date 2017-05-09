'use strict';

// Functions required by the host project to support live editing of components for Angular
// This file should be imported by the host project's <framework>.bootstrap file

const angular = require('angular');
const debounce = require('javascript-debounce');

// Code Editor
const CodeMirror = require ('codemirror/lib/codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript.js');

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

  function onChangeLiveEditAngular(target, value) {
    angularCompile(target, value);
  }

  // Create a new Code Mirror instance for each editor
  const liveEditors = document.getElementsByClassName('live-editor');

  for (var i = 0; i < liveEditors.length; i++) {
    (function(index) {
      var editor = liveEditors[index];

      CodeMirror.fromTextArea(editor, {
        lineNumbers: true,
        lineWrapping: true,
        mode: "htmlmixed"
      }).on('change', function (codeMirror) {
        var outputEl = document.getElementsByClassName(editor.dataset.output)[0];

        onChangeLiveEditAngular(outputEl, codeMirror.getValue());
      });
    })(i);
  }

  return {
    onChangeLiveEditAngular: onChangeLiveEditAngular,
    debounce: debounce
  };
};
