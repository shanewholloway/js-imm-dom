# Immediate Query Utils

- `imm_set_qx(key, el, el_ctx=el.parentNode)` sets `el_ctx.dataset[key]` to selector id for locating `el`.
- `imm_qx(key, el_ctx)` uses `el_ctx.closest()` to locate parent hosting key set by `imm_set_qs(key)`
- `imm_wcqx(key, el_ctx)` like `imm_qx` 
- `imm_wcqx(key, el_ctx)` uses `imm_qx` and `imm_wchost` to locate parent hosting key set by `imm_set_qs(key)` across Shadow DOM boundaries.
- `imm_wchost(el)` returns the parent node hosting shadow DOM element.


### ImmQX

- `ImmQX` is a base web component for use with `imm_qx`.

```javascript
import { ImmQX } from 'imm-dom'
ImmQX.dom('wc-myapi', { qx:'myapi' })

import { imm_wcqx } from 'imm-dom'
class MyDisplay extends ImmElem {
  get api() { return imm_wcqx('myapi', this) }
}
```
