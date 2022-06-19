# Immediate-Mode DOM Tools

Lightweight tooling around DOM creation.
Designed to be embedded piecewise in self-contained Web Components.

I love virtual DOM libraries like [superfine][], [preact][], and [inferno][].
But not all creations need the efficient updating logic.
Creations like self-sufficient Web Components, *where every byte of superfluous logic is wasted*.

The `imm-dom` library enables concise expression of DOM creation,
while never setting `innerHTML` with uncontrolled content.
Elements are created using `createElement()` or `createElementNS()`.
Strings become `Text` nodes via `createTextNode()` or `elem.append()`.
Attributes are set using `elem.setAttribute()`.
DOM injection is protected against, in conjunction with caution and expertise, to provide tools for dynamic content.

 [superfine]: https://github.com/jorgebucaran/superfine#readme
 [preact]: https://preactjs.com/
 [inferno]: https://infernojs.org/
 [rollup]: https://rollupjs.org


## Demo

See the [mini demo](https://shanewholloway.github.io/js-imm-dom/) and the [demo's index.html source](index.html).


## API

`imm-dom` provdes layers of DOM tools:

- Creating new DOM elements, both HTML and SVG
- Manipulating (existing) DOM elements
- Defining Web Components
- Misc utilities: promises, deferreds, render animation frames, etc.

Read more in [docs/README.md](./docs/README.md)


### [Immediate Custom Element Web Componet API](docs/imm_elem.md):

```html
<section>
  <imm-demo-cdn data-demo=yes kind=awesome title='my demo title'>
    some body text for the CDN demo
  </imm-demo-cdn>

  <script type=module>
    import {imm_html as h, ImmElem} from 'https://cdn.jsdelivr.net/npm/imm-dom@latest/esm/index.mjs'

    ImmElem.elem('imm-demo-cdn', ns =>
      h.article(
        {class: ns.kind},
        h.h3(`${ns.title}`),
        h.slot('Body text Slot')) )
  </script>
</section>
```

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)


### [Immediate DOM API](docs/imm_dom.md):

```javascript
imm_html.article({class: 'awesome'},
  imm_html.h3('my demo title'),
  'some body text')

// or

tag('article', {class: 'awesome'},
  tag('h3', 'my demo title'),
  'some body text')
```

Inspired by:
- [hyperscript](https://github.com/hyperhype/hyperscript#readme)
- [superfine][]
- [crel](https://github.com/KoryNunn/crel#readme)
- [jaml](https://github.com/edspencer/jaml#readme)
- [jsonml](http://www.jsonml.org)
- [hast](https://github.com/syntax-tree/hast#readme)


### [Immediate Template API](docs/imm_tmpl.md):

```javascript
imm_tmpl`
  <article ${ {class: 'awesome'} }>
    <h3>${ 'my demo title' }</h3>
    ${ 'some body text' }
  </article>`
```

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme) and [uhtml](https://github.com/WebReflection/uhtml#readme)


### [Immediate requestAnimationFrame API](docs/imm_raf.md)

- `imm_raf()` returns a promise for the next `requestAnimationFrame` tick.
- `ImmRAF` is like `ImmElem` using `requestAnimationFrame` to decouple attribute updates from rendering.


## Size Cost in Bytes

To be embedded in each web component custom element,
the individual pieces must be small.

The entire library is ~ **8200 bytes** minified; ~ **3300 brotli**.
However, the library is _designed to include only the parts actually used_.
Perfect for pairing with a tree-shaking tool like [rollup][].

| module          |   brotli | minified |   source |
|:----------------|---------:|---------:|---------:|
| `index`         |   3295 B |   8199 B |  17052 B |
| `imm_elem`      |   1115 B |   2626 B |   5458 B |
| `imm_tmpl`      |    870 B |   1847 B |   4867 B |
| `imm_dom`       |    567 B |   1177 B |   2492 B |

See auto-generated [compressed size report](./docs/compressed.md).

## License

[BSD 2-clause](LICENSE)

