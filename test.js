'use strict';

import {expect} from 'chai';
import renderIf from './renderIf';

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
  });
});
