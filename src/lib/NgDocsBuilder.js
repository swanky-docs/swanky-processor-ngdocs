'use strict';

const Package = require('dgeni').Package;
let page = {};

const NgDocsBuilder = function(item) {
  page.item = item;
};

NgDocsBuilder.prototype.Package = new Package('ngdocs-builder', [
  require('dgeni-packages/ngdoc')
])
// Encode code examples
  .processor(require('./encode'))
  .processor(require('./markdown'))

  // Configure output
  .config(function(log, readFilesProcessor, writeFilesProcessor) {

    log.level = 'error';

    readFilesProcessor.basePath = process.cwd();

    readFilesProcessor.sourceFiles = [{
      include: page.item.contentSrc
    }];

    // We don't want to output the files yet
    // renderDocsProcessor.$enabled = false;
    writeFilesProcessor.$enabled = false;
  });

module.exports = NgDocsBuilder;
