import path from 'path'

import {Popstar} from '../../../src/Popstar';

describe('Popstar', () => {
  const popstar = Popstar(path.join(process.cwd(), 'test', 'test_mixins'))

  describe('initialise with valid mixin path', () => {
    it('returns an object', () => {
      expect(typeof popstar).toBe('object')
    });
  });

  describe('errors', () => {
    it('throws error when no mixin name(s) is passed', () => {
      expect(() => {
        popstar.onPageWith((page) => {})
      }).toThrow('You must supply at least one mixin');
    });

    it('throws error when mixin path is invalid', () => {
      expect(() => {
        popstar.onPageWith('NonExistent', (page) => {})
      }).toThrow(`Module path: "${process.cwd()}/test/test_mixins/PageWithNonExistent" does not exist`);
    });
  });

  describe('Mixes in properties and functions from mixins into page', () => {
    it('has StaticSelector module mixed in', () => {
      popstar.onPageWith('StaticSelector', (page) => {
        expect(page.staticSelector).toEqual("div#static-selector");
      });
    });

    it('has DynamicSelector module mixed in', () => {
      popstar.onPageWith('DynamicSelector', (page) => {
        expect(page.dynamicSelector(1)).toEqual("div#dynamic-selector-1");
        expect(page.dynamicSelector(2)).toEqual("div#dynamic-selector-2");
      });
    });
  })
});
