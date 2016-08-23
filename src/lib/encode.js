'use strict';

const he = require('he');
const codeBlockRegex = /```([a-z]*)\n([\s\S]*)?\n```/g;

module.exports = function encode() {
  return {
    $runAfter: ['tags-extracted'],
    $runBefore: ['docs-processed'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        if (doc.usage) {
          let usage = doc.usage;

          usage.replace(codeBlockRegex, (match, type, example) => {
            let languageType = type ? `language-${type}` : `language-markup`;

            doc.usage = `<code class="${languageType}">${he.encode(example)}</code>`;
          });
        }
      });
    }
  };
};
