import _ from 'lodash';
import fs from 'fs';

const Page = () => {};

const Popstar = (mixinPath) => {
  const addMixin = (page, mixin) => {
    _.extend(page, mixin);
  };

  const onPage = (callback) => {
    const page = new Page();
    return callback(page);
  };

  const loadModule = (mixin) => {
    const modulePath = `${mixinPath}/PageWith${mixin}`;
    if(!fs.existsSync(`${modulePath}.js`)) {
      throw new Error(`Module path: "${modulePath}" does not exist`);
    }
    return require(modulePath);
  };

  return {
    mixinPath: mixinPath,
    onPageWith: (...args) => {
      let mixins = [];
      let callback;
      if (_.isFunction(_.last(args))) {
        callback = args.pop();
        mixins = args;
      } else {
        throw new Error('You must supply a callback Example:"(page) => page.mixinName.action"');
      }
      if (!mixins.length) {
        throw new Error('You must supply at least one mixin');
      }
      return onPage((page) => {
        _(mixins).each((mixin) => {
          const loadedMixin = loadModule(mixin);
          if (_.isEmpty(loadedMixin)) {
            throw new Error(`Mixin: ${loadedMixin} is empty.`);
          }
          addMixin(page, loadedMixin);
        });
        return callback(page);
      });
    },
  };
};

module.exports.Popstar = Popstar;

