# Immediate DOM CSS API

`imm_css` and `imm_style` are JavaScript tagged template functions used to safely parse dynamic CSS.

## Examples

Create the following structure using `imm-dom`:

```html
<p style="color: orange;">
  some inline styled text
</p>
```

##### Using `imm_css` from `imm_css.js`

```javascript
imm_html.p(
  {
    style: imm_css`
      color: ${ 'orange' };
      `,
  },
  'some inline styled text'
)
```


##### Using `imm_style` from `imm_css.js`

Create the following `<style>` tag using `imm-dom`:

```html
<style>
  .demo {
    color: green;
  }
  p {
    font-weight: bolder;
  }
</style>
```

```javascript
imm_style`
  .demo {
    color: ${ 'green' };
  }
  p {
    font-weight: ${ 'bolder' }
  }
  `

// is shorthand for:

imm_html.style(
  imm_css`
    .demo {
      color: ${ 'green' };
    }
    p {
      font-weight: ${ 'bolder' }
    }
  `
)
```

Full example appending the new style tag to the document head:

```javascript
// assuming either of the above style constructors were assigned to "$style"

imm( document.head, $style );
```

## Docs

### Module `imm_css.js`

- `imm_style(parts, ...args) : HTMLStyleElement` is JavaScript tagged
  template function alias for creating style tags: `imm_tag('style',
  imm_css(parts, ...args))`

- `imm_svg_style(parts, ...args) : SVGStyleElement` is JavaScript tagged
  template function alias for creating style tags: `imm_svg_tag('style',
  imm_css(parts, ...args))`

- `imm_css(parts, ...args) : string` is JavaScript tagged template function to
  safely parse dynamic CSS. 

  When validating the CSS template, `var(--attr)` is used replace the dynamic
  arguments of the template literal.

  During evaluation, `style.setProperty()` and `style.getPropertyValue()` are
  used to parse dynamic CSS template argument values with the browser native
  logic.

