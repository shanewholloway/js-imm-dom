# Immediate-mode DOM tools

Lightweight tooling around DOM creation.
Designed to be embedded piecewise in self-contained Web Components.

I love virtual DOM libraries like [superfine][], [preact][], and [inferno][],
but some creations do not need the effecient updating logic.
Creations like self-suffecient Web Components, *where every byte of superfulous logic is wasted*.

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


## API

### [Immediate Custom Element Web Componet API](docs/imm_elem.md):

```html
<section>
  <imm-demo-cdn data-demo=yes kind=awesome title='my demo title'>
    some body text for the CDN demo
  </imm-demo-cdn>

  <script type=module>
    import {imm_tmpl, ImmElem} from 'https://cdn.jsdelivr.net/npm/imm-dom@latest/esm/index.mjs'

    ImmElem.shadow('imm-demo-cdn', ns =>
      imm_tmpl`
        <article ${ {class: ns.kind} }>
          <h3>${ ns.title }</h3>
          <slot>Body text Slot</slot>
        </article>` )
  </script>
</section>
```

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)


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


### [Immediate Utility API](docs/imm_utils.md)

- `imm_raf()` returns a promise for the next `requestAnimationFrame` tick.


## Size Cost in Bytes

To be embedded in each web component custom elemenet,
the individual pieces must be small.

The entire library is ~ **3000 bytes** minified; ~ **1300 brotli**.
However, the library is _designed to include only the parts actually used_.
Perfect for paring with a tree-shaking tool like [rollup][].

| module          |   brotli | minified |   source |
|:----------------|---------:|---------:|---------:|
| `index`         |   1303 B |   2913 B |   6429 B |
| `imm_elem`      |    404 B |    879 B |   1559 B |
| `imm_tmpl`      |    570 B |   1093 B |   3156 B |
| `imm_dom`       |    313 B |    589 B |   1142 B |

See auto-generated [compressed size report](./docs/compressed.md).

## License

[BSD 2-clause](LICENSE)

