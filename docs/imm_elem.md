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

    ImmElem.shadow('imm-demo-alt', ns =>
      imm_tmpl`
        <article ${ {class: ns.kind} }>
          <h3>${ ns.title }</h3>
          <slot>Body text Slot</slot>
        </article>` )
  </script>
</section>
```

## Docs

### Module `imm_elem.mjs`

- `ImmElem` is an extension of `ImmCoreElem`
  with *direct rendering*
  on connected or attribute change.
- `ImmElem.dom(tag_name, fn : fn_elem_render)` to create a DOM-side custom element.
- `ImmElem.elem(tag_name, fn : fn_elem_render)` to create a shadow-root based custom element.
- `function fn_elem_render(ns, custom_elem) : HTMLElement | HTMLDocumentFragment | null`

### Module `imm_elem_raf.mjs`

- `ImmElemRAF` is an extension of `ImmCoreElem`
  with `requestAnimationFrame` *batched rendering*
  on connected or attribute change.
- `ImmElemRAF.dom(tag_name, fn : fn_elem_render)` to create a DOM-side custom element.
- `ImmElemRAF.elem(tag_name, fn : fn_elem_render)` to create a shadow-root based custom element.
- `function fn_raf_render(ns, custom_elem, imm_raf) : HTMLElement | HTMLDocumentFragment | null`

### Module `imm_elem_core.mjs`

- `ImmCoreElem` is an extension of `HTMLElement` with immediate DOM APIs.
- `ImmCoreElem.dom(tag_name, fn : fn_elem_render)` to create a DOM-side custom element.
- `ImmCoreElem.elem(tag_name, fn : fn_elem_render)` to create a shadow-root based custom element.
- `function fn_elem_render(ns, custom_elem) : HTMLElement | HTMLDocumentFragment | null`
