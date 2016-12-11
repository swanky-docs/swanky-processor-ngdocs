'use strict';

const Dgeni = require('dgeni');
const NgDocsBuilder = require('./lib/ng-docs-builder');

function swankyNgdocs(page, item) {
  const ngDocsBuilder = new NgDocsBuilder(item, page);
  const packages = [ngDocsBuilder.Package];
  const dgeni = new Dgeni(packages);

  return dgeni.generate().then(function(docs) {
    return docs.map((doc) => doc.renderedContent);
  });
};

module.exports = swankyNgdocs;
