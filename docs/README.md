# Layers of `imm-dom` Tools

1. Create new DOM elements: HTML, CSS, SVG, etc.
2. Create web templates
3. Manipulate existing DOM elements
4. Define Web Components
5. Miscellaneous utilities

### 1a. [Create New Elements](./imm_dom.md)

- Use `tag('div')` or `imm_tag('div', {... attrs}, ...children)` to create elements tag name.
- Use `html.div()` or `imm_html.div({... attrs}, ...children)` to create elements by attribute name.

These are roughly implemented by `(...args) => imm(createElement(tag), ...args)`.

### 1b. [Create CSS](./imm_css.md)

- Use ``imm(el, {style: imm_css`color: ${'purple'}`})`` to create validated dynamic CSS string expressions for style attributes or `innerText` of style elements.
- Use ``imm(el, imm_style`color: ${'purple'}`)`` to create style elements with validated dynamic CSS string expressions.

### 1c. [Create SVG Elements](./imm_dom.md)

- Use `tsvg('g')` or `imm_svg_tag('g')`
- Use `svg.g()` or `imm_svg.g({... attrs}, ...children)`

### 2. [Create Web Templates](./imm_tmpl.md)

- Use `imm_tmpl` to create DOM `<template>` elements from JS string expressions.

Templates are implemented without setting `innerHTML`.

### 3a. [Manipulate Existing Elements](./imm_dom_core.md)

- Use `imm()` and `imm_set()` to work directly with existing DOM elements.
- Use in conjunction with [`imma`](./imm_dom_async.md) for rendering asynchronously via a placeholder.

### 3b. [Emit Custom Events](./imm_evt.md)
- Use `imm_emit` and `imm_wcemit` for emitting DOM events inside and outside the shadow DOM.

### 4. [Define Web Components](./imm_elem.md)

Use functions to define rendering:

- Use `ImmElem.dom` to define light-dom web components.
- Use `ImmElem.elem` to define shadow-dom web components.

Extending web component classes:

- Extend `ImmCore` for non-visual components with methods.
- Use or extend `ImmElem` for visual components with methods.
- Use or extend `ImmRAF` for rendering on the next animation frame.

### 5. Miscellaneous Utilities
- [events, promises, deferreds](./imm_evt.md)
- [render animation frames](./imm_raf.md)
- [queries, dialogs, cloning](./imm_utils.md)