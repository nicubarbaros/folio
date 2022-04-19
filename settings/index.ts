import development from './settings-development';
import production from './settings-production';
import test from './settings-development';

const settings = {
  development,
  production,
  test
}[process.env.NODE_ENV];

export default settings;
