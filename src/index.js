'use strict';

console.warn('Important notice: This library is deprecated and not actively developed anymore.');

const Dgeni = require('dgeni');
const NgDocsBuilder = require('./lib/ng-docs-builder');

function swankyNgdocs(page, item) {
  const ngDocsBuilder = new NgDocsBuilder(item, page);
  const packages = [ngDocsBuilder.Package];
  const dgeni = new Dgeni(packages);

  return dgeni.generate().then(function(docs) {
    return docs.map((doc) => doc.renderedContent);
  });
}

module.exports = swankyNgdocs;
