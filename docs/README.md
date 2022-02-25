# Layers of `imm-dom` tools

- Creating new DOM elements, both HTML and SVG
- Manipulating (existing) DOM elements
- Defining Web Components
- Misc utilities: 
  - [events, promises, deferreds](./imm_evt.md)
  - [render animation frames](./imm_raf.md)


### [Existing elements](./imm_dom_core.md)

- Use `imm()` and `imm_set()` to work directly with existing DOM elements.
- [`imm_emit()`](./imm_evt.md) for firing DOM events


### [Create HTML elements](./imm_dom.md)

- Use `tag('div')` or `imm_tag('div', {... attrs}, ...children)` to create elements tag name.
- Use `html.div()` or `imm_html.div({... attrs}, ...children)` to create elements by attribute name.

These are roughly implemented by `(...args) => imm(createElement(tag), ...args)`


### [Creating Web Templates](./imm_tmpl.md)

- Use `imm_tmpl` to create DOM `<template>` elements from JS string expressions.

Templates are implemented without setting innerHTML


### [Create SVG elements](./imm_dom.md)

- Use `tsvg('g')` or `imm_svg_tag('g')`
- Use `svg.g()` or `imm_svg.g({... attrs}, ...children)`


### [Defining Web Components](./imm_elem.md)

Using functions to define rendering:

- Use `ImmElem.dom` for light-dom web components
- Use `ImmElem.elem` for shadow-dom web components

Extending web component classes

- Extend from `ImmElem` for visual components with methods
- Extend from `ImmCore` for non-visual components with methods
- Use or extend `ImmRAF` for rendering on the next animation frame
- Use or extend `ImmIter` for rendering using iterables (e.g. `function * (ns, elem, tgt) { while (1) yield 'demo' }`)

