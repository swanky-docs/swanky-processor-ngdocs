'use strict';

// Functions required by the host project to support live editing of components for React
// This file should be imported by the host project's <framework>.bootstrap file

// Assume React and ReactDOM are included by host project
const React = require('react');
const ReactDOM = require('react-dom');
const debounce = require('javascript-debounce');


/*
 * @param dependentModulesArr   Format: {ComponentName: function ComponentName(...) {}, DatePicker: function DatePicker()...}
 */
module.exports = function(dependentModulesMap) {
  const WIN = window;

  // Export the default-export of each module onto the WINDOW object.
  // E.g.: window.DatePicker = function() ...
  // This allows Babel to compile JSX references to the component correctly. E.g. ReactDOM.render(<DatePicker id="..."/> works)
  Object.keys(dependentModulesMap).forEach(function(moduleKey) {
    WIN[moduleKey] = dependentModulesMap[moduleKey];
  });


  function reactCompile(elem, newContent) {
    elem.textContent = '';  // Clear the existing content

    // Babel is defined in the React live-update template via an external script
    var result = Babel.transform('_secretReactRenderMethod(' + newContent + ', elem);', { presets: ['es2015', 'react'] });

    // Strangely, Babel doesn't eval the code automatically
    eval(result.code);
  }


  function onChangeLiveEditReact(event, targetCSSClassName, doc) {
    var elem = doc.querySelector(targetCSSClassName);

    reactCompile(elem, event.srcElement.value);
  }


  // Bind React and other public methods to the window object
  WIN.React = React;
  WIN._secretReactRenderMethod = ReactDOM.render;
  WIN.onChangeLiveEditReact = onChangeLiveEditReact; //: debounce(onChangeLiveEditReact, 200);
  WIN.reactCompile = reactCompile;

  return {
    onChangeLiveEditReact: onChangeLiveEditReact,
    reactCompile: reactCompile,
    debounce: debounce
  };
}
