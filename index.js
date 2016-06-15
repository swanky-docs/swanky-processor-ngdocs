const assert = require('assert');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Dgeni = require('dgeni');
const ejs = require('ejs');
const basepath = process.cwd();
const NgDocsBuilder = require('./lib/NgDocsBuilder');

var swankyNgdocs = function (page, meta, cb) {
  ngDocsBuilder = new NgDocsBuilder(page);

  var packages = [ngDocsBuilder.Package];

  var dgeni = new Dgeni(packages);

  dgeni.generate().then(function (docs) {
    page.processorOutput = [];

    // Render each doc here
    docs.forEach((doc, index) => {

      var partialTemplate;

      // Read template location from Swanky config
      if (page.processor.ngdocs && page.processor.ngdocs.hasOwnProperty('templates')) {
        partialTemplate = path.join(basepath, `${page.processor.ngdocs.templates}/${doc.docType}.template.ejs`);
      } else {
        partialTemplate = path.join(__dirname, `./templates/api/${doc.docType}.template.ejs`);
      }

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
