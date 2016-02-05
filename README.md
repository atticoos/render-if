# render-if
A convenient way to render conditional React components.

```js
renderIf(element, predicate)
```


### What it looks like

```jsx
import renderIf from 'render-if';

class MyComponent extends Component {
  render() {
    <div>
      {renderIf(
        <span>I am rendered!</span>,
        1 + 1 === 2
      )}

      {renderIf(
        <span>I am not rendered :(</span>,
        false
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
