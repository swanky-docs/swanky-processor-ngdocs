const assert = require('assert');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Dgeni = require('dgeni');
const ejs = require('ejs');
const NgDocsBuilder = require('./lib/NgDocsBuilder');

var swankyNgdocs = function (page, meta, cb) {
  ngDocsBuilder = new NgDocsBuilder(page);

  var packages = [ngDocsBuilder.Package];

  var dgeni = new Dgeni(packages);

  dgeni.generate().then(function (docs) {
    page.processorOutput = [];
    
    // Render each doc here
    docs.forEach((doc, index) => {

      // TODO
      // Read template location from Swanky config
      var partialTemplate = path.resolve(__dirname, `./templates/api/${doc.docType}.template.ejs`);

      // TODO
      // Make this async
      var str = fs.readFileSync(partialTemplate, 'utf-8');

      var options = {
        filename: partialTemplate,
        cache: true
      };

      page.processorOutput.push(ejs.compile(str, options)({
        doc: doc,
        styles: meta.cssMap
      }));
    });

    cb(null);
  });
};

module.exports = swankyNgdocs;
