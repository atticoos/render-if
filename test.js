'use strict';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import renderIf, { or } from './renderIf';

chai.use(sinonChai);

describe('renderIf', () => {
  it('should return a function', () => {
    expect(typeof renderIf()).to.be.eql('function');
  });
  describe('non-lazy', () => {
    it('should return the element when the predicate passes', () => {
      expect(renderIf(true)('foobar')).to.be.eql('foobar');
    });
    it('should not return the element when the predicate fails', () => {
      expect(renderIf(false)('foobar')).to.be.eql(null);
    });
  });
  describe('lazy', () => {
    it('should return the result of the thunk when the predicate passes', () => {
      expect(renderIf(true)(() => 'foobar')).to.be.eql('foobar');
    });
    it('should not return the result of the thunk when the predicate fails', () => {
      expect(renderIf(false)(() => 'foobar')).to.be.eql(null);
    });
    it ('should call the thunk when the predicate passes', () => {
      var spy = sinon.spy();
      renderIf(true)(spy);
      expect(spy).to.have.been.called;
    });
    it ('should not call the thunk when the predicate fails', () => {
      var spy = sinon.spy();
      renderIf(false)(spy);
      expect(spy).not.to.have.been.called;
    });
  });
});

describe('or', () => {
  it('should return the first non-null value.', () => {
    expect(or()).to.eql(null);
    expect(or('foo')).to.eql('foo');
    expect(or('foo', 'bar')).to.eql('foo');
    expect(or(undefined, false, 'foo')).to.eql(false);
    expect(or(null, 'foo')).to.eql('foo');
  });
  it('should test callable predicate results.', () => {
    expect(or(() => 'foo', 'bar')).to.eql('foo');
    expect(or(() => null, () => 'foo', () => 'bar')).to.eql('foo');
  });
  it('should perfom minimal evalutations on predicates.', () => {
    var foo = sinon.spy(() => 'foo'),
        bar = sinon.spy(() => 'bar'),
        nully = sinon.spy(() => null);

    or(nully, foo, bar);
    expect(nully).to.have.been.called;
    expect(foo).to.have.been.called;
    expect(bar).to.not.have.been.called;
  });
  it('should allow mixtures of value and callable predicates.', () => {
    expect(or(null, () => 'foo', 'bar')).to.eql('foo');
    expect(or('foo', () => 'bar')).to.eql('foo');
  });
});
