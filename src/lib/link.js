'use strict';
const linkRegex = /{@link\s([\S]*)\s([^}]*)}/g;

module.exports = function links() {
  return {
    $runAfter: ['tags-extracted'],
    $runBefore: ['docs-processed'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        let docStr = JSON.stringify(doc);

        docStr.replace(linkRegex, (match, href, label) => {
          return`<a href="${href}">${label}</a>`;
        });
      });
    }
  };
};
