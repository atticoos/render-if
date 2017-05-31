# render-if
[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/render-if)
[![NPM version](http://img.shields.io/npm/v/render-if.svg?style=flat)](https://npmjs.org/package/render-if)
[![Build Status](http://img.shields.io/travis/ajwhite/render-if.svg?style=flat)](http://travis-ci.org/ajwhite/render-if)

A tiny, yet conveniently curried way to render conditional React components. Works great with both React and React Native.

```js
renderIf(predicate)(element)
```

## Installation

```
npm install render-if --save
```

You can also install the `eslint` plugin, [eslint-plugin-render-if](https://github.com/v-technologies/eslint-plugin-render-if)

## What it looks like

`renderIf` is a curried function that takes a predicate and returns a function accepting an element that will only be returned if the predicate is satisfied.
The function returned by `renderIf` will also accept a parameterless function which will only be invoked if the predicate is satisfied, allowing for lazy evaluation of inner JSX.

```js
renderIf(1 + 1 === 2)(
  <Text>Hello World!</Text>
)
```

### As an in-line expression

```jsx
class MyComponent extends Component {
  render() {
    return (
      {renderIf(1 + 2 === 3)(
        <span>The universe is working</span>
      )}
    );
  }
}
```

### As a lazy in-line expression

```jsx
class MyComponent extends Component {
  render() {
    return (
      {renderIf(1 + 2 === 3)(() => (
        <span>This is only invoked if the universe is working</span>
      ))}
    );
  }
}
```

### As a named function

```jsx
class MyComponent extends Component {
  render() {
    const ifTheUniverseIsWorking = renderIf(1 + 2 === 3);
    return (
      {ifTheUniverseIsWorking(
        <span>The universe is still wroking</span>
      )}
    )
  }
}
```

### As a composed function
```jsx
const ifEven = number => renderIf(number % 2 === 0);
const ifOdd = number => renderIf(number % 2 !== 0);

class MyComponent extends Component {
  render() {
    return (
      {ifEven(this.props.count)(
        <span>{this.props.count} is even</span>
      )}
      {ifOdd(this.props.count)(
        <span>{this.props.count} is odd</span>
      )}
    );
  }
}
```

## What it no longer looks like

```jsx
class MyComponent extends Component {
  render() {
    var conditionalOutput;
    if (1 + 1 === 2) {
      conditionalOutput = <span>I am rendered!</span>;
    } else {
      conditionalOutput = <span>I am not rendered :(</span>;
    }
    return (
      <div>
        <!-- this works, but it can get ugly -->
        {conditionalOutput}
        {1 + 1 === 2 && <span>I am rendered!</span>}
        {this.anotherConditionalRender()}
      </div>
    );
  }
  anotherConditionalRender() {
    if (1 + 1 === 2) {
      return <span>I am rendered!</span>
    }
  }
}
```

## Branching

`renderIf` allows flexible conditional branching by using the `or` method attached to `renderIf`. `or` will return the first value that is not null or undefined.

```jsx
const ifEven = number => renderIf(number % 2 === 0);

renderIf.or(
  ifEven(<span>Number is even!</span>),
  <span>Number is Odd!</span>  
);
```

Not really too exciting since you can replace the entire example with something simplier.

```jsx
{i % 2 === 0
  ? <span>Number is even!</span>
  : <span>Number is Odd!</span>}
```

However the above example will quickly become unmanageable when other conditions or fall throughs introduced.

```jsx
import renderIf, { or } from 'renderIf';

const ifEven = number => renderIf(number % 2 === 0);
const ifMultipleOf3 = number => renderIf(number % 3 === 0);

class MyComponent extends Component {
  render() {
    return (
      {or(
        ifEven(<span>Number is even!</span>),
        ifMultipleOf3(<span>Number is multiple of 3!</span>),
        <span>Number is something else</span>
      )}
    );
  }
}
```

### Lazy predicates

Predicates can also be functions and will be evaluated lazily.

```jsx
import renderIf, { or } from 'renderIf';

const ifEven = number => renderIf(number % 2 === 0);
const ifMultipleOf3 = number => renderIf(number % 3 === 0);

class MyComponent extends Component {
  render() {
    return (
      {or(
        ifEven(<span>Number is even!</span>),
        ifMultipleOf3(<span>Number is multiple of 3!</span>),
        () => <span>Number is something else</span>
      )}
    );
  }
}
```
