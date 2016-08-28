'use strict';

const Dgeni = require('dgeni');
const NgDocsBuilder = require('./lib/NgDocsBuilder');

const swankyNgdocs = function(page, item, cb) {
  const ngDocsBuilder = new NgDocsBuilder(item, page);
  const packages = [ngDocsBuilder.Package];
  const dgeni = new Dgeni(packages);

  dgeni.generate().then(function(docs) {

    docs.forEach((doc) => {
      item.rawContent.push(doc.renderedContent);
    });

    cb(null);
  });
};

module.exports = swankyNgdocs;
