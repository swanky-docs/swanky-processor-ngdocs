'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const Package = require('dgeni').Package;

let page = {};

const NgDocsBuilder = function(item, doc) {
  page.item = item;
  page.data = doc;

};

NgDocsBuilder.prototype.Package = new Package('ngdocs-builder', [
  require('dgeni-packages/ngdoc')
])

// Configure output
.config(function(log, readFilesProcessor, writeFilesProcessor, templateFinder, renderDocsProcessor) {

  // Provide the css map to the template rendering engine
  renderDocsProcessor.extraData.styles = page.data.meta.cssMap;

  // Clear the templateFolders array
  templateFinder.templateFolders = [];

  // Read template location from Swanky config
  if (page.item.preprocessor['swanky-processor-ngdocs'] && page.item.preprocessor['swanky-processor-ngdocs'].hasOwnProperty('templates')) {
    templateFinder.templateFolders.push(path.join(process.cwd(), `${page.item.preprocessor['swanky-processor-ngdocs'].templates}/`));
  } else {
    templateFinder.templateFolders.push(path.join(__dirname, `../templates/`));
  }

  let fileDependencies = recursiveReaddirSync(templateFinder.templateFolders[0]);

  fileDependencies.forEach((item) => {
    // Only add template dependency if it doesn't already exist
    if(!_.find(page.data.fileDependencies, {'contentSrc': [item]})) {
      page.data.fileDependencies.push({
        contentSrc: [item], // expects an array
        type: 'template'
      });
    }
  });

  log.level = 'error';

  readFilesProcessor.basePath = process.cwd();

  readFilesProcessor.sourceFiles = [{
    include: page.item.contentSrc
  }];

  // We don't want to output the files yet
  // renderDocsProcessor.$enabled = false;
  writeFilesProcessor.$enabled = false;
});

/**
 * Recursively read files from source directory
 * @param {String} dir - source directory to walk
 * @returns {Array} - list of files
 */
function recursiveReaddirSync(dir) {
  let list = [];
  let files = fs.readdirSync(dir);
  let stats;

  files.forEach(function(file) {
    stats = fs.lstatSync(path.join(dir, file));

    if(stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(path.join(dir, file)));
    } else {
      list.push(path.join(dir, file));
    }
  });

  return list;
}

module.exports = NgDocsBuilder;
