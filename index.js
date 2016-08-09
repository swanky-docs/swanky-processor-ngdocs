"use strict"

const fs = require('fs');
const path = require('path');
const Dgeni = require('dgeni');
const ejs = require('ejs');
const basePath = process.cwd();
const NgDocsBuilder = require('./lib/NgDocsBuilder');

const swankyNgdocs = function (page, item, cb) {
  const ngDocsBuilder = new NgDocsBuilder(item);
  const packages = [ngDocsBuilder.Package];
  const dgeni = new Dgeni(packages);

  dgeni.generate().then(function (docs) {
    // Render each doc here
    docs.forEach((doc /* index */) => {

      let partialTemplate;

      // Read template location from Swanky config
      if (item.preprocessor.ngdocs && item.preprocessor.ngdocs.hasOwnProperty('templates')) {
        partialTemplate = path.join(basePath, `${item.preprocessor.ngdocs.templates}/${doc.docType}.template.ejs`);
      } else {
        partialTemplate = path.join(__dirname, `./templates/api/${doc.docType}.template.ejs`);
      }

      let str;

      try {
        str = fs.readFileSync(partialTemplate, 'utf-8');
      } catch (err) {
        console.log(err);
        process.exit(1);
      }

      // Add file dependencies for live reload / webpack implementation
      page.fileDependencies.push({
        contentSrc: [partialTemplate], // expects an array
        type:'template'
      });

      var options = {
        filename: partialTemplate,
        cache: true
      };

      item.rawContent.push(ejs.compile(str, options)({
        doc: doc,
        styles: page.meta.cssMap
      }));

    });

    cb(null);
  });
};

module.exports = swankyNgdocs;
