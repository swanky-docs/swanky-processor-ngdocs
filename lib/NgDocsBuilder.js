var path = require('path');
var Package = require('dgeni').Package;

var NgDocsBuilder = function (page) {

  this.Package = new Package('ngdocs-builder', [
      require('dgeni-packages/ngdoc')
    ])
    // Encode code examples
    .processor(require('./encode'))

    // Configure output
    .config(function (log, readFilesProcessor, writeFilesProcessor) {

        log.level = 'error';
        var basePath = process.cwd();

        readFilesProcessor.basePath = basePath;

        readFilesProcessor.sourceFiles = [{
            include: page.contentSrc
        }];

        // We don't want to output the files yet
        // renderDocsProcessor.$enabled = false;
        writeFilesProcessor.$enabled = false;
    });
};

module.exports = NgDocsBuilder;