# Immediate DOM API

Inspired by:
- [crel](https://github.com/KoryNunn/crel#readme)
- [jaml](https://github.com/edspencer/jaml#readme)

Building upon [`imm()` and `imm_set()`](./imm_dom_core.md)


## Examples

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

### Module `imm_dom.mjs`

- `tag` alias for `imm_tag = imm_dom(document)`
- `tsvg` alias for `imm_svg_tag = imm_dom(document, 'http://www.w3.org/2000/svg')`
- `imm_dom(host=document, namespaceURI)`

  Returns a tag function `tag_fn(tag : string | HTMLElement, attributes, ...children) : HTMLElement`
  that invokes `imm(el, attributes, children)` using bound `host.createElementNS`.

  Also includes `tag_fn.text` bound to `host.createTextNode`.


### Module `imm_dom_ns.mjs`

- `html` alias for `imm_html = imm_pxy(imm_tag)`
- `svg` alias for `imm_svg = imm_pxy(imm_svg_tag)`

Syntactic sugar to express a tags as a function calls.


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


