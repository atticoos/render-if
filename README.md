# render-if
A tiny, yet conveniently curried way to render conditional React components. Work great with both React and React Native.

```js
renderIf(predicate)(element)
```



## What it looks like

`renderIf` is a curried function that takes a predicate and returns a function accepting an element that will only be returned if the predicate is satisfied.

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
