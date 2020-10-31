# Immediate-mode DOM tools

Lightweight tooling around `document.createElement()`.
Designed to be embedded piecewise in self-contained Web Components.


## API

### [Immediate DOM API](docs/imm_dom.md):

```javascript
imm_html.article({class: 'awesome'},
  imm_html.h3('title'),
  'some body text')

// or

tag('article', {class: 'awesome'},
  tag('h3', 'title'),
  'some body text')
```

Inspired by:
- [hyperscript](https://github.com/hyperhype/hyperscript#readme)
- [superfine](https://github.com/jorgebucaran/superfine#readme)
- [crel](https://github.com/KoryNunn/crel#readme)
- [jaml](https://github.com/edspencer/jaml#readme)
- [jsonml](http://www.jsonml.org)
- [hast](https://github.com/syntax-tree/hast#readme)


### [Immediate Template API](docs/imm_tmpl.md):

```javascript
imm_tmpl`
  <article ${ {class: 'awesome'} }>
    <h3>${ 'title' }</h3>
    ${ 'some body text' }
  </article>`
```

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)
  and [uhtml](https://github.com/WebReflection/uhtml#readme)


## Sizes

To be embedded in each web component custom elemenet,
the pieces must be small. All-in, the entire library is
less than **1700 bytes** minified; **900 bytes with brotli**.
Using `imm_tmpl` alone costs 1100 bytes minified and 600 with brotli.
Basic `imm_dom` costs 600 bytes minified and 350 with brotli.

| module          |  bytes |    min | gziped | brotli |
|:----------------|-------:|-------:|-------:|-------:|
| `index`         |   4069 |   1666 |    933 |    838 |
| `imm_tmpl`      |   3098 |   1092 |    672 |    574 |
| `imm_dom`       |   1142 |    589 |    391 |    313 |

See auto-generated [compressed size report](./docs/compressed.md).


## License

[BSD 2-clause](LICENSE)
