# Immediate Custom Elements Web Components API

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)


## Examples

#### DOM-side custom element

```html
<section>
  <imm-demo kind=awesome title='my demo title'>
    some body text
  </imm-demo>

  <script type=module>
    import {imm_tmpl} from './code/imm_tmpl.mjs'
    import {ImmElem} from './code/imm_elem.mjs'

    ImmElem.dom('imm-demo', ns =>
      imm_tmpl`
        <article ${ {class: ns.kind} }>
          <h3>${ ns.title }</h3>
          <slot>Body text Slot</slot>
        </article>` )
  </script>
</section>
```

#### Shadow-root custom element

```html
<section>
  <imm-demo-alt kind=awesome title='my demo title'>
    some body text
  </imm-demo-alt>

  <script type=module>
    import {imm_tmpl} from './code/imm_tmpl.mjs'
    import {ImmElem} from './code/imm_elem.mjs'

    ImmElem.elem('imm-demo-alt', ns =>
      imm_tmpl`
        <article ${ {class: ns.kind} }>
          <h3>${ ns.title }</h3>
          <slot>Body text Slot</slot>
        </article>` )
  </script>
</section>
```

## Docs

### Module `imm_elem_core.mjs` and `imm_elem.mjs`

- `ImmElem` uses *direct rendering* on connected or attribute change.

- override:
  - `init(ns, custom_elem, elem_target)`
  - `render(ns, custom_elem, elem_target) : HTMLElement | HTMLDocumentFragment | null`
  - `static init_dom()`
  - `static init_elem()`

- composed methods:
  - `_init_()`
  - `_render_()`
  - `_show_(node)`

- static methods:
  - `ImmElem.dom(tag_name, fn_elem_render)` to create a DOM-side custom element.
  - `ImmElem.dom(tag_name, fn_elem_init, fn_elem_render)` to create a DOM-side custom element with an init function.
  - `ImmElem.elem(tag_name, fn_elem_render)` to create a shadow-root based custom element.
  - `ImmElem.elem(tag_name, fn_elem_init, fn_elem_render)` to create a shadow-root based custom element with an init function.

  - `function fn_elem_init(ns, custom_elem, elem_target)`
  - `function fn_elem_render(ns, custom_elem, elem_target) : HTMLElement | HTMLDocumentFragment | null`

### Module `imm_elem_raf.mjs`

- `ImmRAF` is an extension of `ImmElem`
  with `requestAnimationFrame` *batched rendering* on connected or attribute change.

### Module `imm_elem_auto.mjs`

- `ImmAuto` is an extension of `ImmElem` with introspective `observedAttributes` construction
- `ImmAutoRAF` is an extension of `ImmRAF` with introspective `observedAttributes` construction
- `_imm_attr_spy(klass, fn_target)` uses a proxy spy to construct `observedAttributes`

