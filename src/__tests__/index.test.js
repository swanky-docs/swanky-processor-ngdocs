'use strict';

const path = require('path');
const swankyNgdocs = require('./../index');

let mockPage;
let mockJSItem;
let mockJSXItem;

beforeEach(() => {
  mockPage = {
    meta: {
      cssMap: {}
    },
    fileDependencies: []
  };

  mockJSItem = {
    contentSrc: path.join(__dirname, './../__mocks__/__fixtures__/angular-component.js'),
    preprocessor: {
      'swanky-processor-ngdocs': {}
    }
  };

  mockJSXItem = {
    contentSrc: path.join(__dirname, './../__mocks__/__fixtures__/react-component.jsx'),
    preprocessor: {
      'swanky-processor-ngdocs': {}
    }
  };
});

describe('swankyNgdocs', () => {
  it('should exist', () => {
    expect(swankyNgdocs).toBeDefined();
  });

  it('should return an array of processed ngdocs comments for a JS file', (done) => {
    swankyNgdocs(mockPage, mockJSItem).then((result) => {
      expect(result.length).toBe(1);
      done();
    });
  });

  // This DOES NOT change the test coverage, so there's no reason for it to exist. Thoughts?
  it('should return an array of processed ngdocs comments for a JSX file', (done) => {
    swankyNgdocs(mockPage, mockJSXItem).then((result) => {
      expect(result.length).toBe(1);
      done();
    });
  });

  it('should handle a custom templates folder', (done) => {
    mockJSItem.preprocessor = {
      'swanky-processor-ngdocs': {
        templates: 'src/__mocks__/__fixtures__/templates'
      }
    };

    swankyNgdocs(mockPage, mockJSItem).then((result) => {
      expect(result.length).toBe(1);
      done();
    });
  });

  it('should not duplicate file dependencies', (done) => {
    const initialFileDependenciesLength = 22;   // This is __VERY__ brittle. Changes as we add/remove templates

    // Add an EXISTING template to fileDependencies array
    mockPage.fileDependencies = [{
      contentSrc: [path.join(process.cwd(), 'src/templates/api/type.template.html')],
      type: 'template'
    }];

    swankyNgdocs(mockPage, mockJSItem).then(() => {
      expect(mockPage.fileDependencies.length).toBe(initialFileDependenciesLength);
      done();
    });
  });
});
