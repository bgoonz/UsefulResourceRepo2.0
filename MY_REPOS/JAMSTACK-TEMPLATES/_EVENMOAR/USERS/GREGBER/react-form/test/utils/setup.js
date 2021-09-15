import chai from 'chai';
import chaiDom from 'chai-dom';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';

chai
  .use(chaiDom)
  .use(dirtyChai)
  .use(sinonChai);

export default () => {};
