import path from 'path'
import { Popstar } from '../../../src/Popstar';
import { popstar } from '../../../src/index';

describe('Popstar', () => {

  describe('popstar is an object with properties and functions', () => {
    it('returns an object', () => {
      expect(typeof popstar).toBe('object')
    });

    it('has a default mixin path', function () {
      expect(popstar.mixinPath).toEqual(`${process.cwd()}/test/e2e/page_mixins`)
    });

    it('has an onPageWith function', () => {
      expect(typeof popstar.onPageWith).toBe('function');
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
      }).toThrow(`Module path: "${process.cwd()}/test/e2e/page_mixins/PageWithNonExistent" does not exist`);
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
  });

  describe('override default mixin path with custom init', () => {
    it('has custom mixin path', () => {
      const custom_mixin_path = `${process.cwd()}/test/e2e/custom_mixins`;
      const popstar = Popstar(custom_mixin_path);
      expect(popstar.mixinPath).toEqual(custom_mixin_path);
    });
  });
});
