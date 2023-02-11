# Immediate DOM Manipulation API

## Examples

##### No Library

```javascript
let el_article = document.createElement('article')
el_article.setAttribute('class', 'awesome')
el_h3.append('my demo title')
el_article.append('some body text')
```

##### Using `imm_set` from `imm_dom_core.js`

`imm_set` will clear `textContent` before appending new content.

```javascript
let el_article = document.createElement('article')
let el_h3 = document.createElement('h3')

imm_set(el_article, {class: 'awesome'},
  imm(el_h3, 'my demo title'),
  'some body text')
```

##### Using `imm` for Events and Attributes

```javascript
imm( document.querySelector('form'), // mutate an existing DOM element
  {
    type: 'dialog', // short for setAttribute('type', 'dialog')
    submit(evt) { // short for .addEventListener('submit', ...)
      evt.preventDefault()
    },
  }
)
```

##### Using `imm` with Special Configurations

```javascript
import { html as h, imm } from 'imm-dom'

let $hw = h.p({
    style: 'font-weight: bold;' // assign regular attribute
    , '=': { // directly assign properties
        my_prop: 'A special property'
    }
    , $: 'Hello, world!' // append child
    , '@log': ( el, key ) => console.log( el.my_prop ) // execute a callback with the constructed component
})

imm( document.body, $hw ) // appends the new element to document.body
```

## Docs

Core `imm` interface `imm(el, ...args)`:

`args[0]` may be an attribute object, enumerated by `Object.entries()` as `[key, value]` pairs:
- Given a function value, `addEventListener(key, value)` is called.
- Given a name starting with `$`, children are collected in order of enumeration for `el.prepend()`.
- Given a name starting with `=`, object keys and values are assigned as properties.
- Given a name starting with `@`, the value is invoked as a callback with the element as the first argument and key as the second argument.
- Otherwise, `setAttribute(dashed_key, value)` is called, where `_` are replaced with `-` to match web semantics.

The rest of the arguments are children for `el.append()`.

For all element children, appended or prepended:
  - `null` or `undefined` are skip filtered.
  - Objects with a true-ish `.nodeType` are passed to `el.append` / `el.prepend`
  - Otherwise, convert to a `DOMString` and pass to `el.append` / `el.prepend`

Arrays are flattened and their contents evaluated per above.

### Module `imm_dom_core.js`

`imm(element : HTMLElement, attributes, children) : HTMLElement`
- Utility to iterate through attributes and call `element.setAttribute()`, then iterate children and call `element.append()`.

`imm_set(element : HTMLElement, attributes, children) : HTMLElement`
- Clear all inner content then return `imm(element, attributes, children)`.
