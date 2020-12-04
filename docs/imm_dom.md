# Immediate DOM API

Inspired by:
- [crel](https://github.com/KoryNunn/crel#readme)
- [jaml](https://github.com/edspencer/jaml#readme)


## Examples

##### No library

```javascript
let el_article = document.createElement('article')
let el_h3 = document.createElement('h3')

el_article.setAttribute('class', 'awesome')
el_h3.append('my demo title')
el_article.append('some body text')
```

##### Using `imm` from `imm_dom_core.mjs`

```javascript
let el_article = document.createElement('article')
let el_h3 = document.createElement('h3')

imm(el_article, {class: 'awesome'},
  imm(el_h3, 'my demo title'),
  'some body text')
```

##### Using `imm_tag` from `imm_dom.mjs`

```javascript
tag('article', {class: 'awesome'},
  tag('h3', 'my demo title'),
  'some body text')
```

##### Using `imm_html` from `imm_dom_ns.mjs`

```javascript
imm_html.article({class: 'awesome'},
  imm_html.h3('my demo title'),
  'some body text')
```


## Docs

### Module `imm_dom_ns.mjs`

- `html` alias for `imm_html = imm_pxy(imm_tag)`
- `svg` alias for `imm_svg = imm_pxy(imm_svg_tag)`

Syntactic sugar to express a tags as a function calls.


### Module `imm_dom.mjs`

- `tag` alias for `imm_tag = imm_dom(document)`
- `tsvg` alias for `imm_svg_tag = imm_dom(document, 'http://www.w3.org/2000/svg')`

See `imm_dom_ns.imm_html` and `imm_dom_ns.imm_svg`.


### Module `imm_dom_core.mjs`

- `imm_dom(host=document, namespaceURI)`

  Returns a tag function `tag_fn(tag : string | HTMLElement, attributes, ...children) : HTMLElement`
  that invokes `imm(el, attributes, children)` using bound `host.createElementNS`.

  Also includes `tag_fn.text` bound to `host.createTextNode`.

  See `imm_dom.imm_tag` and `imm_dom.imm_svg_tag`.

- `imm(element : HTMLElement, attributes, children) : HTMLElement`

  Utility to iterate through attributes and call `element.setAttribute()`,
  then iterate children and call `element.append()`.

- `imm_clear(element : HTMLElement) : HTMLElement`

  Utility to clear all inner content, returning original element.

- `imm_set(element : HTMLElement, attributes, children) : HTMLElement`

  Utility alias for `imm(imm_clear(element), attributes, children)`.

- `imm_frag(iterable, host : HTMLElement | HTMLDocument)`

  Utility to transform an iterable into a DocumentFragment

- `imm_flat(tgt : HTMLElement | string | null | iterable, host : HTMLElement | HTMLDocument)`

  Transform a `string`, `null`, `HTMLElement`, or iterable into an object compatible with `.replaceWith()` or `.append()`.
  Uses `imm_frag(tgt, host)` if the target is not an `HTMLElement`, `string`, or `null`.


### Module `imm_pxy.mjs`

- `imm_pxy_tag(tag_fn, kw=tag_fn)`

  Returns a namespace object with a `Proxy` prototype.
  When a `key` is requested that does not exist on the namespace,
  the proxy prototype binds `tag_fn` for a tag matching `key` and
  caches it on the namespace object as `key`.

  See `imm_dom_ns.imm_html` and `imm_dom_ns.imm_svg` for practical use.

- `imm_pxy_attr(element : HTMLElement)`

  Returns a `Proxy` returning `element.getAttribute()` for property get requests.

  See `imm_elem_core.ImmCoreElem::render` for practical use.

- `imm_pxy_css(element : HTMLElement)`

  Returns a `Proxy` returning `element.getPropertyValue()` for CSS `var(--css-prop-name)` requests.


