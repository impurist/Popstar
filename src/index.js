
import { Popstar } from './Popstar';

const mixinPath = `${process.cwd()}/test/e2e/page_mixins`;
const popstar = Popstar(mixinPath);
module.exports.popstar = popstar;
module.exports.onPageWith = popstar.onPageWith;
