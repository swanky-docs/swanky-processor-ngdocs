const assert = require('assert');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Dgeni = require('dgeni');
const NgDocsBuilder = require('./lib/NgDocsBuilder');

var swankyNgdocs = function (page, cb) {
  ngDocsBuilder = new NgDocsBuilder(page);

  var packages = [ngDocsBuilder.Package];

  var dgeni = new Dgeni(packages);

  dgeni.generate().then(function (docs) {
    page.processorOutput = [];
    
    docs.forEach((item, index) => {
       page.processorOutput.push(item.renderedContent);
    });

    cb(null);
  });
};

module.exports = swankyNgdocs;
