import { Imm0 } from './imm_elem_core.js'

export const ImmClone = /* #__PURE__ */
  Imm0._wc_({c: el => imm_clone(el, el.getAttribute('query')) })

export function imm_clone(el_tgt, query, el_root=el_tgt.ownerDocument) {
  for (let el of el_root.querySelectorAll(query)) {
    el = (el.content || el).cloneNode(true)
    el_tgt.append(el)
  }
  return el_tgt
}

