import _ from 'lodash';

const Page = () => {
};

const Popstar = (mixinPath) => {
  const addMixin = (page, mixin) => {
    _.extend(page, mixin);
  };

  const onPage = (callback) => {
    const page = new Page();
    return callback(page);
  };

  const loadModule = (mixin) => {
    return require(`${mixinPath}/PageWith${mixin}`);
  };

  return () => {
    return {
      onPageWith: (...args) => {
        let mixins = [];
        let callback;
        if (_.isFunction(_.last(args))) {
          callback = args.pop();
          mixins = args;
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
};

module.exports.popstar = Popstar;
