// Functions required by the host project to support live editing of components for React
// This file should be imported by the host project's <framework>.bootstrap file

import React from 'react';                                // Assume React and ReactDOM are included by host project
import ReactDOM from 'react-dom';
import debounce from 'javascript-debounce';
const babel = require('babel-standalone/babel.min');      // This is needed to parse the <script type="text/babel"> blocks


/*
 * @param dependentModulesArr   Format: {ComponentName: function ComponentName(...) {}, DatePicker: function DatePicker()...}
 */
export default function(dependentModulesMap) {
  const WIN = window; // eslint-disable-line

  // Export the default-export of each module onto the WINDOW object.
  // E.g.: window.DatePicker = function() ...
  // This allows Babel to compile JSX references to the component correctly. E.g. ReactDOM.render(<DatePicker id="..."/> works)
  Object.keys(dependentModulesMap).forEach(moduleKey => WIN[moduleKey] = dependentModulesMap[moduleKey]);


  function reactCompile(elem, newContent) {
    elem.textContent = '';  // Clear the existing content

    let result = babel.transform(`_secretReactRenderMethod(${newContent}, elem);`, {presets: ['es2015', 'react']});

    // Strangely, Babel doesn't eval the code automatically
    eval(result.code);            // eslint-disable-line
  }


  function onChangeLiveEditReact(event, targetCSSClassName, doc) {
    let elem = doc.querySelector(targetCSSClassName);

    reactCompile(elem, event.srcElement.value);
  }


  // Bind React and other public methods to the window object
  WIN.React = React;
  WIN._secretReactRenderMethod = ReactDOM.render;
  WIN.onChangeLiveEditReact = onChangeLiveEditReact; //: debounce(onChangeLiveEditReact, 200);
  WIN.reactCompile = reactCompile;

  return {
    onChangeLiveEditReact,
    reactCompile,
    debounce
  };
}
