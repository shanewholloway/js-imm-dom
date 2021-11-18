# Immediate DOM manipulation API

## Examples

##### Using `imm` from `imm_dom_core.mjs`

```javascript
let el_article = document.createElement('article')
let el_h3 = document.createElement('h3')

imm_set(el_article, {class: 'awesome'},
  imm(el_h3, 'my demo title'),
  'some body text')
```

##### No library

```javascript
el_article.setAttribute('class', 'awesome')
el_h3.append('my demo title')
el_article.append('some body text')
```


## Docs

Core `imm` interface `imm(el, ...args)`:

- `args[0]` may be an attribute object, enumerated by `Object.entries()` as `[key, value]` pairs.
  - Given a function value, `addEventListener(key, value)` is called.
  - Given a name starting with `$`, children are collected in order of enumeration for `el.prepend()`.
  - Otherwise, `setAttribute(dashed_key, value)` is called, where `_` are replaced with `-` to match web semantics.

- The rest of the arguments are children for `el.append()`.


For all element children, appended or prepended:
  - `null` or `undefined` are skip filtered.
  - Objects with a trueish `.nodeType` and pass to `el.append` / `el.prepend`
  - Otherwise, convert to a `DOMString` and pass to `el.append` / `el.prepend`


### Module `imm_dom_core.mjs`

- `imm(element : HTMLElement, attributes, children) : HTMLElement`

  Utility to iterate through attributes and call `element.setAttribute()`,
  then iterate children and call `element.append()`.

- `imm_set(element : HTMLElement, attributes, children) : HTMLElement`

  Clear all inner content then return `imm(element, attributes, children)`.


