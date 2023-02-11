# Immediate RAF API (requestAnimationFrame)

- `imm_raf(obj) : Promise`

  Returns a promise that will be fulfilled on the next `requestAnimationFrame` callback.
  Schedules `obj[imm_raf_sym](imm_raf)` to be called when the promise is fulfilled,
  allowing for update batching.

- `imm_raf_sym : Symbol` with `imm_raf.sym` alias

### Immediate RAF-based Custom Element Web Componet API
 
- `ImmRAF` extends [`ImmElem`](docs/imm_elem.md) using `requestAnimationFrame` to batch multiple attribute updates before rendering.

```html
<!DOCTYPE html>
<section>
  <imm-raf-demo kind=neat-raf-demo title='ImmRAF demo title'>
    RAF element text
  </imm-raf-demo>

  <script type=module>
    import {ImmRAF} from './code/imm_elem_raf.js'
    import {html} from './code/imm_dom_ns.js'

    let ts0 = Date.now()

    ImmRAF.elem('imm-raf-demo', {
      init: (ns, el) => {
        el.ts = Date.now()
      },
      render: (ns, el) => {
        let ts = Date.now()

        if (el) el.raf()
        return html.article(
          {
            class: ns.kind,
            data_awesome: 2242,
          },

          html.h3(
          `${ns.title}`,
            html.br(),
            html.small('a subtitle')),

          html.slot("Body text Slot"),

          html.samp(`td: ${ts - el?.ts}`),
          html.br(),
          html.samp(`ts - ts0: ${ts - ts0}`))
      },
    })
  </script>
</section>
```
