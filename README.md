# render-if
A tiny, yet conveniently curry way to render conditional React components. Work great with both React and React Native.

```js
renderIf(predicate)(element)
```
```js
renderIf(1 + 1 === 2)(
  <Text>Hello World!</Text>
)
```


### What it looks like

```jsx
import renderIf from 'render-if';

const ifUniverseIsWorking = renderIf(1 + 1 === 2);

class MyComponent extends Component {
  render() {
    return (
      <div>
        {renderIf(1 + 1 === 2)(
          <span>I am rendered!</span>
        )}

        {renderIf(false)(
          <span>I am not rendered :(</span>
        )}

        {ifUniverseIsWorking(
          <span>I am rendered!</span>
        )}
      </div>
    );
  }
}
```


### What it no longer looks like

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
