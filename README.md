# render-if
A conveniently curry way to render conditional React components.

```js
renderIf(predicate)(element)
```


### What it looks like

```jsx
import renderIf from 'render-if';

const ifUniverseIsWorking = renderIf(1 + 2 === 2);

class MyComponent extends Component {
  render() {
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
  }
}
```


### What it no longer looks like

```jsx
class MyComponent extends Component {
  render() {
    <div>
      <!-- this works, but it can get ugly -->
      {1 + 1 === 2 && <span>I am rendered!</span>}
      {this.anotherConditionalRender()}
    </div>
  }
  anotherConditionalRender() {
    if (false) {
      return <span>I am not rendered :(</span>
    }
  }
}
```
