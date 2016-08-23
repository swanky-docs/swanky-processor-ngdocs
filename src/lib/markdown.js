'use strict';

const showdown = require('showdown');
const markdown = new showdown.Converter();

module.exports = function links() {
  return {
    $runAfter: ['tags-extracted'],
    $runBefore: ['docs-processed'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        if(doc.description) {
          doc.description =  markdown.makeHtml(doc.description);
        }

        if(doc.requires) {
          doc.requires =  doc.requires.map((item) => {
            return markdown.makeHtml(item);
          });
        }
      });
    }
  };
};
