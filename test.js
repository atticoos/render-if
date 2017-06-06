'use strict';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import renderIf from './renderIf';

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

  describe('if/elseIf/else', () => {
    for (let i = 1; i <= 4; i++) {
      let result = renderIf.if(i === 1) (
        '1'
      ).elseIf(i === 2) (
        '2'
      ).elseIf(i === 3) (
        '3'
      ).else(
        '4'
      ).evaluate();

      expect(result).to.be.equal(`${i}`);
    }
  })
  describe('switch', () => {
    for (let i = 1; i <= 4; i++) {
      let result = renderIf.switch(i)
        .case(1) (
          '1'
        )
        .case(2) (
          '2'
        )
        .case(3) (
          '3'
        )
        .default(
          '4'
        )
        .evaluate();

      expect(result).to.be.eql(`${i}`);
    }
  })
});
