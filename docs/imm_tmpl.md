# Immediate Template API

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)
  and [uhtml](https://github.com/WebReflection/uhtml#readme)


## Examples

##### No library

```javascript
let el_tmpl = document.createElement('template')

el_tmpl.innerHTML = `
  <article ${ {class: 'awesome'} }>
    <h3>${ 'my demo title' }</h3>
    ${ 'some body text' }
  </article>
`

el_tmpl.content.cloneNode(true)
```

##### Using `imm_tmpl` from `imm_tmpl.js`

```javascript
imm_tmpl`
  <article ${ {class: 'awesome'} }>
    <h3>${ 'my demo title' }</h3>
    ${ 'some body text' }
  </article>`
```

## Docs

### Module `imm_tmpl.js`

- `imm_tmpl(parts, ...args) : HTMLDocumentFragment`

  Invokes javascript template string and substitutes attributes
  and nodes corresponding to `parts` using values from `args`.

  The arguments may be `HTMLElement` instances, strings,
  objects of `{attributeName: attributeValue}` pairs,
  or a `function(node, is_replace, imm)`.

- `imm_tmpl_f(parts, ...args) : HTMLElement`

  Invokes `imm_tmpl` and returns `.firstElementChild`

- `imm_tmpl_l(parts, ...args) : HTMLElement`

  Invokes `imm_tmpl` and returns `.lastElementChild`

- `imm_flat(tgt : HTMLElement | string | null | iterable, host : HTMLElement | HTMLDocument)`

  Transform a `string`, `null`, `HTMLElement`, or iterable into an object compatible with `.replaceWith()` or `.append()`.
  Iterables become a `DocumentFragment`.



### Module `imm_tmpl_core.js`

- `_imm_tmpl_link(invoke_arg) : function`

  Returns a bound `function (parts, ...args) : HTMLElement | HTMLDocumentFragment`
  suitable to use as a javascript template function.

  The `invoke_arg` argument is a `function(tgt_elem : HTMLElement, is_replace : boolean, arg : *, arg_idx : number)`
  to update the `tgt_elem` according to `arg` and the `is_replace` flag.

  Invoking the result resolves the compiled `HTMLTemplateElement` element,
  creates the output element via `template.cloneNode(true)`,
  and calls `invoke_arg(tgt_elem, is_replace, arg, idx)`.
  Compiled template elements are cached internally using a `WeakMap`.


- `_imm_tmpl_c(parts : Array<String>)`

  Compiles a template string array into an `HTMLTemplateElement` element
  suitable for updating attributes and replacing keys.


- `_imm_tmpl_r(parts : Array<String>, kinds : Array<int>)`

  Renders a template string array into an `HTMLTemplateElement` element
  using kinds to direct attributes or nodes decisions.

