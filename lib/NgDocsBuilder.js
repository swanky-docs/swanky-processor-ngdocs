var path = require('path');
var Package = require('dgeni').Package;

var NgDocsBuilder = function (page) {

  this.Package = new Package('ngdocs-builder', [
      require('dgeni-packages/ngdoc')
    ])
    // Encode code examples
    .processor(require('./encode'))

    // Configure output
    .config(function (log, readFilesProcessor, templateFinder, writeFilesProcessor) {

        log.level = 'error';
        var basePath = process.cwd();
        var templateConfig = path.parse(page.processor.template);

        readFilesProcessor.basePath = basePath;

        readFilesProcessor.sourceFiles = [{
            include: page.contentInput
        }];

        templateFinder.templateFolders.unshift(path.join(basePath, templateConfig.dir));

        templateFinder.templatePatterns = [
            templateConfig.base
        ];

      // We don't want to output the files yet
      writeFilesProcessor.$enabled = false;
    });
};

module.exports = NgDocsBuilder;