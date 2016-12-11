'use strict';

const path = require('path');
const swankyNgdocs = require('./../index');

let mockPage;
let mockItem;

beforeEach(() => {
  mockPage = {
    meta: {
      cssMap: {}
    },
    fileDependencies: []
  };

  mockItem = {
    contentSrc: path.join(__dirname, './../__mocks__/__fixtures__/angular-component.js'),

    preprocessor: {
      'swanky-processor-ngdocs': {}
    }
  };
});

describe('swankyNgdocs', () => {
  it('should exist', () => {
    expect(swankyNgdocs).toBeDefined();
  });

  it('should return an array of processed ngdocs comments', (done) => {
    swankyNgdocs(mockPage, mockItem).then((result) => {
      expect(result.length).toBe(1);
      done();
    });
  });

  it('should handle a custom templates folder', (done) => {
    mockItem.preprocessor = {
      'swanky-processor-ngdocs': {
        templates: 'src/__mocks__/__fixtures__/templates'
      }
    };

    swankyNgdocs(mockPage, mockItem).then((result) => {
      expect(result.length).toBe(1);
      done();
    });
  });

  it('should not duplicate file dependencies', (done) => {
    const inititalFileDependenciesLength = 20;

    // Add an existing template to fieldDependencies array
    mockPage.fileDependencies = [{
      contentSrc: [path.join(process.cwd(), 'src/templates/api/type.template.html')],
      type: 'template'
    }];

    swankyNgdocs(mockPage, mockItem).then(() => {
      expect(mockPage.fileDependencies.length).toBe(inititalFileDependenciesLength);
      done();
    });
  });
});
