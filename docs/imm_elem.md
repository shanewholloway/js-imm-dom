# Immediate Custom Elements Web Components API

Inspired by:
- [uce](https://github.com/WebReflection/uce#readme)
- `ImmCore`
- `ImmElem`
- `ImmRAF`

## Examples

In both cases of the *light* and *shadow* DOM, custom elements inherit from `ImmElem`; however, `.dom` creates a *light* DOM component whereas `.elem` creates a *shadow* DOM component. Shadow DOM mode is `open` by default.

#### Extend Custom Element

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

#### DOM-Side Custom Element

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

#### Shadow DOM Custom Element

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

#### ImmElem `attributeChangedCallback` "Caret" Methods

You may define an instance method on ImmElem with the signature `^{attr}()` where `{attr}` is the actual name of an attribute. This is the same as handling a specific attribute in `attributeChangedCallback`.

- Re-renders by default unless you return `false`
- The attribute name is moved to the end of the parameters.
- Don't forget to observe the attributes!

```javascript
class TestAttributeChanged extends ImmElem.observe( 'color' ) ::
    '^color'( old_val, new_val ) ::
        new_val && new_val != old_val && console.log @ 'new color!', new_val
        
    changeColor() ::
        imm @ this, @{} color: this._ns_.color == 'blue' ? 'red' : 'blue'

    async render( ns ) ::
        setTimeout @ this.changeColor.bind( this ), 3000
        return h.p @ `My new color is ${ ns.color }!`

TestAttributeChanged.dom @ 'test-attribute-changed'
```

#### ImmDom Wrapper for `whenDefined`

ImmDom semantics for custom elements `whenDefined`.

```javascript
import { html as h, imm, imm_when, ImmElem } from "imm-dom";

async function waitForWc() {
  await imm_when("slow-wc");
  console.log("ready", imm(document.body, h.slow_wc()));
}

function defineWc() {
  class SlowWc extends ImmElem {
    render() {
      return h.p("I'm here now!");
    }
  }

  SlowWc.dom("slow-wc");
}

waitForWc();
setTimeout(defineWc, 3000);
```

## Docs

### Module `imm_elem_core.mjs` and `imm_elem.mjs`

- `ImmElem` uses *direct rendering* on connected or attribute change.
  - extends `ImmCore`
  - **override:**
    - `init(ns, custom_elem, elem_target)` allows composed initialization and returning the render target
    - `render(ns, custom_elem, elem_target)` returned node is rendered onto target with `_show_(node)`
    - `render0(ns, custom_elem, elem_target)` optional first render -- returned node is rendered onto target with `_show_(node)`
    - `render$(ns, custom_elem, elem_target)` optional overlay render -- returned node is rendered onto target with `_show_(node)`
    - `^{attr}( old_val, new_val, attr_name )` optional shortcut to handle `attributeChangedCallback` on a per-attribute basis where `{attr}` is the name of the attribute.

  - **composed methods:**
    - `_render_()` accomplishes `_show_( render(ns, this, tgt))` with implementation details changed in subclasses like `ImmRAF`.
    - `_show_(node : HTMLElement | HTMLDocumentFragment | Node | string | Promise | Array | iterable | null | undefined, retain : truthy)` replaces `_tgt_` body with `node`. If `retain`, the `_tgt_` is not cleared before extending. Called primarily by `_render_`.
    - `_add_(node)` alias for `_show_(node, 1)`
    - `_stop_()` called by `disconnectedCallback()` to remove `render$` optional overlay

  - **static methods:**
    - `ImmCore.define(tag_name)` to create a custom element.
    - `ImmElem.dom(tag_name, fn_render)` to create a DOM-side custom element.
    - `ImmElem.dom(tag_name, proto)` to create a DOM-side custom element with `proto` prototype extension.
    - `ImmElem.elem(tag_name, fn_render)` to create a shadow-root based custom element.
    - `ImmElem.elem(tag_name, proto)` to create a shadow-root based custom element with `proto` prototype extension.
    - `function fn_render(ns, custom_elem, elem_target)` is installed as subclass `render` function

  - **internal methods:**
    - `_init_tgt_()` called by constructor to setup `_tgt_` and `_z_` internals.
    - `_bind_()` ensures `_show_`, `_add_`, and `_refresh_` are bound closures.

- `ImmCore` 
  - **static methods:**
    - `ImmCore.observe(... attrs) : HTMLElement subclass` extends static `observedAttributes` with flattened elements of `attrs`.  Returns created subclass.
    - `ImmCore.define(name, opt)` calls `customElements.define` with `name`, subclass, and `opt`.
    - `ImmCore._ns_ : imm_pxy_attr(this)` getter

- `imm_when(name) : HTMLElement` polyfills `customElements.whenDefined()` to return the defined element.

### Module `imm_elem_raf.mjs`
- `ImmRAF` is an extension of `ImmElem` with `requestAnimationFrame` *batched rendering* on connected or attribute change.
- `with_imm_raf(ImmKlass : ImmElem)` creates a dynamic subclass of `ImmKlass` with `requestAnimationFrame` *batched rendering* on connected or attribute change.
