'use strict';

const areaTag = require('../area')();

describe('area tag-def', () => {

  it('should return an object with a "name"<string> and "defaultFn"<function>', () => {
    expect(areaTag.name).toEqual('area');
    expect(typeof areaTag.defaultFn).toEqual('function');
  });

  describe('defaultFn', () => {

    it('should return "api" when the file extension is "js"', () => {
      let doc = {
        fileInfo: {
          extension: 'js',
          relativePath: 'foo/bar/file'
        }
      };

      expect(areaTag.defaultFn(doc)).toEqual('api');
    });

    it('should return "api" when the file extension is "jsx"', () => {
      let doc = {
        fileInfo: {
          extension: 'jsx',
          relativePath: 'foo/bar/file'
        }
      };

      expect(areaTag.defaultFn(doc)).toEqual('api');
    });

    it('should return a substring of the relative path when the file extension is not "js" or "jsx"', () => {
      let doc = {
        fileInfo: {
          extension: 'notjsorjsx',
          relativePath: 'firstPartOfRelativePath/bar/file'
        }
      };

      expect(areaTag.defaultFn(doc)).toEqual('firstPartOfRelativePath');
    });
  });

});
