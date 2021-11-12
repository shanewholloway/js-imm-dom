# Immediate Custom Elements Web Components API

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)

- `ImmCore`
- `ImmElem`
- `ImmIter`
- `ImmRAF`
- `ImmIterRAF`

## Examples

#### Extending custom element

```html
<section>
  <imm-demo kind=awesome title='my demo title'>
    some body text
  </imm-demo>

  <script type=module>
    import {imm_tmpl} from './code/imm_tmpl.mjs'
    import {ImmElem} from './code/imm_elem.mjs'

    class DemoElem extends ImmElem {
      render(ns) {
        return imm_tmpl`
          <article ${ {class: ns.kind} }>
            <h3>${ ns.title }</h3>
            <slot>Body text Slot</slot>
            <p>${ this.dyn_info(ns) }</p>
          </article>`
      }
      dyn_info(ns) {
        return `Date: ${new Date().toLocalDateString()}`
      }
    }

    DemoElem.define('imm-demo')
  </script>
</section>
```

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
  - extends `ImmCore`

  - override:
    - `init(ns, custom_elem, elem_target) : HTMLElement` allows composed initialization and returning the render target
    - `render(ns, custom_elem, elem_target) : HTMLElement | HTMLDocumentFragment | null` returned node is rendered onto target with `_show_(node)`
    - `static init_dom()` returns `this` host element by default.
    - `static init_elem()` returns a new shadow root element by default. 

  - composed methods:
    - `_init_()` initializes the initial render target (`init_dom` or `init_elem`) and invokes `init(ns, this, tgt)`
    - `_render_()` accomplishes `_show_( render(ns, this, tgt))` with implementation details changed in subclasses like `ImmRAF` and `ImmIter`.
    - `_show_(node : HTMLElement | HTMLDocumentFragment | Node | string | Promise | null | undefined)` replaces `_tgt_` body with `node`. Usually only called by `_render_`.

  - static methods:
    - `ImmElem.dom(tag_name, fn_elem_render)` to create a DOM-side custom element.
    - `ImmElem.dom(tag_name, fn_elem_init, fn_elem_render)` to create a DOM-side custom element with an init function.
    - `ImmElem.elem(tag_name, fn_elem_render)` to create a shadow-root based custom element.
    - `ImmElem.elem(tag_name, fn_elem_init, fn_elem_render)` to create a shadow-root based custom element with an init function.

    - `function fn_elem_init(ns, custom_elem, elem_target) : HTMLElement?` is installed as subclass `init` function
    - `function fn_elem_render(ns, custom_elem, elem_target) : HTMLElement | HTMLDocumentFragment | null` is installed as subclass `render` function


- `ImmCore` 

  - static methods:
    - `ImmCore.observe(... attrs)` returns invoked `with_imm_observe` over subclass.
    - `ImmCore.define(name, opt)` calls `customElements.define` with `name`, subclass, and `opt`.


- `with_imm_observe(klass:HTMLElement, ...attrs) : HTMLElement`
  If `klass.observedAttributes` does not exists, use dynamic subclass.
  Extends static `observedAttributes` with flattened elements of `attrs`.
  Returns klass or created subclass.


### Module `imm_elem_iter.mjs`

- `ImmIter` is an extension of `ImmElem`
  with iterator-driven `render()` method

  - override:
    - `* render(ns, custom_elem, elem_target)` is an iterable 
    - `async * render(ns, custom_elem, elem_target)` is an async iterable 

  - static methods:
    - `ImmElem.dom(tag_name, fn_elem_gen_render)` to create a DOM-side custom element using iterable rendering.
    - `ImmElem.elem(tag_name, fn_elem_gen_render)` to create a shadow-root based custom element using iterable rendering.

    - `ImmElem.dom(tag_name, fn_elem_init, fn_elem_gen_render)` variant with an init function.
    - `ImmElem.elem(tag_name, fn_elem_init, fn_elem_gen_render)` variant with an init function.

    - `function * fn_elem_gen_render(ns, custom_elem, elem_target) : iterator<HTMLElement | HTMLDocumentFragment | null>` is installed as subclass `* render` function
    - `async function * fn_elem_gen_render(ns, custom_elem, elem_target) : iterator<HTMLElement | HTMLDocumentFragment | null>` is installed as subclass `async * render` function


### Module `imm_elem_raf.mjs`

- `ImmRAF` and `ImmIterRAF` are extensions of `ImmElem` and `ImmIter`
  with `requestAnimationFrame` *batched rendering* on connected or attribute change.

- `with_imm_raf(ImmKlass : ImmElem)` creates a dynamic subclass of `ImmKlass`
  with `requestAnimationFrame` *batched rendering* on connected or attribute change.


### *Beta* Module `beta/imm_elem_auto.mjs`

- `ImmAuto` is an extension of `ImmElem` with introspective `observedAttributes` construction
- `ImmAutoRAF` is an extension of `ImmRAF` with introspective `observedAttributes` construction
- `_imm_attr_spy(klass, fn_target)` uses a proxy spy to construct `observedAttributes`

