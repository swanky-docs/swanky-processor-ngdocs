'use strict';

module.exports = function() {
  return {
    name: 'area',
    defaultFn: function(doc) {
      let apiExtensions = ['js', 'jsx'];

      // Code files are put in the 'api' area
      // Other files compute their area from the first path segment
      return apiExtensions.indexOf(doc.fileInfo.extension) > -1 ? 'api' : doc.fileInfo.relativePath.split('/')[0];
    }
  };
};
