var he = require('he');

module.exports = function encode() {
  return {
    $runAfter: ['tags-extracted'],
    $runBefore: ['docs-processed'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.usage) {
          doc.usage = he.encode(doc.usage);
        }
      });
    }
  };
};
