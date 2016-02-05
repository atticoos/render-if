'use strict';

import {expect} from 'chai';
import renderIf from './renderIf';

describe('renderIf', () => {
  it ('should return a function', () => {
    expect(typeof renderIf()).to.be.eql('function');
  });
  it ('should return the element when the predicate passes', () => {
    expect(renderIf(true)('foobar')).to.be.eql('foobar');
  });
  it ('should not return the element when the predicate fails', () => {
    expect(renderIf(false)('foobar')).to.be.eql(false);
  });
});
